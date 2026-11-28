import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadIndex, loadMechanicBySlug, textureUrl } from '../data'
import { wikiPath, WIKI_TITLE } from '../constants'
import type { WikiIndex, WikiMechanic } from '../types'
import ArticleSections from '../components/ArticleSections'
import DisclosureSection from '../components/DisclosureSection'
import { DerivedStatsTable, StatsTable } from '../components/StatsTable'
import { RelationList } from '../components/RelationList'
import { splitArticleNotes } from '../articleNotes'

// The compiled guides carry both bare source paths and annotated source records.
function sourceReference(value: unknown) {
  if (typeof value === 'string') return { path: value, purpose: '—' }
  if (value && typeof value === 'object' && 'path' in value && typeof value.path === 'string') {
    return { path: value.path, purpose: 'purpose' in value ? String(value.purpose ?? '—') : '—' }
  }
  return null
}

export default function WikiMechanicPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [index, setIndex] = useState<WikiIndex | null>(null)
  const [mechanic, setMechanic] = useState<WikiMechanic | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    let active = true
    setMechanic(undefined)
    setError(null)
    Promise.all([loadIndex(), loadMechanicBySlug(slug)])
      .then(([idx, mech]) => {
        if (!active) return
        setIndex(idx)
        setMechanic(mech)
      })
      .catch((err: Error) => { if (active) setError(err.message) })
    return () => { active = false }
  }, [slug])

  if (error) return <p className="soa-wiki-error">{error}</p>
  if (mechanic === undefined || !index) return <p className="soa-wiki-loading">Loading…</p>
  if (!mechanic) {
    return (
      <>
        <h1 className="soa-wiki-title">Not found</h1>
        <p className="soa-wiki-lede">
          No mechanic page for <code>{slug}</code>.{' '}
          <Link to={wikiPath()}>Return to main page</Link>
        </p>
      </>
    )
  }

  const heroAsset = textureUrl(mechanic.display?.heroAssetRepoPath)
  const notes = splitArticleNotes(mechanic.notes)
  const sources = Object.entries(mechanic.source ?? {}).flatMap(([kind, entries]) =>
    Array.isArray(entries) ? entries.flatMap((entry) => {
      const ref = sourceReference(entry)
      return ref ? [{ ...ref, kind }] : []
    }) : [],
  )

  return (
    <>
      <nav className="soa-wiki-crumb" aria-label="Breadcrumb">
        <Link to={wikiPath()}>{WIKI_TITLE}</Link>
        {' / '}
        <span>Life on Arrakis</span>
        {' / '}
        <span>{mechanic.name}</span>
      </nav>

      <h1 className="soa-wiki-title">{mechanic.name}</h1>
      <p className="soa-wiki-lede">
        {mechanic.summary || 'Life and work in the settlements of Arrakis.'}
      </p>

      {heroAsset ? (
        <div className="soa-wiki-mechanic-hero">
          <img
            src={heroAsset}
            alt={mechanic.display?.heroAssetAlt || `${mechanic.name} artwork`}
          />
        </div>
      ) : null}

      <div className="soa-wiki-body">
        <ArticleSections sections={mechanic.sections} display={mechanic.display} />

        {mechanic.stats?.raw && Object.keys(mechanic.stats.raw).length > 0 ? (
          <StatsTable title="Detailed values" stats={mechanic.stats.raw} defaultOpen={false} />
        ) : null}
        {mechanic.stats?.derived && Object.keys(mechanic.stats.derived).length > 0 ? (
          <DerivedStatsTable title="Derived stats" stats={mechanic.stats.derived} />
        ) : null}

        {mechanic.relatedEntities?.length ? (
          <section>
            <h2>Related pages</h2>
            <RelationList ids={mechanic.relatedEntities} index={index} />
          </section>
        ) : null}

        {notes.gameplay.length > 0 ? (
          <section>
            <h2>Notes</h2>
            <ul>
              {notes.gameplay.map((n) => (
                <li key={n} style={{ color: '#94a3b8' }}>
                  {n}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <DisclosureSection title="Data notes and sources" defaultOpen={false}>
          <p className="soa-wiki-meta" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
            Mechanic id <code className="soa-wiki-break">{mechanic.id}</code>
          </p>
          {notes.sources.length > 0 ? <ul>{notes.sources.map((note) => <li key={note}>{note}</li>)}</ul> : null}
          {sources.length > 0 ? (
            <div className="soa-wiki-table-wrap">
              <table className="soa-wiki-table">
                <thead>
                  <tr>
                    <th>Source</th>
                    <th>Kind</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {sources.map((item) => (
                    <tr key={`${item.kind}/${item.path}`}>
                      <td className="soa-wiki-break">{item.path}</td>
                      <td>{item.kind}</td>
                      <td>{item.purpose ?? '—'}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          ) : null}
        </DisclosureSection>
      </div>
    </>
  )
}
