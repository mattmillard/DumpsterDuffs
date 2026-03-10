import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Terms of Service | Dumpster Duffs",
  description:
    "Read the terms and conditions for using Dumpster Duffs services.",
};

export default function TermsPage() {
  return (
    <div className="min-h-screen bg-white">
      <div className="max-w-4xl mx-auto px-4 py-12 sm:px-6 lg:px-8">
        <h1 className="text-4xl font-bold text-gray-900 mb-8">
          Terms of Service
        </h1>

        <div className="prose prose-lg max-w-none">
          <p className="text-gray-600 mb-8">
            <strong>Last Updated:</strong> March 9, 2026
          </p>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              1. Acceptance of Terms
            </h2>
            <p className="text-gray-700">
              By accessing and using Dumpster Duffs services, you accept and
              agree to be bound by the terms and provisions of this agreement.
              If you do not agree to these terms, please do not use our
              services.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              2. Service Description
            </h2>
            <p className="text-gray-700 mb-4">
              Dumpster Duffs provides dumpster rental and junk removal services
              in the Knoxville, TN area. Our services include:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Residential and commercial dumpster rentals</li>
              <li>Full-service junk removal</li>
              <li>Delivery, pickup, and disposal services</li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              3. Booking and Payment
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>3.1 Booking:</strong> All bookings are subject to
              availability and confirmation. We reserve the right to refuse
              service at our discretion.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>3.2 Payment:</strong> Payment is due at the time of
              booking or upon service completion as specified. We accept major
              credit cards and other payment methods as listed on our website.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>3.3 Pricing:</strong> Prices are subject to change. Quoted
              prices are valid for the specified service period and may vary
              based on location, dumpster size, and rental duration.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              4. Cancellation and Refunds
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>4.1 Cancellation:</strong> Cancellations must be made at
              least 24 hours before the scheduled delivery/pickup time. Late
              cancellations may incur a fee.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>4.2 Refunds:</strong> Refunds will be processed according
              to our cancellation policy. Service fees and processing charges
              may be non-refundable.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              5. Customer Responsibilities
            </h2>
            <p className="text-gray-700 mb-4">As a customer, you agree to:</p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Provide accurate delivery location and access information</li>
              <li>
                Ensure the placement area is clear and accessible for our
                vehicles
              </li>
              <li>
                Only dispose of permitted materials (no hazardous waste,
                chemicals, paint, tires, batteries, or appliances with freon)
              </li>
              <li>Not exceed the weight limit or fill line of the dumpster</li>
              <li>
                Obtain any necessary permits for street placement of dumpsters
              </li>
              <li>
                Be present or designate a representative for junk removal
                services
              </li>
            </ul>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              6. Prohibited Materials
            </h2>
            <p className="text-gray-700 mb-4">
              The following materials are strictly prohibited in our dumpsters:
            </p>
            <ul className="list-disc pl-6 text-gray-700 mb-4 space-y-2">
              <li>Hazardous waste and chemicals</li>
              <li>Paint and solvents</li>
              <li>Batteries and electronics</li>
              <li>Tires and automotive fluids</li>
              <li>Appliances with freon</li>
              <li>Medical waste</li>
              <li>Asbestos or contaminated materials</li>
            </ul>
            <p className="text-gray-700">
              Additional fees and charges will apply if prohibited materials are
              found in the dumpster.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              7. Rental Period and Extensions
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>7.1 Rental Period:</strong> Standard rental periods are 7
              days for dumpsters. Extensions are available for an additional
              fee.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>7.2 Early Pickup:</strong> Customers may request early
              pickup, but no refunds are provided for unused rental days.
            </p>
            <p className="text-gray-700">
              <strong>7.3 Late Returns:</strong> Late returns are subject to
              additional daily rental fees.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              8. Property Damage and Liability
            </h2>
            <p className="text-gray-700 mb-4">
              <strong>8.1 Customer Liability:</strong> Customers are responsible
              for any damage to the dumpster during the rental period.
            </p>
            <p className="text-gray-700 mb-4">
              <strong>8.2 Surface Protection:</strong> We recommend using
              plywood or boards under the dumpster to protect driveways and
              surfaces. Dumpster Duffs is not liable for surface damage unless
              caused by gross negligence.
            </p>
            <p className="text-gray-700">
              <strong>8.3 Insurance:</strong> Customers should verify their
              property insurance coverage includes dumpster placement.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              9. Limitation of Liability
            </h2>
            <p className="text-gray-700">
              Dumpster Duffs shall not be liable for any indirect, incidental,
              special, consequential, or punitive damages arising from the use
              of our services. Our total liability shall not exceed the amount
              paid for the service in question.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              10. Service Delays and Interruptions
            </h2>
            <p className="text-gray-700">
              We strive to meet all scheduled delivery and pickup times, but are
              not liable for delays caused by weather, traffic, equipment
              failure, or other circumstances beyond our control.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              11. Dispute Resolution
            </h2>
            <p className="text-gray-700">
              Any disputes arising from these terms shall be resolved through
              binding arbitration in Knox County, Tennessee, in accordance with
              Tennessee law.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              12. Changes to Terms
            </h2>
            <p className="text-gray-700">
              We reserve the right to modify these terms at any time. Continued
              use of our services after changes constitutes acceptance of the
              updated terms.
            </p>
          </section>

          <section className="mb-8">
            <h2 className="text-2xl font-semibold text-gray-900 mb-4">
              13. Contact Information
            </h2>
            <p className="text-gray-700 mb-4">
              For questions about these Terms of Service, please contact us:
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
