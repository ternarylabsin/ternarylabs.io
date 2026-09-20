import { wikiPath } from './constants'

export type RoadmapStatus =
  | 'implemented'
  | 'engineering'
  | 'next'
  | 'planned'
  | 'concept'
  | 'far-future'

export type RoadmapIconName =
  | 'arrakis'
  | 'desert'
  | 'ritual'
  | 'crown'
  | 'dna'
  | 'eye'
  | 'orbit'

export interface RoadmapLink {
  label: string
  to: string
}

export interface RoadmapNode {
  id: string
  slug: string
  title: string
  shortTitle: string
  subtitle: string
  category: string
  description: string
  status: RoadmapStatus
  icon: RoadmapIconName
  rimworldLayer: string
  rimworldDlc?: string
  networkArea: 'core' | 'desert' | 'ways' | 'houses' | 'bloodlines' | 'prescience' | 'beyond'
  keySystems: string[]
  dependencies?: string[]
  unlocks?: string[]
  related?: string[]
  currentNotes: string[]
  wikiLinks?: RoadmapLink[]
}

export interface RoadmapPhase {
  phase: number
  title: string
  focus: string
  summary: string
  statusLabel?: string
  current?: boolean
}

export interface RoadmapCrossover {
  id: string
  title: string
  layers: string[]
  summary: string
  systems: string[]
}

export interface RoadmapSystemFamily {
  id: string
  title: string
  nodeId: string
  status: RoadmapStatus
  summary: string
}

export interface RoadmapFutureWorld {
  id: string
  title: string
  summary: string
}

export const ROADMAP_STATUS_META: Record<
  RoadmapStatus,
  { label: string; tone: string; description: string }
> = {
  implemented: {
    label: 'Implemented',
    tone: 'implemented',
    description: 'Playable now and present in current Sands of Arrakis builds.',
  },
  engineering: {
    label: 'Engineering',
    tone: 'engineering',
    description: 'Actively being implemented, integrated, or validated.',
  },
  next: {
    label: 'Next',
    tone: 'next',
    description: 'Approved as an upcoming development slice after current priorities.',
  },
  planned: {
    label: 'Planned',
    tone: 'planned',
    description: 'Part of the intended roadmap but not yet actively scheduled.',
  },
  concept: {
    label: 'Concept',
    tone: 'concept',
    description: 'Direction is understood, but the final gameplay shape is still exploratory.',
  },
  'far-future': {
    label: 'Far Future',
    tone: 'far-future',
    description: 'Long-range ambition that depends on major earlier layers maturing first.',
  },
}

export const ROADMAP_CORE_NODE: RoadmapNode = {
  id: 'arrakis-core',
  slug: 'arrakis-core',
  title: 'Arrakis Core',
  shortTitle: 'Arrakis Core',
  subtitle: 'A World of Survival and Opportunity',
  category: 'Project Direction',
  description:
    'Sands of Arrakis grows outward from a harsh survival conversion on Arrakis into an increasingly political, cultural, biological, and prescient Dune sandbox.',
  status: 'engineering',
  icon: 'arrakis',
  rimworldLayer: 'All roadmap layers',
  networkArea: 'core',
  keySystems: [
    'Water pressure and reclamation',
    'Spice blows and harvesting risk',
    'Sandworm threat shaping movement and settlement',
    'Faction identity tied to geography, scarcity, and power',
  ],
  unlocks: [
    'The Desert Planet foundation',
    'DLC-backed expansion layers',
    'Imperium-scale political and prescient systems',
  ],
  related: [
    'The Desert Planet',
    'Ways of the Desert',
    'The Great Houses',
    'Bloodlines of the Imperium',
    'The Prescient Path',
    'Beyond the Shield Wall',
  ],
  currentNotes: [
    'The live wiki already exposes the current mechanics and content foundation for water, spice, sandworms, sandwalking, and Arrakis world generation.',
    'This roadmap page is intended to explain how those playable foundations expand into a larger total-conversion architecture.',
  ],
  wikiLinks: [
    { label: 'Wiki main page', to: wikiPath() },
    { label: 'Arrakis world', to: wikiPath('mechanics', 'arrakis-world') },
    { label: 'Spice', to: wikiPath('mechanics', 'spice') },
  ],
}

export const ROADMAP_BRANCHES: RoadmapNode[] = [
  {
    id: 'desert-planet',
    slug: 'desert-planet',
    title: 'The Desert Planet',
    shortTitle: 'The Desert Planet',
    subtitle: 'Survival, ecology, spice, worms, and the rules of Arrakis',
    category: 'Foundation Systems',
    description:
      'This is the required foundation of the entire conversion: Arrakis must feel dangerous, scarce, and strategically distinct even for players with no RimWorld DLC installed.',
    status: 'implemented',
    icon: 'desert',
    rimworldLayer: 'Core',
    rimworldDlc: 'Base game',
    networkArea: 'desert',
    keySystems: [
      'Water economy and stillsuits',
      'Heat and exposure management',
      'Spice blows, harvesting, and trade value',
      'Sandworms, open-sand risk, and settlement geography',
      'Baseline factions, structures, weapons, and survival loop',
    ],
    unlocks: ['Culture-native settlements', 'Political conflict over spice', 'Advanced travel and harvesting'],
    related: ['Ways of the Desert', 'Beyond the Shield Wall'],
    currentNotes: [
      'Current playable systems already include water mechanics, spice extraction, Arrakis biomes, sandwalking, and sandworm pressure.',
      'The roadmap focus is to complete Arrakis before broadening the conversion into Imperium-scale systems.',
    ],
    wikiLinks: [
      { label: 'Water', to: wikiPath('mechanics', 'water') },
      { label: 'Sandworms', to: wikiPath('mechanics', 'sandworms') },
      { label: 'Spice', to: wikiPath('mechanics', 'spice') },
      { label: 'Arrakis world', to: wikiPath('mechanics', 'arrakis-world') },
    ],
  },
  {
    id: 'ways-of-the-desert',
    slug: 'ways-of-the-desert',
    title: 'Ways of the Desert',
    shortTitle: 'Ways of the Desert',
    subtitle: 'Fremen survival culture, ritual, identity, and belief',
    category: 'Culture and Social Identity',
    description:
      'Ideology becomes the framework for making Arrakis cultures feel mechanically distinct, from Fremen water discipline to House-specific customs and rites.',
    status: 'engineering',
    icon: 'ritual',
    rimworldLayer: 'Ideology',
    rimworldDlc: 'RimWorld - Ideology',
    networkArea: 'ways',
    keySystems: [
      'Water discipline and communal expectations',
      'Crysknife tradition and desert reverence',
      'Sietch loyalty, Naibs, and Fremen rituals',
      'House and smuggler cultural identity',
      'Ceremonies like funeral water reclamation and Water of Life rites',
    ],
    dependencies: ['The Desert Planet'],
    unlocks: ['Fremen-native progression', 'Culture-driven faction behavior', 'Ritual hooks for prescient systems'],
    related: ['The Desert Planet', 'The Great Houses', 'The Prescient Path'],
    currentNotes: [
      'This layer turns survival facts such as water scarcity and spice dependence into social law, ritual, and prestige.',
      'The Fremen experience should differ mechanically from Imperial or smuggler life rather than existing as flavor text alone.',
    ],
  },
  {
    id: 'great-houses',
    slug: 'great-houses',
    title: 'The Great Houses',
    shortTitle: 'The Great Houses',
    subtitle: 'Power, politics, patronage, and the struggle for Arrakis',
    category: 'Political Systems',
    description:
      'Royalty becomes the skeleton for feudal politics on Arrakis, with House allegiance, Imperial standing, Landsraad pressure, favors, and competing patrons.',
    status: 'next',
    icon: 'crown',
    rimworldLayer: 'Royalty',
    rimworldDlc: 'RimWorld - Royalty',
    networkArea: 'houses',
    keySystems: [
      'House allegiance and faction reputation',
      'Imperial standing and noble obligations',
      'Political favors replacing vanilla permits',
      'Landsraad disputes, CHOAM leverage, and Sardaukar intervention',
      'Settlement infrastructure that reflects status and diplomacy',
    ],
    dependencies: ['The Desert Planet', 'Ways of the Desert'],
    unlocks: ['Dynastic campaigns', 'Guild-backed travel leverage', 'Imperium-scale endgame outcomes'],
    related: ['Ways of the Desert', 'Bloodlines of the Imperium', 'Beyond the Shield Wall'],
    currentNotes: [
      'The political fantasy begins once a colony is more than a remote survival outpost and becomes a meaningful actor in the spice economy.',
      'Power should bring obligations, enemies, and ceremony instead of acting like a simple reward track.',
    ],
  },
  {
    id: 'bloodlines',
    slug: 'bloodlines',
    title: 'Bloodlines of the Imperium',
    shortTitle: 'Bloodlines',
    subtitle: 'Dynasties, Bene Gesserit design, and engineered humanity',
    category: 'Generational and Biological Systems',
    description:
      'Biotech becomes the vehicle for dynasties, heirs, Bene Gesserit bloodline programs, Tleilaxu experiments, and Dune-style human specialization.',
    status: 'planned',
    icon: 'dna',
    rimworldLayer: 'Biotech',
    rimworldDlc: 'RimWorld - Biotech',
    networkArea: 'bloodlines',
    keySystems: [
      'Children, heirs, succession, and dynastic identity',
      'Bene Gesserit bloodline tracking and political pressure',
      'Mentats, Suk doctors, and specialized human disciplines',
      'Gholas, Face Dancers, and Tleilaxu biology',
      'Forbidden or politically dangerous machine-adjacent technology',
    ],
    dependencies: ['The Great Houses'],
    unlocks: ['Long-term family campaigns', 'Prescient bloodline arcs', 'High-level political inheritance'],
    related: ['The Great Houses', 'The Prescient Path'],
    currentNotes: [
      'This layer is about making long campaigns feel generational, political, and embodied rather than just wider in content count.',
      'The human body should feel like technology in the Imperium, but never in a way that breaks Dune tone.',
    ],
  },
  {
    id: 'prescient-path',
    slug: 'prescient-path',
    title: 'The Prescient Path',
    shortTitle: 'The Prescient Path',
    subtitle: 'Prescience, Other Memory, and dangerous consciousness',
    category: 'Consciousness and Mysticism',
    description:
      'Anomaly becomes the strange inner edge of Dune: spice visions, Reverend Mothers, ancestral memory, abomination, and forbidden knowledge.',
    status: 'concept',
    icon: 'eye',
    rimworldLayer: 'Anomaly',
    rimworldDlc: 'RimWorld - Anomaly',
    networkArea: 'prescience',
    keySystems: [
      'Spice visions and uncertain future knowledge',
      'Other Memory and ancestral voices',
      'Water of Life transformation and Reverend Mothers',
      'Abomination and identity instability',
      'Containment and study of dangerous Dune-specific knowledge',
    ],
    dependencies: ['Ways of the Desert', 'Bloodlines of the Imperium'],
    unlocks: ['Rare campaign-defining storylines', 'Advanced Bene Gesserit outcomes', 'The far edge of Dune consciousness systems'],
    related: ['Ways of the Desert', 'Bloodlines of the Imperium'],
    currentNotes: [
      'This branch should stay grounded in Dune rather than becoming a generic supernatural horror layer.',
      'Prescience is most interesting when it creates pressure, ambiguity, and consequence instead of exact future spoilers.',
    ],
  },
  {
    id: 'beyond-shield-wall',
    slug: 'beyond-shield-wall',
    title: 'Beyond the Shield Wall',
    shortTitle: 'Beyond the Shield Wall',
    subtitle: 'Mobility, expeditions, harvesters, and eventual offworld travel',
    category: 'Travel and Scale',
    description:
      'Odyssey becomes the mobility framework for ornithopters, deep desert expeditions, industrial spice operations, worm riding, and eventually the wider Imperium.',
    status: 'far-future',
    icon: 'orbit',
    rimworldLayer: 'Odyssey',
    rimworldDlc: 'RimWorld - Odyssey',
    networkArea: 'beyond',
    keySystems: [
      'Ornithopters and rapid deployment',
      'Carryalls, harvesters, and large-scale spice extraction',
      'Deep desert expeditions and remote operations',
      'Worm riding as advanced Fremen mobility',
      'Guild-controlled transport and future offworld routes',
    ],
    dependencies: ['The Desert Planet', 'The Great Houses'],
    unlocks: ['Imperial movement systems', 'Remote desert stories', 'Future worlds beyond Arrakis'],
    related: ['The Desert Planet', 'Ways of the Desert', 'The Great Houses'],
    currentNotes: [
      'This branch matters because Dune is as much about controlling movement through danger as it is about controlling territory.',
      'Offworld travel only makes sense after Arrakis itself becomes rich enough to deserve leaving and returning to.',
    ],
  },
]

export const ROADMAP_NODES: RoadmapNode[] = [ROADMAP_CORE_NODE, ...ROADMAP_BRANCHES]

export const ROADMAP_NODE_BY_ID = Object.fromEntries(
  ROADMAP_NODES.map((node) => [node.id, node]),
) as Record<string, RoadmapNode>

export const ROADMAP_PHASES: RoadmapPhase[] = [
  {
    phase: 1,
    title: 'Complete Arrakis',
    focus: 'The Desert Planet',
    summary:
      'Finish the world generation, water, spice, worm, faction, weapon, structure, and survival loop required for a real Arrakis sandbox.',
    statusLabel: 'Current Foundation',
    current: true,
  },
  {
    phase: 2,
    title: 'Living World',
    focus: 'The Desert Planet + Ways of the Desert',
    summary:
      'Make Arrakis feel inhabited through richer wildlife, sietches, faction presence, rituals, ecology, and regional differentiation.',
  },
  {
    phase: 3,
    title: 'The Imperium',
    focus: 'The Great Houses',
    summary:
      'Open the political layer with House allegiance, Imperial standing, Landsraad pressure, CHOAM, the Guild, and faction-backed conflict.',
  },
  {
    phase: 4,
    title: 'Masters of the Desert',
    focus: 'Ways of the Desert + Beyond the Shield Wall',
    summary:
      'Expand Fremen identity, desert mobility, spice operations, expeditions, and the contrast between Imperial and native travel.',
  },
  {
    phase: 5,
    title: 'Human Evolution',
    focus: 'Bloodlines of the Imperium',
    summary:
      'Introduce dynasties, heirs, Bene Gesserit influence, Tleilaxu systems, Mentats, and long-campaign biological specialization.',
  },
  {
    phase: 6,
    title: 'The Prescient Unknown',
    focus: 'The Prescient Path',
    summary:
      'Bring in prescience, Other Memory, Water of Life outcomes, dangerous knowledge, and the stranger interior systems of Dune.',
  },
]

export const ROADMAP_CROSSOVERS: RoadmapCrossover[] = [
  {
    id: 'houses-desert-ways',
    title: 'The Great Houses + Ways of the Desert',
    layers: ['Royalty', 'Ideology'],
    summary:
      'Political authority becomes cultural obligation through House ritual, noble expectation, faction identity, and ceremonial power.',
    systems: [
      'House-specific traditions',
      'Imperial ceremony',
      'Faction ritual',
      'Status-driven social behavior',
    ],
  },
  {
    id: 'bloodlines-prescience',
    title: 'Bloodlines + Prescience',
    layers: ['Biotech', 'Anomaly'],
    summary:
      'Inherited spice sensitivity, ancestral memory, and dangerous lineage outcomes turn genetics into narrative destiny.',
    systems: [
      'Other Memory',
      'Abomination',
      'Prescient bloodlines',
      'Bene Gesserit lineage arcs',
    ],
  },
  {
    id: 'odyssey-core',
    title: 'Beyond the Shield Wall + The Desert Planet',
    layers: ['Odyssey', 'Core'],
    summary:
      'Large-scale movement systems deepen spice extraction and deep-desert survival instead of replacing Arrakis risk.',
    systems: [
      'Ornithopters',
      'Carryalls',
      'Harvester runs',
      'Remote desert operations',
      'Worm riding',
    ],
  },
  {
    id: 'all-dlcs',
    title: 'All Layers Together',
    layers: ['All DLCs'],
    summary:
      'The full vision is a unified Dune campaign where ecology, politics, bloodlines, culture, prescience, and travel all influence one another.',
    systems: [
      'Dynastic political campaigns',
      'Fremen culture meets noble status',
      'Guild transport under spice pressure',
      'Unified Imperium storylines',
    ],
  },
]

export const ROADMAP_SYSTEMS: RoadmapSystemFamily[] = [
  {
    id: 'water',
    title: 'Water',
    nodeId: 'desert-planet',
    status: 'implemented',
    summary: 'The defining strategic scarcity of Arrakis: survival, settlement planning, diplomacy, and future culture all begin here.',
  },
  {
    id: 'spice',
    title: 'Spice',
    nodeId: 'desert-planet',
    status: 'engineering',
    summary: 'Melange is the economic, political, and prescient center of the total conversion.',
  },
  {
    id: 'sandworms',
    title: 'Sandworms',
    nodeId: 'desert-planet',
    status: 'engineering',
    summary: 'Shai-Hulud shapes movement, extraction, and fear across Arrakis instead of acting like a conventional animal.',
  },
  {
    id: 'world-generation',
    title: 'World Generation',
    nodeId: 'desert-planet',
    status: 'engineering',
    summary: 'Biomes, shield walls, rocky basins, and geography define the strategic map before any colony is founded.',
  },
  {
    id: 'desert-travel',
    title: 'Desert Travel',
    nodeId: 'beyond-shield-wall',
    status: 'next',
    summary: 'Crossing Arrakis should remain risky and meaningful even as mobility options expand.',
  },
  {
    id: 'fremen-culture',
    title: 'Fremen Culture',
    nodeId: 'ways-of-the-desert',
    status: 'engineering',
    summary: 'Belief, survival law, community obligation, and ritual transform scarcity into lived identity.',
  },
  {
    id: 'great-houses-system',
    title: 'Great Houses',
    nodeId: 'great-houses',
    status: 'next',
    summary: 'Arrakis becomes contested ground once House power, favors, and rivalry can reach into colony life.',
  },
  {
    id: 'landsraad',
    title: 'Landsraad',
    nodeId: 'great-houses',
    status: 'planned',
    summary: 'Formal politics, sanctioned disputes, and House relationships turn influence into a strategic resource.',
  },
  {
    id: 'choam',
    title: 'CHOAM',
    nodeId: 'great-houses',
    status: 'planned',
    summary: 'Spice wealth, trade privilege, and corporate power tie the colony economy into the Imperium.',
  },
  {
    id: 'spacing-guild',
    title: 'Spacing Guild',
    nodeId: 'beyond-shield-wall',
    status: 'far-future',
    summary: 'Travel, leverage, and denial of passage make movement itself a political weapon.',
  },
  {
    id: 'bene-gesserit',
    title: 'Bene Gesserit',
    nodeId: 'bloodlines',
    status: 'concept',
    summary: 'A hidden long-game of training, lineage pressure, and social manipulation anchored in Dune logic.',
  },
  {
    id: 'mentats',
    title: 'Mentats',
    nodeId: 'bloodlines',
    status: 'concept',
    summary: 'Human specialization replaces machine convenience with trained analysis, planning, and interpretation.',
  },
  {
    id: 'tleilaxu',
    title: 'Tleilaxu',
    nodeId: 'bloodlines',
    status: 'concept',
    summary: 'Gholas, Face Dancers, and engineered biology expand the unsettling edge of the Imperium.',
  },
  {
    id: 'dynasties',
    title: 'Dynasties',
    nodeId: 'bloodlines',
    status: 'planned',
    summary: 'Heirs, succession, marriage, and inheritance turn long campaigns into family histories.',
  },
  {
    id: 'prescience',
    title: 'Prescience',
    nodeId: 'prescient-path',
    status: 'concept',
    summary: 'Future sight should create tension, branching risk, and imperfect knowledge rather than simple certainty.',
  },
  {
    id: 'offworld-expansion',
    title: 'Offworld Expansion',
    nodeId: 'beyond-shield-wall',
    status: 'far-future',
    summary: 'Other worlds remain a distant consequence of finishing Arrakis, not a shortcut around it.',
  },
]

export const ROADMAP_FUTURE_WORLDS: RoadmapFutureWorld[] = [
  {
    id: 'kaitain',
    title: 'Kaitain',
    summary: 'Imperial court power, ceremony, and Corrino authority at the far center of the Imperium.',
  },
  {
    id: 'caladan',
    title: 'Caladan',
    summary: 'A contrast world of water, lineage, and Atreides identity far from Arrakis scarcity.',
  },
  {
    id: 'giedi-prime',
    title: 'Giedi Prime',
    summary: 'Industrial brutality, extraction, and Harkonnen pressure in a darker political theater.',
  },
  {
    id: 'salusa-secundus',
    title: 'Salusa Secundus',
    summary: 'The prison-world roots of Sardaukar terror and the price of Imperial discipline.',
  },
  {
    id: 'ix',
    title: 'Ix',
    summary: 'Advanced and politically fraught technology at the edge of what the Imperium tolerates.',
  },
  {
    id: 'tleilax',
    title: 'Tleilax',
    summary: 'Biological secrecy, engineered humanity, and the deeper unease behind Tleilaxu power.',
  },
  {
    id: 'wallach-ix',
    title: 'Wallach IX',
    summary: 'Bene Gesserit training, hidden influence, and the inner disciplines of the Sisterhood.',
  },
]
