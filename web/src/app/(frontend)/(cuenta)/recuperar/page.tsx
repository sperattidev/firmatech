import type { Metadata } from 'next'

import { AuthShell } from '@/components/auth/AuthShell'
import { ForgotForm } from '@/components/auth/forms'

export const metadata: Metadata = { title: 'Recuperar contraseña', robots: { index: false } }

export default function RecuperarPage() {
  return (
    <AuthShell
      title="Recuperar contraseña"
      intro={<p>Te mandamos un enlace a tu correo para que elijas una contraseña nueva.</p>}
    >
      <ForgotForm />
    </AuthShell>
  )
}
