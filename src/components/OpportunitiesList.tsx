import type { Opportunity } from '../types'
import { Card } from './ui/Card'
import { Badge } from './ui/Badge'
import { Building, Calendar, DollarSign } from 'lucide-react'

interface OpportunitiesListProps {
  opportunities: Opportunity[]
}

function getStageColor(stage: string): string {
  switch (stage) {
    case 'prospecting':
      return 'bg-blue-100 text-blue-800'
    case 'qualification':
      return 'bg-yellow-100 text-yellow-800'
    case 'proposal':
      return 'bg-purple-100 text-purple-800'
    case 'negotiation':
      return 'bg-orange-100 text-orange-800'
    case 'closed-won':
      return 'bg-green-100 text-green-800'
    case 'closed-lost':
      return 'bg-red-100 text-red-800'
    default:
      return 'bg-gray-100 text-gray-800'
  }
}

function formatCurrency(amount?: number): string {
  if (!amount) return 'Not specified'
  return new Intl.NumberFormat('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  }).format(amount)
}

function formatDate(date: Date): string {
  return new Intl.DateTimeFormat('pt-BR', {
    day: '2-digit',
    month: '2-digit',
    year: 'numeric'
  }).format(date)
}

export function OpportunitiesList({ opportunities }: OpportunitiesListProps) {
  return (
    <Card>
      <div className="p-4 border-b">
        <h3 className="text-lg font-semibold text-gray-900">
          Opportunities ({opportunities.length})
        </h3>
        <p className="text-sm text-gray-600">
          Converted leads tracking through the sales pipeline
        </p>
      </div>

      <div className="divide-y">
        {opportunities.map((opportunity) => (
          <div
            key={opportunity.id}
            className="p-4 hover:bg-gray-50 transition-colors"
          >
            <div className="flex items-start justify-between">
              <div className="flex-1 min-w-0">
                <div className="flex items-center gap-3 mb-2">
                  <h4 className="font-medium text-gray-900 truncate">
                    {opportunity.name}
                  </h4>
                  <Badge className={`${getStageColor(opportunity.stage)}`}>
                    {opportunity.stage.replace('-', ' ')}
                  </Badge>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3 text-sm text-gray-600">
                  <div className="flex items-center gap-2">
                    <Building className="h-4 w-4 text-gray-400" />
                    <span className="truncate">{opportunity.accountName}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <DollarSign className="h-4 w-4 text-gray-400" />
                    <span>{formatCurrency(opportunity.amount)}</span>
                  </div>

                  <div className="flex items-center gap-2">
                    <Calendar className="h-4 w-4 text-gray-400" />
                    <span>Created {formatDate(opportunity.createdAt)}</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
    </Card>
  )
}
