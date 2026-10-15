import type { ReactNode, SVGProps } from 'react'

type IconProps = SVGProps<SVGSVGElement> & { size?: number }

const make = (paths: ReactNode) =>
  function Icon({ size = 22, ...props }: IconProps) {
    return (
      <svg
        width={size}
        height={size}
        viewBox="0 0 24 24"
        fill="none"
        stroke="currentColor"
        strokeWidth={1.8}
        strokeLinecap="round"
        strokeLinejoin="round"
        aria-hidden="true"
        {...props}
      >
        {paths}
      </svg>
    )
  }

export const IconPhone = make(
  <>
    <rect x="6" y="2" width="12" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </>,
)
export const IconLaptop = make(
  <>
    <rect x="4" y="4" width="16" height="11" rx="1.5" />
    <path d="M2 19h20" />
  </>,
)
export const IconTablet = make(
  <>
    <rect x="4" y="2" width="16" height="20" rx="2.5" />
    <path d="M11 18h2" />
  </>,
)
export const IconCode = make(<path d="m8 8-4 4 4 4M16 8l4 4-4 4M13 6l-2 12" />)
export const IconSearch = make(
  <>
    <circle cx="11" cy="11" r="7" />
    <path d="m20 20-3.5-3.5" />
  </>,
)
export const IconCard = make(
  <>
    <rect x="2" y="5" width="20" height="14" rx="2" />
    <path d="M2 10h20" />
  </>,
)
export const IconTruck = make(
  <>
    <path d="M3 6h11v10H3zM14 10h4l3 3v3h-7" />
    <circle cx="7" cy="18" r="1.8" />
    <circle cx="17" cy="18" r="1.8" />
  </>,
)
export const IconShield = make(
  <>
    <path d="M12 3 4 6v6c0 5 3.5 8 8 9 4.5-1 8-4 8-9V6z" />
    <path d="m9 12 2 2 4-4" />
  </>,
)
export const IconCheck = make(
  <>
    <circle cx="12" cy="12" r="9" />
    <path d="m8 12 3 3 5-6" />
  </>,
)
export const IconBattery = make(
  <>
    <rect x="2" y="7" width="17" height="10" rx="2" />
    <path d="M22 11v2M6 10v4M10 10v4" />
  </>,
)
export const IconCart = make(
  <>
    <circle cx="9" cy="20" r="1.5" />
    <circle cx="18" cy="20" r="1.5" />
    <path d="M2 3h3l2.5 12h11.5l2-8H6.2" />
  </>,
)
export const IconUser = make(
  <>
    <circle cx="12" cy="8" r="4" />
    <path d="M4 21c1.5-4 4.5-6 8-6s6.5 2 8 6" />
  </>,
)
export const IconPin = make(
  <>
    <path d="M12 21s7-6.2 7-11.5A7 7 0 0 0 5 9.5C5 14.8 12 21 12 21z" />
    <circle cx="12" cy="9.5" r="2.5" />
  </>,
)
export const IconMenu = make(<path d="M4 7h16M4 12h16M4 17h16" />)
export const IconPlug = make(<path d="M9 2v5M15 2v5M6 7h12v4a6 6 0 0 1-12 0zM12 17v5" />)
export const IconGamepad = make(
  <>
    <path d="M7 8h10a5 5 0 0 1 4.6 7l-.6 1.4a2.5 2.5 0 0 1-4.2.5L15 15H9l-1.8 1.9a2.5 2.5 0 0 1-4.2-.5L2.4 15A5 5 0 0 1 7 8z" />
    <path d="M8 10.5v3M6.5 12h3M15.5 11.5h.01M17.5 13h.01" />
  </>,
)
export const IconLayers = make(<path d="m12 3 9 5-9 5-9-5zM3 13l9 5 9-5" />)
export const IconArrow = make(<path d="M5 12h14M13 6l6 6-6 6" />)
