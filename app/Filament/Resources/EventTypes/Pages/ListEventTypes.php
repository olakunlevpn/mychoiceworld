<?php

namespace App\Filament\Resources\EventTypes\Pages;

use App\Filament\Resources\EventTypes\EventTypeResource;
use Filament\Resources\Pages\ManageRecords;

class ListEventTypes extends ManageRecords
{
    protected static string $resource = EventTypeResource::class;
}
