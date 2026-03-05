import { NavLink } from 'react-router-dom'
import { copy } from '../content/copy'

export default function Footer() {
  const year = new Date().getFullYear()
  const logoSrc = `${import.meta.env.BASE_URL}ternary_labs_logo.png`

  return (
    <footer
      style={{
        borderTop: '1px solid var(--border-subtle)',
        background: 'var(--bg-elevated)',
        padding: '3rem 1.5rem 2rem',
      }}
    >
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(200px, 1fr))',
          gap: '2rem',
        }}
      >
        {/* Brand */}
        <div>
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', marginBottom: '0.75rem' }}>
            <img
              src={logoSrc}
              alt="Ternary Labs logo"
              style={{ width: '24px', height: '24px', objectFit: 'contain' }}
            />
            <span style={{ fontWeight: 700, color: '#fff', fontSize: '0.95rem' }}>
              {copy.brand.name}
            </span>
          </div>
          <p style={{ color: '#64748b', fontSize: '0.85rem', lineHeight: 1.6, margin: 0 }}>
            {copy.brand.tagline}
          </p>
        </div>

        {/* Services */}
        <div>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Services
          </p>
          {['Websites', 'Applications', 'IoT Hardware'].map((s) => (
            <p key={s} style={{ color: '#64748b', fontSize: '0.875rem', margin: '0 0 0.3rem' }}>
              {s}
            </p>
          ))}
        </div>

        {/* Links */}
        <div>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Navigate
          </p>
          {[
            { to: '/', label: 'Home' },
            { to: '/projects', label: 'Projects' },
            { to: '/contact', label: 'Contact' },
          ].map((l) => (
            <NavLink
              key={l.to}
              to={l.to}
              style={{ display: 'block', color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', marginBottom: '0.3rem' }}
            >
              {l.label}
            </NavLink>
          ))}
        </div>

        {/* Contact */}
        <div>
          <p style={{ color: '#94a3b8', fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.08em', textTransform: 'uppercase', marginBottom: '0.75rem' }}>
            Contact
          </p>
          <a
            href={`mailto:${copy.brand.email}`}
            style={{ color: 'var(--accent-cyan)', fontSize: '0.875rem', textDecoration: 'none' }}
          >
            {copy.brand.email}
          </a>
          <br />
          <a
            href={copy.brand.github}
            target="_blank"
            rel="noopener noreferrer"
            style={{ color: '#64748b', fontSize: '0.875rem', textDecoration: 'none', marginTop: '0.4rem', display: 'inline-block' }}
          >
            GitHub ↗
          </a>
        </div>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '2rem auto 0',
          paddingTop: '1.5rem',
          borderTop: '1px solid var(--border-subtle)',
          display: 'flex',
          justifyContent: 'space-between',
          alignItems: 'center',
          flexWrap: 'wrap',
          gap: '0.5rem',
        }}
      >
        <p style={{ color: '#475569', fontSize: '0.8rem', margin: 0 }}>
          © {year} Ternary Labs. All rights reserved.
        </p>
        <p style={{ color: '#334155', fontSize: '0.8rem', margin: 0 }}>
          Built with precision.
        </p>
      </div>
    </footer>
  )
}
