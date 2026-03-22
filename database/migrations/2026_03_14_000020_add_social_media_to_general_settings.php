<?php

use Spatie\LaravelSettings\Migrations\SettingsMigration;

return new class extends SettingsMigration
{
    public function up(): void
    {
        $this->migrator->add('general.social_facebook', null);
        $this->migrator->add('general.social_instagram', null);
        $this->migrator->add('general.social_twitter', null);
        $this->migrator->add('general.social_tiktok', null);
        $this->migrator->add('general.social_youtube', null);
        $this->migrator->add('general.social_linkedin', null);
        $this->migrator->add('general.social_whatsapp', null);
        $this->migrator->add('general.social_telegram', null);
    }
};
