<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum ReservationSource: string implements HasColor, HasLabel
{
    case Browse = 'browse';
    case AiMatch = 'ai_match';

    public function getLabel(): string
    {
        return match ($this) {
            self::Browse => __('enums.source_browse'),
            self::AiMatch => __('enums.source_ai_match'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Browse => 'info',
            self::AiMatch => 'success',
        };
    }
}
