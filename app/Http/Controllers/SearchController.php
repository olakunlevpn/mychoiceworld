<?php

namespace App\Http\Controllers;

use App\Concerns\SearchableWithFallback;
use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class SearchController extends Controller
{
    use SearchableWithFallback;

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
