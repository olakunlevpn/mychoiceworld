<?php

namespace App\Actions\Customer;

use App\Data\CreateReservationData;
use App\Enums\ProductStatus;
use App\Enums\ReservationSource;
use App\Enums\ReservationStatus;
use App\Events\ReservationCreated;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use App\Settings\GeneralSettings;
use Illuminate\Support\Facades\DB;
use Illuminate\Support\Str;
use Illuminate\Validation\ValidationException;

class CreateReservation
{
    public function execute(User $customer, CreateReservationData $data): Reservation
    {
        return DB::transaction(function () use ($customer, $data) {
            $product = Product::findOrFail($data->product_id);

            if ($product->status !== ProductStatus::Active) {
                throw ValidationException::withMessages([
                    'product_id' => __('customer.product_not_active'),
                ]);
            }

            if (! $product->is_reservable) {
                throw ValidationException::withMessages([
                    'product_id' => __('customer.product_not_reservable'),
                ]);
            }

            if ($data->variant_id && ! $product->variants()->where('id', $data->variant_id)->exists()) {
                throw ValidationException::withMessages([
                    'variant_id' => __('customer.variant_not_found'),
                ]);
            }

            $settings = app(GeneralSettings::class);

            $activeCount = Reservation::where('customer_id', $customer->id)
                ->active()
                ->count();

            if ($activeCount >= $settings->max_active_reservations) {
                throw ValidationException::withMessages([
                    'product_id' => __('customer.max_reservations_reached'),
                ]);
            }

            $alreadyReserved = Reservation::where('customer_id', $customer->id)
                ->where('product_id', $data->product_id)
                ->active()
                ->exists();

            if ($alreadyReserved) {
                throw ValidationException::withMessages([
                    'product_id' => __('customer.reservation_already_exists'),
                ]);
            }

            $reservation = Reservation::create([
                'reservation_code' => 'RES-'.strtoupper(Str::random(6)),
                'customer_id' => $customer->id,
                'vendor_id' => $product->vendor_id,
                'product_id' => $product->id,
                'variant_id' => $data->variant_id,
                'status' => ReservationStatus::Pending,
                'customer_note' => $data->customer_note,
                'reserved_at' => now(),
                'expires_at' => now()->addHours($settings->reservation_hold_hours),
                'source' => ReservationSource::from($data->source),
            ]);

            event(new ReservationCreated($reservation));

            return $reservation;
        });
    }
}
