<?php

namespace App\Filament\Widgets;

use App\Enums\VendorStatus;
use App\Models\Vendor;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class PendingVendorsWidget extends BaseWidget
{
    protected static ?int $sort = 5;

    protected int|string|array $columnSpan = 'full';

    public function getTableHeading(): string
    {
        return __('admin.pending_vendors');
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(Vendor::query()->where('status', VendorStatus::Pending)->with('user')->latest())
            ->columns([
                TextColumn::make('store_name')
                    ->label(__('vendor.store_name'))
                    ->searchable(),
                TextColumn::make('user.name')
                    ->label(__('vendor.owner')),
                TextColumn::make('city')
                    ->label(__('vendor.city')),
                TextColumn::make('created_at')
                    ->label(__('vendor.created_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultPaginationPageOption(5);
    }
}
