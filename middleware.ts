import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'
import { AUTH_COOKIE_NAME } from './src/constants'

export function middleware(request: NextRequest) {
  const authCookie = request.cookies.get(AUTH_COOKIE_NAME)

  if (!authCookie && !request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/login', request.url))
  }

  if (authCookie && request.nextUrl.pathname.startsWith('/login')) {
    return NextResponse.redirect(new URL('/dogs', request.url))
  }

  return NextResponse.next()
}

export const config = {
  matcher: ['/dogs/:path*', '/favorites/:path*', '/match/:path*', '/login'],
}