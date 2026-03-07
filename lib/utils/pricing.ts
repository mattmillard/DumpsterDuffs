// Pricing calculation logic

import { DumpsterSizeOption, PriceEstimate } from "@/types/booking";

// Mock pricing data - will be replaced with Supabase queries
const tariffRates = {
  tax_rate: 0.07, // 7% tax
  base_delivery_fee: 0,
  zone_fees: {
    downtown: 0,
    suburbs: 35,
    extended: 75,
  },
};

/**
 * Calculate price estimate for a booking
 * TODO: Integrate with actual pricing rules from database
 */
export function calculatePriceEstimate(
  size: DumpsterSizeOption,
  rentalDays: number,
  zone?: string,
): PriceEstimate {
  // Calculate base rental
  const standardDays = 3; // Base rental includes 3 days
  const extraDays = Math.max(0, rentalDays - standardDays);

  let subtotal = size.price_base;
  if (extraDays > 0) {
    subtotal += extraDays * size.price_per_day;
  }

  // Delivery fee based on zone
  let deliveryFee = tariffRates.base_delivery_fee;
  if (zone && zone in tariffRates.zone_fees) {
    deliveryFee +=
      tariffRates.zone_fees[zone as keyof typeof tariffRates.zone_fees];
  }

  // Calculate tax
  const taxBase = subtotal + deliveryFee;
  const tax = taxBase * tariffRates.tax_rate;

  // Total
  const total = taxBase + tax;

  return {
    subtotal: Math.round(subtotal * 100) / 100,
    deliveryFee: Math.round(deliveryFee * 100) / 100, // camelCase to match component props
    tax: Math.round(tax * 100) / 100,
    total: Math.round(total * 100) / 100,
    formula: `Base 3-day rental (${size.price_base}) + Extra Days (${extraDays}×${size.price_per_day}) + Delivery (${deliveryFee}) + Tax (7%)`,
  };
}

/**
 * Calculate pickup date given delivery date and rental days
 */
export function calculatePickupDate(
  deliveryDate: string,
  rentalDays: number,
): string {
  const delivery = new Date(deliveryDate);
  const pickup = new Date(delivery);
  pickup.setDate(pickup.getDate() + rentalDays);
  return pickup.toISOString().split("T")[0];
}

/**
 * Validate rental duration is within business rules
 */
export function validateRentalDuration(
  days: number,
  minDays = 1,
  maxDays = 365,
): { valid: boolean; error?: string } {
  if (days < minDays) {
    return {
      valid: false,
      error: `Minimum rental is ${minDays} day${minDays > 1 ? "s" : ""}`,
    };
  }
  if (days > maxDays) {
    return {
      valid: false,
      error: `Maximum rental is ${maxDays} days`,
    };
  }
  return { valid: true };
}

/**
 * Check if a date is available for delivery
 * TODO: Integrate with blocked dates and inventory from database
 */
export function isDateAvailable(dateStr: string): {
  available: boolean;
  reason?: string;
} {
  const date = new Date(dateStr);
  const today = new Date();
  today.setHours(0, 0, 0, 0);

  // Check if date is in the past
  if (date < today) {
    return { available: false, reason: "Cannot book dates in the past" };
  }

  // Check if date is Sunday (mock: we don't deliver on Sundays)
  if (date.getDay() === 0) {
    return { available: false, reason: "We do not deliver on Sundays" };
  }

  return { available: true };
}

/**
 * Get minimum delivery date (e.g., 1 day from now)
 */
export function getMinimumDeliveryDate(daysFromNow = 1): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
}

/**
 * Get maximum delivery date (e.g., 90 days from now)
 */
export function getMaximumDeliveryDate(daysFromNow = 90): string {
  const date = new Date();
  date.setDate(date.getDate() + daysFromNow);
  return date.toISOString().split("T")[0];
}
