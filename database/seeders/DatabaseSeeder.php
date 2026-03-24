<?php

namespace Database\Seeders;

use Illuminate\Database\Seeder;

class DatabaseSeeder extends Seeder
{
    public function run(): void
    {
        $this->call([
            CategorySeeder::class,
            EventTypeSeeder::class,
            StylePreferenceSeeder::class,
            AdminSeeder::class,
            CustomerSeeder::class,
            VendorSeeder::class,
            ProductSeeder::class,
            ReservationSeeder::class,
            ReviewSeeder::class,
            WishlistSeeder::class,
            ColorPaletteSeeder::class,
            VendorAnalyticsSeeder::class,
            HeroSlideSeeder::class,
            PageSeeder::class,
            FaqSeeder::class,
            HelpSeeder::class,
        ]);
    }
}
