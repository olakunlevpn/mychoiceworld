<?php

namespace Database\Factories;

use App\Models\Vendor;
use App\Models\VendorAnalytic;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<VendorAnalytic>
 */
class VendorAnalyticFactory extends Factory
{
    protected $model = VendorAnalytic::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reservationsMade = fake()->numberBetween(0, 15);
        $reservationsCompleted = fake()->numberBetween(0, $reservationsMade);

        return [
            'vendor_id' => Vendor::factory(),
            'date' => fake()->dateTimeBetween('-30 days', 'now'),
            'profile_views' => fake()->numberBetween(5, 200),
            'product_views' => fake()->numberBetween(10, 500),
            'reservations_made' => $reservationsMade,
            'reservations_completed' => fn (array $attrs) => fake()->numberBetween(0, $attrs['reservations_made']),
            'reservations_no_show' => fn (array $attrs) => fake()->numberBetween(0, max(0, $attrs['reservations_made'] - $attrs['reservations_completed'])),
            'ai_matches_shown' => fake()->numberBetween(0, 50),
        ];
    }
}
