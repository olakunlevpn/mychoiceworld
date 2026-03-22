<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum ProductStatus: string implements HasColor, HasIcon, HasLabel
{
    case Draft = 'draft';
    case Active = 'active';
    case OutOfStock = 'out_of_stock';
    case Archived = 'archived';

    public function getLabel(): string
    {
        return match ($this) {
            self::Draft => __('enums.product_status_draft'),
            self::Active => __('enums.product_status_active'),
            self::OutOfStock => __('enums.product_status_out_of_stock'),
            self::Archived => __('enums.product_status_archived'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Draft => 'gray',
            self::Active => 'success',
            self::OutOfStock => 'warning',
            self::Archived => 'danger',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Draft => 'heroicon-m-pencil-square',
            self::Active => 'heroicon-m-check-circle',
            self::OutOfStock => 'heroicon-m-exclamation-triangle',
            self::Archived => 'heroicon-m-archive-box',
        };
    }
}
