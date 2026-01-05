import { NextResponse } from "next/server";
import type { NextRequest } from "next/server";

// Define public routes that don't require authentication
const publicRoutes = [
  "/auth/login",
  "/auth/register",
  "/auth/forgot-password",
  "/auth/reset-password",
  "/api/auth/login",
  "/api/auth/register",
  "/api/auth/forgot-password",
  "/api/auth/reset-password",
  "/",
  "/casino",
  "/landing-page",
  "/home",
  "/faq",
  "/privacy-policy",
  "/terms-and-conditions",
  "/refund-policy",
];

// Helper function to check if a path is a static file
const isStaticFile = (path: string) => {
  return path.match(/\.(jpg|jpeg|png|gif|ico|css|js|svg)$/i) !== null;
};

export function middleware(request: NextRequest) {
  const { pathname } = request.nextUrl;

  // Skip middleware for static files, api routes, and next internal routes
  if (
    isStaticFile(pathname) ||
    pathname.startsWith("/_next") ||
    pathname.startsWith("/api/") ||
    pathname === "/favicon.ico"
  ) {
    return NextResponse.next();
  }

  // Redirect any /login attempts to home page - auth is handled via modal
  if (pathname === "/login" || pathname.startsWith("/auth/")) {
    return NextResponse.redirect(new URL("/casino", request.url));
  }

  // Since we're using localStorage for auth (client-side only),
  // we can't check authentication in middleware (server-side).
  // Auth checks are now handled client-side in AuthContext and axios interceptors.

  return NextResponse.next();
}

// Configure which routes the middleware should run on
export const config = {
  matcher: [
    /*
     * Match all request paths except:
     * 1. _next/static (static files)
     * 2. _next/image (image optimization files)
     * 3. favicon.ico (favicon file)
     */
    "/((?!_next/static|_next/image|favicon.ico).*)",
  ],
};
