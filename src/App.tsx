import { useState, useRef, useEffect } from 'react'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import JobFilters from './components/JobFilters'
import JobCard from './components/JobCard'
import LeadForm from './components/LeadForm'
import PartnerForm from './components/PartnerForm'
import ProcessSteps from './components/ProcessSteps'
import SafetyTips from './components/SafetyTips'
import ComplianceNotice from './components/ComplianceNotice'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import AdminJobs from './components/AdminJobs'
import { jobTags } from './data/jobs'
import { getAdminJobs } from './services/submission'
import { AdminJob } from './types'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [jobs, setJobs] = useState<AdminJob[]>([])
  const [activeTag, setActiveTag] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')
  const [expectedJob, setExpectedJob] = useState('')
  const leadFormRef = useRef<HTMLDivElement>(null)
  const partnerRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    // Load active jobs
    setJobs(getAdminJobs().filter(j => j.status === '上架'))
    return () => window.removeEventListener('hashchange', handler)
  }, [])

  // Re-load jobs on hash change (after admin saves)
  useEffect(() => {
    setJobs(getAdminJobs().filter(j => j.status === '上架'))
  }, [hash])

  const scrollToApply = () => leadFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  const scrollToPartner = () => partnerRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })

  const filteredJobs = jobs.filter((job: AdminJob) => {
    const tagMatch = activeTag === '全部' || job.tags.includes(activeTag) || job.title.includes(activeTag)
    const searchMatch = !searchQuery.trim() ||
      job.title.includes(searchQuery.trim()) ||
      job.area.includes(searchQuery.trim()) ||
      job.tags.some(t => t.includes(searchQuery.trim())) ||
      job.description.includes(searchQuery.trim())
    return tagMatch && searchMatch
  })

  const handleApply = (title: string) => {
    setExpectedJob(title)
    leadFormRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
  }

  if (hash === '#/admin') return <AdminPanel onBack={() => { window.location.hash = '' }} />
  if (hash === '#/admin/jobs') return <AdminJobs onBack={() => { window.location.hash = '' }} />

  return (
    <>
      <Header onApplyClick={scrollToApply} onPartnerClick={scrollToPartner} />
      <Hero onSearch={(q) => setSearchQuery(q)} onApplyClick={scrollToApply} onPartnerClick={scrollToPartner} />
      <Stats />
      <div className="section" id="jobs">
        <div className="container">
          <h2 className="section-title">热门岗位</h2>
          <JobFilters tags={jobTags} activeTag={activeTag} onSelect={setActiveTag} />
          <JobCard jobs={filteredJobs} onApply={handleApply} />
        </div>
      </div>
      <div ref={leadFormRef}><LeadForm expectedJob={expectedJob} onExpectedJobChange={setExpectedJob} /></div>
      <div ref={partnerRef}><PartnerForm /></div>
      <ProcessSteps />
      <SafetyTips />
      <ComplianceNotice />
      <Footer />
    </>
  )
}
