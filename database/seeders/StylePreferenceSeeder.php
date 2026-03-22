<?php

namespace Database\Seeders;

use App\Models\StylePreference;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class StylePreferenceSeeder extends Seeder
{
    public function run(): void
    {
        $styles = [
            'Formal',
            'Casual',
            'Ethnic / Traditional',
            'Modern / Contemporary',
            'Streetwear',
            'Bohemian',
            'Minimalist',
            'Vintage / Retro',
        ];

        foreach ($styles as $style) {
            StylePreference::create([
                'name' => $style,
                'slug' => Str::slug($style),
                'is_active' => true,
            ]);
        }
    }
}
