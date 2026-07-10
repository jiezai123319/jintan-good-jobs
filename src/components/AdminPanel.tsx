import { useState } from 'react'
import { ArrowLeft, Info } from 'lucide-react'
import { getLocalLeads, getLocalMerchants, clearLocalSubmissions } from '../services/submission'
import './AdminPanel.css'

interface Props { onBack: () => void }

export default function AdminPanel({ onBack }: Props) {
  const [leads] = useState(getLocalLeads())
  const [merchants] = useState(getLocalMerchants())
  const [msg, setMsg] = useState('')

  const handleClear = () => { if (confirm('确定清空？')) { clearLocalSubmissions(); setMsg('已清空'); window.location.reload() } }

  const renderTable = (records: any[], title: string) => (
    <div className="adminSection">
      <h3 className="adminSubtitle">{title} ({records.length})</h3>
      {records.length === 0 ? <div className="adminEmpty">暂无记录</div> : (
        <div style={{ overflowX: 'auto' }}>
          <table className="adminTable"><thead><tr>{Object.keys(records[0]).map(k => <th key={k}>{k}</th>)}</tr></thead>
            <tbody>{records.map((r, i) => <tr key={i}>{Object.keys(records[0]).map(k => <td key={k}>{String(r[k] ?? '')}</td>)}</tr>)}</tbody>
          </table>
        </div>
      )}
    </div>
  )

  return (
    <div className="adminWrap">
      <div className="adminInner">
        <div className="adminBack"><a href="/" onClick={e => { e.preventDefault(); onBack() }}><ArrowLeft size={16} /> 返回首页</a></div>
        <div className="adminHeader"><h1 className="adminTitle">本地线索记录</h1>
          <div className="adminActions"><button className="adminBtn adminBtnDanger" onClick={handleClear}>清空记录</button></div>
        </div>
        {msg && <div className="adminSuccess">{msg}</div>}
        <div style={{ background: '#fffbeb', border: '1px solid #fde68a', borderRadius: 'var(--radius)', padding: '0.75rem 1rem', marginBottom: '1rem', fontSize: '0.8125rem', color: '#92400e', lineHeight: 1.5, display: 'flex', gap: '0.5rem', alignItems: 'flex-start' }}>
          <Info size={16} style={{ flexShrink: 0, marginTop: '2px' }} />
          <span>当前后台仅查看本机浏览器保存的提交记录。其他用户手机或电脑提交的数据不会自动同步到这里。如需统一查看全网提交，后续需要接入数据库或表单服务。</span>
        </div>
        {renderTable(leads, '美食咨询记录')}
        {renderTable(merchants, '商家入驻记录')}
      </div>
    </div>
  )
}
