<?php

namespace App\Filament\Resources\Categories\Tables;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class CategoriesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label(__('category.name'))
                    ->searchable()
                    ->sortable(),
                TextColumn::make('parent.name')
                    ->label(__('category.parent'))
                    ->sortable(),
                TextColumn::make('slug')
                    ->label(__('category.slug')),
                TextColumn::make('sort_order')
                    ->label(__('category.sort_order'))
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label(__('category.is_active'))
                    ->boolean(),
                TextColumn::make('products_count')
                    ->label(__('category.products_count'))
                    ->counts('products'),
            ])
            ->defaultSort('sort_order', 'asc')
            ->filters([
                TernaryFilter::make('is_active')
                    ->label(__('category.is_active')),
                SelectFilter::make('parent_id')
                    ->label(__('category.parent_category'))
                    ->relationship('parent', 'name'),
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
