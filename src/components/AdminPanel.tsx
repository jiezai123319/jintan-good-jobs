import { useState } from 'react'
import { ArrowLeft } from 'lucide-react'
import { getLocalLeads, getLocalMerchants, clearLocalSubmissions } from '../services/submission'
import './AdminPanel.css'

interface Props { onBack: () => void }

export default function AdminPanel({ onBack }: Props) {
  const [leads] = useState(getLocalLeads())
  const [merchants] = useState(getLocalMerchants())
  const [msg, setMsg] = useState('')

  const handleClear = () => { if (confirm('\u786e\u5b9a\u6e05\u7a7a\uff1f')) { clearLocalSubmissions(); setMsg('\u5df2\u6e05\u7a7a'); window.location.reload() } }

  const renderTable = (records: any[], title: string) => (
    <div className="adminSection">
      <h3 className="adminSubtitle">{title} ({records.length})</h3>
      {records.length === 0 ? <div className="adminEmpty">\u6682\u65e0\u8bb0\u5f55</div> : (
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
        <div className="adminBack"><a href="/" onClick={e => { e.preventDefault(); onBack() }}><ArrowLeft size={16} /> \u8fd4\u56de\u9996\u9875</a></div>
        <div className="adminHeader"><h1 className="adminTitle">\u672c\u5730\u7ebf\u7d22\u8bb0\u5f55</h1>
          <div className="adminActions"><button className="adminBtn adminBtnDanger" onClick={handleClear}>\u6e05\u7a7a\u8bb0\u5f55</button></div>
        </div>
        {msg && <div className="adminSuccess">{msg}</div>}
        {renderTable(leads, '\u6c42\u804c\u62a5\u540d\u8bb0\u5f55')}
        {renderTable(merchants, '\u5546\u5bb6\u5165\u9a7b\u8bb0\u5f55')}
      </div>
    </div>
  )
}
