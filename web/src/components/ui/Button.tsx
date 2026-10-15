import Link from 'next/link'
import type { ComponentProps } from 'react'

type Variant = 'primary' | 'secondary' | 'ghost'

const base =
  'inline-flex items-center justify-center gap-2 px-5 py-3 font-mono text-xs font-medium uppercase tracking-[0.16em] transition-colors disabled:cursor-not-allowed disabled:opacity-50'

const variants: Record<Variant, string> = {
  primary: 'bg-signal text-base hover:bg-[#ff8f3d]',
  secondary: 'border border-line-strong text-ink hover:border-signal hover:text-signal',
  ghost: 'text-body hover:text-signal',
}

export const buttonClass = (variant: Variant = 'primary', extra = '') =>
  `${base} ${variants[variant]} ${extra}`

export function Button({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<'button'> & { variant?: Variant }) {
  return <button className={buttonClass(variant, className)} {...props} />
}

export function ButtonLink({
  variant = 'primary',
  className = '',
  ...props
}: ComponentProps<typeof Link> & { variant?: Variant }) {
  return <Link className={buttonClass(variant, className)} {...props} />
}
