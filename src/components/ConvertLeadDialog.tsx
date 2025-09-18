import { useState } from 'react'
import type { Lead, OpportunityStage } from '../types'
import { Label } from './ui/Label'
import { DollarSign, Target } from 'lucide-react'
import { Input } from './ui/Input'
import CustomSelect from './ui/CustomSelect'
import { Button } from './ui/Buttton'
import { LoadingSpinner } from './ui/LoadingSpinner'

interface ConvertLeadDialogProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onConfirm: (
    lead: Lead,
    opportunityData: { stage: OpportunityStage; amount?: number }
  ) => Promise<void>
}

const stageOptions = [
  { value: 'prospecting' as OpportunityStage, label: 'Prospecting' },
  { value: 'qualification' as OpportunityStage, label: 'Qualification' },
  { value: 'proposal' as OpportunityStage, label: 'Proposal' },
  { value: 'negotiation' as OpportunityStage, label: 'Negotiation' }
]

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

  const handleConfirm = async () => {
    setIsConverting(true)
    setError(null)

    try {
      const opportunityData = {
        stage,
        amount: amount
          ? Number.parseFloat(amount.replace(/[^\d.,]/g, '').replace(',', '.'))
          : undefined
      }

      await onConfirm(lead, opportunityData)
      onClose()

      setStage('prospecting')
      setAmount('')
    } catch (err) {
      setError('Failed to convert lead to opportunity')
    } finally {
      setIsConverting(false)
    }
  }

  const handleClose = () => {
    if (!isConverting) {
      onClose()
      setStage('prospecting')
      setAmount('')
      setError(null)
    }
  }

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center">
      {/* Backdrop */}
      <div className="fixed inset-0 bg-black/50" />

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
              <Label htmlFor="stage" className="text-sm font-medium">
                Initial Stage
              </Label>
              <div className="mt-1">
                <CustomSelect
                  value={stage}
                  onValueChange={setStage}
                  options={stageOptions}
                />
              </div>
            </div>

            <div>
              <Label htmlFor="amount" className="text-sm font-medium">
                Estimated Amount (Optional)
              </Label>
              <div className="relative mt-1">
                <DollarSign className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input
                  id="amount"
                  type="text"
                  placeholder="R$ 0,00"
                  value={amount}
                  onChange={(e) => setAmount(e.target.value)}
                  className="pl-10"
                />
              </div>
              <p className="text-xs text-gray-500 mt-1">
                You can update this later
              </p>
            </div>
          </div>
        </div>

        {error && (
          <div className="p-3 bg-red-50 border border-red-200 rounded-md">
            <p className="text-sm text-red-600">{error}</p>
          </div>
        )}

        <div className="flex gap-2 pt-4">
          <Button
            variant="outline"
            onClick={handleClose}
            disabled={isConverting}
            className="flex-1 bg-transparent"
          >
            Cancel
          </Button>
          <Button
            onClick={handleConfirm}
            disabled={isConverting}
            className="flex-1"
          >
            {isConverting ? (
              <>
                <LoadingSpinner size="sm" />
                <span className="ml-2">Converting...</span>
              </>
            ) : (
              <>
                <Target className="h-4 w-4 mr-2" />
                Convert Lead
              </>
            )}
          </Button>
        </div>
      </div>
    </div>
  )
}
