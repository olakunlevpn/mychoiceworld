<?php

namespace App\Filament\Resources\Products\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class VariantsRelationManager extends RelationManager
{
    protected static string $relationship = 'variants';

    protected static ?string $recordTitleAttribute = 'sku';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            TextInput::make('size')
                ->label(__('product.size'))
                ->maxLength(50),
            TextInput::make('color')
                ->label(__('product.color'))
                ->maxLength(50),
            ColorPicker::make('color_hex')
                ->label(__('product.color_hex')),
            TextInput::make('sku')
                ->label(__('product.sku'))
                ->required()
                ->maxLength(100),
            TextInput::make('stock_quantity')
                ->label(__('product.stock_quantity'))
                ->numeric()
                ->required()
                ->default(0),
            TextInput::make('price_override')
                ->label(__('product.price_override'))
                ->numeric()
                ->nullable()
                ->formatStateUsing(fn ($state) => $state ? $state / 100 : null)
                ->dehydrateStateUsing(fn ($state) => $state ? (int) ($state * 100) : null),
            Toggle::make('is_active')
                ->label(__('product.is_active'))
                ->default(true),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('size')
                    ->label(__('product.size')),
                TextColumn::make('color')
                    ->label(__('product.color')),
                ColorColumn::make('color_hex')
                    ->label(__('product.color_hex')),
                TextColumn::make('sku')
                    ->label(__('product.sku'))
                    ->searchable(),
                TextColumn::make('stock_quantity')
                    ->label(__('product.stock_quantity'))
                    ->sortable(),
                TextColumn::make('price_override')
                    ->label(__('product.price_override'))
                    ->money('USD')
                    ->placeholder('-'),
                IconColumn::make('is_active')
                    ->label(__('product.is_active'))
                    ->boolean(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                CreateAction::make(),
            ]);
    }
}
