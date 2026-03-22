<?php

namespace App\Filament\Resources\NewsletterSubscribers\Schemas;

use Filament\Forms\Components\DateTimePicker;
use Filament\Forms\Components\TextInput;
use Filament\Schemas\Schema;
use Filament\Support\Enums\Operation;

class NewsletterSubscriberForm
{
    public static function configure(Schema $schema): Schema
    {
        return $schema
            ->columns(2)
            ->components([
                TextInput::make('email')
                    ->label(__('newsletter_subscriber.email'))
                    ->email()
                    ->required()
                    ->disabledOn(Operation::Edit),
                DateTimePicker::make('subscribed_at')
                    ->label(__('newsletter_subscriber.subscribed_at'))
                    ->nullable(),
                DateTimePicker::make('unsubscribed_at')
                    ->label(__('newsletter_subscriber.unsubscribed_at'))
                    ->nullable(),
            ]);
    }
}
