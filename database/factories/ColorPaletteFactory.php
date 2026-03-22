<?php

namespace Database\Factories;

use App\Models\ColorPalette;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ColorPalette>
 */
class ColorPaletteFactory extends Factory
{
    protected $model = ColorPalette::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'skin_tone' => fake()->randomElement(['light', 'fair', 'medium', 'olive', 'tan', 'brown', 'dark', 'deep']),
            'color_name' => fake()->colorName(),
            'color_hex' => fake()->hexColor(),
            'season' => fake()->optional(0.5)->randomElement(['spring', 'summer', 'autumn', 'winter']),
            'score' => fake()->randomFloat(2, 0.3, 1.0),
        ];
    }
}
