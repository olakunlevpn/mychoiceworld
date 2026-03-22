<?php

namespace App\Listeners;

use App\Enums\UserRole;
use App\Events\VendorRegistered;
use App\Models\User;
use App\Notifications\VendorApplicationSubmitted;
use Illuminate\Contracts\Queue\ShouldQueue;
use Illuminate\Support\Facades\Notification;

class NotifyAdminsOfNewVendor implements ShouldQueue
{
    public function handle(VendorRegistered $event): void
    {
        $admins = User::query()
            ->where('role', UserRole::Admin)
            ->get();

        Notification::send($admins, new VendorApplicationSubmitted($event->vendor));
    }
}
