<?php

namespace Database\Factories;

use App\Enums\Gender;
use App\Enums\ProductStatus;
use App\Models\Category;
use App\Models\Product;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;

/**
 * @extends Factory<Product>
 */
class ProductFactory extends Factory
{
    protected $model = Product::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $productNames = [
            'Silk Wrap Dress', 'Slim Fit Chinos', 'Embroidered Blouse',
            'Leather Crossbody Bag', 'Pleated Midi Skirt', 'Tailored Blazer',
            'Cotton Polo Shirt', 'High-Waist Trousers', 'Beaded Clutch Bag',
            'Floral Maxi Dress', 'Denim Jacket', 'Cashmere Sweater',
            'Linen Summer Dress', 'Sequin Evening Gown', 'Classic White Shirt',
            'Velvet Loafers', 'Pearl Drop Earrings', 'Woven Belt',
            'Printed Scarf', 'Block Heel Sandals', 'Ruffle Top',
            'Straight Leg Jeans', 'Satin Camisole', 'Tweed Coat',
            'Mesh Sneakers', 'Statement Necklace', 'Palazzo Pants',
            'Off-Shoulder Top', 'Suede Ankle Boots', 'Knit Cardigan',
        ];

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

        $name = fake()->randomElement($productNames);
        $color = fake()->randomElement($colors);
        $price = fake()->numberBetween(1500, 45000);

        return [
            'vendor_id' => Vendor::factory(),
            'category_id' => Category::factory(),
            'name' => $name,
            'slug' => Str::slug($name).'-'.fake()->unique()->numberBetween(1, 9999),
            'description' => fake()->paragraph(2),
            'price' => $price,
            'compare_price' => fake()->boolean(30) ? $price + fake()->numberBetween(1000, 10000) : null,
            'currency' => 'INR',
            'gender' => fake()->randomElement(Gender::cases()),
            'primary_color' => $color['name'],
            'primary_color_hex' => $color['hex'],
            'status' => ProductStatus::Active,
            'is_featured' => fake()->boolean(15),
            'is_reservable' => true,
        ];
    }

    /**
     * Set status to draft.
     */
    public function draft(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProductStatus::Draft,
        ]);
    }

    /**
     * Set status to active.
     */
    public function active(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProductStatus::Active,
        ]);
    }

    /**
     * Set status to out of stock.
     */
    public function outOfStock(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProductStatus::OutOfStock,
        ]);
    }

    /**
     * Set status to archived.
     */
    public function archived(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ProductStatus::Archived,
        ]);
    }

    /**
     * Mark product as featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}
