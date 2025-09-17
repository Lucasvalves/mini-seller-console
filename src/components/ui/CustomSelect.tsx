import { ChevronDown } from 'lucide-react'
import { useState } from 'react'

interface SelectOption<T> {
  value: T
  label: string
}

interface CustomSelectProps<T> {
  value: T
  onValueChange: (value: T) => void
  placeholder?: string
  options: SelectOption<T>[]
  disabled?: boolean
  className?: string
}

const CustomSelect = <T extends string>({
  value,
  onValueChange,
  placeholder,
  options,
  disabled = false,
  className = ''
}: CustomSelectProps<T>) => {
  const [isOpen, setIsOpen] = useState(false)

  if (disabled) return null

  return (
    <div className={`relative ${className}`}>
      <button
        type="button"
        className="flex h-10 w-full items-center justify-between rounded-md border border-gray-300 bg-white px-3 py-2 text-sm focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
        onClick={() => setIsOpen(!isOpen)}
      >
        <span className={value === 'all' ? 'text-gray-500' : ''}>
          {options.find((opt) => opt.value === value)?.label || placeholder}
        </span>
        <ChevronDown className="h-4 w-4 text-gray-400" />
      </button>

      {isOpen && (
        <div className="absolute z-50 mt-1 w-full rounded-md border border-gray-200 bg-white shadow-lg">
          {options.map((option) => (
            <button
              key={option.value}
              type="button"
              className="w-full px-3 py-2 text-left text-sm hover:bg-gray-100 focus:bg-gray-100 focus:outline-none first:rounded-t-md last:rounded-b-md"
              onClick={() => {
                onValueChange(option.value)
                setIsOpen(false)
              }}
            >
              {option.label}
            </button>
          ))}
        </div>
      )}
    </div>
  )
}

export default CustomSelect
