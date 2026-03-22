<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class LatestReservationsWidget extends BaseWidget
{
    protected static ?int $sort = 3;

    protected int|string|array $columnSpan = 'full';

    public function getTableHeading(): string
    {
        return __('admin.latest_reservations');
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(Reservation::query()->with(['customer', 'vendor', 'product'])->latest('reserved_at'))
            ->columns([
                TextColumn::make('reservation_code')
                    ->label(__('reservation.reservation_code'))
                    ->searchable(),
                TextColumn::make('customer.name')
                    ->label(__('reservation.customer')),
                TextColumn::make('vendor.store_name')
                    ->label(__('reservation.vendor')),
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
            ->defaultPaginationPageOption(5);
    }
}
