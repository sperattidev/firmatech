import type { PayloadRequest } from 'payload'
import { describe, expect, it } from 'vitest'

import { hasRole, isStaffUser, staffOrSelf } from '@/access/roles'

type User = PayloadRequest['user']
const staff = (roles: string[]) => ({ id: 1, collection: 'users', roles }) as unknown as User
const customer = { id: 7, collection: 'customers' } as unknown as User

const run = (user: User) =>
  staffOrSelf({ req: { user } as PayloadRequest } as Parameters<typeof staffOrSelf>[0])

describe('roles', () => {
  it('distingue personal de clientes', () => {
    expect(isStaffUser(staff(['tecnico']))).toBe(true)
    expect(isStaffUser(customer)).toBe(false)
    expect(isStaffUser(null)).toBe(false)
  })

  it('hasRole solo aplica al personal', () => {
    expect(hasRole(staff(['admin']), 'admin')).toBe(true)
    expect(hasRole(staff(['vendedor']), 'admin')).toBe(false)
    expect(hasRole(staff(['vendedor']), 'admin', 'vendedor')).toBe(true)
    expect(hasRole(customer, 'admin')).toBe(false)
  })

  it('staffOrSelf limita al cliente a su documento', () => {
    expect(run(staff(['tecnico']))).toBe(true)
    expect(run(customer)).toEqual({ id: { equals: 7 } })
    expect(run(null)).toBe(false)
  })
})
