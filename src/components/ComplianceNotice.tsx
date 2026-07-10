import { ShieldAlert } from 'lucide-react'
import styles from './ComplianceNotice.module.css'

const items = [
  '平台不向求职者收取费用。',
  '岗位薪资、班次、福利以企业或合作招聘方最终确认为准。',
  '本站为本地招聘信息与报名服务平台，不冒充任何工厂官方招聘渠道。',
  '涉及劳务派遣、人力资源服务时，请对接具备相关资质的合作方。'
]

export default function ComplianceNotice() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h3 className={styles.title}>
          <ShieldAlert size={16} /> 合规提示
        </h3>
        <ul className={styles.list}>
          {items.map((item, i) => (
            <li className={styles.item} key={i}>{item}</li>
          ))}
        </ul>
      </div>
    </section>
  )
}
