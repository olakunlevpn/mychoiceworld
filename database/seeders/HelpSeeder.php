<?php

namespace Database\Seeders;

use App\Models\HelpArticle;
use App\Models\HelpCategory;
use Illuminate\Database\Seeder;
use Illuminate\Support\Str;

class HelpSeeder extends Seeder
{
    public function run(): void
    {
        $categories = [
            [
                'title' => 'Getting Started',
                'description' => 'New to MyChoiceMyWorld? Start here.',
                'icon' => 'heroicon-o-rocket-launch',
                'articles' => [
                    [
                        'title' => 'How to Create an Account',
                        'excerpt' => 'Step-by-step guide to registering on MyChoiceMyWorld.',
                        'content' => '<h2>Creating Your Account</h2>
<p>Getting started with MyChoiceMyWorld is quick and easy:</p>
<ol>
<li>Click the <strong>Register</strong> button in the top navigation.</li>
<li>Enter your name, email address, and create a password.</li>
<li>Optionally add your phone number for reservation notifications.</li>
<li>Click <strong>Create Account</strong> to complete registration.</li>
</ol>
<p>Once registered, you can immediately start browsing products and making reservations.</p>',
                        'read_time' => 2,
                    ],
                    [
                        'title' => 'Setting Up Your Profile',
                        'excerpt' => 'Complete your profile to get personalised recommendations.',
                        'content' => '<h2>Complete Your Profile</h2>
<p>A complete profile helps us give you better recommendations:</p>
<ol>
<li>Go to your <strong>Profile</strong> page from the user menu.</li>
<li>Add your location to discover nearby stores.</li>
<li>Set your style preferences for personalised suggestions.</li>
<li>Upload a profile photo (optional).</li>
</ol>
<p>Your location is used only to show you nearby vendors and is never shared publicly.</p>',
                        'read_time' => 2,
                    ],
                ],
            ],
            [
                'title' => 'Reservations',
                'description' => 'Everything about reserving and managing outfits.',
                'icon' => 'heroicon-o-clipboard-document-check',
                'articles' => [
                    [
                        'title' => 'How to Reserve a Product',
                        'excerpt' => 'Learn how to reserve outfits from local vendors.',
                        'content' => '<h2>Making a Reservation</h2>
<ol>
<li>Browse products or search for something specific.</li>
<li>Click on a product to view its details.</li>
<li>Select your preferred size and colour variant.</li>
<li>Click <strong>Reserve Now</strong>.</li>
<li>Choose a date to visit the store.</li>
<li>Confirm your reservation.</li>
</ol>
<p>You\'ll receive a confirmation with the store address and reservation details. The vendor will hold the item for you until your visit.</p>',
                        'read_time' => 3,
                    ],
                    [
                        'title' => 'Managing Your Reservations',
                        'excerpt' => 'View, track, and cancel your reservations.',
                        'content' => '<h2>Your Reservations Dashboard</h2>
<p>From your <strong>Customer Dashboard</strong>, click <strong>Reservations</strong> to see all your bookings.</p>
<h3>Reservation Statuses</h3>
<ul>
<li><strong>Pending</strong> — Waiting for vendor confirmation.</li>
<li><strong>Confirmed</strong> — Vendor has confirmed. Visit the store on your chosen date.</li>
<li><strong>Completed</strong> — You visited and the reservation is fulfilled.</li>
<li><strong>Cancelled</strong> — You or the vendor cancelled the reservation.</li>
<li><strong>Expired</strong> — The reservation period passed without a visit.</li>
</ul>
<p>You can cancel any pending or confirmed reservation from this page.</p>',
                        'read_time' => 3,
                    ],
                ],
            ],
            [
                'title' => 'For Vendors',
                'description' => 'Guides for setting up and managing your store.',
                'icon' => 'heroicon-o-building-storefront',
                'articles' => [
                    [
                        'title' => 'Registering as a Vendor',
                        'excerpt' => 'How to set up your vendor account and start selling.',
                        'content' => '<h2>Become a Vendor</h2>
<ol>
<li>Click <strong>Register as Vendor</strong> from the homepage.</li>
<li>Fill in your personal details and store information.</li>
<li>Add your store name, description, address, and operating hours.</li>
<li>Submit your application for review.</li>
</ol>
<p>Once approved, you can start adding products and receiving reservations from customers.</p>',
                        'read_time' => 3,
                    ],
                    [
                        'title' => 'Adding Products to Your Store',
                        'excerpt' => 'Learn how to list products with images, sizes, and pricing.',
                        'content' => '<h2>Listing Your Products</h2>
<ol>
<li>Go to your <strong>Vendor Dashboard</strong> and click <strong>Products</strong>.</li>
<li>Click <strong>Add Product</strong>.</li>
<li>Enter the product name, description, category, and price.</li>
<li>Upload high-quality product images (up to 10).</li>
<li>Add size and colour variants with stock quantities.</li>
<li>Select relevant event types and style tags.</li>
<li>Click <strong>Publish</strong> to make it live.</li>
</ol>
<p>Tip: Products with multiple clear photos and complete descriptions get more reservations.</p>',
                        'read_time' => 4,
                    ],
                    [
                        'title' => 'Managing Reservations as a Vendor',
                        'excerpt' => 'How to confirm, decline, and manage incoming reservations.',
                        'content' => '<h2>Handling Reservations</h2>
<p>When a customer reserves one of your products, you\'ll receive a notification.</p>
<ol>
<li>Go to <strong>Vendor Dashboard</strong> &gt; <strong>Reservations</strong>.</li>
<li>Review the reservation details.</li>
<li>Click <strong>Confirm</strong> to accept or <strong>Decline</strong> if the item is unavailable.</li>
</ol>
<p>When the customer visits your store, mark the reservation as <strong>Completed</strong> after the transaction.</p>',
                        'read_time' => 3,
                    ],
                ],
            ],
            [
                'title' => 'AI Style Matching',
                'description' => 'Learn how our AI finds your perfect outfits.',
                'icon' => 'heroicon-o-sparkles',
                'articles' => [
                    [
                        'title' => 'Using the AI Style Match Feature',
                        'excerpt' => 'Get outfit recommendations based on your skin tone and preferences.',
                        'content' => '<h2>How AI Matching Works</h2>
<ol>
<li>Go to <strong>Find My Match</strong> from the navigation menu.</li>
<li>Select your skin tone from the options provided.</li>
<li>Choose the occasion or event type (wedding, casual, work, etc.).</li>
<li>Set your style preferences (formal, streetwear, bohemian, etc.).</li>
<li>Optionally set a budget range.</li>
<li>Click <strong>Find My Match</strong> to get results.</li>
</ol>
<p>The AI analyses colour theory and fashion trends to suggest products that will look great on you. Results are ranked by match score.</p>',
                        'read_time' => 3,
                    ],
                ],
            ],
            [
                'title' => 'Account & Security',
                'description' => 'Manage your account settings and security.',
                'icon' => 'heroicon-o-shield-check',
                'articles' => [
                    [
                        'title' => 'Changing Your Password',
                        'excerpt' => 'How to update your account password.',
                        'content' => '<h2>Update Your Password</h2>
<ol>
<li>Go to your <strong>Profile</strong> page.</li>
<li>Scroll to the <strong>Update Password</strong> section.</li>
<li>Enter your current password.</li>
<li>Enter and confirm your new password.</li>
<li>Click <strong>Save</strong>.</li>
</ol>
<p>Choose a strong password with at least 8 characters, including letters, numbers, and symbols.</p>',
                        'read_time' => 2,
                    ],
                    [
                        'title' => 'Deleting Your Account',
                        'excerpt' => 'How to permanently delete your account and data.',
                        'content' => '<h2>Account Deletion</h2>
<p>If you wish to delete your account:</p>
<ol>
<li>Go to your <strong>Profile</strong> page.</li>
<li>Scroll to the <strong>Delete Account</strong> section.</li>
<li>Enter your password to confirm.</li>
<li>Click <strong>Delete Account</strong>.</li>
</ol>
<p><strong>Warning:</strong> This action is permanent and cannot be undone. All your data, reservations, reviews, and wishlists will be permanently removed.</p>',
                        'read_time' => 2,
                    ],
                ],
            ],
        ];

        $catOrder = 0;

        foreach ($categories as $catData) {
            $catOrder++;

            $category = HelpCategory::firstOrCreate(
                ['slug' => Str::slug($catData['title'])],
                [
                    'title' => $catData['title'],
                    'description' => $catData['description'],
                    'icon' => $catData['icon'],
                    'sort_order' => $catOrder,
                    'is_active' => true,
                ]
            );

            $artOrder = 0;

            foreach ($catData['articles'] as $artData) {
                $artOrder++;

                HelpArticle::firstOrCreate(
                    ['slug' => Str::slug($artData['title'])],
                    [
                        'help_category_id' => $category->id,
                        'title' => $artData['title'],
                        'excerpt' => $artData['excerpt'],
                        'content' => $artData['content'],
                        'read_time' => $artData['read_time'],
                        'sort_order' => $artOrder,
                        'is_published' => true,
                    ]
                );
            }
        }
    }
}
