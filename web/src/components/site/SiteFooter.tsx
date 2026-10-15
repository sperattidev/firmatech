import Link from 'next/link'

import { getPayloadClient } from '@/lib/auth'

import { Logo } from './Logo'

export async function SiteFooter() {
  const payload = await getPayloadClient()
  const negocio = await payload.findGlobal({ slug: 'negocio' }).catch(() => null)

  return (
    <footer className="mt-24 border-t border-line">
      <div className="hazard h-1 opacity-60" aria-hidden="true" />
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-12 sm:px-6 md:grid-cols-[1.4fr_1fr_1fr]">
        <div className="space-y-4">
          <Logo />
          <p className="max-w-sm text-sm leading-relaxed text-muted">
            Servicio técnico de celulares, computadoras y tablets. Equipos sellados y usados
            certificados, accesorios y periféricos gaming.
          </p>
        </div>

        <div className="space-y-3">
          <p className="label">Contacto</p>
          <ul className="space-y-2 text-sm">
            <li>{negocio?.direccion || 'Firmat, Santa Fe'}</li>
            {negocio?.whatsapp && (
              <li>
                <a
                  className="hover:text-signal"
                  href={`https://wa.me/${negocio.whatsapp}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  WhatsApp
                </a>
              </li>
            )}
            {negocio?.email && (
              <li>
                <a className="hover:text-signal" href={`mailto:${negocio.email}`}>
                  {negocio.email}
                </a>
              </li>
            )}
            {negocio?.instagram && (
              <li>
                <a
                  className="hover:text-signal"
                  href={`https://instagram.com/${negocio.instagram.replace(/^@/, '')}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  @{negocio.instagram.replace(/^@/, '')}
                </a>
              </li>
            )}
          </ul>
        </div>

        <div className="space-y-3">
          <p className="label">Horarios</p>
          {negocio?.horarios?.length ? (
            <dl className="space-y-2 text-sm">
              {negocio.horarios.map((h) => (
                <div key={h.id} className="flex justify-between gap-4">
                  <dt className="text-muted">{h.dias}</dt>
                  <dd className="font-mono text-xs text-ink">{h.horario}</dd>
                </div>
              ))}
            </dl>
          ) : (
            <p className="text-sm text-muted">Atención con turno web.</p>
          )}
        </div>
      </div>
      <div className="border-t border-line">
        <div className="mx-auto flex max-w-6xl flex-wrap items-center justify-between gap-3 px-4 py-5 font-mono text-[11px] text-muted sm:px-6">
          <span>© {new Date().getFullYear()} FIRMATECH · FIRMAT, SANTA FE, AR</span>
          <Link href="/seguimiento" className="hover:text-signal">
            SEGUIR MI REPARACIÓN →
          </Link>
        </div>
      </div>
    </footer>
  )
}
