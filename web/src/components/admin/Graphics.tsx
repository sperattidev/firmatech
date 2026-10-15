/** Marca de Firmatech en el panel (login y barra de navegación). */
export const Icon = () => (
  <svg width="24" height="24" viewBox="0 0 32 32" aria-hidden="true">
    <rect width="32" height="32" rx="8" fill="#0f172a" />
    <path
      d="M12 25V12.5a4 4 0 0 1 4-4h4M9.5 15h9"
      fill="none"
      stroke="#ff5a1f"
      strokeWidth="3.4"
      strokeLinecap="round"
    />
  </svg>
)

export const Logo = () => (
  <span style={{ fontSize: 32, fontWeight: 700, letterSpacing: '-0.03em' }}>
    firma<span style={{ color: '#ff5a1f' }}>tech</span>
  </span>
)
