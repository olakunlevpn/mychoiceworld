<?php

namespace App\Notifications;

use App\Models\Vendor;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VendorApplicationSubmitted extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Vendor $vendor,
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
            ->subject(__('notification.vendor_application_submitted_subject'))
            ->line(__('notification.vendor_application_submitted_line', [
                'store_name' => $this->vendor->store_name,
            ]))
            ->action(__('notification.review_application'), url('/admin/vendors/'.$this->vendor->id))
            ->line(__('notification.vendor_application_submitted_closing'));
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'vendor_application_submitted',
            'vendor_id' => $this->vendor->id,
            'store_name' => $this->vendor->store_name,
            'message' => __('notification.vendor_application_submitted_line', [
                'store_name' => $this->vendor->store_name,
            ]),
        ];
    }
}
