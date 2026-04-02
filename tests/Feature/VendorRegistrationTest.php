<?php

namespace Tests\Feature;

use App\Enums\UserRole;
use App\Enums\VendorStatus;
use App\Events\VendorRegistered;
use App\Models\User;
use Illuminate\Foundation\Testing\RefreshDatabase;
use Illuminate\Support\Facades\Event;
use Tests\TestCase;

class VendorRegistrationTest extends TestCase
{
    use RefreshDatabase;

    public function test_vendor_registration_creates_user_and_vendor(): void
    {
        Event::fake([VendorRegistered::class]);

        $response = $this->post('/vendor/register', [
            'name' => 'Test Vendor',
            'email' => 'vendor@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
            'store_name' => 'Test Store',
            'phone' => '+1234567890',
            'license_number' => 'LIC-001',
            'address' => '123 Main St',
            'city' => 'Lagos',
            'state' => 'Lagos',
            'country' => 'Nigeria',
            'latitude' => 6.5244,
            'longitude' => 3.3792,
        ]);

        $response->assertRedirect(route('vendor.status'));

        $user = User::where('email', 'vendor@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals(UserRole::Vendor, $user->role);

        $vendor = $user->vendor;
        $this->assertNotNull($vendor);
        $this->assertEquals('Test Store', $vendor->store_name);
        $this->assertEquals(VendorStatus::Pending, $vendor->status);

        Event::assertDispatched(VendorRegistered::class);
    }

    public function test_vendor_registration_requires_valid_data(): void
    {
        $response = $this->post('/vendor/register', []);

        $response->assertSessionHasErrors(['name', 'email', 'password', 'store_name', 'phone', 'address', 'city', 'state', 'country']);
    }

    public function test_customer_registration_assigns_customer_role(): void
    {
        $response = $this->post('/register', [
            'name' => 'Test Customer',
            'email' => 'customer@example.com',
            'password' => 'password123',
            'password_confirmation' => 'password123',
        ]);

        $response->assertRedirect(route('dashboard'));

        $user = User::where('email', 'customer@example.com')->first();
        $this->assertNotNull($user);
        $this->assertEquals(UserRole::Customer, $user->role);
    }
}
