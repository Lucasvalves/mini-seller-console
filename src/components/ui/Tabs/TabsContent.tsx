
import type { ReactNode } from 'react'
import { useTabs } from "./Tabs"

interface TabsContentProps {
  value: string
  className: string
  children: ReactNode
}

export function TabsContent({ value, children, className }: TabsContentProps) {
  const { activeTab } = useTabs()
  if (activeTab !== value) return null

  return (
    <div className={`mt-2 ring-offset-white focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-blue-500 ${className}`}>
      {children}
    </div>
  )
}