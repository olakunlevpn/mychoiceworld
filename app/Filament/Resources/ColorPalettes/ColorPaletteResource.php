<?php

namespace App\Filament\Resources\ColorPalettes;

use App\Filament\Resources\ColorPalettes\Pages\ListColorPalettes;
use App\Filament\Resources\ColorPalettes\Schemas\ColorPaletteForm;
use App\Filament\Resources\ColorPalettes\Tables\ColorPalettesTable;
use App\Models\ColorPalette;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class ColorPaletteResource extends Resource
{
    protected static ?string $model = ColorPalette::class;

    protected static ?string $recordTitleAttribute = 'color_name';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-swatch';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.ai_config');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.color_palettes');
    }

    public static function form(Schema $schema): Schema
    {
        return ColorPaletteForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return ColorPalettesTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListColorPalettes::route('/'),
        ];
    }
}
