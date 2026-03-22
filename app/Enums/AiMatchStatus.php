<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum AiMatchStatus: string implements HasColor, HasIcon, HasLabel
{
    case Processing = 'processing';
    case Completed = 'completed';
    case Failed = 'failed';

    public function getLabel(): string
    {
        return match ($this) {
            self::Processing => __('enums.ai_match_status_processing'),
            self::Completed => __('enums.ai_match_status_completed'),
            self::Failed => __('enums.ai_match_status_failed'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Processing => 'warning',
            self::Completed => 'success',
            self::Failed => 'danger',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Processing => 'heroicon-m-arrow-path',
            self::Completed => 'heroicon-m-check-circle',
            self::Failed => 'heroicon-m-x-circle',
        };
    }
}
