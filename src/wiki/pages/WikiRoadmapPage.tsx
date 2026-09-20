import { useEffect, useMemo, useRef, useState, type ReactNode, type RefObject } from 'react'
import { Link, useSearchParams } from 'react-router-dom'
import Reveal from '../../components/Reveal'
import { wikiPath, WIKI_MOD_BANNER, WIKI_TITLE } from '../constants'
import {
  ROADMAP_BRANCHES,
  ROADMAP_CORE_NODE,
  ROADMAP_CROSSOVERS,
  ROADMAP_FUTURE_WORLDS,
  ROADMAP_NODE_BY_ID,
  ROADMAP_NODES,
  ROADMAP_PHASES,
  ROADMAP_STATUS_META,
  ROADMAP_SYSTEMS,
  type RoadmapIconName,
  type RoadmapStatus,
} from '../roadmap'

const CONNECTOR_PATHS = [
  { id: 'desert-planet', d: 'M 500 310 C 420 250, 315 165, 200 110' },
  { id: 'ways-of-the-desert', d: 'M 500 310 C 580 250, 685 165, 800 110' },
  { id: 'great-houses', d: 'M 500 310 C 415 310, 315 310, 200 310' },
  { id: 'bloodlines', d: 'M 500 310 C 585 310, 685 310, 800 310' },
  { id: 'prescient-path', d: 'M 500 310 C 420 370, 315 455, 200 510' },
  { id: 'beyond-shield-wall', d: 'M 500 310 C 580 370, 685 455, 800 510' },
]

function SectionEyebrow({ children }: { children: ReactNode }) {
  return <p className="soa-roadmap-eyebrow">{children}</p>
}

function StatusBadge({ status }: { status: RoadmapStatus }) {
  const meta = ROADMAP_STATUS_META[status]
  return (
    <span className={`soa-roadmap-status soa-roadmap-status--${meta.tone}`} title={meta.description}>
      {meta.label}
    </span>
  )
}

function RoadmapIcon({ name }: { name: RoadmapIconName }) {
  const common = {
    fill: 'none',
    stroke: 'currentColor',
    strokeWidth: 1.8,
    strokeLinecap: 'round' as const,
    strokeLinejoin: 'round' as const,
  }

  switch (name) {
    case 'arrakis':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...common} d="M5 22c3-6 7-9 11-9s8 3 11 9" />
          <path {...common} d="M8 22c2-2 5-4 8-4s6 2 8 4" />
          <circle {...common} cx="16" cy="9" r="3.5" />
        </svg>
      )
    case 'desert':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...common} d="M4 24 12 12l4 6 4-4 8 10H4Z" />
          <path {...common} d="M8 24c2-2 5-3 8-3s6 1 8 3" />
        </svg>
      )
    case 'ritual':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...common} d="M16 4c6 0 10 4 10 10s-4 10-10 10S6 20 6 14 10 4 16 4Z" />
          <path {...common} d="M16 9c3 0 5 2 5 5" />
          <path {...common} d="M16 14c-2 0-4 2-4 4" />
        </svg>
      )
    case 'crown':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...common} d="m5 24 2-12 7 6 4-10 4 10 5-6 2 12H5Z" />
          <path {...common} d="M8 24h16" />
        </svg>
      )
    case 'dna':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...common} d="M11 5c7 3 10 8 10 11s-3 8-10 11" />
          <path {...common} d="M21 5c-7 3-10 8-10 11s3 8 10 11" />
          <path {...common} d="M12 10h8M12 16h8M12 22h8" />
        </svg>
      )
    case 'eye':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <path {...common} d="M3 16s5-8 13-8 13 8 13 8-5 8-13 8S3 16 3 16Z" />
          <circle {...common} cx="16" cy="16" r="3.5" />
        </svg>
      )
    case 'orbit':
      return (
        <svg viewBox="0 0 32 32" aria-hidden="true">
          <circle {...common} cx="16" cy="16" r="4.5" />
          <path {...common} d="M6 18c0-5 5-10 10-10 6 0 12 4 12 8s-6 8-12 8C10 24 6 21 6 18Z" />
          <path {...common} d="M16 4c4 4 6 8 6 12s-2 8-6 12" />
        </svg>
      )
    default:
      return null
  }
}

function scrollTo(ref: RefObject<HTMLElement | null>) {
  ref.current?.scrollIntoView({ behavior: 'smooth', block: 'start' })
}

export default function WikiRoadmapPage() {
  const [searchParams, setSearchParams] = useSearchParams()
  const [hoveredNodeId, setHoveredNodeId] = useState<string | null>(null)
  const roadmapRef = useRef<HTMLElement | null>(null)
  const progressRef = useRef<HTMLElement | null>(null)
  const heroCurrentNode = useMemo(() => {
    const id = searchParams.get('node')
    return id && ROADMAP_NODE_BY_ID[id] ? ROADMAP_NODE_BY_ID[id] : null
  }, [searchParams])

  const activeNodeId = hoveredNodeId ?? heroCurrentNode?.id ?? null

  useEffect(() => {
    if (!searchParams.get('node')) return
    if (!heroCurrentNode) {
      const next = new URLSearchParams(searchParams)
      next.delete('node')
      setSearchParams(next, { replace: true })
    }
  }, [heroCurrentNode, searchParams, setSearchParams])

  useEffect(() => {
    if (!heroCurrentNode) return

    function onKeyDown(event: KeyboardEvent) {
      if (event.key !== 'Escape') return
      const next = new URLSearchParams(searchParams)
      next.delete('node')
      setSearchParams(next, { replace: true })
    }

    window.addEventListener('keydown', onKeyDown)
    return () => window.removeEventListener('keydown', onKeyDown)
  }, [heroCurrentNode, searchParams, setSearchParams])

  function openNode(nodeId: string) {
    const next = new URLSearchParams(searchParams)
    next.set('node', nodeId)
    setSearchParams(next, { replace: false })
  }

  function closeNode() {
    const next = new URLSearchParams(searchParams)
    next.delete('node')
    setSearchParams(next, { replace: false })
  }

  function nodeState(nodeId: string) {
    if (!activeNodeId) return 'idle'
    if (nodeId === activeNodeId) return 'active'
    if (activeNodeId === ROADMAP_CORE_NODE.id && nodeId !== ROADMAP_CORE_NODE.id) return 'active'
    if (nodeId === ROADMAP_CORE_NODE.id) return 'active'
    return 'muted'
  }

  return (
    <div className="soa-roadmap-page">
      <nav className="soa-wiki-crumb" aria-label="Breadcrumb">
        <Link to={wikiPath()}>{WIKI_TITLE}</Link>
        {' / '}
        <span>Roadmap</span>
      </nav>

      <section className="soa-roadmap-hero">
        <div className="soa-roadmap-hero-copy">
          <SectionEyebrow>Sands of Arrakis</SectionEyebrow>
          <h1 className="soa-roadmap-hero-title">
            Sands of Arrakis
            <span>Wiki Roadmap</span>
          </h1>
          <p className="soa-roadmap-hero-body">
            The living roadmap for the Sands of Arrakis total conversion. Follow the project from
            survival on Arrakis to the politics, bloodlines, cultures, mysteries, and worlds that
            may eventually define the greater Dune universe.
          </p>
          <div className="soa-roadmap-hero-actions">
            <button type="button" className="soa-roadmap-btn soa-roadmap-btn--primary" onClick={() => scrollTo(roadmapRef)}>
              Explore the Roadmap
            </button>
            <button type="button" className="soa-roadmap-btn soa-roadmap-btn--secondary" onClick={() => scrollTo(progressRef)}>
              View Current Progress
            </button>
          </div>
          <div className="soa-roadmap-stat-strip" aria-label="Roadmap summary">
            <div>
              <strong>{ROADMAP_BRANCHES.length}</strong>
              <span>Major layers</span>
            </div>
            <div>
              <strong>{ROADMAP_PHASES.length}</strong>
              <span>Development phases</span>
            </div>
            <div>
              <strong>{ROADMAP_SYSTEMS.length}</strong>
              <span>System families</span>
            </div>
          </div>
        </div>

        <div className="soa-roadmap-hero-art" aria-hidden="true">
          <img src={WIKI_MOD_BANNER} alt="" width={1672} height={941} />
          <div className="soa-roadmap-hero-echo">
            <span>A harsher world</span>
            <span>A deeper story</span>
            <span>A greater tomorrow</span>
          </div>
        </div>
      </section>

      <Reveal>
        <section className="soa-roadmap-notice">
          <div className="soa-roadmap-notice-icon" aria-hidden="true">
            i
          </div>
          <div>
            <strong>This roadmap is early and subject to change.</strong>
            <p>
              It represents the long-term direction of Sands of Arrakis. Systems, names, order,
              dependencies, and scope may change as development progresses.
            </p>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section ref={roadmapRef} className="soa-roadmap-section" style={{ scrollMarginTop: '96px' }}>
          <SectionEyebrow>The Roadmap</SectionEyebrow>
          <h2 className="soa-roadmap-section-title">A Larger Vision for Arrakis</h2>
          <p className="soa-roadmap-section-copy">
            Sands of Arrakis is built in layers, from surviving the desert to shaping the future of
            the Imperium.
          </p>

          <div className="soa-roadmap-network-shell">
            <div className="soa-roadmap-network">
              <svg
                className="soa-roadmap-network-svg"
                viewBox="0 0 1000 620"
                preserveAspectRatio="none"
                aria-hidden="true"
              >
                {CONNECTOR_PATHS.map((connector) => {
                  const tone =
                    !activeNodeId || activeNodeId === ROADMAP_CORE_NODE.id || activeNodeId === connector.id
                      ? 'active'
                      : 'muted'
                  return (
                    <path
                      key={connector.id}
                      d={connector.d}
                      className={`soa-roadmap-connector soa-roadmap-connector--${tone}`}
                    />
                  )
                })}
              </svg>

              <div className="soa-roadmap-network-grid">
                {ROADMAP_NODES.map((node) => {
                  const state = nodeState(node.id)
                  const isCore = node.id === ROADMAP_CORE_NODE.id
                  return (
                    <button
                      key={node.id}
                      type="button"
                      className={`soa-roadmap-node${isCore ? ' soa-roadmap-node--core' : ''}`}
                      style={{ gridArea: node.networkArea }}
                      data-state={state}
                      onClick={() => openNode(node.id)}
                      onMouseEnter={() => setHoveredNodeId(node.id)}
                      onMouseLeave={() => setHoveredNodeId((current) => (current === node.id ? null : current))}
                      onFocus={() => setHoveredNodeId(node.id)}
                      onBlur={() => setHoveredNodeId((current) => (current === node.id ? null : current))}
                      aria-label={`${node.title}. ${node.subtitle}. ${ROADMAP_STATUS_META[node.status].label}.`}
                    >
                      <span className="soa-roadmap-node-icon">
                        <RoadmapIcon name={node.icon} />
                      </span>
                      <span className="soa-roadmap-node-copy">
                        <strong>{node.title}</strong>
                        <span>{node.subtitle}</span>
                      </span>
                    </button>
                  )
                })}
              </div>
            </div>
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="soa-roadmap-section">
          <SectionEyebrow>Roadmap Layers</SectionEyebrow>
          <h2 className="soa-roadmap-section-title">Explore the Six Pillars</h2>
          <p className="soa-roadmap-section-copy">
            Each layer reinterprets a major RimWorld framework into a Dune-specific expansion of
            the total conversion.
          </p>

          <div className="soa-roadmap-pillars-grid">
            {ROADMAP_BRANCHES.map((node) => (
              <button
                key={node.id}
                type="button"
                className="soa-roadmap-pillar"
                onClick={() => openNode(node.id)}
              >
                <span className="soa-roadmap-pillar-icon">
                  <RoadmapIcon name={node.icon} />
                </span>
                <div className="soa-roadmap-pillar-copy">
                  <strong>{node.title}</strong>
                  <StatusBadge status={node.status} />
                  <p>{node.description}</p>
                  <span className="soa-roadmap-pillar-meta">Requires: {node.rimworldDlc ?? node.rimworldLayer}</span>
                  <span className="soa-roadmap-pillar-link">Learn more</span>
                </div>
              </button>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section
          ref={progressRef}
          className="soa-roadmap-section"
          style={{ scrollMarginTop: '96px' }}
        >
          <SectionEyebrow>Development Phases</SectionEyebrow>
          <h2 className="soa-roadmap-section-title">From Survival to the Stars</h2>
          <p className="soa-roadmap-section-copy">
            This sequence is about build order and dependency flow, not fixed release dates.
          </p>

          <div className="soa-roadmap-phase-grid">
            {ROADMAP_PHASES.map((phase) => (
              <article
                key={phase.phase}
                className={`soa-roadmap-phase-card${phase.current ? ' is-current' : ''}`}
              >
                <div className="soa-roadmap-phase-marker">{phase.phase}</div>
                <span className="soa-roadmap-phase-kicker">Phase {phase.phase}</span>
                <h3>{phase.title}</h3>
                <p className="soa-roadmap-phase-focus">{phase.focus}</p>
                <p>{phase.summary}</p>
                {phase.statusLabel ? (
                  <span className="soa-roadmap-phase-status">{phase.statusLabel}</span>
                ) : null}
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="soa-roadmap-section">
          <SectionEyebrow>System Crossovers</SectionEyebrow>
          <h2 className="soa-roadmap-section-title">Stronger Together</h2>
          <p className="soa-roadmap-section-copy">
            Expansions are treated as system frameworks, not isolated content packs. Combined
            ownership should create deeper interactions rather than a longer item list.
          </p>

          <div className="soa-roadmap-card-grid soa-roadmap-card-grid--crossovers">
            {ROADMAP_CROSSOVERS.map((crossover) => (
              <article key={crossover.id} className="soa-roadmap-detail-card">
                <div className="soa-roadmap-chip-row">
                  {crossover.layers.map((layer) => (
                    <span key={layer} className="soa-roadmap-chip">
                      {layer}
                    </span>
                  ))}
                </div>
                <h3>{crossover.title}</h3>
                <p>{crossover.summary}</p>
                <ul className="soa-roadmap-list">
                  {crossover.systems.map((system) => (
                    <li key={system}>{system}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="soa-roadmap-section">
          <SectionEyebrow>The Systems of Arrakis</SectionEyebrow>
          <h2 className="soa-roadmap-section-title">Everything Connects</h2>
          <p className="soa-roadmap-section-copy">
            These feature families are where the roadmap becomes a true systems map rather than a
            set of isolated DLC ideas.
          </p>

          <div className="soa-roadmap-card-grid soa-roadmap-card-grid--systems">
            {ROADMAP_SYSTEMS.map((system) => {
              const node = ROADMAP_NODE_BY_ID[system.nodeId]
              return (
                <button
                  key={system.id}
                  type="button"
                  className="soa-roadmap-system-card"
                  onClick={() => openNode(node.id)}
                >
                  <div className="soa-roadmap-system-head">
                    <strong>{system.title}</strong>
                    <StatusBadge status={system.status} />
                  </div>
                  <p>{system.summary}</p>
                  <span className="soa-roadmap-system-parent">{node.title}</span>
                </button>
              )
            })}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="soa-roadmap-section">
          <SectionEyebrow>Beyond Arrakis</SectionEyebrow>
          <h2 className="soa-roadmap-section-title">The Known Universe</h2>
          <p className="soa-roadmap-section-copy">
            Arrakis remains the priority. Offworld locations represent a possible long-term
            evolution of the conversion once the desert planet itself is sufficiently complete.
          </p>

          <div className="soa-roadmap-card-grid soa-roadmap-card-grid--future">
            {ROADMAP_FUTURE_WORLDS.map((world) => (
              <article key={world.id} className="soa-roadmap-detail-card">
                <div className="soa-roadmap-system-head">
                  <strong>{world.title}</strong>
                  <StatusBadge status="far-future" />
                </div>
                <p>{world.summary}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <Reveal>
        <section className="soa-roadmap-section">
          <SectionEyebrow>Roadmap Legend</SectionEyebrow>
          <h2 className="soa-roadmap-section-title">Status Language</h2>
          <div className="soa-roadmap-legend-grid">
            {Object.entries(ROADMAP_STATUS_META).map(([status, meta]) => (
              <article key={status} className="soa-roadmap-detail-card">
                <StatusBadge status={status as RoadmapStatus} />
                <p>{meta.description}</p>
              </article>
            ))}
          </div>
        </section>
      </Reveal>

      <p className="soa-roadmap-footer-note">
        Roadmap content reflects current development direction and may change as systems are
        prototyped, tested, or re-scoped.
      </p>

      {heroCurrentNode ? (
        <>
          <button
            type="button"
            className="soa-roadmap-overlay"
            onClick={closeNode}
            aria-label="Close roadmap detail panel"
          />
          <aside
            className="soa-roadmap-drawer"
            aria-labelledby="soa-roadmap-drawer-title"
            aria-modal="true"
            role="dialog"
          >
            <div className="soa-roadmap-drawer-head">
              <div>
                <SectionEyebrow>{heroCurrentNode.category}</SectionEyebrow>
                <h2 id="soa-roadmap-drawer-title">{heroCurrentNode.title}</h2>
              </div>
              <button type="button" className="soa-roadmap-btn soa-roadmap-btn--ghost" onClick={closeNode}>
                Close
              </button>
            </div>

            <div className="soa-roadmap-drawer-body">
              <div className="soa-roadmap-chip-row">
                <StatusBadge status={heroCurrentNode.status} />
                <span className="soa-roadmap-chip">{heroCurrentNode.rimworldLayer}</span>
                {heroCurrentNode.rimworldDlc ? (
                  <span className="soa-roadmap-chip">{heroCurrentNode.rimworldDlc}</span>
                ) : null}
              </div>

              <p className="soa-roadmap-drawer-subtitle">{heroCurrentNode.subtitle}</p>
              <p>{heroCurrentNode.description}</p>

              <section className="soa-roadmap-drawer-section">
                <h3>Key planned systems</h3>
                <ul className="soa-roadmap-list">
                  {heroCurrentNode.keySystems.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              {heroCurrentNode.dependencies?.length ? (
                <section className="soa-roadmap-drawer-section">
                  <h3>Requires</h3>
                  <div className="soa-roadmap-chip-row">
                    {heroCurrentNode.dependencies.map((item) => (
                      <span key={item} className="soa-roadmap-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {heroCurrentNode.unlocks?.length ? (
                <section className="soa-roadmap-drawer-section">
                  <h3>Unlocks</h3>
                  <div className="soa-roadmap-chip-row">
                    {heroCurrentNode.unlocks.map((item) => (
                      <span key={item} className="soa-roadmap-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              {heroCurrentNode.related?.length ? (
                <section className="soa-roadmap-drawer-section">
                  <h3>Cross-links</h3>
                  <div className="soa-roadmap-chip-row">
                    {heroCurrentNode.related.map((item) => (
                      <span key={item} className="soa-roadmap-chip">
                        {item}
                      </span>
                    ))}
                  </div>
                </section>
              ) : null}

              <section className="soa-roadmap-drawer-section">
                <h3>Current implementation notes</h3>
                <ul className="soa-roadmap-list">
                  {heroCurrentNode.currentNotes.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </section>

              {heroCurrentNode.wikiLinks?.length ? (
                <section className="soa-roadmap-drawer-section">
                  <h3>Related wiki pages</h3>
                  <div className="soa-roadmap-drawer-links">
                    {heroCurrentNode.wikiLinks.map((link) => (
                      <Link key={link.to} to={link.to}>
                        {link.label}
                      </Link>
                    ))}
                  </div>
                </section>
              ) : null}
            </div>
          </aside>
        </>
      ) : null}
    </div>
  )
}
