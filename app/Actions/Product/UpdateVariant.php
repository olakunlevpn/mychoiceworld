<?php

namespace App\Actions\Product;

use App\Models\ProductVariant;

class UpdateVariant
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function execute(ProductVariant $variant, array $data): ProductVariant
    {
        $variant->update($data);

        return $variant->fresh();
    }
}
