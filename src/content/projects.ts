export interface Project {
  slug: string
  displayName: string
  tagline: string
  shortSummary: string
  longSummary: string
  platforms: string[]
  capabilities: string[]
  techFootprint: string[]
  status: 'In development' | 'Delivered' | 'Live'
  accentColor: string
  featured?: boolean
  storeUrl?: string
  storeLabel?: string
  wikiHref?: string
  wikiLabel?: string
  mediaIconUrl?: string
  mediaIconFit?: 'cover' | 'contain'
  galleryImageUrls?: string[]
  galleryDisplay?: 'portrait' | 'landscape' | 'artwork'
  availabilityNote?: string
  confidential: boolean
}

export const projects: Project[] = [
  {
    slug: 'ddsmatch',
    displayName: 'DDSmatch',
    tagline: 'Your next dental opportunity.',
    shortSummary:
      'A live iPhone app for dentists to discover practice, ownership, and associateship opportunities through a swipe-based marketplace.',
    longSummary:
      'DDSmatch is a live mobile marketplace built specifically for the dental industry. We shipped an iPhone experience that helps dentists browse active practice listings, connect with the DDSmatch team, and receive timely updates through a fast, swipe-first workflow tuned for mobile decision-making.',
    platforms: ['iPhone', 'iOS'],
    capabilities: [
      'Swipe-based discovery for dental practice, buyer, and associateship opportunities',
      'Curated mobile listing feed tailored to dentist location preferences',
      'In-app contact flows for fast connection via text and email',
      'Push notifications for newly published opportunities and resources',
      'App Store deployment and release management for a public iPhone launch',
    ],
    techFootprint: ['React Native', 'TypeScript', 'iOS App Store distribution', 'Push notifications'],
    status: 'Live',
    accentColor: 'var(--accent-cyan)',
    featured: true,
    storeUrl: 'https://apps.apple.com/us/app/ddsmatch/id6784031375?uo=4',
    storeLabel: 'View on the App Store',
    mediaIconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a1/d2/0e/a1d20e64-a3b5-7c43-c058-8726646d3375/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
    mediaIconFit: 'cover',
    galleryImageUrls: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/c0/3f/be/c03fbed0-7079-68f1-c068-fe0edf2dd1d3/IMG_4878__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/3c/d3/69/3cd36974-a283-4e4e-be36-8cdf786cd3dd/IMG_4877__U00282_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a0/05/b9/a005b982-1dd7-ae81-d1d9-ee9184dd6ce7/IMG_4875__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/37/a8/53/37a853d0-78e3-cf91-5c91-2f3ed312e542/IMG_4874__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/03/a6/2c/03a62c0b-5289-baed-400a-736d7de86e94/IMG_4876__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/09/3f/5d/093f5d83-d380-771b-2321-c5c75fe34bab/IMG_4622__U00281_U0029.png/320x480bb.jpg',
    ],
    galleryDisplay: 'portrait',
    availabilityNote: 'Live on the App Store.',
    confidential: false,
  },
  {
    slug: 'dvmmatch',
    displayName: 'DVMmatch',
    tagline: 'The veterinary version of DDSmatch, built for clinics and care teams.',
    shortSummary:
      'An in-progress veterinary marketplace product for vets and animal clinics, following the same fast-match model with a workflow tailored to veterinary care.',
    longSummary:
      'DVMmatch extends the matching and marketplace model into veterinary care. The product framework is designed for veterinarians, practice owners, and animal clinics who need a focused way to explore opportunities, connect quickly, and manage outreach inside a purpose-built mobile experience.',
    platforms: ['iPhone', 'iOS'],
    capabilities: [
      'Veterinary-specific marketplace flows for clinics, owners, and care teams',
      'Swipe-driven opportunity review designed for mobile-first decision making',
      'Lead capture and outreach workflow for fast clinic-to-candidate connection',
      'Shared platform foundation with room for role-specific vet and clinic experiences',
      'Future App Store launch path aligned with the DDSmatch product family',
    ],
    techFootprint: ['React Native', 'TypeScript', 'iOS product framework'],
    status: 'In development',
    accentColor: 'var(--accent-violet)',
    featured: true,
    mediaIconUrl: `${import.meta.env.BASE_URL}project-media/dvmmatch-logo.png`,
    mediaIconFit: 'contain',
    availabilityNote: 'App Store listing pending. Preview builds available on request.',
    confidential: false,
  },
  {
    slug: 'idiolex',
    displayName: 'Idiolex',
    tagline: 'Your personal lexicon.',
    shortSummary:
      'A local-first desktop writing workspace with APA-aware DOCX export, project folders, and agent-assisted writing workflows.',
    longSummary:
      'Idiolex is a private desktop writing environment built around local paper-project folders instead of cloud-only documents. The current product framework includes assignment intake from multiple document formats, a desktop writing surface with write/preview/source modes, APA 7 DOCX export, agent-packet workflows, and a separate CLI for local project operations.',
    platforms: ['Windows', 'Desktop'],
    capabilities: [
      'Create and open paper-project folders with a structured local workspace model',
      'Assignment intake from PDF, DOCX, Markdown, or pasted source material',
      'Write, preview, and source editing modes inside an Electron desktop app',
      'APA 7 student DOCX export for polished submission-ready output',
      'Agent packet generation and validation for AI-assisted writing workflows',
    ],
    techFootprint: ['Electron', 'React', 'TypeScript', 'Python', 'PostgreSQL'],
    status: 'In development',
    accentColor: 'var(--accent-lime)',
    featured: true,
    mediaIconUrl: `${import.meta.env.BASE_URL}project-media/idiolex-logo.png`,
    mediaIconFit: 'contain',
    availabilityNote: 'Desktop preview builds available on request.',
    confidential: false,
  },
  {
    slug: 'sands-of-arrakis',
    displayName: 'Sands of Arrakis',
    tagline: 'A RimWorld Arrakis conversion seed mod.',
    shortSummary:
      'A Dune-inspired RimWorld mod prototype focused on spice systems, desert survival, faction design, and first-playable total-conversion scaffolding.',
    longSummary:
      'Sands of Arrakis is a private RimWorld total-conversion seed mod built around a Dune-style desert survival fantasy. The first playable slice already defines custom spice resources, survival gear, weapons, factions, a starting scenario, and research-driven progression, with next steps aimed at deeper incident systems, DLC hooks, and custom gameplay behavior in C#.',
    platforms: ['PC', 'RimWorld Mod'],
    capabilities: [
      'Raw spice and refined melange resource loop for survival and progression',
      'Spice awareness system with tradeoffs across perception, research, and psychic sensitivity',
      'Biome-aware content including spice bloom growth in desert environments',
      'Custom gear and combat content such as stillsuits, crysknives, and lasguns',
      'Faction, scenario, and research scaffolding for a larger total-conversion roadmap',
    ],
    techFootprint: ['C#', 'RimWorld XML defs', 'PowerShell tooling', 'Python utilities'],
    status: 'In development',
    accentColor: 'var(--accent-cyan)',
    mediaIconUrl: `${import.meta.env.BASE_URL}project-media/sands-of-arrakis-spice-bloom.png`,
    mediaIconFit: 'contain',
    galleryImageUrls: [
      `${import.meta.env.BASE_URL}project-media/sands-of-arrakis-preview.png`,
      `${import.meta.env.BASE_URL}project-media/sands-of-arrakis-spice-bloom.png`,
      `${import.meta.env.BASE_URL}project-media/sands-of-arrakis-stillsuit.png`,
    ],
    galleryDisplay: 'artwork',
    availabilityNote: 'Preview materials available on request.',
    wikiHref: '/sandsofarrakiswiki',
    wikiLabel: 'Open Sands of Arrakis Wiki',
    confidential: false,
  },
  {
    slug: 'profile-frame-shopify',
    displayName: 'Profile Frame',
    tagline: 'A premium Shopify storefront for personalized illuminated profile frames.',
    shortSummary:
      'A Hydrogen-based commerce experience for configuring custom profile frames, with guided build flows, gallery pages, and Shopify-ready launch infrastructure.',
    longSummary:
      'Profile Frame is a Shopify Hydrogen storefront built for the first launch of a personalized profile-frame product line. The project centers on a guided build experience for selecting frame options and lighting effects, while keeping the storefront aligned with Shopify-owned pricing, cart, checkout, and order workflows. The implementation already includes a route structure for the launch funnel, operational documentation, media pipelines, and Oxygen-ready deployment scaffolding.',
    platforms: ['Web', 'Shopify', 'Oxygen'],
    capabilities: [
      'Guided product-builder flow for customizing premium profile frame configurations',
      'Hydrogen storefront routes for build, cart, gallery, FAQ, policies, and commerce discovery',
      'Mock.shop-backed local development before the live Shopify store is linked',
      'Media sync and migration tooling for product assets and launch content',
      'Oxygen deployment path with documented environment, verification, and handoff steps',
    ],
    techFootprint: ['Shopify Hydrogen', 'React', 'TypeScript', 'GraphQL', 'Tailwind CSS'],
    status: 'In development',
    accentColor: 'var(--accent-violet)',
    featured: true,
    mediaIconUrl: `${import.meta.env.BASE_URL}project-media/profile-frame-logo.png`,
    mediaIconFit: 'contain',
    galleryImageUrls: [
      `${import.meta.env.BASE_URL}project-media/profile-frame-led-options.png`,
      `${import.meta.env.BASE_URL}project-media/profile-frame-rainbow-creator.png`,
      `${import.meta.env.BASE_URL}project-media/profile-frame-effect-options.png`,
    ],
    galleryDisplay: 'portrait',
    availabilityNote: 'Launch storefront in closed development. Live deployment is staged separately.',
    confidential: false,
  },
  {
    slug: 'sketchra',
    displayName: 'Sketchra',
    tagline: 'A structured reference system for serious drawing practice.',
    shortSummary:
      'A guided drawing platform that turns reference images into structured practice sessions, tiered tools, and subscription-backed skill development.',
    longSummary:
      'Sketchra is a web product designed to help artists draw more and browse less. The product direction is explicitly practice-first: curated references, timed study modes, lightweight image tools, and a paid layer for advanced filtering, premium packs, and progress tracking. The codebase already reflects product thinking beyond a landing page, with authentication, Stripe subscription scaffolding, Supabase-backed persistence, and Cloud Run-ready deployment infrastructure.',
    platforms: ['Web', 'Mobile responsive'],
    capabilities: [
      'Curated reference library built around structured discovery instead of raw browsing',
      'Timed practice modes for gesture studies, long-form study, and guided progression',
      'Tiered product model with free and paid feature sets, including advanced filtering',
      'Image-study helpers such as grayscale, blur, zoom, and future overlay/analysis tools',
      'Subscription-ready foundation with Supabase auth, Stripe billing scaffolding, and Docker deployment',
    ],
    techFootprint: ['React', 'Vite', 'TypeScript', 'Supabase', 'Stripe', 'Docker', 'Google Cloud Run'],
    status: 'In development',
    accentColor: 'var(--accent-lime)',
    featured: true,
    mediaIconUrl: `${import.meta.env.BASE_URL}project-media/sketchra-logo.png`,
    mediaIconFit: 'contain',
    galleryImageUrls: [
      `${import.meta.env.BASE_URL}project-media/sketchra-logo.png`,
      `${import.meta.env.BASE_URL}project-media/sketchra-reference-dark.svg`,
      `${import.meta.env.BASE_URL}project-media/sketchra-reference-neutral.svg`,
    ],
    galleryDisplay: 'artwork',
    availabilityNote: 'Active development with subscription and deployment scaffolding in progress.',
    confidential: false,
  },
  {
    slug: 'pushcircle',
    displayName: 'PushCircle',
    tagline: 'Your circle keeps you moving.',
    shortSummary:
      'A group accountability app for habits, pods, structured pushes, proof-backed check-ins, and owner-gated Pod Pro communications.',
    longSummary:
      'PushCircle is a mobile accountability product built around small pods, recurring check-ins, structured nudges, and proof workflows. The current beta posture goes beyond mockups: the project has hosted Supabase infrastructure, role- and tier-aware product rules, OS push notification plumbing, Pod Pro communication surfaces, and release documentation that treats product entitlements and moderation as first-class concerns.',
    platforms: ['iOS', 'Android', 'Web'],
    capabilities: [
      'Private and public pod flows with habit assignment, check-ins, and structured accountability pushes',
      'Tiered entitlement model across Free, Premium, and Pod Pro with server-enforced limits',
      'Proof-required check-ins, review flows, and retention rules for higher-accountability pods',
      'Owner-gated Pod Pro communication surfaces including community chat, direct messages, and announcements',
      'Expo-based push notification delivery backed by Supabase data, storage, and edge workflows',
    ],
    techFootprint: ['Expo', 'React Native', 'TypeScript', 'Supabase', 'PostgreSQL'],
    status: 'In development',
    accentColor: 'var(--accent-cyan)',
    featured: true,
    mediaIconUrl: `${import.meta.env.BASE_URL}project-media/push-circle-icon.png`,
    mediaIconFit: 'contain',
    galleryImageUrls: [
      `${import.meta.env.BASE_URL}project-media/push-circle-home-after-join.png`,
      `${import.meta.env.BASE_URL}project-media/push-circle-home-initial.png`,
      `${import.meta.env.BASE_URL}project-media/push-circle-checkin-options.png`,
      `${import.meta.env.BASE_URL}project-media/push-circle-pod-tab.png`,
    ],
    galleryDisplay: 'landscape',
    availabilityNote: 'Beta application with hosted backend infrastructure. Demo access available on request.',
    confidential: false,
  },
  {
    slug: 'containr',
    displayName: 'Containr',
    tagline: 'Inventory clarity — anywhere, anytime.',
    shortSummary:
      'An inventory management product spanning mobile and web. Track what exists, where it is, and how it changes over time.',
    longSummary:
      'Containr is an inventory management product built for teams that need clarity across locations and devices. We built a unified system covering a mobile application and a responsive web dashboard — both backed by real-time data — so teams always have an accurate, up-to-date picture of their inventory.',
    platforms: ['Web', 'iOS', 'Android'],
    capabilities: [
      'Real-time inventory tracking across locations',
      'Mobile app (iOS + Android) with offline support',
      'Web dashboard for management and reporting',
      'Barcode/QR scan integration',
      'Role-based access and team management',
    ],
    techFootprint: ['React', 'React Native', 'TypeScript', 'Node.js', 'PostgreSQL'],
    status: 'In development',
    accentColor: 'var(--accent-violet)',
    confidential: false,
  },
  {
    slug: 'confidential-ecommerce',
    displayName: 'Confidential E-Commerce Platform',
    tagline: 'End-to-end operational control for a growing e-commerce brand.',
    shortSummary:
      'A full-stack inventory and order management web application with a dedicated database backend for a confidential e-commerce client.',
    longSummary:
      'An internal operational platform built for a confidential e-commerce company. The system covers the full workflow — from inventory levels and supplier orders through to fulfillment and reporting — backed by a purpose-built database layer. Built to replace fragmented spreadsheet processes and scale with business growth.',
    platforms: ['Web'],
    capabilities: [
      'Full-stack web application with custom database schema',
      'Inventory tracking and automated reorder workflows',
      'Order management from receipt to fulfillment',
      'Supplier and vendor management module',
      'Reporting dashboard with operational KPIs',
      'Role-based access control (admin / staff / read-only)',
    ],
    techFootprint: ['React', 'TypeScript', 'Node.js', 'PostgreSQL', 'REST API'],
    status: 'Delivered',
    accentColor: 'var(--accent-lime)',
    confidential: true,
  },
]

export function getProject(slug: string): Project | undefined {
  return projects.find((p) => p.slug === slug)
}
