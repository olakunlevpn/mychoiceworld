<?php

namespace Database\Seeders;

use App\Models\ColorPalette;
use Illuminate\Database\Seeder;

class ColorPaletteSeeder extends Seeder
{
    public function run(): void
    {
        $palettes = [
            'light' => [
                ['Soft Pink', '#FFB6C1', 0.95],
                ['Lavender', '#E6E6FA', 0.90],
                ['Baby Blue', '#89CFF0', 0.85],
                ['Mint Green', '#98FB98', 0.80],
                ['Peach', '#FFCBA4', 0.85],
                ['Dusty Rose', '#DCAE96', 0.75],
                ['Powder Blue', '#B0E0E6', 0.80],
                ['Cream', '#FFFDD0', 0.70],
                ['Sage', '#BCB88A', 0.75],
                ['Coral', '#FF6F61', 0.70],
            ],
            'fair' => [
                ['Blush', '#DE5D83', 0.90],
                ['Mauve', '#E0B0FF', 0.85],
                ['Periwinkle', '#CCCCFF', 0.80],
                ['Seafoam', '#93E9BE', 0.80],
                ['Rose Gold', '#B76E79', 0.85],
                ['Soft Teal', '#66B2B2', 0.75],
                ['Champagne', '#F7E7CE', 0.70],
                ['Lilac', '#C8A2C8', 0.80],
                ['Sky Blue', '#87CEEB', 0.75],
                ['Warm Ivory', '#FFEFD5', 0.70],
            ],
            'medium' => [
                ['Emerald', '#50C878', 0.95],
                ['Teal', '#008080', 0.90],
                ['Burnt Orange', '#CC5500', 0.85],
                ['Olive', '#808000', 0.80],
                ['Burgundy', '#800020', 0.85],
                ['Mustard', '#FFDB58', 0.80],
                ['Terracotta', '#E2725B', 0.75],
                ['Cobalt', '#0047AB', 0.85],
                ['Wine', '#722F37', 0.75],
                ['Golden Yellow', '#FFD700', 0.70],
            ],
            'olive' => [
                ['Burnt Sienna', '#E97451', 0.90],
                ['Forest Green', '#228B22', 0.90],
                ['Rust', '#B7410E', 0.85],
                ['Deep Purple', '#301934', 0.80],
                ['Bronze', '#CD7F32', 0.85],
                ['Amber', '#FFBF00', 0.80],
                ['Maroon', '#800000', 0.75],
                ['Jade', '#00A86B', 0.80],
                ['Brick Red', '#CB4154', 0.75],
                ['Warm Brown', '#964B00', 0.70],
            ],
            'tan' => [
                ['Royal Blue', '#4169E1', 0.95],
                ['Fuchsia', '#FF00FF', 0.85],
                ['Turquoise', '#40E0D0', 0.90],
                ['Hot Pink', '#FF69B4', 0.80],
                ['Mango', '#FF8243', 0.85],
                ['Electric Blue', '#7DF9FF', 0.80],
                ['Magenta', '#FF0090', 0.75],
                ['Lime Green', '#32CD32', 0.80],
                ['Tangerine', '#FF9966', 0.75],
                ['Violet', '#7F00FF', 0.70],
            ],
            'brown' => [
                ['Gold', '#FFD700', 0.95],
                ['Crimson', '#DC143C', 0.90],
                ['Sapphire', '#0F52BA', 0.90],
                ['White', '#FFFFFF', 0.85],
                ['Orange', '#FF8C00', 0.85],
                ['Kelly Green', '#4CBB17', 0.80],
                ['Ruby', '#E0115F', 0.80],
                ['Bright Yellow', '#FFEF00', 0.75],
                ['Coral Red', '#FF4040', 0.75],
                ['Ivory', '#FFFFF0', 0.70],
            ],
            'dark' => [
                ['Bright White', '#FFFFFF', 0.95],
                ['Cobalt Blue', '#0047AB', 0.95],
                ['Bright Red', '#FF0000', 0.90],
                ['Electric Purple', '#BF00FF', 0.85],
                ['Canary Yellow', '#FFEF00', 0.90],
                ['Fuchsia', '#FF00FF', 0.85],
                ['Orange Red', '#FF4500', 0.80],
                ['Lime', '#00FF00', 0.80],
                ['Hot Magenta', '#FF1DCE', 0.75],
                ['Cyan', '#00FFFF', 0.75],
            ],
            'deep' => [
                ['Pure White', '#FFFFFF', 0.95],
                ['Royal Purple', '#7851A9', 0.90],
                ['Bright Orange', '#FF8C00', 0.90],
                ['Neon Pink', '#FF6EC7', 0.85],
                ['Emerald Green', '#50C878', 0.90],
                ['Electric Yellow', '#FFFF33', 0.85],
                ['Bright Coral', '#FF6F61', 0.80],
                ['Turquoise', '#40E0D0', 0.80],
                ['Silver', '#C0C0C0', 0.75],
                ['Gold', '#FFD700', 0.80],
            ],
        ];

        foreach ($palettes as $skinTone => $colors) {
            foreach ($colors as [$colorName, $hex, $score]) {
                ColorPalette::create([
                    'skin_tone' => $skinTone,
                    'color_name' => $colorName,
                    'color_hex' => $hex,
                    'season' => fake()->optional(0.5)->randomElement(['spring', 'summer', 'autumn', 'winter']),
                    'score' => $score,
                ]);
            }
        }
    }
}
