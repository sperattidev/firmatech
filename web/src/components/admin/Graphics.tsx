/** Marca de Firmatech en el panel (login y barra de navegación). */
const Mark = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 22 22" aria-hidden="true">
    <rect x="1" y="1" width="20" height="20" fill="none" stroke="currentColor" strokeWidth="1.5" />
    <path d="M6 16V6h9M6 11h6" fill="none" stroke="#ff7a1a" strokeWidth="2" />
    <circle cx="16" cy="16" r="1.6" fill="#ff7a1a" />
  </svg>
)

export const Icon = () => <Mark size={22} />

export const Logo = () => (
  <div
    style={{
      display: 'flex',
      alignItems: 'center',
      gap: 12,
      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
      fontWeight: 600,
      fontSize: 20,
      letterSpacing: '0.2em',
    }}
  >
    <Mark size={30} />
    <span>
      FIRMATECH<span style={{ color: '#ff7a1a' }}>_</span>
    </span>
  </div>
)
