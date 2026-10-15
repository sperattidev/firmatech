import type { Metadata, Viewport } from 'next'
import { IBM_Plex_Mono, IBM_Plex_Sans } from 'next/font/google'
import React from 'react'

import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { siteUrl } from '@/lib/site'
import './styles.css'

const plexSans = IBM_Plex_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-plex-sans',
  display: 'swap',
})

const plexMono = IBM_Plex_Mono({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-plex-mono',
  display: 'swap',
})

// Encabezado por usuario y datos del negocio desde la base: nada se pre-renderiza.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'Firmatech · Reparación y tecnología en Firmat',
    template: '%s · Firmatech',
  },
  description:
    'Servicio técnico de celulares, computadoras y tablets en Firmat, Santa Fe. Seguí tu reparación online. Celulares sellados y usados certificados, accesorios y periféricos gaming.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Firmatech',
  },
}

export const viewport: Viewport = {
  themeColor: '#0b0e11',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={`${plexSans.variable} ${plexMono.variable}`}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
