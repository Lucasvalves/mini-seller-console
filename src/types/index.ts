export interface Lead {
  id: string
  name: string
  company: string
  email: string
  source: string
  score: number
  status: 'new' | 'contacted' | 'qualified' | 'unqualified'
}
export interface Opportunity {
  id: string
  name: string
  stage:
    | 'prospecting'
    | 'qualification'
    | 'proposal'
    | 'negotiation'
    | 'closed-won'
    | 'closed-lost'
  amount?: number
  accountName: string
  createdAt: Date
}

export type LeadStatus = Lead['status']
export type OpportunityStage = Opportunity['stage']

export type ToastType = 'success' | 'error' | 'warning' | 'info'
export interface Toast {
  id: string
  type: ToastType
  title: string
  description?: string
  duration?: number
}
