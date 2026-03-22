<?php

namespace App\Notifications;

use App\Models\Review;
use Illuminate\Bus\Queueable;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Notifications\Messages\MailMessage;
use Illuminate\Notifications\Notification;

class ReviewReplyNotification extends Notification implements ShouldQueue
{
    use Queueable;

    public function __construct(
        public Review $review,
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
            ->subject(__('notification.review_reply_subject'))
            ->line(__('notification.review_reply_line', [
                'store' => $this->review->vendor->store_name,
            ]))
            ->action(__('notification.view_review'), url('/customer/reviews'));
    }

    /**
     * @return array<string, mixed>
     */
    public function toArray(object $notifiable): array
    {
        return [
            'type' => 'review_reply',
            'review_id' => $this->review->id,
            'vendor_name' => $this->review->vendor->store_name,
            'message' => __('notification.review_reply_line', [
                'store' => $this->review->vendor->store_name,
            ]),
        ];
    }
}
