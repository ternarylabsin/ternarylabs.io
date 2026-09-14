import type {
  WikiEntity,
  WikiIndex,
  WikiIndexEntry,
  WikiManifest,
  WikiMechanic,
  WikiVisibility,
} from './types'
import { CATEGORY_ORDER, WIKI_DATA_BASE } from './constants'

const cache = {
  index: null as Promise<WikiIndex> | null,
  manifest: null as Promise<WikiManifest> | null,
  entities: new Map<string, Promise<WikiEntity>>(),
  mechanics: new Map<string, Promise<WikiMechanic>>(),
}

async function fetchJson<T>(url: string): Promise<T> {
  const res = await fetch(url)
  if (!res.ok) {
    throw new Error(`Failed to load ${url} (${res.status})`)
  }
  return res.json() as Promise<T>
}

export function loadIndex(): Promise<WikiIndex> {
  if (!cache.index) {
    cache.index = fetchJson<WikiIndex>(`${WIKI_DATA_BASE}/generated/index.json`)
  }
  return cache.index
}

export function loadManifest(): Promise<WikiManifest> {
  if (!cache.manifest) {
    cache.manifest = fetchJson<WikiManifest>(`${WIKI_DATA_BASE}/generated/manifest.json`)
  }
  return cache.manifest
}

export async function loadEntityById(id: string): Promise<WikiEntity | null> {
  const index = await loadIndex()
  const entry = index.entities[id]
  if (!entry) return null
  return loadEntityByPath(entry.path)
}

export async function loadEntityBySlug(slug: string): Promise<WikiEntity | null> {
  const index = await loadIndex()
  const entry = Object.values(index.entities).find((e) => e.slug === slug)
  if (!entry) return null
  return loadEntityByPath(entry.path)
}

function loadEntityByPath(path: string): Promise<WikiEntity> {
  const key = path.replace(/\\/g, '/')
  let pending = cache.entities.get(key)
  if (!pending) {
    pending = fetchJson<WikiEntity>(`${WIKI_DATA_BASE}/generated/${key}`)
    cache.entities.set(key, pending)
  }
  return pending
}

export async function loadMechanicBySlug(slug: string): Promise<WikiMechanic | null> {
  const index = await loadIndex()
  const entry = Object.values(index.mechanics).find((m) => m.slug === slug)
  if (!entry) return null
  const key = entry.path.replace(/\\/g, '/')
  let pending = cache.mechanics.get(key)
  if (!pending) {
    pending = fetchJson<WikiMechanic>(`${WIKI_DATA_BASE}/generated/${key}`)
    cache.mechanics.set(key, pending)
  }
  return pending
}

export function entityVisibility(entry: WikiIndexEntry | WikiEntity): WikiVisibility {
  const raw =
    typeof entry.visibility === 'string'
      ? entry.visibility
      : entry.visibility && typeof entry.visibility === 'object'
        ? (entry.visibility as { wiki?: string }).wiki
        : undefined
  if (raw === 'technical' || raw === 'hidden' || raw === 'public') return raw
  return 'public'
}

export function listPublicEntities(index: WikiIndex): Array<WikiIndexEntry & { id: string }> {
  return Object.entries(index.entities)
    .map(([id, entry]) => ({ id, ...entry }))
    .filter((e) => entityVisibility(e) === 'public')
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function listEntitiesByType(
  index: WikiIndex,
  type: string,
  opts: { includeTechnical?: boolean } = {},
): Array<WikiIndexEntry & { id: string }> {
  return Object.entries(index.entities)
    .map(([id, entry]) => ({ id, ...entry }))
    .filter((e) => e.type === type)
    .filter((e) => opts.includeTechnical || entityVisibility(e) === 'public')
    .sort((a, b) => a.name.localeCompare(b.name))
}

export function typesWithPublicContent(index: WikiIndex): string[] {
  const present = new Set(
    listPublicEntities(index).map((e) => e.type),
  )
  const ordered = CATEGORY_ORDER.filter((t) => present.has(t))
  const extras = [...present].filter((t) => !CATEGORY_ORDER.includes(t as never)).sort()
  return [...ordered, ...extras]
}

export function listMechanics(index: WikiIndex) {
  return Object.entries(index.mechanics)
    .map(([id, entry]) => ({ id, ...entry }))
    .sort((a, b) => a.name.localeCompare(b.name))
}

/** Map Def repo texture path → public URL. */
export function textureUrl(repoPath: string | null | undefined): string | null {
  if (!repoPath) return null
  const normalized = repoPath.replace(/\\/g, '/')
  const stripped = normalized.replace(/^Textures\//i, '')
  return `${WIKI_DATA_BASE}/textures/${stripped}`
}

export function formatStatKey(key: string): string {
  return key
    .replace(/^SoA_/, '')
    .replace(/_/g, ' ')
    .replace(/([a-z])([A-Z])/g, '$1 $2')
    .replace(/\b\w/g, (c) => c.toUpperCase())
}

const PERCENT_STAT_RE =
  /ArmorRating|Insulation|Retention|Flammability|Factor|Chance|Offset|Multiplier/i

export function formatStatValue(value: unknown, key?: string): string {
  if (value === null || value === undefined) return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'number') {
    if (key && PERCENT_STAT_RE.test(key) && Math.abs(value) <= 2) {
      const pct = value * 100
      return `${Number.isInteger(pct) ? pct : Math.round(pct * 10) / 10}%`
    }
    if (Number.isInteger(value)) return String(value)
    return String(Math.round(value * 1000) / 1000)
  }
  if (typeof value === 'string') return value
  if (Array.isArray(value)) return value.map((v) => formatStatValue(v, key)).join(', ')
  if (typeof value === 'object') {
    return Object.entries(value as Record<string, unknown>)
      .map(([k, v]) => `${formatStatKey(k)}: ${formatStatValue(v, k)}`)
      .join('; ')
  }
  return String(value)
}

export function searchEntities(
  index: WikiIndex,
  query: string,
  opts: { includeTechnical?: boolean } = {},
): Array<WikiIndexEntry & { id: string }> {
  const q = query.trim().toLowerCase()
  if (!q) return []
  const pool = opts.includeTechnical
    ? Object.entries(index.entities).map(([id, entry]) => ({ id, ...entry }))
    : listPublicEntities(index)
  return pool
    .filter(
      (e) =>
        e.name.toLowerCase().includes(q) ||
        e.slug.toLowerCase().includes(q) ||
        e.id.toLowerCase().includes(q) ||
        e.type.toLowerCase().includes(q),
    )
    .slice(0, 60)
}

export function resolveEntityName(index: WikiIndex, id: string): string {
  return index.entities[id]?.name ?? id
}

export function resolveEntitySlug(index: WikiIndex, id: string): string | null {
  return index.entities[id]?.slug ?? null
}

export function resolveMechanicSlug(index: WikiIndex, id: string): string | null {
  return index.mechanics[id]?.slug ?? null
}
