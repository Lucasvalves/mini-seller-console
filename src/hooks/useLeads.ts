import { useState, useEffect } from "react"
import type { Lead, Opportunity } from "../types"
import leadsData from "../data/leads.json"

export function useLeads() {
  const [leads, setLeads] = useState<Lead[]>([])
  const [opportunities, setOpportunities] = useState<Opportunity[]>([])
  const [loading, setLoading] = useState(true)
  const [error, setError] = useState<string | null>(null)

  // Simulate API call with setTimeout
  useEffect(() => {
    const loadLeads = async () => {
      try {
        setLoading(true)
        setError(null)

        // Simulate network delay
        await new Promise((resolve) => setTimeout(resolve, 800))

        // Simulate random failure (10% chance)
        if (Math.random() < 0.1) {
          throw new Error("Network error: Failed to fetch leads")
        }

        setLeads(leadsData as Lead[])
      } catch (err) {
        const errorMessage = err instanceof Error ? err.message : "Failed to load leads"
        setError(errorMessage)
      } finally {
        setLoading(false)
      }
    }

    loadLeads()
  }, [])

  const updateLead = async (leadId: string, updates: Partial<Lead>) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 300))

      // Simulate random failure (5% chance)
      if (Math.random() < 0.05) {
        throw new Error("Failed to update lead")
      }

      setLeads((prev) => prev.map((lead) => (lead.id === leadId ? { ...lead, ...updates } : lead)))

      return { success: true }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to update lead"
      return { success: false, error: errorMessage }
    }
  }

  const convertToOpportunity = async (lead: Lead, opportunityData?: { stage?: string; amount?: number }) => {
    try {
      // Simulate API call
      await new Promise((resolve) => setTimeout(resolve, 500))

      // Simulate random failure (5% chance)
      if (Math.random() < 0.05) {
        throw new Error("Failed to convert lead to opportunity")
      }

      const opportunity: Opportunity = {
        id: `opp-${Date.now()}`,
        name: `${lead.company} - ${lead.name}`,
        stage: (opportunityData?.stage as string) || 'prospecting',
        amount: opportunityData?.amount,
        accountName: lead.company,
        createdAt: new Date()
      }

      setOpportunities((prev) => [...prev, opportunity])

      // Remove lead from leads list
      setLeads((prev) => prev.filter((l) => l.id !== lead.id))

      return { success: true, opportunity }
    } catch (err) {
      const errorMessage = err instanceof Error ? err.message : "Failed to convert lead"
      return { success: false, error: errorMessage }
    }
  }

  const retryLoadLeads = () => {
    setError(null)
    setLoading(true)

    // Retry loading after a short delay
    setTimeout(async () => {
      try {
        await new Promise((resolve) => setTimeout(resolve, 500))
        setLeads(leadsData as Lead[])
        setError(null)
      } catch (err) {
        setError("Failed to load leads")
      } finally {
        setLoading(false)
      }
    }, 100)
  }

  return {
    leads,
    opportunities,
    loading,
    error,
    updateLead,
    convertToOpportunity,
    retryLoadLeads,
  }
}
