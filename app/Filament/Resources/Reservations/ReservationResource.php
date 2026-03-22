<?php

namespace App\Filament\Resources\Reservations;

use App\Filament\Resources\Reservations\Pages\ListReservations;
use App\Filament\Resources\Reservations\Pages\ViewReservation;
use App\Filament\Resources\Reservations\Schemas\ReservationInfolist;
use App\Filament\Resources\Reservations\Tables\ReservationsTable;
use App\Models\Reservation;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ReservationResource extends Resource
{
    protected static ?string $model = Reservation::class;

    protected static ?string $recordTitleAttribute = 'reservation_code';

    protected static ?int $navigationSort = 5;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-ticket';
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.operations');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.reservations');
    }

    public static function infolist(Schema $schema): Schema
    {
        return ReservationInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ReservationsTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListReservations::route('/'),
            'view' => ViewReservation::route('/{record}'),
        ];
    }
}
