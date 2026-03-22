<?php

namespace App\Listeners;

use App\Events\VendorRejected;
use App\Notifications\VendorApplicationRejected;
use Illuminate\Contracts\Queue\ShouldQueue;

class SendVendorRejectionNotification implements ShouldQueue
{
    public function handle(VendorRejected $event): void
    {
        $event->vendor->user->notify(new VendorApplicationRejected($event->vendor, $event->reason));
    }
}
