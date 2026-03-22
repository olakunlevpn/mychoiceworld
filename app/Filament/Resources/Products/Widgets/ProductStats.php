<?php

namespace App\Filament\Resources\Products\Widgets;

use App\Filament\Resources\Products\Pages\ListProducts;
use Filament\Widgets\Concerns\InteractsWithPageTable;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ProductStats extends BaseWidget
{
    use InteractsWithPageTable;

    protected ?string $pollingInterval = null;

    protected function getTablePage(): string
    {
        return ListProducts::class;
    }

    protected function getStats(): array
    {
        return [
            Stat::make(__('admin.total_products'), $this->getPageTableQuery()->count()),
            Stat::make(__('admin.total_inventory'), $this->getPageTableQuery()->sum('views_count')),
            Stat::make(__('admin.average_price'), number_format((float) $this->getPageTableQuery()->avg('price') / 100, 2)),
            Stat::make(__('admin.out_of_stock'), $this->getPageTableQuery()->where('status', 'out_of_stock')->count()),
        ];
    }
}
