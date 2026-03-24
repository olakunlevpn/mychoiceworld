<?php

namespace Database\Seeders;

use App\Enums\PageStatus;
use App\Models\Page;
use Illuminate\Database\Seeder;

class PageSeeder extends Seeder
{
    public function run(): void
    {
        $pages = [
            [
                'title' => 'About Us',
                'slug' => 'about',
                'excerpt' => 'Learn more about MyChoiceMyWorld and our mission.',
                'body' => '<h2>Our Story</h2>
<p>MyChoiceMyWorld is a fashion marketplace that connects shoppers with local boutiques and independent fashion vendors. We believe that fashion should be personal, accessible, and community-driven.</p>

<h2>Our Mission</h2>
<p>We empower local fashion vendors by giving them a digital storefront to reach new customers, while helping shoppers discover unique, hand-picked pieces they won\'t find in mainstream stores.</p>

<h2>How It Works</h2>
<p>Shoppers browse products from verified local vendors, reserve outfits online, then visit the boutique to try them on before purchasing. Our AI-powered style matching engine even helps you find pieces that complement your skin tone and personal style.</p>

<h2>Why Choose Us?</h2>
<ul>
<li><strong>Support Local</strong> — Every purchase supports an independent fashion business in your community.</li>
<li><strong>Try Before You Buy</strong> — Reserve online, visit in-store, and only pay for what you love.</li>
<li><strong>AI Style Matching</strong> — Get personalised outfit suggestions based on your preferences and skin tone.</li>
<li><strong>Curated Quality</strong> — Every vendor is vetted to ensure quality and authenticity.</li>
</ul>',
                'show_in_footer' => true,
                'sort_order' => 1,
            ],
            [
                'title' => 'Terms of Service',
                'slug' => 'terms',
                'excerpt' => 'Terms and conditions for using our platform.',
                'body' => '<h2>1. Acceptance of Terms</h2>
<p>By accessing and using MyChoiceMyWorld, you agree to be bound by these Terms of Service. If you do not agree, please do not use our platform.</p>

<h2>2. Account Registration</h2>
<p>You must provide accurate and complete information when creating an account. You are responsible for maintaining the security of your account credentials.</p>

<h2>3. Use of the Platform</h2>
<p>You agree to use the platform only for lawful purposes and in accordance with these Terms. You may not use our services to engage in any fraudulent, abusive, or illegal activity.</p>

<h2>4. Reservations</h2>
<p>When you reserve a product, you are making a commitment to visit the vendor\'s store within the reservation period. Failure to honour reservations may result in account restrictions.</p>

<h2>5. Vendor Responsibilities</h2>
<p>Vendors are responsible for the accuracy of their product listings, pricing, and availability. MyChoiceMyWorld acts as a marketplace platform and is not responsible for vendor products or services.</p>

<h2>6. Intellectual Property</h2>
<p>All content on this platform, including logos, text, and images, is the property of MyChoiceMyWorld or its content suppliers and is protected by intellectual property laws.</p>

<h2>7. Limitation of Liability</h2>
<p>MyChoiceMyWorld shall not be liable for any indirect, incidental, or consequential damages arising from your use of the platform.</p>

<h2>8. Changes to Terms</h2>
<p>We reserve the right to modify these Terms at any time. Continued use of the platform after changes constitutes acceptance of the updated Terms.</p>',
                'show_in_footer' => true,
                'sort_order' => 2,
            ],
            [
                'title' => 'Privacy Policy',
                'slug' => 'privacy',
                'excerpt' => 'How we collect, use, and protect your data.',
                'body' => '<h2>1. Information We Collect</h2>
<p>We collect information you provide directly, such as your name, email address, phone number, and location data when you create an account or use our services.</p>

<h2>2. How We Use Your Information</h2>
<p>We use your information to provide and improve our services, personalise your experience, process reservations, communicate with you, and ensure platform security.</p>

<h2>3. Location Data</h2>
<p>With your consent, we collect location data to show you nearby vendors and products. You can disable location sharing at any time through your browser or device settings.</p>

<h2>4. Data Sharing</h2>
<p>We do not sell your personal data. We may share information with vendors when you make a reservation, and with service providers who help us operate the platform.</p>

<h2>5. Data Security</h2>
<p>We implement industry-standard security measures to protect your personal information, including encryption of data in transit and at rest.</p>

<h2>6. Your Rights</h2>
<p>You have the right to access, correct, or delete your personal data. You may also request a copy of your data or withdraw consent for data processing at any time.</p>

<h2>7. Cookies</h2>
<p>We use cookies and similar technologies to enhance your experience. See our Cookie Policy for more details.</p>

<h2>8. Contact Us</h2>
<p>If you have questions about this Privacy Policy, please contact us through our contact page.</p>',
                'show_in_footer' => true,
                'sort_order' => 3,
            ],
            [
                'title' => 'Cookie Policy',
                'slug' => 'cookies',
                'excerpt' => 'Information about how we use cookies.',
                'body' => '<h2>What Are Cookies?</h2>
<p>Cookies are small text files stored on your device when you visit a website. They help the site remember your preferences and improve your browsing experience.</p>

<h2>How We Use Cookies</h2>
<p>We use cookies for the following purposes:</p>
<ul>
<li><strong>Essential Cookies</strong> — Required for the platform to function properly, including authentication and security.</li>
<li><strong>Preference Cookies</strong> — Remember your settings such as location, language, and display preferences.</li>
<li><strong>Analytics Cookies</strong> — Help us understand how visitors use our platform so we can improve it.</li>
</ul>

<h2>Managing Cookies</h2>
<p>You can control and manage cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our platform.</p>

<h2>Third-Party Cookies</h2>
<p>Some third-party services we use, such as analytics providers, may also set cookies. These are governed by their own privacy policies.</p>',
                'show_in_footer' => true,
                'sort_order' => 4,
            ],
        ];

        foreach ($pages as $page) {
            Page::firstOrCreate(
                ['slug' => $page['slug']],
                array_merge($page, [
                    'status' => PageStatus::Published,
                    'published_at' => now(),
                    'meta_title' => $page['title'].' | MyChoiceMyWorld',
                    'meta_description' => $page['excerpt'],
                ])
            );
        }
    }
}
