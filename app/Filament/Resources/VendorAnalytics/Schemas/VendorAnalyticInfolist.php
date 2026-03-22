<?php

namespace App\Filament\Resources\VendorAnalytics\Schemas;

use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Schema;

class VendorAnalyticInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextEntry::make('vendor.store_name')
                    ->label(__('vendor_analytics.vendor')),
                TextEntry::make('date')
                    ->label(__('vendor_analytics.date'))
                    ->date(),
                TextEntry::make('profile_views')
                    ->label(__('vendor_analytics.profile_views'))
                    ->numeric(),
                TextEntry::make('product_views')
                    ->label(__('vendor_analytics.product_views'))
                    ->numeric(),
                TextEntry::make('reservations_made')
                    ->label(__('vendor_analytics.reservations_made'))
                    ->numeric(),
                TextEntry::make('reservations_completed')
                    ->label(__('vendor_analytics.reservations_completed'))
                    ->numeric(),
                TextEntry::make('reservations_no_show')
                    ->label(__('vendor_analytics.reservations_no_show'))
                    ->numeric(),
                TextEntry::make('ai_matches_shown')
                    ->label(__('vendor_analytics.ai_matches_shown'))
                    ->numeric(),
            ]);
    }
}
