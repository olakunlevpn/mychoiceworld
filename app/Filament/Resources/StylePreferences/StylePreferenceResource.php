<?php

namespace App\Filament\Resources\StylePreferences;

use App\Filament\Resources\StylePreferences\Pages\ListStylePreferences;
use App\Filament\Resources\StylePreferences\Schemas\StylePreferenceForm;
use App\Filament\Resources\StylePreferences\Tables\StylePreferencesTable;
use App\Models\StylePreference;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class StylePreferenceResource extends Resource
{
    protected static ?string $model = StylePreference::class;

    protected static ?string $recordTitleAttribute = 'name';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-paint-brush';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.catalog');
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.style_preferences');
    }

    public static function form(Schema $schema): Schema
    {
        return StylePreferenceForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return StylePreferencesTable::configure($table);
    }

    public static function getPages(): array
    {
        return [
            'index' => ListStylePreferences::route('/'),
        ];
    }
}
