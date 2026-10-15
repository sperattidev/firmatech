import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AuthShell, Divider, GoogleButton } from '@/components/auth/AuthShell'
import { LoginForm } from '@/components/auth/forms'
import { FormMessage } from '@/components/ui/Field'
import { getCustomer } from '@/lib/auth'
import { googleEnabled } from '@/lib/google'
import { safeNext } from '@/lib/safe-redirect'

export const metadata: Metadata = { title: 'Ingresar', robots: { index: false } }

const ERRORES: Record<string, string> = {
  'google-no-disponible': 'El ingreso con Google todavía no está habilitado.',
  'google-cancelado': 'Se canceló el ingreso con Google. Probá de nuevo.',
  'google-fallo': 'Google no respondió bien. Probá de nuevo.',
  'google-sin-email': 'Tu cuenta de Google no tiene un correo verificado.',
  'cuenta-bloqueada': 'Cuenta bloqueada por intentos fallidos. Probá en 15 minutos.',
}

export default async function IngresarPage({
  searchParams,
}: {
  searchParams: Promise<{ next?: string; error?: string }>
}) {
  const { next: rawNext, error } = await searchParams
  const next = safeNext(rawNext)
  if (await getCustomer()) redirect(next)

  return (
    <AuthShell
      code="A1"
      title="Ingresá a tu cuenta"
      intro={
        <p>
          Desde tu cuenta ves el detalle completo de tus reparaciones (diagnóstico, presupuesto,
          fotos) y el historial de compras.
        </p>
      }
    >
      {error && ERRORES[error] && (
        <div className="mb-6">
          <FormMessage>{ERRORES[error]}</FormMessage>
        </div>
      )}
      {googleEnabled() && (
        <>
          <GoogleButton next={next} />
          <Divider>o con tu correo</Divider>
        </>
      )}
      <LoginForm next={next} />
      <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
        ¿No tenés cuenta?{' '}
        <Link
          href="/registro"
          className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
        >
          Creala gratis
        </Link>
      </p>
    </AuthShell>
  )
}
