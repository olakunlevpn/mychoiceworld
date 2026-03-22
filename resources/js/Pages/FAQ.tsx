import { Head } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'
import { Disclosure, DisclosureButton, DisclosurePanel } from '@headlessui/react'
import { ChevronDownIcon } from '@heroicons/react/24/outline'
import type { Faq } from '@/types'

interface Props {
    faqs: Faq[]
}

export default function FaqPage({ faqs }: Props) {
    return (
        <PublicLayout>
            <Head title="FAQ" />
            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <div className="text-center">
                    <h1 className="text-3xl font-bold text-gray-900 dark:text-white">Frequently Asked Questions</h1>
                    <p className="mt-2 text-gray-500 dark:text-gray-400">Find answers to common questions about our platform.</p>
                </div>
                <div className="mt-12 divide-y divide-gray-200 dark:divide-gray-700">
                    {faqs.map((faq) => (
                        <Disclosure key={faq.id}>
                            {({ open }) => (
                                <div className="py-4">
                                    <DisclosureButton className="flex w-full items-center justify-between text-left">
                                        <span className="text-base font-semibold text-gray-900 dark:text-white">{faq.question}</span>
                                        <ChevronDownIcon className={`size-5 shrink-0 text-gray-500 transition-transform duration-200 ${open ? 'rotate-180' : ''}`} />
                                    </DisclosureButton>
                                    <DisclosurePanel className="mt-3 text-sm leading-relaxed text-gray-600 dark:text-gray-300">
                                        {faq.answer}
                                    </DisclosurePanel>
                                </div>
                            )}
                        </Disclosure>
                    ))}
                    {faqs.length === 0 && (
                        <p className="py-12 text-center text-sm text-gray-500 dark:text-gray-400">No FAQs available yet.</p>
                    )}
                </div>
            </div>
        </PublicLayout>
    )
}
