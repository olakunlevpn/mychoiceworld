<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class CreateReviewData extends Data
{
    public function __construct(
        public int $reservation_id,
        public int $rating,
        public ?string $comment,
    ) {}
}
