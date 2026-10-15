import type { GlobalConfig } from 'payload'

import { admins, anyone } from '@/access/roles'

/** Datos del local que se muestran en la web (pie, contacto, enlace de WhatsApp). */
export const Negocio: GlobalConfig = {
  slug: 'negocio',
  label: 'Datos del negocio',
  admin: { group: 'Sistema' },
  access: { read: anyone, update: admins },
  fields: [
    {
      name: 'whatsapp',
      label: 'WhatsApp',
      type: 'text',
      admin: { description: 'Formato internacional sin + ni espacios. Ej: 5493465123456' },
      validate: (value: string | null | undefined) =>
        !value || /^\d{10,15}$/.test(value) || 'Solo números, entre 10 y 15 dígitos',
    },
    { name: 'email', label: 'Correo de contacto', type: 'email' },
    { name: 'direccion', label: 'Dirección', type: 'text', defaultValue: 'Firmat, Santa Fe' },
    {
      name: 'horarios',
      label: 'Horarios de atención',
      type: 'array',
      labels: { singular: 'Franja', plural: 'Franjas' },
      fields: [
        {
          type: 'row',
          fields: [
            { name: 'dias', label: 'Días', type: 'text', required: true },
            { name: 'horario', label: 'Horario', type: 'text', required: true },
          ],
        },
      ],
    },
    { name: 'instagram', label: 'Usuario de Instagram', type: 'text' },
  ],
}
