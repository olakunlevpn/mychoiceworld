<?php

namespace Database\Seeders;

use App\Settings\GeneralSettings;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\File;
use Illuminate\Support\Facades\Storage;

class BrandingSeeder extends Seeder
{
    public function run(): void
    {
        $logos = [
            'logo-desktop-dark.png' => 'branding/logo-desktop-dark.png',
            'logo-desktop-light.png' => 'branding/logo-desktop-light.png',
            'logo-mobile-dark.png' => 'branding/logo-mobile-dark.png',
            'logo-mobile-light.png' => 'branding/logo-mobile-light.png',
            'favicon.svg' => 'branding/favicon.svg',
        ];

        $sourceDir = public_path('../ui/public');

        foreach ($logos as $filename => $storagePath) {
            $sourcePath = $sourceDir.'/'.$filename;

            if (File::exists($sourcePath) && ! Storage::disk('public')->exists($storagePath)) {
                Storage::disk('public')->put($storagePath, File::get($sourcePath));
            }
        }

        $settings = app(GeneralSettings::class);

        if (! $settings->logo_desktop_dark) {
            $settings->logo_desktop_dark = 'branding/logo-desktop-dark.png';
            $settings->logo_desktop_light = 'branding/logo-desktop-light.png';
            $settings->logo_mobile_dark = 'branding/logo-mobile-dark.png';
            $settings->logo_mobile_light = 'branding/logo-mobile-light.png';
            $settings->logo_path = 'branding/logo-desktop-dark.png';
            $settings->favicon_path = 'branding/favicon.svg';
            $settings->site_name = 'MyChoiceMyWorld';
            $settings->site_description = 'Discover fashion near you — browse local boutiques, reserve outfits, and try before you buy.';
            $settings->save();
        }
    }
}
