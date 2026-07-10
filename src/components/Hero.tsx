import { useState } from 'react'
import { Phone, MessageCircle, Copy, Check } from 'lucide-react'
import { siteConfig } from '../config/site'
import styles from './Hero.module.css'

interface HeroProps {
  onSearch: (query: string) => void
  onApplyClick: () => void
  onPartnerClick: () => void
}

export default function Hero({ onSearch, onApplyClick, onPartnerClick }: HeroProps) {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)

  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSearch(input) }

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.wechatId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>金坛工厂招聘、新能源厂招聘、普工操作工岗位</h1>
        <p className={styles.subtitle}>
          覆盖金坛开发区、华罗庚科技产业园、儒林、直溪、朱林等周边制造业岗位。
          长白班、包吃住、五险一金、小时工、正式工都可咨询。
        </p>
        <form className={styles.searchBox} onSubmit={handleSubmit}>
          <input type="text" className={styles.searchInput}
            placeholder="搜索岗位关键词，例如：长白班、操作工、质检、叉车"
            value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className={styles.searchBtn}>搜索岗位</button>
        </form>
        <div className={styles.ctaButtons}>
          <button className={`${styles.ctaBtn} ${styles.ctaPrimary}`} onClick={onApplyClick}>我要找工作</button>
          <button className={`${styles.ctaBtn} ${styles.ctaOutline}`} onClick={onPartnerClick}>企业合作</button>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={`tel:${siteConfig.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', textDecoration: 'none' }}>
            <Phone size={16} /> {siteConfig.phone}
          </a>
          <button onClick={copyWechat} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', cursor: 'pointer', padding: 0 }}>
            {copied ? <Check size={16} style={{color:'#10b981'}} /> : <MessageCircle size={16} />}
            {copied ? '已复制' : `微信：${siteConfig.wechatId}`}
          </button>
        </div>
      </div>
    </section>
  )
}
