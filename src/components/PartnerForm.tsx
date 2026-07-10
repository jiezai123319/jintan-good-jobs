import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { PartnerFormData } from '../types'
import styles from './PartnerForm.module.css'

const STORAGE_KEY = 'jintan_partner_submissions'

export function submitPartner(data: PartnerFormData): Promise<{ success: boolean }> {
  const existing = JSON.parse(localStorage.getItem(STORAGE_KEY) || '[]')
  existing.push({ ...data, submittedAt: new Date().toISOString() })
  localStorage.setItem(STORAGE_KEY, JSON.stringify(existing))
  return Promise.resolve({ success: true })
}

function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

export default function PartnerForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<PartnerFormData>({
    company: '', contact: '', phone: '', jobTitle: '', note: ''
  })
  const [phoneError, setPhoneError] = useState('')

  const handleChange = (field: keyof PartnerFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }))
    if (field === 'phone' && phoneError) setPhoneError('')
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.phone.trim()) { setPhoneError('请输入手机号'); return }
    if (!validatePhone(formData.phone)) { setPhoneError('手机号格式不正确'); return }
    submitPartner(formData)
    setSubmitted(true)
  }

  if (submitted) return (
    <section className={styles.section}><div className={styles.inner}>
      <div className={styles.success}>
        <div className={styles.successIcon}><CheckCircle size={28} /></div>
        <div className={styles.successTitle}>合作咨询已提交</div>
        <div className={styles.successDesc}>我们会尽快与您联系。</div>
      </div>
    </div></section>
  )

  return (
    <section className={styles.section} id="partner">
      <div className={styles.inner}>
        <h2 className="section-title">企业/人力资源合作</h2>
        <p style={{ fontSize: '0.875rem', color: 'var(--color-text-secondary)', marginBottom: '1rem', lineHeight: 1.6 }}>
          如需发布金坛本地制造业岗位，可提供岗位名称、薪资范围、工作地址、招聘要求和福利待遇。支持岗位置顶、按有效报名线索合作、入职返佣合作。
        </p>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label>公司/机构名称</label>
              <input type="text" className="form-input" placeholder="请输入名称"
                value={formData.company} onChange={(e) => handleChange('company', e.target.value)} />
            </div>
            <div className="form-group">
              <label>联系人</label>
              <input type="text" className="form-input" placeholder="请输入联系人"
                value={formData.contact} onChange={(e) => handleChange('contact', e.target.value)} />
            </div>
          </div>
          <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1rem' }}>
            <div className="form-group">
              <label className="required">手机号</label>
              <input type="tel" className="form-input" placeholder="请输入手机号"
                value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
              {phoneError && <div className="form-error">{phoneError}</div>}
            </div>
            <div className="form-group">
              <label>招聘岗位</label>
              <input type="text" className="form-input" placeholder="如：操作工、质检"
                value={formData.jobTitle} onChange={(e) => handleChange('jobTitle', e.target.value)} />
            </div>
          </div>
          <div className="form-group">
            <label>备注</label>
            <textarea className="form-textarea" placeholder="补充招聘要求、福利待遇、合作意向等信息"
              value={formData.note} onChange={(e) => handleChange('note', e.target.value)} />
          </div>
          <button type="submit" className={styles.submitBtn}>提交合作咨询</button>
        </form>
      </div>
    </section>
  )
}
