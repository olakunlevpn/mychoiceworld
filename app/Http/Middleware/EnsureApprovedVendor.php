<?php

namespace App\Http\Middleware;

use App\Enums\VendorStatus;
use Closure;
use Illuminate\Http\Request;
use Symfony\Component\HttpFoundation\Response;

class EnsureApprovedVendor
{
    public function handle(Request $request, Closure $next): Response
    {
        $vendor = $request->user()?->vendor;

        if (! $vendor || $vendor->status !== VendorStatus::Approved) {
            return redirect()->route('vendor.status');
        }

        return $next($request);
    }
}
