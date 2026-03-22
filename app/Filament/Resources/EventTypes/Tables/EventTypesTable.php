<?php

namespace App\Filament\Resources\EventTypes\Tables;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class EventTypesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label(__('event_type.name'))
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label(__('event_type.slug')),
                TextColumn::make('icon')
                    ->label(__('event_type.icon')),
                IconColumn::make('is_active')
                    ->label(__('event_type.is_active'))
                    ->boolean(),
                TextColumn::make('products_count')
                    ->label(__('event_type.products_count'))
                    ->counts('products'),
            ])
            ->defaultSort('name', 'asc')
            ->filters([
                TernaryFilter::make('is_active')
                    ->label(__('event_type.is_active')),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                CreateAction::make(),
                DeleteBulkAction::make(),
            ]);
    }
}
