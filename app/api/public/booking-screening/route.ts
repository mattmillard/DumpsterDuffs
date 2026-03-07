import { NextResponse } from "next/server";
import { evaluateBlacklist } from "@/lib/admin/bookingOperations";

export async function POST(request: Request) {
  try {
    const body = (await request.json()) as {
      phone?: string;
      email?: string;
      name?: string;
      address?: string;
    };

    const screening = await evaluateBlacklist(body || {});
    return NextResponse.json(screening);
  } catch (error) {
    return NextResponse.json(
      { error: "Failed to run booking screening" },
      { status: 500 },
    );
  }
}
