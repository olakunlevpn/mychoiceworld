<?php

namespace App\Http\Controllers\Customer;

use App\Http\Controllers\Controller;
use Illuminate\Http\Request;
use Inertia\Inertia;
use Inertia\Response;

class DashboardController extends Controller
{
    public function index(Request $request): Response
    {
        $user = $request->user();

        $stats = [
            'active_reservations' => $user->reservations()->active()->count(),
            'total_reservations' => $user->reservations()->count(),
            'wishlist_items' => $user->wishlists()->count(),
            'reviews_written' => $user->reviews()->count(),
        ];

        $recentReservations = $user->reservations()
            ->with(['product:id,name,slug', 'product.primaryImage', 'vendor:id,store_name,slug'])
            ->latest()
            ->limit(5)
            ->get();

        return Inertia::render('Customer/Dashboard', [
            'stats' => $stats,
            'recentReservations' => $recentReservations,
        ]);
    }
}
