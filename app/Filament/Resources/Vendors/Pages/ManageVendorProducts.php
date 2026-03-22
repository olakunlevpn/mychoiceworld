<?php

namespace App\Filament\Resources\Vendors\Pages;

use App\Enums\ProductStatus;
use App\Filament\Resources\Vendors\VendorResource;
use App\Settings\GeneralSettings;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\ManageRelatedRecords;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ManageVendorProducts extends ManageRelatedRecords
{
    protected static string $resource = VendorResource::class;

    protected static string $relationship = 'products';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-shopping-bag';
    }

    public static function getNavigationLabel(): string
    {
        return __('vendor.products');
    }

    public function getTitle(): string
    {
        return __('vendor.products');
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('name')
            ->columns([
                TextColumn::make('name')
                    ->label(__('product.name'))
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(30),
                TextColumn::make('category.name')
                    ->label(__('admin.categories'))
                    ->toggleable(),
                TextColumn::make('price')
                    ->label(__('product.price'))
                    ->formatStateUsing(fn ($state) => money($state, app(GeneralSettings::class)->currency_code)->format())
                    ->sortable(),
                TextColumn::make('status')
                    ->label(__('product.status'))
                    ->badge(),
                TextColumn::make('gender')
                    ->label(__('product.gender'))
                    ->badge()
                    ->toggleable(isToggledHiddenByDefault: true),
                IconColumn::make('is_featured')
                    ->label(__('product.is_featured'))
                    ->boolean()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('views_count')
                    ->label(__('product.views_count'))
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->label(__('product.created_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label(__('product.status'))
                    ->options(ProductStatus::class),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make()
                        ->url(fn ($record) => route('filament.admin.resources.products.view', $record)),
                    EditAction::make()
                        ->url(fn ($record) => route('filament.admin.resources.products.edit', $record)),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
