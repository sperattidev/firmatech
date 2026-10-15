import { ButtonLink } from '@/components/ui/Button'

/** Marcador para secciones de fases futuras. El sitio no es público hasta terminarlas. */
export function EnConstruccion({ code, title }: { code: string; title: string }) {
  return (
    <section className="blueprint border-b border-line">
      <div className="mx-auto max-w-6xl space-y-6 px-4 py-24 sm:px-6">
        <p className="label">
          <span className="text-signal">{code}</span> / En construcción
        </p>
        <h1 className="text-3xl font-semibold tracking-tight text-ink sm:text-4xl">{title}</h1>
        <p className="max-w-md text-muted">Esta sección está en desarrollo.</p>
        <ButtonLink href="/" variant="secondary">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  )
}
