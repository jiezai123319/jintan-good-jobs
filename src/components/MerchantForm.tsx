import { useState } from 'react'
import { CheckCircle, Phone, Copy, Check } from 'lucide-react'
import { MerchantFormData } from '../types'
import { submitMerchant } from '../services/submission'
import { siteConfig } from '../config/site'
import styles from './MerchantForm.module.css'

const pkgList = [
  { id: 'basic', name: '基础入驻', price: '39.9',
    features: ['店铺展示', '分类榜单展示', '联系方式展示'], badge: '' },
  { id: 'popular', name: '人气推荐', price: '99',
    features: ['基础入驻全部功能', '首页推荐位', '推荐标签'], badge: '推荐' },
  { id: 'premium', name: '榜单推广', price: '199',
    features: ['人气推荐全部功能', '榜单靠前展示', '活动信息展示'], badge: '' },
]
const categories = ['早餐店', '面馆', '夜宵', '老店', '特色小吃', '炒菜馆', '烘焙甜品', '其他']

export default function MerchantForm() {
  const [submitted, setSubmitted] = useState(false)
  const [copied, setCopied] = useState(false)
  const [formData, setFormData] = useState<MerchantFormData>({ shopName: '', contact: '', phone: '', category: '', package: '', note: '' })

  const copyWechat = async () => {
    try { await navigator.clipboard.writeText(siteConfig.wechatId); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.shopName.trim() || !formData.phone.trim()) { alert('请填写店铺名称和联系电话'); return }
    await submitMerchant(formData)
    setSubmitted(true)
  }

  if (submitted) return (
    <section className={styles.section}><div className={styles.inner}>
      <div className={styles.success}>
        <div className={styles.successIcon}><CheckCircle size={28} /></div>
        <div className={styles.successTitle}>已提交入驻意向</div>
        <div style={{ fontSize: '0.875rem', color: 'var(--color-text)', marginBottom: '0.5rem', lineHeight: 1.6 }}>
          当前信息已保存在本机浏览器。为避免遗漏，请立即添加微信完成入驻确认。
        </div>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.5 }}>
          请通过微信发送：店铺照片、菜单/招牌小吃、详细地址、营业时间。
        </div>
        <div style={{ display: 'flex', gap: '0.625rem', justifyContent: 'center', flexWrap: 'wrap', marginBottom: '0.75rem' }}>
          <button onClick={copyWechat} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: '#10b981', color: 'white', borderRadius: 'var(--radius)', fontSize: '0.875rem', fontWeight: 600, border: 'none', cursor: 'pointer' }}>
            {copied ? <Check size={16} /> : <Copy size={16} />}
            {copied ? '已复制' : '复制微信号：' + siteConfig.wechatId}
          </button>
          <a href={`tel:${siteConfig.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', padding: '0.5rem 1rem', background: 'var(--color-orange)', color: 'white', borderRadius: 'var(--radius)', fontSize: '0.875rem', fontWeight: 600, textDecoration: 'none' }}>
            <Phone size={16} /> {siteConfig.phone}
          </a>
        </div>
      </div>
    </div></section>
  )

  return (
    <section className={styles.section} id="merchant">
      <div className={styles.inner}>
        <h2 className="section-title">商家入驻/合作</h2>
        <div style={{ fontSize: '0.8125rem', color: 'var(--color-text-secondary)', marginBottom: '0.75rem', lineHeight: 1.6 }}>
          适合金坛早餐、小吃、面馆、夜宵、老店、特色小店。添加微信后确认入驻资料和展示位置。
        </div>
        <div className={styles.promoBanner}>前 50 家商户享 39.9 元/月早鸟价！微信咨询入驻：{siteConfig.wechatId}</div>
        <div className={styles.pricingGrid}>
          {pkgList.map(pkg => (
            <div key={pkg.id} className={`${styles.pricingCard} ${pkg.badge ? styles.pricingFeatured : ''}`} onClick={() => setFormData(prev => ({ ...prev, package: pkg.name }))}>
              {pkg.badge && <div className={styles.pricingBadge}>{pkg.badge}</div>}
              <div className={styles.pricingTitle}>{pkg.name}</div>
              <div className={styles.pricingPrice}>¥{pkg.price} <small>/ 月</small></div>
              <ul className={styles.pricingFeatures}>{pkg.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{formData.package === pkg.name ? '✓ 已选择' : '点击选择'}</div>
            </div>
          ))}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className="form-group"><label>店铺/机构名称</label><input type="text" className="form-input" placeholder="如：老陈记锅贴" value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} /></div>
            <div className="form-group"><label>联系人</label><input type="text" className="form-input" placeholder="请输入联系人" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} /></div>
            <div className="form-group"><label>手机号</label><input type="tel" className="form-input" placeholder="请输入手机号" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
            <div className="form-group"><label>小吃类别</label><select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="">请选择</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <div className="form-group"><label>备注</label><textarea className="form-textarea" placeholder="补充信息，如经营特色、合作需求等" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} /></div>
          <button type="submit" className={styles.submitBtn}>提交入驻意向</button>
        </form>
      </div>
    </section>
  )
}
