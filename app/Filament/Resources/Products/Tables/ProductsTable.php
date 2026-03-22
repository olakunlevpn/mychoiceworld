<?php

namespace App\Filament\Resources\Products\Tables;

use App\Enums\Gender;
use App\Enums\ProductStatus;
use App\Models\Product;
use App\Settings\GeneralSettings;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ProductsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label(__('product.name'))
                    ->searchable()
                    ->sortable()
                    ->weight('bold')
                    ->limit(30),
                TextColumn::make('vendor.store_name')
                    ->label(__('reservation.vendor'))
                    ->searchable()
                    ->toggleable(),
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
                SelectFilter::make('category')
                    ->label(__('admin.categories'))
                    ->relationship('category', 'name'),
                SelectFilter::make('gender')
                    ->label(__('product.gender'))
                    ->options(Gender::class),
                SelectFilter::make('vendor')
                    ->label(__('reservation.vendor'))
                    ->relationship('vendor', 'store_name'),
                TernaryFilter::make('is_featured')
                    ->label(__('product.is_featured')),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    Action::make('toggle_featured')
                        ->label(fn (Product $record) => $record->is_featured ? __('product.unfeature') : __('product.feature'))
                        ->icon(fn (Product $record) => $record->is_featured ? 'heroicon-o-x-mark' : 'heroicon-o-star')
                        ->action(function (Product $record) {
                            $record->update(['is_featured' => ! $record->is_featured]);
                            Notification::make()
                                ->title(__('settings.saved'))
                                ->success()
                                ->send();
                        }),
                    DeleteAction::make(),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
