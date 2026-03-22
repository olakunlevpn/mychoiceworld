<?php

namespace App\Filament\Resources\Users\RelationManagers;

use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class WishlistsRelationManager extends RelationManager
{
    protected static string $relationship = 'wishlists';

    protected static ?string $recordTitleAttribute = 'id';

    public static function getTitle($ownerRecord, string $pageClass): string
    {
        return __('admin.wishlist');
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('product.name')
                    ->label(__('admin.product'))
                    ->searchable(),
                TextColumn::make('product.vendor.store_name')
                    ->label(__('admin.vendor')),
                TextColumn::make('product.price')
                    ->label(__('admin.price'))
                    ->money('USD', divideBy: 100),
                TextColumn::make('created_at')
                    ->label(__('admin.added_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->recordActions([
                DeleteAction::make(),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
