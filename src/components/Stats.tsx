import { Store, Utensils, Star, Heart } from 'lucide-react'
import styles from './Stats.module.css'

const stats = [
  { icon: Store, number: '15', label: '收录店铺' },
  { icon: Utensils, number: '6', label: '美食分类' },
  { icon: Star, number: '10', label: '必吃榜单' },
  { icon: Heart, number: '0元', label: '免费入驻' },
]

export default function Stats() {
  return (
    <section className={styles.stats}>
      <div className={styles.statsInner}>
        {stats.map((s) => (
          <div className={styles.statCard} key={s.label}>
            <div className={styles.statNumber}>{s.number}</div>
            <div className={styles.statLabel}>{s.label}</div>
          </div>
        ))}
      </div>
    </section>
  )
}
