// @ts-nocheck
import { Link } from 'react-router-dom'

export default function CookiePolicy() {
  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Cookie Policy</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: March 2026</p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-900 p-8 space-y-10">
          {/* What Are Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. What Are Cookies</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Cookies are small text files that are placed on your device when you visit a website. They are widely used to make websites work more efficiently, provide a better user experience, and supply information to site owners. Cookies can be "persistent" (remaining on your device until deleted or expired) or "session-based" (deleted when you close your browser).
            </p>
          </section>

          {/* How We Use Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. How We Use Cookies</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              MyChoiceMyWorld uses cookies for the following purposes:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li><span className="font-medium text-gray-900 dark:text-white">Essential:</span> Required for the platform to function properly, including authentication, security, and session management.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Analytics:</span> Help us understand how visitors interact with our platform, which pages are most popular, and how users navigate between features.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Preferences:</span> Remember your settings such as language, location, currency, and display preferences across sessions.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Marketing:</span> Used to deliver relevant advertisements and measure the effectiveness of our marketing campaigns.</li>
            </ul>
          </section>

          {/* Types of Cookies We Use */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. Types of Cookies We Use</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Below is a summary of the cookies used on our platform:
            </p>
            <div className="mt-4 overflow-x-auto">
              <table className="w-full text-left text-sm">
                <thead>
                  <tr className="border-b border-gray-200 dark:border-gray-700">
                    <th className="pb-3 pr-4 font-semibold text-gray-900 dark:text-white">Cookie Name</th>
                    <th className="pb-3 pr-4 font-semibold text-gray-900 dark:text-white">Purpose</th>
                    <th className="pb-3 font-semibold text-gray-900 dark:text-white">Duration</th>
                  </tr>
                </thead>
                <tbody className="text-gray-600 dark:text-gray-300">
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-sm text-gray-500 dark:text-gray-400">session_id</td>
                    <td className="py-3 pr-4">Maintains your login session and authentication state</td>
                    <td className="py-3">Session</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-sm text-gray-500 dark:text-gray-400">csrf_token</td>
                    <td className="py-3 pr-4">Protects against cross-site request forgery attacks</td>
                    <td className="py-3">Session</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-sm text-gray-500 dark:text-gray-400">location_pref</td>
                    <td className="py-3 pr-4">Stores your selected location for nearby vendor results</td>
                    <td className="py-3">30 days</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-sm text-gray-500 dark:text-gray-400">cookie_consent</td>
                    <td className="py-3 pr-4">Records your cookie consent preferences</td>
                    <td className="py-3">1 year</td>
                  </tr>
                  <tr className="border-b border-gray-200 dark:border-gray-800">
                    <td className="py-3 pr-4 font-mono text-sm text-gray-500 dark:text-gray-400">_ga</td>
                    <td className="py-3 pr-4">Google Analytics — distinguishes unique visitors</td>
                    <td className="py-3">2 years</td>
                  </tr>
                  <tr>
                    <td className="py-3 pr-4 font-mono text-sm text-gray-500 dark:text-gray-400">_fbp</td>
                    <td className="py-3 pr-4">Facebook Pixel — tracks conversions from ads</td>
                    <td className="py-3">90 days</td>
                  </tr>
                </tbody>
              </table>
            </div>
          </section>

          {/* Managing Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Managing Cookies</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              You can control and manage cookies in several ways. Most web browsers allow you to view, delete, and block cookies through your browser settings. Please note that disabling certain cookies may affect the functionality of our platform — for example, you may not be able to stay logged in or save your location preferences.
            </p>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              To manage cookies in your browser, visit your browser's help or settings menu. You can also opt out of analytics tracking by using tools such as the Google Analytics Opt-out Browser Add-on. For marketing cookies, you may adjust your preferences through the cookie consent banner displayed when you first visit our platform.
            </p>
          </section>

          {/* Third-Party Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Third-Party Cookies</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Some cookies on our platform are set by third-party services that appear on our pages. These include analytics providers (such as Google Analytics), advertising networks (such as Facebook), and payment processors. We do not control these third-party cookies, and their use is governed by the privacy policies of those respective services. We recommend reviewing their policies to understand how your data is handled.
            </p>
          </section>

          {/* Updates to This Policy */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Updates to This Policy</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              We may update this Cookie Policy from time to time to reflect changes in our practices, technologies, or legal requirements. When we make changes, we will update the "Last updated" date at the top of this page. We encourage you to review this policy periodically to stay informed about how we use cookies.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Contact Us</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about our use of cookies or this Cookie Policy, please contact us at{' '}
              <a href="mailto:support@mychoice.com" className="font-medium text-primary-600 hover:text-primary-500">
                support@mychoice.com
              </a>.
            </p>
          </section>
        </div>
      </div>
    </div>
  )
}
