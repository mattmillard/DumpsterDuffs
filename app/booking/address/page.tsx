"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookingProgressBar,
  BookingContainer,
} from "@/components/booking/BookingProgressBar";
import { FormInput, FormActions } from "@/components/booking/FormComponents";

const STEPS = [
  { name: "size", label: "Size" },
  { name: "dates", label: "Dates" },
  { name: "address", label: "Address" },
  { name: "details", label: "Info" },
  { name: "review", label: "Review" },
];

export default function BookingAddressPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [addressLine1, setAddressLine1] = useState("");
  const [addressLine2, setAddressLine2] = useState("");
  const [city, setCity] = useState("");
  const [state, setState] = useState("MO");
  const [zip, setZip] = useState("");

  useEffect(() => {
    const sizeId = sessionStorage.getItem("booking_size_id");
    if (!sizeId) {
      router.push("/booking");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/booking/dates");
  };

  const handleContinue = async () => {
    setError("");

    if (!addressLine1 || !city || !state || !zip) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      sessionStorage.setItem("booking_address_line1", addressLine1);
      sessionStorage.setItem("booking_address_line2", addressLine2);
      sessionStorage.setItem("booking_city", city);
      sessionStorage.setItem("booking_state", state);
      sessionStorage.setItem("booking_zip", zip);

      router.push("/booking/details");
    } catch (err) {
      setError("Error saving address. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookingContainer
      title="Delivery Address"
      description="Where should we deliver your dumpster?"
      showHeader={true}
    >
      <BookingProgressBar
        currentStep={2}
        totalSteps={STEPS.length}
        steps={STEPS}
      />

      <div className="max-w-2xl">
        <div className="space-y-6">
          <FormInput
            label="Street Address"
            name="address-line1"
            autoComplete="address-line1"
            value={addressLine1}
            onChange={(e) => setAddressLine1(e.target.value)}
            placeholder="123 Main Street"
            required
          />

          <FormInput
            label="Apartment, Suite, etc."
            name="address-line2"
            autoComplete="address-line2"
            value={addressLine2}
            onChange={(e) => setAddressLine2(e.target.value)}
            placeholder="Apt 4B (optional)"
          />

          <div className="grid md:grid-cols-2 gap-6">
            <FormInput
              label="City"
              name="address-level2"
              autoComplete="address-level2"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              placeholder="Columbia"
              required
            />

            <FormInput
              label="State"
              name="address-level1"
              autoComplete="address-level1"
              value={state}
              onChange={(e) => setState(e.target.value.toUpperCase())}
              maxLength={2}
              required
            />
          </div>

          <FormInput
            label="ZIP Code"
            name="postal-code"
            autoComplete="postal-code"
            value={zip}
            onChange={(e) => setZip(e.target.value)}
            placeholder="65201"
            pattern="[0-9]{5}(-[0-9]{4})?"
            required
          />

          {error && (
            <div className="bg-red-500/10 border border-red-500/30 rounded-lg p-4">
              <p className="text-sm text-red-400">{error}</p>
            </div>
          )}
        </div>

        <FormActions
          onBack={handleBack}
          onNext={handleContinue}
          nextLabel="Continue to Details"
          isLoading={isLoading}
        />
      </div>
    </BookingContainer>
  );
}
