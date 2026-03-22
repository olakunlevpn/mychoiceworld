<?php

namespace App\Filament\Resources\Users\Schemas;

use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Filament\Support\Enums\Operation;

class UserForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema->components([
            Section::make(__('user.details'))
                ->schema([
                    TextInput::make('name')
                        ->label(__('user.name'))
                        ->required(),
                    TextInput::make('email')
                        ->label(__('user.email'))
                        ->email()
                        ->required()
                        ->unique(ignoreRecord: true),
                    TextInput::make('phone')
                        ->label(__('user.phone'))
                        ->tel()
                        ->nullable(),
                    TextInput::make('password')
                        ->label(__('user.password'))
                        ->password()
                        ->revealable()
                        ->required()
                        ->visibleOn(Operation::Create),
                    Toggle::make('is_active')
                        ->label(__('user.is_active'))
                        ->default(true),
                ]),
            Section::make(__('user.password_section'))
                ->description(__('user.password_section_description'))
                ->schema([
                    TextInput::make('new_password')
                        ->label(__('user.new_password'))
                        ->password()
                        ->revealable()
                        ->minLength(8)
                        ->confirmed(),
                    TextInput::make('new_password_confirmation')
                        ->label(__('user.password_confirmation'))
                        ->password()
                        ->revealable(),
                ])
                ->visibleOn(Operation::Edit),
        ]);
    }
}
