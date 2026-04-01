<?php

namespace App\Data;

use Illuminate\Http\UploadedFile;
use Spatie\LaravelData\Data;

class VendorRegistrationData extends Data
{
    public function __construct(
        public string $name,
        public string $email,
        public string $password,
        public string $store_name,
        public string $phone,
        public ?string $whatsapp,
        public ?string $license_number,
        public ?UploadedFile $license_document,
        public ?string $description,
        public string $address,
        public string $city,
        public string $state,
        public string $country,
        public ?string $postal_code,
        public ?float $latitude,
        public ?float $longitude,
    ) {}
}
