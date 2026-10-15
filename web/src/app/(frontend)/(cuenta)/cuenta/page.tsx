import type { Metadata } from 'next'
import { redirect } from 'next/navigation'

import { ProfileForm } from '@/components/auth/forms'
import { ButtonLink } from '@/components/ui/Button'
import { IconCart, IconPhone } from '@/components/ui/icons'
import { getCustomer } from '@/lib/auth'

import { salir } from '../actions'

export const metadata: Metadata = { title: 'Mi cuenta', robots: { index: false } }

export default async function CuentaPage() {
  const customer = await getCustomer()
  if (!customer) redirect('/ingresar?next=/cuenta')

  return (
    <section className="mx-auto max-w-7xl px-4 py-8 sm:px-6 md:py-10">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-bold tracking-[-0.03em]">Hola, {customer.nombre}</h1>
          <p className="mt-1 text-muted">{customer.email}</p>
        </div>
        <form action={salir}>
          <button
            type="submit"
            className="rounded-xl border border-line bg-card px-4 py-2.5 text-sm font-semibold hover:border-danger hover:text-danger"
          >
            Cerrar sesión
          </button>
        </form>
      </div>

      <div className="mt-8 grid gap-4 lg:grid-cols-[1.4fr_1fr]">
        <div className="space-y-4">
          <Panel title="Mis reparaciones">
            <Empty
              icon={<IconPhone size={24} />}
              texto="Todavía no tenés reparaciones registradas."
              accion={<ButtonLink href="/turnos">Pedir turno</ButtonLink>}
            />
          </Panel>
          <Panel title="Mis compras">
            <Empty
              icon={<IconCart size={24} />}
              texto="Todavía no hiciste compras."
              accion={
                <ButtonLink href="/tienda" variant="secondary">
                  Ir a la tienda
                </ButtonLink>
              }
            />
          </Panel>
        </div>
        <Panel title="Mis datos">
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

function Panel({ title, children }: { title: string; children: React.ReactNode }) {
  return (
    <div className="rounded-2xl border border-line bg-card p-6">
      <h2 className="mb-5 text-lg font-bold">{title}</h2>
      {children}
    </div>
  )
}

function Empty({
  icon,
  texto,
  accion,
}: {
  icon: React.ReactNode
  texto: string
  accion: React.ReactNode
}) {
  return (
    <div className="flex flex-wrap items-center gap-4 rounded-xl bg-bg p-4">
      <span className="grid h-11 w-11 place-items-center rounded-xl bg-card text-muted">
        {icon}
      </span>
      <p className="min-w-0 flex-1 text-sm text-muted">{texto}</p>
      {accion}
    </div>
  )
}
