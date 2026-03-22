<?php

namespace App\Notifications;

use App\Models\Reservation;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReservationDeclined extends Notification implements ShouldQueue
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
        $message = (new MailMessage)
            ->subject(__('notification.reservation_declined_subject'))
            ->line(__('notification.reservation_declined_line', [
                'code' => $this->reservation->reservation_code,
                'product' => $this->reservation->product->name,
                'store' => $this->reservation->vendor->store_name,
            ]));

        if ($this->reservation->cancellation_reason) {
            $message->line(__('notification.rejection_reason', [
                'reason' => $this->reservation->cancellation_reason,
            ]));
        }

        return $message->action(__('notification.view_reservations'), url('/customer/reservations'));
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'reservation_declined',
            'reservation_id' => $this->reservation->id,
            'reservation_code' => $this->reservation->reservation_code,
            'product_name' => $this->reservation->product->name,
            'vendor_name' => $this->reservation->vendor->store_name,
            'reason' => $this->reservation->cancellation_reason,
            'message' => __('notification.reservation_declined_line', [
                'code' => $this->reservation->reservation_code,
                'product' => $this->reservation->product->name,
                'store' => $this->reservation->vendor->store_name,
            ]),
        ];
    }
}
