<?php

namespace App\Filament\Resources\Products\RelationManagers;

use Filament\Actions\CreateAction;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Resources\RelationManagers\RelationManager;
use Filament\Schemas\Schema;
use Filament\Tables\Columns\IconColumn;
use Filament\Tables\Columns\ImageColumn;
use Filament\Tables\Columns\TextColumn;
use Filament\Tables\Table;

class ImagesRelationManager extends RelationManager
{
    protected static string $relationship = 'images';

    protected static ?string $recordTitleAttribute = 'alt_text';

    public function form(Schema $schema): Schema
    {
        return $schema->components([
            FileUpload::make('url')
                ->label(__('product.image_url'))
                ->image()
                ->directory('products')
                ->required(),
            TextInput::make('alt_text')
                ->label(__('product.alt_text'))
                ->maxLength(255),
            TextInput::make('color')
                ->label(__('product.color'))
                ->placeholder('e.g. Emerald, Red, Blue')
                ->maxLength(100),
            TextInput::make('sort_order')
                ->label(__('product.sort_order'))
                ->numeric()
                ->default(0),
            Toggle::make('is_primary')
                ->label(__('product.is_primary')),
        ]);
    }

    public function table(Table $table): Table
    {
        return $table
            ->columns([
                ImageColumn::make('url')
                    ->label(__('product.image_url')),
                TextColumn::make('alt_text')
                    ->label(__('product.alt_text')),
                TextColumn::make('color')
                    ->label(__('product.color')),
                TextColumn::make('sort_order')
                    ->label(__('product.sort_order'))
                    ->sortable(),
                IconColumn::make('is_primary')
                    ->label(__('product.is_primary'))
                    ->boolean(),
            ])
            ->recordActions([
                EditAction::make(),
                DeleteAction::make(),
            ])
            ->toolbarActions([
                CreateAction::make(),
            ]);
    }
}
