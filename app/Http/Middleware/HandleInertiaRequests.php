<?php

namespace App\Http\Middleware;

use App\Models\Page;
use App\Settings\GeneralSettings;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Inertia\Middleware;

class HandleInertiaRequests extends Middleware
{
    protected $rootView = 'app';

    public function version(Request $request): ?string
    {
        return parent::version($request);
    }

    /**
     * @return array<string, mixed>
     */
    public function share(Request $request): array
    {
        $user = $request->user();
        $settings = app(GeneralSettings::class);

        return [
            ...parent::share($request),
            'auth' => fn () => [
                'user' => $user ? [
                    'id' => $user->id,
                    'name' => $user->name,
                    'email' => $user->email,
                    'phone' => $user->phone,
                    'role' => $user->role->value,
                    'avatar' => $user->avatar,
                    'address' => $user->address,
                    'city' => $user->city,
                    'state' => $user->state,
                    'country' => $user->country,
                    'notification_prefs' => $user->notification_prefs,
                    'email_verified_at' => $user->email_verified_at?->toISOString(),
                ] : null,
                'vendor' => $user?->vendor ? [
                    'id' => $user->vendor->id,
                    'store_name' => $user->vendor->store_name,
                    'slug' => $user->vendor->slug,
                    'status' => $user->vendor->status->value,
                    'logo' => $user->vendor->logo,
                ] : null,
                'unread_notifications_count' => $user ? $user->unreadNotifications()->count() : 0,
            ],
            'settings' => fn () => [
                'site_name' => $settings->site_name,
                'site_description' => $settings->site_description,
                'support_email' => $settings->support_email,
                'logo_path' => $this->resolveStorageUrl($settings->logo_path),
                'favicon_path' => $this->resolveStorageUrl($settings->favicon_path),
                'currency_code' => $settings->currency_code,
                'currency_symbol' => $settings->currency_symbol,
                'default_country' => $settings->default_country,
                'default_radius_km' => $settings->default_radius_km,
                'max_radius_km' => $settings->max_radius_km,
                'reservation_hold_hours' => $settings->reservation_hold_hours,
                'customer_registration_enabled' => $settings->customer_registration_enabled,
                'vendor_registration_enabled' => $settings->vendor_registration_enabled,
                'social_facebook' => $settings->social_facebook,
                'social_instagram' => $settings->social_instagram,
                'social_twitter' => $settings->social_twitter,
                'social_tiktok' => $settings->social_tiktok,
                'social_youtube' => $settings->social_youtube,
                'social_linkedin' => $settings->social_linkedin,
                'social_whatsapp' => $settings->social_whatsapp,
                'social_telegram' => $settings->social_telegram,
            ],
            'footerPages' => fn () => Page::footerPages()->get(['title', 'slug']),
            'flash' => [
                'success' => fn () => $request->session()->get('success'),
                'error' => fn () => $request->session()->get('error'),
            ],
        ];
    }

    private function resolveStorageUrl(?string $path): ?string
    {
        if (! $path) {
            return null;
        }

        if (str_starts_with($path, '/') || str_starts_with($path, 'http')) {
            return $path;
        }

        return Storage::disk('public')->url($path);
    }
}
