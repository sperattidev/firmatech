import { siteUrl } from '@/lib/site'

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/** Plantilla mínima, compatible con clientes de correo (tablas + estilos inline). */
const layout = (
  title: string,
  body: string,
  action: { href: string; label: string },
) => `<!doctype html>
<html lang="es"><body style="margin:0;background:#f3f4f6;font-family:Arial,Helvetica,sans-serif;color:#374151">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#ffffff;border:1px solid #e5e7eb;border-radius:16px">
<tr><td style="padding:22px 28px;border-bottom:1px solid #e5e7eb;font-size:22px;font-weight:bold;letter-spacing:-0.5px;color:#111827">firma<span style="color:#ff5a1f">tech</span></td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:22px;color:#111827">${escapeHtml(title)}</h1>
${body}
<p style="margin:28px 0"><a href="${action.href}" style="display:inline-block;background:#ff5a1f;color:#ffffff;text-decoration:none;font-weight:bold;padding:13px 24px;border-radius:12px">${escapeHtml(action.label)}</a></p>
<p style="margin:0;font-size:12px;color:#6b7280">Si el botón no funciona, copiá este enlace:<br><span style="word-break:break-all;color:#374151">${action.href}</span></p>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #e5e7eb;font-size:12px;color:#6b7280">Firmatech · Firmat, Santa Fe · ${siteUrl().replace(/^https?:\/\//, '')}</td></tr>
</table></td></tr></table></body></html>`

const p = (text: string) =>
  `<p style="margin:0 0 12px;font-size:15px;line-height:1.5">${escapeHtml(text)}</p>`

export const verifyEmailTemplate = (token: string, nombre?: string | null) =>
  layout(
    'Confirmá tu correo',
    p(`Hola${nombre ? ` ${nombre}` : ''}, gracias por crear tu cuenta en Firmatech.`) +
      p('Confirmá tu correo para poder ingresar y seguir tus reparaciones y compras.'),
    {
      href: `${siteUrl()}/verificar?token=${encodeURIComponent(token)}`,
      label: 'Confirmar correo',
    },
  )

export const resetPasswordTemplate = (token: string, nombre?: string | null) =>
  layout(
    'Restablecer contraseña',
    p(`Hola${nombre ? ` ${nombre}` : ''}, recibimos un pedido para cambiar tu contraseña.`) +
      p('El enlace vence en 1 hora. Si no lo pediste, ignorá este correo.'),
    {
      href: `${siteUrl()}/restablecer?token=${encodeURIComponent(token)}`,
      label: 'Elegir nueva contraseña',
    },
  )
