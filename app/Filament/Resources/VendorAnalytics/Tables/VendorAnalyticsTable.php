<?php

namespace App\Filament\Resources\VendorAnalytics\Tables;

use Filament\Actions\ActionGroup;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\DatePicker;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\Filter;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;
use Illuminate\Database\Eloquent\Builder;

class VendorAnalyticsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('vendor.store_name')
                    ->label(__('vendor_analytics.vendor'))
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('date')
                    ->label(__('vendor_analytics.date'))
                    ->date()
                    ->sortable(),
                TextColumn::make('profile_views')
                    ->label(__('vendor_analytics.profile_views'))
                    ->numeric()
                    ->sortable(),
                TextColumn::make('product_views')
                    ->label(__('vendor_analytics.product_views'))
                    ->numeric()
                    ->sortable(),
                TextColumn::make('reservations_made')
                    ->label(__('vendor_analytics.reservations_made'))
                    ->numeric()
                    ->sortable(),
                TextColumn::make('reservations_completed')
                    ->label(__('vendor_analytics.reservations_completed'))
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('reservations_no_show')
                    ->label(__('vendor_analytics.reservations_no_show'))
                    ->numeric()
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('ai_matches_shown')
                    ->label(__('vendor_analytics.ai_matches_shown'))
                    ->numeric()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('date', 'desc')
            ->filters([
                SelectFilter::make('vendor_id')
                    ->label(__('vendor_analytics.vendor'))
                    ->relationship('vendor', 'store_name')
                    ->searchable()
                    ->preload(),
                Filter::make('date_range')
                    ->form([
                        DatePicker::make('date_from')
                            ->label(__('vendor_analytics.date_from')),
                        DatePicker::make('date_until')
                            ->label(__('vendor_analytics.date_until')),
                    ])
                    ->query(function (Builder $query, array $data): Builder {
                        return $query
                            ->when($data['date_from'], fn (Builder $query, $date) => $query->whereDate('date', '>=', $date))
                            ->when($data['date_until'], fn (Builder $query, $date) => $query->whereDate('date', '<=', $date));
                    }),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make(),
                ]),
            ]);
    }
}
