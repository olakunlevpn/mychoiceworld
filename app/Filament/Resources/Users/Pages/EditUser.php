<?php

namespace App\Filament\Resources\Users\Pages;

use App\Filament\Resources\Users\UserResource;
use Filament\Resources\Pages\EditRecord;
use Illuminate\Support\Facades\Hash;

class EditUser extends EditRecord
{
    protected static string $resource = UserResource::class;

    public static function getNavigationLabel(): string
    {
        return __('admin.edit');
    }

    /**
     * @param  array<string, mixed>  $data
     * @return array<string, mixed>
     */
    protected function mutateFormDataBeforeSave(array $data): array
    {
        $forceFields = [];

        if (filled($data['new_password'] ?? null)) {
            $forceFields['password'] = Hash::make($data['new_password']);
        }

        if (array_key_exists('is_active', $data)) {
            $forceFields['is_active'] = $data['is_active'];
        }

        if ($forceFields) {
            $this->record->forceFill($forceFields)->save();
        }

        unset($data['new_password'], $data['new_password_confirmation'], $data['password'], $data['is_active']);

        return $data;
    }
}
