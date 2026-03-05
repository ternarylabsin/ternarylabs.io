import { useNavigate } from 'react-router-dom'
import { projects } from '../content/projects'
import Reveal from '../components/Reveal'

const accentColors = ['var(--accent-cyan)', 'var(--accent-violet)', 'var(--accent-lime)']

export default function ProjectsPage() {
  const navigate = useNavigate()

  return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '5rem' }}>
      {/* Page header */}
      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '3rem 1.5rem 4rem',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <Reveal>
          <p
            style={{
              fontSize: '0.72rem',
              fontWeight: 700,
              letterSpacing: '0.12em',
              textTransform: 'uppercase',
              color: 'var(--accent-cyan)',
              margin: '0 0 0.75rem',
            }}
          >
            Our work
          </p>
          <h1
            style={{
              fontSize: 'clamp(2rem, 5vw, 3.5rem)',
              fontWeight: 800,
              letterSpacing: '-0.03em',
              color: '#fff',
              margin: '0 0 1rem',
            }}
          >
            Projects
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', margin: 0, maxWidth: '520px', lineHeight: 1.7 }}>
            A selection of products and systems we've designed, engineered, and shipped.
          </p>
        </Reveal>
      </div>

      {/* Projects grid */}
      <div
        style={{ maxWidth: '1200px', margin: '0 auto', padding: '4rem 1.5rem 0' }}
      >
        <div
          style={{
            display: 'grid',
            gridTemplateColumns: 'repeat(auto-fill, minmax(340px, 1fr))',
            gap: '2rem',
          }}
        >
          {projects.map((project, i) => (
            <Reveal key={project.slug} delay={i * 120}>
              <article>
                <button
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  style={{ all: 'unset', display: 'block', cursor: 'pointer', width: '100%', borderRadius: 'var(--radius-lg)' }}
                  aria-label={`View ${project.displayName} project`}
                >
                  <div
                    className="glass"
                    style={{
                      padding: '2rem',
                      transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                      borderLeft: `3px solid ${accentColors[i]}`,
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = 'translateY(-6px)'
                      el.style.boxShadow = '0 12px 50px rgba(0,0,0,0.35)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = 'none'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {/* Top row */}
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', marginBottom: '1rem' }}>
                      <h2 style={{ fontSize: '1.2rem', fontWeight: 700, color: '#fff', margin: 0 }}>
                        {project.displayName}
                      </h2>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.65rem',
                          borderRadius: '100px',
                          background: project.status === 'Delivered' ? 'rgba(132,204,22,0.12)' : 'rgba(168,85,247,0.12)',
                          color: project.status === 'Delivered' ? 'var(--accent-lime)' : 'var(--accent-violet)',
                          border: project.status === 'Delivered' ? '1px solid rgba(132,204,22,0.25)' : '1px solid rgba(168,85,247,0.25)',
                          whiteSpace: 'nowrap',
                          flexShrink: 0,
                          marginLeft: '0.75rem',
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p style={{ fontSize: '0.85rem', fontStyle: 'italic', color: accentColors[i], margin: '0 0 0.75rem', fontWeight: 500 }}>
                      {project.tagline}
                    </p>

                    <p style={{ fontSize: '0.9rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 1.5rem' }}>
                      {project.shortSummary}
                    </p>

                    {/* Capabilities snippet */}
                    <ul style={{ margin: '0 0 1.5rem', padding: 0, listStyle: 'none', display: 'flex', flexDirection: 'column', gap: '0.35rem' }}>
                      {project.capabilities.slice(0, 3).map((cap) => (
                        <li
                          key={cap}
                          style={{ fontSize: '0.8rem', color: '#475569', display: 'flex', alignItems: 'flex-start', gap: '0.5rem' }}
                        >
                          <span style={{ color: accentColors[i], flexShrink: 0, lineHeight: 1.5 }}>›</span>
                          {cap}
                        </li>
                      ))}
                    </ul>

                    {/* Platforms */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap', marginBottom: '1.25rem' }}>
                      {project.platforms.map((p) => (
                        <span
                          key={p}
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '0.22rem 0.65rem',
                            borderRadius: '100px',
                            background: 'rgba(255,255,255,0.04)',
                            color: '#94a3b8',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <p style={{ fontSize: '0.82rem', color: accentColors[i], fontWeight: 500, margin: 0 }}>
                      View full project →
                    </p>
                  </div>
                </button>
              </article>
            </Reveal>
          ))}
        </div>

        {/* CTA */}
        <Reveal>
          <div
            className="glass"
            style={{
              marginTop: '4rem',
              padding: '2.5rem',
              textAlign: 'center',
              borderColor: 'rgba(125,249,255,0.15)',
            }}
          >
            <p
              style={{
                fontSize: '0.72rem',
                fontWeight: 700,
                letterSpacing: '0.12em',
                textTransform: 'uppercase',
                color: 'var(--accent-cyan)',
                margin: '0 0 0.75rem',
              }}
            >
              What's next
            </p>
            <h3 style={{ fontSize: '1.5rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem' }}>
              Build something like this?
            </h3>
            <p style={{ color: '#64748b', maxWidth: '500px', margin: '0 auto 1.5rem', lineHeight: 1.65 }}>
              We're accepting new clients. Tell us about your project.
            </p>
            <button
              onClick={() => navigate('/contact')}
              style={{
                padding: '0.75rem 1.75rem',
                borderRadius: 'var(--radius-sm)',
                fontWeight: 600,
                fontSize: '0.95rem',
                cursor: 'pointer',
                background: 'rgba(125,249,255,0.12)',
                color: 'var(--accent-cyan)',
                border: '1px solid rgba(125,249,255,0.35)',
                transition: 'all 0.2s',
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
              Request Software →
            </button>
          </div>
        </Reveal>
      </div>
    </div>
  )
}
