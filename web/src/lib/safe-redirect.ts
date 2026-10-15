/** Solo rutas internas: evita redirecciones abiertas a otros dominios (`//x.com`, `/\x.com`). */
export const safeNext = (value: unknown, fallback = '/cuenta'): string => {
  if (typeof value !== 'string') return fallback
  if (!value.startsWith('/') || value.startsWith('//') || value.startsWith('/\\')) return fallback
  return value
}
