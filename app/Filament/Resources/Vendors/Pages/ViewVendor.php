<?php

namespace App\Filament\Resources\Vendors\Pages;

use App\Enums\VendorStatus;
use App\Events\VendorApproved;
use App\Events\VendorRejected;
use App\Filament\Resources\Vendors\VendorResource;
use Filament\Actions\Action;
use Filament\Actions\DeleteAction;
use Filament\Actions\EditAction;
use Filament\Forms\Components\Textarea;
use Filament\Notifications\Notification;
use Filament\Resources\Pages\ViewRecord;
use Illuminate\Contracts\Support\Htmlable;

class ViewVendor extends ViewRecord
{
    protected static string $resource = VendorResource::class;

    public function getTitle(): string|Htmlable
    {
        return $this->getRecord()->store_name;
    }

    protected function getActions(): array
    {
        return [
            Action::make('approve')
                ->label(__('vendor.approve'))
                ->icon('heroicon-o-check-circle')
                ->color('success')
                ->requiresConfirmation()
                ->modalHeading(__('vendor.approve_confirm'))
                ->visible(fn () => $this->getRecord()->status !== VendorStatus::Approved)
                ->action(function () {
                    $record = $this->getRecord();
                    $record->update(['status' => 'approved', 'approved_at' => now()]);
                    event(new VendorApproved($record));
                    Notification::make()->title(__('vendor.vendor_approved'))->success()->send();
                    $this->refreshFormData(['status', 'approved_at']);
                }),
            Action::make('reject')
                ->label(__('vendor.reject'))
                ->icon('heroicon-o-x-circle')
                ->color('danger')
                ->requiresConfirmation()
                ->modalHeading(__('vendor.reject_confirm'))
                ->schema([
                    Textarea::make('rejection_reason')
                        ->label(__('vendor.rejection_reason'))
                        ->required(),
                ])
                ->visible(fn () => $this->getRecord()->status !== VendorStatus::Rejected)
                ->action(function (array $data) {
                    $record = $this->getRecord();
                    $record->update([
                        'status' => 'rejected',
                        'rejection_reason' => $data['rejection_reason'],
                    ]);
                    event(new VendorRejected($record, $data['rejection_reason']));
                    Notification::make()->title(__('vendor.vendor_rejected'))->success()->send();
                    $this->refreshFormData(['status', 'rejection_reason']);
                }),
            Action::make('suspend')
                ->label(__('vendor.suspend'))
                ->icon('heroicon-o-no-symbol')
                ->color('warning')
                ->requiresConfirmation()
                ->modalHeading(__('vendor.suspend_confirm'))
                ->visible(fn () => $this->getRecord()->status === VendorStatus::Approved)
                ->action(function () {
                    $this->getRecord()->update(['status' => 'suspended']);
                    Notification::make()->title(__('vendor.vendor_suspended'))->success()->send();
                    $this->refreshFormData(['status']);
                }),
            EditAction::make(),
            DeleteAction::make(),
        ];
    }
}
