<?php

namespace Database\Seeders;

use App\Models\Category;
use App\Models\EventType;
use App\Models\Product;
use App\Models\ProductImage;
use App\Models\ProductVariant;
use App\Models\StylePreference;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class ProductSeeder extends Seeder
{
    public function run(): void
    {
        $approvedVendors = Vendor::where('status', 'approved')->get();
        $categories = Category::whereNotNull('parent_id')->pluck('id')->toArray();
        $eventTypeIds = EventType::pluck('id')->toArray();
        $styleIds = StylePreference::pluck('id')->toArray();

        foreach ($approvedVendors as $vendor) {
            $productCount = fake()->numberBetween(15, 25);

            for ($i = 0; $i < $productCount; $i++) {
                $product = Product::factory()->create([
                    'vendor_id' => $vendor->id,
                    'category_id' => fake()->randomElement($categories),
                ]);

                // Create 2-5 images, first one is primary
                $imageCount = fake()->numberBetween(2, 5);
                ProductImage::factory()->primary()->create(['product_id' => $product->id]);
                ProductImage::factory()->count($imageCount - 1)->create(['product_id' => $product->id]);

                // Create 2-4 variants
                ProductVariant::factory()->count(fake()->numberBetween(2, 4))->create([
                    'product_id' => $product->id,
                ]);

                // Attach 1-3 event types
                $product->eventTypes()->attach(
                    fake()->randomElements($eventTypeIds, fake()->numberBetween(1, 3))
                );

                // Attach 1-3 style preferences
                $product->stylePreferences()->attach(
                    fake()->randomElements($styleIds, fake()->numberBetween(1, 3))
                );
            }
        }
    }
}
