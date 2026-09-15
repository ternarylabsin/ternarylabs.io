import type { ReactNode } from 'react'
import { displaySectionTitle, formatStatKey, formatStatValue, splitParagraphs } from '../data'
import type { WikiDisplayHints } from '../types'

function isEditorialSection(
  value: unknown,
): value is { body?: string; paragraphs?: string[]; bullets?: string[] } {
  return (
    !!value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    ('body' in value || 'paragraphs' in value || 'bullets' in value)
  )
}

function renderValue(value: unknown): ReactNode {
  if (value === null || value === undefined) return <span className="soa-wiki-value-muted">-</span>
  if (typeof value === 'string' || typeof value === 'number' || typeof value === 'boolean') {
    return formatStatValue(value)
  }
  if (Array.isArray(value)) {
    if (value.length === 0) return <span className="soa-wiki-value-muted">-</span>
    if (value.every((item) => typeof item !== 'object' || item === null)) {
      return value.map((item) => formatStatValue(item)).join(', ')
    }
    return (
      <ul className="soa-wiki-nested-list">
        {value.map((item, idx) => (
          <li key={idx}>{renderValue(item)}</li>
        ))}
      </ul>
    )
  }
  return (
    <dl className="soa-wiki-inline-kv">
      {Object.entries(value as Record<string, unknown>)
        .filter(([key]) => !key.startsWith('_'))
        .map(([key, inner]) => (
          <div key={key}>
            <dt>{formatStatKey(key)}</dt>
            <dd>{renderValue(inner)}</dd>
          </div>
        ))}
    </dl>
  )
}

function ProseSection({
  title,
  body,
  paragraphs,
  bullets,
}: {
  title: string
  body?: string
  paragraphs?: string[]
  bullets?: string[]
}) {
  const parts = paragraphs?.length ? paragraphs : body ? splitParagraphs(body) : []
  return (
    <section>
      <h2>{title}</h2>
      <div className="soa-wiki-section-copy">
        {parts.map((part) => (
          <p key={part}>{part}</p>
        ))}
        {bullets?.length ? (
          <ul>
            {bullets.map((bullet) => (
              <li key={bullet}>{bullet}</li>
            ))}
          </ul>
        ) : null}
      </div>
    </section>
  )
}

function isDenseValue(value: unknown): boolean {
  if (Array.isArray(value)) return value.length > 8
  if (value && typeof value === 'object') {
    const keys = Object.keys(value as Record<string, unknown>).filter((key) => !key.startsWith('_'))
    if (keys.length > 8) return true
    return keys.some((key) => isDenseValue((value as Record<string, unknown>)[key]))
  }
  return false
}

function DataSection({
  title,
  value,
}: {
  title: string
  value: unknown
}) {
  const body = <div className="soa-wiki-data-block">{renderValue(value)}</div>
  if (isDenseValue(value)) {
    return (
      <details className="soa-wiki-disclosure">
        <summary className="soa-wiki-disclosure-summary">{title}</summary>
        <div className="soa-wiki-disclosure-body">{body}</div>
      </details>
    )
  }
  return (
    <section>
      <h2>{title}</h2>
      {body}
    </section>
  )
}

export default function ArticleSections({
  sections,
  display,
}: {
  sections: Record<string, unknown> | unknown[]
  display?: WikiDisplayHints
}) {
  if (Array.isArray(sections)) {
    return (
      <>
        {sections.map((section, idx) => {
          if (!section || typeof section !== 'object') return null
          const item = section as { id?: string; title?: string; body?: string }
          return (
            <ProseSection
              key={item.id ?? idx}
              title={item.title || displaySectionTitle(item.id || `section-${idx}`, display?.sectionTitles)}
              body={item.body}
            />
          )
        })}
      </>
    )
  }

  const keys = Object.keys(sections)
  if (!keys.length) return null

  const ordered = [
    ...(display?.sectionOrder ?? []),
    ...keys.filter((key) => !(display?.sectionOrder ?? []).includes(key)),
  ].filter((key, idx, all) => key in sections && all.indexOf(key) === idx)

  return (
    <>
      {ordered.map((key) => {
        const value = sections[key]
        const title = displaySectionTitle(key, display?.sectionTitles)
        if (isEditorialSection(value)) {
          return (
            <ProseSection
              key={key}
              title={title}
              body={value.body}
              paragraphs={value.paragraphs}
              bullets={value.bullets}
            />
          )
        }
        return <DataSection key={key} title={title} value={value} />
      })}
    </>
  )
}
