<?php

namespace App\Providers\Filament;

use App\Filament\Auth\TwoFactorAuthentication;
use App\Filament\Clusters\Account\EditProfile;
use App\Filament\Clusters\Account\SecuritySettings;
use App\Filament\Pages\Dashboard;
use App\Settings\GeneralSettings;
use Filament\Actions\Action;
use Filament\Enums\ThemeMode;
use Filament\Http\Middleware\Authenticate;
use Filament\Http\Middleware\AuthenticateSession;
use Filament\Http\Middleware\DisableBladeIconComponents;
use Filament\Http\Middleware\DispatchServingFilamentEvent;
use Filament\Panel;
use Filament\PanelProvider;
use Filament\Support\Colors\Color;
use Filament\View\PanelsRenderHook;
use Illuminate\Cookie\Middleware\AddQueuedCookiesToResponse;
use Illuminate\Cookie\Middleware\EncryptCookies;
use Illuminate\Foundation\Http\Middleware\VerifyCsrfToken;
use Illuminate\Routing\Middleware\SubstituteBindings;
use Illuminate\Session\Middleware\StartSession;
use Illuminate\Support\HtmlString;
use Illuminate\View\Middleware\ShareErrorsFromSession;

class AdminPanelProvider extends PanelProvider
{
    public function panel(Panel $panel): Panel
    {
        return $panel
            ->default()
            ->id('admin')
            ->path('admin')
            ->login()
            ->multiFactorAuthentication([
                TwoFactorAuthentication::make()->recoverable(),
            ])
            ->brandName(fn () => rescue(fn () => app(GeneralSettings::class)->site_name.' Admin', 'Admin'))
            ->defaultThemeMode(ThemeMode::Dark)
            ->colors([
                'primary' => [
                    50 => '#edfafa',
                    100 => '#d1f1f2',
                    200 => '#aae4e7',
                    300 => '#75d1d6',
                    400 => '#46b2ba',
                    500 => '#2b969e',
                    600 => '#14878E',
                    700 => '#1b646c',
                    800 => '#1a5157',
                    900 => '#19444a',
                    950 => '#0d2d31',
                ],
                'danger' => Color::Red,
                'warning' => Color::Amber,
                'success' => Color::Emerald,
                'info' => Color::Sky,
            ])
            ->renderHook(
                PanelsRenderHook::HEAD_END,
                fn (): HtmlString => new HtmlString('
                    <style>
                        .fi-sidebar, .fi-topbar { background-color: white !important; }
                        .dark .fi-sidebar, .dark .fi-topbar { background-color: rgb(17 24 39) !important; }
                    </style>
                '),
            )
            ->spa()
            ->unsavedChangesAlerts()
            ->databaseTransactions()
            ->discoverResources(in: app_path('Filament/Resources'), for: 'App\\Filament\\Resources')
            ->discoverPages(in: app_path('Filament/Pages'), for: 'App\\Filament\\Pages')
            ->pages([
                Dashboard::class,
            ])
            ->discoverClusters(in: app_path('Filament/Clusters'), for: 'App\\Filament\\Clusters')
            ->userMenuItems([
                'profile' => fn (Action $action) => $action
                    ->label(__('admin.edit_profile'))
                    ->url(fn (): string => EditProfile::getUrl())
                    ->icon('heroicon-o-user'),
                Action::make('security')
                    ->label(__('admin.security'))
                    ->url(fn (): string => SecuritySettings::getUrl())
                    ->icon('heroicon-o-shield-check'),
            ])
            ->discoverWidgets(in: app_path('Filament/Widgets'), for: 'App\\Filament\\Widgets')
            ->navigationGroups([
                __('admin.operations'),
                __('admin.catalog'),
                __('admin.ai_config'),
                __('admin.settings'),
            ])
            ->middleware([
                EncryptCookies::class,
                AddQueuedCookiesToResponse::class,
                StartSession::class,
                AuthenticateSession::class,
                ShareErrorsFromSession::class,
                VerifyCsrfToken::class,
                SubstituteBindings::class,
                DisableBladeIconComponents::class,
                DispatchServingFilamentEvent::class,
            ])
            ->authMiddleware([
                Authenticate::class,
            ]);
    }
}
