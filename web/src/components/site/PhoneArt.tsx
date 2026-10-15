/** Ilustración simple de un celular, mientras no haya fotos reales. */
export function PhoneArt({
  width = 130,
  screen = 'var(--color-brand)',
  frame = '#334155',
  className = '',
}: {
  width?: number
  screen?: string
  frame?: string
  className?: string
}) {
  return (
    <svg
      width={width}
      height={width * 2}
      viewBox="0 0 60 120"
      aria-hidden="true"
      className={className}
    >
      <rect x="2" y="2" width="56" height="116" rx="10" fill={frame} />
      <rect x="6" y="6" width="48" height="108" rx="7" fill={screen} />
      <rect x="22" y="9" width="16" height="4" rx="2" fill={frame} />
    </svg>
  )
}
