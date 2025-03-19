import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';

export function middleware(request: NextRequest) {
  // Get the pathname
  const path = request.nextUrl.pathname;

  // Get stored auth status from cookies or headers
  const isAuthenticated = request.cookies.get('authenticated')?.value === 'true';
  const userRole = request.cookies.get('userRole')?.value;

  // Public paths that don't require authentication
  const publicPaths = ['/', '/login', '/signup', '/worker/signup', '/about', '/services', '/portfolio', '/contact'];
  
  // Check if the current path is public
  const isPublicPath = publicPaths.includes(path);

  // If the path is public and user is authenticated, redirect to appropriate dashboard
  if (isPublicPath && isAuthenticated) {
    if (path === '/login' || path === '/signup' || path === '/worker/signup') {
      switch (userRole) {
        case 'admin':
          return NextResponse.redirect(new URL('/admin/dashboard', request.url));
        case 'worker':
          return NextResponse.redirect(new URL('/worker/dashboard', request.url));
        default:
          return NextResponse.redirect(new URL('/dashboard', request.url));
      }
    }
  }

  // If the path is not public and user is not authenticated, redirect to login
  if (!isPublicPath && !isAuthenticated) {
    const loginUrl = new URL('/login', request.url);
    return NextResponse.redirect(loginUrl);
  }

  // If the path requires specific role access
  if (path.startsWith('/admin') && userRole !== 'admin') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  if (path.startsWith('/worker') && userRole !== 'worker') {
    return NextResponse.redirect(new URL('/', request.url));
  }

  return NextResponse.next();
}

// Configure which paths the middleware will run on
export const config = {
  matcher: [
    /*
     * Match all request paths except for the ones starting with:
     * - api (API routes)
     * - _next/static (static files)
     * - _next/image (image optimization files)
     * - favicon.ico (favicon file)
     */
    '/((?!api|_next/static|_next/image|favicon.ico).*)',
  ],
}; 