<?php

namespace Database\Factories;

use App\Enums\VendorStatus;
use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Eloquent\Factories\Factory;
use Illuminate\Support\Str;
use MatanYadaev\EloquentSpatial\Objects\Point;

/**
 * @extends Factory<Vendor>
 */
class VendorFactory extends Factory
{
    protected $model = Vendor::class;

    /**
     * Define the model's default state.
     *
     * @return array<string, mixed>
     */
    public function definition(): array
    {
        $storeNames = [
            'Bella Rosa Boutique', 'Urban Thread Co.', 'Silk & Satin Studio',
            'The Fashion Vault', 'Luxe Lane', 'Style District',
            'Chic Avenue', 'Maison de Mode', 'The Velvet Hanger',
            'Couture Corner', 'Trend Republic', 'Fashion Forward NYC',
            'The Style Edit', 'Glamour House', 'Runway Ready',
            'Dresscode', 'Wardrobe Wonders', 'The Style Bar',
            'Modish Boutique', 'Elegance Emporium', 'Sartorial NYC',
            'Thread & Needle', 'The Garment District', 'Vogue Vessel',
            'Atelier Chic',
        ];

        $storeName = fake()->randomElement($storeNames);

        return [
            'user_id' => User::factory()->vendor(),
            'store_name' => $storeName,
            'slug' => Str::slug($storeName).'-'.fake()->unique()->numberBetween(1, 9999),
            'license_number' => fake()->bothify('LIC-####-??'),
            'description' => fake()->paragraph(3),
            'phone' => fake()->phoneNumber(),
            'whatsapp' => fake()->phoneNumber(),
            'email' => fake()->companyEmail(),
            'address' => fake()->streetAddress(),
            'city' => fake()->randomElement(['Thiruvananthapuram', 'Kochi', 'Kozhikode', 'Thrissur', 'Kollam', 'Bengaluru', 'Chennai', 'Mumbai', 'Delhi', 'Hyderabad']),
            'state' => fake()->randomElement(['Kerala', 'Karnataka', 'Tamil Nadu', 'Maharashtra', 'Delhi', 'Telangana']),
            'country' => 'India',
            'postal_code' => fake()->postcode(),
            'location' => new Point(
                fake()->randomFloat(4, 8.3, 28.6),
                fake()->randomFloat(4, 73.0, 80.3),
            ),
            'operating_hours' => [
                'monday' => ['open' => '09:00', 'close' => '18:00'],
                'tuesday' => ['open' => '09:00', 'close' => '18:00'],
                'wednesday' => ['open' => '09:00', 'close' => '18:00'],
                'thursday' => ['open' => '09:00', 'close' => '18:00'],
                'friday' => ['open' => '09:00', 'close' => '18:00'],
                'saturday' => ['open' => '09:00', 'close' => '18:00'],
                'sunday' => ['open' => null, 'close' => null, 'closed' => true],
            ],
            'status' => VendorStatus::Approved,
            'is_featured' => fake()->boolean(20),
            'rating_avg' => fake()->randomFloat(2, 3.0, 5.0),
            'rating_count' => fake()->numberBetween(0, 100),
        ];
    }

    /**
     * Set status to pending.
     */
    public function pending(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => VendorStatus::Pending,
        ]);
    }

    /**
     * Set status to approved.
     */
    public function approved(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => VendorStatus::Approved,
        ]);
    }

    /**
     * Set status to suspended.
     */
    public function suspended(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => VendorStatus::Suspended,
        ]);
    }

    /**
     * Set status to rejected.
     */
    public function rejected(): static
    {
        return $this->state(fn (array $attributes) => [
            'status' => VendorStatus::Rejected,
        ]);
    }

    /**
     * Mark vendor as featured.
     */
    public function featured(): static
    {
        return $this->state(fn (array $attributes) => [
            'is_featured' => true,
        ]);
    }
}
