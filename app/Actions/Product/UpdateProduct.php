<?php

namespace App\Actions\Product;

use App\Data\ProductData;
use App\Models\Product;

class UpdateProduct
{
    public function execute(Product $product, ProductData $data): Product
    {
        $product->update([
            'name' => $data->name,
            'description' => $data->description,
            'price' => $data->price,
            'compare_price' => $data->compare_price,
            'gender' => $data->gender,
            'primary_color' => $data->primary_color,
            'primary_color_hex' => $data->primary_color_hex,
            'status' => $data->status,
            'is_featured' => $data->is_featured,
            'is_reservable' => $data->is_reservable,
            'category_id' => $data->category_id,
        ]);

        if ($data->event_type_ids !== null) {
            $product->eventTypes()->sync($data->event_type_ids);
        }

        if ($data->style_preference_ids !== null) {
            $product->stylePreferences()->sync($data->style_preference_ids);
        }

        return $product->fresh();
    }
}
