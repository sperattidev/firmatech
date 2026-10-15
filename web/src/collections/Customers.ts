import type { CollectionConfig } from 'payload'

import { admins, staff, staffField, staffOrSelf } from '@/access/roles'
import { resetPasswordTemplate, verifyEmailTemplate } from '@/email/templates'

type CustomerLike = { nombre?: string | null }

/**
 * Clientes de la web. Es una colección de autenticación separada del personal:
 * no puede entrar al panel y solo ve sus propios datos.
 * El alta pública se hace desde la acción de registro (whitelist de campos), no por REST.
 */
export const Customers: CollectionConfig = {
  slug: 'customers',
  labels: { singular: 'Cliente', plural: 'Clientes' },
  admin: {
    useAsTitle: 'email',
    defaultColumns: ['nombre', 'apellido', 'email', 'telefono', 'createdAt'],
    group: 'Clientes',
  },
  auth: {
    maxLoginAttempts: 5,
    lockTime: 15 * 60 * 1000,
    tokenExpiration: 60 * 60 * 24 * 30,
    cookies: { sameSite: 'Lax', secure: process.env.NODE_ENV === 'production' },
    verify: {
      generateEmailSubject: () => 'Confirmá tu correo · Firmatech',
      generateEmailHTML: ({ token, user }) =>
        verifyEmailTemplate(token, (user as CustomerLike).nombre),
    },
    forgotPassword: {
      expiration: 60 * 60 * 1000,
      generateEmailSubject: () => 'Restablecer contraseña · Firmatech',
      generateEmailHTML: (args) =>
        resetPasswordTemplate(args?.token ?? '', (args?.user as CustomerLike | undefined)?.nombre),
    },
  },
  access: {
    admin: () => false,
    create: staff,
    read: staffOrSelf,
    update: staffOrSelf,
    delete: admins,
  },
  fields: [
    {
      type: 'row',
      fields: [
        { name: 'nombre', type: 'text', required: true, maxLength: 60 },
        { name: 'apellido', type: 'text', maxLength: 60 },
      ],
    },
    {
      name: 'telefono',
      label: 'Teléfono (WhatsApp)',
      type: 'text',
      maxLength: 30,
    },
    {
      name: 'googleId',
      type: 'text',
      index: true,
      unique: true,
      // Solo lo escribe el callback de Google (overrideAccess).
      access: { read: staffField, create: () => false, update: () => false },
      admin: { readOnly: true, position: 'sidebar', description: 'Cuenta vinculada con Google' },
    },
  ],
}
