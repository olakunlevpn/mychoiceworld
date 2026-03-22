<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class AiMatchRequestData extends Data
{
    public function __construct(
        public ?int $event_type_id,
        public ?int $style_preference_id,
        public ?int $budget_min,
        public ?int $budget_max,
        public ?string $skin_tone,
        public ?float $latitude,
        public ?float $longitude,
    ) {}
}
