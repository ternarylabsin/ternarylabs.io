import { formatStatKey, formatStatValue } from '../data'
import type { WikiDerivedStat } from '../types'

export function StatsTable({
  title,
  stats,
}: {
  title: string
  stats: Record<string, unknown>
}) {
  const entries = Object.entries(stats).filter(([, v]) => v !== null && v !== undefined)
  if (entries.length === 0) return null

  return (
    <section>
      <h2>{title}</h2>
      <div className="soa-wiki-table-wrap">
        <table className="soa-wiki-table">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key}>
                <td>{formatStatKey(key)}</td>
                <td>{formatStatValue(value, key)}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}

export function DerivedStatsTable({
  title,
  stats,
}: {
  title: string
  stats: Record<string, WikiDerivedStat | unknown>
}) {
  const entries = Object.entries(stats)
  if (entries.length === 0) return null

  return (
    <section>
      <h2>{title}</h2>
      <div className="soa-wiki-table-wrap">
        <table className="soa-wiki-table">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
              <th>Formula</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, raw]) => {
              const derived =
                raw && typeof raw === 'object' && ('formula' in (raw as object) || 'value' in (raw as object))
                  ? (raw as WikiDerivedStat)
                  : null
              return (
                <tr key={key}>
                  <td>{formatStatKey(key)}</td>
                  <td>
                    {derived?.value !== undefined
                      ? formatStatValue(derived.value, key)
                      : derived
                        ? formatStatValue(derived.inputs, key)
                        : formatStatValue(raw, key)}
                  </td>
                  <td style={{ color: '#94a3b8', fontSize: '0.85rem' }}>
                    {derived?.formula ?? '—'}
                  </td>
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </section>
  )
}
