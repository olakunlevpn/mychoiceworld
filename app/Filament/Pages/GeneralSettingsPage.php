<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\SettingsCluster;
use App\Settings\GeneralSettings;
use Filament\Forms\Components\FileUpload;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Components\Toggle;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class GeneralSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $cluster = SettingsCluster::class;

    protected static ?int $navigationSort = 1;

    protected string $view = 'filament.pages.general-settings';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-building-storefront';
    }

    public ?array $data = [];

    public static function getNavigationLabel(): string
    {
        return __('settings.general');
    }

    public function getTitle(): string
    {
        return __('settings.general');
    }

    public function getSubheading(): ?string
    {
        return __('settings.general_description');
    }

    public function mount(): void
    {
        $settings = app(GeneralSettings::class);

        $this->form->fill([
            'site_name' => $settings->site_name,
            'site_description' => $settings->site_description,
            'support_email' => $settings->support_email,
            'logo_path' => $settings->logo_path,
            'logo_desktop_dark' => $settings->logo_desktop_dark,
            'logo_desktop_light' => $settings->logo_desktop_light,
            'logo_mobile_dark' => $settings->logo_mobile_dark,
            'logo_mobile_light' => $settings->logo_mobile_light,
            'favicon_path' => $settings->favicon_path,
            'currency_code' => $settings->currency_code,
            'currency_symbol' => $settings->currency_symbol,
            'default_country' => $settings->default_country,
            'customer_registration_enabled' => $settings->customer_registration_enabled,
            'vendor_registration_enabled' => $settings->vendor_registration_enabled,
            'ai_requires_account' => $settings->ai_requires_account,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Section::make(__('settings.branding'))
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('site_name')
                                ->label(__('settings.site_name'))
                                ->required()
                                ->maxLength(255),
                            TextInput::make('support_email')
                                ->label(__('settings.support_email'))
                                ->email()
                                ->required(),
                        ]),
                        TextInput::make('site_description')
                            ->label(__('settings.site_description'))
                            ->maxLength(500),
                        Grid::make(2)->schema([
                            FileUpload::make('logo_desktop_dark')
                                ->label(__('settings.logo_desktop_dark'))
                                ->image()
                                ->disk('public')
                                ->directory('branding')
                                ->visibility('public'),
                            FileUpload::make('logo_desktop_light')
                                ->label(__('settings.logo_desktop_light'))
                                ->image()
                                ->disk('public')
                                ->directory('branding')
                                ->visibility('public'),
                            FileUpload::make('logo_mobile_dark')
                                ->label(__('settings.logo_mobile_dark'))
                                ->image()
                                ->disk('public')
                                ->directory('branding')
                                ->visibility('public'),
                            FileUpload::make('logo_mobile_light')
                                ->label(__('settings.logo_mobile_light'))
                                ->image()
                                ->disk('public')
                                ->directory('branding')
                                ->visibility('public'),
                            FileUpload::make('favicon_path')
                                ->label(__('settings.favicon'))
                                ->image()
                                ->disk('public')
                                ->directory('branding')
                                ->visibility('public'),
                        ]),
                    ]),

                Section::make(__('settings.currency_locale'))
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('currency_code')
                                ->label(__('settings.currency_code'))
                                ->required()
                                ->maxLength(3),
                            TextInput::make('currency_symbol')
                                ->label(__('settings.currency_symbol'))
                                ->required()
                                ->maxLength(5),
                            TextInput::make('default_country')
                                ->label(__('settings.default_country'))
                                ->required()
                                ->maxLength(100),
                        ]),
                    ]),

                Section::make(__('settings.registration'))
                    ->schema([
                        Toggle::make('customer_registration_enabled')
                            ->label(__('settings.customer_registration')),
                        Toggle::make('vendor_registration_enabled')
                            ->label(__('settings.vendor_registration')),
                        Toggle::make('ai_requires_account')
                            ->label(__('settings.ai_requires_account')),
                    ]),
            ]);
    }

    public function save(): void
    {
        $data = $this->form->getState();
        $settings = app(GeneralSettings::class);

        $settings->site_name = $data['site_name'];
        $settings->site_description = $data['site_description'] ?? '';
        $settings->support_email = $data['support_email'];
        $settings->logo_path = $data['logo_desktop_dark'] ?? $data['logo_path'];
        $settings->logo_desktop_dark = $data['logo_desktop_dark'];
        $settings->logo_desktop_light = $data['logo_desktop_light'];
        $settings->logo_mobile_dark = $data['logo_mobile_dark'];
        $settings->logo_mobile_light = $data['logo_mobile_light'];
        $settings->favicon_path = $data['favicon_path'];
        $settings->currency_code = $data['currency_code'];
        $settings->currency_symbol = $data['currency_symbol'];
        $settings->default_country = $data['default_country'];
        $settings->customer_registration_enabled = $data['customer_registration_enabled'] ?? false;
        $settings->vendor_registration_enabled = $data['vendor_registration_enabled'] ?? false;
        $settings->ai_requires_account = $data['ai_requires_account'] ?? false;

        $settings->save();

        Notification::make()
            ->title(__('settings.saved'))
            ->success()
            ->send();
    }
}
