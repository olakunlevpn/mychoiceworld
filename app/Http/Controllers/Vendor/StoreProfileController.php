<?php

namespace App\Http\Controllers\Vendor;

use App\Actions\Vendor\UpdateOperatingHours;
use App\Actions\Vendor\UpdateVendorProfile;
use App\Data\OperatingHoursData;
use App\Data\VendorProfileData;
use App\Http\Controllers\Concerns\HasVendor;
use App\Http\Controllers\Controller;
use App\Http\Requests\Vendor\UpdateOperatingHoursRequest;
use App\Http\Requests\Vendor\UpdateProfileRequest;
use Illuminate\Http\RedirectResponse;
use Inertia\Inertia;
use Inertia\Response;

class StoreProfileController extends Controller
{
    use HasVendor;

    public function edit(): Response
    {
        $vendor = $this->vendor();

        return Inertia::render('Vendor/StoreProfile', [
            'vendor' => $vendor,
        ]);
    }

    public function update(UpdateProfileRequest $request, UpdateVendorProfile $action): RedirectResponse
    {
        $data = VendorProfileData::from($request->validated());
        $action->execute($this->vendor(), $data);

        return back()->with('success', __('vendor.profile_updated'));
    }

    public function updateHours(UpdateOperatingHoursRequest $request, UpdateOperatingHours $action): RedirectResponse
    {
        $data = OperatingHoursData::from($request->validated());
        $action->execute($this->vendor(), $data);

        return back()->with('success', __('vendor.hours_updated'));
    }
}
