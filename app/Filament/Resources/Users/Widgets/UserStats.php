<?php

namespace App\Filament\Resources\Users\Widgets;

use App\Filament\Resources\Users\Pages\ListUsers;
use Filament\Widgets\Concerns\InteractsWithPageTable;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class UserStats extends BaseWidget
{
    use InteractsWithPageTable;

    protected ?string $pollingInterval = null;

    protected function getTablePage(): string
    {
        return ListUsers::class;
    }

    protected function getStats(): array
    {
        $query = $this->getPageTableQuery();

        return [
            Stat::make(__('admin.total_customers'), $query->count())
                ->icon('heroicon-o-users'),
            Stat::make(__('user.active_users'), (clone $query)->where('is_active', true)->count())
                ->icon('heroicon-o-check-circle')
                ->color('success'),
            Stat::make(__('user.inactive_users'), (clone $query)->where('is_active', false)->count())
                ->icon('heroicon-o-no-symbol')
                ->color('danger'),
        ];
    }
}
