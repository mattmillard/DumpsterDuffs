import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

type CreateBookingPayload = {
  // Size
  dumpster_size_id: string;
  size_yards: number;

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

  // Customer info
  customer_full_name: string;
  customer_email: string;
  customer_phone: string;
  customer_company?: string;

  // Notes
  placement_notes?: string;

  // Pricing
  subtotal: number;
  delivery_fee: number;
  tax: number;
  total: number;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as CreateBookingPayload;

    // Prepare booking record
    const bookingRecord = {
      customer_name: payload.customer_full_name,
      customer_email: payload.customer_email || null,
      customer_phone: payload.customer_phone,
      customer_company: payload.customer_company || null,
      size_yards: payload.size_yards,
      delivery_date: payload.delivery_date,
      return_date: payload.pickup_date,
      delivery_address_line_1: payload.delivery_address_line_1,
      delivery_address_line_2: payload.delivery_address_line_2 || null,
      delivery_city: payload.delivery_city,
      delivery_state: payload.delivery_state,
      delivery_zip: payload.delivery_zip,
      placement_notes: payload.placement_notes || null,
      subtotal: payload.subtotal,
      delivery_fee: payload.delivery_fee,
      tax: payload.tax,
      total_price: payload.total,
      payment_status: "pending",
      status: "pending",
    };

    // Insert booking into database
    const { data, error } = await supabaseAdmin
      .from("bookings")
      .insert([bookingRecord])
      .select("id")
      .single();

    if (error) {
      console.error("Booking insert error:", error);
      return NextResponse.json(
        { error: "Failed to create booking. Please try again." },
        { status: 500 },
      );
    }

    const bookingId = data.id;
    const bookingNumber = bookingId.slice(0, 8).toUpperCase();

    // Try to send confirmation email (optional)
    let emailSent = false;
    try {
      const resendApiKey = process.env.RESEND_API_KEY;
      const fromEmail = process.env.BOOKING_FROM_EMAIL;

      if (resendApiKey && fromEmail && payload.customer_email) {
        // Resend email sending would go here
        // For now, just mark as false since Resend package isn't installed
        emailSent = false;
      }
    } catch (emailError) {
      console.error("Email send error:", emailError);
      // Don't fail the booking if email fails
    }

    return NextResponse.json({
      success: true,
      bookingId,
      bookingNumber,
      emailSent,
    });
  } catch (error) {
    console.error("Booking creation error:", error);
    return NextResponse.json(
      { error: "Error processing checkout. Please try again." },
      { status: 500 },
    );
  }
}
