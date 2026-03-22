<?php

namespace App\Actions\Review;

use App\Events\ReviewReplied;
use App\Models\Review;

class ReplyToReview
{
    public function execute(Review $review, string $reply): Review
    {
        $review->update([
            'vendor_reply' => $reply,
            'vendor_replied_at' => now(),
        ]);

        event(new ReviewReplied($review));

        return $review->fresh();
    }
}
