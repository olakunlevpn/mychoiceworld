<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class SettingsCluster extends Cluster
{
    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-cog-6-tooth';
    }

    public static function getNavigationGroup(): ?string
    {
        return __('admin.settings');
    }

    public static function getNavigationLabel(): string
    {
        return __('settings.title');
    }

    public static function getClusterBreadcrumb(): ?string
    {
        return __('settings.title');
    }
}
