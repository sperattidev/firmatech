import { ButtonLink } from '@/components/ui/Button'

const SERVICIOS = [
  {
    code: 'S-01',
    title: 'Celulares',
    items: ['Módulos y pantallas', 'Baterías', 'Pin de carga', 'Microsoldadura'],
  },
  {
    code: 'S-02',
    title: 'Computadoras',
    items: ['Diagnóstico de placa', 'Limpieza y pasta térmica', 'Upgrades SSD / RAM', 'Notebooks'],
  },
  {
    code: 'S-03',
    title: 'Tablets',
    items: ['Táctiles y displays', 'Baterías', 'Conectores', 'Recuperación'],
  },
  {
    code: 'S-04',
    title: 'Software',
    items: ['Formateo e instalación', 'Respaldo de datos', 'Eliminación de virus', 'Optimización'],
  },
]

const TIENDA = [
  { code: 'T-01', title: 'Celulares sellados', desc: 'Equipos OEM en caja, con garantía.' },
  {
    code: 'T-02',
    title: 'Usados certificados',
    desc: 'Cada unidad con IMEI, % de batería y grado estético informados.',
  },
  {
    code: 'T-03',
    title: 'Accesorios críticos',
    desc: 'Cargadores, cables, templados y fundas que sí funcionan.',
  },
  { code: 'T-04', title: 'Periféricos gaming', desc: 'Teclados, mouse, auriculares y más.' },
]

const PASOS = [
  { n: '01', t: 'Pedís turno', d: 'Desde la web, en menos de un minuto.' },
  { n: '02', t: 'Ingreso del equipo', d: 'Lo registramos con fotos y te damos un código.' },
  { n: '03', t: 'Diagnóstico y presupuesto', d: 'Lo ves y lo aprobás online.' },
  { n: '04', t: 'Reparación y retiro', d: 'Seguís cada etapa hasta que está listo.' },
]

const EJEMPLO = [
  { estado: 'Ingresado', hora: '09:12', done: true },
  { estado: 'En diagnóstico', hora: '10:40', done: true },
  { estado: 'Presupuesto aprobado', hora: '11:05', done: true },
  { estado: 'En reparación', hora: 'ahora', done: false, active: true },
  { estado: 'Listo para retirar', hora: '—', done: false },
]

export default function HomePage() {
  return (
    <>
      <section className="blueprint relative overflow-hidden border-b border-line">
        <div className="mx-auto grid max-w-6xl items-center gap-12 px-4 py-16 sm:px-6 md:py-24 lg:grid-cols-[1.15fr_1fr]">
          <div className="space-y-7">
            <p className="label">
              <span className="text-signal">●</span> Servicio técnico · Firmat, Santa Fe
            </p>
            <h1 className="text-4xl font-semibold leading-[1.05] tracking-tight text-ink sm:text-5xl lg:text-6xl">
              Reparamos tu equipo.
              <br />
              <span className="text-muted">Vos seguís cada paso.</span>
            </h1>
            <p className="max-w-lg text-lg leading-relaxed">
              Celulares, computadoras y tablets con diagnóstico claro, presupuesto aprobado online y
              estado en tiempo real desde la web.
            </p>
            <div className="flex flex-wrap gap-3">
              <ButtonLink href="/turnos">Pedir turno</ButtonLink>
              <ButtonLink href="/seguimiento" variant="secondary">
                Seguir mi reparación
              </ButtonLink>
            </div>
          </div>

          <figure
            className="brackets border border-line bg-panel/90"
            aria-label="Ejemplo de seguimiento de una reparación"
          >
            <div className="flex items-center justify-between border-b border-line px-5 py-3">
              <span className="font-mono text-xs text-ink">ORDEN FT-2026-0142</span>
              <span className="font-mono text-[10px] uppercase tracking-widest text-muted">
                Ejemplo
              </span>
            </div>
            <div className="space-y-1 px-5 py-4">
              <p className="text-sm text-ink">iPhone 13 · cambio de módulo</p>
              <p className="font-mono text-xs text-muted">Técnico asignado · garantía 90 días</p>
            </div>
            <ol className="border-t border-line px-5 py-4">
              {EJEMPLO.map((paso) => (
                <li key={paso.estado} className="flex items-center gap-4 py-2">
                  <span
                    className={`h-2.5 w-2.5 shrink-0 ${
                      paso.active
                        ? 'animate-pulse bg-signal'
                        : paso.done
                          ? 'bg-ok'
                          : 'border border-line-strong'
                    }`}
                    aria-hidden="true"
                  />
                  <span
                    className={`flex-1 text-sm ${paso.active ? 'text-ink' : paso.done ? 'text-body' : 'text-muted'}`}
                  >
                    {paso.estado}
                  </span>
                  <span className="font-mono text-[11px] text-muted">{paso.hora}</span>
                </li>
              ))}
            </ol>
          </figure>
        </div>
      </section>

      <Section code="01" title="Servicio técnico" kicker="Hardware y software">
        <div className="grid gap-px border border-line bg-line sm:grid-cols-2 lg:grid-cols-4">
          {SERVICIOS.map((s) => (
            <article key={s.code} className="group bg-base p-6 transition-colors hover:bg-panel">
              <p className="font-mono text-[11px] text-muted group-hover:text-signal">{s.code}</p>
              <h3 className="mt-6 text-xl font-semibold text-ink">{s.title}</h3>
              <ul className="mt-4 space-y-1.5 text-sm text-muted">
                {s.items.map((i) => (
                  <li key={i}>— {i}</li>
                ))}
              </ul>
            </article>
          ))}
        </div>
      </Section>

      <Section code="02" title="Cómo funciona el seguimiento" kicker="Trazabilidad completa">
        <ol className="grid gap-8 md:grid-cols-4">
          {PASOS.map((p) => (
            <li key={p.n} className="space-y-3 border-t border-line-strong pt-5">
              <span className="font-mono text-sm text-signal">{p.n}</span>
              <h3 className="font-semibold text-ink">{p.t}</h3>
              <p className="text-sm text-muted">{p.d}</p>
            </li>
          ))}
        </ol>
      </Section>

      <Section code="03" title="Tienda" kicker="Equipos y accesorios">
        <div className="grid gap-4 sm:grid-cols-2">
          {TIENDA.map((t) => (
            <article
              key={t.code}
              className="flex items-start justify-between gap-6 border border-line bg-panel p-6"
            >
              <div className="space-y-2">
                <h3 className="text-lg font-semibold text-ink">{t.title}</h3>
                <p className="text-sm text-muted">{t.desc}</p>
              </div>
              <span className="font-mono text-[11px] text-muted">{t.code}</span>
            </article>
          ))}
        </div>
        <div className="mt-8">
          <ButtonLink href="/tienda" variant="secondary">
            Ver la tienda
          </ButtonLink>
        </div>
      </Section>
    </>
  )
}

function Section({
  code,
  title,
  kicker,
  children,
}: {
  code: string
  title: string
  kicker: string
  children: React.ReactNode
}) {
  return (
    <section className="mx-auto max-w-6xl px-4 pt-20 sm:px-6 md:pt-28">
      <header className="mb-10 flex flex-wrap items-end justify-between gap-4">
        <div className="space-y-3">
          <p className="label">
            <span className="text-signal">{code}</span> / {kicker}
          </p>
          <h2 className="text-2xl font-semibold tracking-tight text-ink sm:text-3xl">{title}</h2>
        </div>
      </header>
      {children}
    </section>
  )
}
