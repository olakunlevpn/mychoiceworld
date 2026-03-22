<?php

namespace App\Filament\Resources\Vendors\Pages;

use App\Enums\ReservationStatus;
use App\Filament\Resources\Vendors\VendorResource;
use Filament\Actions\ActionGroup;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\ManageRelatedRecords;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ManageVendorReservations extends ManageRelatedRecords
{
    protected static string $resource = VendorResource::class;

    protected static string $relationship = 'reservations';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-clipboard-document-list';
    }

    public static function getNavigationLabel(): string
    {
        return __('vendor.reservations');
    }

    public function getTitle(): string
    {
        return __('vendor.reservations');
    }

    public function table(Table $table): Table
    {
        return $table
            ->recordTitleAttribute('reservation_code')
            ->columns([
                TextColumn::make('reservation_code')
                    ->label(__('reservation.reservation_code'))
                    ->searchable()
                    ->weight('bold'),
                TextColumn::make('customer.name')
                    ->label(__('reservation.customer'))
                    ->searchable(),
                TextColumn::make('product.name')
                    ->label(__('reservation.product'))
                    ->limit(25)
                    ->toggleable(),
                TextColumn::make('status')
                    ->label(__('reservation.status'))
                    ->badge(),
                TextColumn::make('source')
                    ->label(__('reservation.source'))
                    ->badge()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('reserved_at')
                    ->label(__('reservation.reserved_at'))
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('expires_at')
                    ->label(__('reservation.expires_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
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
