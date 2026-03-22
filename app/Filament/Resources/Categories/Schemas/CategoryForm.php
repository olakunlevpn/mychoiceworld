<?php

namespace App\Filament\Resources\Categories\Schemas;

use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class CategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextInput::make('name')
                    ->label(__('category.name'))
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
                    ->label(__('category.slug'))
                    ->required()
                    ->unique(ignoreRecord: true),
                Select::make('parent_id')
                    ->label(__('category.parent_category'))
                    ->relationship('parent', 'name')
                    ->placeholder(__('category.no_parent'))
                    ->searchable()
                    ->preload()
                    ->nullable()
                    ->columnSpanFull(),
                TextInput::make('icon')
                    ->label(__('category.icon'))
                    ->nullable(),
                TextInput::make('sort_order')
                    ->label(__('category.sort_order'))
                    ->numeric()
                    ->default(0),
                Toggle::make('is_active')
                    ->label(__('category.is_active'))
                    ->default(true)
                    ->columnStart(1),
            ]);
    }
}
