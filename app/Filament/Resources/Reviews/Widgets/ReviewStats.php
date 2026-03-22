<?php

namespace App\Filament\Resources\Reviews\Widgets;

use App\Filament\Resources\Reviews\Pages\ListReviews;
use Filament\Widgets\Concerns\InteractsWithPageTable;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class ReviewStats extends BaseWidget
{
    use InteractsWithPageTable;

    protected ?string $pollingInterval = null;

    protected function getTablePage(): string
    {
        return ListReviews::class;
    }

    protected function getStats(): array
    {
        return [
            Stat::make(__('admin.total_reviews'), $this->getPageTableQuery()->count()),
            Stat::make(__('admin.avg_rating'), number_format((float) $this->getPageTableQuery()->avg('rating'), 1)),
            Stat::make(__('admin.published_reviews'), $this->getPageTableQuery()->where('is_published', true)->count()),
            Stat::make(__('admin.unpublished_reviews'), $this->getPageTableQuery()->where('is_published', false)->count()),
        ];
    }
}
