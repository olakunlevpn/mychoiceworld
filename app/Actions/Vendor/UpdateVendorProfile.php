<?php

namespace App\Actions\Vendor;

use App\Data\VendorProfileData;
use App\Models\Vendor;
use Illuminate\Support\Facades\Storage;
use MatanYadaev\EloquentSpatial\Objects\Point;

class UpdateVendorProfile
{
    public function execute(Vendor $vendor, VendorProfileData $data): Vendor
    {
        $updateData = [
            'store_name' => $data->store_name,
            'description' => $data->description,
            'phone' => $data->phone,
            'whatsapp' => $data->whatsapp,
            'email' => $data->email,
            'address' => $data->address,
            'city' => $data->city,
            'state' => $data->state,
            'country' => $data->country,
            'postal_code' => $data->postal_code,
        ];

        if ($data->latitude && $data->longitude) {
            $updateData['location'] = new Point($data->latitude, $data->longitude);
        }

        if ($data->logo) {
            if ($vendor->logo) {
                Storage::disk('public')->delete($vendor->logo);
            }
            $updateData['logo'] = $data->logo->store('vendors/logos', 'public');
        }

        if ($data->banner) {
            if ($vendor->banner) {
                Storage::disk('public')->delete($vendor->banner);
            }
            $updateData['banner'] = $data->banner->store('vendors/banners', 'public');
        }

        $vendor->update($updateData);

        return $vendor->fresh();
    }
}
