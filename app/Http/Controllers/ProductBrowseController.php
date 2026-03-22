<?php

namespace App\Http\Controllers;

use App\Concerns\SearchableWithFallback;
use App\Enums\Gender;
use App\Enums\ProductStatus;
use App\Enums\VendorStatus;
use App\Models\Category;
use App\Models\EventType;
use App\Models\Product;
use App\Models\StylePreference;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;
use Symfony\Component\HttpFoundation\Response as HttpResponse;

class ProductBrowseController extends Controller
{
    use SearchableWithFallback;

    public function index(Request $request): Response
    {
        $lat = $request->float('lat');
        $lng = $request->float('lng');
        $hasCoords = $lat && $lng;

        $products = Product::query()
            ->active()
            ->fromApprovedVendors()
            ->with(['primaryImage', 'vendor:id,store_name,slug,city', 'category:id,name,slug'])
            ->when($hasCoords, function ($q) use ($lat, $lng) {
                $q->addSelect(['products.*'])
                    ->selectRaw(
                        'ST_Distance_Sphere(
                            (SELECT location FROM vendors WHERE vendors.id = products.vendor_id),
                            ST_GeomFromText(?)
                        ) / 1000 as distance_km',
                        ["POINT({$lng} {$lat})"]
                    );
            })
            ->when($request->input('search'), function ($q, $search) {
                $ids = $this->searchIds(Product::class, $search);

                return $ids !== null
                    ? $q->whereIn('id', $ids)
                    : $q->search($search);
            })
            ->when($request->input('category'), fn ($q, $slug) => $q->whereHas('category', fn ($cq) => $cq->where('slug', $slug)))
            ->when($request->input('gender'), fn ($q, $gender) => $q->where('gender', $gender))
            ->when($request->input('min_price'), fn ($q, $min) => $q->where('price', '>=', (int) ($min * 100)))
            ->when($request->input('max_price'), fn ($q, $max) => $q->where('price', '<=', (int) ($max * 100)))
            ->when($request->input('event_type'), fn ($q, $id) => $q->whereHas('eventTypes', fn ($eq) => $eq->where('event_types.id', $id)))
            ->when($request->input('style_preference'), fn ($q, $id) => $q->whereHas('stylePreferences', fn ($sq) => $sq->where('style_preferences.id', $id)))
            ->when($request->input('sort'), function ($q, $sort) use ($hasCoords) {
                return match ($sort) {
                    'price_asc' => $q->orderBy('price', 'asc'),
                    'price_desc' => $q->orderBy('price', 'desc'),
                    'popular' => $q->orderBy('reservations_count', 'desc'),
                    'distance' => $hasCoords ? $q->orderBy('distance_km', 'asc') : $q->latest(),
                    default => $q->latest(),
                };
            }, fn ($q) => $q->latest())
            ->paginate(24)
            ->withQueryString();

        $categories = Category::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name', 'slug']);

        $eventTypes = EventType::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        $stylePreferences = StylePreference::query()
            ->where('is_active', true)
            ->orderBy('name')
            ->get(['id', 'name']);

        return Inertia::render('Discover', [
            'products' => $products,
            'categories' => $categories,
            'eventTypes' => $eventTypes,
            'stylePreferences' => $stylePreferences,
            'genders' => collect(Gender::cases())->map(fn ($g) => [
                'value' => $g->value,
                'label' => $g->getLabel(),
            ]),
            'filters' => $request->only(['search', 'category', 'gender', 'min_price', 'max_price', 'event_type', 'style_preference', 'sort']),
        ]);
    }

    public function show(Request $request, Product $product): Response|HttpResponse
    {
        if ($product->status !== ProductStatus::Active) {
            abort(404);
        }

        if (! $product->vendor || $product->vendor->status !== VendorStatus::Approved) {
            abort(404);
        }

        $product->load([
            'images' => fn ($q) => $q->orderBy('sort_order'),
            'variants' => fn ($q) => $q->where('is_active', true),
            'vendor:id,store_name,slug,logo,city,phone,whatsapp,email,address,operating_hours,rating_avg,rating_count',
            'category:id,name,slug',
            'eventTypes:id,name',
            'stylePreferences:id,name',
        ]);

        $relatedProducts = Product::query()
            ->active()
            ->fromApprovedVendors()
            ->where('id', '!=', $product->id)
            ->where(fn ($q) => $q
                ->where('category_id', $product->category_id)
                ->orWhere('vendor_id', $product->vendor_id))
            ->with(['primaryImage', 'vendor:id,store_name,slug'])
            ->limit(8)
            ->inRandomOrder()
            ->get();

        $wishlisted = false;
        if ($request->user()) {
            $wishlisted = $product->wishlists()
                ->where('customer_id', $request->user()->id)
                ->exists();
        }

        $sizes = $product->variants
            ->pluck('size')
            ->filter()
            ->unique()
            ->values();

        $colors = $product->variants
            ->filter(fn ($v) => filled($v->color_hex))
            ->unique('color_hex')
            ->map(fn ($v) => [
                'name' => $v->color,
                'hex' => $v->color_hex,
            ])
            ->values();

        return Inertia::render('ProductDetail', [
            'product' => $product,
            'relatedProducts' => $relatedProducts,
            'wishlisted' => $wishlisted,
            'sizes' => $sizes,
            'colors' => $colors,
        ]);
    }
}
