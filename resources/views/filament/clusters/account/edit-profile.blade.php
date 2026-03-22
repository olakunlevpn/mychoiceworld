<x-filament-panels::page>
    <form wire:submit="updateProfile">
        {{ $this->profileForm }}

        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: flex-end;">
            <x-filament::button type="submit" color="primary" icon="heroicon-o-check">
                {{ __('admin.save_profile') }}
            </x-filament::button>
        </div>
    </form>

    <form wire:submit="updatePassword">
        {{ $this->passwordForm }}

        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; justify-content: flex-end;">
            <x-filament::button type="submit" color="primary" icon="heroicon-o-check">
                {{ __('admin.update_password') }}
            </x-filament::button>
        </div>
    </form>
</x-filament-panels::page>
