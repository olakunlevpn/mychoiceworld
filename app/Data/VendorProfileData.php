<?php

namespace App\Data;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class VendorProfileData extends Data
{
    public function __construct(
        public string $store_name,
        public ?string $description,
        public string $phone,
        public ?string $whatsapp,
        public ?string $email,
        public string $address,
        public string $city,
        public string $state,
        public string $country,
        public ?string $postal_code,
        public ?float $latitude,
        public ?float $longitude,
        public ?UploadedFile $logo,
        public ?UploadedFile $banner,
    ) {}
}
