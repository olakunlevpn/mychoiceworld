<?php

namespace App\Filament\Widgets;

use App\Models\Review;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;
use Filament\Widgets\TableWidget as BaseWidget;

class RecentReviewsWidget extends BaseWidget
{
    protected static ?int $sort = 4;

    protected int|string|array $columnSpan = 'full';

    public function getTableHeading(): string
    {
        return __('admin.recent_reviews');
    }

    public function table(Table $table): Table
    {
        return $table
            ->query(
                Review::query()
                    ->with(['customer:id,name', 'vendor:id,store_name'])
                    ->latest()
            )
            ->columns([
                TextColumn::make('customer.name')
                    ->label(__('review.customer')),
                TextColumn::make('vendor.store_name')
                    ->label(__('review.vendor')),
                TextColumn::make('rating')
                    ->label(__('review.rating'))
                    ->badge()
                    ->color(fn (int $state): string => match (true) {
                        $state >= 4 => 'success',
                        $state >= 3 => 'warning',
                        default => 'danger',
                    }),
                TextColumn::make('comment')
                    ->label(__('review.comment'))
                    ->limit(40),
                TextColumn::make('is_published')
                    ->label(__('review.status'))
                    ->badge()
                    ->formatStateUsing(fn (bool $state): string => $state ? __('admin.published') : __('admin.unpublished'))
                    ->color(fn (bool $state): string => $state ? 'success' : 'gray'),
                TextColumn::make('created_at')
                    ->label(__('review.created_at'))
                    ->dateTime()
                    ->sortable(),
            ])
            ->defaultPaginationPageOption(5);
    }
}
