<?php

namespace App\Events;

use App\Enums\ReservationStatus;
use App\Models\Reservation;
use Illuminate\Foundation\Events\Dispatchable;
use Illuminate\Queue\SerializesModels;

class ReservationStatusChanged
{
    use Dispatchable, SerializesModels;

    public function __construct(
        public Reservation $reservation,
        public ReservationStatus $oldStatus,
        public ReservationStatus $newStatus,
    ) {}
}
