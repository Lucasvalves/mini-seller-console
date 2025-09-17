import React, { useState } from 'react'
import type { Lead } from '../types'
import { Card } from './ui/Card'
import { Button } from './ui/Buttton'
import { Input } from './ui/Input'
import CustomSelect from './ui/CustomSelect'

import { Search, ArrowUpDown, Filter, X } from 'lucide-react'
interface LeadsListProps {
  leads: Lead[]
  onLeadSelect: (lead: Lead) => void
  selectedLeadId?: string
  loading?: boolean
}
interface FilterState {
  searchTerm: string
  statusFilter: string
  sortOrder: 'asc' | 'desc'
  sourceFilter: string
  scoreRange: { min: number; max: number }
}

export function LeadsList({ loading }: LeadsListProps) {
  const [filters, setFilters] = useState<FilterState>({
    searchTerm: '',
    statusFilter: 'all',
    sortOrder: 'desc',
    sourceFilter: 'all',
    scoreRange: { min: 0, max: 100 }
  })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Get unique sources for filter dropdown

  const updateFilter = <K extends keyof FilterState>(
    key: K,
    value: FilterState[K]
  ) => {
    setFilters((prev: FilterState) => ({ ...prev, [key]: value }))
  }

  const clearAllFilters = () => {
    setFilters({
      searchTerm: '',
      statusFilter: 'all',
      sortOrder: 'desc',
      sourceFilter: 'all',
      scoreRange: { min: 0, max: 100 }
    })
    setShowAdvancedFilters(false)
  }

  const hasActiveFilters =
    filters.searchTerm !== '' ||
    filters.statusFilter !== 'all' ||
    filters.sourceFilter !== 'all' ||
    filters.scoreRange.min !== 0 ||
    filters.scoreRange.max !== 100

  if (loading) {
    return (
      <Card className="p-6">
        <div className="space-y-4">
          <div className="h-4 bg-gray-200 rounded animate-pulse" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-3/4" />
          <div className="h-4 bg-gray-200 rounded animate-pulse w-1/2" />
        </div>
      </Card>
    )
  }

  const statusOptions = [
    { value: 'all', label: 'All Status' },
    { value: 'new', label: 'New' },
    { value: 'contacted', label: 'Contacted' },
    { value: 'qualified', label: 'Qualified' },
    { value: 'unqualified', label: 'Unqualified' }
  ]

  return (
    <div className="space-y-4">
      {/* Search and Basic Filters */}
      <Card className="p-4">
        <div className="space-y-4">
          <div className="flex flex-col sm:flex-row gap-4">
            <div className="relative flex-1">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
              <Input
                placeholder="Search by name, company, or email..."
                value={filters.searchTerm}
                onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                  updateFilter('searchTerm', e.target.value)
                }
                className="pl-10"
              />
            </div>
            <CustomSelect
              value={filters.statusFilter}
              onValueChange={(value: string) =>
                updateFilter('statusFilter', value)
              }
              placeholder="Filter by status"
              options={statusOptions}
              className="w-full sm:w-48"
            />
            <Button
              variant="outline"
              onClick={() =>
                updateFilter(
                  'sortOrder',
                  filters.sortOrder === 'desc' ? 'asc' : 'desc'
                )
              }
              className="w-full sm:w-auto"
            >
              <ArrowUpDown className="h-4 w-4 mr-2" />
              Score {filters.sortOrder === 'desc' ? '↓' : '↑'}
            </Button>
          </div>

          {/* Advanced Filters Toggle */}
          <div className="flex items-center justify-between">
            <Button
              variant="ghost"
              size="sm"
              onClick={() => setShowAdvancedFilters(!showAdvancedFilters)}
              className="text-sm"
            >
              <Filter className="h-4 w-4 mr-2" />
              Advanced Filters
            </Button>

            {hasActiveFilters && (
              <Button
                variant="ghost"
                size="sm"
                onClick={clearAllFilters}
                className="text-sm text-red-600"
              >
                <X className="h-4 w-4 mr-2" />
                Clear All
              </Button>
            )}
          </div>
        </div>
      </Card>
    </div>
  )
}
