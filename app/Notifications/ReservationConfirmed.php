<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationConfirmed extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Reservation $reservation,
    ) {}

    /**
     * @return array<int, string>
     */
    public function via(object $notifiable): array
    {
        return ['mail', 'database'];
    }

    public function toMail(object $notifiable): MailMessage
    {
        return (new MailMessage)
            ->subject(__('notification.reservation_confirmed_subject'))
            ->line(__('notification.reservation_confirmed_line', [
                'code' => $this->reservation->reservation_code,
                'product' => $this->reservation->product->name,
                'store' => $this->reservation->vendor->store_name,
            ]))
            ->action(__('notification.view_reservation'), url('/customer/reservations/'.$this->reservation->id));
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'reservation_confirmed',
            'reservation_id' => $this->reservation->id,
            'reservation_code' => $this->reservation->reservation_code,
            'product_name' => $this->reservation->product->name,
            'vendor_name' => $this->reservation->vendor->store_name,
            'message' => __('notification.reservation_confirmed_line', [
                'code' => $this->reservation->reservation_code,
                'product' => $this->reservation->product->name,
                'store' => $this->reservation->vendor->store_name,
            ]),
        ];
    }
}
