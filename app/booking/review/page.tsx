"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookingProgressBar,
  BookingContainer,
} from "@/components/booking/BookingProgressBar";
import {
  BookingDetailsPanel,
  PriceSummary,
} from "@/components/booking/PriceSummary";
import { FormActions } from "@/components/booking/FormComponents";
import {
  calculatePriceEstimate,
  calculatePickupDate,
} from "@/lib/utils/pricing";
import { BookingFormData, DumpsterSizeOption } from "@/types/booking";

const STEPS = [
  { name: "size", label: "Size" },
  { name: "dates", label: "Dates" },
  { name: "address", label: "Address" },
  { name: "details", label: "Info" },
  { name: "review", label: "Review" },
];

export default function BookingReviewPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [sizes, setSizes] = useState<DumpsterSizeOption[]>([]);
  const [bookingData, setBookingData] = useState<Partial<BookingFormData>>({});

  useEffect(() => {
    async function loadReviewData() {
      const response = await fetch("/api/public/sizes", { cache: "no-store" });
      const liveSizes = (await response.json()) as DumpsterSizeOption[];
      setSizes(liveSizes || []);

      const sizeId = sessionStorage.getItem("booking_size_id");
      if (!sizeId) {
        router.push("/booking");
        return;
      }

      const deliveryDate =
        sessionStorage.getItem("booking_delivery_date") || "";
      const rentalDays = parseInt(
        sessionStorage.getItem("booking_rental_days") || "3",
      );
      const addressLine1 =
        sessionStorage.getItem("booking_address_line1") || "";
      const addressLine2 =
        sessionStorage.getItem("booking_address_line2") || "";
      const city = sessionStorage.getItem("booking_city") || "";
      const state = sessionStorage.getItem("booking_state") || "MO";
      const zip = sessionStorage.getItem("booking_zip") || "";
      const fullName = sessionStorage.getItem("booking_full_name") || "";
      const email = sessionStorage.getItem("booking_email") || "";
      const phone = sessionStorage.getItem("booking_phone") || "";
      const company = sessionStorage.getItem("booking_company") || "";
      const notes = sessionStorage.getItem("booking_notes") || "";

      const selectedSize = liveSizes.find((size) => size.id === sizeId);
      const priceEstimate = selectedSize
        ? calculatePriceEstimate(selectedSize, rentalDays)
        : null;
      const pickupDate = calculatePickupDate(deliveryDate, rentalDays);

      const data: Partial<BookingFormData> = {
        dumpster_size_id: sizeId,
        delivery_date: deliveryDate,
        pickup_date: pickupDate,
        rental_duration_days: rentalDays,
        delivery_address_line_1: addressLine1,
        delivery_address_line_2: addressLine2,
        delivery_city: city,
        delivery_state: state,
        delivery_zip: zip,
        customer_full_name: fullName,
        customer_email: email,
        customer_phone: phone,
        customer_company: company,
        placement_notes: notes,
        subtotal: priceEstimate?.subtotal || 0,
        delivery_fee: priceEstimate?.deliveryFee || 0, // Map from camelCase to snake_case
        tax: priceEstimate?.tax || 0,
        total: priceEstimate?.total || 0,
      };

      setBookingData(data);
    }

    loadReviewData();
  }, [router]);

  const handleBack = () => {
    router.push("/booking/details");
  };

  const handleEdit = (step: string) => {
    router.push(`/booking/${step}`);
  };

  const handleCheckout = async () => {
    setError("");
    setIsLoading(true);
    try {
      // Validate availability and blacklist before proceeding
      const checkResponse = await fetch("/api/public/booking-check", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          delivery_date: bookingData.delivery_date,
          size_yards: selectedSize?.size_yards,
          customer_phone: bookingData.customer_phone,
          customer_email: bookingData.customer_email,
          customer_name: bookingData.customer_full_name,
          delivery_address_line_1: bookingData.delivery_address_line_1,
        }),
      });

      const checkResult = await checkResponse.json();

      if (!checkResult.bookable) {
        setError(
          checkResult.message ||
            "This date/size combination is not available. Please select a different date.",
        );
        setIsLoading(false);
        return;
      }

      // TODO: Integrate with Stripe checkout
      // For now, show a placeholder
      console.log("Booking data:", bookingData);

      // In production, this would:
      // 1. Create booking record in database
      // 2. Initialize Stripe payment
      // 3. Redirect to Stripe or payment page

      // Placeholder: just show confirmation
      alert(
        "Checkout flow would be initiated here. Stripe integration coming next!",
      );

      // Simulate successful booking
      sessionStorage.clear();
      router.push("/booking-confirmation?booking_id=demo-123");
    } catch (err) {
      setError("Error processing checkout. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  const selectedSize = sizes.find((s) => s.id === bookingData.dumpster_size_id);

  return (
    <BookingContainer
      title="Review Your Booking"
      description="Please verify all details are correct before proceeding to payment."
      showHeader={true}
    >
      <BookingProgressBar
        currentStep={4}
        totalSteps={STEPS.length}
        steps={STEPS}
      />

      <div className="grid md:grid-cols-3 gap-8">
        {/* Details */}
        <div className="md:col-span-2">
          <BookingDetailsPanel
            booking={bookingData}
            size={selectedSize}
            onEdit={handleEdit}
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4 mt-6">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        {/* Price Summary */}
        {selectedSize && (
          <div className="md:col-span-1">
            <div className="sticky top-6">
              <PriceSummary
                size={selectedSize}
                rentalDays={bookingData.rental_duration_days}
                deliveryFee={bookingData.delivery_fee}
                subtotal={bookingData.subtotal}
                tax={bookingData.tax}
                total={bookingData.total}
              />

              <button
                onClick={handleCheckout}
                disabled={isLoading}
                className="btn-primary w-full mt-6 py-4 text-lg font-bold"
              >
                {isLoading ? (
                  <>
                    <svg
                      className="animate-spin -ml-1 mr-2 h-4 w-4 inline"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Processing...
                  </>
                ) : (
                  `Proceed to Checkout - ${(bookingData.total || 0).toLocaleString("en-US", { style: "currency", currency: "USD" })}`
                )}
              </button>
            </div>
          </div>
        )}
      </div>

      <div className="mt-8">
        <FormActions
          onBack={handleBack}
          nextDisabled={!selectedSize}
          isLoading={isLoading}
        />
      </div>
    </BookingContainer>
  );
}
