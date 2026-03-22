import { Head } from '@inertiajs/react'
import PublicLayout from '@/Layouts/PublicLayout'

export default function CookiePolicy() {
    return (
        <PublicLayout>
            <Head title="Cookie Policy" />

            <div className="mx-auto max-w-3xl px-4 py-16 sm:px-6 lg:px-8">
                <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Cookie Policy
                </h1>
                <p className="mt-4 text-sm text-gray-500 dark:text-gray-400">
                    Last updated: March 19, 2026
                </p>

                <div className="mt-10 space-y-10">
                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            1. What Are Cookies
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Cookies are small text files that are placed on your computer or mobile device when
                            you visit a website. They are widely used to make websites work more efficiently and
                            to provide information to the owners of the site.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            2. How We Use Cookies
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We use cookies to understand how you use our platform and to improve your experience.
                            This includes personalizing content, providing social media features, and analyzing
                            our traffic.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            3. Types of Cookies We Use
                        </h2>

                        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                            Essential Cookies
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            These cookies are necessary for the website to function properly. They enable core
                            functionality such as security, session management, and accessibility. You cannot
                            opt out of these cookies as the platform would not function without them.
                        </p>

                        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                            Performance Cookies
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            These cookies collect information about how visitors use our platform, such as which
                            pages are visited most often and if they receive error messages. These cookies do not
                            collect information that identifies a visitor. All information is aggregated and
                            anonymous.
                        </p>

                        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                            Functionality Cookies
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            These cookies allow the platform to remember choices you make, such as your preferred
                            location, theme preference (light or dark mode), and language. They provide enhanced,
                            more personal features.
                        </p>

                        <h3 className="mt-6 text-lg font-medium text-gray-900 dark:text-white">
                            Targeting Cookies
                        </h3>
                        <p className="mt-2 text-gray-600 dark:text-gray-300">
                            These cookies may be set through our site by our advertising partners. They may be
                            used to build a profile of your interests and show you relevant advertisements on
                            other sites. They do not store directly personal information but are based on uniquely
                            identifying your browser and internet device.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            4. Managing Cookies
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            Most web browsers allow you to control cookies through their settings. You can set
                            your browser to refuse cookies or to alert you when cookies are being sent. However,
                            if you disable cookies, some parts of our platform may not function properly.
                        </p>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            You can also manage your cookie preferences through the cookie consent banner that
                            appears when you first visit our platform.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            5. Third-Party Cookies
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            In some cases, we use cookies provided by trusted third parties. These third-party
                            cookies may track your use of our platform to help us understand how the platform is
                            being used and to improve our services.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            6. Changes to This Policy
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            We may update our Cookie Policy from time to time. We will notify you of any changes
                            by posting the new Cookie Policy on this page and updating the &quot;Last updated&quot;
                            date above.
                        </p>
                    </section>

                    <section>
                        <h2 className="text-xl font-semibold text-gray-900 dark:text-white">
                            7. Contact Us
                        </h2>
                        <p className="mt-4 text-gray-600 dark:text-gray-300">
                            If you have any questions about our use of cookies, please contact us through our
                            help center or send us an email through the contact page.
                        </p>
                    </section>
                </div>
            </div>
        </PublicLayout>
    )
}
