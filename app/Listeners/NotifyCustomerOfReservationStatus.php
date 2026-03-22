<?php

namespace App\Listeners;

use App\Enums\CancelledBy;
use App\Enums\ReservationStatus;
use App\Events\ReservationStatusChanged;
use App\Notifications\ReservationCompleted;
use App\Notifications\ReservationConfirmed;
use App\Notifications\ReservationDeclined;
use App\Notifications\ReservationExpired;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyCustomerOfReservationStatus implements ShouldQueue
{
    public function handle(ReservationStatusChanged $event): void
    {
        $reservation = $event->reservation;
        $customer = $reservation->customer;

        $notification = match ($event->newStatus) {
            ReservationStatus::Confirmed => new ReservationConfirmed($reservation),
            ReservationStatus::Cancelled => $reservation->cancelled_by !== CancelledBy::Customer
                ? new ReservationDeclined($reservation)
                : null,
            ReservationStatus::Completed => new ReservationCompleted($reservation),
            ReservationStatus::Expired => new ReservationExpired($reservation),
            default => null,
        };

        if ($notification) {
            $customer->notify($notification);
        }
    }
}
