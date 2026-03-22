// @ts-nocheck
import { Link } from 'react-router-dom'

export default function TermsOfService() {
  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Terms of Service</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: March 2026</p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-900 p-8 space-y-10">
          {/* Agreement to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">1. Agreement to Terms</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              By accessing or using the MyChoiceMyWorld platform, you agree to be bound by these Terms of Service and all applicable laws and regulations. If you do not agree with any of these terms, you are prohibited from using or accessing this site. These terms apply to all visitors, users, and others who access the service, including customers, vendors, and casual browsers.
            </p>
          </section>

          {/* Description of Service */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">2. Description of Service</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              MyChoiceMyWorld is a marketplace platform that connects customers with local fashion vendors. Our service enables users to discover nearby boutiques, browse curated fashion collections, reserve products for in-store try-ons, and receive AI-powered style recommendations. We act as an intermediary platform and do not own, manufacture, or directly sell the products listed by vendors.
            </p>
          </section>

          {/* User Accounts */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">3. User Accounts</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              To access certain features, you must create an account. When registering, you agree to provide accurate, current, and complete information and to update it as necessary. You are responsible for safeguarding your password and for all activities that occur under your account. Notify us immediately if you suspect unauthorized access. You must be at least 18 years old, or the age of majority in your jurisdiction, to create an account and use our services.
            </p>
          </section>

          {/* Reservations */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">4. Reservations</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              MyChoiceMyWorld allows you to reserve products at local vendors for in-store visits. Reservations are subject to product availability and vendor confirmation. Reservations that are not fulfilled within the vendor's specified timeframe will automatically expire. Cancellation policies vary by vendor and are displayed at the time of reservation. Repeated no-shows or cancellations may result in restrictions on your account. MyChoiceMyWorld is not responsible for vendor-side issues such as product unavailability or store closures.
            </p>
          </section>

          {/* Vendor Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">5. Vendor Terms</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Vendors on MyChoiceMyWorld are responsible for the accuracy of their product listings, including descriptions, pricing, images, and availability. Vendors must maintain the quality standards expected by our community and comply with all applicable local laws and regulations. Each vendor sets their own store policies regarding returns, exchanges, and reservation handling. MyChoiceMyWorld reserves the right to remove vendor listings or suspend vendor accounts that violate these terms or receive consistent negative feedback.
            </p>
          </section>

          {/* Prohibited Activities */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">6. Prohibited Activities</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              You agree not to engage in any of the following activities:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li>Fraud, impersonation, or misrepresentation of your identity or affiliation.</li>
              <li>Harassment, abuse, or threatening behavior toward other users, vendors, or staff.</li>
              <li>Posting fake reviews, ratings, or misleading information about products or vendors.</li>
              <li>Attempting to circumvent the platform to conduct transactions outside of MyChoiceMyWorld.</li>
              <li>Using automated bots, scrapers, or other unauthorized tools to access the platform.</li>
              <li>Uploading malicious content, viruses, or code intended to disrupt the service.</li>
            </ul>
          </section>

          {/* Intellectual Property */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">7. Intellectual Property</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              All content on the MyChoiceMyWorld platform, including but not limited to text, graphics, logos, icons, images, audio, video, software, and the compilation thereof, is the property of MyChoiceMyWorld or its content suppliers and is protected by international copyright and intellectual property laws. Vendors retain ownership of their product images and descriptions but grant MyChoiceMyWorld a non-exclusive license to display and promote them on the platform.
            </p>
          </section>

          {/* Limitation of Liability */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">8. Limitation of Liability</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              To the fullest extent permitted by applicable law, MyChoiceMyWorld shall not be liable for any indirect, incidental, special, consequential, or punitive damages, or any loss of profits or revenues, whether incurred directly or indirectly, or any loss of data, use, goodwill, or other intangible losses resulting from your access to or use of the service. MyChoiceMyWorld does not guarantee the quality, safety, or legality of items listed by vendors and is not a party to transactions between customers and vendors.
            </p>
          </section>

          {/* Dispute Resolution */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">9. Dispute Resolution</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Any disputes arising out of or relating to these terms or the use of the platform shall first be resolved through good-faith negotiation between the parties. If a resolution cannot be reached, the dispute shall be submitted to binding arbitration in accordance with the rules of the applicable arbitration authority in the jurisdiction where MyChoiceMyWorld operates. You agree that any dispute resolution proceedings will be conducted on an individual basis and not in a class, consolidated, or representative action.
            </p>
          </section>

          {/* Changes to Terms */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">10. Changes to Terms</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              We reserve the right to modify or replace these Terms of Service at any time. When we make material changes, we will notify you by updating the "Last updated" date at the top of this page and, where appropriate, sending you a notification via email or through the platform. Your continued use of the service after any changes constitutes acceptance of the new terms. We encourage you to review these terms periodically.
            </p>
          </section>

          {/* Contact Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">11. Contact Information</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions about these Terms of Service, please contact us at{' '}
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
