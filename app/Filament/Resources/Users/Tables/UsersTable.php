<?php

namespace App\Filament\Resources\Users\Tables;

use App\Models\User;
use Filament\Actions\Action;
use Filament\Actions\ActionGroup;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Actions\ViewAction;
use Filament\Notifications\Notification;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\TernaryFilter;
use Filament\Tables\Table;

class UsersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('name')
                    ->label(__('user.name'))
                    ->searchable()
                    ->sortable()
                    ->weight('bold'),
                TextColumn::make('email')
                    ->label(__('user.email'))
                    ->searchable(),
                TextColumn::make('phone')
                    ->label(__('user.phone'))
                    ->searchable(),
                TextColumn::make('reservations_count')
                    ->label(__('admin.reservations'))
                    ->counts('reservations')
                    ->sortable(),
                TextColumn::make('reviews_count')
                    ->label(__('admin.reviews'))
                    ->counts('reviews')
                    ->sortable(),
                IconColumn::make('is_active')
                    ->label(__('user.is_active'))
                    ->boolean(),
                TextColumn::make('email_verified_at')
                    ->label(__('user.email_verified_at'))
                    ->dateTime()
                    ->toggleable(isToggledHiddenByDefault: true),
                TextColumn::make('created_at')
                    ->label(__('user.created_at'))
                    ->dateTime()
                    ->sortable()
                    ->toggleable(),
            ])
            ->defaultSort('created_at', 'desc')
            ->filters([
                TernaryFilter::make('is_active')
                    ->label(__('user.is_active')),
                TernaryFilter::make('email_verified')
                    ->label(__('user.email_verified'))
                    ->queries(
                        true: fn ($query) => $query->whereNotNull('email_verified_at'),
                        false: fn ($query) => $query->whereNull('email_verified_at'),
                    ),
            ])
            ->recordActions([
                ActionGroup::make([
                    ViewAction::make(),
                    EditAction::make(),
                    Action::make('toggle_active')
                        ->label(fn (User $record) => $record->is_active ? __('user.deactivate') : __('user.activate'))
                        ->icon(fn (User $record) => $record->is_active ? 'heroicon-o-no-symbol' : 'heroicon-o-check-circle')
                        ->color(fn (User $record) => $record->is_active ? 'danger' : 'success')
                        ->requiresConfirmation()
                        ->action(function (User $record) {
                            $record->forceFill(['is_active' => ! $record->is_active])->save();
                            Notification::make()
                                ->title(__('settings.saved'))
                                ->success()
                                ->send();
                        }),
                ]),
            ])
            ->toolbarActions([
                BulkActionGroup::make([
                    DeleteBulkAction::make(),
                ]),
            ]);
    }
}
