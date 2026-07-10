import styles from './ProcessSteps.module.css'

const steps = [
  { step: '1', title: '提交报名', desc: '填写岗位意向和联系方式，免费报名' },
  { step: '2', title: '顾问联系', desc: '招聘顾问确认岗位需求和求职意向' },
  { step: '3', title: '核实信息', desc: '确认薪资、班次、福利等岗位详情' },
  { step: '4', title: '预约入职', desc: '安排面试或直接预约入职' }
]

export default function ProcessSteps() {
  return (
    <section className={styles.section}>
      <div className={styles.inner}>
        <h2 className="section-title">求职流程</h2>
        <div className={styles.grid}>
          {steps.map((s) => (
            <div className={styles.card} key={s.step}>
              <div className={styles.stepNum}>{s.step}</div>
              <div className={styles.title}>{s.title}</div>
              <div className={styles.desc}>{s.desc}</div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
