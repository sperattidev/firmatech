import type { Metadata } from 'next'

import { AuthShell } from '@/components/auth/AuthShell'
import { ButtonLink } from '@/components/ui/Button'
import { FormMessage } from '@/components/ui/Field'
import { getPayloadClient } from '@/lib/auth'

export const metadata: Metadata = { title: 'Confirmar correo', robots: { index: false } }

export default async function VerificarPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  let ok = false
  if (token) {
    const payload = await getPayloadClient()
    ok = await payload
      .verifyEmail({ collection: 'customers', token })
      .then(() => true)
      .catch(() => false)
  }

  return (
    <AuthShell title={ok ? 'Correo confirmado' : 'No pudimos confirmar'} intro={null}>
      <div className="space-y-6">
        {ok ? (
          <FormMessage tone="ok">Tu cuenta está activa. Ya podés ingresar.</FormMessage>
        ) : (
          <FormMessage>
            El enlace no es válido o ya fue usado. Si ya confirmaste, ingresá normalmente.
          </FormMessage>
        )}
        <ButtonLink href="/ingresar">Ingresar</ButtonLink>
      </div>
    </AuthShell>
  )
}
