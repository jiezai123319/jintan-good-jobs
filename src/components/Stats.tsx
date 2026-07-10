import styles from './Stats.module.css'

const stats = [
  { number: '36', label: '本周岗位' },
  { number: '8', label: '合作企业' },
  { number: '0元', label: '求职费用' },
  { number: '金坛全区', label: '覆盖区域' },
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
