import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

// This middleware ensures proper handling of API routes in production
export function middleware(request: NextRequest) {
  // Get the pathname of the request
  const path = request.nextUrl.pathname;

  // Handle CORS for API routes
  if (path.startsWith('/api/')) {
    // Get the response
    const response = NextResponse.next();

    // Add CORS headers
    response.headers.set('Access-Control-Allow-Credentials', 'true');
    response.headers.set('Access-Control-Allow-Origin', '*');
    response.headers.set(
      'Access-Control-Allow-Methods',
      'GET,DELETE,PATCH,POST,PUT,OPTIONS'
    );
    response.headers.set(
      'Access-Control-Allow-Headers',
      'X-CSRF-Token, X-Requested-With, Accept, Accept-Version, Content-Length, Content-MD5, Content-Type, Date, X-Api-Version'
    );

    return response;
  }

  // For non-API routes, proceed as normal
  return NextResponse.next();
}

// Configure the middleware to run only for API routes
export const config = {
  matcher: ['/api/:path*'],
}; 