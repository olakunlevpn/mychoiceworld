<?php

namespace App\Actions\Customer;

use App\Enums\CancelledBy;
use App\Enums\ReservationStatus;
use App\Events\ReservationStatusChanged;
use App\Models\Reservation;
use Illuminate\Validation\ValidationException;

class CancelReservation
{
    public function execute(Reservation $reservation, ?string $reason = null): Reservation
    {
        if (! $reservation->isActive()) {
            throw ValidationException::withMessages([
                'status' => __('customer.invalid_reservation_status'),
            ]);
        }

        $oldStatus = $reservation->status;

        $reservation->update([
            'status' => ReservationStatus::Cancelled,
            'cancelled_at' => now(),
            'cancelled_by' => CancelledBy::Customer,
            'cancellation_reason' => $reason,
        ]);

        event(new ReservationStatusChanged($reservation, $oldStatus, ReservationStatus::Cancelled));

        return $reservation->fresh();
    }
}
