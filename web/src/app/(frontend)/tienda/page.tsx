import type { Metadata } from 'next'

import { EnConstruccion } from '@/components/site/EnConstruccion'

export const metadata: Metadata = { title: 'Tienda' }

export default function Page() {
  return <EnConstruccion code="02" title="Tienda" />
}
