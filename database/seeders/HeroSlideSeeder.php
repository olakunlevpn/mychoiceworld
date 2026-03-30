<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;

class HeroSlideSeeder extends Seeder
{
    public function run(): void
    {
        $slides = [
            [
                'heading' => 'Discover Your Perfect Style',
                'description' => 'Browse thousands of curated fashion pieces from local boutiques near you.',
                'cta_text' => 'Explore Now',
                'cta_link' => '/products',
                'background_image' => '/images/hero-slider-1.jpg',
            ],
            [
                'heading' => 'Shop Local, Look Global',
                'description' => 'Support independent fashion vendors and find unique pieces you won\'t see anywhere else.',
                'cta_text' => 'Find Stores',
                'cta_link' => '/stores',
                'background_image' => '/images/hero-slider-2.jpg',
            ],
            [
                'heading' => 'AI-Powered Style Matching',
                'description' => 'Let our smart matching engine find outfits that complement your skin tone and style.',
                'cta_text' => 'Try AI Match',
                'cta_link' => '/find-my-match',
                'background_image' => '/images/hero-slider-3.jpg',
            ],
        ];

        foreach ($slides as $index => $slide) {
            HeroSlide::updateOrCreate(
                ['heading' => $slide['heading']],
                [
                    'description' => $slide['description'],
                    'cta_text' => $slide['cta_text'],
                    'cta_link' => $slide['cta_link'],
                    'background_image' => $slide['background_image'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
