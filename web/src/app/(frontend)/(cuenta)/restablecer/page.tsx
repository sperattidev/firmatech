import type { Metadata } from 'next'
import Link from 'next/link'

import { AuthShell } from '@/components/auth/AuthShell'
import { ResetForm } from '@/components/auth/forms'
import { FormMessage } from '@/components/ui/Field'

export const metadata: Metadata = { title: 'Nueva contraseña', robots: { index: false } }

export default async function RestablecerPage({
  searchParams,
}: {
  searchParams: Promise<{ token?: string }>
}) {
  const { token } = await searchParams
  return (
    <AuthShell
      title="Elegí una contraseña nueva"
      intro={<p>Después vas a quedar con la sesión iniciada.</p>}
    >
      {token ? (
        <ResetForm token={token} />
      ) : (
        <div className="space-y-4">
          <FormMessage>Falta el enlace de recuperación.</FormMessage>
          <Link href="/recuperar" className="text-sm font-semibold text-brand hover:underline">
            Pedir uno nuevo
          </Link>
        </div>
      )}
    </AuthShell>
  )
}
