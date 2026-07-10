import { siteConfig } from '../config/site'
import type { LeadFormData, PartnerFormData } from '../types'

const LEAD_KEY = 'jintan_lead_submissions'
const PARTNER_KEY = 'jintan_partner_submissions'

function getMeta(): Record<string, string> {
  return {
    submittedAt: new Date().toISOString(),
    source: 'web',
    userAgent: navigator.userAgent,
    pageUrl: window.location.href
  }
}

export async function submitLead(data: LeadFormData): Promise<{ success: boolean }> {
  // Always save to localStorage
  const record = { ...data, ...getMeta() }
  const existing = JSON.parse(localStorage.getItem(LEAD_KEY) || '[]')
  existing.push(record)
  localStorage.setItem(LEAD_KEY, JSON.stringify(existing))

  // If API enabled, POST to endpoint
  if (siteConfig.api.enabled && siteConfig.api.leadEndpoint) {
    try {
      const res = await fetch(siteConfig.api.leadEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      })
      if (!res.ok) console.warn('[submitLead] API responded with', res.status)
    } catch (err) {
      console.warn('[submitLead] API call failed:', err)
    }
  }

  return { success: true }
}

export async function submitPartner(data: PartnerFormData): Promise<{ success: boolean }> {
  const record = { ...data, ...getMeta() }
  const existing = JSON.parse(localStorage.getItem(PARTNER_KEY) || '[]')
  existing.push(record)
  localStorage.setItem(PARTNER_KEY, JSON.stringify(existing))

  if (siteConfig.api.enabled && siteConfig.api.partnerEndpoint) {
    try {
      const res = await fetch(siteConfig.api.partnerEndpoint, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(record)
      })
      if (!res.ok) console.warn('[submitPartner] API responded with', res.status)
    } catch (err) {
      console.warn('[submitPartner] API call failed:', err)
    }
  }

  return { success: true }
}

export function getLocalLeads(): any[] {
  return JSON.parse(localStorage.getItem(LEAD_KEY) || '[]')
}

export function getLocalPartners(): any[] {
  return JSON.parse(localStorage.getItem(PARTNER_KEY) || '[]')
}

export function clearLocalSubmissions(): void {
  localStorage.removeItem(LEAD_KEY)
  localStorage.removeItem(PARTNER_KEY)
}

export function exportAsCSV(records: any[]): string {
  if (records.length === 0) return ''
  const headers = Object.keys(records[0])
  const lines = [headers.join(',')]
  for (const r of records) {
    lines.push(headers.map(h => {
      const v = r[h] ?? ''
      return `"${String(v).replace(/"/g, '""')}"`
    }).join(','))
  }
  return lines.join('\n')
}
