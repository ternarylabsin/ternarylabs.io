import { formatStatKey, formatStatValue } from '../data'
import type { WikiDerivedStat } from '../types'
import { WIKI_PHONE_QUERY } from '../constants'
import { useMediaQuery } from '../hooks'
import DisclosureSection from './DisclosureSection'

function sourceLabel(value: unknown): string | null {
  if (!value || typeof value !== 'object' || Array.isArray(value) || !('source' in value)) {
    return null
  }
  const source = (value as { source?: unknown }).source
  if (!source) return null
  if (typeof source === 'string') return source
  if (typeof source !== 'object' || Array.isArray(source)) return null

  const typed = source as Record<string, unknown>
  switch (typed.type) {
    case 'SoADef':
      return typed.def ? `SoA def: ${typed.def}` : 'SoA def'
    case 'SoAParent':
      return typed.parent ? `SoA parent: ${typed.parent}` : 'SoA parent'
    case 'CoreParent':
      return typed.parent ? `Core parent: ${typed.parent}` : 'Core parent'
    case 'CoreStatDefault':
      return typed.stat ? `Core default: ${typed.stat}` : 'Core default'
    case 'ThingDefDefault':
      return typed.field ? `ThingDef default: ${typed.field}` : 'ThingDef default'
    default:
      return String(typed.type ?? 'Source')
  }
}

export function StatsTable({
  title,
  stats,
}: {
  title: string
  stats: Record<string, unknown>
}) {
  const phone = useMediaQuery(WIKI_PHONE_QUERY)
  const entries = Object.entries(stats).filter(([, v]) => v !== null && v !== undefined)
  if (entries.length === 0) return null
  const showSource = entries.some(([, value]) => sourceLabel(value))

  return (
    <DisclosureSection title={title} defaultOpen={!phone}>
      <div className="soa-wiki-table-wrap">
        <table className="soa-wiki-table soa-wiki-stats-table">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
              {showSource && !phone ? <th>Source</th> : null}
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key}>
                <td>{formatStatKey(key)}</td>
                <td>
                  <div>{formatStatValue(value, key)}</div>
                  {showSource && phone && sourceLabel(value) ? (
                    <div className="soa-wiki-stat-detail">{sourceLabel(value)}</div>
                  ) : null}
                </td>
                {showSource && !phone ? <td className="soa-wiki-break">{sourceLabel(value) ?? '-'}</td> : null}
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </DisclosureSection>
  )
}

export function DerivedStatsTable({
  title,
  stats,
}: {
  title: string
  stats: Record<string, WikiDerivedStat | unknown>
}) {
  const phone = useMediaQuery(WIKI_PHONE_QUERY)
  const entries = Object.entries(stats)
  if (entries.length === 0) return null

  return (
    <DisclosureSection title={title} defaultOpen={false}>
      <div className="soa-wiki-table-wrap">
        <table className="soa-wiki-table soa-wiki-stats-table">
          <thead>
            <tr>
              <th>Stat</th>
              <th>Value</th>
              {!phone ? <th>Formula</th> : null}
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, raw]) => {
              const derived =
                raw && typeof raw === 'object' && ('formula' in (raw as object) || 'value' in (raw as object))
                  ? (raw as WikiDerivedStat)
                  : null
              const formula = derived?.formula ?? '—'
              return (
                <tr key={key}>
                  <td>{formatStatKey(key)}</td>
                  <td>
                    <div>
                      {derived?.value !== undefined
                        ? formatStatValue(derived.value, key)
                        : derived
                          ? formatStatValue(derived.inputs, key)
                          : formatStatValue(raw, key)}
                    </div>
                    {phone ? <div className="soa-wiki-stat-detail">{formula}</div> : null}
                  </td>
                  {!phone ? <td className="soa-wiki-break soa-wiki-stat-detail">{formula}</td> : null}
                </tr>
              )
            })}
          </tbody>
        </table>
      </div>
    </DisclosureSection>
  )
}
