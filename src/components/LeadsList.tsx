import React, { useState, useMemo } from 'react'
import type { Lead } from '../types'
import { Card } from './ui/Card'
import { Button } from './ui/Buttton'
import { Badge } from './ui/Badge'
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

export function LeadsList({
  leads,
  onLeadSelect,
  selectedLeadId,
  loading
}: LeadsListProps) {
  const [filters, setFilters] = useState<FilterState>( {
    searchTerm: '',
    statusFilter: 'all',
    sortOrder: 'desc',
    sourceFilter: 'all',
    scoreRange: { min: 0, max: 100 }
  })

  const [showAdvancedFilters, setShowAdvancedFilters] = useState(false)

  // Get unique sources for filter dropdown
  const uniqueSources = useMemo(() => {
    const sources = [...new Set(leads.map((lead) => lead.source))]
    return sources.sort()
  }, [leads])

  const filteredAndSortedLeads = useMemo(() => {
    return leads
      .filter((lead) => {
        const matchesSearch =
          lead.name.toLowerCase().includes(filters.searchTerm.toLowerCase()) ||
          lead.company
            .toLowerCase()
            .includes(filters.searchTerm.toLowerCase()) ||
          lead.email.toLowerCase().includes(filters.searchTerm.toLowerCase())

        const matchesStatus =
          filters.statusFilter === 'all' || lead.status === filters.statusFilter
        const matchesSource =
          filters.sourceFilter === 'all' || lead.source === filters.sourceFilter
        const matchesScore =
          lead.score >= filters.scoreRange.min &&
          lead.score <= filters.scoreRange.max

        return matchesSearch && matchesStatus && matchesSource && matchesScore
      })
      .sort((a, b) => {
        return filters.sortOrder === 'desc'
          ? b.score - a.score
          : a.score - b.score
      })
  }, [leads, filters])

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

  const sourceOptions = [
    { value: 'all', label: 'All Sources' },
    ...uniqueSources.map((source) => ({ value: source, label: source }))
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

          {/* Advanced Filters */}
          {showAdvancedFilters && (
            <div className="pt-4 border-t space-y-4">
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Source
                  </label>
                  <CustomSelect
                    value={filters.sourceFilter}
                    onValueChange={(value: string) =>
                      updateFilter('sourceFilter', value)
                    }
                    placeholder="All sources"
                    options={sourceOptions}
                  />
                </div>

                <div>
                  <label className="text-sm font-medium text-gray-700 mb-2 block">
                    Score Range
                  </label>
                  <div className="flex items-center gap-2">
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.scoreRange.min}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFilter('scoreRange', {
                          ...filters.scoreRange,
                          min: Number.parseInt(e.target.value) || 0
                        })
                      }
                      className="w-20"
                      placeholder="Min"
                    />
                    <span className="text-gray-500">to</span>
                    <Input
                      type="number"
                      min="0"
                      max="100"
                      value={filters.scoreRange.max}
                      onChange={(e: React.ChangeEvent<HTMLInputElement>) =>
                        updateFilter('scoreRange', {
                          ...filters.scoreRange,
                          max: Number.parseInt(e.target.value) || 100
                        })
                      }
                      className="w-20"
                      placeholder="Max"
                    />
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>
      </Card>

      {/* Results Summary */}
      {hasActiveFilters && (
        <div className="text-sm text-gray-600">
          Showing {filteredAndSortedLeads.length} of {leads.length} leads
        </div>
      )}

      {/* Leads List */}
      <Card>
        {filteredAndSortedLeads.length === 0 ? (
          <div className="p-8 text-center text-gray-500">
            <p className="text-lg font-medium">No leads found</p>
            <p className="text-sm">
              Try adjusting your search or filter criteria
            </p>
            {hasActiveFilters && (
              <Button
                variant="outline"
                size="sm"
                onClick={clearAllFilters}
                className="mt-3 bg-transparent"
              >
                Clear Filters
              </Button>
            )}
          </div>
        ) : (
          <div className="divide-y">
            {filteredAndSortedLeads.map((lead) => (
              <div
                key={lead.id}
                className={`p-4 cursor-pointer hover:bg-gray-50 transition-colors ${
                  selectedLeadId === lead.id
                    ? 'bg-blue-50 border-l-4 border-l-blue-500'
                    : ''
                }`}
                onClick={() => onLeadSelect(lead)}
              >
                <div className="flex items-center justify-between">
                  <div className="flex-1 min-w-0">
                    <div className="flex items-center gap-3 mb-2">
                      <h3 className="font-medium text-gray-900 truncate">
                        {lead.name}
                      </h3>
                      <Badge>
                        {lead.status}
                      </Badge>
                    </div>
                    <p className="text-sm text-gray-600 truncate">
                      {lead.company}
                    </p>
                    <p className="text-sm text-gray-500 truncate">
                      {lead.email}
                    </p>
                    <div className="flex items-center gap-4 mt-2">
                      <span className="text-xs text-gray-500">
                        Source: {lead.source}
                      </span>
                      <div
                        className={"text-xs px-2 py-1 rounded-full font-medium"}
                      >
                        Score: {lead.score}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </Card>
    </div>
  )
}
