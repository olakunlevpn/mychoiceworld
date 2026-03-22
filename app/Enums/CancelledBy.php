<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum CancelledBy: string implements HasColor, HasLabel
{
    case Customer = 'customer';
    case Vendor = 'vendor';
    case System = 'system';

    public function getLabel(): string
    {
        return match ($this) {
            self::Customer => __('enums.cancelled_by_customer'),
            self::Vendor => __('enums.cancelled_by_vendor'),
            self::System => __('enums.cancelled_by_system'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Customer => 'info',
            self::Vendor => 'warning',
            self::System => 'gray',
        };
    }
}
