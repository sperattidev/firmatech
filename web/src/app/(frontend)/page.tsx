import Link from 'next/link'

import { PhoneArt } from '@/components/site/PhoneArt'
import { ButtonLink } from '@/components/ui/Button'
import {
  IconArrow,
  IconBattery,
  IconCard,
  IconCheck,
  IconCode,
  IconGamepad,
  IconLaptop,
  IconLayers,
  IconPhone,
  IconPlug,
  IconShield,
  IconTablet,
  IconTruck,
} from '@/components/ui/icons'

const BENEFICIOS = [
  { Icon: IconCard, titulo: 'Pagá como quieras', texto: 'Mercado Pago, transferencia o efectivo' },
  { Icon: IconTruck, titulo: 'Envío en la zona', texto: 'Firmat y alrededores, o retirás' },
  { Icon: IconShield, titulo: 'Garantía escrita', texto: 'En equipos y reparaciones' },
  { Icon: IconCheck, titulo: 'Usados verificados', texto: 'IMEI, batería y estado informados' },
]

const CATEGORIAS = [
  {
    href: '/tienda?categoria=celulares',
    Icon: IconPhone,
    titulo: 'Celulares nuevos',
    texto: 'Sellados en caja',
  },
  {
    href: '/tienda?categoria=usados',
    Icon: IconCheck,
    titulo: 'Usados certificados',
    texto: 'Revisados en el taller',
  },
  {
    href: '/tienda?categoria=cargadores',
    Icon: IconPlug,
    titulo: 'Cargadores y cables',
    texto: 'Originales y certificados',
  },
  {
    href: '/tienda?categoria=protectores',
    Icon: IconLayers,
    titulo: 'Fundas y templados',
    texto: 'Para cada modelo',
  },
  {
    href: '/tienda?categoria=gaming',
    Icon: IconGamepad,
    titulo: 'Gaming',
    texto: 'Teclados, mouse y auriculares',
  },
]

const REPARACIONES = [
  { Icon: IconPhone, titulo: 'Cambio de pantalla', texto: 'Celulares y tablets' },
  { Icon: IconBattery, titulo: 'Cambio de batería', texto: 'Celulares y notebooks' },
  { Icon: IconLaptop, titulo: 'Limpieza y mantenimiento', texto: 'Notebooks y PC' },
  { Icon: IconPlug, titulo: 'Pin de carga', texto: 'Celulares y tablets' },
  { Icon: IconTablet, titulo: 'Táctil y display', texto: 'Tablets' },
  { Icon: IconCode, titulo: 'Software y datos', texto: 'Formateo, respaldo, virus' },
]

export default function HomePage() {
  return (
    <div className="mx-auto max-w-7xl px-4 sm:px-6">
      <section className="grid gap-4 py-6 lg:grid-cols-[1.6fr_1fr]">
        <div className="relative flex min-h-[340px] flex-col justify-center overflow-hidden rounded-3xl bg-navy p-8 text-white sm:p-10">
          <div className="relative z-10 max-w-md">
            <p className="text-xs font-bold tracking-[0.08em] text-[#ffb38f] uppercase">
              Servicio técnico
            </p>
            <h1 className="mt-3 text-4xl leading-[1.05] font-bold tracking-[-0.035em] sm:text-[46px]">
              Reparamos tu equipo y lo seguís online.
            </h1>
            <p className="mt-4 leading-relaxed text-slate-300">
              Celulares, computadoras y tablets. Presupuesto que aprobás desde la web, repuestos de
              calidad y garantía escrita.
            </p>
            <ButtonLink href="/turnos" className="mt-6">
              Pedir turno
            </ButtonLink>
          </div>
          <div
            className="absolute -right-2 -bottom-16 hidden rotate-[14deg] lg:block"
            aria-hidden="true"
          >
            <PhoneArt width={130} />
          </div>
        </div>

        <div className="flex flex-col justify-center rounded-3xl border border-line bg-card p-8">
          <p className="text-[13px] font-bold tracking-[0.06em] text-brand uppercase">
            Seguimiento
          </p>
          <h2 className="mt-2 text-2xl font-bold tracking-[-0.02em]">¿Dónde está mi equipo?</h2>
          <p className="mt-1 text-muted">Ingresá el código de tu comprobante.</p>
          <form action="/seguimiento" className="mt-5 flex gap-2">
            <input
              name="codigo"
              required
              placeholder="FT-0142"
              aria-label="Código de seguimiento"
              autoComplete="off"
              className="h-12 min-w-0 flex-1 rounded-xl border border-line px-3.5 text-[15px] uppercase placeholder:normal-case focus:border-ink focus:outline-none"
            />
            <button className="h-12 rounded-xl bg-navy px-5 font-semibold text-white hover:bg-black">
              Ver estado
            </button>
          </form>
          <p className="mt-3 text-[13px] text-muted">
            Con tu{' '}
            <Link href="/cuenta" className="font-medium text-ink underline underline-offset-2">
              cuenta
            </Link>{' '}
            ves el diagnóstico, el presupuesto y las fotos.
          </p>
        </div>
      </section>

      <section
        aria-label="Beneficios"
        className="grid gap-4 rounded-2xl border border-line bg-card p-5 sm:grid-cols-2 lg:grid-cols-4"
      >
        {BENEFICIOS.map(({ Icon, titulo, texto }) => (
          <div key={titulo} className="flex items-center gap-3">
            <span className="grid h-10 w-10 flex-none place-items-center rounded-xl bg-brand-soft text-brand">
              <Icon size={20} />
            </span>
            <span className="text-sm">
              <b className="block">{titulo}</b>
              <span className="text-muted">{texto}</span>
            </span>
          </div>
        ))}
      </section>

      <Section titulo="Comprá por categoría" link={{ href: '/tienda', label: 'Ver tienda' }}>
        <div className="grid grid-cols-2 gap-3.5 md:grid-cols-3 lg:grid-cols-5">
          {CATEGORIAS.map(({ href, Icon, titulo, texto }) => (
            <Link
              key={href}
              href={href}
              className="group rounded-2xl border border-line bg-card p-5 transition-shadow hover:shadow-lg hover:shadow-black/5"
            >
              <span className="grid aspect-[4/3] place-items-center rounded-xl bg-bg text-ink transition-colors group-hover:text-brand">
                <Icon size={40} strokeWidth={1.4} />
              </span>
              <h3 className="mt-4 font-semibold">{titulo}</h3>
              <p className="text-sm text-muted">{texto}</p>
            </Link>
          ))}
        </div>
      </Section>

      <Section titulo="Reparaciones más pedidas" link={{ href: '/turnos', label: 'Pedir turno' }}>
        <div className="grid gap-3.5 md:grid-cols-2 lg:grid-cols-3">
          {REPARACIONES.map(({ Icon, titulo, texto }) => (
            <Link
              key={titulo}
              href="/turnos"
              className="group flex items-center gap-4 rounded-2xl border border-line bg-card p-5 hover:border-ink"
            >
              <span className="grid h-11 w-11 flex-none place-items-center rounded-xl bg-brand-soft text-brand">
                <Icon size={22} />
              </span>
              <span className="min-w-0 flex-1">
                <b className="block">{titulo}</b>
                <span className="text-sm text-muted">{texto}</span>
              </span>
              <IconArrow
                size={18}
                className="text-muted transition-transform group-hover:translate-x-0.5 group-hover:text-ink"
              />
            </Link>
          ))}
        </div>
      </Section>
    </div>
  )
}

function Section({
  titulo,
  link,
  children,
}: {
  titulo: string
  link: { href: string; label: string }
  children: React.ReactNode
}) {
  return (
    <section className="pt-10">
      <div className="mb-4 flex items-baseline justify-between gap-4">
        <h2 className="text-2xl font-bold tracking-[-0.02em]">{titulo}</h2>
        <Link href={link.href} className="text-sm font-semibold text-brand hover:underline">
          {link.label} →
        </Link>
      </div>
      {children}
    </section>
  )
}
