<?php

namespace App\Actions\Product;

use App\Jobs\ProcessProductImage;
use App\Models\Product;
use App\Models\ProductImage;
use Illuminate\Http\UploadedFile;

class UploadProductImage
{
    public function execute(Product $product, UploadedFile $file, ?string $altText = null): ProductImage
    {
        $path = $file->store('products/'.$product->id, 'public');

        $isPrimary = $product->images()->count() === 0;
        $sortOrder = $product->images()->max('sort_order') + 1;

        $image = $product->images()->create([
            'url' => $path,
            'alt_text' => $altText,
            'sort_order' => $sortOrder,
            'is_primary' => $isPrimary,
        ]);

        ProcessProductImage::dispatch($image);

        return $image;
    }
}
