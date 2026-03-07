// Booking domain types
export type DumpsterSize = "all" | "10" | "15" | "20" | "30"; // in yards

export type BookingStep = "size" | "dates" | "address" | "details" | "review";

export interface DumpsterSizeOption {
  id: string;
  size_yards: number;
  name: string;
  description: string;
  price_base: number;
  price_per_day: number;
  dimensions: {
    length: number;
    width: number;
    height: number;
  };
  ideal_for: string[];
  is_active?: boolean; // Indicates if size is currently available for booking
}

export interface BookingFormData {
  // Size selection
  dumpster_size_id: string;

  // Dates
  delivery_date: string; // YYYY-MM-DD
  pickup_date: string; // YYYY-MM-DD
  rental_duration_days: number;

  // Address
  delivery_address_line_1: string;
  delivery_address_line_2?: string;
  delivery_city: string;
  delivery_state: string;
  delivery_zip: string;
  delivery_lat?: number;
  delivery_lng?: number;

  // Customer info
  customer_full_name: string;
  customer_email: string;
  customer_phone: string;
  customer_company?: string;

  // Notes
  placement_notes?: string;

  // Pricing (calculated)
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total: number;
}

export interface BookingState {
  step: BookingStep;
  data: Partial<BookingFormData>;
  errors: Partial<Record<keyof BookingFormData, string>>;
  isLoading: boolean;
}

export interface PriceEstimate {
  subtotal: number;
  deliveryFee: number; // camelCase to match component props
  tax: number;
  total: number;
  formula?: string; // For transparency
}

export interface ServiceAreaValidation {
  isInServiceArea: boolean;
  zone?: string;
  message: string;
}
