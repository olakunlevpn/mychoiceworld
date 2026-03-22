<?php

namespace App\Filament\Resources\ColorPalettes\Schemas;

use Filament\Forms\Components\ColorPicker;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;

class ColorPaletteForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                Select::make('skin_tone')
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
                    ])
                    ->required(),
                TextInput::make('color_name')
                    ->label(__('color_palette.color_name'))
                    ->required(),
                ColorPicker::make('color_hex')
                    ->label(__('color_palette.color_hex'))
                    ->required(),
                Select::make('season')
                    ->label(__('color_palette.season'))
                    ->options([
                        'spring' => __('color_palette.spring'),
                        'summer' => __('color_palette.summer'),
                        'autumn' => __('color_palette.autumn'),
                        'winter' => __('color_palette.winter'),
                    ])
                    ->nullable(),
                TextInput::make('score')
                    ->label(__('color_palette.score'))
                    ->numeric()
                    ->minValue(0)
                    ->maxValue(1)
                    ->step(0.01)
                    ->required(),
            ]);
    }
}
