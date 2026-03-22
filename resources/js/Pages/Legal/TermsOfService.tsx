import { Head } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'

export default function TermsOfService() {
    return (
        <PublicLayout>
            <Head title="Terms of Service" />

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Terms of Service
                </h1>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: March 19, 2026
                </p>

                <div className="mt-10 space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            1. Acceptance of Terms
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            By accessing or using our platform, you agree to be bound by these Terms of Service
                            and all applicable laws and regulations. If you do not agree with any of these terms,
                            you are prohibited from using or accessing this site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            2. User Accounts
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            When you create an account with us, you must provide accurate, complete, and current
                            information. You are responsible for safeguarding the password that you use to access
                            the service and for any activities or actions under your password.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            You agree not to share your account credentials with any third party. You must notify
                            us immediately upon becoming aware of any breach of security or unauthorized use of
                            your account.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            3. Reservations and Transactions
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Our platform allows you to discover and reserve fashion items from local vendors.
                            Reservations are subject to vendor availability and confirmation. We act as an
                            intermediary between customers and vendors and are not directly responsible for the
                            quality of products offered by vendors.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            All pricing and product details are provided by the respective vendors. While we strive
                            to ensure accuracy, we cannot guarantee that all information displayed is error-free.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            4. Vendor Obligations
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Vendors who register on our platform agree to provide accurate product information,
                            honor confirmed reservations, maintain professional standards of service, and comply
                            with all applicable local laws and regulations.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            5. Prohibited Uses
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            You may not use our platform for any unlawful purpose, to solicit others to perform
                            unlawful acts, to violate any regulations or laws, to infringe upon the rights of
                            others, to submit false or misleading information, or to interfere with the security
                            features of the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            6. Intellectual Property
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            The platform and its original content, features, and functionality are owned by us
                            and are protected by international copyright, trademark, patent, trade secret, and
                            other intellectual property laws.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            7. Limitation of Liability
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            In no event shall we be liable for any indirect, incidental, special, consequential,
                            or punitive damages, including without limitation loss of profits, data, use, or
                            goodwill, arising out of or in connection with your use of the platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            8. Termination
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We may terminate or suspend your account immediately, without prior notice or liability,
                            for any reason, including if you breach the Terms. Upon termination, your right to use
                            the platform will cease immediately.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            9. Changes to Terms
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We reserve the right to modify or replace these terms at any time. Material changes
                            will be communicated with at least 30 days notice. Your continued use of the platform
                            after changes constitutes acceptance of the new terms.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            10. Contact Us
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            If you have any questions about these Terms of Service, please contact us through our
                            help center or send us an email through the contact page.
                        </p>
                    </section>
                </div>
            </div>
        </PublicLayout>
    )
}
