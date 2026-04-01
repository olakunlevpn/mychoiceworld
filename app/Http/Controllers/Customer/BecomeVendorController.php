<?php

namespace App\Http\Controllers\Customer;

use App\Enums\UserRole;
use App\Enums\VendorStatus;
use App\Events\VendorRegistered;
use App\Http\Controllers\Controller;
use App\Settings\GeneralSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Http\Request;
use Illuminate\Support\Str;
use Inertia\Inertia;
use Inertia\Response;
use MatanYadaev\EloquentSpatial\Objects\Point;

class BecomeVendorController extends Controller
{
    public function create(Request $request): Response|RedirectResponse
    {
        $settings = app(GeneralSettings::class);

        if (! $settings->vendor_registration_enabled) {
            return redirect()->route('customer.dashboard')->with('error', 'Vendor registration is currently disabled.');
        }

        if ($request->user()->isVendor()) {
            return redirect()->route('vendor.dashboard');
        }

        return Inertia::render('Customer/BecomeVendor');
    }

    public function store(Request $request): RedirectResponse
    {
        $validated = $request->validate([
            'store_name' => ['required', 'string', 'max:255'],
            'phone' => ['required', 'string', 'max:20'],
            'whatsapp' => ['nullable', 'string', 'max:20'],
            'store_email' => ['nullable', 'email', 'max:255'],
            'description' => ['nullable', 'string', 'max:2000'],
            'license_number' => ['nullable', 'string', 'max:100'],
            'license_document' => ['nullable', 'file', 'mimes:pdf,jpg,jpeg,png', 'max:5120'],
            'address' => ['required', 'string', 'max:500'],
            'city' => ['required', 'string', 'max:100'],
            'state' => ['required', 'string', 'max:100'],
            'country' => ['required', 'string', 'max:100'],
            'postal_code' => ['nullable', 'string', 'max:20'],
            'latitude' => ['nullable', 'numeric', 'between:-90,90'],
            'longitude' => ['nullable', 'numeric', 'between:-180,180'],
        ]);

        $user = $request->user();

        $licenseDocumentPath = null;
        if ($request->hasFile('license_document')) {
            $licenseDocumentPath = $request->file('license_document')->store('vendors/licenses', 'public');
        }

        $location = new Point(
            $validated['latitude'] ?? 0.0,
            $validated['longitude'] ?? 0.0,
        );

        $vendor = $user->vendor()->create([
            'store_name' => $validated['store_name'],
            'slug' => Str::slug($validated['store_name']).'-'.Str::random(5),
            'phone' => $validated['phone'],
            'whatsapp' => $validated['whatsapp'] ?? null,
            'email' => $validated['store_email'] ?? $user->email,
            'description' => $validated['description'] ?? null,
            'license_number' => $validated['license_number'] ?? null,
            'license_document' => $licenseDocumentPath,
            'address' => $validated['address'],
            'city' => $validated['city'],
            'state' => $validated['state'],
            'country' => $validated['country'],
            'postal_code' => $validated['postal_code'] ?? null,
            'location' => $location,
            'status' => VendorStatus::Pending,
        ]);

        $user->update(['role' => UserRole::Vendor]);

        event(new VendorRegistered($vendor));

        return redirect()->route('vendor.status')
            ->with('success', 'Your vendor application has been submitted! We will review it shortly.');
    }
}
