<?php

namespace App\Filament\Resources\Categories\Pages;

use App\Filament\Resources\Categories\CategoryResource;
use Filament\Resources\Pages\ManageRecords;

class ListCategories extends ManageRecords
{
    protected static string $resource = CategoryResource::class;
}
