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

class SocialMediaSettingsPage extends Page implements HasForms
{
    use InteractsWithForms;

    protected static ?string $cluster = SettingsCluster::class;

    protected static ?int $navigationSort = 3;

    protected string $view = 'filament.pages.social-media-settings';

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-share';
    }

    public ?array $data = [];

    public static function getNavigationLabel(): string
    {
        return __('settings.social_media');
    }

    public function getTitle(): string
    {
        return __('settings.social_media');
    }

    public function getSubheading(): ?string
    {
        return __('settings.social_media_description');
    }

    public function mount(): void
    {
        $settings = app(GeneralSettings::class);

        $this->form->fill([
            'social_facebook' => $settings->social_facebook,
            'social_instagram' => $settings->social_instagram,
            'social_twitter' => $settings->social_twitter,
            'social_tiktok' => $settings->social_tiktok,
            'social_youtube' => $settings->social_youtube,
            'social_linkedin' => $settings->social_linkedin,
            'social_whatsapp' => $settings->social_whatsapp,
            'social_telegram' => $settings->social_telegram,
        ]);
    }

    public function form(Schema $schema): Schema
    {
        return $schema
            ->statePath('data')
            ->components([
                Section::make(__('settings.social_media'))
                    ->schema([
                        Grid::make(2)->schema([
                            TextInput::make('social_facebook')
                                ->label(__('settings.social_facebook'))
                                ->url()
                                ->maxLength(500),
                            TextInput::make('social_instagram')
                                ->label(__('settings.social_instagram'))
                                ->url()
                                ->maxLength(500),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('social_twitter')
                                ->label(__('settings.social_twitter'))
                                ->url()
                                ->maxLength(500),
                            TextInput::make('social_tiktok')
                                ->label(__('settings.social_tiktok'))
                                ->url()
                                ->maxLength(500),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('social_youtube')
                                ->label(__('settings.social_youtube'))
                                ->url()
                                ->maxLength(500),
                            TextInput::make('social_linkedin')
                                ->label(__('settings.social_linkedin'))
                                ->url()
                                ->maxLength(500),
                        ]),
                        Grid::make(2)->schema([
                            TextInput::make('social_whatsapp')
                                ->label(__('settings.social_whatsapp'))
                                ->maxLength(20),
                            TextInput::make('social_telegram')
                                ->label(__('settings.social_telegram'))
                                ->url()
                                ->maxLength(500),
                        ]),
                    ]),
            ]);
    }

    public function save(): void
    {
        $data = $this->form->getState();
        $settings = app(GeneralSettings::class);

        $settings->social_facebook = $data['social_facebook'];
        $settings->social_instagram = $data['social_instagram'];
        $settings->social_twitter = $data['social_twitter'];
        $settings->social_tiktok = $data['social_tiktok'];
        $settings->social_youtube = $data['social_youtube'];
        $settings->social_linkedin = $data['social_linkedin'];
        $settings->social_whatsapp = $data['social_whatsapp'];
        $settings->social_telegram = $data['social_telegram'];

        $settings->save();

        Notification::make()
            ->title(__('settings.saved'))
            ->success()
            ->send();
    }
}
