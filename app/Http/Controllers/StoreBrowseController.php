<?php

namespace App\Http\Controllers;

use App\Concerns\SearchableWithFallback;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class StoreBrowseController extends Controller
{
    use SearchableWithFallback;

    public function index(Request $request): Response
    {
        $lat = $request->float('lat');
        $lng = $request->float('lng');
        $hasCoords = $lat && $lng;

        $vendors = Vendor::query()
            ->approved()
            ->select(['id', 'store_name', 'slug', 'logo', 'city', 'description', 'rating_avg', 'rating_count'])
            ->when($hasCoords, function ($q) use ($lat, $lng) {
                $q->selectRaw(
                    'ST_Distance_Sphere(location, ST_GeomFromText(?)) / 1000 as distance_km',
                    ["POINT({$lng} {$lat})"],
                );
            })
            ->withCount(['products' => fn ($q) => $q->active()])
            ->when($request->input('search'), function ($q, $search) {
                $ids = $this->searchIds(Vendor::class, $search);

                return $ids !== null
                    ? $q->whereIn('id', $ids)
                    : $q->search($search);
            })
            ->when($request->input('city'), fn ($q, $city) => $q->where('city', $city))
            ->when($request->input('sort'), function ($q, $sort) {
                return match ($sort) {
                    'rating' => $q->orderBy('rating_avg', 'desc'),
                    default => $q->latest(),
                };
            }, fn ($q) => $q->latest())
            ->paginate(12)
            ->withQueryString();

        return Inertia::render('Stores', [
            'vendors' => $vendors,
            'filters' => $request->only(['search', 'city', 'sort']),
        ]);
    }

    public function show(Request $request, Vendor $vendor): Response
    {
        $products = $vendor->products()
            ->active()
            ->with(['primaryImage', 'category:id,name'])
            ->when($request->input('sort'), function ($q, $sort) {
                return match ($sort) {
                    'price_asc' => $q->orderBy('price', 'asc'),
                    'price_desc' => $q->orderBy('price', 'desc'),
                    'popular' => $q->orderBy('reservations_count', 'desc'),
                    default => $q->latest(),
                };
            }, fn ($q) => $q->latest())
            ->paginate(12)
            ->withQueryString();

        $reviews = $vendor->reviews()
            ->where('is_published', true)
            ->with(['customer:id,name,avatar', 'product:id,name,slug'])
            ->latest()
            ->limit(10)
            ->get();

        $ratingSummary = [
            'average' => $vendor->rating_avg,
            'count' => $vendor->rating_count,
        ];

        return Inertia::render('StoreProfile', [
            'vendor' => $vendor->only([
                'id', 'store_name', 'slug', 'logo', 'banner', 'description',
                'phone', 'whatsapp', 'email', 'address', 'city', 'state',
                'country', 'operating_hours', 'rating_avg', 'rating_count',
            ]),
            'products' => $products,
            'reviews' => $reviews,
            'ratingSummary' => $ratingSummary,
        ]);
    }
}
