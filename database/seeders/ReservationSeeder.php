<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class ReservationSeeder extends Seeder
{
    public function run(): void
    {
        $customers = User::where('role', 'customer')->pluck('id')->toArray();
        $approvedVendors = Vendor::where('status', 'approved')->with(['products.variants'])->get();

        // Create reservations with various statuses
        $statuses = [
            ['count' => 20, 'state' => 'pending'],
            ['count' => 25, 'state' => 'confirmed'],
            ['count' => 30, 'state' => 'completed'],
            ['count' => 10, 'state' => 'cancelled'],
            ['count' => 10, 'state' => 'expired'],
            ['count' => 5, 'state' => 'noShow'],
        ];

        foreach ($statuses as $statusConfig) {
            for ($i = 0; $i < $statusConfig['count']; $i++) {
                $vendor = $approvedVendors->random();
                $product = $vendor->products->random();
                $variant = $product->variants->first();

                Reservation::factory()->{$statusConfig['state']}()->create([
                    'customer_id' => fake()->randomElement($customers),
                    'vendor_id' => $vendor->id,
                    'product_id' => $product->id,
                    'variant_id' => $variant?->id,
                ]);
            }
        }
    }
}
