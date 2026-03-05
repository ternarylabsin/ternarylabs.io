import { useParams, useNavigate, Link } from 'react-router-dom'
import { getProject, projects } from '../content/projects'
import Reveal from '../components/Reveal'
import { useEffect } from 'react'

const accentMap: Record<string, string> = {
  ddsmatch: 'var(--accent-cyan)',
  containr: 'var(--accent-violet)',
  'confidential-ecommerce': 'var(--accent-lime)',
}

export default function ProjectDetailPage() {
  const { slug } = useParams<{ slug: string }>()
  const navigate = useNavigate()
  const project = slug ? getProject(slug) : undefined
  const accent = slug ? (accentMap[slug] ?? 'var(--accent-cyan)') : 'var(--accent-cyan)'

  // Redirect unknown slugs
  useEffect(() => {
    if (!project) { navigate('/projects', { replace: true }) }
  }, [project, navigate])

  if (!project) return null

  // Prev / next navigation
  const idx = projects.findIndex((p) => p.slug === slug)
  const prev = idx > 0 ? projects[idx - 1] : null
  const next = idx < projects.length - 1 ? projects[idx + 1] : null

  return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem' }}>
      {/* Breadcrumb */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '1.5rem 1.5rem 0' }}>
        <Reveal>
          <nav aria-label="Breadcrumb">
            <span style={{ fontSize: '0.85rem', color: '#475569' }}>
              <Link to="/" style={{ color: '#475569', textDecoration: 'none' }}>Home</Link>
              {' / '}
              <Link to="/projects" style={{ color: '#475569', textDecoration: 'none' }}>Projects</Link>
              {' / '}
              <span style={{ color: '#94a3b8' }}>{project.displayName}</span>
            </span>
          </nav>
        </Reveal>
      </div>

      {/* Hero */}
      <section
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 1.5rem 4rem',
          borderBottom: '1px solid var(--border-subtle)',
          position: 'relative',
        }}
      >
        {/* Glow */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            top: 0, left: 0, right: 0, bottom: 0,
            background: `radial-gradient(ellipse at 15% 50%, ${accent.replace('var(', '').replace(')', '')} opacity(0.04), transparent 65%)`,
            pointerEvents: 'none',
          }}
        />

        <Reveal>
          <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
            {project.platforms.map((p) => (
              <span
                key={p}
                style={{
                  fontSize: '0.72rem',
                  fontWeight: 600,
                  padding: '0.22rem 0.65rem',
                  borderRadius: '100px',
                  background: 'rgba(255,255,255,0.05)',
                  color: '#94a3b8',
                  border: '1px solid rgba(255,255,255,0.1)',
                }}
              >
                {p}
              </span>
            ))}
            <span
              style={{
                fontSize: '0.72rem',
                fontWeight: 600,
                padding: '0.22rem 0.65rem',
                borderRadius: '100px',
                background: project.status === 'Delivered' ? 'rgba(132,204,22,0.1)' : 'rgba(168,85,247,0.1)',
                color: project.status === 'Delivered' ? 'var(--accent-lime)' : 'var(--accent-violet)',
                border: project.status === 'Delivered' ? '1px solid rgba(132,204,22,0.2)' : '1px solid rgba(168,85,247,0.2)',
              }}
            >
              {project.status}
            </span>
          </div>

          <h1
            style={{
              fontSize: 'clamp(2.2rem, 5vw, 3.8rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#fff',
              margin: '0 0 0.75rem',
            }}
          >
            {project.displayName}
          </h1>

          <p style={{ fontSize: '1.15rem', color: accent, fontStyle: 'italic', fontWeight: 500, margin: '0 0 1.25rem' }}>
            {project.tagline}
          </p>

          <p style={{ fontSize: '1rem', color: '#94a3b8', maxWidth: '680px', lineHeight: 1.75, margin: 0 }}>
            {project.shortSummary}
          </p>
        </Reveal>
      </section>

      {/* Content */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem' }}>
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fit, minmax(340px, 1fr))',
            gap: '3rem',
          }}
        >
          {/* Left column: overview + capabilities */}
          <div>
            {/* Overview */}
            <Reveal>
              <section style={{ marginBottom: '3rem' }}>
                <SectionLabel accent={accent}>Overview</SectionLabel>
                <p style={{ fontSize: '0.95rem', color: '#94a3b8', lineHeight: 1.8, margin: 0 }}>
                  {project.longSummary}
                </p>
              </section>
            </Reveal>

            {/* Key capabilities */}
            <Reveal delay={100}>
              <section>
                <SectionLabel accent={accent}>Key Capabilities</SectionLabel>
                <ul style={{ margin: 0, padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {project.capabilities.map((cap) => (
                    <li
                      key={cap}
                      style={{
                        fontSize: '0.9rem',
                        color: '#94a3b8',
                        display: 'flex',
                        alignItems: 'flex-start',
                        gap: '0.65rem',
                        lineHeight: 1.6,
                      }}
                    >
                      <span
                        style={{
                          display: 'inline-flex',
                          alignItems: 'center',
                          justifyContent: 'center',
                          width: 18,
                          height: 18,
                          borderRadius: '50%',
                          background: `${accent.includes('cyan') ? 'rgba(125,249,255,0.12)' : accent.includes('violet') ? 'rgba(168,85,247,0.12)' : 'rgba(132,204,22,0.12)'}`,
                          flexShrink: 0,
                          marginTop: '0.15rem',
                        }}
                      >
                        <span style={{ fontSize: '0.6rem', color: accent }}>✓</span>
                      </span>
                      {cap}
                    </li>
                  ))}
                </ul>
              </section>
            </Reveal>
          </div>

          {/* Right column: what we delivered + tech */}
          <div>
            {/* What we delivered */}
            <Reveal delay={60}>
              <section
                className="glass"
                style={{ padding: '1.75rem', marginBottom: '1.5rem', borderColor: `${accent.includes('cyan') ? 'rgba(125,249,255,0.15)' : accent.includes('violet') ? 'rgba(168,85,247,0.15)' : 'rgba(132,204,22,0.15)'}` }}
              >
                <SectionLabel accent={accent}>What We Built</SectionLabel>
                <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
                  {project.capabilities.slice(0, 4).map((cap, i) => (
                    <div
                      key={cap}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.75rem',
                        fontSize: '0.85rem',
                        color: '#64748b',
                        padding: '0.5rem 0',
                        borderBottom: i < project.capabilities.slice(0, 4).length - 1 ? '1px solid var(--border-subtle)' : 'none',
                      }}
                    >
                      <span style={{ color: accent, fontWeight: 700, flexShrink: 0 }}>0{i + 1}</span>
                      {cap}
                    </div>
                  ))}
                </div>
              </section>
            </Reveal>

            {/* Tech footprint */}
            {project.techFootprint.length > 0 && (
              <Reveal delay={120}>
                <section className="glass" style={{ padding: '1.75rem' }}>
                  <SectionLabel accent={accent}>Tech Footprint</SectionLabel>
                  <div style={{ display: 'flex', gap: '0.5rem', flexWrap: 'wrap' }}>
                    {project.techFootprint.map((tech) => (
                      <span
                        key={tech}
                        style={{
                          fontSize: '0.78rem',
                          fontWeight: 600,
                          padding: '0.3rem 0.75rem',
                          borderRadius: 'var(--radius-sm)',
                          background: 'rgba(255,255,255,0.04)',
                          color: '#cbd5e1',
                          border: '1px solid rgba(255,255,255,0.08)',
                        }}
                      >
                        {tech}
                      </span>
                    ))}
                  </div>
                </section>
              </Reveal>
            )}

            {/* Screenshot placeholder */}
            <Reveal delay={160}>
              <div
                className="glass"
                style={{
                  marginTop: '1.5rem',
                  padding: '3rem',
                  textAlign: 'center',
                  borderStyle: 'dashed',
                }}
              >
                <p style={{ fontSize: '0.8rem', color: '#475569', margin: 0 }}>
                  Screenshots / mockups coming soon
                </p>
              </div>
            </Reveal>
          </div>
        </div>

        {/* CTA */}
        <Reveal>
          <div
            className="glass"
            style={{
              marginTop: '4rem',
              padding: '2.5rem',
              textAlign: 'center',
              borderColor: `${accent.includes('cyan') ? 'rgba(125,249,255,0.15)' : accent.includes('violet') ? 'rgba(168,85,247,0.15)' : 'rgba(132,204,22,0.15)'}`,
            }}
          >
            <h3 style={{ fontSize: '1.4rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem' }}>
              Build something like this?
            </h3>
            <p style={{ color: '#64748b', margin: '0 0 1.5rem', lineHeight: 1.65 }}>
              We're accepting new clients. Let's talk about your project.
            </p>
            <button
              onClick={() => navigate('/contact')}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: accent.includes('cyan') ? 'rgba(125,249,255,0.12)' : accent.includes('violet') ? 'rgba(168,85,247,0.12)' : 'rgba(132,204,22,0.12)',
                color: accent,
                border: `1px solid ${accent.includes('cyan') ? 'rgba(125,249,255,0.35)' : accent.includes('violet') ? 'rgba(168,85,247,0.35)' : 'rgba(132,204,22,0.35)'}`,
                transition: 'all 0.2s',
              }}
            >
              Request Similar Software →
            </button>
          </div>
        </Reveal>

        {/* Prev / Next navigation */}
        <Reveal>
          <div
            style={{
              marginTop: '3rem',
              display: 'flex',
              justifyContent: 'space-between',
              flexWrap: 'wrap',
              gap: '1rem',
            }}
          >
            {prev ? (
              <Link
                to={`/projects/${prev.slug}`}
                style={{
                  textDecoration: 'none',
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  flex: 1,
                  minWidth: 200,
                }}
              >
                <p style={{ fontSize: '0.7rem', color: '#475569', margin: '0 0 0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>← Previous</p>
                <p style={{ fontSize: '0.95rem', color: '#e2e8f0', margin: 0, fontWeight: 600 }}>{prev.displayName}</p>
              </Link>
            ) : <div style={{ flex: 1 }} />}

            {next ? (
              <Link
                to={`/projects/${next.slug}`}
                style={{
                  textDecoration: 'none',
                  padding: '1rem 1.5rem',
                  borderRadius: 'var(--radius-md)',
                  background: 'rgba(255,255,255,0.02)',
                  border: '1px solid var(--border-subtle)',
                  flex: 1,
                  minWidth: 200,
                  textAlign: 'right',
                }}
              >
                <p style={{ fontSize: '0.7rem', color: '#475569', margin: '0 0 0.3rem', textTransform: 'uppercase', letterSpacing: '0.08em' }}>Next →</p>
                <p style={{ fontSize: '0.95rem', color: '#e2e8f0', margin: 0, fontWeight: 600 }}>{next.displayName}</p>
              </Link>
            ) : <div style={{ flex: 1 }} />}
          </div>
        </Reveal>
      </div>
    </div>
  )
}

function SectionLabel({ children, accent }: { children: React.ReactNode; accent: string }) {
  return (
    <p
      style={{
        fontSize: '0.72rem',
        fontWeight: 700,
        letterSpacing: '0.12em',
        textTransform: 'uppercase',
        color: accent,
        margin: '0 0 0.9rem',
      }}
    >
      {children}
    </p>
  )
}
