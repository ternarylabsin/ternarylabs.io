import { useState, useEffect } from 'react'
import { NavLink, useLocation } from 'react-router-dom'
import { copy } from '../content/copy'

const navLinks = [
  { to: '/', label: 'Home' },
  { to: '/projects', label: 'Projects' },
  { to: '/contact', label: 'Contact' },
]

export default function Header() {
  const [scrolled, setScrolled] = useState(false)
  const [menuOpen, setMenuOpen] = useState(false)
  const location = useLocation()
  const logoSrc = `${import.meta.env.BASE_URL}ternary_labs_logo.png`

  useEffect(() => {
    const handleScroll = () => setScrolled(window.scrollY > 32)
    window.addEventListener('scroll', handleScroll, { passive: true })
    return () => window.removeEventListener('scroll', handleScroll)
  }, [])

  // Close mobile menu on route change
  useEffect(() => { setMenuOpen(false) }, [location])

  return (
    <header
      style={{
        position: 'fixed',
        top: 0,
        left: 0,
        right: 0,
        zIndex: 100,
        transition: 'background 0.3s, border-color 0.3s, box-shadow 0.3s',
        background: scrolled ? 'var(--bg-glass)' : 'transparent',
        backdropFilter: scrolled ? 'blur(12px)' : 'none',
        WebkitBackdropFilter: scrolled ? 'blur(12px)' : 'none',
        borderBottom: scrolled ? '1px solid var(--border-subtle)' : '1px solid transparent',
        boxShadow: scrolled ? '0 1px 40px rgba(0,0,0,0.4)' : 'none',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '0 1.5rem',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'space-between',
          height: '64px',
        }}
      >
        {/* Logo */}
        <NavLink
          to="/"
          style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}
        >
          <img
            src={logoSrc}
            alt="Ternary Labs logo"
            style={{ width: '30px', height: '30px', objectFit: 'contain' }}
          />
          <span
            style={{
              fontWeight: 700,
              fontSize: '1.1rem',
              letterSpacing: '-0.01em',
              color: '#fff',
            }}
          >
            {copy.brand.name}
          </span>
        </NavLink>

        {/* Desktop Nav */}
        <nav aria-label="Main navigation" style={{ display: 'flex', gap: '0.25rem' }}>
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '0.9rem',
                fontWeight: 500,
                textDecoration: 'none',
                transition: 'color 0.2s, background 0.2s',
                color: isActive ? 'var(--accent-cyan)' : '#94a3b8',
                background: isActive ? 'rgba(125,249,255,0.08)' : 'transparent',
              })}
              className="nav-link-desktop"
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            style={{
              marginLeft: '0.5rem',
              padding: '0.4rem 1.1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '0.9rem',
              fontWeight: 600,
              textDecoration: 'none',
              background: 'rgba(125,249,255,0.12)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(125,249,255,0.25)',
              transition: 'background 0.2s, box-shadow 0.2s',
            }}
            onMouseEnter={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(125,249,255,0.2)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-sm)'
            }}
            onMouseLeave={(e) => {
              ;(e.currentTarget as HTMLElement).style.background = 'rgba(125,249,255,0.12)'
              ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
            }}
          >
            Start a Project
          </NavLink>
        </nav>

        {/* Mobile hamburger */}
        <button
          aria-label={menuOpen ? 'Close menu' : 'Open menu'}
          aria-expanded={menuOpen}
          onClick={() => setMenuOpen((v) => !v)}
          style={{
            display: 'none',
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            padding: '0.4rem',
            color: '#e2e8f0',
          }}
          className="hamburger-btn"
        >
          <svg width="22" height="22" viewBox="0 0 22 22" fill="none" aria-hidden="true">
            {menuOpen ? (
              <>
                <line x1="3" y1="3" x2="19" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="19" y1="3" x2="3" y2="19" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            ) : (
              <>
                <line x1="3" y1="6" x2="19" y2="6" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="11" x2="19" y2="11" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
                <line x1="3" y1="16" x2="19" y2="16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
              </>
            )}
          </svg>
        </button>
      </div>

      {/* Mobile menu */}
      {menuOpen && (
        <div
          className="mobile-menu"
          style={{
            background: 'var(--bg-elevated)',
            borderTop: '1px solid var(--border-subtle)',
            padding: '1rem 1.5rem 1.5rem',
            display: 'flex',
            flexDirection: 'column',
            gap: '0.25rem',
          }}
        >
          {navLinks.map((link) => (
            <NavLink
              key={link.to}
              to={link.to}
              end={link.to === '/'}
              style={({ isActive }) => ({
                padding: '0.65rem 0.75rem',
                borderRadius: 'var(--radius-sm)',
                fontSize: '1rem',
                fontWeight: 500,
                textDecoration: 'none',
                color: isActive ? 'var(--accent-cyan)' : '#e2e8f0',
                background: isActive ? 'rgba(125,249,255,0.08)' : 'transparent',
              })}
            >
              {link.label}
            </NavLink>
          ))}
          <NavLink
            to="/contact"
            style={{
              marginTop: '0.5rem',
              padding: '0.7rem 1rem',
              borderRadius: 'var(--radius-sm)',
              fontSize: '1rem',
              fontWeight: 600,
              textDecoration: 'none',
              textAlign: 'center',
              background: 'rgba(125,249,255,0.12)',
              color: 'var(--accent-cyan)',
              border: '1px solid rgba(125,249,255,0.25)',
            }}
          >
            Start a Project
          </NavLink>
        </div>
      )}

      <style>{`
        @media (max-width: 768px) {
          .nav-link-desktop, header nav { display: none !important; }
          .hamburger-btn { display: block !important; }
        }
      `}</style>
    </header>
  )
}
