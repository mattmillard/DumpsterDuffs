import { type NextRequest, NextResponse } from "next/server";
import { createClient } from "@supabase/supabase-js";

/**
 * Middleware for protecting admin routes and managing authentication
 *
 * Protected routes:
 * - /admin/* (except /admin/login)
 *
 * Public routes:
 * - /admin/login
 * - / (home page)
 * - /booking/* (customer booking flow)
 */
export async function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for login page
  if (pathname === "/admin/login") {
    return NextResponse.next();
  }

  // Only check authentication for admin routes
  if (pathname.startsWith("/admin")) {
    try {
      // Create a Supabase client with the request cookies
      const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL;
      const supabaseAnonKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY;

      if (!supabaseUrl || !supabaseAnonKey) {
        console.error("Missing Supabase environment variables");
        return NextResponse.redirect(new URL("/admin/login", request.url));
      }

      // Get session from cookies
      const supabase = createClient(supabaseUrl, supabaseAnonKey, {
        auth: {
          persistSession: false,
          autoRefreshToken: false,
        },
        global: {
          headers: {
            cookie: request.headers.get("cookie") || "",
          },
        },
      });

      const {
        data: { session },
      } = await supabase.auth.getSession();

      // If no session, redirect to login
      if (!session) {
        const loginUrl = new URL("/admin/login", request.url);
        loginUrl.searchParams.set("redirect", pathname);
        return NextResponse.redirect(loginUrl);
      }

      // Verify user is in admin_users table
      const { data: adminUser, error } = await supabase
        .from("admin_users")
        .select("id, is_active")
        .eq("id", session.user.id)
        .single();

      if (error || !adminUser || !adminUser.is_active) {
        // User is authenticated but not an admin or inactive
        const loginUrl = new URL("/admin/login", request.url);
        return NextResponse.redirect(loginUrl);
      }

      // User is authenticated and authorized
      return NextResponse.next();
    } catch (error) {
      console.error("Middleware auth error:", error);
      return NextResponse.redirect(new URL("/admin/login", request.url));
    }
  }

  // Allow all other routes
  return NextResponse.next();
}

// Configure which routes the middleware runs on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     * - public (public files)
     */
    "/((?!api|_next/static|_next/image|favicon.ico|public).*)",
  ],
};
