import { type ReactNode } from 'react'

interface CardProps {
  className?: string
  children: ReactNode
}

export const Card = ({ className = '', children }: CardProps) => (
  <div
    className={`rounded-lg border border-gray-200 bg-white shadow-sm ${className}`}
  >
    {children}
  </div>
)
