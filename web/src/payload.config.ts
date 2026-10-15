import { postgresAdapter } from '@payloadcms/db-postgres'
import { lexicalEditor } from '@payloadcms/richtext-lexical'
import { es } from '@payloadcms/translations/languages/es'
import path from 'path'
import { buildConfig } from 'payload'
import sharp from 'sharp'
import { fileURLToPath } from 'url'

import { Customers } from './collections/Customers'
import { Media } from './collections/Media'
import { Users } from './collections/Users'
import { emailAdapter } from './email/adapter'
import { Negocio } from './globals/Negocio'
import { siteUrl } from './lib/site'
import { migrations } from './migrations'

const filename = fileURLToPath(import.meta.url)
const dirname = path.dirname(filename)

if (!process.env.PAYLOAD_SECRET || process.env.PAYLOAD_SECRET.length < 32) {
  throw new Error('PAYLOAD_SECRET debe tener al menos 32 caracteres')
}

export default buildConfig({
  serverURL: siteUrl(),
  cors: [siteUrl()],
  csrf: [siteUrl()],
  admin: {
    user: Users.slug,
    meta: { titleSuffix: ' · Firmatech panel' },
    theme: 'dark',
    components: {
      graphics: {
        Logo: '/components/admin/Graphics#Logo',
        Icon: '/components/admin/Graphics#Icon',
      },
    },
    importMap: {
      baseDir: path.resolve(dirname),
    },
  },
  i18n: {
    supportedLanguages: { es },
    fallbackLanguage: 'es',
  },
  collections: [Users, Customers, Media],
  globals: [Negocio],
  editor: lexicalEditor(),
  email: emailAdapter(),
  secret: process.env.PAYLOAD_SECRET,
  typescript: {
    outputFile: path.resolve(dirname, 'payload-types.ts'),
  },
  db: postgresAdapter({
    pool: {
      connectionString: process.env.DATABASE_URL || '',
    },
    // En desarrollo el esquema se sincroniza solo; en producción solo por migraciones.
    push: process.env.NODE_ENV !== 'production',
    // Al arrancar en producción se aplican las migraciones pendientes.
    prodMigrations: migrations,
  }),
  graphQL: { disable: true },
  sharp,
  plugins: [],
})
