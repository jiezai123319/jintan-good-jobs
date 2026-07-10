import { useState, useRef, useEffect } from 'react'
import { MapPin, Clock, Star, BadgeCheck, ChevronRight, UtensilsCrossed } from 'lucide-react'
import Header from './components/Header'
import Hero from './components/Hero'
import Stats from './components/Stats'
import ShopCard from './components/ShopCard'
import MerchantForm from './components/MerchantForm'
import ComplianceNotice from './components/ComplianceNotice'
import Footer from './components/Footer'
import AdminPanel from './components/AdminPanel'
import { getAdminShops } from './services/submission'
import { shopCategories } from './data/shops'
import { ShopItem } from './types'

export default function App() {
  const [hash, setHash] = useState(window.location.hash)
  const [shops, setShops] = useState<ShopItem[]>([])
  const [activeCategory, setActiveCategory] = useState('全部')
  const [searchQuery, setSearchQuery] = useState('')
  const listRef = useRef<HTMLDivElement>(null)
  const merchantRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    const handler = () => setHash(window.location.hash)
    window.addEventListener('hashchange', handler)
    setShops(getAdminShops().filter(s => s.status === '上架'))
    return () => window.removeEventListener('hashchange', handler)
  }, [])
  useEffect(() => { setShops(getAdminShops().filter(s => s.status === '上架')) }, [hash])

  const top10 = shops.filter(s => s.rank !== undefined).sort((a, b) => (a.rank || 999) - (b.rank || 999)).slice(0, 10)
  const todayRec = top10[0]

  const filteredShops = shops.filter(s => {
    const catMatch = activeCategory === '全部' || s.category === activeCategory
    const searchMatch = !searchQuery.trim() || s.name.includes(searchQuery.trim()) || s.address.includes(searchQuery.trim()) || s.signatureDish.includes(searchQuery.trim())
    return catMatch && searchMatch
  })

  const displayShops = searchQuery ? filteredShops : (activeCategory === '全部' ? shops : filteredShops)

  if (hash === '#/admin') return <AdminPanel onBack={() => { window.location.hash = '' }} />

  return (
    <>
      <Header onListClick={() => listRef.current?.scrollIntoView({ behavior: 'smooth' })} onMerchantClick={() => merchantRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <Hero onSearch={setSearchQuery} onListClick={() => listRef.current?.scrollIntoView({ behavior: 'smooth' })} onMerchantClick={() => merchantRef.current?.scrollIntoView({ behavior: 'smooth' })} />
      <Stats />

      {/* Today Recommendation */}
      {todayRec && (
        <div className="section" style={{background:'var(--color-white)',borderBottom:'1px solid var(--color-border)'}}>
          <div className="container">
            <h2 className="section-title"><Star size={20} style={{color:'var(--color-orange)'}} /> 今日推荐</h2>
            <div style={{background:'linear-gradient(135deg,#fff7ed,#fffbeb)',border:'1px solid #fed7aa',borderRadius:'var(--radius)',padding:'1rem',display:'flex',justifyContent:'space-between',alignItems:'flex-start',gap:'1rem',flexWrap:'wrap'}}>
              <div>
                <div style={{display:'flex',alignItems:'center',gap:'0.5rem',marginBottom:'0.25rem'}}>
                  <span style={{background:'var(--color-orange)',color:'white',fontSize:'0.75rem',fontWeight:700,padding:'0.125rem 0.5rem',borderRadius:'999px'}}>TOP 1</span>
                  <h3 style={{fontSize:'1.125rem',fontWeight:700,color:'var(--color-blue)'}}>{todayRec.name}</h3>
                </div>
                <div style={{fontSize:'0.8125rem',color:'var(--color-text-secondary)',marginBottom:'0.25rem'}}>
                  <MapPin size={14} style={{display:'inline'}} /> {todayRec.address} &middot; {todayRec.hours}
                </div>
                <div style={{fontSize:'0.875rem',color:'var(--color-orange)',fontWeight:600}}>人均 {todayRec.avgPrice}</div>
                <div style={{fontSize:'0.875rem',fontWeight:600,marginTop:'0.25rem'}}>招牌：{todayRec.signatureDish}</div>
                <p style={{fontSize:'0.8125rem',color:'var(--color-text-secondary)',marginTop:'0.25rem',maxWidth:'500px'}}>{todayRec.reason}</p>
              </div>
              <div style={{display:'flex',flexDirection:'column',alignItems:'center',gap:'0.375rem',flexShrink:0}}>
                {todayRec.verified && <span style={{display:'inline-flex',alignItems:'center',gap:'0.25rem',fontSize:'0.75rem',background:'#ecfdf5',color:'var(--color-success)',padding:'0.25rem 0.625rem',borderRadius:'999px',fontWeight:600}}><BadgeCheck size={14} /> 已核实</span>}
                <div style={{display:'flex',gap:'0.375rem'}}>
                  {todayRec.tags.slice(0,3).map(t => <span key={t} style={{fontSize:'0.75rem',padding:'0.125rem 0.5rem',borderRadius:'4px',background:'#fef3c7',color:'#92400e'}}>{t}</span>)}
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Top 10 */}
      {top10.length > 0 && (
        <div className="section" style={{background:'var(--color-white)',borderBottom:'1px solid var(--color-border)'}}>
          <div className="container">
            <h2 className="section-title"><UtensilsCrossed size={20} /> 金坛必吃 Top 10</h2>
            <div style={{display:'grid',gridTemplateColumns:'repeat(auto-fill,minmax(300px,1fr))',gap:'0.625rem'}}>
              {top10.map((shop, i) => (
                <div key={shop.id} style={{display:'flex',alignItems:'center',gap:'0.75rem',padding:'0.625rem 0.75rem',background:'var(--color-bg)',borderRadius:'var(--radius)',border:'1px solid var(--color-border)'}}>
                  <div style={{width:'32px',height:'32px',borderRadius:'50%',background:i < 3 ? 'var(--color-orange)' : 'var(--color-border)',color:i < 3 ? 'white' : 'var(--color-text-secondary)',display:'flex',alignItems:'center',justifyContent:'center',fontSize:'0.875rem',fontWeight:800,flexShrink:0}}>{i + 1}</div>
                  <div style={{flex:1,minWidth:0}}>
                    <div style={{fontSize:'0.9375rem',fontWeight:700,color:'var(--color-blue)'}}>{shop.name}</div>
                    <div style={{fontSize:'0.75rem',color:'var(--color-text-secondary)'}}>{shop.address} &middot; 人均{shop.avgPrice}</div>
                  </div>
                  <div style={{fontSize:'0.8125rem',color:'var(--color-orange)',fontWeight:600,whiteSpace:'nowrap',flexShrink:0}}>{shop.signatureDish.slice(0,8)}</div>
                </div>
              ))}
            </div>
          </div>
        </div>
      )}

      {/* Category tabs + Shop grid */}
      <div className="section" ref={listRef} id="shop-list">
        <div className="container">
          <h2 className="section-title">美食分类</h2>
          <div style={{display:'flex',flexWrap:'wrap',gap:'0.5rem',marginBottom:'1.25rem'}}>
            {shopCategories.map(cat => (
              <button key={cat} onClick={() => setActiveCategory(cat)}
                style={{padding:'0.375rem 0.875rem',borderRadius:'999px',fontSize:'0.8125rem',fontWeight:500,border:'1.5px solid var(--color-border)',background:activeCategory === cat ? 'var(--color-primary)' : 'var(--color-white)',color:activeCategory === cat ? 'white' : 'var(--color-text-secondary)',cursor:'pointer',transition:'all 0.2s'}}>
                {cat}
              </button>
            ))}
          </div>
          <ShopCard shops={displayShops} />
        </div>
      </div>

      <div ref={merchantRef}><MerchantForm /></div>
      <ComplianceNotice />
      <Footer />
    </>
  )
}
