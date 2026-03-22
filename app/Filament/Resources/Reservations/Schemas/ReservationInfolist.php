<?php

namespace App\Filament\Resources\Reservations\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class ReservationInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Grid::make(2)->schema([
                Section::make(__('reservation.reservation_code'))
                    ->schema([
                        TextEntry::make('reservation_code')
                            ->label(__('reservation.reservation_code'))
                            ->weight('bold')
                            ->copyable(),
                        TextEntry::make('status')
                            ->label(__('reservation.status'))
                            ->badge(),
                        TextEntry::make('source')
                            ->label(__('reservation.source'))
                            ->badge(),
                        TextEntry::make('reserved_at')
                            ->label(__('reservation.reserved_at'))
                            ->dateTime(),
                        TextEntry::make('expires_at')
                            ->label(__('reservation.expires_at'))
                            ->dateTime()
                            ->placeholder('-'),
                    ]),
                Section::make(__('reservation.customer'))
                    ->schema([
                        TextEntry::make('customer.name')
                            ->label(__('reservation.customer')),
                        TextEntry::make('vendor.store_name')
                            ->label(__('reservation.vendor')),
                        TextEntry::make('product.name')
                            ->label(__('reservation.product')),
                        TextEntry::make('variant.name')
                            ->label(__('reservation.variant'))
                            ->placeholder('-'),
                    ]),
            ]),

            Grid::make(2)->schema([
                Section::make(__('reservation.customer_note'))
                    ->schema([
                        TextEntry::make('customer_note')
                            ->label(__('reservation.customer_note'))
                            ->placeholder('-'),
                        TextEntry::make('vendor_note')
                            ->label(__('reservation.vendor_note'))
                            ->placeholder('-'),
                    ]),
                Section::make(__('reservation.status'))
                    ->schema([
                        TextEntry::make('confirmed_at')
                            ->label(__('reservation.confirmed_at'))
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('completed_at')
                            ->label(__('reservation.completed_at'))
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('cancelled_at')
                            ->label(__('reservation.cancelled_at'))
                            ->dateTime()
                            ->placeholder('-'),
                        TextEntry::make('cancelled_by')
                            ->label(__('reservation.cancelled_by'))
                            ->placeholder('-'),
                        TextEntry::make('cancellation_reason')
                            ->label(__('reservation.cancellation_reason'))
                            ->placeholder('-'),
                    ]),
            ]),
        ]);
    }
}
