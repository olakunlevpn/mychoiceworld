<?php

namespace App\Filament\Resources\EventTypes;

use App\Filament\Resources\EventTypes\Pages\ListEventTypes;
use App\Filament\Resources\EventTypes\Schemas\EventTypeForm;
use App\Filament\Resources\EventTypes\Tables\EventTypesTable;
use App\Models\EventType;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class EventTypeResource extends Resource
{
    protected static ?string $model = EventType::class;

    protected static ?string $recordTitleAttribute = 'name';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-calendar-days';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.catalog');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.event_types');
    }

    public static function form(Schema $schema): Schema
    {
        return EventTypeForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return EventTypesTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListEventTypes::route('/'),
        ];
    }
}
