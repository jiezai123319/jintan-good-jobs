import { useState } from 'react'
import { ArrowLeft, Copy, Download, Trash2 } from 'lucide-react'
import { getLocalLeads, getLocalPartners, clearLocalSubmissions, exportAsCSV } from '../services/submission'
import './AdminPanel.css'

interface AdminPanelProps {
  onBack: () => void
}

export default function AdminPanel({ onBack }: AdminPanelProps) {
  const [leads, setLeads] = useState(getLocalLeads())
  const [partners, setPartners] = useState(getLocalPartners())
  const [msg, setMsg] = useState('')

  const refresh = () => {
    setLeads(getLocalLeads())
    setPartners(getLocalPartners())
  }

  const handleClear = () => {
    if (confirm('确定清空所有本地线索记录？')) {
      clearLocalSubmissions()
      refresh()
      setMsg('所有线索已清空')
    }
  }

  const handleCopyJSON = () => {
    const data = JSON.stringify({ leads, partners }, null, 2)
    navigator.clipboard.writeText(data).then(() => setMsg('JSON 已复制到剪贴板'))
  }

  const handleExportCSV = () => {
    const csv = exportAsCSV(leads)
    if (!csv) { setMsg('暂无数据可导出'); return }
    const blob = new Blob(['\ufeff' + csv], { type: 'text/csv;charset=utf-8' })
    const url = URL.createObjectURL(blob)
    const a = document.createElement('a')
    a.href = url; a.download = '求职报名记录.csv'; a.click()
    URL.revokeObjectURL(url)
    setMsg('CSV 已导出')
  }

  const renderTable = (records: any[], title: string) => (
    <div className="adminSection">
      <h3 className="adminSubtitle">{title}（{records.length}）</h3>
      {records.length === 0 ? (
        <div className="adminEmpty">暂无记录</div>
      ) : (
        <div style={{ overflowX: 'auto' }}>
          <table className="adminTable">
            <thead>
              <tr>{Object.keys(records[0]).map(k => <th key={k}>{k}</th>)}</tr>
            </thead>
            <tbody>
              {records.map((r, i) => (
                <tr key={i}>{Object.keys(records[0]).map(k => <td key={k}>{String(r[k] ?? '')}</td>)}</tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (
    <div className="adminWrap">
      <div className="adminInner">
        <div className="adminBack">
          <a href="/" onClick={(e) => { e.preventDefault(); onBack() }} style={{ display: 'inline-flex', alignItems: 'center', gap: '0.375rem', cursor: 'pointer' }}>
            <ArrowLeft size={16} /> 返回首页
          </a>
        </div>
        <div className="adminHeader">
          <h1 className="adminTitle">本地线索记录</h1>
          <div className="adminActions">
            <button className="adminBtn adminBtnOutline" onClick={handleCopyJSON}><Copy size={14} /> 复制 JSON</button>
            <button className="adminBtn adminBtnOutline" onClick={handleExportCSV}><Download size={14} /> 导出 CSV</button>
            <button className="adminBtn adminBtnDanger" onClick={handleClear}><Trash2 size={14} /> 清空记录</button>
          </div>
        </div>
        {msg && <div className="adminSuccess">{msg}</div>}
        {renderTable(leads, '求职报名记录')}
        {renderTable(partners, '企业合作记录')}
      </div>
    </div>
  )
}
