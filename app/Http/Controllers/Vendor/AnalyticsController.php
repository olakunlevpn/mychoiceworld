<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Concerns\HasVendor;
use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class AnalyticsController extends Controller
{
    use HasVendor;

    public function index(Request $request): Response
    {
        $vendor = $this->vendor();
        $days = $request->input('days', 30);
        $startDate = now()->subDays($days);

        $analytics = $vendor->analytics()
            ->where('date', '>=', $startDate)
            ->orderBy('date')
            ->get();

        $totals = [
            'views' => $analytics->sum('views'),
            'unique_visitors' => $analytics->sum('unique_visitors'),
            'reservations' => $analytics->sum('reservations'),
            'completed' => $analytics->sum('completed_reservations'),
        ];

        return Inertia::render('Vendor/Analytics/Index', [
            'analytics' => $analytics,
            'totals' => $totals,
            'days' => $days,
        ]);
    }
}
