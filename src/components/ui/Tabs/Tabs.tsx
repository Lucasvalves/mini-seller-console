import { createContext, useContext, useState, type ReactNode} from 'react'

type TabsContextType = {
  activeTab: string
  setActiveTab: (value: string) => void
}

const TabsContext = createContext<TabsContextType | undefined>(undefined)

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

export const useTabs = () => {
  const context = useContext(TabsContext)
  if (!context) {
    throw new Error("Tabs components must be used within <Tabs>")
  }
  return context
}