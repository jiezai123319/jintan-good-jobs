export interface AdminJob {
  id: number
  title: string
  company: string
  salary: string
  area: string
  tags: string[]
  description: string
  shift: string
  benefits: string
  headcount: string
  contact: string
  phone: string
  updateTime: string
  status: '上架' | '下架'
  sourceType: '工厂直招' | '人力资源公司' | '劳务派遣' | '其他'
  verified: boolean
}

export interface LeadFormData {
  name: string
  phone: string
  age: string
  expectedJob: string
  acceptShift: string
  expectedArea: string
  note: string
}

export interface PartnerFormData {
  company: string
  contact: string
  phone: string
  jobTitle: string
  note: string
}

export type JobTag = string
