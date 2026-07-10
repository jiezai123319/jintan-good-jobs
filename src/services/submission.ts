import { siteConfig } from '../config/site'
import type { LeadFormData, MerchantFormData, ShopItem } from '../types'
import { defaultShops } from '../data/shops'

const LEAD_KEY = 'jintan_lead_submissions'
const MERCHANT_KEY = 'jintan_merchant_submissions'
const SHOPS_KEY = 'jintan_admin_shops'

function getMeta() {
  return { submittedAt: new Date().toISOString(), source: 'web', userAgent: navigator.userAgent, pageUrl: window.location.href }
}

export async function submitLead(data: LeadFormData) {
  const existing = JSON.parse(localStorage.getItem(LEAD_KEY) || '[]')
  existing.push({ ...data, ...getMeta() })
  localStorage.setItem(LEAD_KEY, JSON.stringify(existing))
  if (siteConfig.api.enabled && siteConfig.api.leadEndpoint) {
    try { const r = await fetch(siteConfig.api.leadEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); if (!r.ok) console.warn('[submitLead] API:', r.status) } catch (e) { console.warn('[submitLead] fail:', e) }
  }
  return { success: true }
}

export async function submitMerchant(data: MerchantFormData) {
  const existing = JSON.parse(localStorage.getItem(MERCHANT_KEY) || '[]')
  existing.push({ ...data, ...getMeta() })
  localStorage.setItem(MERCHANT_KEY, JSON.stringify(existing))
  if (siteConfig.api.enabled && siteConfig.api.leadEndpoint) {
    try { const r = await fetch(siteConfig.api.leadEndpoint, { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify(data) }); if (!r.ok) console.warn('[submitMerchant] API:', r.status) } catch (e) { console.warn('[submitMerchant] fail:', e) }
  }
  return { success: true }
}

export function getLocalLeads() { return JSON.parse(localStorage.getItem(LEAD_KEY) || '[]') }
export function getLocalMerchants() { return JSON.parse(localStorage.getItem(MERCHANT_KEY) || '[]') }
export function clearLocalSubmissions() { localStorage.removeItem(LEAD_KEY); localStorage.removeItem(MERCHANT_KEY) }

export function getAdminShops(): ShopItem[] {
  const stored = localStorage.getItem(SHOPS_KEY)
  if (stored) return JSON.parse(stored)
  localStorage.setItem(SHOPS_KEY, JSON.stringify(defaultShops))
  return [...defaultShops]
}
export function saveAdminShops(shops: ShopItem[]) { localStorage.setItem(SHOPS_KEY, JSON.stringify(shops)) }
export function deleteAdminShop(id: number) { saveAdminShops(getAdminShops().filter(s => s.id !== id)) }
export function toggleShopStatus(id: number) { const all = getAdminShops(); const s = all.find(x => x.id === id); if (s) { s.status = s.status === '上架' ? '下架' : '上架'; saveAdminShops(all) } }
export function exportShopsJSON() { return JSON.stringify(getAdminShops(), null, 2) }
export function importShopsJSON(json: string) { try { const d = JSON.parse(json); if (!Array.isArray(d)) return { success: false, message: 'JSON 格式错误' }; localStorage.setItem(SHOPS_KEY, json); return { success: true, message: `成功导入 ${d.length} 家店铺` } } catch { return { success: false, message: 'JSON 解析失败' } } }
export function resetToDefaultShops() { localStorage.removeItem(SHOPS_KEY) }
