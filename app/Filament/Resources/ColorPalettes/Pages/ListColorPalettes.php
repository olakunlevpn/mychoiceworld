<?php

namespace App\Filament\Resources\ColorPalettes\Pages;

use App\Filament\Resources\ColorPalettes\ColorPaletteResource;
use Filament\Resources\Pages\ManageRecords;

class ListColorPalettes extends ManageRecords
{
    protected static string $resource = ColorPaletteResource::class;
}
