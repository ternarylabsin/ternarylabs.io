import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadIndex, loadMechanicBySlug } from '../data'
import { wikiPath, WIKI_TITLE } from '../constants'
import type { WikiIndex, WikiMechanic } from '../types'
import { DerivedStatsTable, StatsTable } from '../components/StatsTable'
import { RelationList } from '../components/RelationList'

export default function WikiMechanicPage() {
  const { slug = '' } = useParams<{ slug: string }>()
  const [index, setIndex] = useState<WikiIndex | null>(null)
  const [mechanic, setMechanic] = useState<WikiMechanic | null | undefined>(undefined)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    setMechanic(undefined)
    Promise.all([loadIndex(), loadMechanicBySlug(slug)])
      .then(([idx, mech]) => {
        setIndex(idx)
        setMechanic(mech)
      })
      .catch((err: Error) => setError(err.message))
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

  return (
    <>
      <nav className="soa-wiki-crumb" aria-label="Breadcrumb">
        <Link to={wikiPath()}>{WIKI_TITLE}</Link>
        {' / '}
        <span>Mechanics</span>
        {' / '}
        <span>{mechanic.name}</span>
      </nav>

      <h1 className="soa-wiki-title">{mechanic.name}</h1>
      <p className="soa-wiki-lede">Core gameplay system documentation from the compiled wiki dataset.</p>

      <div className="soa-wiki-body">
        {mechanic.sections.map((section) => (
          <section key={section.id}>
            <h2>{section.title}</h2>
            <p>{section.body}</p>
          </section>
        ))}

        {mechanic.stats?.raw && Object.keys(mechanic.stats.raw).length > 0 ? (
          <StatsTable title="Stats" stats={mechanic.stats.raw} />
        ) : null}
        {mechanic.stats?.derived && Object.keys(mechanic.stats.derived).length > 0 ? (
          <DerivedStatsTable title="Derived stats" stats={mechanic.stats.derived} />
        ) : null}

        {mechanic.relatedEntities?.length ? (
          <section>
            <h2>Related entities</h2>
            <RelationList ids={mechanic.relatedEntities} index={index} />
          </section>
        ) : null}

        {mechanic.notes && mechanic.notes.length > 0 ? (
          <section>
            <h2>Notes</h2>
            <ul>
              {mechanic.notes.map((n) => (
                <li key={n} style={{ color: '#94a3b8' }}>
                  {n}
                </li>
              ))}
            </ul>
          </section>
        ) : null}

        <p className="soa-wiki-meta">
          Mechanic id <code>{mechanic.id}</code>
        </p>
      </div>
    </>
  )
}
