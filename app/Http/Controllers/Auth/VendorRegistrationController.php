<?php

namespace App\Http\Controllers\Auth;

use App\Actions\Vendor\RegisterVendor;
use App\Data\VendorRegistrationData;
use App\Http\Controllers\Controller;
use App\Http\Requests\Auth\VendorRegistrationRequest;
use App\Settings\GeneralSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Inertia\Inertia;
use Inertia\Response;

class VendorRegistrationController extends Controller
{
    public function create(): Response
    {
        $settings = app(GeneralSettings::class);

        if (! $settings->vendor_registration_enabled) {
            abort(404);
        }

        return Inertia::render('Auth/VendorRegister');
    }

    public function store(VendorRegistrationRequest $request, RegisterVendor $action): RedirectResponse
    {
        $data = VendorRegistrationData::from($request->validated());

        $vendor = $action->execute($data);

        Auth::login($vendor->user);

        return redirect()->route('vendor.status')
            ->with('success', __('vendor.registration_submitted'));
    }
}
