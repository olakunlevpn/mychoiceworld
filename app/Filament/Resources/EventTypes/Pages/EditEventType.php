<?php

namespace App\Filament\Resources\EventTypes\Pages;

use App\Filament\Resources\EventTypes\EventTypeResource;
use Filament\Resources\Pages\EditRecord;

class EditEventType extends EditRecord
{
    protected static string $resource = EventTypeResource::class;
}
