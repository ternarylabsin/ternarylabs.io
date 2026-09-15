import { Link } from 'react-router-dom'
import type { WikiEntity, WikiIndex } from '../types'
import {
  formatStatKey,
  formatStatValue,
  resolveEntitySlug,
  resolveMechanicSlug,
  textureUrl,
} from '../data'
import { categoryLabel, wikiPath, WIKI_NAV_BREAK_QUERY } from '../constants'
import { useMediaQuery } from '../hooks'

const INFOBOX_STAT_KEYS = [
  'MarketValue',
  'Mass',
  'MaxHitPoints',
  'Flammability',
  'ArmorRating_Sharp',
  'ArmorRating_Blunt',
  'ArmorRating_Heat',
  'Insulation_Heat',
  'Insulation_Cold',
  'WorkToMake',
  'WorkToBuild',
]

export function pickInfoboxStats(entity: WikiEntity): Array<[string, unknown]> {
  const resolved = entity.stats?.resolved ?? {}
  const raw = entity.stats?.raw ?? {}
  const featured = entity.display?.featuredStats ?? []
  const rows: Array<[string, unknown]> = []
  const seen = new Set<string>()

  for (const key of [...featured, ...INFOBOX_STAT_KEYS]) {
    if (seen.has(key) || key === 'equippedStatOffsets') continue
    const val = resolved[key] ?? raw[key]
    if (val === null || val === undefined) continue
    seen.add(key)
    rows.push([key, val])
  }

  const offsets = resolved.equippedStatOffsets ?? raw.equippedStatOffsets
  if (offsets && typeof offsets === 'object') {
    for (const [k, v] of Object.entries(offsets as Record<string, unknown>)) {
      rows.push([k, v])
    }
  }

  return rows.slice(0, 12)
}

function InfoboxTable({
  entity,
  index,
  rows,
}: {
  entity: WikiEntity
  index: WikiIndex
  rows: Array<[string, unknown]>
}) {
  const research = entity.relationships?.research ?? []
  const mechanics = entity.relationships?.relatedMechanics ?? []

  return (
    <table>
      <tbody>
        <tr>
          <th>Type</th>
          <td>
            <Link to={wikiPath('category', entity.type)}>{categoryLabel(entity.type)}</Link>
          </td>
        </tr>
        {entity.subtype ? (
          <tr>
            <th>Subtype</th>
            <td style={{ textTransform: 'capitalize' }}>{entity.subtype}</td>
          </tr>
        ) : null}
        <tr>
          <th>DefName</th>
          <td className="soa-wiki-break">{entity.id}</td>
        </tr>
        {entity.availability.playerCraftable != null ? (
          <tr>
            <th>Craftable</th>
            <td>{entity.availability.playerCraftable ? 'Yes' : 'No'}</td>
          </tr>
        ) : null}
        {entity.availability.playerBuildable != null ? (
          <tr>
            <th>Buildable</th>
            <td>{entity.availability.playerBuildable ? 'Yes' : 'No'}</td>
          </tr>
        ) : null}
        {entity.availability.tradeable != null ? (
          <tr>
            <th>Tradeable</th>
            <td>{entity.availability.tradeable ? 'Yes' : 'No'}</td>
          </tr>
        ) : null}
        {rows.map(([key, value]) => (
          <tr key={key}>
            <th>{formatStatKey(key)}</th>
            <td>{formatStatValue(value, key)}</td>
          </tr>
        ))}
        {research.length > 0 ? (
          <tr>
            <th>Research</th>
            <td>
              {research.map((id, i) => {
                const slug = resolveEntitySlug(index, id)
                return (
                  <span key={id}>
                    {i > 0 ? ', ' : ''}
                    {slug ? <Link to={wikiPath(slug)}>{index.entities[id]?.name ?? id}</Link> : id}
                  </span>
                )
              })}
            </td>
          </tr>
        ) : null}
        {mechanics.length > 0 ? (
          <tr>
            <th>Mechanics</th>
            <td>
              {mechanics.map((id, i) => {
                const slug = resolveMechanicSlug(index, id)
                const name = index.mechanics[id]?.name ?? id
                return (
                  <span key={id}>
                    {i > 0 ? ', ' : ''}
                    {slug ? <Link to={wikiPath('mechanics', slug)}>{name}</Link> : name}
                  </span>
                )
              })}
            </td>
          </tr>
        ) : null}
      </tbody>
    </table>
  )
}

export default function EntityInfobox({
  entity,
  index,
}: {
  entity: WikiEntity
  index: WikiIndex
}) {
  const compact = useMediaQuery(WIKI_NAV_BREAK_QUERY)
  const img = textureUrl(entity.assets?.primary?.repoPath)
  const rows = pickInfoboxStats(entity)
  const preview = rows.slice(0, 4)

  const art = (
    <div className="soa-wiki-infobox-art">
      {img ? (
        <img
          src={img}
          alt=""
          width={entity.assets.primary?.width ?? 64}
          height={entity.assets.primary?.height ?? 64}
        />
      ) : (
        <span style={{ color: '#64748b', fontSize: '0.8rem' }}>No icon</span>
      )}
    </div>
  )

  if (compact) {
    return (
      <details className="soa-wiki-infobox soa-wiki-quick-stats">
        <summary className="soa-wiki-quick-stats-summary">
          <span className="soa-wiki-quick-stats-kicker">Quick stats</span>
          <strong>
            {categoryLabel(entity.type)}
            {entity.subtype ? ` · ${entity.subtype}` : ''}
          </strong>
          {preview.length ? (
            <span className="soa-wiki-quick-stats-preview">
              {preview.map(([key, value]) => `${formatStatKey(key)} ${formatStatValue(value, key)}`).join(' · ')}
            </span>
          ) : null}
        </summary>
        {art}
        <InfoboxTable entity={entity} index={index} rows={rows} />
      </details>
    )
  }

  return (
    <aside className="soa-wiki-infobox" aria-label={`${entity.name} infobox`}>
      <div className="soa-wiki-infobox-title">{entity.name}</div>
      {art}
      <InfoboxTable entity={entity} index={index} rows={rows} />
    </aside>
  )
}
