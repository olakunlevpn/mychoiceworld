<?php

namespace Database\Seeders;

use App\Models\User;
use App\Models\Vendor;
use Illuminate\Database\Seeder;

class VendorSeeder extends Seeder
{
    public function run(): void
    {
        // 15 approved
        for ($i = 0; $i < 15; $i++) {
            $user = User::factory()->vendor()->create();
            Vendor::factory()->approved()->create(['user_id' => $user->id]);
        }

        // 3 pending
        for ($i = 0; $i < 3; $i++) {
            $user = User::factory()->vendor()->create();
            Vendor::factory()->pending()->create(['user_id' => $user->id]);
        }

        // 1 suspended
        $user = User::factory()->vendor()->create();
        Vendor::factory()->suspended()->create(['user_id' => $user->id]);

        // 1 rejected
        $user = User::factory()->vendor()->create();
        Vendor::factory()->rejected()->create([
            'user_id' => $user->id,
            'rejection_reason' => 'Invalid business license documentation.',
        ]);
    }
}
