import { describe, expect, it } from 'vitest'

import { safeNext } from '@/lib/safe-redirect'

describe('safeNext', () => {
  it('acepta rutas internas', () => {
    expect(safeNext('/cuenta')).toBe('/cuenta')
    expect(safeNext('/tienda?cat=gaming')).toBe('/tienda?cat=gaming')
  })

  it('rechaza destinos externos o raros', () => {
    for (const value of ['https://evil.com', '//evil.com', '/\\evil.com', 'cuenta', '', null, 42]) {
      expect(safeNext(value)).toBe('/cuenta')
    }
  })

  it('usa el fallback indicado', () => {
    expect(safeNext(undefined, '/')).toBe('/')
  })
})
