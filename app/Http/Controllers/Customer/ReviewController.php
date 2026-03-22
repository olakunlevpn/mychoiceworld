<?php

namespace App\Http\Controllers\Customer;

use App\Actions\Customer\CreateReview;
use App\Data\CreateReviewData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Customer\StoreReviewRequest;
use App\Models\Review;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class ReviewController extends Controller
{
    public function index(Request $request): Response
    {
        $reviews = $request->user()
            ->reviews()
            ->with([
                'vendor:id,store_name,slug',
                'reservation:id,reservation_code',
            ])
            ->latest()
            ->paginate(15);

        return Inertia::render('Customer/Reviews', [
            'reviews' => $reviews,
        ]);
    }

    public function store(StoreReviewRequest $request, CreateReview $action): RedirectResponse
    {
        $data = CreateReviewData::from($request->validated());
        $action->execute($request->user(), $data);

        return back()->with('success', __('customer.review_created'));
    }

    public function update(Request $request, Review $review): RedirectResponse
    {
        abort_unless($review->customer_id === $request->user()->id, 403);
        abort_unless($review->vendor_reply === null, 403);

        $request->validate([
            'rating' => ['required', 'integer', 'min:1', 'max:5'],
            'comment' => ['required', 'string', 'max:2000'],
        ]);

        $review->update($request->only(['rating', 'comment']));

        return back()->with('success', 'Review updated.');
    }

    public function destroy(Request $request, Review $review): RedirectResponse
    {
        abort_unless($review->customer_id === $request->user()->id, 403);
        abort_unless($review->vendor_reply === null, 403);

        $review->delete();

        return back()->with('success', 'Review deleted.');
    }
}
