import { useState } from 'react'
import { Clock, MapPin, MessageCircle, Copy, Check, BadgeCheck } from 'lucide-react'
import { AdminJob } from '../types'
import { siteConfig } from '../config/site'
import styles from './JobCard.module.css'

interface JobCardProps {
  jobs: AdminJob[]
  onApply: (title: string) => void
}

export default function JobCard({ jobs, onApply }: JobCardProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copyWechat = async (jobId: number) => {
    try { await navigator.clipboard.writeText(siteConfig.wechatId); setCopiedId(jobId); setTimeout(() => setCopiedId(null), 2000) } catch { }
  }

  if (jobs.length === 0) return <div className={styles.empty}>暂无匹配岗位，换个筛选条件试试</div>

  return (
    <div className={styles.grid}>
      {jobs.map((job) => (
        <div className={styles.card} key={job.id}>
          <div className={styles.cardHeader}>
            <h3 className={styles.jobTitle}>{job.title}</h3>
            <span className={styles.salary}>{job.salary}</span>
          </div>
          {job.company && <div className={styles.company}>{job.company}</div>}
          <div className={styles.area}><MapPin size={14} /> {job.area}</div>
          <div className={styles.meta}>
            <span className={styles.updateTime}><Clock size={12} /> {job.updateTime || '本周更新'}</span>
            {job.verified !== undefined && (
              <span className={`${styles.verifiedBadge} ${job.verified ? styles.verifiedYes : styles.verifiedNo}`}>
                <BadgeCheck size={12} /> {job.verified ? '已核实' : '未核实'}
              </span>
            )}
          </div>
          <div className={styles.tags}>{job.tags.map(tag => (<span className={styles.tag} key={tag}>{tag}</span>))}</div>
          <p className={styles.desc}>{job.description}</p>
          <div className={styles.btnRow}>
            <button className={styles.applyBtn} onClick={() => onApply(job.title)}>我要报名</button>
            <button className={styles.wechatBtn} onClick={() => copyWechat(job.id)}>
              {copiedId === job.id ? <Check size={16} /> : <Copy size={14} />}
              {copiedId === job.id ? '已复制' : '微信咨询'}
            </button>
          </div>
        </div>
      ))}
    </div>
  )
}
