import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  entityVisibility,
  loadEntityBySlug,
  loadIndex,
  splitParagraphs,
} from '../data'
import { categoryLabel, wikiPath, WIKI_TITLE } from '../constants'
import type { WikiEntity, WikiIndex } from '../types'
import ArticleSections from '../components/ArticleSections'
import EntityInfobox from '../components/EntityInfobox'
import FeaturedStats from '../components/FeaturedStats'
import { DerivedStatsTable, StatsTable } from '../components/StatsTable'
import { RelationList } from '../components/RelationList'

const REL_LABELS: Array<{ key: keyof WikiEntity['relationships']; label: string; kind?: 'entity' | 'mechanic' }> = [
  { key: 'relatedMechanics', label: 'Related mechanics', kind: 'mechanic' },
  { key: 'research', label: 'Research prerequisites' },
  { key: 'craftedAt', label: 'Crafted at' },
  { key: 'recipes', label: 'Recipes' },
  { key: 'usedBy', label: 'Used by' },
  { key: 'builds', label: 'Builds' },
  { key: 'drops', label: 'Drops' },
  { key: 'harvests', label: 'Harvests' },
  { key: 'spawnsIn', label: 'Spawns in' },
  { key: 'relatedEntities', label: 'Related entities' },
]

export default function WikiEntityPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [index, setIndex] = useState<WikiIndex | null>(null)
  const [entity, setEntity] = useState<WikiEntity | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setEntity(undefined)
    setError(null)
    Promise.all([loadIndex(), loadEntityBySlug(slug)])
      .then(([idx, ent]) => {
        setIndex(idx)
        setEntity(ent)
      })
      .catch((err: Error) => setError(err.message))
  }, [slug])

  if (error) return <p className="soa-wiki-error">{error}</p>
  if (entity === undefined || !index) return <p className="soa-wiki-loading">Loading…</p>
  if (!entity) {
    return (
      <>
        <h1 className="soa-wiki-title">Not found</h1>
        <p className="soa-wiki-lede">
          No wiki page for <code>{slug}</code>.{' '}
          <Link to={wikiPath()}>Return to main page</Link>
        </p>
      </>
    )
  }

  const visibility = entityVisibility(entity)

  return (
    <>
      <nav className="soa-wiki-crumb" aria-label="Breadcrumb">
        <Link to={wikiPath()}>{WIKI_TITLE}</Link>
        {' / '}
        <Link to={wikiPath('category', entity.type)}>{categoryLabel(entity.type)}</Link>
        {' / '}
        <span style={{ textTransform: 'capitalize' }}>{entity.name}</span>
      </nav>

      <div className="soa-wiki-article">
        <div className="soa-wiki-body">
          <h1 className="soa-wiki-title">{entity.name}</h1>
          {visibility !== 'public' ? (
            <div className="soa-wiki-chip-row" style={{ marginBottom: '1rem' }}>
              <span className="soa-wiki-chip">{visibility}</span>
            </div>
          ) : null}
          {entity.summary ? <p className="soa-wiki-lede">{entity.summary}</p> : null}
          <FeaturedStats stats={entity.stats} featuredStats={entity.display?.featuredStats} />

          <section>
            <h2>Description</h2>
            <div className="soa-wiki-section-copy">
              {splitParagraphs(entity.description || 'No description authored yet.').map((part) => (
                <p key={part}>{part}</p>
              ))}
            </div>
          </section>

          <ArticleSections sections={entity.sections ?? {}} display={entity.display} />

          {entity.stats.resolved && Object.keys(entity.stats.resolved).length > 0 ? (
            <StatsTable title="Stats" stats={entity.stats.resolved} />
          ) : (
            <StatsTable title="Stats" stats={entity.stats.raw ?? {}} />
          )}
          {entity.stats.derived && Object.keys(entity.stats.derived).length > 0 ? (
            <DerivedStatsTable title="Derived stats" stats={entity.stats.derived} />
          ) : null}

          {REL_LABELS.map(({ key, label, kind }) => {
            const ids = entity.relationships?.[key] ?? []
            if (!ids.length) return null
            return (
              <section key={key}>
                <h2>{label}</h2>
                <RelationList ids={ids} index={index} kind={kind ?? 'entity'} />
              </section>
            )
          })}

          {entity.notes && entity.notes.length > 0 ? (
            <section>
              <h2>Notes</h2>
              <ul>
                {entity.notes.map((n) => (
                  <li key={n} style={{ color: '#94a3b8' }}>
                    {n}
                  </li>
                ))}
              </ul>
            </section>
          ) : null}

          {entity.source?.defs && entity.source.defs.length > 0 ? (
            <section>
              <h2>Source</h2>
              <div className="soa-wiki-table-wrap">
                <table className="soa-wiki-table">
                  <thead>
                    <tr>
                      <th>Kind</th>
                      <th>Path</th>
                    </tr>
                  </thead>
                  <tbody>
                    {entity.source.defs.map((d) => (
                      <tr key={`${d.kind}-${d.path}`}>
                        <td>{d.kind ?? 'Def'}</td>
                        <td style={{ fontFamily: 'ui-monospace, monospace', fontSize: '0.8rem' }}>
                          {d.path}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            </section>
          ) : null}

          <p className="soa-wiki-meta">
            DefName <code>{entity.id}</code>
            {entity.warnings?.length ? ` · ${entity.warnings.length} extractor warning(s)` : ''}
          </p>
        </div>

        <EntityInfobox entity={entity} index={index} />
      </div>
    </>
  )
}
