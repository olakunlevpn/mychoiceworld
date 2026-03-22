<?php

namespace App\Filament\Resources\HeroSlides\Schemas;

use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Schema;

class HeroSlideForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(2)->components([
            TextInput::make('heading')->required()->maxLength(255)->columnSpanFull(),
            Textarea::make('description')->rows(2)->columnSpanFull(),
            TextInput::make('cta_text')->label('Button Text')->default('Explore'),
            TextInput::make('cta_link')->label('Button Link')->default('/products'),
            FileUpload::make('background_image')
                ->image()
                ->disk('public')
                ->directory('hero-slides')
                ->maxSize(10240)
                ->columnSpanFull(),
            TextInput::make('sort_order')->numeric()->default(0),
            Toggle::make('is_active')->default(true),
        ]);
    }
}
