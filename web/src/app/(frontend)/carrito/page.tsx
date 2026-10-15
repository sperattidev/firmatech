import type { Metadata } from 'next'

import { EnConstruccion } from '@/components/site/EnConstruccion'

export const metadata: Metadata = { title: 'Carrito' }

export default function Page() {
  return <EnConstruccion title="Carrito" />
}
