import { useState, type ReactNode } from 'react'
import { TabsContext } from './TabsContext'

interface TabsProps {
  defaultValue: string
  children: ReactNode
  className?: string
}

export const Tabs = ({ defaultValue, children, className }: TabsProps) => {
  const [activeTab, setActiveTab] = useState(defaultValue)

  return (
    <TabsContext.Provider value={{ activeTab, setActiveTab }}>
      <div className={className}>{children}</div>
    </TabsContext.Provider>
  )
}
