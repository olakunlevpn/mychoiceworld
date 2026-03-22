<?php

namespace App\Filament\Resources\Products\Schemas;

use App\Enums\Gender;
use App\Enums\ProductStatus;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class ProductForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make(__('product.basic_info'))
                ->schema([
                    TextInput::make('name')
                        ->label(__('product.name'))
                        ->required()
                        ->maxLength(255)
                        ->live(onBlur: true)
                        ->afterStateUpdated(fn ($set, $state) => $set('slug', Str::slug($state))),
                    TextInput::make('slug')
                        ->label(__('product.slug'))
                        ->required()
                        ->unique(ignoreRecord: true),
                    Select::make('vendor_id')
                        ->label(__('reservation.vendor'))
                        ->relationship('vendor', 'store_name')
                        ->searchable()
                        ->preload()
                        ->required()
                        ->disabled(fn ($operation) => $operation === 'edit'),
                    Select::make('category_id')
                        ->label(__('admin.categories'))
                        ->relationship('category', 'name')
                        ->searchable()
                        ->preload(),
                    Textarea::make('description')
                        ->label(__('product.description'))
                        ->rows(3),
                ]),
            Section::make(__('product.pricing'))
                ->schema([
                    Grid::make(2)->schema([
                        TextInput::make('price')
                            ->label(__('product.price'))
                            ->numeric()
                            ->prefix('$')
                            ->required()
                            ->formatStateUsing(fn ($state) => $state ? $state / 100 : null)
                            ->dehydrateStateUsing(fn ($state) => $state ? (int) ($state * 100) : null),
                        TextInput::make('compare_price')
                            ->label(__('product.compare_price'))
                            ->numeric()
                            ->prefix('$')
                            ->formatStateUsing(fn ($state) => $state ? $state / 100 : null)
                            ->dehydrateStateUsing(fn ($state) => $state ? (int) ($state * 100) : null),
                        TextInput::make('currency')
                            ->label(__('product.currency'))
                            ->disabled()
                            ->default('USD'),
                    ]),
                ]),
            Section::make(__('product.attributes'))
                ->schema([
                    Grid::make(2)->schema([
                        Select::make('gender')
                            ->label(__('product.gender'))
                            ->options(Gender::class),
                        TextInput::make('primary_color')
                            ->label(__('product.primary_color')),
                        ColorPicker::make('primary_color_hex')
                            ->label(__('product.primary_color_hex')),
                    ]),
                ]),
            Section::make(__('product.status_section'))
                ->schema([
                    Grid::make(2)->schema([
                        Select::make('status')
                            ->label(__('product.status'))
                            ->options(ProductStatus::class)
                            ->required(),
                        Toggle::make('is_featured')
                            ->label(__('product.is_featured')),
                        Toggle::make('is_reservable')
                            ->label(__('product.is_reservable')),
                    ]),
                ]),
            Section::make(__('product.event_style_tags'))
                ->schema([
                    Grid::make(2)->schema([
                        Select::make('eventTypes')
                            ->label(__('admin.event_types'))
                            ->multiple()
                            ->relationship('eventTypes', 'name')
                            ->preload(),
                        Select::make('stylePreferences')
                            ->label(__('admin.style_preferences'))
                            ->multiple()
                            ->relationship('stylePreferences', 'name')
                            ->preload(),
                    ]),
                ]),
        ]);
    }
}
