import type { ReactNode } from 'react'

interface TabsListPorps { 
  children: ReactNode
  className?: string
}
export function TabsList({ children, className}: TabsListPorps) {
  return (
    <div className={`inline-flex h-10 items-center justify-center rounded-md bg-gray-100 p-1 ${className}`}>
      {children}
    </div>
  )
}