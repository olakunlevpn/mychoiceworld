<?php

namespace App\Filament\Resources\Vendors\Tables;

use App\Enums\VendorStatus;
use App\Models\Vendor;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Forms\Components\Textarea;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class VendorsTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('store_name')
                    ->label(__('vendor.store_name'))
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('user.name')
                    ->label(__('vendor.owner'))
                    ->searchable()
                    ->toggleable(),
                TextColumn::make('city')
                    ->label(__('vendor.city'))
                    ->toggleable(),
                TextColumn::make('status')
                    ->label(__('vendor.status'))
                    ->badge(),
                IconColumn::make('is_featured')
                    ->label(__('vendor.is_featured'))
                    ->boolean()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('rating_avg')
                    ->label(__('vendor.rating_avg'))
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('products_count')
                    ->label(__('admin.products'))
                    ->counts('products')
                    ->sortable()
                    ->toggleable(),
                TextColumn::make('created_at')
                    ->label(__('vendor.created_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                SelectFilter::make('status')
                    ->label(__('vendor.status'))
                    ->options(VendorStatus::class),
                SelectFilter::make('city')
                    ->label(__('vendor.city'))
                    ->options(fn () => Vendor::query()->distinct()->pluck('city', 'city')->filter()->toArray()),
                TernaryFilter::make('is_featured')
                    ->label(__('vendor.is_featured')),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    Action::make('approve')
                        ->label(__('vendor.approve'))
                        ->icon('heroicon-o-check-circle')
                        ->color('success')
                        ->requiresConfirmation()
                        ->modalHeading(__('vendor.approve_confirm'))
                        ->visible(fn ($record) => $record->status !== VendorStatus::Approved)
                        ->action(fn ($record) => $record->update(['status' => 'approved', 'approved_at' => now()])),
                    Action::make('reject')
                        ->label(__('vendor.reject'))
                        ->icon('heroicon-o-x-circle')
                        ->color('danger')
                        ->requiresConfirmation()
                        ->modalHeading(__('vendor.reject_confirm'))
                        ->schema([
                            Textarea::make('rejection_reason')
                                ->label(__('vendor.rejection_reason'))
                                ->required(),
                        ])
                        ->action(fn ($record, array $data) => $record->update([
                            'status' => 'rejected',
                            'rejection_reason' => $data['rejection_reason'],
                        ])),
                    Action::make('suspend')
                        ->label(__('vendor.suspend'))
                        ->icon('heroicon-o-no-symbol')
                        ->color('warning')
                        ->requiresConfirmation()
                        ->modalHeading(__('vendor.suspend_confirm'))
                        ->visible(fn ($record) => $record->status === VendorStatus::Approved)
                        ->action(fn ($record) => $record->update(['status' => 'suspended'])),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
