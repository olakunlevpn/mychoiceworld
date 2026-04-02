<?php

namespace App\Actions\Vendor;

use App\Data\VendorRegistrationData;
use App\Enums\UserRole;
use App\Enums\VendorStatus;
use App\Events\VendorRegistered;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use MatanYadaev\EloquentSpatial\Objects\Point;

class RegisterVendor
{
    public function execute(VendorRegistrationData $data): Vendor
    {
        return DB::transaction(function () use ($data) {
            $user = User::forceCreate([
                'name' => $data->name,
                'email' => $data->email,
                'password' => Hash::make($data->password),
                'phone' => $data->phone,
                'role' => UserRole::Vendor,
                'is_active' => true,
            ]);

            $licenseDocumentPath = null;
            if ($data->license_document) {
                $licenseDocumentPath = $data->license_document->store('vendors/licenses', 'public');
            }

            $location = new Point(
                $data->latitude ?? 0.0,
                $data->longitude ?? 0.0,
            );

            $vendor = $user->vendor()->create([
                'store_name' => $data->store_name,
                'slug' => Str::slug($data->store_name).'-'.Str::random(5),
                'phone' => $data->phone,
                'whatsapp' => $data->whatsapp,
                'email' => $data->store_email ?: $data->email,
                'license_number' => $data->license_number,
                'license_document' => $licenseDocumentPath,
                'description' => $data->description,
                'address' => $data->address,
                'city' => $data->city,
                'state' => $data->state,
                'country' => $data->country,
                'postal_code' => $data->postal_code,
                'location' => $location,
                'status' => VendorStatus::Pending,
            ]);

            event(new VendorRegistered($vendor));

            return $vendor;
        });
    }
}
