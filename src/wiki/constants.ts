import type { WikiEntityType } from './types'

/** Hash route base for the SoA wiki. */
export const WIKI_BASE = '/sandsofarrakiswiki'

export const WIKI_TITLE = 'Sands of Arrakis Wiki'

/** Public JSON + texture bundle under /public/wiki/soa */
export const WIKI_DATA_BASE = `${import.meta.env.BASE_URL}wiki/soa`

/** Mod-manager icon and Steam/Workshop banner, synced from About/. */
export const WIKI_MOD_ICON = `${WIKI_DATA_BASE}/branding/ModIcon.png`
export const WIKI_MOD_BANNER = `${WIKI_DATA_BASE}/branding/Preview.png`

export const CATEGORY_ORDER: WikiEntityType[] = [
  'apparel',
  'weapon',
  'item',
  'building',
  'plant',
  'animal',
  'pawn',
  'faction',
  'biome',
  'research',
  'trait',
  'hediff',
  'trader',
  'scenario',
  'culture',
  'terrain',
  'recipe',
  'incident',
  'need',
  'skill',
  'song',
  'sound',
  'other',
]

export const CATEGORY_LABELS: Record<string, string> = {
  apparel: 'Apparel',
  weapon: 'Weapons',
  item: 'Items',
  building: 'Buildings',
  plant: 'Plants',
  animal: 'Animals',
  pawn: 'Pawns',
  faction: 'Factions',
  biome: 'Biomes',
  research: 'Research',
  trait: 'Traits',
  hediff: 'Hediffs',
  trader: 'Traders',
  scenario: 'Scenarios',
  culture: 'Cultures',
  terrain: 'Terrain',
  recipe: 'Recipes',
  incident: 'Incidents',
  need: 'Needs',
  skill: 'Skills',
  song: 'Songs',
  sound: 'Sounds',
  other: 'Other',
}

export function categoryLabel(type: string): string {
  return CATEGORY_LABELS[type] ?? type.charAt(0).toUpperCase() + type.slice(1)
}

export function wikiPath(...parts: string[]): string {
  const cleaned = parts
    .filter(Boolean)
    .map((p) => p.replace(/^\/+|\/+$/g, ''))
    .join('/')
  return cleaned ? `${WIKI_BASE}/${cleaned}` : WIKI_BASE
}
