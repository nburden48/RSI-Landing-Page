interface RsiLogoProps {
  size?: number
  className?: string
}

export function RsiLogo({ size = 32, className = "" }: RsiLogoProps) {
  return (
    <svg
      width={size}
      height={size}
      viewBox="0 0 32 32"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      className={className}
    >
      <rect width="32" height="32" rx="4" fill="#0F4C81" />
      <path d="M7 8H19C21.2091 8 23 9.79086 23 12C23 14.2091 21.2091 16 19 16H7V8Z" fill="white" />
      <path d="M7 16H17C19.2091 16 21 17.7909 21 20C21 22.2091 19.2091 24 17 24H7V16Z" fill="white" />
      <path d="M19 16L25 24" stroke="white" strokeWidth="2" strokeLinecap="round" />
    </svg>
  )
}
