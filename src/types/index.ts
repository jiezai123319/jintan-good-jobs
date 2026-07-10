export interface ShopItem {
  id: number
  name: string
  category: string
  address: string
  avgPrice: string
  hours: string
  signatureDish: string
  reason: string
  tags: string[]
  phone: string
  updateTime: string
  status: '上架' | '下架'
  verified: boolean
  rank?: number
}

export interface LeadFormData {
  name: string
  phone: string
  note: string
}

export interface MerchantFormData {
  shopName: string
  contact: string
  phone: string
  category: string
  package: string
  note: string
}
