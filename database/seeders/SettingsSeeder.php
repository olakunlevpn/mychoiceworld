<?php

namespace Database\Seeders;

use App\Settings\GeneralSettings;
use Illuminate\Database\Seeder;

class SettingsSeeder extends Seeder
{
    public function run(): void
    {
        $settings = app(GeneralSettings::class);

        // Only seed defaults if currency hasn't been configured yet
        if ($settings->currency_code === 'USD') {
            $settings->currency_code = 'INR';
            $settings->currency_symbol = '₹';
            $settings->default_country = 'IN';
        }

        if ($settings->site_name === 'Fashion Marketplace') {
            $settings->site_name = 'MyChoiceMyWorld';
            $settings->site_description = 'Discover fashion near you — browse local boutiques, reserve outfits, and try before you buy.';
        }

        if (! $settings->contact_address) {
            $settings->contact_address = '123 Commerce Street, Business District, New York, NY 10001';
            $settings->contact_phone = '+1 (555) 123-4567';
            $settings->contact_email = 'support@mychoicemyworld.in';
        }

        $settings->save();
    }
}
