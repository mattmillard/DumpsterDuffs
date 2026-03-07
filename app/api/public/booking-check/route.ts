import { NextResponse } from "next/server";
import {
  evaluateBlacklist,
  getBookabilityForDate,
} from "@/lib/admin/bookingOperations";

type BookingCheckPayload = {
  delivery_date: string;
  size_yards: number;
  customer_phone?: string;
  customer_email?: string;
  customer_name?: string;
  delivery_address_line_1?: string;
};

export async function POST(request: Request) {
  try {
    const payload = (await request.json()) as BookingCheckPayload;

    if (!payload.delivery_date || !payload.size_yards) {
      return NextResponse.json(
        { error: "delivery_date and size_yards are required" },
        { status: 400 },
      );
    }

    // Check blacklist first
    const blacklistResult = await evaluateBlacklist({
      phone: payload.customer_phone,
      email: payload.customer_email,
      name: payload.customer_name,
      address: payload.delivery_address_line_1,
    });

    if (blacklistResult.blocked) {
      return NextResponse.json({
        bookable: false,
        reason: "blacklisted",
        message:
          blacklistResult.reason ||
          "We cannot accept bookings from this contact at this time.",
      });
    }

    // Check date availability
    const availability = await getBookabilityForDate(payload.delivery_date);

    if (availability.setupRequired) {
      return NextResponse.json({
        bookable: false,
        reason: "system_setup",
        message: "Booking system is being configured. Please try again later.",
      });
    }

    const sizeAvailability = availability.sizes.find(
      (s) => s.size_yards === Number(payload.size_yards),
    );

    if (!sizeAvailability) {
      return NextResponse.json({
        bookable: false,
        reason: "size_not_available",
        message: "This dumpster size is not available.",
      });
    }

    if (!sizeAvailability.isBookable) {
      if (sizeAvailability.isBlocked) {
        const blockReason =
          availability.blockedReasons?.[0] ||
          "This date is not available for booking.";
        return NextResponse.json({
          bookable: false,
          reason: "date_blocked",
          message: blockReason,
        });
      }

      return NextResponse.json({
        bookable: false,
        reason: "no_capacity",
        message: "No units available for this size on this date.",
      });
    }

    return NextResponse.json({
      bookable: true,
      message: "Date and size are available.",
    });
  } catch (error) {
    console.error("Booking check error:", error);
    return NextResponse.json(
      { error: "Failed to check booking availability" },
      { status: 500 },
    );
  }
}
