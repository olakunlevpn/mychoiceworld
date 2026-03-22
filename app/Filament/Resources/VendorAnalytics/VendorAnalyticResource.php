<?php

namespace App\Filament\Resources\VendorAnalytics;

use App\Filament\Resources\VendorAnalytics\Pages\ListVendorAnalytics;
use App\Filament\Resources\VendorAnalytics\Schemas\VendorAnalyticInfolist;
use App\Filament\Resources\VendorAnalytics\Tables\VendorAnalyticsTable;
use App\Filament\Resources\VendorAnalytics\Widgets\VendorAnalyticsStats;
use App\Models\VendorAnalytic;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class VendorAnalyticResource extends Resource
{
    protected static ?string $model = VendorAnalytic::class;

    protected static ?int $navigationSort = 4;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-chart-bar';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.operations');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.vendor_analytics');
    }

    public static function canCreate(): bool
    {
        return false;
    }

    public static function infolist(Schema $schema): Schema
    {
        return VendorAnalyticInfolist::configure($schema);
    }

    public static function getGlobalSearchEloquentQuery(): Builder
    {
        return parent::getGlobalSearchEloquentQuery()->with(['vendor']);
    }

    public static function table(Table $table): Table
    {
        return VendorAnalyticsTable::configure($table);
    }

    public static function getWidgets(): array
    {
        return [
            VendorAnalyticsStats::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVendorAnalytics::route('/'),
        ];
    }
}
