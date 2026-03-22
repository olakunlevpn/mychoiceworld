<?php

namespace App\Filament\Resources\ColorPalettes\Tables;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteBulkAction;
use Filament\Actions\EditAction;
use Filament\Tables\Columns\ColorColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Filters\SelectFilter;
use Filament\Tables\Table;

class ColorPalettesTable
{
    public static function configure(Table $table): Table
    {
        return $table
            ->columns([
                TextColumn::make('skin_tone')
                    ->label(__('color_palette.skin_tone'))
                    ->badge()
                    ->sortable(),
                TextColumn::make('color_name')
                    ->label(__('color_palette.color_name'))
                    ->searchable(),
                ColorColumn::make('color_hex')
                    ->label(__('color_palette.color_hex')),
                TextColumn::make('season')
                    ->label(__('color_palette.season'))
                    ->badge(),
                TextColumn::make('score')
                    ->label(__('color_palette.score'))
                    ->sortable(),
            ])
            ->defaultSort('skin_tone', 'asc')
            ->filters([
                SelectFilter::make('skin_tone')
                    ->label(__('color_palette.skin_tone'))
                    ->options([
                        'light' => 'Light',
                        'fair' => 'Fair',
                        'medium' => 'Medium',
                        'olive' => 'Olive',
                        'tan' => 'Tan',
                        'brown' => 'Brown',
                        'dark' => 'Dark',
                        'deep' => 'Deep',
                    ]),
                SelectFilter::make('season')
                    ->label(__('color_palette.season'))
                    ->options([
                        'spring' => __('color_palette.spring'),
                        'summer' => __('color_palette.summer'),
                        'autumn' => __('color_palette.autumn'),
                        'winter' => __('color_palette.winter'),
                    ]),
            ])
            ->recordActions([
                EditAction::make(),
            ])
            ->toolbarActions([
                CreateAction::make(),
                DeleteBulkAction::make(),
            ]);
    }
}
