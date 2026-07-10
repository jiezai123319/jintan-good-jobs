import { Phone, MessageCircle } from 'lucide-react'
import { siteConfig } from '../config/site'
import styles from './Footer.module.css'

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>{siteConfig.name}</div>
        <div className={styles.contactRow}>
          <span className={styles.contactItem}>
            <Phone size={14} />
            <a href={`tel:${siteConfig.phone}`}>{siteConfig.phone}</a>
          </span>
          <span className={styles.contactItem}>
            <MessageCircle size={14} />
            微信号：{siteConfig.wechatId}
          </span>
        </div>
        <div className={styles.links}>
          <span className={styles.link}>本地招聘信息与报名服务平台</span>
          <span className={styles.divider}>|</span>
          <span className={styles.link}>求职不收费</span>
        </div>
        <div className={styles.copyright}>
          &copy; {new Date().getFullYear()} {siteConfig.name} &middot; {siteConfig.beian}
        </div>
      </div>
    </footer>
  )
}
