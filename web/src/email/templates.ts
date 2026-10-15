import { siteUrl } from '@/lib/site'

const escapeHtml = (value: string) => value.replace(/[&<>"']/g, (c) => `&#${c.charCodeAt(0)};`)

/** Plantilla mínima, compatible con clientes de correo (tablas + estilos inline). */
const layout = (
  title: string,
  body: string,
  action: { href: string; label: string },
) => `<!doctype html>
<html lang="es"><body style="margin:0;background:#0b0e11;font-family:Arial,Helvetica,sans-serif;color:#d7dde3">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="padding:32px 16px">
<tr><td align="center">
<table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="max-width:520px;background:#12161b;border:1px solid #232a32;border-radius:6px">
<tr><td style="padding:20px 28px;border-bottom:1px solid #232a32;font-family:'Courier New',monospace;font-size:14px;letter-spacing:2px;color:#f5f7fa">FIRMATECH<span style="color:#ff7a1a">_</span></td></tr>
<tr><td style="padding:28px">
<h1 style="margin:0 0 16px;font-size:20px;color:#f5f7fa">${escapeHtml(title)}</h1>
${body}
<p style="margin:28px 0"><a href="${action.href}" style="display:inline-block;background:#ff7a1a;color:#0b0e11;text-decoration:none;font-weight:bold;padding:12px 22px;border-radius:4px">${escapeHtml(action.label)}</a></p>
<p style="margin:0;font-size:12px;color:#7d8894">Si el botón no funciona, copiá este enlace:<br><span style="word-break:break-all;color:#aab4be">${action.href}</span></p>
</td></tr>
<tr><td style="padding:16px 28px;border-top:1px solid #232a32;font-size:12px;color:#7d8894">Firmatech · Firmat, Santa Fe · ${siteUrl().replace(/^https?:\/\//, '')}</td></tr>
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
