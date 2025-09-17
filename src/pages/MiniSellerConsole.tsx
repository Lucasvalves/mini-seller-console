import { Target, TrendingUp, Users } from 'lucide-react'
import { Tabs, TabsTrigger, TabsList, TabsContent } from '../components/ui/Tabs'
import { useLeads } from '../hooks/useLeads'
import { useState } from 'react'
import type { Lead } from '../types'
import { LeadsList } from '../components/LeadsList'

export default function MiniSellerConsole() {
  const { leads, opportunities, loading } = useLeads()

  const [selectedLead, setSelectedLead] = useState<Lead | null>(null)
  const [isDetailPanelOpen, setIsDetailPanelOpen] = useState(false)

  const handleLeadSelect = (lead: Lead) => {
    setSelectedLead(lead)
    setIsDetailPanelOpen(true)
  }

  return (
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
        </Tabs>
      </main>
    </div>
  )
}
