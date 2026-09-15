import { useEffect, useId, useRef, useState, type FormEvent } from 'react'
import { Link, NavLink, Outlet, useLocation, useNavigate } from 'react-router-dom'
import {
  CATEGORY_ORDER,
  categoryLabel,
  wikiPath,
  WIKI_MOD_ICON,
  WIKI_TITLE,
} from '../constants'
import '../wiki.css'

interface WikiLayoutProps {
  categories: string[]
  mechanicLinks: Array<{ slug: string; name: string }>
}

function WikiNav({
  orderedCats,
  mechanicLinks,
  onNavigate,
}: {
  orderedCats: string[]
  mechanicLinks: Array<{ slug: string; name: string }>
  onNavigate?: () => void
}) {
  return (
    <>
      <h2>Browse</h2>
      <nav className="soa-wiki-nav">
        <NavLink to={wikiPath()} end onClick={onNavigate}>
          Main page
        </NavLink>
        <NavLink to={wikiPath('search')} onClick={onNavigate}>
          Search
        </NavLink>
      </nav>

      <h2>Mechanics</h2>
      <nav className="soa-wiki-nav">
        {mechanicLinks.map((m) => (
          <NavLink key={m.slug} to={wikiPath('mechanics', m.slug)} onClick={onNavigate}>
            {m.name}
          </NavLink>
        ))}
      </nav>

      <h2>Categories</h2>
      <nav className="soa-wiki-nav">
        {orderedCats.map((type) => (
          <NavLink key={type} to={wikiPath('category', type)} onClick={onNavigate}>
            {categoryLabel(type)}
          </NavLink>
        ))}
      </nav>

      <h2>Site</h2>
      <nav className="soa-wiki-nav">
        <Link to="/projects/sands-of-arrakis" onClick={onNavigate}>
          Project page
        </Link>
        <Link to="/" onClick={onNavigate}>
          Ternary Labs
        </Link>
      </nav>
    </>
  )
}

export default function WikiLayout({ categories, mechanicLinks }: WikiLayoutProps) {
  const navigate = useNavigate()
  const location = useLocation()
  const [query, setQuery] = useState('')
  const [menuOpen, setMenuOpen] = useState(false)
  const browseButtonRef = useRef<HTMLButtonElement>(null)
  const drawerRef = useRef<HTMLDivElement>(null)
  const drawerTitleId = useId()

  const orderedCats = [
    ...CATEGORY_ORDER.filter((c) => categories.includes(c)),
    ...categories.filter((c) => !CATEGORY_ORDER.includes(c as never)),
  ]

  function onSearch(e: FormEvent) {
    e.preventDefault()
    const q = query.trim()
    if (!q) return
    setMenuOpen(false)
    navigate(`${wikiPath('search')}?q=${encodeURIComponent(q)}`)
  }

  useEffect(() => {
    setMenuOpen(false)
  }, [location.pathname, location.search])

  useEffect(() => {
    if (!menuOpen) return

    const previousOverflow = document.body.style.overflow
    document.body.style.overflow = 'hidden'

    const firstFocusable = drawerRef.current?.querySelector<HTMLElement>(
      'button, a, input, [tabindex]:not([tabindex="-1"])',
    )
    firstFocusable?.focus()

    function onKeyDown(event: KeyboardEvent) {
      if (event.key === 'Escape') {
        event.preventDefault()
        setMenuOpen(false)
        browseButtonRef.current?.focus()
      }
    }

    window.addEventListener('keydown', onKeyDown)
    return () => {
      document.body.style.overflow = previousOverflow
      window.removeEventListener('keydown', onKeyDown)
    }
  }, [menuOpen])

  return (
    <div className="soa-wiki">
      <div className="soa-wiki-shell">
        <aside className="soa-wiki-sidebar" aria-label="Wiki navigation">
          <Link to={wikiPath()} className="soa-wiki-brand">
            <img src={WIKI_MOD_ICON} alt="" width={48} height={48} className="soa-wiki-brand-icon" />
            <span className="soa-wiki-brand-text">
              <strong>{WIKI_TITLE}</strong>
              <span>RimWorld · Arrakis conversion</span>
            </span>
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

          <WikiNav orderedCats={orderedCats} mechanicLinks={mechanicLinks} />
        </aside>

        <div className="soa-wiki-content">
          <div className="soa-wiki-mobile-bar">
            <Link to={wikiPath()} className="soa-wiki-brand soa-wiki-brand-compact">
              <img src={WIKI_MOD_ICON} alt="" width={40} height={40} className="soa-wiki-brand-icon" />
              <span className="soa-wiki-brand-text">
                <strong>{WIKI_TITLE}</strong>
              </span>
            </Link>
            <form className="soa-wiki-search soa-wiki-search-compact" onSubmit={onSearch}>
              <input
                type="search"
                value={query}
                onChange={(e) => setQuery(e.target.value)}
                placeholder="Search wiki…"
                aria-label="Search wiki"
              />
              <button type="submit">Go</button>
            </form>
            <button
              ref={browseButtonRef}
              type="button"
              className="soa-wiki-browse-btn"
              aria-expanded={menuOpen}
              aria-controls="soa-wiki-drawer"
              onClick={() => setMenuOpen((open) => !open)}
            >
              {menuOpen ? 'Close' : 'Browse'}
            </button>
          </div>

          <div className="soa-wiki-main">
            <Outlet />
          </div>
        </div>
      </div>

      {menuOpen ? (
        <button
          type="button"
          className="soa-wiki-drawer-backdrop"
          aria-label="Close wiki menu"
          onClick={() => {
            setMenuOpen(false)
            browseButtonRef.current?.focus()
          }}
        />
      ) : null}

      <div
        id="soa-wiki-drawer"
        ref={drawerRef}
        className={`soa-wiki-drawer${menuOpen ? ' is-open' : ''}`}
        role="dialog"
        aria-modal={menuOpen}
        aria-labelledby={drawerTitleId}
        hidden={!menuOpen}
      >
        <div className="soa-wiki-drawer-head">
          <h2 id={drawerTitleId}>Wiki menu</h2>
          <button
            type="button"
            className="soa-wiki-browse-btn"
            onClick={() => {
              setMenuOpen(false)
              browseButtonRef.current?.focus()
            }}
          >
            Close
          </button>
        </div>
        <WikiNav
          orderedCats={orderedCats}
          mechanicLinks={mechanicLinks}
          onNavigate={() => setMenuOpen(false)}
        />
      </div>
    </div>
  )
}
