<?php

namespace App\Filament\Resources\Reservations\Tables;

use App\Enums\ReservationSource;
use App\Enums\ReservationStatus;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ReservationsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('reservation_code')
                    ->label(__('reservation.reservation_code'))
                    ->searchable()
                    ->copyable(),
                TextColumn::make('customer.name')
                    ->label(__('reservation.customer'))
                    ->searchable(),
                TextColumn::make('vendor.store_name')
                    ->label(__('reservation.vendor'))
                    ->searchable(),
                TextColumn::make('product.name')
                    ->label(__('reservation.product')),
                TextColumn::make('status')
                    ->label(__('reservation.status'))
                    ->badge(),
                TextColumn::make('source')
                    ->label(__('reservation.source'))
                    ->badge(),
                TextColumn::make('reserved_at')
                    ->label(__('reservation.reserved_at'))
                    ->dateTime()
                    ->sortable(),
                TextColumn::make('expires_at')
                    ->label(__('reservation.expires_at'))
                    ->dateTime(),
            ])
            ->defaultSort('reserved_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label(__('reservation.status'))
                    ->options(ReservationStatus::class),
                SelectFilter::make('source')
                    ->label(__('reservation.source'))
                    ->options(ReservationSource::class),
                SelectFilter::make('vendor')
                    ->label(__('reservation.vendor'))
                    ->relationship('vendor', 'store_name'),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make(),
                    Action::make('confirm')
                        ->label(__('reservation.confirm'))
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->modalHeading(__('reservation.confirm_reservation'))
                        ->visible(fn ($record) => $record->status === ReservationStatus::Pending)
                        ->action(fn ($record) => $record->update([
                            'status' => 'confirmed',
                            'confirmed_at' => now(),
                        ])),
                    Action::make('complete')
                        ->label(__('reservation.complete'))
                        ->icon('heroicon-o-check-badge')
                        ->color('success')
                        ->requiresConfirmation()
                        ->modalHeading(__('reservation.complete_reservation'))
                        ->visible(fn ($record) => $record->status === ReservationStatus::Confirmed)
                        ->action(fn ($record) => $record->update([
                            'status' => 'completed',
                            'completed_at' => now(),
                        ])),
                    Action::make('cancel')
                        ->label(__('reservation.cancel'))
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->modalHeading(__('reservation.cancel_reservation'))
                        ->schema([
                            Textarea::make('cancellation_reason')
                                ->label(__('reservation.cancellation_reason'))
                                ->required(),
                        ])
                        ->action(fn ($record, array $data) => $record->update([
                            'status' => 'cancelled',
                            'cancelled_at' => now(),
                            'cancelled_by' => 'system',
                            'cancellation_reason' => $data['cancellation_reason'],
                        ])),
                    Action::make('no_show')
                        ->label(__('reservation.mark_no_show'))
                        ->icon('heroicon-o-eye-slash')
                        ->color('warning')
                        ->requiresConfirmation()
                        ->modalHeading(__('reservation.no_show_confirm'))
                        ->visible(fn ($record) => $record->status === ReservationStatus::Confirmed)
                        ->action(fn ($record) => $record->update([
                            'status' => 'no_show',
                        ])),
                ]),
            ]);
    }
}
