import Link from 'next/link'

import { IconCart, IconMenu, IconSearch, IconUser } from '@/components/ui/icons'
import { getCustomer } from '@/lib/auth'

import { Logo } from './Logo'
import { MobileMenu } from './MobileMenu'
import { CATEGORIAS } from './nav'

function Search({ className = '' }: { className?: string }) {
  return (
    <form action="/tienda" role="search" className={`relative ${className}`}>
      <IconSearch
        size={18}
        className="pointer-events-none absolute top-1/2 left-3.5 -translate-y-1/2 text-muted"
      />
      <input
        type="search"
        name="q"
        placeholder="Buscar celulares, accesorios, repuestos…"
        aria-label="Buscar en la tienda"
        className="h-11 w-full rounded-xl border border-line bg-bg pr-4 pl-10 text-[15px] placeholder:text-muted focus:border-ink focus:bg-card focus:outline-none"
      />
    </form>
  )
}

export async function SiteHeader() {
  const customer = await getCustomer()
  const cuenta = customer
    ? { href: '/cuenta', label: customer.nombre }
    : { href: '/ingresar', label: 'Ingresar' }

  return (
    <header className="sticky top-0 z-40">
      <div className="bg-navy px-4 py-2 text-center text-[13px] text-white/90">
        <span className="hidden sm:inline">
          Pagá con Mercado Pago · Envíos en Firmat y la zona ·{' '}
        </span>
        <Link href="/seguimiento" className="font-semibold text-[#ffb38f] hover:underline">
          Seguí tu reparación online
        </Link>
      </div>

      <div className="border-b border-line bg-card">
        <div className="mx-auto flex h-[72px] max-w-7xl items-center gap-6 px-4 sm:px-6">
          <Logo />
          <Search className="hidden max-w-xl flex-1 md:block" />

          <nav aria-label="Cuenta" className="ml-auto hidden items-center gap-5 md:flex">
            <Link href="/seguimiento" className="text-sm font-medium hover:text-brand">
              Seguimiento
            </Link>
            <Link
              href={cuenta.href}
              className="flex max-w-40 items-center gap-1.5 text-sm font-medium hover:text-brand"
            >
              <IconUser size={18} />
              <span className="truncate">{cuenta.label}</span>
            </Link>
            <Link
              href="/carrito"
              className="flex items-center gap-2 rounded-xl bg-navy px-4 py-2.5 text-sm font-semibold text-white hover:bg-black"
            >
              <IconCart size={18} />
              Carrito
            </Link>
          </nav>

          <div className="ml-auto flex items-center gap-2 md:hidden">
            <Link
              href="/carrito"
              aria-label="Carrito"
              className="grid h-11 w-11 place-items-center rounded-xl bg-navy text-white"
            >
              <IconCart size={20} />
            </Link>
            <MobileMenu
              summary={
                <span className="grid h-11 w-11 place-items-center rounded-xl border border-line">
                  <IconMenu size={20} />
                  <span className="sr-only">Menú</span>
                </span>
              }
            >
              <Search className="mb-2" />
              {[
                { href: '/seguimiento', label: 'Seguimiento' },
                { href: cuenta.href, label: customer ? 'Mi cuenta' : 'Ingresar' },
                ...CATEGORIAS,
              ].map((item) => (
                <Link
                  key={item.href}
                  href={item.href}
                  className="block rounded-lg px-3 py-3 text-[15px] font-medium hover:bg-bg"
                >
                  {item.label}
                </Link>
              ))}
            </MobileMenu>
          </div>
        </div>

        <nav aria-label="Categorías" className="hidden border-t border-line md:block">
          <div className="mx-auto flex h-12 max-w-7xl items-center gap-7 overflow-x-auto px-4 text-sm font-medium whitespace-nowrap text-body sm:px-6">
            {CATEGORIAS.map((c) => (
              <Link
                key={c.href}
                href={c.href}
                className={c.destacada ? 'font-bold text-brand' : 'hover:text-brand'}
              >
                {c.label}
              </Link>
            ))}
          </div>
        </nav>
      </div>
    </header>
  )
}
