import 'server-only'

import config from '@payload-config'
import { cookies, headers } from 'next/headers'
import { getFieldsToSign, getPayload, jwtSign } from 'payload'
import { generateExpiredPayloadCookie, generatePayloadCookie } from 'payload/shared'
import { randomUUID } from 'crypto'

import type { Customer } from '@/payload-types'

export const getPayloadClient = () => getPayload({ config })

const customersCollection = async () => {
  const payload = await getPayloadClient()
  return { payload, collection: payload.collections.customers }
}

/** Cliente con sesión iniciada, o null. El personal del panel no cuenta como cliente. */
export async function getCustomer(): Promise<Customer | null> {
  const requestHeaders = await headers()
  const payload = await getPayloadClient()
  const { user } = await payload.auth({ headers: requestHeaders })
  return user?.collection === 'customers' ? (user as Customer) : null
}

export async function setSessionCookie(token: string) {
  const { payload, collection } = await customersCollection()
  const cookie = generatePayloadCookie({
    collectionAuthConfig: collection.config.auth,
    cookiePrefix: payload.config.cookiePrefix,
    returnCookieAsObject: true,
    token,
  })
  ;(await cookies()).set({
    name: cookie.name,
    value: cookie.value ?? token,
    expires: cookie.expires ? new Date(cookie.expires) : undefined,
    httpOnly: true,
    path: cookie.path ?? '/',
    sameSite: 'lax',
    secure: Boolean(cookie.secure),
  })
}

export async function clearSessionCookie() {
  const { payload, collection } = await customersCollection()
  const cookie = generateExpiredPayloadCookie({
    collectionAuthConfig: collection.config.auth,
    cookiePrefix: payload.config.cookiePrefix,
    returnCookieAsObject: true,
  })
  ;(await cookies()).delete(cookie.name)
}

/**
 * Inicia sesión sin contraseña para un cliente ya autenticado por un tercero (Google).
 * Replica lo que hace el login de Payload: registra la sesión en el usuario (revocable
 * desde el panel) y firma el mismo JWT, así el resto del sistema no distingue el origen.
 */
export async function createSessionFor(customer: Customer) {
  const { payload, collection } = await customersCollection()
  const authConfig = collection.config.auth
  let sid: string | undefined

  if (authConfig.useSessions) {
    sid = randomUUID()
    const now = new Date()
    const expiresAt = new Date(now.getTime() + authConfig.tokenExpiration * 1000)
    // Las sesiones son un campo oculto: se leen directo de la base.
    const actual = await payload.db.findOne<Customer>({
      collection: 'customers',
      where: { id: { equals: customer.id } },
    })
    const vigentes = (actual?.sessions ?? []).filter((s) => new Date(s.expiresAt) > now)
    await payload.db.updateOne({
      id: customer.id,
      collection: 'customers',
      data: {
        sessions: [...vigentes, { id: sid, createdAt: now, expiresAt }],
        updatedAt: null,
      },
      returning: false,
    })
  }

  const fieldsToSign = getFieldsToSign({
    collectionConfig: collection.config,
    email: customer.email,
    sid,
    user: { ...customer, collection: 'customers' },
  })
  const { token } = await jwtSign({
    fieldsToSign,
    secret: payload.secret,
    tokenExpiration: authConfig.tokenExpiration,
  })
  await setSessionCookie(token)
}
