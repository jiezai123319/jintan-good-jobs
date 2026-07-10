export interface Job {
  id: number
  title: string
  salary: string
  area: string
  tags: string[]
  description: string
  updateTime?: string
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
