<?php

namespace App\Filament\Pages;

use App\Settings\GeneralSettings;
use Filament\Pages\Dashboard as BaseDashboard;

class Dashboard extends BaseDashboard
{
    public function getSubheading(): ?string
    {
        $siteName = rescue(fn () => app(GeneralSettings::class)->site_name, 'MyChoiceMyWorld');

        return __('admin.dashboard_tagline', ['name' => $siteName]);
    }
}
