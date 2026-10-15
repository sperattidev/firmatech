import Link from 'next/link'

import { getCustomer } from '@/lib/auth'

import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'

const NAV = [
  { href: '/turnos', label: 'Reparaciones', code: '01' },
  { href: '/tienda', label: 'Tienda', code: '02' },
  { href: '/seguimiento', label: 'Seguimiento', code: '03' },
]

export async function SiteHeader() {
  const customer = await getCustomer()
  const cuenta = customer
    ? { href: '/cuenta', label: customer.nombre }
    : { href: '/ingresar', label: 'Ingresar' }

  return (
    <header className="sticky top-0 z-40 border-b border-line bg-base/95 backdrop-blur-sm">
      <div className="mx-auto flex h-16 max-w-6xl items-center justify-between gap-6 px-4 sm:px-6">
        <Logo />

        <nav aria-label="Principal" className="hidden items-center gap-1 md:flex">
          {NAV.map((item) => (
            <Link
              key={item.href}
              href={item.href}
              className="group flex items-baseline gap-2 px-3 py-2 text-sm text-body transition-colors hover:text-ink"
            >
              <span className="font-mono text-[10px] text-muted group-hover:text-signal">
                {item.code}
              </span>
              {item.label}
            </Link>
          ))}
          <Link
            href={cuenta.href}
            className="ml-3 max-w-40 truncate border border-line-strong px-4 py-2 font-mono text-xs uppercase tracking-widest text-ink transition-colors hover:border-signal hover:text-signal"
          >
            {cuenta.label}
          </Link>
        </nav>

        <MobileMenu>
          <summary className="flex cursor-pointer list-none items-center gap-2 border border-line-strong px-3 py-2 font-mono text-xs uppercase tracking-widest text-ink [&::-webkit-details-marker]:hidden">
            Menú
            <span className="text-signal group-open:rotate-45 transition-transform">+</span>
          </summary>
          <nav
            aria-label="Principal"
            className="absolute right-0 mt-2 w-60 border border-line bg-panel p-2 shadow-2xl"
          >
            {[...NAV, { ...cuenta, code: '04' }].map((item) => (
              <Link
                key={item.href}
                href={item.href}
                className="flex items-baseline gap-3 px-3 py-3 text-sm text-body hover:bg-raised hover:text-ink"
              >
                <span className="font-mono text-[10px] text-signal">{item.code}</span>
                {item.label}
              </Link>
            ))}
          </nav>
        </MobileMenu>
      </div>
    </header>
  )
}
