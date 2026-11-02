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
  pawn: 'People',
  faction: 'Factions',
  biome: 'Biomes',
  research: 'Research',
  trait: 'Traits',
  hediff: 'Conditions',
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

export const CATEGORY_DESCRIPTIONS: Record<string, string> = {
  apparel: 'Desert clothing conserves water, while armor protects against weapons. Compare coverage, weight and the equipment that can be worn together.',
  weapon: 'From Fremen blades to Imperial beams, each weapon changes how a fight is approached. Active shields make speed, skill and firing lines matter.',
  item: 'Food, water, spice and workshop supplies keep the settlement working. Learn where goods come from and which stores are consumed by daily life.',
  building: 'Collectors, rooms and workshops turn shelter beneath the stone into a working sietch. Plan their siting, supplies and power before expanding.',
  plant: 'Reclaimed crops feed and equip the settlement; sparse wild plants offer smaller harvests. Irrigation and growing conditions govern what survives.',
  animal: 'The native animals of Arrakis offer transport, food and other small resources. Kept animals need fodder and drinking water of their own.',
  pawn: 'Travelers, fighters and commercial agents bring the societies of Arrakis into the colony’s path. Their roles shape equipment and encounters.',
  faction: 'Fremen communities, Imperial forces and trading institutions compete and exchange goods across the desert. Relations influence access to supplies.',
  biome: 'Open dunes, rocky basins and escarpments offer different prospects for shelter, travel and work. Inspect the ground before trusting it as refuge.',
  research: 'Research opens new equipment and production methods. Every discovery still needs materials, skilled work and the facilities to put it to use.',
  trait: 'Personal upbringing and temperament influence how a survivor lives and works on Arrakis.',
  hediff: 'Dehydration, melange exposure and other conditions affect health and daily life. Learn what causes them and which supplies or care they require.',
  trader: 'Caravans and settled factors exchange finite stocks of goods. Their inventories connect the sietch to supplies it cannot gather or manufacture nearby.',
  scenario: 'Choose the opening conditions of a colony. The Fremen sietch start provides desert knowledge and a limited reserve from which to build.',
  culture: 'The lives and backgrounds of Fremen, Imperial and smuggler people reflect the societies that raised them.',
  terrain: 'The ground beneath a work site determines more than its appearance. Sand remains exposed to the Maker; genuine rock offers refuge.',
  recipe: 'Production bills transform physical supplies into useful goods. Check ingredients, work, research and the intended workstation before beginning.',
  incident: 'Spice blows, travelers and discoveries interrupt the colony’s routine with opportunities and new demands.',
  need: 'Water and melange reserves connect personal survival to the supplies the settlement can keep on hand.',
  skill: 'Practice and experience determine how effectively a survivor can meet the demands of Arrakis.',
  song: 'The peaceful music of Sands of Arrakis accompanies ordinary life in the settlement.',
  sound: 'Sound cues help identify activity and danger in the desert.',
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

/** Sidebar + infobox collapse below this width (matches wiki.css). */
export const WIKI_NAV_BREAK_PX = 1100
export const WIKI_NAV_BREAK_QUERY = `(max-width: ${WIKI_NAV_BREAK_PX - 1}px)`
export const WIKI_PHONE_QUERY = '(max-width: 640px)'
