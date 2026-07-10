import { useState } from 'react'
import { UtensilsCrossed, Phone, Copy, Check } from 'lucide-react'
import { siteConfig } from '../config/site'
import styles from './Header.module.css'

interface HeaderProps {
  onListClick: () => void
  onMerchantClick: () => void
}

export default function Header({ onListClick, onMerchantClick }: HeaderProps) {
  const [copied, setCopied] = useState(false)
  const copyWechat = async () => {
    try { await navigator.clipboard.writeText(siteConfig.wechatId); setCopied(true); setTimeout(() => setCopied(false), 2000) } catch {}
  }
  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}><UtensilsCrossed size={18} /></div>
          <span className={styles.brandText}>{siteConfig.name}</span>
        </div>
        <span className={styles.tagline}>金坛本地小吃美食指南</span>
        <div className={styles.navWrap}>
          <a href={`tel:${siteConfig.phone}`} className={`${styles.contactBtn} ${styles.contactPhone}`}><Phone size={14} /><span>电话咨询</span></a>
          <button className={`${styles.contactBtn} ${styles.contactWechat}`} onClick={copyWechat}>{copied ? <Check size={14} /> : <Copy size={14} />}<span>{copied ? '已复制' : '复制微信'}</span></button>
          <button className={`${styles.navBtn} ${styles.navBtnPrimary}`} onClick={onListClick}>榜单</button>
          <button className={styles.navBtn} onClick={onMerchantClick}>入驻</button>
        </div>
      </div>
    </header>
  )
}
