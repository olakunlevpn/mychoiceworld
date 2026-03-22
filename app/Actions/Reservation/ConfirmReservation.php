<?php

namespace App\Actions\Reservation;

use App\Enums\ReservationStatus;
use App\Events\ReservationStatusChanged;
use App\Models\Reservation;
use Illuminate\Validation\ValidationException;

class ConfirmReservation
{
    public function execute(Reservation $reservation): Reservation
    {
        if ($reservation->status !== ReservationStatus::Pending) {
            throw ValidationException::withMessages([
                'status' => __('reservation.invalid_status_transition'),
            ]);
        }

        $oldStatus = $reservation->status;

        $reservation->update([
            'status' => ReservationStatus::Confirmed,
            'confirmed_at' => now(),
        ]);

        event(new ReservationStatusChanged($reservation, $oldStatus, ReservationStatus::Confirmed));

        return $reservation->fresh();
    }
}
