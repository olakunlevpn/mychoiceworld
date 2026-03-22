<?php

namespace App\Filament\Resources\Vendors\Schemas;

use Filament\Infolists\Components\IconEntry;
use Filament\Infolists\Components\ImageEntry;
use Filament\Infolists\Components\TextEntry;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class VendorInfolist
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->columns(1)->components([
            Grid::make(2)->schema([
                Section::make(__('vendor.store_details'))
                    ->schema([
                        TextEntry::make('store_name')
                            ->label(__('vendor.store_name')),
                        TextEntry::make('slug')
                            ->label(__('vendor.slug')),
                        TextEntry::make('user.name')
                            ->label(__('vendor.owner')),
                        TextEntry::make('description')
                            ->label(__('vendor.description'))
                            ->placeholder(__('vendor.not_published')),
                        ImageEntry::make('logo')
                            ->label(__('vendor.logo')),
                    ]),
                Section::make(__('vendor.status'))
                    ->schema([
                        TextEntry::make('status')
                            ->label(__('vendor.status'))
                            ->badge(),
                        IconEntry::make('is_featured')
                            ->label(__('vendor.is_featured'))
                            ->boolean(),
                        TextEntry::make('rating_avg')
                            ->label(__('vendor.rating_avg'))
                            ->placeholder(__('vendor.not_published')),
                        TextEntry::make('rating_count')
                            ->label(__('vendor.rating_count')),
                        TextEntry::make('approved_at')
                            ->label(__('vendor.approved_at'))
                            ->dateTime()
                            ->placeholder(__('vendor.not_published')),
                    ]),
            ]),

            Grid::make(2)->schema([
                Section::make(__('vendor.contact_info'))
                    ->schema([
                        TextEntry::make('phone')
                            ->label(__('vendor.phone'))
                            ->placeholder(__('vendor.not_published')),
                        TextEntry::make('whatsapp')
                            ->label(__('vendor.whatsapp'))
                            ->placeholder(__('vendor.not_published')),
                        TextEntry::make('email')
                            ->label(__('vendor.email'))
                            ->placeholder(__('vendor.not_published')),
                    ]),
                Section::make(__('vendor.business_license'))
                    ->schema([
                        TextEntry::make('license_number')
                            ->label(__('vendor.license_number'))
                            ->placeholder(__('vendor.not_published')),
                        TextEntry::make('license_document')
                            ->label(__('vendor.license_document'))
                            ->placeholder(__('vendor.not_published')),
                    ]),
            ]),

            Grid::make(2)->schema([
                Section::make(__('vendor.location'))
                    ->schema([
                        TextEntry::make('address')
                            ->label(__('vendor.address')),
                        Grid::make(2)->schema([
                            TextEntry::make('city')
                                ->label(__('vendor.city')),
                            TextEntry::make('state')
                                ->label(__('vendor.state')),
                        ]),
                        Grid::make(2)->schema([
                            TextEntry::make('country')
                                ->label(__('vendor.country')),
                            TextEntry::make('postal_code')
                                ->label(__('vendor.postal_code'))
                                ->placeholder(__('vendor.not_published')),
                        ]),
                    ]),
                Section::make(__('vendor.rejection_reason'))
                    ->schema([
                        TextEntry::make('rejection_reason')
                            ->label(__('vendor.rejection_reason'))
                            ->placeholder(__('vendor.not_published')),
                        TextEntry::make('created_at')
                            ->label(__('vendor.created_at'))
                            ->dateTime(),
                    ])
                    ->visible(fn ($record) => $record->rejection_reason !== null),
            ]),
        ]);
    }
}
