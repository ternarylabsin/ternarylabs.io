import { useState, useRef } from 'react'
import { copy } from '../content/copy'
import Reveal from '../components/Reveal'

type FormState = 'idle' | 'submitting' | 'success' | 'error'

interface FormData {
  name: string
  email: string
  company: string
  projectType: string
  timeline: string
  budget: string
  message: string
  // honeypot (hidden)
  website: string
}

const inputStyle: React.CSSProperties = {
  display: 'block',
  width: '100%',
  padding: '0.75rem 1rem',
  borderRadius: 'var(--radius-sm)',
  background: 'rgba(255,255,255,0.04)',
  border: '1px solid var(--border-subtle)',
  color: '#e2e8f0',
  fontSize: '0.9rem',
  outline: 'none',
  transition: 'border-color 0.2s, box-shadow 0.2s',
  fontFamily: 'inherit',
  boxSizing: 'border-box',
}

const selectStyle: React.CSSProperties = {
  ...inputStyle,
  cursor: 'pointer',
}

const labelStyle: React.CSSProperties = {
  display: 'block',
  fontSize: '0.78rem',
  fontWeight: 600,
  letterSpacing: '0.06em',
  textTransform: 'uppercase',
  color: '#64748b',
  marginBottom: '0.4rem',
}

function Field({
  label,
  children,
  required,
}: {
  label: string
  children: React.ReactNode
  required?: boolean
}) {
  return (
    <div style={{ marginBottom: '1.25rem' }}>
      <label style={labelStyle}>
        {label}
        {required && <span style={{ color: 'var(--accent-cyan)', marginLeft: '0.2rem' }}>*</span>}
      </label>
      {children}
    </div>
  )
}

export default function ContactPage() {
  const [form, setForm] = useState<FormData>({
    name: '',
    email: '',
    company: '',
    projectType: '',
    timeline: '',
    budget: '',
    message: '',
    website: '', // honeypot
  })

  const [state, setState] = useState<FormState>('idle')
  const [errorMsg, setErrorMsg] = useState('')
  const submitTimeRef = useRef<number>(Date.now())

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    setForm((f) => ({ ...f, [e.target.name]: e.target.value }))
  }

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Honeypot check
    if (form.website) return

    // Time-based lockout: must be at least 3 seconds since page load
    if (Date.now() - submitTimeRef.current < 3000) return

    setState('submitting')
    try {
      const res = await fetch(copy.contact.formspreeAction, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json', Accept: 'application/json' },
        body: JSON.stringify({
          name: form.name,
          email: form.email,
          company: form.company,
          projectType: form.projectType,
          timeline: form.timeline,
          budget: form.budget,
          message: form.message,
        }),
      })
      if (res.ok) {
        setState('success')
      } else {
        const data = await res.json()
        setErrorMsg(data?.errors?.[0]?.message ?? 'Something went wrong. Please try again.')
        setState('error')
      }
    } catch {
      setErrorMsg('Could not send your message. Check your connection and try again.')
      setState('error')
    }
  }

  return (
    <div style={{ minHeight: '100vh', paddingTop: '6rem', paddingBottom: '5rem' }}>
      {/* Header */}
      <div style={{ maxWidth: '1200px', margin: '0 auto', padding: '3rem 1.5rem 4rem', borderBottom: '1px solid var(--border-subtle)' }}>
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
            Get in touch
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
            {copy.contact.headline}
          </h1>
          <p style={{ fontSize: '1.05rem', color: '#64748b', maxWidth: '520px', lineHeight: 1.7, margin: 0 }}>
            {copy.contact.subheadline}
          </p>
        </Reveal>
      </div>

      <div
        style={{
          maxWidth: '1200px',
          margin: '0 auto',
          padding: '4rem 1.5rem',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '4rem',
        }}
      >
        {/* Left: contact info */}
        <div>
          <Reveal>
            <h2 style={{ fontSize: '1.15rem', fontWeight: 700, color: '#fff', margin: '0 0 2rem' }}>
              Contact details
            </h2>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', margin: '0 0 0.3rem' }}>
                Email
              </p>
              <a
                href={`mailto:${copy.brand.email}`}
                style={{ color: 'var(--accent-cyan)', textDecoration: 'none', fontSize: '0.95rem' }}
              >
                {copy.brand.email}
              </a>
            </div>

            <div style={{ marginBottom: '2rem' }}>
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: '#475569', margin: '0 0 0.3rem' }}>
                GitHub
              </p>
              <a
                href={copy.brand.github}
                target="_blank"
                rel="noopener noreferrer"
                style={{ color: '#94a3b8', textDecoration: 'none', fontSize: '0.95rem' }}
              >
                github.com/ternarylabs ↗
              </a>
            </div>

            <div
              className="glass"
              style={{ padding: '1.5rem', borderColor: 'rgba(125,249,255,0.1)' }}
            >
              <p style={{ fontSize: '0.75rem', fontWeight: 700, letterSpacing: '0.1em', textTransform: 'uppercase', color: 'var(--accent-cyan)', margin: '0 0 0.5rem' }}>
                Prefer GitHub?
              </p>
              <p style={{ fontSize: '0.85rem', color: '#64748b', lineHeight: 1.65, margin: '0 0 1rem' }}>
                Developer? Open a structured software request directly as a GitHub Issue.
              </p>
              <a
                href={copy.contact.githubIssueUrl}
                target="_blank"
                rel="noopener noreferrer"
                style={{
                  display: 'inline-block',
                  padding: '0.5rem 1rem',
                  borderRadius: 'var(--radius-sm)',
                  fontSize: '0.8rem',
                  fontWeight: 600,
                  color: '#94a3b8',
                  border: '1px solid rgba(148,163,184,0.2)',
                  textDecoration: 'none',
                  background: 'rgba(255,255,255,0.03)',
                }}
              >
                Open GitHub Issue →
              </a>
            </div>
          </Reveal>
        </div>

        {/* Right: form */}
        <div>
          <Reveal delay={80}>
            {state === 'success' ? (
              <div
                className="glass"
                style={{ padding: '3rem', textAlign: 'center', borderColor: 'rgba(132,204,22,0.2)' }}
              >
                <div
                  style={{
                    width: 56,
                    height: 56,
                    borderRadius: '50%',
                    background: 'rgba(132,204,22,0.12)',
                    border: '1px solid rgba(132,204,22,0.25)',
                    display: 'flex',
                    alignItems: 'center',
                    justifyContent: 'center',
                    margin: '0 auto 1.25rem',
                    fontSize: '1.4rem',
                  }}
                >
                  ✓
                </div>
                <h3 style={{ fontSize: '1.3rem', fontWeight: 700, color: '#fff', margin: '0 0 0.75rem' }}>
                  Message sent
                </h3>
                <p style={{ color: '#64748b', lineHeight: 1.65, margin: 0 }}>
                  Thanks for reaching out. We'll be in touch within one business day.
                </p>
              </div>
            ) : (
              <form
                onSubmit={handleSubmit}
                noValidate
                className="glass"
                style={{ padding: '2rem', borderColor: 'rgba(125,249,255,0.1)' }}
              >
                {/* Honeypot (hidden from real users) */}
                <div style={{ display: 'none' }} aria-hidden="true">
                  <input
                    name="website"
                    type="text"
                    value={form.website}
                    onChange={handleChange}
                    tabIndex={-1}
                    autoComplete="off"
                  />
                </div>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                  <Field label="Name" required>
                    <input
                      name="name"
                      type="text"
                      required
                      value={form.name}
                      onChange={handleChange}
                      placeholder="Your name"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-sm)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </Field>
                  <Field label="Email" required>
                    <input
                      name="email"
                      type="email"
                      required
                      value={form.email}
                      onChange={handleChange}
                      placeholder="you@company.com"
                      style={inputStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-sm)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                    />
                  </Field>
                </div>

                <Field label="Company / Organization">
                  <input
                    name="company"
                    type="text"
                    value={form.company}
                    onChange={handleChange}
                    placeholder="Company name (optional)"
                    style={inputStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-sm)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </Field>

                <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0 1rem' }}>
                  <Field label="Project Type" required>
                    <select
                      name="projectType"
                      required
                      value={form.projectType}
                      onChange={handleChange}
                      style={selectStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                    >
                      <option value="" disabled>Select type…</option>
                      <option value="website">Website</option>
                      <option value="web-app">Web Application</option>
                      <option value="mobile">Mobile App</option>
                      <option value="iot">IoT / Hardware</option>
                      <option value="other">Other</option>
                    </select>
                  </Field>
                  <Field label="Timeline">
                    <select
                      name="timeline"
                      value={form.timeline}
                      onChange={handleChange}
                      style={selectStyle}
                      onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)' }}
                      onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                    >
                      <option value="">Select timeline…</option>
                      <option value="asap">ASAP</option>
                      <option value="1-3mo">1–3 months</option>
                      <option value="3-6mo">3–6 months</option>
                      <option value="6mo+">6+ months</option>
                      <option value="flexible">Flexible</option>
                    </select>
                  </Field>
                </div>

                <Field label="Budget Range">
                  <select
                    name="budget"
                    value={form.budget}
                    onChange={handleChange}
                    style={selectStyle}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)' }}
                  >
                    <option value="">Select budget range…</option>
                    <option value="&lt;5k">Under $5k</option>
                    <option value="5-15k">$5k – $15k</option>
                    <option value="15-50k">$15k – $50k</option>
                    <option value="50k+">$50k+</option>
                    <option value="discuss">Let's discuss</option>
                  </select>
                </Field>

                <Field label="Tell us about your project" required>
                  <textarea
                    name="message"
                    required
                    value={form.message}
                    onChange={handleChange}
                    rows={5}
                    placeholder="Describe what you're building, what problem it solves, and any technical requirements you have in mind…"
                    style={{ ...inputStyle, resize: 'vertical', minHeight: '140px' }}
                    onFocus={(e) => { e.currentTarget.style.borderColor = 'var(--accent-cyan)'; e.currentTarget.style.boxShadow = 'var(--glow-sm)' }}
                    onBlur={(e) => { e.currentTarget.style.borderColor = 'var(--border-subtle)'; e.currentTarget.style.boxShadow = 'none' }}
                  />
                </Field>

                {state === 'error' && (
                  <p style={{ fontSize: '0.85rem', color: '#f87171', margin: '0 0 1rem' }}>
                    {errorMsg}
                  </p>
                )}

                <button
                  type="submit"
                  disabled={state === 'submitting'}
                  style={{
                    width: '100%',
                    padding: '0.85rem',
                    borderRadius: 'var(--radius-sm)',
                    fontWeight: 600,
                    fontSize: '0.95rem',
                    cursor: state === 'submitting' ? 'wait' : 'pointer',
                    background: 'rgba(125,249,255,0.12)',
                    color: 'var(--accent-cyan)',
                    border: '1px solid rgba(125,249,255,0.35)',
                    transition: 'all 0.2s',
                    opacity: state === 'submitting' ? 0.6 : 1,
                  }}
                  onMouseEnter={(e) => {
                    if (state !== 'submitting') {
                      ;(e.currentTarget as HTMLElement).style.background = 'rgba(125,249,255,0.2)'
                      ;(e.currentTarget as HTMLElement).style.boxShadow = 'var(--glow-sm)'
                    }
                  }}
                  onMouseLeave={(e) => {
                    ;(e.currentTarget as HTMLElement).style.background = 'rgba(125,249,255,0.12)'
                    ;(e.currentTarget as HTMLElement).style.boxShadow = 'none'
                  }}
                >
                  {state === 'submitting' ? 'Sending…' : 'Send Request →'}
                </button>
              </form>
            )}
          </Reveal>
        </div>
      </div>
    </div>
  )
}
