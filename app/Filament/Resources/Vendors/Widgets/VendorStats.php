<?php

namespace App\Filament\Resources\Vendors\Widgets;

use App\Filament\Resources\Vendors\Pages\ListVendors;
use Filament\Widgets\Concerns\InteractsWithPageTable;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class VendorStats extends BaseWidget
{
    use InteractsWithPageTable;

    protected ?string $pollingInterval = null;

    protected function getTablePage(): string
    {
        return ListVendors::class;
    }

    protected function getStats(): array
    {
        return [
            Stat::make(__('admin.total_vendors'), $this->getPageTableQuery()->count()),
            Stat::make(__('admin.approved_vendors'), $this->getPageTableQuery()->where('status', 'approved')->count()),
            Stat::make(__('admin.pending_vendors'), $this->getPageTableQuery()->where('status', 'pending')->count()),
            Stat::make(__('admin.suspended_vendors'), $this->getPageTableQuery()->where('status', 'suspended')->count()),
        ];
    }
}
