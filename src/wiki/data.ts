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
  // Generated JSON keeps stable URLs across releases; revalidate on page load.
  const res = await fetch(url, { cache: 'no-cache' })
  if (!res.ok) {
    throw new Error(`Failed to load ${url} (${res.status})`)
  }
  return res.json() as Promise<T>
}

export function loadIndex(): Promise<WikiIndex> {
  if (!cache.index) {
    cache.index = fetchJson<WikiIndex>(`${WIKI_DATA_BASE}/generated/index.json`).catch((error) => {
      cache.index = null
      throw error
    })
  }
  return cache.index
}

export function loadManifest(): Promise<WikiManifest> {
  if (!cache.manifest) {
    cache.manifest = fetchJson<WikiManifest>(`${WIKI_DATA_BASE}/generated/manifest.json`).catch((error) => {
      cache.manifest = null
      throw error
    })
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
  const matches = Object.values(index.entities).filter((e) => e.slug === slug)
  const entry = matches.find((e) => entityVisibility(e) === 'public') ?? matches[0]
  if (!entry) return null
  return loadEntityByPath(entry.path)
}

function loadEntityByPath(path: string): Promise<WikiEntity> {
  const key = path.replace(/\\/g, '/')
  let pending = cache.entities.get(key)
  if (!pending) {
    pending = fetchJson<WikiEntity>(`${WIKI_DATA_BASE}/generated/${key}`).catch((error) => {
      cache.entities.delete(key)
      throw error
    })
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
    pending = fetchJson<WikiMechanic>(`${WIKI_DATA_BASE}/generated/${key}`).catch((error) => {
      cache.mechanics.delete(key)
      throw error
    })
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

export function displaySectionTitle(
  key: string,
  sectionTitles?: Record<string, string>,
): string {
  return sectionTitles?.[key] ?? formatStatKey(key)
}

/** Pull the player-facing number out of a v1.1 `{ value, source }` wrapper. */
export function unwrapStat(value: unknown): unknown {
  if (
    value &&
    typeof value === 'object' &&
    !Array.isArray(value) &&
    'value' in (value as object)
  ) {
    return (value as { value: unknown }).value
  }
  return value
}

const PERCENT_STAT_RE =
  /ArmorRating|Retention|Flammability|Factor|Chance|Multiplier/i

const UNIT_LABELS: Record<string, string> = {
  C: '°C', kg: 'kg', hp: 'HP', work: 'work', count: '', hpPerDay: 'HP/day',
  solari: 'solari', s: 's', W: 'W', itemsPerDay: 'items/day',
  damagePerSecond: 'damage/s', leather: 'leather', meat: 'meat',
  SoA_WaterRation: 'water rations', SoA_WaterRationPerItem: 'water rations/item',
  profile: '', 'c/s': 'cells/s', bodySize: '', multiplier: '×',
  SoA_RawSpicePerWork: 'raw spice/work', days: 'days', needPerDay: 'need/day', fraction: '',
}

export function formatStatValue(value: unknown, key?: string): string {
  const unit = value && typeof value === 'object' && 'unit' in value && typeof value.unit === 'string'
    ? value.unit : key && /^Insulation_(Cold|Heat)$/.test(key) ? 'C' : undefined
  value = unwrapStat(value)
  if (value === null || value === undefined) return '—'
  if (typeof value === 'boolean') return value ? 'Yes' : 'No'
  if (typeof value === 'number') {
    if (unit === 'percent' || (!unit && key && PERCENT_STAT_RE.test(key))) {
      const pct = value * 100
      if (pct !== 0 && Math.abs(pct) < 0.1) return `${Number(pct.toPrecision(3))}%`
      return `${Number.isInteger(pct) ? pct : Math.round(pct * 10) / 10}%`
    }
    const number = Number.isInteger(value) ? String(value)
      : value !== 0 && Math.abs(value) < 0.001 ? String(Number(value.toPrecision(3)))
        : String(Math.round(value * 1000) / 1000)
    const label = unit ? UNIT_LABELS[unit] ?? unit : ''
    return label ? `${number}${label === '°C' || label === '×' ? '' : ' '}${label}` : number
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

export function splitParagraphs(text: string): string[] {
  return text
    .split(/\n\s*\n/g)
    .map((part) => part.trim())
    .filter(Boolean)
}

export function pickStatValue(
  stats: {
    raw?: Record<string, unknown>
    resolved?: Record<string, unknown>
    derived?: Record<string, unknown>
  } | undefined,
  key: string,
): unknown {
  if (!stats) return undefined
  return stats.derived?.[key] ?? stats.resolved?.[key] ?? stats.raw?.[key]
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
