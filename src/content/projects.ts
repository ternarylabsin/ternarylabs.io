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
  confidential: boolean
}

export const projects: Project[] = [
  {
    slug: 'Commercial Real-Estate Company',
    displayName: 'Commercial Real-Estate Company',
    tagline: 'Real-estate connections, mobilized.',
    shortSummary:
      'A mobile application for a real-estate company. Built for iOS and Android app-store distribution.',
    longSummary:
      'This company needed a polished mobile experience that met the expectations of real-estate professionals. We designed and engineered an iOS and Android application built for app-store distribution, with a streamlined workflow, clean interface, and the performance needed for daily professional use.',
    platforms: ['iOS', 'Android'],
    capabilities: [
      'Cross-platform mobile application (iOS + Android)',
      'App-store ready build pipeline (TestFlight / Play Console)',
      'Modern, streamlined UI for real-estate workflows',
      'Push notifications and background data sync',
      'Secure authentication flow',
    ],
    techFootprint: ['React Native', 'TypeScript', 'REST API integration'],
    status: 'In development',
    accentColor: 'var(--accent-cyan)',
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
