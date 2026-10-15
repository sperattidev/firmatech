import type { ComponentProps, ReactNode } from 'react'

type FieldProps = ComponentProps<'input'> & {
  label: string
  name: string
  error?: string
  hint?: string
}

export function Field({ label, name, error, hint, id, className = '', ...props }: FieldProps) {
  const inputId = id ?? `f-${name}`
  const describedBy = error ? `${inputId}-error` : hint ? `${inputId}-hint` : undefined
  return (
    <div className={`space-y-1.5 ${className}`}>
      <label htmlFor={inputId} className="block text-sm font-semibold text-ink">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="block h-12 w-full rounded-xl border border-line bg-card px-3.5 text-[15px] text-ink placeholder:text-muted/70 transition-colors focus:border-ink focus:outline-none aria-invalid:border-danger"
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="text-sm text-danger">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-sm text-muted">
          {hint}
        </p>
      ) : null}
    </div>
  )
}

export function FormMessage({
  tone = 'error',
  children,
}: {
  tone?: 'error' | 'ok'
  children: ReactNode
}) {
  const color = tone === 'ok' ? 'bg-ok-soft text-ok' : 'bg-danger-soft text-danger'
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`rounded-xl px-4 py-3 text-sm font-medium ${color}`}
    >
      {children}
    </p>
  )
}
