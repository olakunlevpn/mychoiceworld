<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.site_name', 'Fashion Marketplace');
        $this->migrator->add('general.site_description', 'Discover fashion near you');
        $this->migrator->add('general.support_email', 'support@example.com');
        $this->migrator->add('general.logo_path', null);
        $this->migrator->add('general.favicon_path', null);
        $this->migrator->add('general.currency_code', 'USD');
        $this->migrator->add('general.currency_symbol', '$');
        $this->migrator->add('general.default_country', 'US');
        $this->migrator->add('general.default_radius_km', 10);
        $this->migrator->add('general.max_radius_km', 50);
        $this->migrator->add('general.google_maps_api_key', null);
        $this->migrator->add('general.reservation_hold_hours', 24);
        $this->migrator->add('general.max_active_reservations', 5);
        $this->migrator->add('general.ai_service_url', null);
        $this->migrator->add('general.selfie_retention_minutes', 60);
        $this->migrator->add('general.ai_results_limit', 20);
        $this->migrator->add('general.customer_registration_enabled', true);
        $this->migrator->add('general.vendor_registration_enabled', true);
        $this->migrator->add('general.ai_requires_account', false);
    }
};
