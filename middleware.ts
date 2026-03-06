import { type NextRequest, NextResponse } from 'next/server';
import { createServerClient, type CookieOptions } from '@supabase/ssr';

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

  // Allow login page without authentication
  if (pathname === '/admin/login') {
    return NextResponse.next();
  }

  // Protect admin routes
  if (pathname.startsWith('/admin')) {
    try {
      // Create Supabase client for middleware
      let response = NextResponse.next({
        request: {
          headers: request.headers,
        },
      });

      const supabase = createServerClient(
        process.env.NEXT_PUBLIC_SUPABASE_URL!,
        process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY!,
        {
          cookies: {
            get(name: string) {
              return request.cookies.get(name)?.value;
            },
            set(name: string, value: string, options: CookieOptions) {
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              response.cookies.set({
                name,
                value,
                ...options,
              });
            },
            remove(name: string, options: CookieOptions) {
              response = NextResponse.next({
                request: {
                  headers: request.headers,
                },
              });
              response.cookies.delete({
                name,
                ...options,
              });
            },
          },
        }
      );

      // Get the current session
      const {
        data: { session },
      } = await supabase.auth.getSession();

      if (!session) {
        // No session found, redirect to login
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        url.searchParams.set('redirect', pathname);
        return NextResponse.redirect(url);
      }

      // Session exists, check user role for specific routes
      const { data: userData } = await supabase
        .from('admin_users')
        .select('role')
        .eq('id', session.user.id)
        .single();

      // For now, allow all authenticated users to access admin
      // Implement role-based route protection here if needed
      if (!userData) {
        const url = request.nextUrl.clone();
        url.pathname = '/admin/login';
        return NextResponse.redirect(url);
      }

      return response;
    } catch (error) {
      console.error('Middleware error:', error);
      // On error, redirect to login for safety
      const url = request.nextUrl.clone();
      url.pathname = '/admin/login';
      return NextResponse.redirect(url);
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
    '/((?!api|_next/static|_next/image|favicon.ico|public).*)',
  ],
};