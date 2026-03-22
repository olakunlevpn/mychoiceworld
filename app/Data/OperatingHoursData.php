<?php

namespace App\Data;

use Spatie\LaravelData\Data;

class OperatingHoursData extends Data
{
    /**
     * @param  array<string, array{open: string, close: string, closed: bool}>  $hours
     */
    public function __construct(
        public array $hours,
    ) {}
}
