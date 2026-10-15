import Link from 'next/link'

import { getPayloadClient } from '@/lib/auth'

import { Logo } from './Logo'

const COLUMNAS = [
  {
    titulo: 'Comprar',
    links: [
      { href: '/tienda?categoria=celulares', label: 'Celulares nuevos' },
      { href: '/tienda?categoria=usados', label: 'Usados certificados' },
      { href: '/tienda?categoria=cargadores', label: 'Accesorios' },
      { href: '/tienda?categoria=gaming', label: 'Gaming' },
    ],
  },
  {
    titulo: 'Servicio técnico',
    links: [
      { href: '/turnos', label: 'Pedir turno' },
      { href: '/seguimiento', label: 'Seguir mi reparación' },
      { href: '/cuenta', label: 'Mi cuenta' },
    ],
  },
]

export async function SiteFooter() {
  const payload = await getPayloadClient()
  const negocio = await payload.findGlobal({ slug: 'negocio' }).catch(() => null)
  const ig = negocio?.instagram?.replace(/^@/, '')

  return (
    <footer className="mt-16 border-t border-line bg-card">
      <div className="mx-auto grid max-w-7xl gap-10 px-4 py-12 text-sm text-muted sm:px-6 md:grid-cols-[2fr_1fr_1fr_1fr]">
        <div className="space-y-3">
          <Logo />
          <p className="max-w-xs leading-relaxed">
            Tienda de tecnología y servicio técnico en {negocio?.direccion || 'Firmat, Santa Fe'}.
          </p>
        </div>

        {COLUMNAS.map((col) => (
          <div key={col.titulo}>
            <h2 className="mb-3 font-semibold text-ink">{col.titulo}</h2>
            <ul className="space-y-2">
              {col.links.map((l) => (
                <li key={l.href}>
                  <Link href={l.href} className="hover:text-brand">
                    {l.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>
        ))}

        <div>
          <h2 className="mb-3 font-semibold text-ink">Contacto</h2>
          <ul className="space-y-2">
            <li>{negocio?.direccion || 'Firmat, Santa Fe'}</li>
            {negocio?.whatsapp && (
              <li>
                <a
                  className="hover:text-brand"
                  href={`https://wa.me/${negocio.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {ig && (
              <li>
                <a
                  className="hover:text-brand"
                  href={`https://instagram.com/${ig}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Instagram
                </a>
              </li>
            )}
            {negocio?.email && (
              <li>
                <a className="hover:text-brand" href={`mailto:${negocio.email}`}>
                  {negocio.email}
                </a>
              </li>
            )}
            {negocio?.horarios?.map((h) => (
              <li key={h.id}>
                {h.dias}: {h.horario}
              </li>
            ))}
          </ul>
        </div>
      </div>
      <div className="border-t border-line">
        <p className="mx-auto max-w-7xl px-4 py-5 text-[13px] text-muted sm:px-6">
          © {new Date().getFullYear()} Firmatech · Firmat, Santa Fe, Argentina
        </p>
      </div>
    </footer>
  )
}
