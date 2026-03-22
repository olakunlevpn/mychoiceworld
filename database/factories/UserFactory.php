<?php

namespace Database\Factories;

use App\Enums\UserRole;
use App\Models\User;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Facades\Hash;
use Illuminate\Support\Str;

/**
 * @extends Factory<User>
 */
class UserFactory extends Factory
{
    /**
     * The current password being used by the factory.
     */
    protected static ?string $password;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        return [
            'name' => fake()->name(),
            'email' => fake()->unique()->safeEmail(),
            'email_verified_at' => now(),
            'password' => static::$password ??= Hash::make('password'),
            'remember_token' => Str::random(10),
            'phone' => fake()->phoneNumber(),
            'role' => UserRole::Customer,
            'is_active' => true,
        ];
    }

    /**
     * Indicate that the model's email address should be unverified.
     */
    public function unverified(): static
    {
        return $this->state(fn (array $attributes) => [
            'email_verified_at' => null,
        ]);
    }

    /**
     * Set role to customer.
     */
    public function customer(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::Customer,
        ]);
    }

    /**
     * Set role to vendor.
     */
    public function vendor(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::Vendor,
        ]);
    }

    /**
     * Set role to admin.
     */
    public function admin(): static
    {
        return $this->state(fn (array $attributes) => [
            'role' => UserRole::Admin,
        ]);
    }

    /**
     * Set last location within ~20km radius of NYC (40.7128, -74.0060).
     */
    public function withLocation(): static
    {
        return $this->state(fn (array $attributes) => [
            'last_latitude' => 40.7128 + fake()->randomFloat(4, -0.18, 0.18),
            'last_longitude' => -74.0060 + fake()->randomFloat(4, -0.18, 0.18),
            'last_location_at' => fake()->dateTimeBetween('-7 days', 'now'),
        ]);
    }
}
