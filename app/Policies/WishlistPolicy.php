<?php

namespace App\Policies;

use App\Models\User;
use App\Models\Wishlist;

class WishlistPolicy
{
    public function toggle(User $user): bool
    {
        return $user->isCustomer();
    }

    public function viewOwn(User $user, Wishlist $wishlist): bool
    {
        return $user->id === $wishlist->customer_id;
    }
}
