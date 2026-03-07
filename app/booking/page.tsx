"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import {
  BookingProgressBar,
  BookingContainer,
} from "@/components/booking/BookingProgressBar";
import { SizeSelection } from "@/components/booking/SizeSelection";
import { FormActions } from "@/components/booking/FormComponents";
import { DumpsterSizeOption } from "@/types/booking";

const STEPS = [
  { name: "size", label: "Size" },
  { name: "dates", label: "Dates" },
  { name: "address", label: "Address" },
  { name: "details", label: "Info" },
  { name: "review", label: "Review" },
];

export default function BookingSizePage() {
  const router = useRouter();
  const [sizes, setSizes] = useState<DumpsterSizeOption[]>([]);
  const [selectedSizeId, setSelectedSizeId] = useState<string | undefined>();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    async function loadSizes() {
      const response = await fetch("/api/public/sizes", { cache: "no-store" });
      const data = (await response.json()) as DumpsterSizeOption[];
      setSizes(data || []);

      // Find first active size as default
      const firstActiveSize = data.find((size) => size.is_active !== false);
      if (firstActiveSize) {
        setSelectedSizeId(firstActiveSize.id);
        sessionStorage.setItem("booking_size_id", firstActiveSize.id);
      } else if (data.length > 0) {
        // Fallback to first size if none are active
        setSelectedSizeId(data[0].id);
        sessionStorage.setItem("booking_size_id", data[0].id);
      }
    }

    loadSizes();
  }, []);

  const handleSelectSize = (sizeId: string) => {
    setSelectedSizeId(sizeId);
  };

  const handleContinue = async () => {
    if (!selectedSizeId) return;

    setIsLoading(true);
    try {
      // Store selected size in session/state
      // TODO: Use server action or context to persist state
      sessionStorage.setItem("booking_size_id", selectedSizeId);

      // Navigate to next step
      router.push("/booking/dates");
    } catch (error) {
      console.error("Error selecting size:", error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <BookingContainer
      title="Choose Your Dumpster Size"
      description="Select the right size for your project. Not sure? Our team can help!"
      showHeader={true}
    >
      <BookingProgressBar
        currentStep={0}
        totalSteps={STEPS.length}
        steps={STEPS}
      />

      <div className="mb-8">
        <SizeSelection
          sizes={sizes}
          selectedSizeId={selectedSizeId}
          onSelect={handleSelectSize}
        />
      </div>

      <FormActions
        onNext={handleContinue}
        nextLabel="Continue to Dates"
        nextDisabled={!selectedSizeId}
        isLoading={isLoading}
      />
    </BookingContainer>
  );
}
