<?php

namespace App\Filament\Resources\EventTypes\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class EventTypeForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextInput::make('name')
                    ->label(__('event_type.name'))
                    ->required()
                    ->maxLength(255)
                    ->live(onBlur: true)
                    ->afterStateUpdated(function (string $operation, $state, Set $set): void {
                        if ($operation !== 'create') {
                            return;
                        }

                        $set('slug', Str::slug($state));
                    }),
                TextInput::make('slug')
                    ->label(__('event_type.slug'))
                    ->required()
                    ->unique(ignoreRecord: true),
                TextInput::make('icon')
                    ->label(__('event_type.icon'))
                    ->nullable(),
                Toggle::make('is_active')
                    ->label(__('event_type.is_active'))
                    ->default(true)
                    ->columnStart(1),
            ]);
    }
}
