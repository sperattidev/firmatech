import { ButtonLink } from '@/components/ui/Button'

/** Marcador para secciones de fases futuras. El sitio no es público hasta terminarlas. */
export function EnConstruccion({ title }: { title: string }) {
  return (
    <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6">
      <div className="rounded-3xl border border-line bg-card px-6 py-16 text-center">
        <p className="text-[13px] font-bold tracking-[0.06em] text-brand uppercase">Próximamente</p>
        <h1 className="mt-2 text-3xl font-bold tracking-[-0.03em]">{title}</h1>
        <p className="mx-auto mt-2 max-w-md text-muted">Estamos preparando esta sección.</p>
        <ButtonLink href="/" variant="secondary" className="mt-6">
          Volver al inicio
        </ButtonLink>
      </div>
    </section>
  )
}
