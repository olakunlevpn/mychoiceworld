<x-filament-panels::page>
    @php
        $user = auth()->user();
        $enabled = $user->hasTwoFactorEnabled();
    @endphp

    <div class="space-y-6">
        <x-filament::section>
            <x-slot name="heading">
                {{ __('admin.two_factor_authentication') }}
            </x-slot>

            <x-slot name="description">
                {{ __('admin.two_factor_description') }}
            </x-slot>

            @if ($enabled && !$qrCodeSvg)
                <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                    <div style="display: flex; align-items: center; gap: 0.5rem;">
                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; color: rgb(34 197 94);">
                            <path fill-rule="evenodd" d="M2.25 12c0-5.385 4.365-9.75 9.75-9.75s9.75 4.365 9.75 9.75-4.365 9.75-9.75 9.75S2.25 17.385 2.25 12Zm13.36-1.814a.75.75 0 1 0-1.22-.872l-3.236 4.53L9.53 12.22a.75.75 0 0 0-1.06 1.06l2.25 2.25a.75.75 0 0 0 1.14-.094l3.75-5.25Z" clip-rule="evenodd" />
                        </svg>
                        <span style="font-size: 0.875rem; font-weight: 500; color: rgb(34 197 94);">
                            {{ __('admin.two_factor_is_enabled') }}
                        </span>
                    </div>

                    <div style="display: flex; flex-wrap: wrap; gap: 0.75rem;">
                        <x-filament::button wire:click="showRecoveryCodes" color="gray" size="sm">
                            {{ $showingRecoveryCodes ? __('admin.hide_recovery_codes') : __('admin.show_recovery_codes') }}
                        </x-filament::button>

                        <x-filament::button wire:click="regenerateRecoveryCodes" color="gray" size="sm">
                            {{ __('admin.regenerate_recovery_codes') }}
                        </x-filament::button>

                        <x-filament::button wire:click="disableTwoFactor" color="danger" size="sm">
                            {{ __('admin.disable_2fa') }}
                        </x-filament::button>
                    </div>

                    @if ($showingRecoveryCodes)
                        <div style="border-radius: 0.5rem; background: rgb(17 24 39); padding: 1rem;">
                            <p style="margin-bottom: 0.75rem; font-size: 0.875rem; color: rgb(156 163 175);">
                                {{ __('admin.recovery_codes_warning') }}
                            </p>
                            <div style="display: grid; gap: 0.375rem; font-family: ui-monospace, monospace; font-size: 0.875rem;">
                                @foreach ($user->two_factor_recovery_codes as $code)
                                    <div style="color: rgb(209 213 219);">{{ $code }}</div>
                                @endforeach
                            </div>
                        </div>
                    @endif
                </div>

            @elseif ($qrCodeSvg)
                <div style="display: flex; flex-direction: column; gap: 1.5rem;">
                    <p style="font-size: 0.875rem; color: rgb(156 163 175);">
                        {{ __('admin.scan_qr_code') }}
                    </p>

                    <div style="display: inline-flex; border-radius: 0.5rem; background: white; padding: 1.25rem; max-width: 230px;">
                        <img src="{{ $qrCodeSvg }}" alt="{{ __('admin.two_factor_authentication') }}" style="width: 100%; height: auto;" />
                    </div>

                    <div style="border-radius: 0.5rem; background: rgb(17 24 39); padding: 0.75rem 1rem;">
                        <p style="font-size: 0.75rem; color: rgb(156 163 175);">{{ __('admin.manual_entry_key') }}</p>
                        <p style="margin-top: 0.375rem; font-family: ui-monospace, monospace; font-size: 0.875rem; color: rgb(209 213 219); word-break: break-all;">{{ $setupSecret }}</p>
                    </div>

                    <form wire:submit="confirmTwoFactor">
                        {{ $this->twoFactorForm }}

                        <div style="margin-top: 2rem; padding-top: 1.5rem; border-top: 1px solid rgba(255,255,255,0.06); display: flex; gap: 0.75rem;">
                            <x-filament::button type="submit">
                                {{ __('admin.confirm_and_enable') }}
                            </x-filament::button>

                            <x-filament::button wire:click="disableTwoFactor" color="gray" type="button">
                                {{ __('admin.cancel') }}
                            </x-filament::button>
                        </div>
                    </form>
                </div>

            @else
                <div style="display: flex; flex-direction: column; gap: 1.25rem;">
                    {{-- Warning banner --}}
                    <div style="border-radius: 0.5rem; border: 1px solid rgba(239, 68, 68, 0.3); background: rgba(239, 68, 68, 0.1); padding: 0.75rem 1rem;">
                        <div style="display: flex; align-items: flex-start; gap: 0.5rem;">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" style="width: 16px; height: 16px; flex-shrink: 0; margin-top: 2px; color: rgb(239 68 68);">
                                <path fill-rule="evenodd" d="M11.484 2.17a.75.75 0 0 1 1.032 0 11.209 11.209 0 0 0 7.877 3.08.75.75 0 0 1 .722.515 12.74 12.74 0 0 1 .635 3.985c0 5.942-4.064 10.933-9.563 12.348a.749.749 0 0 1-.374 0C6.314 20.683 2.25 15.692 2.25 9.75c0-1.39.223-2.73.635-3.985a.75.75 0 0 1 .722-.516l.143.001a11.209 11.209 0 0 0 7.734-3.08Zm2.472 7.074a.75.75 0 0 0-1.06-1.06L10.5 10.58l-.97-.97a.75.75 0 1 0-1.06 1.06l1.5 1.5a.75.75 0 0 0 1.06 0l2.926-2.926Z" clip-rule="evenodd" />
                            </svg>
                            <div>
                                <h3 style="font-size: 0.875rem; font-weight: 600; color: rgb(248 113 113);">
                                    {{ __('admin.two_factor_not_enabled') }}
                                </h3>
                                <p style="margin-top: 0.25rem; font-size: 0.875rem; color: rgb(156 163 175);">
                                    {{ __('admin.two_factor_not_enabled_warning') }}
                                </p>
                            </div>
                        </div>
                    </div>

                    {{-- Benefits list --}}
                    <div style="border-radius: 0.5rem; background: rgb(17 24 39); padding: 0.75rem 1rem;">
                        <ul style="display: flex; flex-direction: column; gap: 0.625rem;">
                            <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: rgb(209 213 219);">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 14px; height: 14px; flex-shrink: 0; color: #14878E;">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                                {{ __('admin.two_factor_not_enabled_benefit_1') }}
                            </li>
                            <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: rgb(209 213 219);">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 14px; height: 14px; flex-shrink: 0; color: #14878E;">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                                {{ __('admin.two_factor_not_enabled_benefit_2') }}
                            </li>
                            <li style="display: flex; align-items: center; gap: 0.5rem; font-size: 0.875rem; color: rgb(209 213 219);">
                                <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20" fill="currentColor" style="width: 14px; height: 14px; flex-shrink: 0; color: #14878E;">
                                    <path fill-rule="evenodd" d="M16.704 4.153a.75.75 0 0 1 .143 1.052l-8 10.5a.75.75 0 0 1-1.127.075l-4.5-4.5a.75.75 0 0 1 1.06-1.06l3.894 3.893 7.48-9.817a.75.75 0 0 1 1.05-.143Z" clip-rule="evenodd" />
                                </svg>
                                {{ __('admin.two_factor_not_enabled_benefit_3') }}
                            </li>
                        </ul>
                    </div>

                    <x-filament::button wire:click="enableTwoFactor" icon="heroicon-o-shield-check">
                        {{ __('admin.enable_2fa') }}
                    </x-filament::button>
                </div>
            @endif
        </x-filament::section>
    </div>
</x-filament-panels::page>
