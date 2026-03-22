<?php

namespace App\Filament\Resources\CmsPages\Tables;

use App\Enums\PageStatus;
use Filament\Actions\BulkActionGroup;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class CmsPagesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('title')->searchable()->sortable()->weight('bold')->limit(50),
                TextColumn::make('slug'),
                TextColumn::make('status')->badge()->sortable(),
                IconColumn::make('show_in_footer')->boolean()->sortable(),
                TextColumn::make('published_at')->dateTime()->sortable()->toggleable(),
            ])
            ->defaultSort('sort_order')
            ->filters([SelectFilter::make('status')->options(PageStatus::class)])
            ->recordActions([EditAction::make()])
            ->toolbarActions([BulkActionGroup::make([DeleteBulkAction::make()])]);
    }
}
