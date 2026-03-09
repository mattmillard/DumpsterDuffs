import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      session_id,
      landing_page,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      device_type,
    } = body;

    // Validate required fields
    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 },
      );
    }

    // Check if session exists
    const { data: existingSession } = await supabaseAdmin
      .from("analytics_sessions")
      .select("session_id")
      .eq("session_id", session_id)
      .single();

    if (existingSession) {
      // Update existing session
      const { error } = await supabaseAdmin
        .from("analytics_sessions")
        .update({
          last_seen: new Date().toISOString(),
        })
        .eq("session_id", session_id);

      if (error) {
        console.error("Session update error:", error);
      }
    } else {
      // Create new session
      const { error } = await supabaseAdmin.from("analytics_sessions").insert({
        session_id,
        first_seen: new Date().toISOString(),
        last_seen: new Date().toISOString(),
        landing_page,
        referrer,
        utm_source,
        utm_medium,
        utm_campaign,
        device_type,
        page_views: 1,
        converted: false,
        called: false,
      });

      if (error) {
        console.error("Session creation error:", error);
        return NextResponse.json(
          { error: "Failed to create session" },
          { status: 500 },
        );
      }
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}

// Update session conversion status
export async function PATCH(request: Request) {
  try {
    const body = await request.json();
    const { session_id, converted, called } = body;

    if (!session_id) {
      return NextResponse.json(
        { error: "Missing session_id" },
        { status: 400 },
      );
    }

    const updates: any = {};
    if (typeof converted === "boolean") updates.converted = converted;
    if (typeof called === "boolean") updates.called = called;

    const { error } = await supabaseAdmin
      .from("analytics_sessions")
      .update(updates)
      .eq("session_id", session_id);

    if (error) {
      return NextResponse.json(
        { error: "Failed to update session" },
        { status: 500 },
      );
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Session update error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
