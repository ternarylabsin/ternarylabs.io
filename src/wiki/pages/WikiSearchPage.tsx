import { useEffect, useMemo, useState, type FormEvent } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import { loadIndex, searchEntities } from '../data'
import { wikiPath, WIKI_TITLE } from '../constants'
import type { WikiIndex } from '../types'
import { EntityCardGrid } from '../components/EntityCard'

export default function WikiSearchPage() {
  const [params, setParams] = useSearchParams()
  const initial = params.get('q') ?? ''
  const [query, setQuery] = useState(initial)
  const [index, setIndex] = useState<WikiIndex | null>(null)
  const [error, setError] = useState<string | null>(null)

  useEffect(() => {
    loadIndex()
      .then(setIndex)
      .catch((err: Error) => setError(err.message))
  }, [])

  useEffect(() => {
    setQuery(params.get('q') ?? '')
  }, [params])

  const results = useMemo(() => {
    if (!index) return []
    return searchEntities(index, params.get('q') ?? '')
  }, [index, params])

  function onSubmit(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    setParams(q ? { q } : {})
  }

  if (error) return <p className="soa-wiki-error">{error}</p>
  if (!index) return <p className="soa-wiki-loading">Loading…</p>

  const q = params.get('q') ?? ''

  return (
    <>
      <nav className="soa-wiki-crumb" aria-label="Breadcrumb">
        <Link to={wikiPath()}>{WIKI_TITLE}</Link>
        {' / '}
        <span>Search</span>
      </nav>

      <h1 className="soa-wiki-title">Search</h1>
      <form className="soa-wiki-search" style={{ maxWidth: 480, marginBottom: '1.5rem' }} onSubmit={onSubmit}>
        <input
          type="search"
          value={query}
          onChange={(e) => setQuery(e.target.value)}
          placeholder="Name, slug, or DefName…"
          aria-label="Search query"
        />
        <button type="submit">Search</button>
      </form>

      {q ? (
        <>
          <p className="soa-wiki-lede">
            {results.length} result{results.length === 1 ? '' : 's'} for &ldquo;{q}&rdquo;
          </p>
          <EntityCardGrid entries={results} />
        </>
      ) : (
        <p className="soa-wiki-empty">Enter a query to search public wiki entities.</p>
      )}
    </>
  )
}
