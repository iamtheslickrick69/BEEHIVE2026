import { NextResponse } from 'next/server'
import type { NextRequest } from 'next/server'

const PREVIEW_PASSWORD = process.env.PREVIEW_PASSWORD || 'beehive'

export function middleware(request: NextRequest) {
  // Check if already authenticated
  const authCookie = request.cookies.get('preview-auth')

  // Preview login page should always be accessible
  if (request.nextUrl.pathname === '/preview-login') {
    return NextResponse.next()
  }

  // Check if user has valid auth cookie
  if (authCookie?.value === PREVIEW_PASSWORD) {
    return NextResponse.next()
  }

  // Redirect to login page
  const loginUrl = new URL('/preview-login', request.url)
  return NextResponse.redirect(loginUrl)
}

export const config = {
  matcher: [
    /*
     * Match all paths except:
     * - /preview-login (login page)
     * - /api/preview-auth (auth API)
     * - /_next (Next.js internals)
     * - /favicon.ico, /robots.txt (static files)
     */
    '/((?!preview-login|api/preview-auth|_next|favicon.ico|robots.txt).*)',
  ],
}
