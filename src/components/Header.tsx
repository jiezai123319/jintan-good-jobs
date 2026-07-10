import { useState } from 'react'
import { Briefcase, User, Phone, MessageCircle, Copy, Check } from 'lucide-react'
import { siteConfig } from '../config/site'
import styles from './Header.module.css'

interface HeaderProps {
  onApplyClick: () => void
  onPartnerClick: () => void
}

export default function Header({ onApplyClick, onPartnerClick }: HeaderProps) {
  const [copied, setCopied] = useState(false)

  const copyWechat = async () => {
    try {
      await navigator.clipboard.writeText(siteConfig.wechatId)
      setCopied(true)
      setTimeout(() => setCopied(false), 2000)
    } catch { /* ignore */ }
  }

  return (
    <header className={styles.header}>
      <div className={styles.headerInner}>
        <div className={styles.brand}>
          <div className={styles.brandIcon}><Briefcase size={18} /></div>
          <span className={styles.brandText}>{siteConfig.name}</span>
        </div>
        <span className={styles.tagline}>专注金坛开发区、新能源、光伏锂电、制造业招聘</span>
        <div className={styles.navWrap}>
          <a href={`tel:${siteConfig.phone}`} className={`${styles.contactBtn} ${styles.contactPhone}`}>
            <Phone size={14} /><span>电话咨询</span>
          </a>
          <button className={`${styles.contactBtn} ${styles.contactWechat}`} onClick={copyWechat} title="点击复制微信号">
            {copied ? <Check size={14} /> : <Copy size={14} />}
            <span>{copied ? '已复制' : '复制微信'}</span>
          </button>
          <button className={`${styles.navBtn} ${styles.navBtnPrimary}`} onClick={onApplyClick}>
            <User size={14} /> 找工作
          </button>
        </div>
      </div>
    </header>
  )
}
