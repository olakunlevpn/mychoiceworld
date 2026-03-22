<?php

namespace Database\Factories;

use App\Models\Review;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<Review>
 */
class ReviewFactory extends Factory
{
    protected $model = Review::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $vendorReply = fake()->optional(0.4)->paragraph();

        return [
            'customer_id' => User::factory(),
            'vendor_id' => Vendor::factory(),
            'reservation_id' => null,
            'rating' => fake()->numberBetween(1, 5),
            'comment' => fake()->paragraph(),
            'is_published' => true,
            'vendor_reply' => $vendorReply,
            'vendor_replied_at' => fn (array $attrs) => $attrs['vendor_reply'] ? fake()->dateTimeBetween('-7 days', 'now') : null,
        ];
    }
}
