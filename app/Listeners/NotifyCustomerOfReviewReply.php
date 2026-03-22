<?php

namespace App\Listeners;

use App\Events\ReviewReplied;
use App\Notifications\ReviewReplyNotification;
use Illuminate\Contracts\Queue\ShouldQueue;

class NotifyCustomerOfReviewReply implements ShouldQueue
{
    public function handle(ReviewReplied $event): void
    {
        $event->review->customer->notify(
            new ReviewReplyNotification($event->review)
        );
    }
}
