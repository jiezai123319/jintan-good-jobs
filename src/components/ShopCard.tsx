import { User, MapPin, Clock, BadgeCheck, Medal, Star } from 'lucide-react'
import { ShopItem } from '../types'
import styles from './ShopCard.module.css'

interface ShopCardProps {
  shops: ShopItem[]
}

export default function ShopCard({ shops }: ShopCardProps) {
  if (shops.length === 0) return <div className={styles.empty}>暂无匹配小吃店，换个筛选试试</div>

  return (
    <div className={styles.grid}>
      {shops.map((shop) => (
        <div className={styles.card} key={shop.id}>
          <div className={styles.cardTop}>
            <div>
              <h3 className={styles.shopName}>{shop.name}</h3>
              {shop.rank && <span className={styles.rankBadge}><Star size={12} /> TOP {shop.rank}</span>}
            </div>
            <span className={styles.avgPrice}>人均{shop.avgPrice}</span>
          </div>
          <div className={styles.meta}><MapPin size={14} /> {shop.address} · {shop.hours}</div>
          <div className={styles.signature}>招牌: {shop.signatureDish}</div>
          <div className={styles.tags}>{shop.tags.map(t => <span className={styles.tag} key={t}>{t}</span>)}</div>
          {shop.verified !== undefined && <span className={`${styles.verifyBadge} ${shop.verified ? styles.verifyYes : styles.verifyNo}`}><BadgeCheck size={12} /> {shop.verified ? '已核实' : '暂未核实'}</span>}
          <p className={styles.reason}>{shop.reason}</p>
        </div>
      ))}
    </div>
  )
}
