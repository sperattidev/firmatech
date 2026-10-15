import Link from 'next/link'

export function Logo() {
  return (
    <Link
      href="/"
      className="group flex items-center gap-2.5 font-mono text-[15px] font-semibold tracking-[0.2em] text-ink"
      aria-label="Firmatech, inicio"
    >
      <svg width="22" height="22" viewBox="0 0 22 22" aria-hidden="true" className="shrink-0">
        <rect
          x="1"
          y="1"
          width="20"
          height="20"
          fill="none"
          stroke="currentColor"
          strokeWidth="1.5"
        />
        <path d="M6 16V6h9M6 11h6" fill="none" stroke="var(--color-signal)" strokeWidth="2" />
        <circle cx="16" cy="16" r="1.6" fill="var(--color-signal)" />
      </svg>
      <span>
        FIRMATECH
        <span className="text-signal transition-opacity group-hover:opacity-40">_</span>
      </span>
    </Link>
  )
}
