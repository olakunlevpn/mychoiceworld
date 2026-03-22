<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class CreateReservationData extends Data
{
    public function __construct(
        public int $product_id,
        public ?int $variant_id,
        public ?string $customer_note,
        public string $source = 'browse',
    ) {}
}
