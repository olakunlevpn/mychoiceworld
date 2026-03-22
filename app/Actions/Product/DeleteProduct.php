<?php

namespace App\Actions\Product;

use App\Models\Product;
use Illuminate\Support\Facades\Storage;

class DeleteProduct
{
    public function execute(Product $product): void
    {
        foreach ($product->images as $image) {
            if ($image->url) {
                Storage::disk('public')->delete($image->url);
            }
            if ($image->thumbnail_url) {
                Storage::disk('public')->delete($image->thumbnail_url);
            }
        }

        $product->delete();
    }
}
