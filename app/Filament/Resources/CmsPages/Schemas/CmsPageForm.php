<?php

namespace App\Filament\Resources\CmsPages\Schemas;

use App\Enums\PageStatus;
use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\RichEditor;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Components\ToggleButtons;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Components\Utilities\Set;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;
use Illuminate\Support\Str;

class CmsPageForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->components([
                Tabs::make('Page')
                    ->schema([
                        Tab::make('Content')
                            ->icon(Heroicon::PencilSquare)
                            ->schema([
                                TextInput::make('title')
                                    ->required()
                                    ->maxLength(255)
                                    ->live(onBlur: true)
                                    ->afterStateUpdated(function (string $operation, ?string $state, Set $set): void {
                                        if ($operation !== 'create') {
                                            return;
                                        }
                                        $set('slug', Str::slug($state));
                                    }),
                                TextInput::make('slug')
                                    ->disabled()
                                    ->dehydrated()
                                    ->required()
                                    ->unique(ignoreRecord: true),
                                RichEditor::make('body')
                                    ->required()
                                    ->fileAttachmentsDirectory('pages/attachments')
                                    ->columnSpanFull(),
                                Textarea::make('excerpt')
                                    ->rows(3)
                                    ->maxLength(500)
                                    ->columnSpanFull(),
                            ]),
                        Tab::make('Media')
                            ->icon(Heroicon::Photo)
                            ->schema([
                                FileUpload::make('cover_image')
                                    ->image()
                                    ->disk('public')
                                    ->directory('pages/covers')
                                    ->maxSize(5120),
                            ]),
                        Tab::make('Settings')
                            ->icon(Heroicon::Cog6Tooth)
                            ->columns(2)
                            ->schema([
                                ToggleButtons::make('status')
                                    ->options(PageStatus::class)
                                    ->inline()
                                    ->required()
                                    ->default(PageStatus::Draft)
                                    ->columnSpanFull(),
                                DateTimePicker::make('published_at'),
                                TextInput::make('sort_order')
                                    ->numeric()
                                    ->default(0),
                                Toggle::make('show_in_footer')
                                    ->label('Show in Footer')
                                    ->default(false),
                            ]),
                        Tab::make('SEO')
                            ->icon(Heroicon::MagnifyingGlass)
                            ->schema([
                                TextInput::make('meta_title')
                                    ->maxLength(60),
                                Textarea::make('meta_description')
                                    ->rows(3)
                                    ->maxLength(160),
                            ]),
                    ])
                    ->columnSpanFull(),
            ]);
    }
}
