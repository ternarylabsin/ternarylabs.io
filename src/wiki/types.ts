export type WikiVisibility = 'public' | 'technical' | 'hidden'

export type WikiEntityType =
  | 'item'
  | 'weapon'
  | 'apparel'
  | 'building'
  | 'plant'
  | 'animal'
  | 'pawn'
  | 'faction'
  | 'biome'
  | 'research'
  | 'trait'
  | 'hediff'
  | 'need'
  | 'skill'
  | 'incident'
  | 'recipe'
  | 'terrain'
  | 'song'
  | 'sound'
  | 'scenario'
  | 'culture'
  | 'trader'
  | 'other'

export type StatSourceType =
  | 'SoADef'
  | 'SoAParent'
  | 'CoreParent'
  | 'CoreStatDefault'
  | 'ThingDefDefault'
  | string

export interface WikiIndexEntry {
  name: string
  path: string
  slug: string
  type: WikiEntityType | string
  visibility: WikiVisibility | string
  searchable?: boolean
  inCatalog?: boolean
}

export interface WikiMechanicIndexEntry {
  name: string
  path: string
  slug: string
}

export interface WikiIndex {
  schemaVersion: string
  entities: Record<string, WikiIndexEntry>
  mechanics: Record<string, WikiMechanicIndexEntry>
}

export interface WikiCatalogEntity {
  id: string
  name: string
  path: string
  slug: string
  subtype: string | null
}

export interface WikiCatalogCategory {
  id: string
  label: string
  entityType: string
  count: number
  nav: boolean
  entities: WikiCatalogEntity[]
}

export interface WikiCatalog {
  schemaVersion?: string
  categories: WikiCatalogCategory[]
}

export interface WikiManifest {
  schemaVersion: string
  generatedAtUtc: string
  generator: { name: string; version: string }
  repository: { name: string; branch: string; commit: string }
  rimworld: {
    supportedVersion: string
    supportedVersions: string[]
    coreDefaults?: { note?: string; resolver?: string; version?: string }
  }
  counts: {
    entities: number
    publicEntities: number
    technicalEntities: number
    hiddenEntities: number
    mechanics: number
    catalogEntities?: number
  }
  frozen?: boolean
}

export interface WikiAssetRef {
  kind?: string
  repoPath: string
  width?: number
  height?: number
  variant?: string
  bodyType?: string
}

export interface WikiDisplayHints {
  featuredStats?: string[]
  preferredAsset?: string | null
  preferredUnits?: Record<string, string>
  searchable?: boolean
  sectionOrder?: string[]
  sectionTitles?: Record<string, string>
}

export interface WikiStatSource {
  type?: StatSourceType
  def?: string
}

export interface WikiStatEntry {
  value: unknown
  source?: string | WikiStatSource
  unit?: string
  type?: string
  formula?: string
  inputs?: Record<string, unknown>
  sourceNotes?: string
}

export interface WikiEntity {
  schemaVersion: string
  id: string
  type: WikiEntityType | string
  subtype: string | null
  slug: string
  name: string
  summary: string
  description: string
  display?: WikiDisplayHints
  assets: {
    primary: WikiAssetRef | null
    variants: WikiAssetRef[]
    variantGroups: Record<string, unknown>
  }
  stats: {
    raw: Record<string, WikiStatEntry | unknown>
    resolved?: Record<string, WikiStatEntry | unknown>
    derived: Record<string, WikiStatEntry | unknown>
  }
  sections: Record<string, unknown> | unknown[]
  relationships: {
    builds?: string[]
    craftedAt?: string[]
    drops?: string[]
    harvests?: string[]
    recipes?: string[]
    relatedEntities?: string[]
    relatedMechanics?: string[]
    research?: string[]
    spawnsIn?: string[]
    usedBy?: string[]
  }
  availability: {
    naturallySpawning: boolean | null
    playerBuildable: boolean | null
    playerCraftable: boolean | null
    tradeable: boolean | null
  }
  visibility: WikiVisibility | { wiki?: WikiVisibility | string } | string
  source: {
    defs?: Array<{ defName?: string; kind?: string; path?: string }>
    code?: Array<{ path: string; purpose?: string }>
    patches?: Array<{ path: string; purpose?: string }>
  }
  notes?: string[]
  warnings?: string[]
}

export interface WikiDerivedStat extends WikiStatEntry {}

export interface WikiMechanicSection {
  id: string
  title: string
  body: string
}

export interface WikiMechanic {
  schemaVersion: string
  id: string
  slug: string
  name: string
  summary?: string
  type?: string
  display?: WikiDisplayHints
  sections: WikiMechanicSection[]
  relatedEntities: string[]
  stats?: {
    raw?: Record<string, WikiStatEntry | unknown>
    resolved?: Record<string, WikiStatEntry | unknown>
    derived?: Record<string, WikiStatEntry | unknown>
  }
  notes?: string[]
  source?: WikiEntity['source']
}
