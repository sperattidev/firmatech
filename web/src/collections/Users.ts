import type { CollectionConfig } from 'payload'

import { admins, adminsField, hasRole, ROLE_LABELS, STAFF_ROLES } from '@/access/roles'

/** Personal de Firmatech: único tipo de usuario que entra al panel /admin. */
export const Users: CollectionConfig = {
  slug: 'users',
  labels: { singular: 'Usuario del panel', plural: 'Usuarios del panel' },
  admin: {
    useAsTitle: 'nombre',
    defaultColumns: ['nombre', 'email', 'roles'],
    group: 'Sistema',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 8,
  },
  access: {
    admin: ({ req: { user } }) => user?.collection === 'users',
    // El primer usuario se crea desde /admin/create-first-user (Payload permite ese caso sin sesión).
    create: admins,
    delete: admins,
    read: ({ req: { user } }) => {
      if (hasRole(user, 'admin')) return true
      if (user?.collection === 'users') return { id: { equals: user.id } }
      return false
    },
    update: ({ req: { user } }) => {
      if (hasRole(user, 'admin')) return true
      if (user?.collection === 'users') return { id: { equals: user.id } }
      return false
    },
  },
  fields: [
    {
      name: 'nombre',
      type: 'text',
      required: true,
    },
    {
      name: 'roles',
      type: 'select',
      hasMany: true,
      required: true,
      defaultValue: ['admin'],
      saveToJWT: true,
      options: STAFF_ROLES.map((value) => ({ label: ROLE_LABELS[value], value })),
      access: {
        // Solo un admin asigna roles; así nadie se autopromueve.
        create: adminsField,
        update: adminsField,
      },
      admin: {
        description: 'Admin: todo. Técnico: reparaciones. Vendedor: tienda y pedidos.',
      },
    },
  ],
}
