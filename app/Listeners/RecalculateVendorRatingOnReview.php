<?php

namespace App\Listeners;

use App\Events\ReviewCreated;
use App\Models\Review;
use Illuminate\Contracts\Queue\ShouldQueue;

class RecalculateVendorRatingOnReview implements ShouldQueue
{
    public function handle(ReviewCreated $event): void
    {
        $vendor = $event->review->vendor;

        $stats = Review::where('vendor_id', $vendor->id)
            ->where('is_published', true)
            ->selectRaw('AVG(rating) as avg_rating, COUNT(*) as total_count')
            ->first();

        $vendor->update([
            'rating_avg' => round($stats->avg_rating ?? 0, 2),
            'rating_count' => $stats->total_count ?? 0,
        ]);
    }
}
