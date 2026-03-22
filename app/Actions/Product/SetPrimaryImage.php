<?php

namespace App\Actions\Product;

use App\Models\ProductImage;

class SetPrimaryImage
{
    public function execute(ProductImage $image): void
    {
        ProductImage::query()
            ->where('product_id', $image->product_id)
            ->update(['is_primary' => false]);

        $image->update(['is_primary' => true]);
    }
}
