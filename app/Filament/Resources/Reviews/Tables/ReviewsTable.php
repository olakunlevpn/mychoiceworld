<?php

namespace App\Filament\Resources\Reviews\Tables;

use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Columns\ToggleColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class ReviewsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('customer.name')
                    ->label(__('review.customer'))
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('vendor.store_name')
                    ->label(__('review.vendor'))
                    ->searchable()
                    ->toggleable(),
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
                    ->limit(40)
                    ->toggleable(),
                ToggleColumn::make('is_published')
                    ->label(__('review.is_published')),
                TextColumn::make('created_at')
                    ->label(__('review.created_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                TernaryFilter::make('is_published')
                    ->label(__('review.is_published')),
                SelectFilter::make('rating')
                    ->label(__('review.rating'))
                    ->options([
                        '1' => '1',
                        '2' => '2',
                        '3' => '3',
                        '4' => '4',
                        '5' => '5',
                    ]),
            ])
            ->recordActions([
                ActionGroup::make([
                    EditAction::make(),
                    Action::make('togglePublish')
                        ->label(fn ($record) => $record->is_published ? __('review.unpublish') : __('review.publish'))
                        ->icon(fn ($record) => $record->is_published ? 'heroicon-o-eye-slash' : 'heroicon-o-eye')
                        ->color(fn ($record) => $record->is_published ? 'warning' : 'success')
                        ->action(fn ($record) => $record->update(['is_published' => ! $record->is_published])),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
