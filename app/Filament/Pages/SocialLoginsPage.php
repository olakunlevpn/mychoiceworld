<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\SettingsCluster;
use App\Settings\GeneralSettings;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class SocialLoginsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $cluster = SettingsCluster::class;

    protected static ?int $navigationSort = 4;

    protected string $view = 'filament.pages.general-settings';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-key';
    }

    public ?array $data = [];

    public static function getNavigationLabel(): string
    {
        return __('settings.social_logins');
    }

    public function getTitle(): string
    {
        return __('settings.social_logins');
    }

    public function getSubheading(): ?string
    {
        return __('settings.social_logins_description');
    }

    public function mount(): void
    {
        $settings = app(GeneralSettings::class);

        $this->form->fill([
            'google_login_enabled' => $settings->google_login_enabled,
            'google_client_id' => $settings->google_client_id,
            'google_client_secret' => $settings->google_client_secret,
            'google_redirect_uri' => $settings->google_redirect_uri ?: url('/auth/google/callback'),
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Section::make(__('settings.google_oauth'))
                    ->description(__('settings.google_oauth_description'))
                    ->schema([
                        Toggle::make('google_login_enabled')
                            ->label(__('settings.google_login_enabled')),
                        Grid::make(2)->schema([
                            TextInput::make('google_client_id')
                                ->label(__('settings.google_client_id'))
                                ->maxLength(255),
                            TextInput::make('google_client_secret')
                                ->label(__('settings.google_client_secret'))
                                ->password()
                                ->maxLength(255),
                        ]),
                        TextInput::make('google_redirect_uri')
                            ->label(__('settings.google_redirect_uri'))
                            ->maxLength(500)
                            ->helperText('Default: '.url('/auth/google/callback')),
                    ]),
            ]);
    }

    public function save(): void
    {
        $data = $this->form->getState();
        $settings = app(GeneralSettings::class);

        $settings->google_login_enabled = $data['google_login_enabled'] ?? false;
        $settings->google_client_id = $data['google_client_id'];
        $settings->google_client_secret = $data['google_client_secret'];
        $settings->google_redirect_uri = $data['google_redirect_uri'];

        $settings->save();

        Notification::make()
            ->title(__('settings.saved'))
            ->success()
            ->send();
    }
}
