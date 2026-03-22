<?php

namespace App\Actions\Product;

use App\Models\Product;
use App\Models\ProductVariant;

class CreateVariant
{
    /**
     * @param  array<string, mixed>  $data
     */
    public function execute(Product $product, array $data): ProductVariant
    {
        return $product->variants()->create($data);
    }
}
