import { useState } from 'react'
import { Clock, MapPin, MessageCircle, Copy, Check } from 'lucide-react'
import { Job } from '../types'
import { siteConfig } from '../config/site'
import styles from './JobCard.module.css'

interface JobCardProps {
  jobs: Job[]
  onApply: (title: string) => void
}

export default function JobCard({ jobs, onApply }: JobCardProps) {
  const [copiedId, setCopiedId] = useState<number | null>(null)

  const copyWechat = async (jobId: number) => {
    try {
      await navigator.clipboard.writeText(siteConfig.wechatId)
      setCopiedId(jobId)
      setTimeout(() => setCopiedId(null), 2000)
    } catch { /* ignore */ }
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
          <div className={styles.area}><MapPin size={14} /> {job.area}</div>
          <div className={styles.updateTime}><Clock size={12} /> 更新时间：{job.updateTime || '本周更新'}</div>
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
