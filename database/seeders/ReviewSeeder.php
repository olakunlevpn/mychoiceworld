<?php

namespace Database\Seeders;

use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class ReviewSeeder extends Seeder
{
    public function run(): void
    {
        $completedReservations = Reservation::where('status', 'completed')->get();

        // Link 40 reviews to completed reservations
        foreach ($completedReservations->take(40) as $reservation) {
            Review::factory()->create([
                'customer_id' => $reservation->customer_id,
                'vendor_id' => $reservation->vendor_id,
                'reservation_id' => $reservation->id,
            ]);
        }

        // 20 reviews without reservation link
        $customers = User::where('role', 'customer')->pluck('id')->toArray();
        $vendors = Vendor::where('status', 'approved')->pluck('id')->toArray();

        for ($i = 0; $i < 20; $i++) {
            Review::factory()->create([
                'customer_id' => fake()->randomElement($customers),
                'vendor_id' => fake()->randomElement($vendors),
                'reservation_id' => null,
            ]);
        }
    }
}
