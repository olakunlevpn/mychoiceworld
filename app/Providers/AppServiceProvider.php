<?php

namespace App\Providers;

use App\Events\ReservationCreated;
use App\Events\ReservationStatusChanged;
use App\Events\ReviewCreated;
use App\Events\ReviewReplied;
use App\Events\VendorApproved;
use App\Events\VendorRegistered;
use App\Events\VendorRejected;
use App\Listeners\NotifyAdminsOfNewVendor;
use App\Listeners\NotifyCustomerOfReservationStatus;
use App\Listeners\NotifyCustomerOfReviewReply;
use App\Listeners\NotifyVendorOfNewReservation;
use App\Listeners\RecalculateVendorRating;
use App\Listeners\RecalculateVendorRatingOnReview;
use App\Listeners\SendVendorApprovalNotification;
use App\Listeners\SendVendorRejectionNotification;
use Illuminate\Support\Facades\Event;
use Illuminate\Support\Facades\Vite;
use Illuminate\Support\ServiceProvider;

class AppServiceProvider extends ServiceProvider
{
    public function register(): void
    {
        //
    }

    public function boot(): void
    {
        Vite::prefetch(concurrency: 3);

        Event::listen(VendorRegistered::class, NotifyAdminsOfNewVendor::class);
        Event::listen(VendorApproved::class, SendVendorApprovalNotification::class);
        Event::listen(VendorRejected::class, SendVendorRejectionNotification::class);
        Event::listen(ReservationStatusChanged::class, NotifyCustomerOfReservationStatus::class);
        Event::listen(ReservationCreated::class, NotifyVendorOfNewReservation::class);
        Event::listen(ReviewCreated::class, RecalculateVendorRatingOnReview::class);
        Event::listen(ReviewReplied::class, NotifyCustomerOfReviewReply::class);
        Event::listen(ReviewReplied::class, RecalculateVendorRating::class);
    }
}
