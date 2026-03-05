import { Link } from 'react-router-dom'
import Reveal from '../components/Reveal'

export default function NotFoundPage() {
  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        padding: '2rem',
        textAlign: 'center',
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
            margin: '0 0 1rem',
          }}
        >
          404
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
          Page not found.
        </h1>
        <p style={{ color: '#64748b', margin: '0 0 2rem', fontSize: '1rem' }}>
          The page you're looking for doesn't exist.
        </p>
        <Link
          to="/"
          style={{
            padding: '0.75rem 1.75rem',
            borderRadius: 'var(--radius-sm)',
            fontWeight: 600,
            fontSize: '0.95rem',
            textDecoration: 'none',
            background: 'rgba(125,249,255,0.12)',
            color: 'var(--accent-cyan)',
            border: '1px solid rgba(125,249,255,0.35)',
          }}
        >
          Back to Home →
        </Link>
      </Reveal>
    </div>
  )
}
