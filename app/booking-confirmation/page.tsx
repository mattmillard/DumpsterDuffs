"use client";

import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { Suspense } from "react";

function BookingConfirmationContent() {
  const searchParams = useSearchParams();
  const bookingId = searchParams.get("booking_id");

  return (
    <div className="min-h-screen bg-[#0F0F0F] py-12 md:py-16 lg:py-20 px-4 md:px-6 flex items-center justify-center">
      <div className="max-w-2xl w-full">
        <div className="card p-8 md:p-12 text-center">
          {/* Success Icon */}
          <div className="mb-6 flex justify-center">
            <div className="w-16 h-16 md:w-20 md:h-20 rounded-full bg-success/20 border-2 border-success flex items-center justify-center">
              <svg
                className="w-8 h-8 md:w-10 md:h-10 text-success"
                fill="currentColor"
                viewBox="0 0 20 20"
              >
                <path
                  fillRule="evenodd"
                  d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z"
                  clipRule="evenodd"
                />
              </svg>
            </div>
          </div>

          <h1 className="text-3xl md:text-4xl font-bold text-white mb-4">
            Booking Confirmed!
          </h1>

          <p className="text-lg text-[#999999] mb-8">
            Thank you for booking with Dumpster Duff's. We're excited to help
            you with your project!
          </p>

          {/* Booking Details */}
          <div className="bg-[#1A1A1A] border border-[#404040] rounded-lg p-6 mb-8 text-left">
            <div className="mb-6">
              <p className="text-xs font-semibold text-primary uppercase mb-1">
                Booking Number
              </p>
              <p className="text-2xl font-bold text-white font-mono">
                {bookingId || "PENDING"}
              </p>
            </div>

            <div className="border-t border-[#404040] pt-6">
              <h3 className="font-bold text-white mb-4">What happens next?</h3>
              <ol className="space-y-3 text-sm text-[#999999]">
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">1.</span>
                  <span>
                    Check your email for a confirmation with all the details
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">2.</span>
                  <span>
                    We'll contact you 24 hours before delivery to confirm
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">3.</span>
                  <span>
                    Sit back and relax—we'll handle the heavy lifting!
                  </span>
                </li>
                <li className="flex items-start">
                  <span className="text-primary font-bold mr-3">4.</span>
                  <span>We'll pick up your dumpster on the scheduled date</span>
                </li>
              </ol>
            </div>
          </div>

          {/* CTA Buttons */}
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link href="/" className="btn-primary flex-1">
              Back to Home
            </Link>
            <Link href="/faq" className="btn-secondary flex-1">
              View FAQs
            </Link>
          </div>

          {/* Support Note */}
          <p className="text-xs text-[#999999] mt-8 border-t border-[#404040] pt-6">
            Questions? Contact us at{" "}
            <Link
              href="/contact"
              className="text-primary hover:text-primary-light"
            >
              contact us
            </Link>{" "}
            or call our team.
          </p>
        </div>
      </div>
    </div>
  );
}

export default function BookingConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-[#0F0F0F] py-12 md:py-16 lg:py-20 px-4 md:px-6 flex items-center justify-center">
          <div className="text-white">Loading...</div>
        </div>
      }
    >
      <BookingConfirmationContent />
    </Suspense>
  );
}
