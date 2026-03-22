<?php

namespace App\Filament\Resources\Users\RelationManagers;

use App\Enums\ReservationStatus;
use Filament\Actions\ActionGroup;
use Filament\Actions\ViewAction;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ReservationsRelationManager extends RelationManager
{
    protected static string $relationship = 'reservations';

    protected static ?string $recordTitleAttribute = 'reservation_code';

    public static function getTitle($ownerRecord, string $pageClass): string
    {
        return __('admin.reservations');
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('reservation_code')
                    ->label(__('reservation.reservation_code'))
                    ->searchable()
                    ->weight('bold'),
                TextColumn::make('vendor.store_name')
                    ->label(__('reservation.vendor'))
                    ->searchable(),
                TextColumn::make('product.name')
                    ->label(__('reservation.product'))
                    ->limit(25),
                TextColumn::make('status')
                    ->label(__('reservation.status'))
                    ->badge(),
                TextColumn::make('reserved_at')
                    ->label(__('reservation.reserved_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultSort('reserved_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label(__('reservation.status'))
                    ->options(ReservationStatus::class),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make()
                        ->url(fn ($record) => route('filament.admin.resources.reservations.view', $record)),
                ]),
            ]);
    }
}
