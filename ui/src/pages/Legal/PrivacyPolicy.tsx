// @ts-nocheck
import { Link } from 'react-router-dom'

export default function PrivacyPolicy() {
  return (
    <div className="bg-gray-50 dark:bg-dark">
      <div className="mx-auto max-w-4xl px-4 py-16 sm:px-6 sm:py-24 lg:px-8">
        <div className="mb-8">
          <h1 className="text-3xl font-bold tracking-tight text-gray-900 dark:text-white sm:text-4xl">Privacy Policy</h1>
          <p className="mt-2 text-sm text-gray-500 dark:text-gray-400">Last updated: March 2026</p>
        </div>

        <div className="rounded-xl bg-white dark:bg-gray-900 p-8 space-y-10">
          {/* Introduction */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Introduction</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Welcome to MyChoiceMyWorld. We are committed to protecting your privacy and ensuring the security of your personal information. This Privacy Policy explains how we collect, use, disclose, and safeguard your data when you use our marketplace platform, which connects customers with local fashion vendors. By accessing or using our services, you agree to the practices described in this policy.
            </p>
          </section>

          {/* Information We Collect */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Information We Collect</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              We collect several types of information to provide and improve our services:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li><span className="font-medium text-gray-900 dark:text-white">Personal Information:</span> Name, email address, phone number, and billing details provided during account registration or checkout.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Usage Data:</span> Browsing history, search queries, product views, wishlists, and interactions with vendor stores on our platform.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Location Data:</span> Approximate or precise geographic location used to show nearby vendors and products relevant to your area.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Device Information:</span> Browser type, operating system, device identifiers, IP address, and screen resolution to optimize your experience.</li>
            </ul>
          </section>

          {/* How We Use Your Information */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">How We Use Your Information</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              The information we collect is used for the following purposes:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li><span className="font-medium text-gray-900 dark:text-white">Provide Services:</span> Facilitate product discovery, reservations, and communication between you and local vendors.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Improve Experience:</span> Personalize recommendations, optimize search results, and enhance platform features based on usage patterns.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Communications:</span> Send order confirmations, reservation updates, promotional offers, and important service announcements.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">AI Matching:</span> Power our Find My Match feature to suggest products that suit your style preferences and occasion needs.</li>
            </ul>
          </section>

          {/* Information Sharing */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Information Sharing</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              We do not sell your personal information. We may share your data in the following circumstances:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li><span className="font-medium text-gray-900 dark:text-white">With Vendors:</span> When you make a reservation, we share relevant details (name, contact, reservation specifics) with the vendor to fulfill your request.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Service Providers:</span> Trusted third-party services that help us operate the platform, including payment processors, cloud hosting, and analytics providers.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Legal Requirements:</span> When required by law, regulation, legal process, or governmental request, or to protect the rights and safety of our users and platform.</li>
            </ul>
          </section>

          {/* Data Security */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Data Security</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              We implement industry-standard security measures to protect your personal information. All data transmissions are encrypted using SSL/TLS protocols. Your account credentials are securely hashed and stored. We conduct regular security audits and employ access controls to prevent unauthorized access to your data. However, no method of electronic transmission or storage is completely secure, and we cannot guarantee absolute security.
            </p>
          </section>

          {/* Your Rights */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Your Rights</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Depending on your jurisdiction, you may have the following rights regarding your personal data:
            </p>
            <ul className="mt-4 list-disc list-inside space-y-2 text-gray-600 dark:text-gray-300">
              <li><span className="font-medium text-gray-900 dark:text-white">Access:</span> Request a copy of the personal information we hold about you.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Correction:</span> Request that we update or correct inaccurate or incomplete data.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Deletion:</span> Request the deletion of your personal data, subject to legal retention obligations.</li>
              <li><span className="font-medium text-gray-900 dark:text-white">Opt-Out:</span> Unsubscribe from marketing communications at any time via the link in our emails or through your account settings.</li>
            </ul>
          </section>

          {/* Cookies */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Cookies</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              We use cookies and similar tracking technologies to enhance your browsing experience, analyze site traffic, and personalize content. For detailed information on the cookies we use and how to manage them, please refer to our{' '}
              <Link to="/cookies" className="font-medium text-primary-600 hover:text-primary-500">
                Cookie Policy
              </Link>.
            </p>
          </section>

          {/* Location Data */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Location Data</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              MyChoiceMyWorld uses your location to display nearby vendors, products, and stores relevant to your area. Location data helps us provide distance-based search results and local recommendations. You can control location sharing through your browser or device settings at any time. Disabling location services may limit certain features, such as distance-based filtering and nearby vendor discovery.
            </p>
          </section>

          {/* AI & Photo Matching */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">AI & Photo Matching</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              Our Find My Match feature allows you to upload a selfie or photo to receive personalized outfit recommendations. Photos are processed in real-time by our AI models to analyze style preferences, body type, and occasion suitability. Your photos are not permanently stored on our servers — they are processed temporarily and discarded after generating recommendations. We do not use your photos for training AI models or share them with third parties.
            </p>
          </section>

          {/* Contact Us */}
          <section>
            <h2 className="text-xl font-semibold text-gray-900 dark:text-white">Contact Us</h2>
            <p className="mt-3 text-gray-600 dark:text-gray-300 leading-relaxed">
              If you have any questions, concerns, or requests regarding this Privacy Policy or the handling of your personal data, please contact us at{' '}
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
