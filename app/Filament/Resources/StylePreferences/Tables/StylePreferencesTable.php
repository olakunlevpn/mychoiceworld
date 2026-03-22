<?php

namespace App\Filament\Resources\StylePreferences\Tables;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class StylePreferencesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label(__('style_preference.name'))
                    ->searchable()
                    ->sortable(),
                TextColumn::make('slug')
                    ->label(__('style_preference.slug')),
                IconColumn::make('is_active')
                    ->label(__('style_preference.is_active'))
                    ->boolean(),
                TextColumn::make('products_count')
                    ->label(__('style_preference.products_count'))
                    ->counts('products'),
            ])
            ->defaultSort('name', 'asc')
            ->filters([
                TernaryFilter::make('is_active')
                    ->label(__('style_preference.is_active')),
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
