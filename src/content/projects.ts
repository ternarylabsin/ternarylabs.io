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
  storeUrl?: string
  storeLabel?: string
  mediaIconUrl?: string
  galleryImageUrls?: string[]
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
    storeUrl: 'https://apps.apple.com/us/app/ddsmatch/id6784031375?uo=4',
    storeLabel: 'View on the App Store',
    mediaIconUrl:
      'https://is1-ssl.mzstatic.com/image/thumb/Purple211/v4/a1/d2/0e/a1d20e64-a3b5-7c43-c058-8726646d3375/AppIcon-0-0-1x_U007ephone-0-1-85-220.png/512x512bb.jpg',
    galleryImageUrls: [
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/c0/3f/be/c03fbed0-7079-68f1-c068-fe0edf2dd1d3/IMG_4878__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/3c/d3/69/3cd36974-a283-4e4e-be36-8cdf786cd3dd/IMG_4877__U00282_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/a0/05/b9/a005b982-1dd7-ae81-d1d9-ee9184dd6ce7/IMG_4875__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/37/a8/53/37a853d0-78e3-cf91-5c91-2f3ed312e542/IMG_4874__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource211/v4/03/a6/2c/03a62c0b-5289-baed-400a-736d7de86e94/IMG_4876__U00281_U0029.png/320x480bb.jpg',
      'https://is1-ssl.mzstatic.com/image/thumb/PurpleSource221/v4/09/3f/5d/093f5d83-d380-771b-2321-c5c75fe34bab/IMG_4622__U00281_U0029.png/320x480bb.jpg',
    ],
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
    availabilityNote: 'App Store listing pending.',
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
