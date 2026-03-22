<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum VendorStatus: string implements HasColor, HasIcon, HasLabel
{
    case Pending = 'pending';
    case Approved = 'approved';
    case Suspended = 'suspended';
    case Rejected = 'rejected';

    public function getLabel(): string
    {
        return match ($this) {
            self::Pending => __('enums.vendor_status_pending'),
            self::Approved => __('enums.vendor_status_approved'),
            self::Suspended => __('enums.vendor_status_suspended'),
            self::Rejected => __('enums.vendor_status_rejected'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Pending => 'warning',
            self::Approved => 'success',
            self::Suspended => 'danger',
            self::Rejected => 'gray',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Pending => 'heroicon-m-clock',
            self::Approved => 'heroicon-m-check-circle',
            self::Suspended => 'heroicon-m-no-symbol',
            self::Rejected => 'heroicon-m-x-circle',
        };
    }
}
