<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum UserRole: string implements HasColor, HasLabel
{
    case Customer = 'customer';
    case Vendor = 'vendor';
    case Admin = 'admin';

    public function getLabel(): string
    {
        return match ($this) {
            self::Customer => __('enums.role_customer'),
            self::Vendor => __('enums.role_vendor'),
            self::Admin => __('enums.role_admin'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Customer => 'info',
            self::Vendor => 'warning',
            self::Admin => 'danger',
        };
    }
}
