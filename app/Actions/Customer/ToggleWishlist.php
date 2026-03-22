<?php

namespace App\Actions\Customer;

use App\Models\User;
use App\Models\Wishlist;

class ToggleWishlist
{
    /**
     * @return array{added: bool}
     */
    public function execute(User $customer, int $productId): array
    {
        $existing = Wishlist::where('customer_id', $customer->id)
            ->where('product_id', $productId)
            ->first();

        if ($existing) {
            $existing->delete();

            return ['added' => false];
        }

        Wishlist::create([
            'customer_id' => $customer->id,
            'product_id' => $productId,
        ]);

        return ['added' => true];
    }
}
