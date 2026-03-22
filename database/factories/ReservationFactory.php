<?php

namespace Database\Factories;

use App\Enums\CancelledBy;
use App\Enums\ReservationSource;
use App\Enums\ReservationStatus;
use App\Models\Product;
use App\Models\Reservation;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Carbon;

/**
 * @extends Factory<Reservation>
 */
class ReservationFactory extends Factory
{
    protected $model = Reservation::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $reservedAt = fake()->dateTimeBetween('-30 days', 'now');

        return [
            'reservation_code' => 'RES-'.strtoupper(fake()->bothify('??????')),
            'customer_id' => User::factory(),
            'vendor_id' => Vendor::factory(),
            'product_id' => Product::factory(),
            'variant_id' => null,
            'status' => ReservationStatus::Pending,
            'customer_note' => fake()->optional(0.3)->sentence(),
            'vendor_note' => null,
            'reserved_at' => $reservedAt,
            'expires_at' => fn (array $attrs) => Carbon::parse($attrs['reserved_at'])->addHours(24),
            'source' => fake()->randomElement([
                ReservationSource::Browse,
                ReservationSource::Browse,
                ReservationSource::Browse,
                ReservationSource::Browse,
                ReservationSource::Browse,
                ReservationSource::Browse,
                ReservationSource::Browse,
                ReservationSource::AiMatch,
                ReservationSource::AiMatch,
                ReservationSource::AiMatch,
            ]),
        ];
    }

    /**
     * Set status to pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReservationStatus::Pending,
        ]);
    }

    /**
     * Set status to confirmed.
     */
    public function confirmed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReservationStatus::Confirmed,
            'confirmed_at' => Carbon::parse($attributes['reserved_at'])->addHours(2),
        ]);
    }

    /**
     * Set status to completed.
     */
    public function completed(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReservationStatus::Completed,
            'confirmed_at' => Carbon::parse($attributes['reserved_at'])->addHours(2),
            'completed_at' => Carbon::parse($attributes['reserved_at'])->addDay(),
        ]);
    }

    /**
     * Set status to cancelled.
     */
    public function cancelled(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReservationStatus::Cancelled,
            'cancelled_at' => Carbon::parse($attributes['reserved_at'])->addHours(fake()->numberBetween(1, 12)),
            'cancelled_by' => fake()->randomElement(CancelledBy::cases()),
            'cancellation_reason' => fake()->sentence(),
        ]);
    }

    /**
     * Set status to expired.
     */
    public function expired(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReservationStatus::Expired,
            'reserved_at' => fake()->dateTimeBetween('-30 days', '-3 days'),
            'expires_at' => fake()->dateTimeBetween('-3 days', '-1 day'),
        ]);
    }

    /**
     * Set status to no show.
     */
    public function noShow(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => ReservationStatus::NoShow,
            'confirmed_at' => Carbon::parse($attributes['reserved_at'])->addHours(2),
        ]);
    }
}
