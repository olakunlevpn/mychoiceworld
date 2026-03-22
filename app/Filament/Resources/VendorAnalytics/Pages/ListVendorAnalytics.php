<?php

namespace App\Filament\Resources\VendorAnalytics\Pages;

use App\Filament\Resources\VendorAnalytics\VendorAnalyticResource;
use Filament\Pages\Concerns\ExposesTableToWidgets;
use Filament\Resources\Pages\ListRecords;

class ListVendorAnalytics extends ListRecords
{
    use ExposesTableToWidgets;

    protected static string $resource = VendorAnalyticResource::class;

    protected function getHeaderWidgets(): array
    {
        return VendorAnalyticResource::getWidgets();
    }
}
