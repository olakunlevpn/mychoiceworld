<?php

namespace App\Filament\Pages;

use App\Filament\Clusters\SettingsCluster;
use App\Settings\GeneralSettings;
use Filament\Forms\Components\TextInput;
use Filament\Forms\Concerns\InteractsWithForms;
use Filament\Forms\Contracts\HasForms;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Grid;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;

class PlatformSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $cluster = SettingsCluster::class;

    protected static ?int $navigationSort = 2;

    protected string $view = 'filament.pages.platform-settings';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-wrench-screwdriver';
    }

    public ?array $data = [];

    public static function getNavigationLabel(): string
    {
        return __('settings.platform');
    }

    public function getTitle(): string
    {
        return __('settings.platform');
    }

    public function getSubheading(): ?string
    {
        return __('settings.platform_description');
    }

    public function mount(): void
    {
        $settings = app(GeneralSettings::class);

        $this->form->fill([
            'default_radius_km' => $settings->default_radius_km,
            'max_radius_km' => $settings->max_radius_km,
            'google_maps_api_key' => $settings->google_maps_api_key,
            'reservation_hold_hours' => $settings->reservation_hold_hours,
            'max_active_reservations' => $settings->max_active_reservations,
            'selfie_retention_minutes' => $settings->selfie_retention_minutes,
            'ai_results_limit' => $settings->ai_results_limit,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Section::make(__('settings.geolocation'))
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('default_radius_km')
                                ->label(__('settings.default_radius'))
                                ->numeric()
                                ->required()
                                ->minValue(1)
                                ->maxValue(100),
                            TextInput::make('max_radius_km')
                                ->label(__('settings.max_radius'))
                                ->numeric()
                                ->required()
                                ->minValue(1)
                                ->maxValue(200),
                        ]),
                        TextInput::make('google_maps_api_key')
                            ->label(__('settings.google_maps_key'))
                            ->password()
                            ->revealable(),
                    ]),

                Section::make(__('settings.reservations'))
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('reservation_hold_hours')
                                ->label(__('settings.reservation_hold'))
                                ->numeric()
                                ->required()
                                ->minValue(1),
                            TextInput::make('max_active_reservations')
                                ->label(__('settings.max_reservations'))
                                ->numeric()
                                ->required()
                                ->minValue(1),
                        ]),
                    ]),

                Section::make(__('settings.ai_config'))
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('selfie_retention_minutes')
                                ->label(__('settings.selfie_retention'))
                                ->numeric()
                                ->required()
                                ->minValue(1),
                            TextInput::make('ai_results_limit')
                                ->label(__('settings.ai_results_limit'))
                                ->numeric()
                                ->required()
                                ->minValue(1),
                        ]),
                    ]),
            ]);
    }

    public function save(): void
    {
        $data = $this->form->getState();
        $settings = app(GeneralSettings::class);

        $settings->default_radius_km = (int) $data['default_radius_km'];
        $settings->max_radius_km = (int) $data['max_radius_km'];
        $settings->google_maps_api_key = $data['google_maps_api_key'];
        $settings->reservation_hold_hours = (int) $data['reservation_hold_hours'];
        $settings->max_active_reservations = (int) $data['max_active_reservations'];
        $settings->selfie_retention_minutes = (int) $data['selfie_retention_minutes'];
        $settings->ai_results_limit = (int) $data['ai_results_limit'];

        $settings->save();

        Notification::make()
            ->title(__('settings.saved'))
            ->success()
            ->send();
    }
}
