import { resendAdapter } from '@payloadcms/email-resend'
import type { EmailAdapter } from 'payload'

const from = {
  defaultFromAddress: process.env.EMAIL_FROM || 'no-responder@firmatech.com.ar',
  defaultFromName: 'Firmatech',
}

/** En desarrollo, sin RESEND_API_KEY, los correos se imprimen en la consola del servidor. */
const consoleAdapter: EmailAdapter = ({ payload }) => ({
  name: 'console',
  ...from,
  sendEmail: async (message) => {
    const html = typeof message.html === 'string' ? message.html : ''
    const links = [...html.matchAll(/href="([^"]+)"/g)].map((m) => m[1])
    payload.logger.info(
      { to: message.to, subject: message.subject, links: [...new Set(links)] },
      '[email] no enviado (sin RESEND_API_KEY)',
    )
  },
})

export const emailAdapter = (): EmailAdapter => {
  if (process.env.RESEND_API_KEY) {
    return resendAdapter({ apiKey: process.env.RESEND_API_KEY, ...from })
  }
  // Durante `next build` no se envían correos: solo se exige la clave al ejecutar.
  if (
    process.env.NODE_ENV === 'production' &&
    process.env.NEXT_PHASE !== 'phase-production-build'
  ) {
    throw new Error(
      'Falta RESEND_API_KEY: en producción los correos de verificación son obligatorios',
    )
  }
  return consoleAdapter
}
