import { siteConfig } from '../config/site'
import type { LeadFormData, PartnerFormData, AdminJob } from '../types'
import { defaultJobs } from '../data/jobs'

const LEAD_KEY = 'jintan_lead_submissions'
const PARTNER_KEY = 'jintan_partner_submissions'
const JOBS_KEY = 'jintan_admin_jobs'

function getMeta(): Record<string, string> {
  return { submittedAt: new Date().toISOString(), source: 'web', userAgent: navigator.userAgent, pageUrl: window.location.href }
}

export async function submitLead(data: LeadFormData): Promise<{ success: boolean }> {
  const record = { ...data, ...getMeta() }
  const existing = JSON.parse(localStorage.getItem(LEAD_KEY) || '[]')
  existing.push(record)
  localStorage.setItem(LEAD_KEY, JSON.stringify(existing))
  if (siteConfig.api.enabled && siteConfig.api.leadEndpoint) {
    try { const res = await fetch(siteConfig.api.leadEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) }); if (!res.ok) console.warn('[submitLead] API:', res.status) } catch (err) { console.warn('[submitLead] API call failed:', err) }
  }
  return { success: true }
}

export async function submitPartner(data: PartnerFormData): Promise<{ success: boolean }> {
  const record = { ...data, ...getMeta() }
  const existing = JSON.parse(localStorage.getItem(PARTNER_KEY) || '[]')
  existing.push(record)
  localStorage.setItem(PARTNER_KEY, JSON.stringify(existing))
  if (siteConfig.api.enabled && siteConfig.api.partnerEndpoint) {
    try { const res = await fetch(siteConfig.api.partnerEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(record) }); if (!res.ok) console.warn('[submitPartner] API:', res.status) } catch (err) { console.warn('[submitPartner] API call failed:', err) }
  }
  return { success: true }
}

export function getLocalLeads(): any[] { return JSON.parse(localStorage.getItem(LEAD_KEY) || '[]') }
export function getLocalPartners(): any[] { return JSON.parse(localStorage.getItem(PARTNER_KEY) || '[]') }
export function clearLocalSubmissions(): void { localStorage.removeItem(LEAD_KEY); localStorage.removeItem(PARTNER_KEY) }

export function exportAsCSV(records: any[]): string {
  if (records.length === 0) return ''
  const headers = Object.keys(records[0])
  return [headers.join(','), ...records.map(r => headers.map(h => `"${String(r[h] ?? '').replace(/"/g, '""')}"`).join(','))].join('\n')
}

// === Admin Job CRUD ===

function getNextId(jobs: AdminJob[]): number {
  return jobs.length > 0 ? Math.max(...jobs.map(j => j.id)) + 1 : 1
}

export function getAdminJobs(): AdminJob[] {
  const stored = localStorage.getItem(JOBS_KEY)
  if (stored) return JSON.parse(stored)
  // First visit: save defaults to localStorage
  localStorage.setItem(JOBS_KEY, JSON.stringify(defaultJobs))
  return [...defaultJobs]
}

export function saveAdminJobs(jobs: AdminJob[]): void {
  localStorage.setItem(JOBS_KEY, JSON.stringify(jobs))
}

export function addAdminJob(job: AdminJob): void {
  const all = getAdminJobs()
  job.id = getNextId(all)
  all.push(job)
  saveAdminJobs(all)
}

export function updateAdminJob(updated: AdminJob): void {
  const all = getAdminJobs()
  const idx = all.findIndex(j => j.id === updated.id)
  if (idx !== -1) { all[idx] = updated; saveAdminJobs(all) }
}

export function deleteAdminJob(id: number): void {
  const all = getAdminJobs().filter(j => j.id !== id)
  saveAdminJobs(all)
}

export function toggleJobStatus(id: number): void {
  const all = getAdminJobs()
  const job = all.find(j => j.id === id)
  if (job) { job.status = job.status === '上架' ? '下架' : '上架'; saveAdminJobs(all) }
}

export function exportJobsJSON(): string {
  return JSON.stringify(getAdminJobs(), null, 2)
}

export function importJobsJSON(json: string): { success: boolean; message: string } {
  try {
    const data = JSON.parse(json)
    if (!Array.isArray(data)) return { success: false, message: 'JSON 格式错误：需要数组' }
    for (const item of data) {
      if (!item.title || !item.salary) return { success: false, message: '每条岗位必须有 title 和 salary 字段' }
    }
    localStorage.setItem(JOBS_KEY, json)
    return { success: true, message: `成功导入 ${data.length} 条岗位` }
  } catch {
    return { success: false, message: 'JSON 解析失败，请检查格式' }
  }
}

export function resetToDefaultJobs(): void {
  localStorage.removeItem(JOBS_KEY)
}
