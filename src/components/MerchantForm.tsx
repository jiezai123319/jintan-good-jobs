import { useState } from 'react'
import { CheckCircle } from 'lucide-react'
import { MerchantFormData } from '../types'
import { submitMerchant } from '../services/submission'
import styles from './MerchantForm.module.css'

const pkgList = [
  { id: 'basic', name: '\u57fa\u7840\u5165\u9a7b', price: '39.9',
    features: ['\u5e97\u94fa\u5c55\u793a', '\u5206\u7c7b\u699c\u5355\u5c55\u793a', '\u8054\u7cfb\u65b9\u5f0f\u5c55\u793a'], badge: '' },
  { id: 'popular', name: '\u4eba\u6c14\u63a8\u8350', price: '99',
    features: ['\u57fa\u7840\u5165\u9a7b\u5168\u90e8\u529f\u80fd', '\u9996\u9875\u63a8\u8350\u4f4d', '\u63a8\u8350\u6807\u7b7e'], badge: '\u63a8\u8350' },
  { id: 'premium', name: '\u699c\u5355\u63a8\u5e7f', price: '199',
    features: ['\u4eba\u6c14\u63a8\u8350\u5168\u90e8\u529f\u80fd', '\u699c\u5355\u9760\u524d\u5c55\u793a', '\u6d3b\u52a8\u4fe1\u606f\u5c55\u793a'], badge: '' },
]
const categories = ['\u65e9\u9910\u5e97', '\u9762\u9986', '\u591c\u5bb5', '\u8001\u5e97', '\u7279\u8272\u5c0f\u5403', '\u70d2\u83dc\u9986', '\u70d8\u7119\u751c\u54c1', '\u5176\u4ed6']

export default function MerchantForm() {
  const [submitted, setSubmitted] = useState(false)
  const [formData, setFormData] = useState<MerchantFormData>({ shopName: '', contact: '', phone: '', category: '', package: '', note: '' })

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!formData.shopName.trim() || !formData.phone.trim()) { alert('\u8bf7\u586b\u5199\u5e97\u94fa\u540d\u79f0\u548c\u8054\u7cfb\u7535\u8bdd'); return }
    await submitMerchant(formData)
    setSubmitted(true)
  }

  if (submitted) return (
    <section className={styles.section}><div className={styles.inner}>
      <div className={styles.success}>
        <div className={styles.successIcon}><CheckCircle size={28} /></div>
        <div className={styles.successTitle}>\u5408\u4f5c\u54a8\u8be2\u5df2\u63d0\u4ea4</div>
        <div className={styles.successDesc}>\u6211\u4eec\u4f1a\u5c3d\u5feb\u4e0e\u60a8\u8054\u7cfb\uff0c\u5546\u8bae\u5165\u9a7b\u4e8b\u5b9c\u3002</div>
      </div>
    </div></section>
  )

  return (
    <section className={styles.section} id="merchant">
      <div className={styles.inner}>
        <h2 className="section-title">\u5546\u5bb6\u5165\u9a7b/\u5408\u4f5c</h2>
        <div className={styles.promoBanner}>\u524d 50 \u5bb6\u5546\u6237\u4eab\u65e9\u9e1f\u4ef7\uff01\u5fae\u4fe1\u54a8\u8be2\u5165\u9a7b\uff1ajtjob888</div>
        <div className={styles.pricingGrid}>
          {pkgList.map(pkg => (
            <div key={pkg.id} className={`${styles.pricingCard} ${pkg.badge ? styles.pricingFeatured : ''}`} onClick={() => setFormData(prev => ({ ...prev, package: pkg.name }))}>
              {pkg.badge && <div className={styles.pricingBadge}>{pkg.badge}</div>}
              <div className={styles.pricingTitle}>{pkg.name}</div>
              <div className={styles.pricingPrice}>¥{pkg.price} <small>/ \u6708</small></div>
              <ul className={styles.pricingFeatures}>{pkg.features.map((f, i) => <li key={i}>{f}</li>)}</ul>
              <div style={{ fontSize: '0.75rem', color: 'var(--color-text-secondary)', marginTop: '0.25rem' }}>{formData.package === pkg.name ? '\u2713 \u5df2\u9009\u62e9' : '\u70b9\u51fb\u9009\u62e9'}</div>
            </div>
          ))}
        </div>
        <form className={styles.form} onSubmit={handleSubmit}>
          <div className={styles.formGrid}>
            <div className="form-group"><label>\u5e97\u94fa/\u673a\u6784\u540d\u79f0</label><input type="text" className="form-input" placeholder="\u5982\uff1a\u8001\u9648\u8bb0\u9505\u8d34" value={formData.shopName} onChange={e => setFormData({...formData, shopName: e.target.value})} /></div>
            <div className="form-group"><label>\u8054\u7cfb\u4eba</label><input type="text" className="form-input" placeholder="\u8bf7\u8f93\u5165\u8054\u7cfb\u4eba" value={formData.contact} onChange={e => setFormData({...formData, contact: e.target.value})} /></div>
            <div className="form-group"><label>\u624b\u673a\u53f7</label><input type="tel" className="form-input" placeholder="\u8bf7\u8f93\u5165\u624b\u673a\u53f7" value={formData.phone} onChange={e => setFormData({...formData, phone: e.target.value})} /></div>
            <div className="form-group"><label>\u5c0f\u5403\u7c7b\u522b</label><select className="form-select" value={formData.category} onChange={e => setFormData({...formData, category: e.target.value})}><option value="">\u8bf7\u9009\u62e9</option>{categories.map(c => <option key={c} value={c}>{c}</option>)}</select></div>
          </div>
          <div className="form-group"><label>\u5907\u6ce8</label><textarea className="form-textarea" placeholder="\u8865\u5145\u4fe1\u606f\uff0c\u5982\u7ecf\u8425\u7279\u8272\u3001\u5408\u4f5c\u9700\u6c42\u7b49" value={formData.note} onChange={e => setFormData({...formData, note: e.target.value})} /></div>
          <button type="submit" className={styles.submitBtn}>\u63d0\u4ea4\u5165\u9a7b\u54a8\u8be2</button>
        </form>
      </div>
    </section>
  )
}
