import { generateCodeVerifier, generateState } from 'arctic'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'

import {
  GOOGLE_NEXT_COOKIE,
  GOOGLE_STATE_COOKIE,
  GOOGLE_VERIFIER_COOKIE,
  googleClient,
  googleEnabled,
} from '@/lib/google'
import { safeNext } from '@/lib/safe-redirect'
import { siteUrl } from '@/lib/site'

export async function GET(request: NextRequest) {
  if (!googleEnabled()) {
    return NextResponse.redirect(`${siteUrl()}/ingresar?error=google-no-disponible`)
  }

  const state = generateState()
  const codeVerifier = generateCodeVerifier()
  const url = googleClient().createAuthorizationURL(state, codeVerifier, [
    'openid',
    'profile',
    'email',
  ])
  url.searchParams.set('prompt', 'select_account')

  const jar = await cookies()
  const opts = {
    httpOnly: true,
    secure: process.env.NODE_ENV === 'production',
    sameSite: 'lax' as const,
    path: '/',
    maxAge: 60 * 10,
  }
  jar.set(GOOGLE_STATE_COOKIE, state, opts)
  jar.set(GOOGLE_VERIFIER_COOKIE, codeVerifier, opts)
  jar.set(GOOGLE_NEXT_COOKIE, safeNext(request.nextUrl.searchParams.get('next')), opts)

  return NextResponse.redirect(url)
}
