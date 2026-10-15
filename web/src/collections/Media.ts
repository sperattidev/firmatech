import path from 'path'
import type { CollectionConfig } from 'payload'

import { anyone, staff } from '@/access/roles'

export const Media: CollectionConfig = {
  slug: 'media',
  labels: { singular: 'Imagen', plural: 'Imágenes' },
  admin: { group: 'Sistema' },
  access: {
    read: anyone,
    create: staff,
    update: staff,
    delete: staff,
  },
  fields: [
    {
      name: 'alt',
      label: 'Texto alternativo',
      type: 'text',
      required: true,
    },
  ],
  upload: {
    // En el contenedor es un volumen persistente (/app/media).
    staticDir: process.env.MEDIA_DIR || path.resolve(process.cwd(), 'media'),
    mimeTypes: ['image/*'],
    imageSizes: [
      { name: 'thumb', width: 320, height: 320, position: 'centre' },
      { name: 'card', width: 768 },
    ],
  },
}
