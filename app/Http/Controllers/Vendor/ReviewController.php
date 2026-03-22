<?php

namespace App\Http\Controllers\Vendor;

use App\Actions\Review\ReplyToReview;
use App\Http\Controllers\Concerns\HasVendor;
use App\Http\Controllers\Controller;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    use HasVendor;

    public function index(Request $request): Response
    {
        $vendor = $this->vendor();

        $reviews = $vendor->reviews()
            ->with(['customer:id,name,avatar'])
            ->where('is_published', true)
            ->when($request->input('rating'), fn ($q, $rating) => $q->where('rating', $rating))
            ->latest()
            ->paginate(15)
            ->withQueryString();

        $ratingSummary = [
            'average' => $vendor->rating_avg,
            'count' => $vendor->rating_count,
        ];

        return Inertia::render('Vendor/Reviews/Index', [
            'reviews' => $reviews,
            'ratingSummary' => $ratingSummary,
            'filters' => $request->only(['rating']),
        ]);
    }

    public function reply(Request $request, Review $review, ReplyToReview $action): RedirectResponse
    {
        $this->authorize('reply', $review);

        $request->validate(['reply' => ['required', 'string', 'max:1000']]);

        $action->execute($review, $request->input('reply'));

        return back()->with('success', __('review.reply_sent'));
    }
}
