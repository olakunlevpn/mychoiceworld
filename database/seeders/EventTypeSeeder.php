<?php

namespace Database\Seeders;

use App\Models\EventType;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class EventTypeSeeder extends Seeder
{
    public function run(): void
    {
        $eventTypes = [
            ['name' => 'Wedding', 'icon' => 'heroicon-o-heart'],
            ['name' => 'Party', 'icon' => 'heroicon-o-musical-note'],
            ['name' => 'Office / Work', 'icon' => 'heroicon-o-briefcase'],
            ['name' => 'Casual / Everyday', 'icon' => 'heroicon-o-sun'],
            ['name' => 'Travel', 'icon' => 'heroicon-o-globe-alt'],
            ['name' => 'Date Night', 'icon' => 'heroicon-o-sparkles'],
            ['name' => 'Festival', 'icon' => 'heroicon-o-fire'],
            ['name' => 'Funeral / Memorial', 'icon' => 'heroicon-o-moon'],
        ];

        foreach ($eventTypes as $eventType) {
            EventType::create([
                'name' => $eventType['name'],
                'slug' => Str::slug($eventType['name']),
                'icon' => $eventType['icon'],
                'is_active' => true,
            ]);
        }
    }
}
