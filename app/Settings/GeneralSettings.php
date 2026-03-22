<?php

namespace App\Settings;

use Spatie\LaravelSettings\Settings;

class GeneralSettings extends Settings
{
    public string $site_name;

    public string $site_description;

    public string $support_email;

    public ?string $logo_path;

    public ?string $favicon_path;

    public string $currency_code;

    public string $currency_symbol;

    public string $default_country;

    public int $default_radius_km;

    public int $max_radius_km;

    public ?string $google_maps_api_key;

    public int $reservation_hold_hours;

    public int $max_active_reservations;

    public int $selfie_retention_minutes;

    public int $ai_results_limit;

    public bool $customer_registration_enabled;

    public bool $vendor_registration_enabled;

    public bool $ai_requires_account;

    // Social media
    public ?string $social_facebook;

    public ?string $social_instagram;

    public ?string $social_twitter;

    public ?string $social_tiktok;

    public ?string $social_youtube;

    public ?string $social_linkedin;

    public ?string $social_whatsapp;

    public ?string $social_telegram;

    public static function group(): string
    {
        return 'general';
    }
}
