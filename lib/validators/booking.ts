import { z } from "zod";

// Phone number validation
const phoneRegex = /^[\d\s\-().+]*$/;
const phoneSchema = z
  .string()
  .regex(phoneRegex, "Invalid phone number")
  .transform((val: string) => val.replace(/\D/g, ""))
  .refine(
    (val: string) => val.length >= 10,
    "Phone number must be at least 10 digits",
  );

// Size selection step
export const sizeSelectionSchema = z.object({
  dumpster_size_id: z.string().min(1, "Please select a dumpster size"),
});

export type SizeSelectionData = z.infer<typeof sizeSelectionSchema>;

// Dates step
export const datesSchema = z
  .object({
    delivery_date: z.string().refine((val: string) => {
      const date = new Date(val);
      const today = new Date();
      today.setHours(0, 0, 0, 0);
      return date > today;
    }, "Delivery date must be in the future"),
    rental_duration_days: z
      .number()
      .int()
      .min(1, "Rental duration must be at least 1 day")
      .max(365, "Rental duration cannot exceed 1 year"),
  })
  .refine((data: any) => {
    const delivery = new Date(data.delivery_date);
    const pickup = new Date(delivery);
    pickup.setDate(pickup.getDate() + data.rental_duration_days);
    return pickup > delivery;
  }, "Invalid rental period");

export type DatesData = z.infer<typeof datesSchema>;

// Address step
export const addressSchema = z.object({
  delivery_address_line_1: z
    .string()
    .min(5, "Address is required (at least 5 characters)"),
  delivery_address_line_2: z.string().optional(),
  delivery_city: z.string().min(2, "City is required"),
  delivery_state: z.string().length(2, "State must be 2-letter code"),
  delivery_zip: z
    .string()
    .regex(/^\d{5}(-\d{4})?$/, "Valid US ZIP code required"),
  delivery_lat: z.number().min(-90).max(90).optional(),
  delivery_lng: z.number().min(-180).max(180).optional(),
});

export type AddressData = z.infer<typeof addressSchema>;

// Details step
export const detailsSchema = z.object({
  customer_full_name: z.string().min(2, "Full name is required"),
  customer_email: z.string().email("Valid email is required"),
  customer_phone: phoneSchema,
  customer_company: z.string().optional(),
  placement_notes: z
    .string()
    .max(500, "Notes too long (max 500 chars)")
    .optional(),
});

export type DetailsData = z.infer<typeof detailsSchema>;

// Full booking form
export const bookingFormSchema = z.object({
  dumpster_size_id: z.string().min(1, "Dumpster size required"),
  delivery_date: z.string(),
  rental_duration_days: z.number().int().min(1),
  delivery_address_line_1: z.string().min(5),
  delivery_address_line_2: z.string().optional(),
  delivery_city: z.string().min(2),
  delivery_state: z.string().length(2),
  delivery_zip: z.string().regex(/^\d{5}(-\d{4})?$/),
  delivery_lat: z.number().optional(),
  delivery_lng: z.number().optional(),
  customer_full_name: z.string().min(2),
  customer_email: z.string().email(),
  customer_phone: phoneSchema,
  customer_company: z.string().optional(),
  placement_notes: z.string().optional(),
  subtotal: z.number().positive(),
  delivery_fee: z.number().nonnegative(),
  tax: z.number().nonnegative(),
  total: z.number().positive(),
});

export type BookingFormData = z.infer<typeof bookingFormSchema>;
