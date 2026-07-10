import { Briefcase, User, Building2, Phone, MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/site'
import styles from './Header.module.css'

interface HeaderProps {
  onApplyClick: () => void
  onPartnerClick: () => void
}

export default function Header({ onApplyClick, onPartnerClick }: HeaderProps) {
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
          <button className={`${styles.navBtn} ${styles.navBtnPrimary}`} onClick={onApplyClick}>
            <User size={14} /> 找工作
          </button>
          <button className={styles.navBtn} onClick={onPartnerClick}>
            <Building2 size={14} /> 合作
          </button>
        </div>
      </div>
    </header>
  )
}
