<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.google_client_id', null);
        $this->migrator->add('general.google_client_secret', null);
        $this->migrator->add('general.google_redirect_uri', null);
        $this->migrator->add('general.google_login_enabled', false);
    }
};
