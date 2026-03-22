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
        if (filled($data['new_password'] ?? null)) {
            $data['password'] = Hash::make($data['new_password']);
        }

        unset($data['new_password'], $data['new_password_confirmation']);

        return $data;
    }
}
