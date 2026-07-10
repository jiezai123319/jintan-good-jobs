import styles from './JobFilters.module.css'

interface JobFiltersProps {
  tags: string[]
  activeTag: string
  onSelect: (tag: string) => void
}

export default function JobFilters({ tags, activeTag, onSelect }: JobFiltersProps) {
  return (
    <div className={styles.filters}>
      {tags.map((tag) => (
        <button
          key={tag}
          className={`${styles.filterTag} ${activeTag === tag ? styles.active : ''}`}
          onClick={() => onSelect(tag)}
        >
          {tag}
        </button>
      ))}
    </div>
  )
}
