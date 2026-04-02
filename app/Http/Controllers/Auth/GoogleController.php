<?php

namespace App\Http\Controllers\Auth;

use App\Enums\UserRole;
use App\Http\Controllers\Controller;
use App\Models\User;
use App\Settings\GeneralSettings;
use Illuminate\Http\RedirectResponse;
use Illuminate\Support\Facades\Auth;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;
use Laravel\Socialite\Facades\Socialite;

class GoogleController extends Controller
{
    public function redirect(): RedirectResponse
    {
        $settings = app(GeneralSettings::class);

        if (! $settings->google_login_enabled || ! $settings->google_client_id) {
            return redirect()->route('login')->with('error', 'Google sign-in is not available.');
        }

        config([
            'services.google.client_id' => $settings->google_client_id,
            'services.google.client_secret' => $settings->google_client_secret,
            'services.google.redirect' => $settings->google_redirect_uri,
        ]);

        return Socialite::driver('google')->redirect();
    }

    public function callback(): RedirectResponse
    {
        $settings = app(GeneralSettings::class);

        config([
            'services.google.client_id' => $settings->google_client_id,
            'services.google.client_secret' => $settings->google_client_secret,
            'services.google.redirect' => $settings->google_redirect_uri,
        ]);

        try {
            $googleUser = Socialite::driver('google')->user();
        } catch (\Exception $e) {
            return redirect()->route('login')->with('error', 'Google sign-in failed. Please try again.');
        }

        $user = User::where('google_id', $googleUser->getId())->first();

        if (! $user) {
            $user = User::where('email', $googleUser->getEmail())->first();

            if ($user) {
                $user->update([
                    'google_id' => $googleUser->getId(),
                    'avatar' => $user->avatar ?: $googleUser->getAvatar(),
                ]);
            } else {
                $user = User::forceCreate([
                    'name' => $googleUser->getName(),
                    'email' => $googleUser->getEmail(),
                    'google_id' => $googleUser->getId(),
                    'avatar' => $googleUser->getAvatar(),
                    'password' => Hash::make(Str::random(24)),
                    'role' => UserRole::Customer,
                    'is_active' => true,
                    'email_verified_at' => now(),
                ]);
            }
        }

        if (! $user->is_active) {
            return redirect()->route('login')->with('error', 'Your account has been suspended.');
        }

        Auth::login($user, true);

        return match ($user->role) {
            UserRole::Admin => redirect('/admin'),
            UserRole::Vendor => redirect('/vendor/dashboard'),
            default => redirect('/customer/dashboard'),
        };
    }
}
