<?php

namespace App\Http\Controllers;

use App\Models\Category;
use App\Models\EventType;
use App\Models\HeroSlide;
use App\Models\Product;
use App\Models\Review;
use App\Models\Vendor;
use Inertia\Inertia;
use Inertia\Response;

class HomeController extends Controller
{
    public function __invoke(): Response
    {
        $featuredProducts = Product::query()
            ->active()
            ->featured()
            ->fromApprovedVendors()
            ->with(['primaryImage', 'vendor:id,store_name,slug,city'])
            ->limit(12)
            ->latest()
            ->get();

        $featuredVendors = Vendor::query()
            ->approved()
            ->featured()
            ->select(['id', 'store_name', 'slug', 'logo', 'city', 'rating_avg', 'rating_count'])
            ->withCount(['products' => fn ($q) => $q->active()])
            ->limit(8)
            ->latest()
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
