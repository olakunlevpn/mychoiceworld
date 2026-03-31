<?php

namespace App\Filament\Resources\Vendors\Pages;

use App\Filament\Resources\Vendors\VendorResource;
use Filament\Actions\DeleteAction;
use Filament\Actions\ViewAction;
use Filament\Resources\Pages\EditRecord;
use MatanYadaev\EloquentSpatial\Objects\Point;

class EditVendor extends EditRecord
{
    protected static string $resource = VendorResource::class;

    protected function getActions(): array
    {
        return [
            ViewAction::make(),
            DeleteAction::make(),
        ];
    }

    protected function mutateFormDataBeforeFill(array $data): array
    {
        if (isset($data['location']) && $data['location'] instanceof Point) {
            $data['latitude'] = $data['location']->latitude;
            $data['longitude'] = $data['location']->longitude;
        }

        return $data;
    }

    protected function mutateFormDataBeforeSave(array $data): array
    {
        if (! empty($data['latitude']) && ! empty($data['longitude'])) {
            $data['location'] = new Point(
                (float) $data['latitude'],
                (float) $data['longitude'],
            );
        }

        unset($data['latitude'], $data['longitude']);

        return $data;
    }
}
