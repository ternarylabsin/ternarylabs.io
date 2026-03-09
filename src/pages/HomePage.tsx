import { useNavigate } from 'react-router-dom'
import { copy } from '../content/copy'
import { projects } from '../content/projects'
import Reveal from '../components/Reveal'

/* ─── Animated background grid ─────────────────────────── */
function GridCanvas() {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        inset: 0,
        backgroundImage: `
          linear-gradient(rgba(125,249,255,0.04) 1px, transparent 1px),
          linear-gradient(90deg, rgba(125,249,255,0.04) 1px, transparent 1px)
        `,
        backgroundSize: '60px 60px',
        maskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)',
        WebkitMaskImage: 'linear-gradient(to bottom, transparent 0%, black 20%, black 70%, transparent 100%)',
        pointerEvents: 'none',
      }}
    />
  )
}

/* ─── Glow orbs ─────────────────────────────────────────── */
function GlowOrb({ color, top, left, size = 400 }: { color: string; top: string; left: string; size?: number }) {
  return (
    <div
      aria-hidden="true"
      style={{
        position: 'absolute',
        top,
        left,
        width: size,
        height: size,
        borderRadius: '50%',
        background: `radial-gradient(circle, ${color} 0%, transparent 70%)`,
        opacity: 0.12,
        filter: 'blur(40px)',
        pointerEvents: 'none',
        transform: 'translate(-50%, -50%)',
      }}
    />
  )
}

/* ─── CTA Button ────────────────────────────────────────── */
function CtaButton({
  children,
  onClick,
  variant = 'primary',
}: {
  children: React.ReactNode
  onClick?: () => void
  variant?: 'primary' | 'secondary'
}) {
  const isPrimary = variant === 'primary'
  return (
    <button
      onClick={onClick}
      style={{
        padding: '0.75rem 1.75rem',
        borderRadius: 'var(--radius-sm)',
        fontWeight: 600,
        fontSize: '0.95rem',
        cursor: 'pointer',
        transition: 'all 0.2s',
        background: isPrimary ? 'rgba(125,249,255,0.12)' : 'transparent',
        color: isPrimary ? 'var(--accent-cyan)' : '#94a3b8',
        border: isPrimary
          ? '1px solid rgba(125,249,255,0.35)'
          : '1px solid rgba(148,163,184,0.25)',
      }}
      onMouseEnter={(e) => {
        const el = e.currentTarget
        if (isPrimary) {
          el.style.background = 'rgba(125,249,255,0.2)'
          el.style.boxShadow = 'var(--glow-sm)'
        } else {
          el.style.background = 'rgba(148,163,184,0.08)'
        }
      }}
      onMouseLeave={(e) => {
        const el = e.currentTarget
        el.style.background = isPrimary ? 'rgba(125,249,255,0.12)' : 'transparent'
        el.style.boxShadow = 'none'
      }}
    >
      {children}
    </button>
  )
}

/* ─── Section title ──────────────────────────────────────── */
function SectionLabel({ children }: { children: React.ReactNode }) {
  return (
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
      {children}
    </p>
  )
}

const accentColors: string[] = [
  'var(--accent-cyan)',
  'var(--accent-violet)',
  'var(--accent-lime)',
]

export default function HomePage() {
  const navigate = useNavigate()
  const logoSrc = `${import.meta.env.BASE_URL}ternary_labs_logo.png`

  return (
    <div style={{ overflowX: 'hidden' }}>

      {/* ───── HERO ───────────────────────────────────────── */}
      <section
        style={{
          position: 'relative',
          minHeight: '100vh',
          display: 'flex',
          alignItems: 'center',
          padding: '8rem 1.5rem 5rem',
        }}
      >
        <GridCanvas />
        <GlowOrb color="var(--accent-cyan)" top="30%" left="10%" size={600} />
        <GlowOrb color="var(--accent-violet)" top="60%" left="80%" size={500} />

        <div style={{ position: 'relative', maxWidth: '1200px', margin: '0 auto', width: '100%' }}>
          <div className="hero-grid">
            <div className="hero-copy">
              <Reveal>
                <div
                  style={{
                    display: 'inline-flex',
                    alignItems: 'center',
                    gap: '0.5rem',
                    background: 'rgba(125,249,255,0.08)',
                    border: '1px solid rgba(125,249,255,0.2)',
                    borderRadius: '100px',
                    padding: '0.3rem 1rem',
                    fontSize: '0.8rem',
                    color: 'var(--accent-cyan)',
                    fontWeight: 500,
                    marginBottom: '1.5rem',
                  }}
                >
                  <span
                    style={{
                      width: 6,
                      height: 6,
                      borderRadius: '50%',
                      background: 'var(--accent-cyan)',
                      boxShadow: '0 0 8px var(--accent-cyan)',
                      display: 'inline-block',
                    }}
                  />
                  Accepting new clients
                </div>
              </Reveal>

              <Reveal delay={100}>
                <h1
                  style={{
                    fontSize: 'clamp(2.8rem, 7vw, 5.5rem)',
                    fontWeight: 800,
                    lineHeight: 1.05,
                    letterSpacing: '-0.03em',
                    margin: '0 0 1rem',
                    color: '#fff',
                    maxWidth: '800px',
                  }}
                >
                  {copy.hero.headline}
                  <br />
                  <span
                    style={{
                      background: 'linear-gradient(135deg, var(--accent-cyan) 0%, var(--accent-violet) 100%)',
                      WebkitBackgroundClip: 'text',
                      WebkitTextFillColor: 'transparent',
                    }}
                  >
                    Ship with precision.
                  </span>
                </h1>
              </Reveal>

              <Reveal delay={200}>
                <p
                  style={{
                    fontSize: 'clamp(1rem, 2vw, 1.2rem)',
                    color: '#94a3b8',
                    maxWidth: '580px',
                    lineHeight: 1.7,
                    margin: '0 0 2.5rem',
                  }}
                >
                  {copy.hero.subheadline}
                </p>
              </Reveal>

              <Reveal delay={300}>
                <div className="hero-cta-row" style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap' }}>
                  <CtaButton variant="primary" onClick={() => navigate('/projects')}>
                    {copy.hero.cta1} →
                  </CtaButton>
                  <CtaButton variant="secondary" onClick={() => navigate('/contact')}>
                    {copy.hero.cta2}
                  </CtaButton>
                </div>
              </Reveal>
            </div>

            <Reveal delay={180}>
              <div className="hero-logo-stage" aria-hidden="true">
                <div className="hero-logo-halo hero-logo-halo-cyan" />
                <div className="hero-logo-halo hero-logo-halo-violet" />

                <div className="hero-logo-frame">
                  <img src={logoSrc} alt="" className="hero-logo-image" />
                  <span className="hero-logo-scanline" />
                </div>

                <div className="hero-logo-ring hero-logo-ring-one" />
                <div className="hero-logo-ring hero-logo-ring-two" />
              </div>
            </Reveal>
          </div>
        </div>

        {/* Scroll indicator */}
        <div
          aria-hidden="true"
          style={{
            position: 'absolute',
            bottom: '2rem',
            left: '50%',
            transform: 'translateX(-50%)',
            display: 'flex',
            flexDirection: 'column',
            alignItems: 'center',
            gap: '0.4rem',
            opacity: 0.4,
          }}
        >
          <span style={{ fontSize: '0.7rem', color: '#64748b', letterSpacing: '0.1em', textTransform: 'uppercase' }}>
            Scroll
          </span>
          <div
            style={{ width: 1, height: 40, background: 'linear-gradient(to bottom, var(--accent-cyan), transparent)' }}
          />
        </div>
      </section>

      {/* ───── SERVICES ───────────────────────────────────── */}
      <section className="section-pad" style={{ padding: '5rem 1.5rem', background: 'var(--bg-elevated)' }}>
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <SectionLabel>What we build</SectionLabel>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: '0 0 3rem',
                maxWidth: '600px',
              }}
            >
              Three capabilities.
              <br />
              <span style={{ color: '#64748b', fontWeight: 400 }}>One focused team.</span>
            </h2>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(280px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {copy.services.map((svc, i) => (
              <Reveal key={svc.title} delay={i * 100}>
                <div
                  className="glass"
                  style={{
                    padding: '2rem',
                    height: '100%',
                    transition: 'border-color 0.3s, box-shadow 0.3s',
                  }}
                  onMouseEnter={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = accentColors[i]
                    ;(e.currentTarget as HTMLElement).style.boxShadow = `0 0 30px ${accentColors[i].replace('var(', '').replace(')', '')} opacity(0.1)`
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.borderColor = 'rgba(125,249,255,0.10)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  <div
                    style={{
                      width: 44,
                      height: 44,
                      borderRadius: 'var(--radius-sm)',
                      background: `rgba(125,249,255,0.08)`,
                      display: 'flex',
                      alignItems: 'center',
                      justifyContent: 'center',
                      fontSize: '1.3rem',
                      marginBottom: '1.25rem',
                    }}
                  >
                    {svc.icon}
                  </div>
                  <h3
                    style={{
                      fontSize: '1.1rem',
                      fontWeight: 700,
                      color: '#fff',
                      margin: '0 0 0.75rem',
                    }}
                  >
                    {svc.title}
                  </h3>
                  <p style={{ color: '#64748b', fontSize: '0.9rem', lineHeight: 1.65, margin: 0 }}>
                    {svc.description}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── FEATURED PROJECTS ──────────────────────────── */}
      <section className="section-pad" style={{ padding: '5rem 1.5rem', position: 'relative' }}>
        <GlowOrb color="var(--accent-violet)" top="50%" left="50%" size={700} />
        <div style={{ maxWidth: '1200px', margin: '0 auto', position: 'relative' }}>
          <Reveal>
            <SectionLabel>Featured work</SectionLabel>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: '0 0 3rem',
              }}
            >
              Products we've shipped.
            </h2>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(300px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {projects.map((project, i) => (
              <Reveal key={project.slug} delay={i * 120}>
                <button
                  onClick={() => navigate(`/projects/${project.slug}`)}
                  style={{
                    all: 'unset',
                    display: 'block',
                    cursor: 'pointer',
                    borderRadius: 'var(--radius-md)',
                    width: '100%',
                  }}
                >
                  <div
                    className="glass"
                    style={{
                      padding: '1.75rem',
                      transition: 'border-color 0.25s, transform 0.25s, box-shadow 0.25s',
                    }}
                    onMouseEnter={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = 'translateY(-4px)'
                      el.style.borderColor = accentColors[i]
                      el.style.boxShadow = '0 8px 40px rgba(0,0,0,0.3)'
                    }}
                    onMouseLeave={(e) => {
                      const el = e.currentTarget as HTMLElement
                      el.style.transform = 'translateY(0)'
                      el.style.borderColor = 'rgba(125,249,255,0.10)'
                      el.style.boxShadow = 'none'
                    }}
                  >
                    {/* Header */}
                    <div
                      style={{
                        display: 'flex',
                        justifyContent: 'space-between',
                        alignItems: 'flex-start',
                        marginBottom: '1rem',
                      }}
                    >
                      <h3
                        style={{
                          fontSize: '1.1rem',
                          fontWeight: 700,
                          color: '#fff',
                          margin: 0,
                        }}
                      >
                        {project.displayName}
                      </h3>
                      <span
                        style={{
                          fontSize: '0.7rem',
                          fontWeight: 600,
                          padding: '0.2rem 0.6rem',
                          borderRadius: '100px',
                          background:
                            project.status === 'Delivered'
                              ? 'rgba(132,204,22,0.12)'
                              : 'rgba(168,85,247,0.12)',
                          color:
                            project.status === 'Delivered'
                              ? 'var(--accent-lime)'
                              : 'var(--accent-violet)',
                          border:
                            project.status === 'Delivered'
                              ? '1px solid rgba(132,204,22,0.25)'
                              : '1px solid rgba(168,85,247,0.25)',
                        }}
                      >
                        {project.status}
                      </span>
                    </div>

                    <p
                      style={{
                        fontSize: '0.875rem',
                        color: '#64748b',
                        lineHeight: 1.65,
                        margin: '0 0 1.25rem',
                      }}
                    >
                      {project.shortSummary}
                    </p>

                    {/* Platforms */}
                    <div style={{ display: 'flex', gap: '0.4rem', flexWrap: 'wrap' }}>
                      {project.platforms.map((p) => (
                        <span
                          key={p}
                          style={{
                            fontSize: '0.72rem',
                            fontWeight: 600,
                            padding: '0.2rem 0.6rem',
                            borderRadius: '100px',
                            background: 'rgba(255,255,255,0.05)',
                            color: '#94a3b8',
                            border: '1px solid rgba(255,255,255,0.08)',
                          }}
                        >
                          {p}
                        </span>
                      ))}
                    </div>

                    <p
                      style={{
                        fontSize: '0.82rem',
                        color: 'var(--accent-cyan)',
                        margin: '1.25rem 0 0',
                        fontWeight: 500,
                      }}
                    >
                      View project →
                    </p>
                  </div>
                </button>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── DIFFERENTIATORS ────────────────────────────── */}
      <section
        style={{
          padding: '5rem 1.5rem',
          background: 'var(--bg-elevated)',
          borderTop: '1px solid var(--border-subtle)',
          borderBottom: '1px solid var(--border-subtle)',
        }}
      >
        <div style={{ maxWidth: '1200px', margin: '0 auto' }}>
          <Reveal>
            <SectionLabel>Why Ternary Labs</SectionLabel>
            <h2
              style={{
                fontSize: 'clamp(1.8rem, 4vw, 2.8rem)',
                fontWeight: 700,
                letterSpacing: '-0.02em',
                color: '#fff',
                margin: '0 0 3rem',
              }}
            >
              Engineering quality, not just code.
            </h2>
          </Reveal>

          <div
            style={{
              display: 'grid',
              gridTemplateColumns: 'repeat(auto-fit, minmax(240px, 1fr))',
              gap: '1.5rem',
            }}
          >
            {copy.differentiators.map((d, i) => (
              <Reveal key={d.title} delay={i * 80}>
                <div
                  style={{
                    padding: '1.5rem',
                    borderRadius: 'var(--radius-md)',
                    borderLeft: `2px solid ${accentColors[i % 3]}`,
                    background: 'rgba(255,255,255,0.02)',
                  }}
                >
                  <h3 style={{ fontSize: '0.95rem', fontWeight: 700, color: '#fff', margin: '0 0 0.5rem' }}>
                    {d.title}
                  </h3>
                  <p style={{ fontSize: '0.875rem', color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                    {d.body}
                  </p>
                </div>
              </Reveal>
            ))}
          </div>
        </div>
      </section>

      {/* ───── CTA BAND ───────────────────────────────────── */}
      <section
        style={{
          padding: '6rem 1.5rem',
          textAlign: 'center',
          position: 'relative',
          overflow: 'hidden',
        }}
      >
        <GlowOrb color="var(--accent-cyan)" top="50%" left="50%" size={800} />
        <div style={{ position: 'relative', maxWidth: '600px', margin: '0 auto' }}>
          <Reveal>
            <div
              style={{
                display: 'inline-flex',
                alignItems: 'center',
                gap: '0.5rem',
                background: 'rgba(132,204,22,0.08)',
                border: '1px solid rgba(132,204,22,0.2)',
                borderRadius: '100px',
                padding: '0.3rem 1rem',
                fontSize: '0.8rem',
                color: 'var(--accent-lime)',
                fontWeight: 600,
                marginBottom: '1.5rem',
              }}
            >
              <span
                style={{
                  width: 6,
                  height: 6,
                  borderRadius: '50%',
                  background: 'var(--accent-lime)',
                  boxShadow: '0 0 8px var(--accent-lime)',
                  display: 'inline-block',
                }}
              />
              {copy.cta.headline}
            </div>
          </Reveal>

          <Reveal delay={100}>
            <p
              style={{
                fontSize: 'clamp(1rem, 2vw, 1.15rem)',
                color: '#94a3b8',
                lineHeight: 1.7,
                margin: '0 0 2rem',
              }}
            >
              {copy.cta.body}
            </p>
          </Reveal>

          <Reveal delay={200}>
            <CtaButton variant="primary" onClick={() => navigate('/contact')}>
              {copy.cta.button} →
            </CtaButton>
          </Reveal>
        </div>
      </section>
    </div>
  )
}
