<?php

namespace App\Listeners;

use App\Events\VendorApproved;
use App\Notifications\VendorApplicationApproved;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendVendorApprovalNotification implements ShouldQueue
{
    public function handle(VendorApproved $event): void
    {
        $event->vendor->user->notify(new VendorApplicationApproved($event->vendor));
    }
}
