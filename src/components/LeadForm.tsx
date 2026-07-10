import { useState, useEffect } from 'react'
import { CheckCircle, Phone, MessageCircle, Copy, Check } from 'lucide-react'
import { LeadFormData } from '../types'
import { submitLead } from '../services/submission'
import { siteConfig } from '../config/site'
import styles from './LeadForm.module.css'

interface LeadFormProps {
  expectedJob: string
  onExpectedJobChange: (val: string) => void
}

const areaOptions = ['金坛开发区','华罗庚科技产业园','儒林镇','直溪镇','朱林镇','金城镇','开发区周边','其他']

function validatePhone(phone: string): boolean {
  return /^1[3-9]\d{9}$/.test(phone)
}

export default function LeadForm({ expectedJob, onExpectedJobChange }: LeadFormProps) {
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState<LeadFormData>({ name: '', phone: '', age: '', expectedJob, acceptShift: '', expectedArea: '', note: '' })
  const [errors, setErrors] = useState<Partial<Record<keyof LeadFormData, string>>>({})

  useEffect(() => {
    if (expectedJob && expectedJob !== formData.expectedJob) setFormData(prev => ({ ...prev, expectedJob }))
  }, [expectedJob])

  const copyWechat = async () => {
    try { await navigator.clipboard.writeText(siteConfig.wechatId); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch { /* ignore */ }
  }

  const handleExpectedJobChange = (val: string) => { setFormData(prev => ({ ...prev, expectedJob: val })); onExpectedJobChange(val) }
  const handleChange = (field: keyof LeadFormData, value: string) => { setFormData(prev => ({ ...prev, [field]: value })); if (errors[field]) setErrors(prev => ({ ...prev, [field]: '' })) }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    const newErrors: Partial<Record<keyof LeadFormData, string>> = {}
    if (!formData.name.trim()) newErrors.name = '请输入姓名'
    if (!formData.phone.trim()) newErrors.phone = '请输入手机号'
    else if (!validatePhone(formData.phone)) newErrors.phone = '手机号格式不正确'
    if (Object.keys(newErrors).length > 0) { setErrors(newErrors); return }
    await submitLead(formData)
    setSubmitted(true)
  }

  if (submitted) return (
    <section className={styles.section}><div className={styles.inner}>
      <div className={styles.success}>
        <div className={styles.successIcon}><CheckCircle size={28} /></div>
        <div className={styles.successTitle}>报名已提交</div>
        <div className={styles.successDesc}>可添加招聘顾问微信优先确认岗位</div>
        <div style={{ display: 'flex', gap: '0.75rem', justifyContent: 'center', marginTop: '0.75rem', flexWrap: 'wrap' }}>
          <a href={`tel:${siteConfig.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: 'var(--color-orange)', color: 'white', borderRadius: 'var(--radius)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            <Phone size={16} /> {siteConfig.phone}
          </a>
          <button onClick={copyWechat} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', borderRadius: 'var(--radius)', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? '已复制' : `微信 ${siteConfig.wechatId}`}
          </button>
        </div>
        <div style={{ fontSize: '0.8125rem', color: '#92400e', marginTop: '0.75rem', background: '#fffbeb', padding: '0.5rem 0.75rem', borderRadius: '6px', border: '1px solid #fde68a', lineHeight: 1.5 }}>
          求职不收费，请勿向任何个人转账缴费
        </div>
      </div>
    </div></section>
  )

  return (
    <section className={styles.section} id="lead-form">
      <div className={styles.inner}>
        <h2 className="section-title">快速报名</h2>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.row}>
            <div className="form-group">
              <label className="required">姓名</label>
              <input type="text" className="form-input" placeholder="请输入姓名"
                value={formData.name} onChange={(e) => handleChange('name', e.target.value)} />
              {errors.name && <div className="form-error">{errors.name}</div>}
            </div>
            <div className="form-group">
              <label className="required">手机号</label>
              <input type="tel" className="form-input" placeholder="请输入手机号"
                value={formData.phone} onChange={(e) => handleChange('phone', e.target.value)} />
              {errors.phone && <div className="form-error">{errors.phone}</div>}
            </div>
          </div>
          <div className={styles.row}>
            <div className="form-group">
              <label>年龄</label>
              <input type="text" className="form-input" placeholder="如：25岁"
                value={formData.age} onChange={(e) => handleChange('age', e.target.value)} />
            </div>
            <div className="form-group">
              <label>期望区域</label>
              <select className="form-select" value={formData.expectedArea} onChange={(e) => handleChange('expectedArea', e.target.value)}>
                <option value="">请选择区域</option>
                {areaOptions.map(a => (<option key={a} value={a}>{a}</option>))}
              </select>
            </div>
          </div>
          <div className="form-group">
            <label>期望岗位</label>
            <input type="text" className="form-input" placeholder="输入期望岗位名称，如：操作工、质检"
              value={formData.expectedJob} onChange={(e) => handleExpectedJobChange(e.target.value)} />
          </div>
          <div className="form-group">
            <label>是否接受倒班</label>
            <div style={{ display: 'flex', gap: '0.75rem', marginTop: '0.25rem', flexWrap: 'wrap' }}>
              {['接受倒班','只上长白班','都可以'].map(opt => (
                <label key={opt} style={{ display: 'flex', alignItems: 'center', gap: '0.25rem', fontSize: '0.9375rem', cursor: 'pointer' }}>
                  <input type="radio" name="acceptShift" value={opt} checked={formData.acceptShift === opt}
                    onChange={(e) => handleChange('acceptShift', e.target.value)} /> {opt}
                </label>
              ))}
            </div>
          </div>
          <div className="form-group">
            <label>补充说明</label>
            <textarea className="form-textarea" placeholder="如有特殊要求可在此填写"
              value={formData.note} onChange={(e) => handleChange('note', e.target.value)} />
          </div>
          <button type="submit" className={styles.submitBtn}>提交报名</button>
        </form>
      </div>
    </section>
  )
}
