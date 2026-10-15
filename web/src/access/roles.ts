import type { Access, FieldAccess, PayloadRequest } from 'payload'

export const STAFF_ROLES = ['admin', 'tecnico', 'vendedor'] as const
export type StaffRole = (typeof STAFF_ROLES)[number]

export const ROLE_LABELS: Record<StaffRole, string> = {
  admin: 'Administrador',
  tecnico: 'Técnico',
  vendedor: 'Vendedor',
}

type ReqUser = PayloadRequest['user']

/** Personal del local (colección `users`). Los clientes nunca pasan este control. */
export const isStaffUser = (user: ReqUser): boolean => user?.collection === 'users'

export const hasRole = (user: ReqUser, ...roles: StaffRole[]): boolean => {
  if (!user || user.collection !== 'users') return false
  return (user.roles ?? []).some((role) => roles.includes(role))
}

export const isCustomerUser = (user: ReqUser): boolean => user?.collection === 'customers'

export const staff: Access = ({ req: { user } }) => isStaffUser(user)

export const admins: Access = ({ req: { user } }) => hasRole(user, 'admin')

export const adminsField: FieldAccess = ({ req: { user } }) => hasRole(user, 'admin')

export const staffField: FieldAccess = ({ req: { user } }) => isStaffUser(user)

/** Personal ve todo; un cliente solo su propio documento. */
export const staffOrSelf: Access = ({ req: { user } }) => {
  if (isStaffUser(user)) return true
  if (isCustomerUser(user)) return { id: { equals: user!.id } }
  return false
}

export const anyone: Access = () => true
