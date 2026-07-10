import { useState } from 'react'
import { Phone, Copy, Check, MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/site'
import styles from './Hero.module.css'

interface HeroProps {
  onSearch: (query: string) => void
  onListClick: () => void
  onMerchantClick: () => void
}

export default function Hero({ onSearch, onListClick, onMerchantClick }: HeroProps) {
  const [input, setInput] = useState('')
  const [copied, setCopied] = useState(false)
  const handleSubmit = (e: React.FormEvent) => { e.preventDefault(); onSearch(input) }
  const copyWechat = async () => { try { await navigator.clipboard.writeText(siteConfig.wechatId); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {} }

  return (
    <section className={styles.hero}>
      <div className={styles.heroInner}>
        <h1 className={styles.title}>金坛小吃榜单 - 发现金坛本地美食</h1>
        <p className={styles.subtitle}>
          覆盖金坛早餐、面馆、夜宵、老店、特色小吃全品类。人均几元到几十元，本地人推荐的美食指南。
        </p>
        <form className={styles.searchBox} onSubmit={handleSubmit}>
          <input type="text" className={styles.searchInput}
            placeholder="搜索小吃店名称或地址，例如：小笼包、牛肉面、烧烤"
            value={input} onChange={(e) => setInput(e.target.value)} />
          <button type="submit" className={styles.searchBtn}>搜索美食</button>
        </form>
        <div className={styles.ctaButtons}>
          <button className={`${styles.ctaBtn} ${styles.ctaPrimary}`} onClick={onListClick}>查看榜单</button>
          <button className={`${styles.ctaBtn} ${styles.ctaOutline}`} onClick={onMerchantClick}>商家入驻</button>
        </div>
        <div style={{ display: 'flex', gap: '0.75rem', marginTop: '1rem', flexWrap: 'wrap', alignItems: 'center' }}>
          <a href={`tel:${siteConfig.phone}`} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', textDecoration: 'none' }}>
            <Phone size={16} /> {siteConfig.phone}
          </a>
          <button onClick={copyWechat} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', background: 'none', border: 'none', color: 'rgba(255,255,255,0.9)', fontSize: '0.875rem', cursor: 'pointer', padding: 0 }}>
            {copied ? <Check size={16} style={{color:'#10b981'}} /> : <MessageCircle size={16} />}
            {copied ? '已复制' : '微信：' + siteConfig.wechatId}
          </button>
        </div>
      </div>
    </section>
  )
}
