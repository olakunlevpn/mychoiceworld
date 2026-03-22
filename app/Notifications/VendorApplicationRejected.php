<?php

namespace App\Notifications;

use App\Models\Vendor;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class VendorApplicationRejected extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Vendor $vendor,
        public string $reason,
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
            ->subject(__('notification.vendor_application_rejected_subject'))
            ->line(__('notification.vendor_application_rejected_line', [
                'store_name' => $this->vendor->store_name,
            ]))
            ->line(__('notification.rejection_reason', ['reason' => $this->reason]))
            ->line(__('notification.vendor_application_rejected_closing'));
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'vendor_application_rejected',
            'vendor_id' => $this->vendor->id,
            'store_name' => $this->vendor->store_name,
            'reason' => $this->reason,
            'message' => __('notification.vendor_application_rejected_line', [
                'store_name' => $this->vendor->store_name,
            ]),
        ];
    }
}
