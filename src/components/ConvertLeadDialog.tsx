import { useState } from 'react'
import type { Lead, OpportunityStage } from '../types'


interface ConvertLeadDialogProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (
    lead: Lead,
    opportunityData: { stage: OpportunityStage; amount?: number }
  ) => Promise<void>
}

export function ConvertLeadDialog({
  lead,
  isOpen,
  onClose,
  onConfirm
}: ConvertLeadDialogProps) {
  const [stage, setStage] = useState<OpportunityStage>('prospecting')
  const [amount, setAmount] = useState<string>('')
  const [isConverting, setIsConverting] = useState(false)
  const [error, setError] = useState<string | null>(null)

  if (!lead || !isOpen) return null

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50"/>

      {/* Dialog */}
      <div className="relative bg-white rounded-lg shadow-xl p-6 w-full max-w-md mx-4">
        {/* Header */}
        <div className="space-y-2 mb-4">
          <h2 className="text-lg font-semibold flex items-center gap-2">
            Convert Lead to Opportunity
          </h2>
          <p className="text-sm text-gray-600">
            Convert "{lead.name}" from {lead.company} into a sales opportunity.
          </p>
        </div>

        <div className="space-y-4 py-4">
          {/* Lead Summary */}
          <div className="p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center gap-2 mb-2">
              <span className="text-sm font-medium">{lead.company}</span>
            </div>
            <p className="text-sm text-gray-600">Contact: {lead.name}</p>
            <p className="text-sm text-gray-600">Score: {lead.score}/100</p>
          </div>

          {/* Opportunity Details */}
          <div className="space-y-3">
            <div>
              <div className="mt-1">
              </div>
            </div>

            <div>
              <div className="relative mt-1">
              </div>
              <p className="text-xs text-gray-500 mt-1">
                You can update this later
              </p>
            </div>
          </div>
        </div>

        <div className="flex gap-2 pt-4">
        </div>
      </div>
    </div>
  )
}
