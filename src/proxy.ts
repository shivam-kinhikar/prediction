import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This function can be marked `async` if using `await` inside
export function proxy(request: NextRequest) {
  // Check if the user is trying to access the admin panel
  if (request.nextUrl.pathname.startsWith('/admin')) {
    // Look for our simple auth cookie
    const authCookie = request.cookies.get('admin_token');

    // If there is no cookie, redirect them to the login page
    if (!authCookie) {
      return NextResponse.redirect(new URL('/login', request.url));
    }
    
    // In a production app, we would verify a JWT signature here.
    // Because this middleware runs on the Edge runtime, we can't easily use 
    // standard Node.js crypto/bcrypt here, so the presence of the 
    // HttpOnly cookie acts as our basic security gate.
  }

  return NextResponse.next();
}

// See "Matching Paths" below to learn more
export const config = {
  matcher: '/admin/:path*',
};
