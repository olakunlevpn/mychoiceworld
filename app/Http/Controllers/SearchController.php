<?php

namespace App\Http\Controllers;

use App\Concerns\SearchableWithFallback;
use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Http\JsonResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    use SearchableWithFallback;

    public function suggest(Request $request): JsonResponse
    {
        $query = $request->input('q', '');

        if (strlen($query) < 2) {
            return response()->json([]);
        }

        $escaped = str_replace(['%', '_'], ['\\%', '\\_'], $query);

        $products = Product::query()
            ->active()
            ->fromApprovedVendors()
            ->where('name', 'LIKE', "%{$escaped}%")
            ->with(['primaryImage:id,product_id,url', 'vendor:id,store_name'])
            ->limit(5)
            ->get(['id', 'name', 'slug', 'price', 'vendor_id'])
            ->map(fn (Product $p) => [
                'type' => 'product',
                'id' => $p->id,
                'name' => $p->name,
                'slug' => $p->slug,
                'url' => "/products/{$p->slug}",
                'image' => $p->primaryImage?->url,
                'subtitle' => $p->vendor?->store_name,
            ]);

        $vendors = Vendor::query()
            ->approved()
            ->where('store_name', 'LIKE', "%{$escaped}%")
            ->limit(3)
            ->get(['id', 'store_name', 'slug', 'logo', 'city'])
            ->map(fn (Vendor $v) => [
                'type' => 'store',
                'id' => $v->id,
                'name' => $v->store_name,
                'slug' => $v->slug,
                'url' => "/stores/{$v->slug}",
                'image' => $v->logo,
                'subtitle' => $v->city,
            ]);

        return response()->json($products->concat($vendors)->values());
    }

    public function __invoke(Request $request): Response
    {
        $query = $request->input('q', '');

        $products = collect();
        $vendors = collect();

        if (strlen($query) >= 2) {
            $productIds = $this->searchIds(Product::class, $query);
            $vendorIds = $this->searchIds(Vendor::class, $query);

            $products = Product::query()
                ->active()
                ->fromApprovedVendors()
                ->when($productIds !== null,
                    fn ($q) => $q->whereIn('id', $productIds),
                    fn ($q) => $q->search($query))
                ->with(['primaryImage', 'vendor:id,store_name,slug,city', 'category:id,name'])
                ->limit(20)
                ->get();

            $vendors = Vendor::query()
                ->approved()
                ->when($vendorIds !== null,
                    fn ($q) => $q->whereIn('id', $vendorIds),
                    fn ($q) => $q->search($query))
                ->select(['id', 'store_name', 'slug', 'logo', 'city', 'rating_avg', 'rating_count'])
                ->limit(20)
                ->get();
        }

        return Inertia::render('SearchResults', [
            'query' => $query,
            'products' => $products,
            'vendors' => $vendors,
        ]);
    }
}
