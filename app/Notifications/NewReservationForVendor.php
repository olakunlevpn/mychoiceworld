<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class NewReservationForVendor extends Notification implements ShouldQueue
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
            ->subject(__('notification.new_reservation_subject'))
            ->line(__('notification.new_reservation_line', [
                'code' => $this->reservation->reservation_code,
                'customer' => $this->reservation->customer->name,
                'product' => $this->reservation->product->name,
            ]))
            ->action(__('notification.review_incoming'), url('/vendor/reservations/'.$this->reservation->id));
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'new_reservation',
            'reservation_id' => $this->reservation->id,
            'reservation_code' => $this->reservation->reservation_code,
            'customer_name' => $this->reservation->customer->name,
            'product_name' => $this->reservation->product->name,
            'message' => __('notification.new_reservation_line', [
                'code' => $this->reservation->reservation_code,
                'customer' => $this->reservation->customer->name,
                'product' => $this->reservation->product->name,
            ]),
        ];
    }
}
