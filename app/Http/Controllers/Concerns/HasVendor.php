<?php

namespace App\Http\Controllers\Concerns;

use App\Models\Vendor;

trait HasVendor
{
    protected function vendor(): Vendor
    {
        return auth()->user()->vendor;
    }
}
