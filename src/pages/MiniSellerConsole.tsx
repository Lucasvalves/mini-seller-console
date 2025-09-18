import { Target, TrendingUp, Users } from 'lucide-react'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '../components/ui/Tabs'
import { useLeads } from '../hooks/useLeads'
import { useState } from 'react'
import type { Lead } from '../types'
import { LeadsList } from '../components/LeadsList'
import { LeadDetailPanel } from '../components/LeadDetailPanel'
import { ConvertLeadDialog } from '../components/ConvertLeadDialog'
import { OpportunitiesList } from '../components/OpportunitiesList'
import { ErrorBoundary } from '../components/ErrorBoundary'
import { ErrorState } from '../components/ErrorState'
import { ToastContainer } from '../components/Toast'
import { useToast } from '../hooks/useToast'

export default function MiniSellerConsole() {
  const {
    leads,
    opportunities,
    loading,
    updateLead,
    convertToOpportunity,
    error,
    retryLoadLeads
  } = useLeads()
  const { toasts, removeToast, success, error: showError } = useToast()

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false)
  const [isConvertDialogOpen, setIsConvertDialogOpen] = useState(false)
  const [leadToConvert, setLeadToConvert] = useState<Lead | null>(null)

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailPanelOpen(true)
  }

  const handleUpdateLead = async (leadId: string, updates: Partial<Lead>) => {
    const result = await updateLead(leadId, updates)

    if (result.success) {
      success('Lead updated', 'Lead information has been successfully updated')
      // Update selected lead if it's the one being updated
      if (selectedLead?.id === leadId) {
        setSelectedLead((prev) => (prev ? { ...prev, ...updates } : null))
      }
    } else {
      showError('Update failed', result.error)
    }

    return result
  }

  const handleConvertLead = (lead: Lead) => {
    setLeadToConvert(lead)
    setIsConvertDialogOpen(true)
    setIsDetailPanelOpen(false)
  }

  const handleConfirmConvert = async (
    lead: Lead,
    opportunityData: { stage: string; amount?: number }
  ) => {
    const result = await convertToOpportunity(lead, opportunityData)

    if (result.success) {
      success(
        'Lead converted',
        `${lead.name} has been converted to an opportunity`
      )
      setSelectedLead(null)
    } else {
      showError('Conversion failed', result.error)
    }

    setIsConvertDialogOpen(false)
    setLeadToConvert(null)
  }

  // Show error state if there's an error loading leads
  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 p-4">
        <div className="max-w-4xl mx-auto">
          <ErrorState
            title="Failed to load leads"
            description={error}
            onRetry={retryLoadLeads}
            type="network"
          />
        </div>
      </div>
    )
  }
  return (
    <ErrorBoundary>
      <div className="min-h-screen bg-gray-50">
        <header className="bg-white border-b border-gray-200">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex items-center justify-between h-16">
              <div className="flex items-center gap-3">
                <div className="p-2 bg-blue-600 rounded-lg">
                  <TrendingUp className="h-6 w-6 text-white" />
                </div>
                <div>
                  <h1 className="text-xl font-semibold text-gray-900">
                    Mini Seller Console
                  </h1>
                  <p className="text-sm text-gray-600">
                    Manage leads and opportunities
                  </p>
                </div>
              </div>

              <div className="hidden sm:flex items-center gap-6">
                <div className="text-center">
                  <div className="text-2xl font-bold text-gray-900">
                    {leads.length}
                  </div>
                  <div className="text-xs text-gray-600">Active Leads</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-blue-600">
                    {opportunities.length}
                  </div>
                  <div className="text-xs text-gray-600">Opportunities</div>
                </div>
                <div className="text-center">
                  <div className="text-2xl font-bold text-green-600">
                    {leads.filter((lead) => lead.status === 'qualified').length}
                  </div>
                  <div className="text-xs text-gray-600">Qualified</div>
                </div>
              </div>
            </div>
          </div>
        </header>

        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <Tabs defaultValue="leads" className="space-y-6">
            <TabsList className="grid w-full grid-cols-2 lg:w-96">
              <TabsTrigger value="leads" className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                Leads ({leads.length})
              </TabsTrigger>
              <TabsTrigger
                value="opportunities"
                className="flex items-center gap-2"
              >
                <Target className="h-4 w-4" />
                Opportunities ({opportunities.length})
              </TabsTrigger>
            </TabsList>

            <TabsContent value="leads" className="space-y-6">
              <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
                <div className="lg:col-span-3">
                  <LeadsList
                    leads={leads}
                    onLeadSelect={handleLeadSelect}
                    selectedLeadId={selectedLead?.id}
                    loading={loading}
                  />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="opportunities" className="space-y-6">
              <OpportunitiesList opportunities={opportunities} />
            </TabsContent>
          </Tabs>
        </main>

        <LeadDetailPanel
          lead={selectedLead}
          isOpen={isDetailPanelOpen}
          onClose={() => {
            setIsDetailPanelOpen(false)
            setSelectedLead(null)
          }}
          onUpdate={handleUpdateLead}
          onConvert={handleConvertLead}
        />
        <ConvertLeadDialog
          lead={leadToConvert}
          isOpen={isConvertDialogOpen}
          onClose={() => {
            setIsConvertDialogOpen(false)
            setLeadToConvert(null)
          }}
          onConfirm={handleConfirmConvert}
        />
        <ToastContainer toasts={toasts} onClose={removeToast} />
      </div>
    </ErrorBoundary>
  )
}
