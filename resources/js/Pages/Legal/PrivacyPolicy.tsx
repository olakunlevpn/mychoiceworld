import { Head } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'

export default function PrivacyPolicy() {
    return (
        <PublicLayout>
            <Head title="Privacy Policy" />

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Privacy Policy
                </h1>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: March 19, 2026
                </p>

                <div className="mt-10 space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            1. Information We Collect
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We collect information you provide directly to us, such as when you create an account,
                            make a reservation, browse products, or contact us for support. This may include your
                            name, email address, phone number, location data, and payment information.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We also automatically collect certain information when you use our platform, including
                            your IP address, browser type, operating system, referring URLs, and information about
                            how you interact with our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            2. How We Use Your Information
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We use the information we collect to provide, maintain, and improve our services,
                            process transactions and reservations, send you technical notices and support messages,
                            and respond to your comments and questions.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We may also use your information to send promotional communications, such as information
                            about products, services, and events offered by us and our partners. You can opt out of
                            receiving promotional messages at any time.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            3. Information Sharing
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We do not sell your personal information. We may share your information with vendors
                            on our platform to fulfill reservations, with service providers who assist in our
                            operations, and when required by law or to protect our rights.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            4. Data Security
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We take reasonable measures to help protect your personal information from loss, theft,
                            misuse, unauthorized access, disclosure, alteration, and destruction. However, no
                            internet or electronic storage system is completely secure.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            5. Your Rights
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            You may access, update, or delete your account information at any time by logging into
                            your account. You may also request a copy of the personal data we hold about you or
                            ask us to delete your data by contacting our support team.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            6. Cookies
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We use cookies and similar tracking technologies to collect and track information and
                            to improve and analyze our services. For more details, please see our Cookie Policy.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            7. Changes to This Policy
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We may update this privacy policy from time to time. We will notify you of any changes
                            by posting the new policy on this page and updating the &quot;Last updated&quot; date
                            above.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            8. Contact Us
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            If you have any questions about this Privacy Policy, please contact us through our
                            help center or send us an email through the contact page.
                        </p>
                    </section>
                </div>
            </div>
        </PublicLayout>
    )
}
