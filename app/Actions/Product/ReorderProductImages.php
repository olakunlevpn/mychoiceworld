<?php

namespace App\Actions\Product;

use App\Models\ProductImage;

class ReorderProductImages
{
    /**
     * @param  array<int>  $imageIds
     */
    public function execute(array $imageIds): void
    {
        foreach ($imageIds as $index => $imageId) {
            ProductImage::query()
                ->where('id', $imageId)
                ->update(['sort_order' => $index]);
        }
    }
}
