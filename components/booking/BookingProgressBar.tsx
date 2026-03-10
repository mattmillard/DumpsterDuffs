"use client";

import Link from "next/link";
import { ReactNode } from "react";

interface BookingProgressBarProps {
  currentStep: number;
  totalSteps: number;
  steps: Array<{ name: string; label: string }>;
}

export function BookingProgressBar({
  currentStep,
  totalSteps,
  steps,
}: BookingProgressBarProps) {
  const progressPercent = ((currentStep + 1) / totalSteps) * 100;

  return (
    <div className="mb-8">
      {/* Visual progress bar */}
      <div className="mb-4">
        <div className="h-1 bg-[#404040] rounded-full overflow-hidden">
          <div
            className="h-full bg-primary transition-all duration-300"
            style={{ width: `${progressPercent}%` }}
          />
        </div>
      </div>

      {/* Step labels */}
      <div className="flex justify-between items-start">
        {steps.map((step, idx) => (
          <div key={step.name} className="flex flex-col items-center flex-1">
            {/* Step circle */}
            <div
              className={`w-8 h-8 rounded-full flex items-center justify-center font-semibold text-sm mb-2 transition-colors ${
                idx <= currentStep
                  ? "bg-primary text-white"
                  : "bg-[#404040] text-[#999999]"
              }`}
            >
              {idx + 1}
            </div>
            {/* Step label */}
            <span
              className={`text-xs font-semibold text-center ${
                idx <= currentStep ? "text-white" : "text-[#999999]"
              }`}
            >
              {step.label}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
}

interface BookingContainerProps {
  children: ReactNode;
  showHeader?: boolean;
  title?: string;
  description?: string;
}

export function BookingContainer({
  children,
  showHeader = true,
  title,
  description,
}: BookingContainerProps) {
  return (
    <div className="min-h-screen bg-[#0F0F0F] py-8 md:py-12 lg:py-16 px-4 md:px-6">
      <div className="max-w-3xl mx-auto">
        {/* Header section */}
        {showHeader && (
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              {title || "Book Your Dumpster"}
            </h1>
            {description && (
              <p className="text-lg text-[#999999] max-w-2xl mx-auto">
                {description}
              </p>
            )}
          </div>
        )}

        {/* Main content */}
        <div className="card p-8 md:p-10">{children}</div>

        <div className="mt-6 text-center">
          <Link
            href="/"
            className="text-sm text-[#999999] hover:text-white transition-colors"
          >
            ← Back to Home
          </Link>
        </div>
      </div>
    </div>
  );
}
