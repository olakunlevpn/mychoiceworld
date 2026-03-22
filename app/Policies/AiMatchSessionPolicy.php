<?php

namespace App\Policies;

use App\Models\AiMatchSession;
use App\Models\User;

class AiMatchSessionPolicy
{
    public function view(User $user, AiMatchSession $aiMatchSession): bool
    {
        return $user->id === $aiMatchSession->customer_id;
    }
}
