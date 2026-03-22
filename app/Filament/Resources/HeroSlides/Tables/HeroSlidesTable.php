<?php

namespace App\Filament\Resources\HeroSlides\Tables;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class HeroSlidesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('background_image')->disk('public')->rounded()->size(60),
                TextColumn::make('heading')->searchable()->sortable()->limit(40),
                TextColumn::make('cta_text')->label('Button'),
                TextColumn::make('sort_order')->sortable(),
                IconColumn::make('is_active')->boolean(),
            ])
            ->defaultSort('sort_order')
            ->recordActions([EditAction::make()])
            ->toolbarActions([CreateAction::make(), DeleteBulkAction::make()]);
    }
}
