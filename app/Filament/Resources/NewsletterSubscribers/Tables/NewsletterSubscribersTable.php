<?php

namespace App\Filament\Resources\NewsletterSubscribers\Tables;

use Filament\Actions\DeleteBulkAction;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class NewsletterSubscribersTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('email')->searchable()->sortable(),
                TextColumn::make('subscribed_at')->dateTime()->sortable(),
                TextColumn::make('unsubscribed_at')->dateTime()->placeholder('-'),
                TextColumn::make('created_at')->dateTime()->sortable()->toggleable(isToggledHiddenByDefault: true),
            ])
            ->defaultSort('created_at', 'desc')
            ->toolbarActions([DeleteBulkAction::make()]);
    }
}
