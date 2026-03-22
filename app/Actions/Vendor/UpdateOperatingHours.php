<?php

namespace App\Actions\Vendor;

use App\Data\OperatingHoursData;
use App\Models\Vendor;

class UpdateOperatingHours
{
    public function execute(Vendor $vendor, OperatingHoursData $data): Vendor
    {
        $vendor->update(['operating_hours' => $data->hours]);

        return $vendor->fresh();
    }
}
