import { useEffect, useMemo, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import {
  listEntitiesByType,
  listMechanics,
  listPublicEntities,
  loadIndex,
  loadManifest,
  typesWithPublicContent,
} from '../data'
import { categoryLabel, wikiPath, WIKI_MOD_BANNER, WIKI_TITLE } from '../constants'
import type { WikiIndex, WikiManifest } from '../types'
import { EntityCardGrid } from '../components/EntityCard'

export default function WikiHomePage() {
  const [index, setIndex] = useState<WikiIndex | null>(null)
  const [manifest, setManifest] = useState<WikiManifest | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    Promise.all([loadIndex(), loadManifest()])
      .then(([idx, man]) => {
        setIndex(idx)
        setManifest(man)
      })
      .catch((err: Error) => setError(err.message))
  }, [])

  const categories = useMemo(() => (index ? typesWithPublicContent(index) : []), [index])
  const mechanics = useMemo(() => (index ? listMechanics(index) : []), [index])
  const featured = useMemo(() => {
    if (!index) return []
    const prefer = [
      'stillsuit',
      'reclaimed-planting-bed',
      'pundi-rice',
      'raw-spice',
      'windtrap',
      'crysknife',
    ]
    const publicEntities = listPublicEntities(index)
    const picked = prefer
      .map((slug) => publicEntities.find((e) => e.slug === slug))
      .filter(Boolean) as ReturnType<typeof listPublicEntities>
    if (picked.length >= 4) return picked.slice(0, 6)
    return publicEntities.slice(0, 6)
  }, [index])

  if (error) return <p className="soa-wiki-error">{error}</p>
  if (!index || !manifest) return <p className="soa-wiki-loading">Loading wiki data…</p>

  return (
    <>
      <nav className="soa-wiki-crumb" aria-label="Breadcrumb">
        <Link to="/">Home</Link>
        {' / '}
        <span>{WIKI_TITLE}</span>
      </nav>

      <div className="soa-wiki-home-hero">
        <img
          className="soa-wiki-home-banner"
          src={WIKI_MOD_BANNER}
          alt="Sands of Arrakis — a RimWorld conversion. A Fremen survivor stands before a sandworm on Arrakis."
          width={1672}
          height={941}
        />
        <div className="soa-wiki-home-hero-copy">
          <h1 className="soa-wiki-title" style={{ marginBottom: 0 }}>
            {WIKI_TITLE}
          </h1>
          <p>
            Compiled reference for the Sands of Arrakis RimWorld conversion — entities, stats, and
            core mechanics sourced from the mod&apos;s validated wiki data layer.
          </p>
          <div className="soa-wiki-stat-strip">
            <div>
              <strong>{manifest.counts.publicEntities}</strong>
              <span>Public pages</span>
            </div>
            <div>
              <strong>{manifest.counts.mechanics}</strong>
              <span>Mechanics</span>
            </div>
            <div>
              <strong>{manifest.rimworld.supportedVersion}</strong>
              <span>RimWorld</span>
            </div>
            <div>
              <strong>{manifest.repository.commit.slice(0, 7)}</strong>
              <span>Data commit</span>
            </div>
          </div>
        </div>
      </div>

      <section className="soa-wiki-cat-block">
        <h2>Core mechanics</h2>
        <div className="soa-wiki-chip-row">
          {mechanics.map((m) => (
            <Link key={m.id} className="soa-wiki-chip" to={wikiPath('mechanics', m.slug)}>
              {m.name}
            </Link>
          ))}
        </div>
      </section>

      <section className="soa-wiki-cat-block">
        <h2>Featured</h2>
        <EntityCardGrid entries={featured} />
      </section>

      <section className="soa-wiki-cat-block">
        <h2>Categories</h2>
        <div className="soa-wiki-table-wrap">
          <table className="soa-wiki-table">
            <thead>
              <tr>
                <th>Category</th>
                <th>Entries</th>
              </tr>
            </thead>
            <tbody>
              {categories.map((type) => {
                const count = listEntitiesByType(index, type).length
                return (
                  <tr key={type}>
                    <td>
                      <Link to={wikiPath('category', type)}>{categoryLabel(type)}</Link>
                    </td>
                    <td>{count}</td>
                  </tr>
                )
              })}
            </tbody>
          </table>
        </div>
      </section>

      <p className="soa-wiki-meta">
        Data generated {new Date(manifest.generatedAtUtc).toLocaleString()} · schema{' '}
        {manifest.schemaVersion} · {manifest.generator.name} {manifest.generator.version}
      </p>
    </>
  )
}

export function WikiCategoryPage() {
  const { type = '' } = useParams<{ type: string }>()
  const [index, setIndex] = useState<WikiIndex | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadIndex()
      .then(setIndex)
      .catch((err: Error) => setError(err.message))
  }, [])

  if (error) return <p className="soa-wiki-error">{error}</p>
  if (!index) return <p className="soa-wiki-loading">Loading…</p>

  const entries = listEntitiesByType(index, type)

  return (
    <>
      <nav className="soa-wiki-crumb" aria-label="Breadcrumb">
        <Link to={wikiPath()}>{WIKI_TITLE}</Link>
        {' / '}
        <span>{categoryLabel(type)}</span>
      </nav>
      <h1 className="soa-wiki-title">{categoryLabel(type)}</h1>
      <p className="soa-wiki-lede">
        {entries.length} public {entries.length === 1 ? 'entry' : 'entries'} in this category.
      </p>
      <EntityCardGrid entries={entries} />
    </>
  )
}
