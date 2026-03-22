<?php

namespace App\Actions\Product;

use App\Data\ProductData;
use App\Models\Product;
use App\Models\Vendor;
use App\Settings\GeneralSettings;
use Illuminate\Support\Str;

class CreateProduct
{
    public function execute(Vendor $vendor, ProductData $data): Product
    {
        $settings = app(GeneralSettings::class);

        $product = $vendor->products()->create([
            'name' => $data->name,
            'slug' => Str::slug($data->name).'-'.Str::random(5),
            'description' => $data->description,
            'price' => $data->price,
            'compare_price' => $data->compare_price,
            'currency' => $settings->currency_code,
            'gender' => $data->gender,
            'primary_color' => $data->primary_color,
            'primary_color_hex' => $data->primary_color_hex,
            'status' => $data->status,
            'is_featured' => $data->is_featured,
            'is_reservable' => $data->is_reservable,
            'category_id' => $data->category_id,
        ]);

        if ($data->event_type_ids) {
            $product->eventTypes()->sync($data->event_type_ids);
        }

        if ($data->style_preference_ids) {
            $product->stylePreferences()->sync($data->style_preference_ids);
        }

        return $product;
    }
}
