// middleware.js
import { getToken } from "next-auth/jwt";
import { NextResponse } from "next/server";

export async function middleware(req) {
  const token = await getToken({ req, secret: process.env.NEXTAUTH_SECRET });
  const { pathname } = req.nextUrl;

  // 1. If user is logged in AND tries to access the login page
  if (pathname === "/login" && token) {
    const url = req.nextUrl.clone();
    // Redirect based on role
    url.pathname = token.role === "ADMIN" ? "/admin/create-user" : "/dashboard";
    return NextResponse.redirect(url);
  }

  // 2. Protect Admin routes from regular users
  if (pathname.startsWith("/admin") && token?.role !== "ADMIN") {
    return NextResponse.redirect(new URL("/dashboard", req.url));
  }

  // 3. Protect dashboard from unauthenticated users
  if (pathname.startsWith("/dashboard") && !token) {
    return NextResponse.redirect(new URL("/login", req.url));
  }

  return NextResponse.next();
}

export const config = {
  matcher: ["/login", "/dashboard/:path*", "/admin/:path*"],
};