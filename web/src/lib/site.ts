/** URL pública del sitio, sin barra final. */
export const siteUrl = () =>
  (process.env.NEXT_PUBLIC_SERVER_URL || 'http://localhost:3000').replace(/\/$/, '')
