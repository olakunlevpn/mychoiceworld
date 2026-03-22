<?php

namespace App\Filament\Resources\HelpCategories\Schemas;

use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Illuminate\Support\Str;

class HelpCategoryForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2)->components([
            TextInput::make('title')->required()->live(onBlur: true)->afterStateUpdated(function (string $operation, $state, Set $set): void {
                if ($operation === 'create') {
                    $set('slug', Str::slug($state));
                }
            }),
            TextInput::make('slug')->required()->unique(ignoreRecord: true),
            Textarea::make('description')->nullable()->columnSpanFull(),
            TextInput::make('icon')->nullable(),
            TextInput::make('sort_order')->numeric()->default(0),
            Toggle::make('is_active')->default(true)->columnStart(1),
        ]);
    }
}
