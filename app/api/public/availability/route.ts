import { NextResponse } from "next/server";
import { getBookabilityForDate } from "@/lib/admin/bookingOperations";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get("date");

    if (!date || !/^\d{4}-\d{2}-\d{2}$/.test(date)) {
      return NextResponse.json(
        { error: "date query parameter (YYYY-MM-DD) is required" },
        { status: 400 },
      );
    }

    const availability = await getBookabilityForDate(date);
    return NextResponse.json(availability);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to load availability" },
      { status: 500 },
    );
  }
}
