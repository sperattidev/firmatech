import { decodeIdToken } from 'arctic'
import { randomBytes } from 'crypto'
import { cookies } from 'next/headers'
import { NextResponse, type NextRequest } from 'next/server'
import type { Where } from 'payload'

import { createSessionFor, getPayloadClient } from '@/lib/auth'
import {
  GOOGLE_NEXT_COOKIE,
  GOOGLE_STATE_COOKIE,
  GOOGLE_VERIFIER_COOKIE,
  googleClient,
  googleEnabled,
} from '@/lib/google'
import { safeNext } from '@/lib/safe-redirect'
import { siteUrl } from '@/lib/site'
import type { Customer } from '@/payload-types'

type GoogleClaims = {
  sub: string
  email?: string
  email_verified?: boolean
  given_name?: string
  family_name?: string
  name?: string
}

const fail = (code: string) => NextResponse.redirect(`${siteUrl()}/ingresar?error=${code}`)

export async function GET(request: NextRequest) {
  if (!googleEnabled()) return fail('google-no-disponible')

  const jar = await cookies()
  const state = request.nextUrl.searchParams.get('state')
  const code = request.nextUrl.searchParams.get('code')
  const storedState = jar.get(GOOGLE_STATE_COOKIE)?.value
  const verifier = jar.get(GOOGLE_VERIFIER_COOKIE)?.value
  const next = safeNext(jar.get(GOOGLE_NEXT_COOKIE)?.value)
  jar.delete(GOOGLE_STATE_COOKIE)
  jar.delete(GOOGLE_VERIFIER_COOKIE)
  jar.delete(GOOGLE_NEXT_COOKIE)

  if (!state || !code || !storedState || !verifier || state !== storedState) {
    return fail('google-cancelado')
  }

  let claims: GoogleClaims
  try {
    const tokens = await googleClient().validateAuthorizationCode(code, verifier)
    // El id_token llega directo del endpoint de Google por TLS: no hace falta verificar la firma.
    claims = decodeIdToken(tokens.idToken()) as GoogleClaims
  } catch {
    return fail('google-fallo')
  }

  if (!claims.email || claims.email_verified !== true) return fail('google-sin-email')
  const email = claims.email.toLowerCase()

  const payload = await getPayloadClient()
  const buscar = async (where: Where) =>
    (
      await payload.find({
        collection: 'customers',
        where,
        limit: 1,
        overrideAccess: true,
        showHiddenFields: true,
      })
    ).docs[0] as Customer | undefined

  let customer = (await buscar({ googleId: { equals: claims.sub } })) ?? undefined

  if (!customer) {
    const porEmail = await buscar({ email: { equals: email } })
    if (porEmail) {
      // Google ya verificó que el correo es de esta persona: vinculamos la cuenta existente.
      customer = (await payload.update({
        collection: 'customers',
        id: porEmail.id,
        data: { googleId: claims.sub, _verified: true },
        overrideAccess: true,
      })) as Customer
    } else {
      customer = (await payload.create({
        collection: 'customers',
        data: {
          email,
          nombre: claims.given_name || claims.name || email.split('@')[0],
          apellido: claims.family_name,
          googleId: claims.sub,
          // Contraseña aleatoria: puede definir una propia con "olvidé mi contraseña".
          password: randomBytes(32).toString('hex'),
          _verified: true,
        },
        disableVerificationEmail: true,
        overrideAccess: true,
      })) as Customer
    }
  }

  if (customer.lockUntil && new Date(customer.lockUntil) > new Date()) {
    return fail('cuenta-bloqueada')
  }

  await createSessionFor(customer)
  return NextResponse.redirect(`${siteUrl()}${next}`)
}
