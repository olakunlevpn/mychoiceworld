// @ts-nocheck
import { useState } from 'react'
import { Link } from 'react-router-dom'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'

const categories = ['All', 'Reservations', 'Vendors', 'Account', 'Payments', 'Shipping']

const faqs = [
  {
    category: 'Reservations',
    question: 'How does the reservation system work?',
    answer:
      'When you find a product you love, you can reserve it directly through MyChoiceMyWorld. The vendor receives your reservation and confirms availability. Once confirmed, the item is held for you at the store so you can collect it in person or arrange delivery.',
  },
  {
    category: 'Reservations',
    question: 'How long does a reservation stay active before it expires?',
    answer:
      'Reservations are active for 48 hours by default. If you have not collected or confirmed payment within that window, the reservation expires and the item is released back to general availability. Vendors may extend this period at their discretion.',
  },
  {
    category: 'Reservations',
    question: 'Can I cancel a reservation?',
    answer:
      'Yes. You can cancel a pending or confirmed reservation from your Reservations page at any time before you collect the item. Cancellations within 2 hours of confirming may be subject to the vendor\'s cancellation policy. Refunds are processed within 3–5 business days.',
  },
  {
    category: 'Vendors',
    question: 'What is the vendor approval process?',
    answer:
      'After you submit your vendor application, our team reviews your store details, product catalogue, and business credentials within 3–5 business days. You will receive an email with the outcome. Approved vendors gain immediate access to their store dashboard.',
  },
  {
    category: 'Vendors',
    question: 'How do I become a vendor on MyChoiceMyWorld?',
    answer:
      'Click "Sell on MyChoice" in the footer or visit your account menu and choose "Become a Vendor". Fill in your store details, upload at least five product listings, and submit your application. Our team will review and respond within a few business days.',
  },
  {
    category: 'Payments',
    question: 'What payment methods are accepted?',
    answer:
      'We accept all major debit and credit cards (Visa, Mastercard, Verve), bank transfers, and select mobile money options. Payment is only charged when a reservation is confirmed by the vendor. All transactions are encrypted and PCI-compliant.',
  },
  {
    category: 'Payments',
    question: 'What is the refund policy?',
    answer:
      'If a vendor cancels your reservation or the item is not as described, you are eligible for a full refund. Buyer-initiated cancellations may be subject to a partial refund depending on the vendor\'s policy. Refunds are returned to the original payment method within 3–5 business days.',
  },
  {
    category: 'Account',
    question: 'How do I delete my account?',
    answer:
      'Go to your Profile settings, scroll to the bottom, and select "Delete Account". You will be asked to confirm your password. Account deletion is permanent and removes all your data. Active reservations must be resolved before deletion.',
  },
  {
    category: 'Account',
    question: 'What is Find My Match and how does the AI work?',
    answer:
      'Find My Match is our AI-powered style discovery tool. You tell us your occasion, style preferences, and budget, and optionally upload a photo. Our AI analyses your inputs and matches you with products and vendors that fit your style. Results are ranked by match score and proximity.',
  },
  {
    category: 'Account',
    question: 'How do I change my location or distance settings?',
    answer:
      'Open your Profile page and go to Preferences. You can set your city or allow location access for precise distance filtering. You can also set the maximum distance radius for vendor discovery — from 1 km up to 50 km.',
  },
  {
    category: 'Account',
    question: 'How does the wishlist work?',
    answer:
      'You can save any product to your wishlist by tapping the heart icon on product cards. Your wishlist is accessible from your account menu. You can share your wishlist or quickly reserve items directly from it.',
  },
  {
    category: 'Account',
    question: 'How do I manage my notifications?',
    answer:
      'Visit your Notifications settings from the account menu. You can control email and in-app notifications for reservation updates, vendor responses, promotions, and new arrivals from stores you follow. You can turn each notification type on or off independently.',
  },
]

export default function FAQ() {
  const [activeCategory, setActiveCategory] = useState('All')

  const filtered = activeCategory === 'All' ? faqs : faqs.filter((f) => f.category === activeCategory)

  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">

        {/* Page Header */}
        <div className="text-center mb-12">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Frequently Asked Questions</h1>
          <p className="mt-3 text-lg text-gray-500 dark:text-gray-400">Find answers to the most common questions about MyChoiceMyWorld.</p>
        </div>

        {/* Category Filter Pills */}
        <div className="mb-10 -mx-4 px-4 overflow-x-auto">
          <div className="flex gap-2 min-w-max">
            {categories.map((cat) => (
              <button
                key={cat}
                onClick={() => setActiveCategory(cat)}
                className={`rounded-full px-4 py-2 text-sm font-medium transition-colors whitespace-nowrap ${
                  activeCategory === cat
                    ? 'bg-primary-600 text-white'
                    : 'bg-gray-100 dark:bg-white/5 text-gray-500 dark:text-gray-400 hover:bg-gray-200 dark:hover:bg-white/10 hover:text-gray-900 dark:hover:text-white'
                }`}
              >
                {cat}
              </button>
            ))}
          </div>
        </div>

        {/* FAQ Disclosures */}
        <div className="divide-y divide-gray-200 dark:divide-gray-800 rounded-xl border border-gray-200 dark:border-gray-800 overflow-hidden">
          {filtered.map((faq) => (
            <Disclosure key={faq.question}>
              {({ open }) => (
                <>
                  <DisclosureButton
                    className={`flex w-full items-center justify-between gap-4 px-6 py-5 text-left transition-colors ${
                      open ? 'bg-gray-100 dark:bg-white/5' : 'bg-white dark:bg-gray-900 hover:bg-gray-100 dark:hover:bg-white/5'
                    }`}
                  >
                    <span className={`text-sm font-medium sm:text-base ${open ? 'text-primary-600' : 'text-gray-900 dark:text-white'}`}>
                      {faq.question}
                    </span>
                    <ChevronDownIcon
                      className={`h-5 w-5 shrink-0 transition-transform duration-200 ${
                        open ? 'rotate-180 text-primary-600' : 'text-gray-400 dark:text-gray-500'
                      }`}
                      aria-hidden="true"
                    />
                  </DisclosureButton>
                  <DisclosurePanel className="bg-gray-100 dark:bg-white/5 px-6 pb-5 pt-1">
                    <p className="text-sm text-gray-600 dark:text-gray-300 leading-relaxed">{faq.answer}</p>
                  </DisclosurePanel>
                </>
              )}
            </Disclosure>
          ))}
        </div>

        {/* Still have questions */}
        <div className="mt-12 text-center">
          <p className="text-gray-500 dark:text-gray-400">
            Still have questions?{' '}
            <Link to="/contact" className="font-medium text-primary-600 hover:text-primary-500 transition-colors">
              Contact our support team
            </Link>
          </p>
        </div>

      </div>
    </div>
  )
}
