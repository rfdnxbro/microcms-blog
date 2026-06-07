import { NextRequest, NextResponse } from 'next/server';
import { PUBLIC_ISR_CACHE_CONTROL, NO_CACHE_CACHE_CONTROL } from '@/constants/cache';

export function proxy(req: NextRequest) {
  const cachePolicy = req.nextUrl.searchParams.has('dk')
    ? NO_CACHE_CACHE_CONTROL
    : PUBLIC_ISR_CACHE_CONTROL;
  const response = NextResponse.next();
  response.headers.set('CDN-Cache-Control', cachePolicy);
  return response;
}

export const config = { matcher: '/articles/:path*' };
