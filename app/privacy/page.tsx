import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Privacy Policy | Dumpster Duffs",
  description:
    "Learn how Dumpster Duffs collects, uses, and protects your personal information.",
};

export default function PrivacyPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Privacy Policy
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> March 9, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Information We Collect
            </h2>
            <p className="text-gray-700 mb-4">
              At Dumpster Duffs, we collect information that you provide
              directly to us when you:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Request a quote or make a booking</li>
              <li>Contact us through our website or phone</li>
              <li>Subscribe to our newsletter or promotions</li>
              <li>Create an account on our website</li>
            </ul>
            <p className="text-gray-700">
              This information may include your name, email address, phone
              number, service address, and payment information.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. How We Use Your Information
            </h2>
            <p className="text-gray-700 mb-4">
              We use the information we collect to:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Process and fulfill your dumpster rental bookings</li>
              <li>Send booking confirmations and service updates</li>
              <li>Respond to your inquiries and provide customer support</li>
              <li>Improve our services and customer experience</li>
              <li>Send promotional communications (with your consent)</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Information Sharing
            </h2>
            <p className="text-gray-700 mb-4">
              We do not sell, trade, or rent your personal information to third
              parties. We may share your information with:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>
                Service providers who assist in operating our business (e.g.,
                payment processors, email services)
              </li>
              <li>Law enforcement when required by law</li>
              <li>Business partners only with your explicit consent</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Data Security
            </h2>
            <p className="text-gray-700">
              We implement appropriate technical and organizational measures to
              protect your personal information against unauthorized access,
              alteration, disclosure, or destruction. However, no method of
              transmission over the internet is 100% secure, and we cannot
              guarantee absolute security.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Cookies and Tracking
            </h2>
            <p className="text-gray-700">
              Our website uses cookies and similar tracking technologies to
              enhance your browsing experience, analyze site traffic, and
              understand where our visitors are coming from. You can control
              cookies through your browser settings.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Your Rights
            </h2>
            <p className="text-gray-700 mb-4">You have the right to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Access the personal information we hold about you</li>
              <li>Request correction of inaccurate information</li>
              <li>Request deletion of your personal information</li>
              <li>Opt-out of marketing communications</li>
              <li>Object to processing of your personal information</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Children's Privacy
            </h2>
            <p className="text-gray-700">
              Our services are not directed to individuals under the age of 18.
              We do not knowingly collect personal information from children.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Changes to This Policy
            </h2>
            <p className="text-gray-700">
              We may update this Privacy Policy from time to time. We will
              notify you of any changes by posting the new Privacy Policy on
              this page and updating the "Last Updated" date.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Contact Us
            </h2>
            <p className="text-gray-700 mb-4">
              If you have any questions about this Privacy Policy or our data
              practices, please contact us:
            </p>
            <div className="bg-gray-50 p-6 rounded-lg">
              <p className="text-gray-700 mb-2">
                <strong>Dumpster Duffs</strong>
              </p>
              <p className="text-gray-700 mb-2">
                Email:{" "}
                <a
                  href="mailto:dustin@dumpsterduffs.com"
                  className="text-[#FF6B35] hover:underline"
                >
                  dustin@dumpsterduffs.com
                </a>
              </p>
              <p className="text-gray-700">
                Phone:{" "}
                <a
                  href="tel:8653148929"
                  className="text-[#FF6B35] hover:underline"
                >
                  (865) 314-8929
                </a>
              </p>
            </div>
          </section>
        </div>
      </div>
    </div>
  );
}
