<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\EventType;
use App\Models\HeroSlide;
use App\Models\Product;
use App\Models\Review;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(Request $request): Response
    {
        $lat = $request->float('lat');
        $lng = $request->float('lng');
        $hasCoords = $lat && $lng;
        $radiusKm = $request->float('radius', 5);

        $featuredProducts = Product::query()
            ->active()
            ->featured()
            ->fromApprovedVendors()
            ->with(['primaryImage', 'vendor:id,store_name,slug,city'])
            ->when($hasCoords, function ($q) use ($lat, $lng) {
                $q->addSelect(['products.*'])
                    ->selectRaw(
                        'ST_Distance_Sphere(
                            (SELECT location FROM vendors WHERE vendors.id = products.vendor_id),
                            ST_GeomFromText(?)
                        ) / 1000 as distance_km',
                        ["POINT({$lng} {$lat})"],
                    )
                    ->orderBy('distance_km');
            }, fn ($q) => $q->latest())
            ->limit(12)
            ->get();

        $featuredVendors = Vendor::query()
            ->approved()
            ->featured()
            ->select(['id', 'store_name', 'slug', 'logo', 'city', 'rating_avg', 'rating_count'])
            ->when($hasCoords, function ($q) use ($lat, $lng) {
                $q->selectRaw(
                    'ST_Distance_Sphere(location, ST_GeomFromText(?)) / 1000 as distance_km',
                    ["POINT({$lng} {$lat})"],
                )->orderBy('distance_km');
            }, fn ($q) => $q->latest())
            ->withCount(['products' => fn ($q) => $q->active()])
            ->limit(8)
            ->get();

        $eventTypes = EventType::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug', 'icon']);

        $categories = Category::query()
            ->where('is_active', true)
            ->whereNull('parent_id')
            ->withCount(['products' => fn ($q) => $q->active()])
            ->orderBy('sort_order')
            ->get(['id', 'name', 'slug', 'icon']);

        $recentReviews = Review::query()
            ->where('is_published', true)
            ->where('rating', '>=', 4)
            ->with(['customer:id,name,avatar', 'vendor:id,store_name'])
            ->latest()
            ->limit(12)
            ->get();

        $heroSlides = HeroSlide::active()->get();

        return Inertia::render('Home', [
            'heroSlides' => $heroSlides,
            'featuredProducts' => $featuredProducts,
            'featuredVendors' => $featuredVendors,
            'eventTypes' => $eventTypes,
            'categories' => $categories,
            'recentReviews' => $recentReviews,
        ]);
    }
}
