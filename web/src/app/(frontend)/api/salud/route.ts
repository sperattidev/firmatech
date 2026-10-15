import { sql } from '@payloadcms/db-postgres'

import { getPayloadClient } from '@/lib/auth'

export const dynamic = 'force-dynamic'

/** Healthcheck del contenedor: responde 200 solo si la base de datos contesta. */
export async function GET() {
  try {
    const payload = await getPayloadClient()
    await payload.db.drizzle.execute(sql`select 1`)
    return Response.json({ ok: true })
  } catch {
    return Response.json({ ok: false }, { status: 503 })
  }
}
