<?php

namespace Database\Seeders;

use App\Models\Faq;
use Illuminate\Database\Seeder;

class FaqSeeder extends Seeder
{
    public function run(): void
    {
        $faqs = [
            [
                'question' => 'What is MyChoiceMyWorld?',
                'answer' => 'MyChoiceMyWorld is a fashion marketplace that connects shoppers with local boutiques and independent vendors. You can browse products, reserve outfits online, and visit stores to try them on before purchasing.',
            ],
            [
                'question' => 'How does the reservation system work?',
                'answer' => 'When you find a product you like, you can reserve it online. The vendor will be notified and hold the item for you. You then visit the store within the reservation period to try it on and complete your purchase.',
            ],
            [
                'question' => 'Is there a fee for making a reservation?',
                'answer' => 'No, making a reservation is completely free. You only pay when you visit the store and decide to purchase the item.',
            ],
            [
                'question' => 'How does the AI Style Matching work?',
                'answer' => 'Our AI-powered style matching engine analyses your skin tone, style preferences, and the occasion to suggest outfits and colours that complement you best. Simply upload a photo or select your preferences to get started.',
            ],
            [
                'question' => 'How do I become a vendor?',
                'answer' => 'Click on "Register as Vendor" from the homepage or navigation menu. Fill in your store details, upload your products, and once your account is verified, you can start receiving reservations from customers.',
            ],
            [
                'question' => 'What happens if I miss my reservation?',
                'answer' => 'Reservations have an expiry period set by the vendor. If you don\'t visit the store within that time, the reservation will automatically expire and the item will be made available to other shoppers.',
            ],
            [
                'question' => 'Can I cancel a reservation?',
                'answer' => 'Yes, you can cancel a reservation at any time from your customer dashboard before it expires. We encourage you to cancel early so other shoppers can reserve the item.',
            ],
            [
                'question' => 'How do I leave a review?',
                'answer' => 'After completing a reservation and visiting the store, you can leave a review from your customer dashboard. Your feedback helps other shoppers and supports quality vendors.',
            ],
            [
                'question' => 'Is my personal data safe?',
                'answer' => 'Yes, we take data security seriously. All personal information is encrypted and stored securely. We never sell your data to third parties. Please see our Privacy Policy for full details.',
            ],
            [
                'question' => 'How do I contact support?',
                'answer' => 'You can reach our support team through the Contact page on our website. We aim to respond to all enquiries within 24 hours.',
            ],
        ];

        foreach ($faqs as $index => $faq) {
            Faq::firstOrCreate(
                ['question' => $faq['question']],
                [
                    'answer' => $faq['answer'],
                    'sort_order' => $index + 1,
                    'is_active' => true,
                ]
            );
        }
    }
}
