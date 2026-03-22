<?php

namespace App\Filament\Resources\Users\RelationManagers;

use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ReviewsRelationManager extends RelationManager
{
    protected static string $relationship = 'reviews';

    protected static ?string $recordTitleAttribute = 'id';

    public static function getTitle($ownerRecord, string $pageClass): string
    {
        return __('admin.reviews');
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('vendor.store_name')
                    ->label(__('review.vendor'))
                    ->searchable(),
                TextColumn::make('rating')
                    ->label(__('review.rating'))
                    ->badge()
                    ->color(fn (int $state): string => match (true) {
                        $state >= 4 => 'success',
                        $state >= 3 => 'warning',
                        default => 'danger',
                    }),
                TextColumn::make('comment')
                    ->label(__('review.comment'))
                    ->limit(40),
                IconColumn::make('is_published')
                    ->label(__('review.is_published'))
                    ->boolean(),
                TextColumn::make('vendor_reply')
                    ->label(__('review.vendor_reply'))
                    ->limit(30)
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->label(__('review.created_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('created_at', 'desc');
    }
}
