<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class ProductData extends Data
{
    /**
     * @param  array<int>|null  $event_type_ids
     * @param  array<int>|null  $style_preference_ids
     */
    public function __construct(
        public string $name,
        public ?string $description,
        public int $price,
        public ?int $compare_price,
        public string $gender,
        public ?string $primary_color,
        public ?string $primary_color_hex,
        public string $status,
        public bool $is_featured,
        public bool $is_reservable,
        public ?int $category_id,
        public ?array $event_type_ids,
        public ?array $style_preference_ids,
    ) {}
}
