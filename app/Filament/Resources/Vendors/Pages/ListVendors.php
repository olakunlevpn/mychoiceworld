<?php

namespace App\Filament\Resources\Vendors\Pages;

use App\Filament\Resources\Vendors\VendorResource;
use Filament\Pages\Concerns\ExposesTableToWidgets;
use Filament\Resources\Pages\ListRecords;

class ListVendors extends ListRecords
{
    use ExposesTableToWidgets;

    protected static string $resource = VendorResource::class;

    protected function getHeaderWidgets(): array
    {
        return VendorResource::getWidgets();
    }
}
