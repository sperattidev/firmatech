import type { Metadata, Viewport } from 'next'
import { DM_Sans } from 'next/font/google'
import React from 'react'

import { SiteFooter } from '@/components/site/SiteFooter'
import { SiteHeader } from '@/components/site/SiteHeader'
import { siteUrl } from '@/lib/site'
import './styles.css'

const dmSans = DM_Sans({
  subsets: ['latin'],
  weight: ['400', '500', '600', '700'],
  variable: '--font-dm-sans',
  display: 'swap',
})

// Encabezado por usuario y datos del negocio desde la base: nada se pre-renderiza.
export const dynamic = 'force-dynamic'

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl()),
  title: {
    default: 'Firmatech · Tecnología y servicio técnico en Firmat',
    template: '%s · Firmatech',
  },
  description:
    'Celulares nuevos y usados certificados, accesorios y gaming. Servicio técnico de celulares, computadoras y tablets en Firmat, Santa Fe, con seguimiento online.',
  openGraph: {
    type: 'website',
    locale: 'es_AR',
    siteName: 'Firmatech',
  },
}

export const viewport: Viewport = {
  themeColor: '#0f172a',
}

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="es-AR" className={dmSans.variable}>
      <body className="flex min-h-dvh flex-col">
        <SiteHeader />
        <main className="flex-1">{children}</main>
        <SiteFooter />
      </body>
    </html>
  )
}
