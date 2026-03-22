<?php

namespace App\Filament\Resources\Reviews\Pages;

use App\Filament\Resources\Reviews\ReviewResource;
use Filament\Pages\Concerns\ExposesTableToWidgets;
use Filament\Resources\Pages\ManageRecords;

class ListReviews extends ManageRecords
{
    use ExposesTableToWidgets;

    protected static string $resource = ReviewResource::class;

    protected function getHeaderWidgets(): array
    {
        return ReviewResource::getWidgets();
    }
}
