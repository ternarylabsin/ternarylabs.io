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

export interface WikiIndexEntry {
  name: string
  path: string
  slug: string
  type: WikiEntityType | string
  visibility: WikiVisibility | string
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

export interface WikiManifest {
  schemaVersion: string
  generatedAtUtc: string
  generator: { name: string; version: string }
  repository: { name: string; branch: string; commit: string }
  rimworld: { supportedVersion: string; supportedVersions: string[] }
  counts: {
    entities: number
    publicEntities: number
    technicalEntities: number
    hiddenEntities: number
    mechanics: number
  }
}

export interface WikiAssetRef {
  kind?: string
  repoPath: string
  width?: number
  height?: number
  variant?: string
  bodyType?: string
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
  assets: {
    primary: WikiAssetRef | null
    variants: WikiAssetRef[]
    variantGroups: Record<string, unknown>
  }
  stats: {
    raw: Record<string, unknown>
    resolved?: Record<string, unknown>
    derived: Record<string, WikiDerivedStat | unknown>
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

export interface WikiDerivedStat {
  formula?: string
  inputs?: Record<string, unknown>
  value?: unknown
}

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
  sections: WikiMechanicSection[]
  relatedEntities: string[]
  stats?: {
    raw?: Record<string, unknown>
    derived?: Record<string, WikiDerivedStat | unknown>
  }
  notes?: string[]
  source?: WikiEntity['source']
}
