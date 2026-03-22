<?php

namespace App\Filament\Resources\VendorAnalytics\Widgets;

use App\Filament\Resources\VendorAnalytics\Pages\ListVendorAnalytics;
use Filament\Widgets\Concerns\InteractsWithPageTable;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class VendorAnalyticsStats extends BaseWidget
{
    use InteractsWithPageTable;

    protected ?string $pollingInterval = null;

    protected function getTablePage(): string
    {
        return ListVendorAnalytics::class;
    }

    protected function getStats(): array
    {
        $query = $this->getPageTableQuery();

        $totalViews = (int) $query->sum('profile_views');
        $totalProductViews = (int) $query->sum('product_views');
        $totalReservations = (int) $query->sum('reservations_made');
        $conversionRate = $totalProductViews > 0
            ? round(($totalReservations / $totalProductViews) * 100, 1).'%'
            : '0%';

        return [
            Stat::make(__('vendor_analytics.total_profile_views'), number_format($totalViews)),
            Stat::make(__('vendor_analytics.total_product_views'), number_format($totalProductViews)),
            Stat::make(__('vendor_analytics.total_reservations_made'), number_format($totalReservations)),
            Stat::make(__('vendor_analytics.conversion_rate'), $conversionRate),
        ];
    }
}
