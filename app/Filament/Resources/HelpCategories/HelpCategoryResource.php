<?php

namespace App\Filament\Resources\HelpCategories;

use App\Filament\Resources\HelpCategories\Pages\ListHelpCategories;
use App\Filament\Resources\HelpCategories\Schemas\HelpCategoryForm;
use App\Filament\Resources\HelpCategories\Tables\HelpCategoriesTable;
use App\Models\HelpCategory;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class HelpCategoryResource extends Resource
{
    protected static ?string $model = HelpCategory::class;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?int $navigationSort = 11;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-book-open';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.settings');
    }

    public static function getNavigationLabel(): string
    {
        return 'Help Categories';
    }

    public static function form(Schema $schema): Schema
    {
        return HelpCategoryForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return HelpCategoriesTable::configure($table);
    }

    public static function getPages(): array
    {
        return ['index' => ListHelpCategories::route('/')];
    }
}
