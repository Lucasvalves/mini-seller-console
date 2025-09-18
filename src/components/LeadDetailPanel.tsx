import { useState, useEffect } from 'react'
import type { Lead, LeadStatus } from '../types'
import { Card } from './ui/Card'
import { Button } from './ui/Buttton'
import { Badge } from './ui/Badge'
import { Input } from './ui/Input'
import { Label } from './ui/Label'
import {
  X,
  RotateCcw,
  User,
  Building,
  Mail,
  Globe,
  Target,
  Save
} from 'lucide-react'
import CustomSelect from './ui/CustomSelect'
import {
  getScoreColor,
  getStatusColor,
  isValidEmail
} from '../utils/validation'
interface LeadDetailPanelProps {
  lead: Lead | null
  isOpen: boolean
  onClose: () => void
  onUpdate: (
    leadId: string,
    updates: Partial<Lead>
  ) => Promise<{ success: boolean; error?: string }>
  onConvert: (lead: Lead) => void
}

const statusOptions = [
  { value: 'new' as LeadStatus, label: 'New' },
  { value: 'contacted' as LeadStatus, label: 'Contacted' },
  { value: 'qualified' as LeadStatus, label: 'Qualified' },
  { value: 'unqualified' as LeadStatus, label: 'Unqualified' }
]

export function LeadDetailPanel({
  lead,
  isOpen,
  onClose,
  onUpdate,
  onConvert
}: LeadDetailPanelProps) {
  const [editedLead, setEditedLead] = useState<Lead | null>(null)
  const [isEditing, setIsEditing] = useState(false)
  const [isSaving, setSaving] = useState(false)
  const [errors, setErrors] = useState<{ email?: string; status?: string }>({})

  useEffect(() => {
    if (lead) {
      setEditedLead({ ...lead })
      setIsEditing(false)
      setErrors({})
    }
  }, [lead])

  if (!lead || !editedLead || !isOpen) return null

  const handleSave = async () => {
    // Validate email
    if (!isValidEmail(editedLead.email)) {
      setErrors({ email: 'Please enter a valid email address' })
      return
    }

    setSaving(true)
    setErrors({})

    try {
      const result = await onUpdate(lead.id, {
        email: editedLead.email,
        status: editedLead.status
      })

      if (result.success) {
        setIsEditing(false)
      } else {
        setErrors({ status: result.error || 'Failed to update lead' })
      }
    } catch{
      setErrors({ status: 'An unexpected error occurred' })
    } finally {
      setSaving(false)
    }
  }

  const handleCancel = () => {
    setEditedLead({ ...lead })
    setIsEditing(false)
    setErrors({})
  }

  const handleConvert = () => {
    onConvert(lead)
    onClose()
  }

  return (
    <div className="fixed inset-0 z-50">
      <div className="fixed inset-0 bg-black/50" onClick={onClose} />

      {/* Panel */}
      <div className="fixed right-0 top-0 h-full w-full max-w-lg bg-white shadow-xl overflow-y-auto">
        <div className="p-6">
          {/* Header */}
          <div className="space-y-2 pb-6">
            <div className="flex items-center justify-between">
              <div>
                <h2 className="text-xl font-semibold">{lead.name}</h2>
                <p className="text-sm text-gray-600">{lead.company}</p>
              </div>
              <Button variant="ghost" size="sm" onClick={onClose}>
                <X className="h-4 w-4" />
              </Button>
            </div>
          </div>

          <div className="space-y-6">
            {/* Lead Information */}
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <User className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm font-medium">
                    Contact Information
                  </Label>
                </div>

                <div className="grid grid-cols-1 gap-4">
                  <div>
                    <Label htmlFor="name" className="text-sm text-gray-600">
                      Name
                    </Label>
                    <Input
                      id="name"
                      value={lead.name}
                      disabled
                      className="mt-1"
                    />
                  </div>

                  <div>
                    <Label htmlFor="company" className="text-sm text-gray-600">
                      Company
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Building className="h-4 w-4 text-gray-400" />
                      <Input id="company" value={lead.company} disabled />
                    </div>
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-sm text-gray-600">
                      Email
                    </Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Mail className="h-4 w-4 text-gray-400" />
                      <Input
                        id="email"
                        type="email"
                        value={editedLead.email}
                        onChange={(e) =>
                          setEditedLead({
                            ...editedLead,
                            email: e.target.value
                          })
                        }
                        disabled={!isEditing}
                        className={errors.email ? 'border-red-500' : ''}
                      />
                    </div>
                    {errors.email && (
                      <p className="text-sm text-red-600 mt-1">
                        {errors.email}
                      </p>
                    )}
                  </div>

                  <div>
                    <Label htmlFor="status" className="text-sm text-gray-600">
                      Status
                    </Label>
                    <div className="mt-1">
                      {isEditing ? (
                        <CustomSelect
                          value={editedLead.status}
                          onValueChange={(value: LeadStatus) =>
                            setEditedLead({ ...editedLead, status: value })
                          }
                          options={statusOptions}
                        />
                      ) : (
                        <Badge className={getStatusColor(lead.status)}>
                          {lead.status}
                        </Badge>
                      )}
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Lead Metrics */}
            <Card className="p-4">
              <div className="space-y-4">
                <div className="flex items-center gap-2">
                  <Target className="h-4 w-4 text-gray-500" />
                  <Label className="text-sm font-medium">Lead Metrics</Label>
                </div>

                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <Label className="text-sm text-gray-600">Source</Label>
                    <div className="flex items-center gap-2 mt-1">
                      <Globe className="h-4 w-4 text-gray-400" />
                      <span className="text-sm">{lead.source}</span>
                    </div>
                  </div>

                  <div>
                    <Label className="text-sm text-gray-600">Score</Label>
                    <div
                      className={`inline-flex items-center px-3 py-1 rounded-full text-sm font-medium mt-1 ${getScoreColor(lead.score)}`}
                    >
                      {lead.score}/100
                    </div>
                  </div>
                </div>
              </div>
            </Card>

            {/* Error Message */}
            {errors.status && (
              <div className="p-3 bg-red-50 border border-red-200 rounded-md">
                <p className="text-sm text-red-600">{errors.status}</p>
              </div>
            )}

            {/* Action Buttons */}
            <div className="flex flex-col gap-3 pt-4 border-t">
              {isEditing ? (
                <div className="flex gap-2">
                  <Button
                    onClick={handleSave}
                    disabled={isSaving}
                    className="flex-1"
                  >
                    {isSaving ? (
                      <>
                        <span className="ml-2">Saving...</span>
                      </>
                    ) : (
                      <>
                        <Save className="h-4 w-4 mr-2" />
                        Save Changes
                      </>
                    )}
                  </Button>
                  <Button
                    variant="outline"
                    onClick={handleCancel}
                    disabled={isSaving}
                  >
                    <RotateCcw className="h-4 w-4 mr-2" />
                    Cancel
                  </Button>
                </div>
              ) : (
                <div className="space-y-2">
                  <Button
                    onClick={() => setIsEditing(true)}
                    variant="outline"
                    className="w-full"
                  >
                    Edit Lead
                  </Button>
                  <Button onClick={handleConvert} className="w-full">
                    Convert to Opportunity
                  </Button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}
