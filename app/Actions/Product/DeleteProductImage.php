<?php

namespace App\Actions\Product;

use App\Models\ProductImage;
use Illuminate\Support\Facades\Storage;

class DeleteProductImage
{
    public function execute(ProductImage $image): void
    {
        if ($image->url) {
            Storage::disk('public')->delete($image->url);
        }

        if ($image->thumbnail_url) {
            Storage::disk('public')->delete($image->thumbnail_url);
        }

        $wasPrimary = $image->is_primary;
        $productId = $image->product_id;

        $image->delete();

        if ($wasPrimary) {
            ProductImage::query()
                ->where('product_id', $productId)
                ->orderBy('sort_order')
                ->first()
                ?->update(['is_primary' => true]);
        }
    }
}
