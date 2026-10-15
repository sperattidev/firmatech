import type { ComponentProps } from 'react'

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
      <label htmlFor={inputId} className="label block">
        {label}
      </label>
      <input
        id={inputId}
        name={name}
        aria-invalid={error ? true : undefined}
        aria-describedby={describedBy}
        className="block w-full border border-line-strong bg-base px-3.5 py-3 text-[15px] text-ink placeholder:text-muted/60 transition-colors focus:border-signal focus:outline-none aria-invalid:border-fault"
        {...props}
      />
      {error ? (
        <p id={`${inputId}-error`} className="font-mono text-xs text-fault">
          {error}
        </p>
      ) : hint ? (
        <p id={`${inputId}-hint`} className="text-xs text-muted">
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
  children: React.ReactNode
}) {
  const color = tone === 'ok' ? 'border-ok/40 text-ok' : 'border-fault/40 text-fault'
  return (
    <p
      role={tone === 'error' ? 'alert' : 'status'}
      className={`border-l-2 bg-raised px-4 py-3 text-sm ${color}`}
    >
      {children}
    </p>
  )
}
