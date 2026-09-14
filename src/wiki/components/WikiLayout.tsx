import { useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useNavigate } from 'react-router-dom'
import { CATEGORY_ORDER, categoryLabel, wikiPath, WIKI_TITLE } from '../constants'
import '../wiki.css'

interface WikiLayoutProps {
  categories: string[]
  mechanicLinks: Array<{ slug: string; name: string }>
}

export default function WikiLayout({ categories, mechanicLinks }: WikiLayoutProps) {
  const navigate = useNavigate()
  const [query, setQuery] = useState('')

  const orderedCats = [
    ...CATEGORY_ORDER.filter((c) => categories.includes(c)),
    ...categories.filter((c) => !CATEGORY_ORDER.includes(c as never)),
  ]

  function onSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    navigate(`${wikiPath('search')}?q=${encodeURIComponent(q)}`)
  }

  return (
    <div className="soa-wiki">
      <div className="soa-wiki-shell">
        <aside className="soa-wiki-sidebar" aria-label="Wiki navigation">
          <Link to={wikiPath()} className="soa-wiki-brand">
            <strong>{WIKI_TITLE}</strong>
            <span>RimWorld · Arrakis conversion</span>
          </Link>

          <form className="soa-wiki-search" onSubmit={onSearch}>
            <input
              type="search"
              value={query}
              onChange={(e) => setQuery(e.target.value)}
              placeholder="Search wiki…"
              aria-label="Search wiki"
            />
            <button type="submit">Go</button>
          </form>

          <h2>Browse</h2>
          <nav className="soa-wiki-nav">
            <NavLink to={wikiPath()} end>
              Main page
            </NavLink>
            <NavLink to={wikiPath('search')}>Search</NavLink>
          </nav>

          <h2>Mechanics</h2>
          <nav className="soa-wiki-nav">
            {mechanicLinks.map((m) => (
              <NavLink key={m.slug} to={wikiPath('mechanics', m.slug)}>
                {m.name}
              </NavLink>
            ))}
          </nav>

          <h2>Categories</h2>
          <nav className="soa-wiki-nav">
            {orderedCats.map((type) => (
              <NavLink key={type} to={wikiPath('category', type)}>
                {categoryLabel(type)}
              </NavLink>
            ))}
          </nav>

          <h2>Site</h2>
          <nav className="soa-wiki-nav">
            <Link to="/projects/sands-of-arrakis">Project page</Link>
            <Link to="/">Ternary Labs</Link>
          </nav>
        </aside>

        <div className="soa-wiki-main">
          <Outlet />
        </div>
      </div>
    </div>
  )
}
