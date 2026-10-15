import Link from 'next/link'

export function Logo({ className = '' }: { className?: string }) {
  return (
    <Link
      href="/"
      className={`text-[22px] font-bold tracking-[-0.03em] text-ink ${className}`}
      aria-label="Firmatech, inicio"
    >
      firma<span className="text-brand">tech</span>
    </Link>
  )
}
