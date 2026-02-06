import { NextResponse } from 'next/server';
import type { NextRequest } from 'next/server';
import { verifyToken } from './lib/auth';

export function middleware(request: NextRequest) {
  const token = request.cookies.get('auth_token')?.value;
  const { pathname } = request.nextUrl;

  console.log(`[Middleware] Path: ${pathname}`);
  console.log(`[Middleware] Has token: ${!!token}`);
  if (token) {
    console.log(`[Middleware] Token length: ${token.length}`);
    try {
      const verified = verifyToken(token);
      console.log(`[Middleware] Token verified: ${!!verified}`);
      if (verified) {
        console.log(`[Middleware] Token user: ${verified.email}`);
      }
    } catch (err) {
      console.log(`[Middleware] Token verification error: ${err}`);
    }
  }
  
  // For now, allow all access to test
  // TODO: Re-enable protection after debugging
  return NextResponse.next();
}

export const config = {
  matcher: ['/proposal/:path*', '/auth/:path*'],
};
