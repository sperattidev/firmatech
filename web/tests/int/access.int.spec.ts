import { getPayload, type Payload } from 'payload'
import { afterAll, beforeAll, describe, expect, it } from 'vitest'

import config from '@/payload.config'
import type { Customer } from '@/payload-types'

// Requiere la base de desarrollo levantada (pnpm db:up).
let payload: Payload
const emails = ['int-a@firmatech.test', 'int-b@firmatech.test']
let a: Customer
let b: Customer

const crear = (email: string) =>
  payload.create({
    collection: 'customers',
    data: { email, nombre: 'Test', password: 'contraseña-segura-123', _verified: true },
    disableVerificationEmail: true,
    overrideAccess: true,
  })

describe('control de acceso de clientes', () => {
  beforeAll(async () => {
    payload = await getPayload({ config: await config })
    await payload.delete({ collection: 'customers', where: { email: { in: emails } } })
    a = await crear(emails[0])
    b = await crear(emails[1])
  })

  afterAll(async () => {
    await payload.delete({ collection: 'customers', where: { email: { in: emails } } })
  })

  it('un cliente solo se ve a sí mismo', async () => {
    const res = await payload.find({
      collection: 'customers',
      user: { ...a, collection: 'customers' },
      overrideAccess: false,
    })
    expect(res.docs.map((d) => d.id)).toEqual([a.id])
  })

  it('un cliente no puede editar a otro', async () => {
    await expect(
      payload.update({
        collection: 'customers',
        id: b.id,
        data: { nombre: 'Hack' },
        user: { ...a, collection: 'customers' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('un cliente no puede leer usuarios del panel', async () => {
    await expect(
      payload.find({
        collection: 'users',
        user: { ...a, collection: 'customers' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })

  it('el alta pública por REST está cerrada', async () => {
    await expect(
      payload.create({
        collection: 'customers',
        data: { email: 'x@firmatech.test', nombre: 'X', password: 'contraseña-segura-123' },
        overrideAccess: false,
      }),
    ).rejects.toThrow()
  })
})
