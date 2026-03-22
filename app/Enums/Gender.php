<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasLabel;

enum Gender: string implements HasColor, HasLabel
{
    case Men = 'men';
    case Women = 'women';
    case Unisex = 'unisex';
    case Kids = 'kids';

    public function getLabel(): string
    {
        return match ($this) {
            self::Men => __('enums.gender_men'),
            self::Women => __('enums.gender_women'),
            self::Unisex => __('enums.gender_unisex'),
            self::Kids => __('enums.gender_kids'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Men => 'info',
            self::Women => 'danger',
            self::Unisex => 'warning',
            self::Kids => 'success',
        };
    }
}
