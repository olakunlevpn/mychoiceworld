<?php

namespace App\Policies;

use App\Models\Review;
use App\Models\User;

class ReviewPolicy
{
    public function viewAny(User $user): bool
    {
        return $user->isAdmin() || $user->isVendor();
    }

    public function create(User $user): bool
    {
        return $user->isCustomer();
    }

    public function reply(User $user, Review $review): bool
    {
        return $user->vendor?->id === $review->vendor_id;
    }
}
