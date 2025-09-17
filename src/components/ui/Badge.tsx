import type { ReactNode } from 'react'

interface BadgeProps {
  className?: string
  children: ReactNode
}

export const Badge = ({ className = '', children }: BadgeProps) => {
  return (
    <span
      className={`inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium ${className}`}
    >
      {children}
    </span>
  )
}
