import { NextResponse } from "next/server";
import { supabaseAdmin } from "@/lib/supabase/admin";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      session_id,
      event_type,
      page_path,
      page_title,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      user_agent,
      device_type,
      browser,
      os,
      screen_width,
      screen_height,
      event_data,
    } = body;

    // Validate required fields
    if (!session_id || !event_type || !page_path) {
      return NextResponse.json(
        { error: "Missing required fields" },
        { status: 400 },
      );
    }

    // Insert event
    const { error } = await supabaseAdmin.from("analytics_events").insert({
      session_id,
      event_type,
      page_path,
      page_title,
      referrer,
      utm_source,
      utm_medium,
      utm_campaign,
      user_agent,
      device_type,
      browser,
      os,
      screen_width,
      screen_height,
      event_data,
    });

    if (error) {
      console.error("Analytics tracking error:", error);
      return NextResponse.json(
        { error: "Failed to track event" },
        { status: 500 },
      );
    }

    // Update session last_seen and page_views
    const { error: sessionError } = await supabaseAdmin
      .from("analytics_sessions")
      .update({
        last_seen: new Date().toISOString(),
        page_views: supabaseAdmin.rpc("increment", { row_id: session_id }),
      })
      .eq("session_id", session_id);

    // Ignore session update errors
    if (sessionError) {
      console.debug("Session update warning:", sessionError);
    }

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error("Analytics tracking error:", error);
    return NextResponse.json(
      { error: "Internal server error" },
      { status: 500 },
    );
  }
}
