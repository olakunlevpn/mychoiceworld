<?php

namespace App\Filament\Clusters;

use Filament\Clusters\Cluster;

class AccountCluster extends Cluster
{
    protected static bool $shouldRegisterNavigation = false;

    public static function getNavigationIcon(): string|\BackedEnum|null
    {
        return 'heroicon-o-user-circle';
    }

    public static function getNavigationLabel(): string
    {
        return __('admin.account');
    }

    public static function getClusterBreadcrumb(): ?string
    {
        return __('admin.account');
    }
}
