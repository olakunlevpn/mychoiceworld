<?php

namespace App\Http\Controllers\Customer;

use App\Actions\Customer\ToggleWishlist;
use App\Http\Controllers\Controller;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class WishlistController extends Controller
{
    public function index(Request $request): Response
    {
        $wishlists = $request->user()
            ->wishlists()
            ->with([
                'product:id,name,slug,price,compare_price,status',
                'product.primaryImage',
                'product.vendor:id,store_name,slug',
                'product.category:id,name',
            ])
            ->latest()
            ->paginate(15);

        return Inertia::render('Customer/Wishlist', [
            'wishlists' => $wishlists,
        ]);
    }

    public function toggle(Request $request, ToggleWishlist $action): RedirectResponse
    {
        $request->validate(['product_id' => ['required', 'integer', 'exists:products,id']]);

        $result = $action->execute($request->user(), $request->input('product_id'));

        $message = $result['added']
            ? __('customer.added_to_wishlist')
            : __('customer.removed_from_wishlist');

        return back()->with('success', $message);
    }
}
