<?php

namespace App\Filament\Resources\StylePreferences\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class StylePreferenceForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextInput::make('name')
                    ->label(__('style_preference.name'))
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
                    ->label(__('style_preference.slug'))
                    ->required()
                    ->unique(ignoreRecord: true),
                Toggle::make('is_active')
                    ->label(__('style_preference.is_active'))
                    ->default(true)
                    ->columnStart(1),
            ]);
    }
}
