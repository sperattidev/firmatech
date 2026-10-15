import type { ReactNode } from 'react'

export function AuthShell({
  code,
  title,
  intro,
  children,
}: {
  code: string
  title: string
  intro: ReactNode
  children: ReactNode
}) {
  return (
    <section className="blueprint border-b border-line">
      <div className="mx-auto grid max-w-6xl gap-10 px-4 py-14 sm:px-6 md:grid-cols-[1fr_minmax(0,440px)] md:py-20">
        <div className="space-y-5 md:pt-6">
          <p className="label">
            <span className="text-signal">{code}</span> / Cuenta
          </p>
          <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
          <div className="max-w-md space-y-3 leading-relaxed text-muted">{intro}</div>
        </div>
        <div className="brackets border border-line bg-panel p-6 sm:p-8">{children}</div>
      </div>
    </section>
  )
}

export function GoogleButton({ next }: { next?: string }) {
  const href = next ? `/auth/google?next=${encodeURIComponent(next)}` : '/auth/google'
  return (
    // Enlace común (no <Link>): es una ruta de servidor que redirige a Google.
    <a
      href={href}
      className="flex w-full items-center justify-center gap-3 border border-line-strong bg-raised px-5 py-3 text-sm font-medium text-ink transition-colors hover:border-ink"
    >
      <svg width="18" height="18" viewBox="0 0 48 48" aria-hidden="true">
        <path
          fill="#FFC107"
          d="M43.6 20.5H42V20H24v8h11.3C33.7 32.7 29.2 36 24 36c-6.6 0-12-5.4-12-12s5.4-12 12-12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 12.9 4 4 12.9 4 24s8.9 20 20 20 20-8.9 20-20c0-1.3-.1-2.4-.4-3.5z"
        />
        <path
          fill="#FF3D00"
          d="m6.3 14.7 6.6 4.8C14.7 15.1 19 12 24 12c3.1 0 5.8 1.2 7.9 3l5.7-5.7C34 6.1 29.3 4 24 4 16.3 4 9.7 8.3 6.3 14.7z"
        />
        <path
          fill="#4CAF50"
          d="M24 44c5.2 0 9.9-2 13.4-5.2l-6.2-5.2C29.2 35.1 26.7 36 24 36c-5.2 0-9.6-3.3-11.3-8l-6.5 5C9.5 39.6 16.2 44 24 44z"
        />
        <path
          fill="#1976D2"
          d="M43.6 20.5H42V20H24v8h11.3c-.8 2.2-2.2 4.2-4.1 5.6l6.2 5.2C37 39.2 44 34 44 24c0-1.3-.1-2.4-.4-3.5z"
        />
      </svg>
      Continuar con Google
    </a>
  )
}

export function Divider({ children }: { children: ReactNode }) {
  return (
    <div className="my-6 flex items-center gap-3">
      <span className="h-px flex-1 bg-line" />
      <span className="label">{children}</span>
      <span className="h-px flex-1 bg-line" />
    </div>
  )
}
