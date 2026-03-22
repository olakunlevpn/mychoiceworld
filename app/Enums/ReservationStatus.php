<?php

namespace App\Enums;

use Filament\Support\Contracts\HasColor;
use Filament\Support\Contracts\HasIcon;
use Filament\Support\Contracts\HasLabel;

enum ReservationStatus: string implements HasColor, HasIcon, HasLabel
{
    case Pending = 'pending';
    case Confirmed = 'confirmed';
    case Completed = 'completed';
    case Cancelled = 'cancelled';
    case Expired = 'expired';
    case NoShow = 'no_show';

    public function getLabel(): string
    {
        return match ($this) {
            self::Pending => __('enums.reservation_status_pending'),
            self::Confirmed => __('enums.reservation_status_confirmed'),
            self::Completed => __('enums.reservation_status_completed'),
            self::Cancelled => __('enums.reservation_status_cancelled'),
            self::Expired => __('enums.reservation_status_expired'),
            self::NoShow => __('enums.reservation_status_no_show'),
        };
    }

    public function getColor(): string
    {
        return match ($this) {
            self::Pending => 'warning',
            self::Confirmed => 'info',
            self::Completed => 'success',
            self::Cancelled => 'danger',
            self::Expired => 'gray',
            self::NoShow => 'danger',
        };
    }

    public function getIcon(): string
    {
        return match ($this) {
            self::Pending => 'heroicon-m-clock',
            self::Confirmed => 'heroicon-m-check-badge',
            self::Completed => 'heroicon-m-check-circle',
            self::Cancelled => 'heroicon-m-x-circle',
            self::Expired => 'heroicon-m-clock',
            self::NoShow => 'heroicon-m-eye-slash',
        };
    }
}
