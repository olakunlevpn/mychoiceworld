<?php

namespace Database\Factories;

use App\Enums\AiMatchStatus;
use App\Models\AiMatchSession;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<AiMatchSession>
 */
class AiMatchSessionFactory extends Factory
{
    protected $model = AiMatchSession::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $budgetMin = fake()->numberBetween(2000, 10000);

        return [
            'customer_id' => User::factory(),
            'session_token' => Str::random(64),
            'event_type_id' => null,
            'style_preference_id' => null,
            'budget_min' => $budgetMin,
            'budget_max' => fn (array $attrs) => $attrs['budget_min'] + fake()->numberBetween(5000, 40000),
            'selfie_uploaded' => fake()->boolean(40),
            'selfie_url' => null,
            'skin_tone' => fake()->optional(0.4)->randomElement(['light', 'fair', 'medium', 'olive', 'tan', 'brown', 'dark', 'deep']),
            'face_shape' => fake()->optional(0.4)->randomElement(['oval', 'round', 'square', 'heart', 'oblong']),
            'recommended_colors' => null,
            'results_count' => fake()->numberBetween(0, 20),
            'latitude' => fake()->latitude(40.5, 40.9),
            'longitude' => fake()->longitude(-74.2, -73.8),
            'status' => AiMatchStatus::Completed,
        ];
    }
}
