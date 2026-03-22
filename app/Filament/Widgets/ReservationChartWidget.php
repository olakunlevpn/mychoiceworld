<?php

namespace App\Filament\Widgets;

use App\Models\Reservation;
use Filament\Widgets\ChartWidget;
use Illuminate\Support\Carbon;

class ReservationChartWidget extends ChartWidget
{
    protected static ?int $sort = 2;

    protected int|string|array $columnSpan = 'full';

    public function getHeading(): string
    {
        return __('admin.reservations_last_30_days');
    }

    protected function getData(): array
    {
        $days = collect(range(29, 0))->map(fn ($daysAgo) => Carbon::today()->subDays($daysAgo));

        $reservations = Reservation::query()
            ->where('created_at', '>=', $days->first()->startOfDay())
            ->selectRaw('DATE(created_at) as date, COUNT(*) as count')
            ->groupByRaw('DATE(created_at)')
            ->pluck('count', 'date');

        return [
            'datasets' => [
                [
                    'label' => __('admin.total_reservations'),
                    'data' => $days->map(fn ($day) => $reservations->get($day->format('Y-m-d'), 0))->toArray(),
                    'borderColor' => '#6366f1',
                    'backgroundColor' => 'rgba(99, 102, 241, 0.1)',
                    'fill' => true,
                    'tension' => 0.3,
                ],
            ],
            'labels' => $days->map(fn ($day) => $day->format('M d'))->toArray(),
        ];
    }

    protected function getType(): string
    {
        return 'line';
    }
}
