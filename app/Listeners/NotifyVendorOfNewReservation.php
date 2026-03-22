<?php

namespace App\Listeners;

use App\Events\ReservationCreated;
use App\Notifications\NewReservationForVendor;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyVendorOfNewReservation implements ShouldQueue
{
    public function handle(ReservationCreated $event): void
    {
        $reservation = $event->reservation;
        $vendorUser = $reservation->vendor->user;

        $vendorUser->notify(new NewReservationForVendor($reservation));
    }
}
