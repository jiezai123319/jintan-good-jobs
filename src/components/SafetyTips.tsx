import { TriangleAlert } from 'lucide-react'
import styles from './SafetyTips.module.css'

const tips = [
  '平台不向求职者收取任何费用',
  '不要向任何个人或中介提前转账缴费',
  '薪资福利以企业确认信息为准',
  '不轻信私下收费或押金要求'
]

export default function SafetyTips() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3 className={styles.title}>
          <TriangleAlert size={18} /> 求职提醒
        </h3>
        <div className={styles.grid}>
          {tips.map((t, i) => (
            <div className={styles.item} key={i}>
              <TriangleAlert size={16} className={styles.icon} />
              {t}
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
