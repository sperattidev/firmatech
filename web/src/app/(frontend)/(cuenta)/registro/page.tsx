import type { Metadata } from 'next'
import Link from 'next/link'
import { redirect } from 'next/navigation'

import { AuthShell, Divider, GoogleButton } from '@/components/auth/AuthShell'
import { RegisterForm } from '@/components/auth/forms'
import { getCustomer } from '@/lib/auth'
import { googleEnabled } from '@/lib/google'

export const metadata: Metadata = { title: 'Crear cuenta', robots: { index: false } }

const BENEFICIOS = [
  'pedís turnos en segundos, sin repetir datos',
  'seguís cada reparación con todo el detalle',
  'tenés tus compras y garantías en un solo lugar',
]

export default async function RegistroPage() {
  if (await getCustomer()) redirect('/cuenta')

  return (
    <AuthShell
      code="A2"
      title="Creá tu cuenta"
      intro={
        <>
          <p>Con tu cuenta:</p>
          <ul className="space-y-2 font-mono text-sm">
            {BENEFICIOS.map((b) => (
              <li key={b}>
                <span className="text-signal">›</span> {b}
              </li>
            ))}
          </ul>
        </>
      }
    >
      {googleEnabled() && (
        <>
          <GoogleButton />
          <Divider>o con tu correo</Divider>
        </>
      )}
      <RegisterForm />
      <p className="mt-8 border-t border-line pt-6 text-sm text-muted">
        ¿Ya tenés cuenta?{' '}
        <Link
          href="/ingresar"
          className="text-ink underline decoration-signal underline-offset-4 hover:text-signal"
        >
          Ingresá
        </Link>
      </p>
    </AuthShell>
  )
}
