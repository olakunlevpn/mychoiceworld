<?php

namespace App\Policies;

use App\Models\Reservation;
use App\Models\User;

class ReservationPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isVendor();
    }

    public function view(User $user, Reservation $reservation): bool
    {
        return $user->isAdmin() || $user->vendor?->id === $reservation->vendor_id;
    }

    public function viewOwn(User $user, Reservation $reservation): bool
    {
        return $user->id === $reservation->customer_id;
    }

    public function updateStatus(User $user, Reservation $reservation): bool
    {
        return $user->vendor?->id === $reservation->vendor_id;
    }

    public function cancel(User $user, Reservation $reservation): bool
    {
        return $user->id === $reservation->customer_id && $reservation->isActive();
    }
}
