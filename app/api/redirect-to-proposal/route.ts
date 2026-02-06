import { NextRequest, NextResponse } from 'next/server';

export async function GET(request: NextRequest) {
  console.log('[Redirect Route] Called, redirecting to /proposal');
  return NextResponse.redirect(new URL('/proposal', request.url));
}
