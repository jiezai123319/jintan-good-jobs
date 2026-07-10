import { useState, useEffect } from "react"
import { ArrowLeft, Plus, Pencil, Trash2, ToggleLeft, ToggleRight, Download, Upload, RotateCcw } from "lucide-react"
import { AdminJob } from "../types"
import { getAdminJobs, saveAdminJobs, toggleJobStatus, deleteAdminJob, exportJobsJSON, importJobsJSON, resetToDefaultJobs } from "../services/submission"
import styles from "./AdminJobs.module.css"

interface AdminJobsProps { onBack: () => void }

const emptyJob = (): AdminJob => ({
  id: 0, title: "", company: "", salary: "", area: "", tags: [], description: "",
  shift: "", benefits: "", headcount: "", contact: "", phone: "", updateTime: "本周更新",
  status: "上架", sourceType: "工厂直招", verified: false
})

const areas = ["金坛开发区","华罗庚科技产业园","儒林镇","直溪镇","朱林镇","金城镇","开发区周边","其他"]
const sourceTypes: AdminJob["sourceType"][] = ["工厂直招","人力资源公司","劳务派遣","其他"]

export default function AdminJobs({ onBack }: AdminJobsProps) {
  const [jobs, setJobs] = useState<AdminJob[]>([])
  const [editing, setEditing] = useState<AdminJob | null>(null)
  const [search, setSearch] = useState("")
  const [areaFilter, setAreaFilter] = useState("")
  const [sourceFilter, setSourceFilter] = useState("")
  const [msg, setMsg] = useState("")
  const [msgErr, setMsgErr] = useState(false)
  const [showImport, setShowImport] = useState(false)
  const [importText, setImportText] = useState("")

  useEffect(() => { setJobs(getAdminJobs()) }, [])

  const showMsg = (text: string, err = false) => { setMsg(text); setMsgErr(err); setTimeout(() => setMsg(""), 3000) }
  const refresh = () => { setJobs(getAdminJobs()); setEditing(null) }

  const filtered = jobs.filter(j => {
    const s = search.toLowerCase()
    const matchSearch = !s || j.title.toLowerCase().includes(s) || j.company.toLowerCase().includes(s) || j.area.toLowerCase().includes(s)
    const matchArea = !areaFilter || j.area === areaFilter
    const matchSource = !sourceFilter || j.sourceType === sourceFilter
    return matchSearch && matchArea && matchSource
  })

  const handleSave = () => {
    if (!editing) return
    if (!editing.title.trim() || !editing.salary.trim()) { showMsg("岗位名称和薪资为必填", true); return }
    const tagInput = document.getElementById("admin-tag-input") as HTMLInputElement
    const tags = tagInput ? tagInput.value.split(",").map(t => t.trim()).filter(Boolean) : editing.tags
    const job = { ...editing, tags }
    if (job.id === 0) {
      const all = getAdminJobs()
      job.id = all.length > 0 ? Math.max(...all.map(j => j.id)) + 1 : 1
      all.push(job)
      saveAdminJobs(all)
      showMsg("岗位已新增")
    } else {
      const all = getAdminJobs().map(j => j.id === job.id ? job : j)
      saveAdminJobs(all)
      showMsg("岗位已更新")
    }
    refresh()
  }

  const handleEdit = (job: AdminJob) => { setEditing({ ...job }); window.scrollTo({ top: 0, behavior: "smooth" }) }
  const handleDelete = (id: number) => { if (!confirm("确定删除此岗位？")) return; deleteAdminJob(id); showMsg("岗位已删除"); refresh() }
  const handleToggle = (id: number) => { toggleJobStatus(id); const all = getAdminJobs(); const j = all.find(x => x.id === id); showMsg(j ? `岗位已${j.status}` : "操作完成"); refresh() }
  const handleExport = () => { const json = exportJobsJSON(); const blob = new Blob([json], { type: "application/json" }); const url = URL.createObjectURL(blob); const a = document.createElement("a"); a.href = url; a.download = "岗位数据.json"; a.click(); URL.revokeObjectURL(url); showMsg("JSON 已导出") }
  const handleImport = () => { const result = importJobsJSON(importText); if (result.success) { showMsg(result.message); setShowImport(false); setImportText(""); refresh() } else { showMsg(result.message, true) } }
  const handleReset = () => { if (!confirm("确定恢复默认岗位？当前所有修改将被覆盖。")) return; resetToDefaultJobs(); showMsg("已恢复默认岗位"); refresh() }

  return (
    <div className={styles.wrap}>
      <div className={styles.inner}>
        <div className={styles.backLink} onClick={onBack}><ArrowLeft size={16} /> 返回首页</div>
        <div className={styles.header}>
          <h1 className={styles.title}>岗位管理</h1>
          <div className={styles.headerActions}>
            <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={() => { setEditing(emptyJob()); window.scrollTo({ top: 0, behavior: "smooth" }) }}><Plus size={14} /> 新增岗位</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleExport}><Download size={14} /> 导出 JSON</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => { setShowImport(!showImport); setImportText("") }}><Upload size={14} /> 导入 JSON</button>
            <button className={`${styles.btn} ${styles.btnOutline}`} onClick={handleReset}><RotateCcw size={14} /> 恢复默认</button>
          </div>
        </div>
        <div className={styles.warning}>
          本地后台数据保存在当前浏览器 localStorage，换电脑或清缓存会丢失。正式运营建议接入飞书表格或数据库。
        </div>
        {msg && <div className={`${styles.msg} ${msgErr ? styles.msgError : ""}`}>{msg}</div>}

        {showImport && (
          <div className={styles.formWrap}>
            <div className={styles.formTitle}>导入岗位 JSON</div>
            <textarea className={styles.jsonTextarea} placeholder="粘贴 JSON 数据" value={importText} onChange={e => setImportText(e.target.value)} />
            <div className={styles.formActions}>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => { setShowImport(false); setImportText("") }}>取消</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleImport}>导入</button>
            </div>
          </div>
        )}

        {editing && (
          <div className={styles.formWrap}>
            <div className={styles.formTitle}>{editing.id === 0 ? "新增岗位" : "编辑岗位"}</div>
            <div className={styles.formGrid}>
              <div className={styles.formGroup}><label>岗位名称 *</label><input value={editing.title} onChange={e => setEditing({...editing, title: e.target.value})} placeholder="如：操作工" /></div>
              <div className={styles.formGroup}><label>企业名称</label><input value={editing.company} onChange={e => setEditing({...editing, company: e.target.value})} placeholder="如：金坛新能源科技有限公司" /></div>
              <div className={styles.formGroup}><label>薪资 *</label><input value={editing.salary} onChange={e => setEditing({...editing, salary: e.target.value})} placeholder="如：6500-8500元/月" /></div>
              <div className={styles.formGroup}><label>区域</label><select value={editing.area} onChange={e => setEditing({...editing, area: e.target.value})}><option value="">请选择</option>{areas.map(a => <option key={a} value={a}>{a}</option>)}</select></div>
              <div className={styles.formGroup}><label>标签（逗号分隔）</label><input id="admin-tag-input" defaultValue={editing.tags.join("，")} placeholder="如：包吃住,长白班" /></div>
              <div className={styles.formGroup}><label>班次</label><input value={editing.shift} onChange={e => setEditing({...editing, shift: e.target.value})} placeholder="如：两班倒" /></div>
              <div className={styles.formGroup}><label>福利</label><input value={editing.benefits} onChange={e => setEditing({...editing, benefits: e.target.value})} placeholder="如：五险一金、包吃住" /></div>
              <div className={styles.formGroup}><label>招聘人数</label><input value={editing.headcount} onChange={e => setEditing({...editing, headcount: e.target.value})} placeholder="如：20" /></div>
              <div className={styles.formGroup}><label>联系人</label><input value={editing.contact} onChange={e => setEditing({...editing, contact: e.target.value})} placeholder="如：张主管" /></div>
              <div className={styles.formGroup}><label>联系电话</label><input value={editing.phone} onChange={e => setEditing({...editing, phone: e.target.value})} placeholder="如：13800000001" /></div>
              <div className={styles.formGroup}><label>来源类型</label><select value={editing.sourceType} onChange={e => setEditing({...editing, sourceType: e.target.value as any})}>{sourceTypes.map(s => <option key={s} value={s}>{s}</option>)}</select></div>
              <div className={styles.formGroup}><label>状态</label><select value={editing.status} onChange={e => setEditing({...editing, status: e.target.value as any})}><option value="上架">上架</option><option value="下架">下架</option></select></div>
              <div className={styles.formGroup}><label>已核实</label><select value={editing.verified ? "yes" : "no"} onChange={e => setEditing({...editing, verified: e.target.value === "yes"})}><option value="yes">是</option><option value="no">否</option></select></div>
              <div className={styles.formGroup}><label>更新时间</label><input value={editing.updateTime} onChange={e => setEditing({...editing, updateTime: e.target.value})} placeholder="如：本周更新" /></div>
              <div className={`${styles.formGroup} ${styles.formFull}`}><label>工作说明</label><textarea value={editing.description} onChange={e => setEditing({...editing, description: e.target.value})} placeholder="岗位职责和要求" /></div>
            </div>
            <div className={styles.formActions}>
              <button className={`${styles.btn} ${styles.btnOutline}`} onClick={() => setEditing(null)}>取消</button>
              <button className={`${styles.btn} ${styles.btnPrimary}`} onClick={handleSave}>保存</button>
            </div>
          </div>
        )}

        <div className={styles.toolbar}>
          <input className={styles.searchInput} placeholder="搜索岗位/企业/区域..." value={search} onChange={e => setSearch(e.target.value)} />
          <select className={styles.filterSelect} value={areaFilter} onChange={e => setAreaFilter(e.target.value)}>
            <option value="">全部区域</option>
            {areas.map(a => <option key={a} value={a}>{a}</option>)}
          </select>
          <select className={styles.filterSelect} value={sourceFilter} onChange={e => setSourceFilter(e.target.value)}>
            <option value="">全部来源</option>
            {sourceTypes.map(s => <option key={s} value={s}>{s}</option>)}
          </select>
          <span style={{ fontSize: "0.8125rem", color: "var(--color-text-secondary)" }}>共 {filtered.length} 条</span>
        </div>

        <div className={styles.tableWrap}>
          {filtered.length === 0 ? (
            <div className={styles.empty}>暂无岗位数据</div>
          ) : (
            <table className={styles.table}>
              <thead>
                <tr>
                  <th>ID</th><th>岗位名称</th><th>企业</th><th>薪资</th><th>区域</th><th>标签</th><th>来源</th><th>核实</th><th>状态</th><th>更新时间</th><th>操作</th>
                </tr>
              </thead>
              <tbody>
                {filtered.map(job => (
                  <tr key={job.id}>
                    <td>{job.id}</td>
                    <td>{job.title}</td>
                    <td>{job.company}</td>
                    <td style={{color:"var(--color-orange)", fontWeight:600}}>{job.salary}</td>
                    <td>{job.area}</td>
                    <td>{job.tags.map((t,i) => <span key={i} className={styles.tagBadge}>{t}</span>)}</td>
                    <td style={{fontSize:"0.75rem"}}>{job.sourceType}</td>
                    <td><span className={`${styles.verifiedBadge} ${job.verified ? styles.verifiedYes : styles.verifiedNo}`}>{job.verified ? "已核实" : "未核实"}</span></td>
                    <td><span className={job.status === "上架" ? styles.statusOn : styles.statusOff}>{job.status}</span></td>
                    <td style={{fontSize:"0.75rem"}}>{job.updateTime}</td>
                    <td><div className={styles.cellActions}>
                      <button className={`${styles.btn} ${styles.btnSm} ${styles.btnOutline}`} onClick={() => handleEdit(job)}><Pencil size={12} /></button>
                      <button className={`${styles.btn} ${styles.btnSm} ${styles.btnPrimary}`} onClick={() => handleToggle(job.id)}>{job.status === "上架" ? <ToggleLeft size={12} /> : <ToggleRight size={12} />}</button>
                      <button className={`${styles.btn} ${styles.btnSm} ${styles.btnDanger}`} onClick={() => handleDelete(job.id)}><Trash2 size={12} /></button>
                    </div></td>
                  </tr>
                ))}
              </tbody>
            </table>
          )}
        </div>
      </div>
    </div>
  )
}
