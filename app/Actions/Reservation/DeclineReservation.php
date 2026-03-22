<?php

namespace App\Actions\Reservation;

use App\Enums\CancelledBy;
use App\Enums\ReservationStatus;
use App\Events\ReservationStatusChanged;
use App\Models\Reservation;
use Illuminate\Validation\ValidationException;

class DeclineReservation
{
    public function execute(Reservation $reservation, string $reason): Reservation
    {
        if (! in_array($reservation->status, [ReservationStatus::Pending, ReservationStatus::Confirmed])) {
            throw ValidationException::withMessages([
                'status' => __('reservation.invalid_status_transition'),
            ]);
        }

        $oldStatus = $reservation->status;

        $reservation->update([
            'status' => ReservationStatus::Cancelled,
            'cancelled_at' => now(),
            'cancelled_by' => CancelledBy::Vendor,
            'cancellation_reason' => $reason,
        ]);

        event(new ReservationStatusChanged($reservation, $oldStatus, ReservationStatus::Cancelled));

        return $reservation->fresh();
    }
}
