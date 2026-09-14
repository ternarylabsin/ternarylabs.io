import { Link } from 'react-router-dom'
import type { WikiIndex } from '../types'
import { resolveEntitySlug, resolveMechanicSlug } from '../data'
import { wikiPath } from '../constants'

export function RelationList({
  ids,
  index,
  kind = 'entity',
}: {
  ids: string[]
  index: WikiIndex
  kind?: 'entity' | 'mechanic'
}) {
  if (!ids.length) return null
  return (
    <ul className="soa-wiki-rel-list">
      {ids.map((id) => {
        if (kind === 'mechanic') {
          const slug = resolveMechanicSlug(index, id)
          const name = index.mechanics[id]?.name ?? id
          return (
            <li key={id}>
              {slug ? <Link to={wikiPath('mechanics', slug)}>{name}</Link> : name}
            </li>
          )
        }
        const slug = resolveEntitySlug(index, id)
        const name = index.entities[id]?.name ?? id
        return (
          <li key={id}>
            {slug ? <Link to={wikiPath(slug)}>{name}</Link> : <span title="Not in wiki index">{id}</span>}
          </li>
        )
      })}
    </ul>
  )
}

export function SectionsBlock({ sections }: { sections: Record<string, unknown> | unknown[] }) {
  if (Array.isArray(sections)) {
    return (
      <>
        {sections.map((section, i) => {
          if (!section || typeof section !== 'object') return null
          const s = section as { id?: string; title?: string; body?: string }
          return (
            <section key={s.id ?? i}>
              {s.title ? <h2>{s.title}</h2> : null}
              {s.body ? <p>{s.body}</p> : null}
            </section>
          )
        })}
      </>
    )
  }

  const entries = Object.entries(sections)
  if (!entries.length) return null

  return (
    <section>
      <h2>Details</h2>
      <div className="soa-wiki-table-wrap">
        <table className="soa-wiki-table">
          <thead>
            <tr>
              <th>Section</th>
              <th>Data</th>
            </tr>
          </thead>
          <tbody>
            {entries.map(([key, value]) => (
              <tr key={key}>
                <td style={{ textTransform: 'capitalize' }}>{key}</td>
                <td>
                  <pre
                    style={{
                      margin: 0,
                      whiteSpace: 'pre-wrap',
                      fontFamily: 'ui-monospace, SFMono-Regular, Menlo, monospace',
                      fontSize: '0.78rem',
                      color: '#cbd5e1',
                    }}
                  >
                    {JSON.stringify(value, null, 2)}
                  </pre>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </section>
  )
}
