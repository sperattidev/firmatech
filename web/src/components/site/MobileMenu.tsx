'use client'

import { usePathname } from 'next/navigation'
import { useEffect, useRef, type ReactNode } from 'react'

/** <details> nativo (funciona sin JS); con JS se cierra al navegar o al tocar afuera. */
export function MobileMenu({ children }: { children: ReactNode }) {
  const ref = useRef<HTMLDetailsElement>(null)
  const pathname = usePathname()

  useEffect(() => {
    ref.current?.removeAttribute('open')
  }, [pathname])

  useEffect(() => {
    const onClick = (e: MouseEvent) => {
      if (ref.current?.open && !ref.current.contains(e.target as Node)) {
        ref.current.removeAttribute('open')
      }
    }
    document.addEventListener('click', onClick)
    return () => document.removeEventListener('click', onClick)
  }, [])

  return (
    <details ref={ref} className="group relative md:hidden">
      {children}
    </details>
  )
}
