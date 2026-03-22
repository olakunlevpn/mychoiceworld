<?php

namespace App\Filament\Resources\HelpArticles;

use App\Filament\Resources\HelpArticles\Pages\ListHelpArticles;
use App\Filament\Resources\HelpArticles\Schemas\HelpArticleForm;
use App\Filament\Resources\HelpArticles\Tables\HelpArticlesTable;
use App\Models\HelpArticle;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class HelpArticleResource extends Resource
{
    protected static ?string $model = HelpArticle::class;

    protected static ?string $recordTitleAttribute = 'title';

    protected static ?int $navigationSort = 12;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-document-text';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.settings');
    }

    public static function getNavigationLabel(): string
    {
        return 'Help Articles';
    }

    public static function form(Schema $schema): Schema
    {
        return HelpArticleForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return HelpArticlesTable::configure($table);
    }

    public static function getPages(): array
    {
        return ['index' => ListHelpArticles::route('/')];
    }
}
