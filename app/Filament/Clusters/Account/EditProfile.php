<?php

namespace App\Filament\Clusters\Account;

use App\Filament\Clusters\AccountCluster;
use Filament\Forms\Components\TextInput;
use Filament\Notifications\Notification;
use Filament\Pages\Page;
use Filament\Schemas\Components\Section;
use Filament\Schemas\Schema;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Validation\Rules\Password;

class EditProfile extends Page
{
    protected static ?string $cluster = AccountCluster::class;

    protected string $view = 'filament.clusters.account.edit-profile';

    protected static ?int $navigationSort = 1;

    public ?array $profileData = [];

    public ?array $passwordData = [];

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-user';
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.edit_profile');
    }

    public function getTitle(): string
    {
        return __('admin.edit_profile');
    }

    public function mount(): void
    {
        $user = Auth::user();

        $this->profileForm->fill([
            'name' => $user->name,
            'email' => $user->email,
        ]);

        $this->passwordForm->fill();
    }

    public function profileForm(Schema $schema): Schema
    {
        return $schema
            ->statePath('profileData')
            ->components([
                Section::make(__('admin.profile_information'))
                    ->description(__('admin.profile_information_description'))
                    ->schema([
                        TextInput::make('name')
                            ->label(__('admin.name'))
                            ->required()
                            ->maxLength(255),
                        TextInput::make('email')
                            ->label(__('admin.email'))
                            ->email()
                            ->required()
                            ->maxLength(255)
                            ->unique('users', 'email', ignorable: Auth::user()),
                    ]),
            ]);
    }

    public function passwordForm(Schema $schema): Schema
    {
        return $schema
            ->statePath('passwordData')
            ->components([
                Section::make(__('admin.update_password'))
                    ->description(__('admin.update_password_description'))
                    ->schema([
                        TextInput::make('current_password')
                            ->label(__('admin.current_password'))
                            ->password()
                            ->required()
                            ->currentPassword(),
                        TextInput::make('password')
                            ->label(__('admin.new_password'))
                            ->password()
                            ->required()
                            ->rule(Password::defaults())
                            ->confirmed(),
                        TextInput::make('password_confirmation')
                            ->label(__('admin.confirm_password'))
                            ->password()
                            ->required(),
                    ]),
            ]);
    }

    public function updateProfile(): void
    {
        $data = $this->profileForm->getState();

        $user = Auth::user();
        $user->update($data);

        if ($user->wasChanged('email')) {
            $user->email_verified_at = null;
            $user->save();
            $user->sendEmailVerificationNotification();
        }

        Notification::make()
            ->title(__('admin.profile_updated'))
            ->success()
            ->send();
    }

    public function updatePassword(): void
    {
        $data = $this->passwordForm->getState();

        Auth::user()->forceFill([
            'password' => Hash::make($data['password']),
        ])->save();

        $this->passwordForm->fill();

        Notification::make()
            ->title(__('admin.password_updated'))
            ->success()
            ->send();
    }

    /**
     * @return array<string, Schema>
     */
    protected function getForms(): array
    {
        return [
            'profileForm',
            'passwordForm',
        ];
    }
}
