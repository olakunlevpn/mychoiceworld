<?php

namespace App\Console\Commands;

use App\Enums\CancelledBy;
use App\Enums\ReservationStatus;
use App\Events\ReservationStatusChanged;
use App\Models\Reservation;
use Illuminate\Console\Command;

class ExpireReservations extends Command
{
    protected $signature = 'reservations:expire';

    protected $description = 'Expire pending reservations that have passed their expiry time';

    public function handle(): int
    {
        $count = 0;

        Reservation::query()
            ->expirable()
            ->chunkById(100, function ($reservations) use (&$count) {
                foreach ($reservations as $reservation) {
                    $oldStatus = $reservation->status;

                    $reservation->update([
                        'status' => ReservationStatus::Expired,
                        'cancelled_by' => CancelledBy::System,
                        'cancelled_at' => now(),
                    ]);

                    event(new ReservationStatusChanged($reservation, $oldStatus, ReservationStatus::Expired));

                    $count++;
                }
            });

        $this->info(__('reservation.reservations_expired', ['count' => $count]));

        return self::SUCCESS;
    }
}
