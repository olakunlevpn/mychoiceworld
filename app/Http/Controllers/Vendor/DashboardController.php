<?php

namespace App\Http\Controllers\Vendor;

use App\Http\Controllers\Concerns\HasVendor;
use App\Http\Controllers\Controller;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    use HasVendor;

    public function index(): Response
    {
        $vendor = $this->vendor();

        $stats = [
            'total_products' => $vendor->products()->count(),
            'active_products' => $vendor->products()->where('status', 'active')->count(),
            'pending_reservations' => $vendor->reservations()->where('status', 'pending')->count(),
            'total_reservations' => $vendor->reservations()->count(),
            'rating_avg' => $vendor->rating_avg,
            'rating_count' => $vendor->rating_count,
        ];

        $recentReservations = $vendor->reservations()
            ->with(['customer:id,name,email', 'product:id,name'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Vendor/Dashboard', [
            'stats' => $stats,
            'recentReservations' => $recentReservations,
        ]);
    }

    public function status(): Response
    {
        $vendor = $this->vendor();

        return Inertia::render('Vendor/Status', [
            'vendorStatus' => $vendor->status->value,
            'rejectionReason' => $vendor->rejection_reason,
        ]);
    }
}
