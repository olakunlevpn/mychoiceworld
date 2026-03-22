<?php

namespace App\Actions\Product;

use App\Models\ProductVariant;

class DeleteVariant
{
    public function execute(ProductVariant $variant): void
    {
        $variant->delete();
    }
}
