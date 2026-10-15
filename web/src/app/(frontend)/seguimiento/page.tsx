import type { Metadata } from 'next'

import { EnConstruccion } from '@/components/site/EnConstruccion'

export const metadata: Metadata = { title: 'Seguimiento de reparación' }

export default function Page() {
  return <EnConstruccion code="03" title="Seguimiento de reparación" />
}
