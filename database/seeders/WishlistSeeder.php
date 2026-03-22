<?php

namespace Database\Seeders;

use App\Models\Product;
use App\Models\User;
use App\Models\Wishlist;
use Illuminate\Database\Seeder;

class WishlistSeeder extends Seeder
{
    public function run(): void
    {
        $customers = User::where('role', 'customer')->pluck('id')->toArray();
        $productIds = Product::pluck('id')->toArray();

        $created = [];
        for ($i = 0; $i < 80; $i++) {
            $customerId = fake()->randomElement($customers);
            $productId = fake()->randomElement($productIds);
            $key = "$customerId-$productId";

            if (! isset($created[$key])) {
                Wishlist::create([
                    'customer_id' => $customerId,
                    'product_id' => $productId,
                ]);
                $created[$key] = true;
            }
        }
    }
}
