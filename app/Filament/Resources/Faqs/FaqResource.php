<?php

namespace App\Filament\Resources\Faqs;

use App\Filament\Resources\Faqs\Pages\ListFaqs;
use App\Filament\Resources\Faqs\Schemas\FaqForm;
use App\Filament\Resources\Faqs\Tables\FaqsTable;
use App\Models\Faq;
use Filament\Resources\Resource;
use Filament\Schemas\Schema;
use Filament\Tables\Table;

class FaqResource extends Resource
{
    protected static ?string $model = Faq::class;

    protected static ?string $recordTitleAttribute = 'question';

    protected static ?int $navigationSort = 10;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-question-mark-circle';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.settings');
    }

    public static function getNavigationLabel(): string
    {
        return 'FAQs';
    }

    public static function form(Schema $schema): Schema
    {
        return FaqForm::configure($schema);
    }

    public static function table(Table $table): Table
    {
        return FaqsTable::configure($table);
    }

    public static function getPages(): array
    {
        return ['index' => ListFaqs::route('/')];
    }
}
