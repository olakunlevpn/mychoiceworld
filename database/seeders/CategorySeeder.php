<?php

namespace Database\Seeders;

use App\Models\Category;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class CategorySeeder extends Seeder
{
    public function run(): void
    {
        $sortOrder = 0;

        $categories = [
            "Men's Fashion" => ['Shirts', 'T-Shirts', 'Trousers', 'Jeans', 'Suits', 'Jackets', 'Shorts'],
            "Women's Fashion" => ['Dresses', 'Tops', 'Skirts', 'Pants', 'Gowns', 'Blouses', 'Jumpsuits'],
            "Kids' Fashion" => ['Boys Wear', 'Girls Wear', 'Baby Wear'],
            'Footwear' => ["Men's Shoes", "Women's Shoes", 'Sneakers', 'Sandals', 'Boots'],
            'Accessories' => ['Bags', 'Jewelry', 'Watches', 'Belts', 'Scarves', 'Sunglasses'],
        ];

        foreach ($categories as $parentName => $children) {
            $sortOrder++;

            $parent = Category::firstOrCreate(
                ['slug' => Str::slug($parentName)],
                [
                    'name' => $parentName,
                    'sort_order' => $sortOrder,
                    'is_active' => true,
                ]
            );

            foreach ($children as $childName) {
                $sortOrder++;

                Category::firstOrCreate(
                    ['slug' => Str::slug($childName)],
                    [
                        'name' => $childName,
                        'parent_id' => $parent->id,
                        'sort_order' => $sortOrder,
                        'is_active' => true,
                    ]
                );
            }
        }
    }
}
