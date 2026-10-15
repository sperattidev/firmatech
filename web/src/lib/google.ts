import 'server-only'

import { Google } from 'arctic'

import { siteUrl } from './site'

export const GOOGLE_STATE_COOKIE = 'ft-google-state'
export const GOOGLE_VERIFIER_COOKIE = 'ft-google-verifier'
export const GOOGLE_NEXT_COOKIE = 'ft-google-next'

export const googleEnabled = () =>
  Boolean(process.env.GOOGLE_CLIENT_ID && process.env.GOOGLE_CLIENT_SECRET)

export const googleClient = () =>
  new Google(
    process.env.GOOGLE_CLIENT_ID!,
    process.env.GOOGLE_CLIENT_SECRET!,
    `${siteUrl()}/auth/google/callback`,
  )
