import { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { loadIndex, loadMechanicBySlug, textureUrl } from '../data'
import { wikiPath, WIKI_TITLE } from '../constants'
import type { WikiIndex, WikiMechanic } from '../types'
import ArticleSections from '../components/ArticleSections'
import FeaturedStats from '../components/FeaturedStats'
import DisclosureSection from '../components/DisclosureSection'
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

  const heroAsset = textureUrl(mechanic.display?.heroAssetRepoPath)

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
      <p className="soa-wiki-lede">
        {mechanic.summary || 'Core gameplay system documentation from the compiled wiki dataset.'}
      </p>
      <FeaturedStats stats={mechanic.stats ?? {}} featuredStats={mechanic.display?.featuredStats} />

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

        <DisclosureSection title="Technical details" defaultOpen={false}>
          <p className="soa-wiki-meta" style={{ marginTop: 0, paddingTop: 0, borderTop: 'none' }}>
            Mechanic id <code className="soa-wiki-break">{mechanic.id}</code>
          </p>
          {mechanic.source?.code && mechanic.source.code.length > 0 ? (
            <div className="soa-wiki-table-wrap">
              <table className="soa-wiki-table">
                <thead>
                  <tr>
                    <th>Code</th>
                    <th>Purpose</th>
                  </tr>
                </thead>
                <tbody>
                  {mechanic.source.code.map((item) => (
                    <tr key={item.path}>
                      <td className="soa-wiki-break">{item.path}</td>
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
