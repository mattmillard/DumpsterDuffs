"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import { trackFormStep } from "@/lib/utils/analytics";
import {
  BookingProgressBar,
  BookingContainer,
} from "@/components/booking/BookingProgressBar";
import {
  FormInput,
  FormTextarea,
  FormActions,
} from "@/components/booking/FormComponents";
import { maskPhoneInput } from "@/lib/utils/formatting";

const STEPS = [
  { name: "size", label: "Size" },
  { name: "dates", label: "Dates" },
  { name: "address", label: "Address" },
  { name: "details", label: "Info" },
  { name: "review", label: "Review" },
];

export default function BookingDetailsPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState("");
  const [fullName, setFullName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [company, setCompany] = useState("");
  const [notes, setNotes] = useState("");

  useEffect(() => {
    const sizeId = sessionStorage.getItem("booking_size_id");
    if (!sizeId) {
      router.push("/booking");
    }
  }, [router]);

  const handleBack = () => {
    router.push("/booking/address");
  };

  const handleContinue = async () => {
    setError("");

    if (!fullName || !email || !phone) {
      setError("Please fill in all required fields");
      return;
    }

    setIsLoading(true);
    try {
      sessionStorage.setItem("booking_full_name", fullName);
      sessionStorage.setItem("booking_email", email);
      sessionStorage.setItem("booking_phone", phone);
      sessionStorage.setItem("booking_company", company);
      sessionStorage.setItem("booking_notes", notes);

      // Track form step
      trackFormStep("booking", 4, "details");

      router.push("/booking/review");
    } catch (err) {
      setError("Error saving details. Please try again.");
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookingContainer
      title="Your Information"
      description="Let's confirm your contact details so we can reach you about your delivery."
      showHeader={true}
    >
      <BookingProgressBar
        currentStep={3}
        totalSteps={STEPS.length}
        steps={STEPS}
      />

      <div className="max-w-2xl">
        <div className="space-y-6">
          <FormInput
            label="Full Name"
            name="name"
            autoComplete="name"
            value={fullName}
            onChange={(e) => setFullName(e.target.value)}
            placeholder="John Smith"
            required
          />

          <FormInput
            label="Email Address"
            type="email"
            name="email"
            autoComplete="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="john@example.com"
            required
          />

          <FormInput
            label="Phone Number"
            type="tel"
            name="tel"
            autoComplete="tel"
            value={phone}
            onChange={(e) => setPhone(maskPhoneInput(e.target.value))}
            placeholder="(555) 123-4567"
            maxLength={14}
            required
          />

          <FormInput
            label="Company Name (Optional)"
            name="organization"
            autoComplete="organization"
            value={company}
            onChange={(e) => setCompany(e.target.value)}
            placeholder="Your Company"
          />

          <FormTextarea
            label="Placement Notes (Optional)"
            value={notes}
            onChange={(e) => setNotes(e.target.value)}
            placeholder="Any special instructions for delivery? (e.g., placement location, gates, access restrictions)"
            rows={4}
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
          nextLabel="Review & Checkout"
          isLoading={isLoading}
        />
      </div>
    </BookingContainer>
  );
}
