import type { ReactNode } from "react"

interface RsiBannerProps {
  title: string
  description: string
  children?: ReactNode
}

export function RsiBanner({ title, description, children }: RsiBannerProps) {
  return (
    <div className="rsi-pattern-bg rounded-lg p-6 text-white">
      <h2 className="text-xl font-bold mb-2">{title}</h2>
      <p className="opacity-90 max-w-2xl">{description}</p>
      {children && <div className="mt-4">{children}</div>}
    </div>
  )
}
