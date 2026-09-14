import { formatStatKey, formatStatValue, pickStatValue } from '../data'

export default function FeaturedStats({
  stats,
  featuredStats,
}: {
  stats: {
    raw?: Record<string, unknown>
    resolved?: Record<string, unknown>
    derived?: Record<string, unknown>
  }
  featuredStats?: string[]
}) {
  const keys = (featuredStats ?? []).filter(Boolean)
  if (!keys.length) return null

  const rows = keys
    .map((key) => ({ key, value: pickStatValue(stats, key) }))
    .filter(({ value }) => value !== null && value !== undefined)
    .slice(0, 6)

  if (!rows.length) return null

  return (
    <div className="soa-wiki-featured-stats" aria-label="Featured stats">
      {rows.map(({ key, value }) => (
        <div key={key} className="soa-wiki-featured-stat">
          <strong>{formatStatValue(value, key)}</strong>
          <span>{formatStatKey(key)}</span>
        </div>
      ))}
    </div>
  )
}
