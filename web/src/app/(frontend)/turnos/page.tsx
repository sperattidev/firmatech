import type { Metadata } from 'next'

import { EnConstruccion } from '@/components/site/EnConstruccion'

export const metadata: Metadata = { title: 'Turnos de reparación' }

export default function Page() {
  return <EnConstruccion title="Turnos de reparación" />
}
