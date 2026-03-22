<?php

namespace App\Filament\Resources\Vendors;

use App\Filament\Resources\Vendors\Pages\EditVendor;
use App\Filament\Resources\Vendors\Pages\ListVendors;
use App\Filament\Resources\Vendors\Pages\ManageVendorProducts;
use App\Filament\Resources\Vendors\Pages\ManageVendorReservations;
use App\Filament\Resources\Vendors\Pages\ViewVendor;
use App\Filament\Resources\Vendors\Schemas\VendorForm;
use App\Filament\Resources\Vendors\Schemas\VendorInfolist;
use App\Filament\Resources\Vendors\Tables\VendorsTable;
use App\Filament\Resources\Vendors\Widgets\VendorStats;
use App\Models\Vendor;
use Filament\Pages\Page;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;
use Illuminate\Database\Eloquent\Model;

class VendorResource extends Resource
{
    protected static ?string $model = Vendor::class;

    protected static ?string $recordTitleAttribute = 'store_name';

    protected static ?int $navigationSort = 3;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-building-storefront';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.operations');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.vendors');
    }

    public static function getNavigationBadge(): ?string
    {
        $pending = static::$model::where('status', 'pending')->count();

        return $pending > 0 ? (string) $pending : null;
    }

    public static function getNavigationBadgeColor(): string|array|null
    {
        return 'warning';
    }

    /**
     * @return array<string>
     */
    public static function getGloballySearchableAttributes(): array
    {
        return ['store_name', 'email', 'city', 'user.name'];
    }

    /**
     * @return array<string, string>
     */
    public static function getGlobalSearchResultDetails(Model $record): array
    {
        return [
            __('admin.owner') => $record->user?->name ?? '-',
            __('admin.city') => $record->city ?? '-',
            __('admin.status') => $record->status->getLabel(),
        ];
    }

    public static function getGlobalSearchEloquentQuery(): Builder
    {
        return parent::getGlobalSearchEloquentQuery()->with(['user']);
    }

    public static function form(Schema $schema): Schema
    {
        return VendorForm::configure($schema);
    }

    public static function infolist(Schema $schema): Schema
    {
        return VendorInfolist::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return VendorsTable::configure($table);
    }

    public static function getRecordSubNavigation(Page $page): array
    {
        return $page->generateNavigationItems([
            ViewVendor::class,
            EditVendor::class,
            ManageVendorProducts::class,
            ManageVendorReservations::class,
        ]);
    }

    public static function getWidgets(): array
    {
        return [
            VendorStats::class,
        ];
    }

    public static function getPages(): array
    {
        return [
            'index' => ListVendors::route('/'),
            'view' => ViewVendor::route('/{record}'),
            'edit' => EditVendor::route('/{record}/edit'),
            'products' => ManageVendorProducts::route('/{record}/products'),
            'reservations' => ManageVendorReservations::route('/{record}/reservations'),
        ];
    }
}
