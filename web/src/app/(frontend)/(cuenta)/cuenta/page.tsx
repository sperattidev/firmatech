import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ProfileForm } from '@/components/auth/forms'
import { ButtonLink } from '@/components/ui/Button'
import { getCustomer } from '@/lib/auth'

import { salir } from '../actions'

export const metadata: Metadata = { title: 'Mi cuenta', robots: { index: false } }

export default async function CuentaPage() {
  const customer = await getCustomer()
  if (!customer) redirect('/ingresar?next=/cuenta')

  return (
    <section className="mx-auto max-w-6xl px-4 py-12 sm:px-6 md:py-16">
      <div className="flex flex-wrap items-end justify-between gap-6 border-b border-line pb-8">
        <div className="space-y-3">
          <p className="label">
            <span className="text-signal">C0</span> / Mi cuenta
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink">
            Hola, {customer.nombre}
          </h1>
          <p className="font-mono text-sm text-muted">{customer.email}</p>
        </div>
        <form action={salir}>
          <button
            type="submit"
            className="font-mono text-xs uppercase tracking-widest text-muted hover:text-fault"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="mt-10 grid gap-8 lg:grid-cols-[1.3fr_1fr]">
        <div className="space-y-8">
          <Panel code="C1" title="Mis reparaciones">
            <p className="text-sm text-muted">Todavía no tenés reparaciones registradas.</p>
            <ButtonLink href="/turnos" variant="secondary">
              Pedir turno
            </ButtonLink>
          </Panel>
          <Panel code="C2" title="Mis compras">
            <p className="text-sm text-muted">Todavía no hiciste compras.</p>
            <ButtonLink href="/tienda" variant="secondary">
              Ir a la tienda
            </ButtonLink>
          </Panel>
        </div>
        <Panel code="C3" title="Mis datos">
          <ProfileForm
            nombre={customer.nombre}
            apellido={customer.apellido}
            telefono={customer.telefono}
          />
        </Panel>
      </div>
    </section>
  )
}

function Panel({
  code,
  title,
  children,
}: {
  code: string
  title: string
  children: React.ReactNode
}) {
  return (
    <div className="border border-line bg-panel">
      <div className="flex items-center justify-between border-b border-line px-5 py-3">
        <h2 className="text-sm font-semibold text-ink">{title}</h2>
        <span className="font-mono text-[10px] text-muted">{code}</span>
      </div>
      <div className="space-y-5 p-5">{children}</div>
    </div>
  )
}
