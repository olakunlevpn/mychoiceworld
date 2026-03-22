<?php

namespace App\Filament\Resources\Vendors\Schemas;

use App\Enums\VendorStatus;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\Select;
use Filament\Forms\Components\Textarea;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Tabs;
use Filament\Schemas\Components\Tabs\Tab;
use Filament\Schemas\Schema;
use Filament\Support\Icons\Heroicon;

class VendorForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Tabs::make('Vendor')
                ->schema([
                    Tab::make(__('vendor.store_details'))
                        ->icon(Heroicon::BuildingStorefront)
                        ->schema([
                            TextInput::make('store_name')
                                ->label(__('vendor.store_name'))
                                ->required()
                                ->maxLength(255),
                            TextInput::make('slug')
                                ->label(__('vendor.slug'))
                                ->required()
                                ->unique(ignoreRecord: true),
                            Textarea::make('description')
                                ->label(__('vendor.description'))
                                ->rows(3)
                                ->columnSpanFull(),
                            FileUpload::make('logo')
                                ->label(__('vendor.logo'))
                                ->image()
                                ->directory('vendors/logos')
                                ->nullable(),
                            FileUpload::make('banner')
                                ->label(__('vendor.banner'))
                                ->image()
                                ->directory('vendors/banners')
                                ->nullable(),
                        ])
                        ->columns(2),

                    Tab::make(__('vendor.contact_info'))
                        ->icon(Heroicon::Phone)
                        ->schema([
                            TextInput::make('phone')
                                ->label(__('vendor.phone'))
                                ->tel(),
                            TextInput::make('whatsapp')
                                ->label(__('vendor.whatsapp'))
                                ->tel(),
                            TextInput::make('email')
                                ->label(__('vendor.email'))
                                ->email(),
                        ])
                        ->columns(2),

                    Tab::make(__('vendor.location'))
                        ->icon(Heroicon::MapPin)
                        ->schema([
                            TextInput::make('address')
                                ->label(__('vendor.address'))
                                ->required()
                                ->columnSpanFull(),
                            TextInput::make('city')
                                ->label(__('vendor.city'))
                                ->required(),
                            TextInput::make('state')
                                ->label(__('vendor.state'))
                                ->required(),
                            TextInput::make('country')
                                ->label(__('vendor.country'))
                                ->required(),
                            TextInput::make('postal_code')
                                ->label(__('vendor.postal_code')),
                        ])
                        ->columns(2),

                    Tab::make(__('vendor.business_license'))
                        ->icon(Heroicon::DocumentText)
                        ->schema([
                            TextInput::make('license_number')
                                ->label(__('vendor.license_number')),
                            FileUpload::make('license_document')
                                ->label(__('vendor.license_document'))
                                ->directory('vendors/licenses')
                                ->acceptedFileTypes(['image/*', 'application/pdf']),
                        ])
                        ->columns(2),

                    Tab::make(__('vendor.status'))
                        ->icon(Heroicon::ShieldCheck)
                        ->schema([
                            Select::make('status')
                                ->label(__('vendor.status'))
                                ->options(VendorStatus::class)
                                ->required(),
                            Toggle::make('is_featured')
                                ->label(__('vendor.is_featured')),
                            Textarea::make('rejection_reason')
                                ->label(__('vendor.rejection_reason'))
                                ->visible(fn ($get) => $get('status') === 'rejected')
                                ->columnSpanFull(),
                        ])
                        ->columns(2),
                ])
                ->columnSpanFull(),
        ]);
    }
}
