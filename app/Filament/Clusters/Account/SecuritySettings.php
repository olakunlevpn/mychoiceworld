<?php

namespace App\Filament\Clusters\Account;

use App\Filament\Clusters\AccountCluster;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Str;
use PragmaRX\Google2FAQRCode\Google2FA;

class SecuritySettings extends Page
{
    protected static ?string $cluster = AccountCluster::class;

    protected string $view = 'filament.clusters.account.security-settings';

    protected static ?int $navigationSort = 2;

    public ?array $twoFactorData = [];

    public ?string $qrCodeSvg = null;

    public ?string $setupSecret = null;

    public bool $showingRecoveryCodes = false;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-shield-check';
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.security');
    }

    public function getTitle(): string
    {
        return __('admin.security');
    }

    public function mount(): void
    {
        $this->twoFactorForm->fill();
    }

    public function twoFactorForm(Schema $schema): Schema
    {
        return $schema
            ->statePath('twoFactorData')
            ->components([
                Section::make(__('admin.two_factor_authentication'))
                    ->description(__('admin.two_factor_description'))
                    ->schema([
                        TextInput::make('code')
                            ->label(__('admin.verification_code'))
                            ->required()
                            ->numeric()
                            ->minLength(6)
                            ->maxLength(6),
                    ]),
            ]);
    }

    public function enableTwoFactor(): void
    {
        $google2fa = new Google2FA;
        $secret = $google2fa->generateSecretKey();

        $user = Auth::user();

        $this->setupSecret = $secret;
        $this->qrCodeSvg = $google2fa->getQRCodeInline(
            config('app.name'),
            $user->email,
            $secret,
        );

        $user->update([
            'two_factor_secret' => $secret,
            'two_factor_recovery_codes' => $this->generateRecoveryCodes(),
        ]);
    }

    public function confirmTwoFactor(): void
    {
        $data = $this->twoFactorForm->getState();

        $google2fa = new Google2FA;
        $user = Auth::user();

        $valid = $google2fa->verifyKey($user->two_factor_secret, $data['code']);

        if (! $valid) {
            Notification::make()
                ->title(__('admin.invalid_2fa_code'))
                ->danger()
                ->send();

            return;
        }

        $user->update([
            'two_factor_confirmed_at' => now(),
        ]);

        $this->setupSecret = null;
        $this->qrCodeSvg = null;
        $this->showingRecoveryCodes = true;

        $this->twoFactorForm->fill();

        Notification::make()
            ->title(__('admin.two_factor_enabled'))
            ->success()
            ->send();
    }

    public function disableTwoFactor(): void
    {
        Auth::user()->update([
            'two_factor_secret' => null,
            'two_factor_recovery_codes' => null,
            'two_factor_confirmed_at' => null,
        ]);

        $this->setupSecret = null;
        $this->qrCodeSvg = null;
        $this->showingRecoveryCodes = false;

        Notification::make()
            ->title(__('admin.two_factor_disabled'))
            ->success()
            ->send();
    }

    public function regenerateRecoveryCodes(): void
    {
        Auth::user()->update([
            'two_factor_recovery_codes' => $this->generateRecoveryCodes(),
        ]);

        $this->showingRecoveryCodes = true;

        Notification::make()
            ->title(__('admin.recovery_codes_regenerated'))
            ->success()
            ->send();
    }

    public function showRecoveryCodes(): void
    {
        $this->showingRecoveryCodes = ! $this->showingRecoveryCodes;
    }

    /**
     * @return array<int, string>
     */
    protected function generateRecoveryCodes(): array
    {
        return collect(range(1, 8))
            ->map(fn () => Str::random(10).'-'.Str::random(10))
            ->toArray();
    }

    /**
     * @return array<string, Schema>
     */
    protected function getForms(): array
    {
        return [
            'twoFactorForm',
        ];
    }
}
