<?php

namespace App\Actions\Reservation;

use App\Enums\ReservationStatus;
use App\Events\ReservationStatusChanged;
use App\Models\Reservation;
use Illuminate\Validation\ValidationException;

class CompleteReservation
{
    public function execute(Reservation $reservation): Reservation
    {
        if ($reservation->status !== ReservationStatus::Confirmed) {
            throw ValidationException::withMessages([
                'status' => __('reservation.invalid_status_transition'),
            ]);
        }

        $oldStatus = $reservation->status;

        $reservation->update([
            'status' => ReservationStatus::Completed,
            'completed_at' => now(),
        ]);

        event(new ReservationStatusChanged($reservation, $oldStatus, ReservationStatus::Completed));

        return $reservation->fresh();
    }
}
