<?php

namespace App\Filament\Resources\HelpArticles\Schemas;

use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class HelpArticleForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2)->components([
            Select::make('help_category_id')->relationship('category', 'title')->required()->searchable()->preload(),
            TextInput::make('title')->required()->live(onBlur: true)->afterStateUpdated(function (string $operation, $state, Set $set): void {
                if ($operation === 'create') {
                    $set('slug', Str::slug($state));
                }
            }),
            TextInput::make('slug')->required()->unique(ignoreRecord: true),
            TextInput::make('read_time')->nullable()->placeholder('5 min'),
            Textarea::make('excerpt')->nullable()->columnSpanFull(),
            RichEditor::make('content')->required()->columnSpanFull(),
            TextInput::make('sort_order')->numeric()->default(0),
            Toggle::make('is_published')->default(true),
        ]);
    }
}
