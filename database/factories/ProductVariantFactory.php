<?php

namespace Database\Factories;

use App\Models\Product;
use App\Models\ProductVariant;
use Illuminate\Database\Eloquent\Factories\Factory;

/**
 * @extends Factory<ProductVariant>
 */
class ProductVariantFactory extends Factory
{
    protected $model = ProductVariant::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $sizes = ['XS', 'S', 'M', 'L', 'XL', 'XXL', '36', '38', '40', '42'];

        $colors = [
            ['name' => 'Black', 'hex' => '#000000'],
            ['name' => 'White', 'hex' => '#FFFFFF'],
            ['name' => 'Navy', 'hex' => '#1B1F3B'],
            ['name' => 'Burgundy', 'hex' => '#800020'],
            ['name' => 'Emerald', 'hex' => '#50C878'],
            ['name' => 'Coral', 'hex' => '#FF6F61'],
            ['name' => 'Blush Pink', 'hex' => '#F5C6C6'],
            ['name' => 'Mustard', 'hex' => '#FFDB58'],
            ['name' => 'Olive', 'hex' => '#808000'],
            ['name' => 'Teal', 'hex' => '#008080'],
            ['name' => 'Lavender', 'hex' => '#E6E6FA'],
            ['name' => 'Rust', 'hex' => '#B7410E'],
            ['name' => 'Charcoal', 'hex' => '#36454F'],
            ['name' => 'Ivory', 'hex' => '#FFFFF0'],
            ['name' => 'Sage', 'hex' => '#BCB88A'],
            ['name' => 'Cobalt Blue', 'hex' => '#0047AB'],
            ['name' => 'Crimson', 'hex' => '#DC143C'],
            ['name' => 'Taupe', 'hex' => '#483C32'],
            ['name' => 'Dusty Rose', 'hex' => '#DCAE96'],
            ['name' => 'Forest Green', 'hex' => '#228B22'],
        ];

        $color = fake()->randomElement($colors);

        return [
            'product_id' => Product::factory(),
            'size' => fake()->randomElement($sizes),
            'color' => $color['name'],
            'color_hex' => $color['hex'],
            'sku' => fake()->bothify('SKU-????-####'),
            'stock_quantity' => fake()->numberBetween(0, 50),
            'price_override' => fake()->boolean(10) ? fake()->numberBetween(1500, 50000) : null,
            'is_active' => true,
        ];
    }
}
