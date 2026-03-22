<?php

namespace Database\Seeders;

use App\Models\Vendor;
use App\Models\VendorAnalytic;
use Carbon\Carbon;
use Illuminate\Database\Seeder;

class VendorAnalyticsSeeder extends Seeder
{
    public function run(): void
    {
        $vendors = Vendor::where('status', 'approved')->get();

        foreach ($vendors as $vendor) {
            for ($day = 30; $day >= 1; $day--) {
                $date = Carbon::now()->subDays($day);
                $reservationsMade = fake()->numberBetween(0, 8);

                VendorAnalytic::create([
                    'vendor_id' => $vendor->id,
                    'date' => $date->toDateString(),
                    'profile_views' => fake()->numberBetween(10, 200),
                    'product_views' => fake()->numberBetween(20, 500),
                    'reservations_made' => $reservationsMade,
                    'reservations_completed' => fake()->numberBetween(0, $reservationsMade),
                    'reservations_no_show' => fake()->numberBetween(0, max(0, $reservationsMade - 2)),
                    'ai_matches_shown' => fake()->numberBetween(0, 30),
                ]);
            }
        }
    }
}
