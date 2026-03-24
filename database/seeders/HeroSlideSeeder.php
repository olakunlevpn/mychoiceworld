<?php

namespace Database\Seeders;

use App\Models\HeroSlide;
use Illuminate\Database\Seeder;
use Illuminate\Support\Facades\Http;
use Illuminate\Support\Facades\Storage;

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
                'image_url' => 'https://images.unsplash.com/photo-1441984904996-e0b6ba687e04?w=1920&h=800&fit=crop&q=80',
            ],
            [
                'heading' => 'Shop Local, Look Global',
                'description' => 'Support independent fashion vendors and find unique pieces you won\'t see anywhere else.',
                'cta_text' => 'Find Stores',
                'cta_link' => '/stores',
                'image_url' => 'https://images.unsplash.com/photo-1490481651871-ab68de25d43d?w=1920&h=800&fit=crop&q=80',
            ],
            [
                'heading' => 'AI-Powered Style Matching',
                'description' => 'Let our smart matching engine find outfits that complement your skin tone and style.',
                'cta_text' => 'Try AI Match',
                'cta_link' => '/find-my-match',
                'image_url' => 'https://images.unsplash.com/photo-1469334031218-e382a71b716b?w=1920&h=800&fit=crop&q=80',
            ],
        ];

        foreach ($slides as $index => $slide) {
            if (HeroSlide::where('heading', $slide['heading'])->exists()) {
                continue;
            }

            $imagePath = null;

            try {
                $response = Http::timeout(15)->get($slide['image_url']);

                if ($response->successful()) {
                    $filename = 'hero-slide-'.($index + 1).'.jpg';
                    Storage::disk('public')->put('hero-slides/'.$filename, $response->body());
                    $imagePath = 'hero-slides/'.$filename;
                }
            } catch (\Exception $e) {
                // Continue without image if download fails
            }

            HeroSlide::create([
                'heading' => $slide['heading'],
                'description' => $slide['description'],
                'cta_text' => $slide['cta_text'],
                'cta_link' => $slide['cta_link'],
                'background_image' => $imagePath,
                'sort_order' => $index + 1,
                'is_active' => true,
            ]);
        }
    }
}
