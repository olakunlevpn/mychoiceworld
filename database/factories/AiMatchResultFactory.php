<?php

namespace Database\Factories;

use App\Models\AiMatchResult;
use App\Models\AiMatchSession;
use App\Models\Product;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<AiMatchResult>
 */
class AiMatchResultFactory extends Factory
{
    protected $model = AiMatchResult::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'match_session_id' => AiMatchSession::factory(),
            'product_id' => Product::factory(),
            'match_score' => fake()->randomFloat(2, 30, 100),
            'color_match_score' => fake()->optional(0.6)->randomFloat(2, 20, 100),
            'distance_km' => fake()->randomFloat(2, 0.5, 30),
            'rank_position' => fake()->numberBetween(1, 20),
        ];
    }
}
