import { Link } from 'react-router-dom'
import type { WikiIndexEntry } from '../types'
import { textureUrl } from '../data'
import { categoryLabel, wikiPath } from '../constants'
import { useEffect, useState } from 'react'

async function peekPrimaryIcon(path: string): Promise<string | null> {
  try {
    const res = await fetch(`${import.meta.env.BASE_URL}wiki/soa/generated/${path}`)
    if (!res.ok) return null
    const json = (await res.json()) as { assets?: { primary?: { repoPath?: string } } }
    return textureUrl(json.assets?.primary?.repoPath)
  } catch {
    return null
  }
}

export function EntityCard({
  entry,
}: {
  entry: WikiIndexEntry & { id: string }
}) {
  const [icon, setIcon] = useState<string | null>(null)

  useEffect(() => {
    let alive = true
    peekPrimaryIcon(entry.path).then((url) => {
      if (alive) setIcon(url)
    })
    return () => {
      alive = false
    }
  }, [entry.path])

  return (
    <Link to={wikiPath(entry.slug)} className="soa-wiki-card">
      <div className="soa-wiki-card-icon">
        {icon ? <img src={icon} alt="" /> : <span>{entry.type.slice(0, 3)}</span>}
      </div>
      <div>
        <strong>{entry.name}</strong>
        <em>{categoryLabel(entry.type)}</em>
      </div>
    </Link>
  )
}

export function EntityCardGrid({
  entries,
}: {
  entries: Array<WikiIndexEntry & { id: string }>
}) {
  if (entries.length === 0) {
    return <p className="soa-wiki-empty">No entries in this category yet.</p>
  }
  return (
    <div className="soa-wiki-grid">
      {entries.map((entry) => (
        <EntityCard key={entry.id} entry={entry} />
      ))}
    </div>
  )
}
