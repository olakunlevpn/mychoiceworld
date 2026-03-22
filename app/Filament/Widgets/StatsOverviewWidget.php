<?php

namespace App\Filament\Widgets;

use App\Enums\ProductStatus;
use App\Enums\ReservationStatus;
use App\Enums\UserRole;
use App\Enums\VendorStatus;
use App\Models\AiMatchSession;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\Review;
use App\Models\User;
use App\Models\Vendor;
use Filament\Widgets\StatsOverviewWidget as BaseWidget;
use Filament\Widgets\StatsOverviewWidget\Stat;

class StatsOverviewWidget extends BaseWidget
{
    protected static ?int $sort = 1;

    protected function getStats(): array
    {
        $now = now();
        $thisMonth = $now->month;
        $thisYear = $now->year;

        $totalCustomers = User::where('role', UserRole::Customer)->count();
        $approvedVendors = Vendor::where('status', VendorStatus::Approved)->count();
        $pendingVendors = Vendor::where('status', VendorStatus::Pending)->count();
        $activeProducts = Product::where('status', ProductStatus::Active)->count();

        $reservationsThisMonth = Reservation::query()
            ->whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->count();

        $completedReservations = Reservation::where('status', ReservationStatus::Completed)->count();
        $pendingReservations = Reservation::where('status', ReservationStatus::Pending)->count();

        $totalReviews = Review::where('is_published', true)->count();
        $avgRating = Review::where('is_published', true)->avg('rating');

        $aiMatchSessions = AiMatchSession::query()
            ->whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->count();

        $newCustomersThisMonth = User::query()
            ->where('role', UserRole::Customer)
            ->whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->count();

        $newVendorsThisMonth = Vendor::query()
            ->whereMonth('created_at', $thisMonth)
            ->whereYear('created_at', $thisYear)
            ->count();

        return [
            Stat::make(__('admin.total_customers'), number_format($totalCustomers))
                ->description(__('admin.new_this_month', ['count' => $newCustomersThisMonth]))
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->icon('heroicon-o-users')
                ->color('info'),

            Stat::make(__('admin.approved_vendors'), number_format($approvedVendors))
                ->description(__('admin.new_this_month', ['count' => $newVendorsThisMonth]))
                ->descriptionIcon('heroicon-m-arrow-trending-up')
                ->icon('heroicon-o-building-storefront')
                ->color('success'),

            Stat::make(__('admin.pending_vendors'), number_format($pendingVendors))
                ->icon('heroicon-o-clock')
                ->color($pendingVendors > 0 ? 'danger' : 'gray'),

            Stat::make(__('admin.active_products'), number_format($activeProducts))
                ->icon('heroicon-o-shopping-bag')
                ->color('info'),

            Stat::make(__('admin.reservations_this_month'), number_format($reservationsThisMonth))
                ->description(__('admin.pending_count', ['count' => $pendingReservations]))
                ->descriptionIcon('heroicon-m-clock')
                ->icon('heroicon-o-ticket')
                ->color('warning'),

            Stat::make(__('admin.completed_reservations'), number_format($completedReservations))
                ->icon('heroicon-o-check-circle')
                ->color('success'),

            Stat::make(__('admin.published_reviews'), number_format($totalReviews))
                ->description(__('admin.avg_rating_value', ['value' => number_format($avgRating ?? 0, 1)]))
                ->descriptionIcon('heroicon-m-star')
                ->icon('heroicon-o-star')
                ->color('warning'),

            Stat::make(__('admin.ai_matches_this_month'), number_format($aiMatchSessions))
                ->icon('heroicon-o-sparkles')
                ->color('info'),
        ];
    }
}
