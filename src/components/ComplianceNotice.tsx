import { ShieldAlert } from 'lucide-react'
import styles from './ComplianceNotice.module.css'

const items = [
  '榜单信息由平台收集整理，仅供美食参考。',
  '店铺营业时间、价格、菜品以现场实际为准。',
  '本站为金坛本地美食推荐与信息服务平台。',
  '商家入驻合作请通过官方微信联系。'
]

export default function ComplianceNotice() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3 className={styles.title}><ShieldAlert size={16} /> 声明</h3>
        <ul className={styles.list}>
          {items.map((item, i) => (<li className={styles.item} key={i}>{item}</li>))}
        </ul>
      </div>
    </section>
  )
}
