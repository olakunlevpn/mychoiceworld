<?php

namespace App\Actions\Customer;

use App\Data\CreateReviewData;
use App\Enums\ReservationStatus;
use App\Events\ReviewCreated;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use Illuminate\Validation\ValidationException;

class CreateReview
{
    public function execute(User $customer, CreateReviewData $data): Review
    {
        $reservation = Reservation::findOrFail($data->reservation_id);

        if ($reservation->customer_id !== $customer->id) {
            throw ValidationException::withMessages([
                'reservation_id' => __('customer.reservation_not_yours'),
            ]);
        }

        if ($reservation->status !== ReservationStatus::Completed) {
            throw ValidationException::withMessages([
                'reservation_id' => __('customer.reservation_not_completed'),
            ]);
        }

        if ($reservation->review()->exists()) {
            throw ValidationException::withMessages([
                'reservation_id' => __('customer.review_already_exists'),
            ]);
        }

        $review = Review::create([
            'customer_id' => $customer->id,
            'vendor_id' => $reservation->vendor_id,
            'product_id' => $reservation->product_id,
            'reservation_id' => $reservation->id,
            'rating' => $data->rating,
            'comment' => $data->comment,
            'is_published' => true,
        ]);

        event(new ReviewCreated($review));

        return $review;
    }
}
