"use client"

import { useState } from "react"
import { Input } from "@/components/ui/Input"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/marketing/SectionHeader"
import { CaseStudyCard, type CaseStudy } from "@/components/marketing/CaseStudyCard"
import { FilterChips } from "@/components/marketing/FilterChips"
import { Search } from "lucide-react"
import { Metadata } from "next"

// Note: In a real app, we'd use the export const metadata at top,
// but since this is a "use client" component, we need to handle it differently
// For now, metadata would be handled in a layout.tsx for this route

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    description: "Complete web application overhaul for a multi-vendor marketplace",
    problem: "Legacy platform had poor UX, slow performance, and couldn't scale with growing inventory. Cart abandonment was at 75% and the company was losing revenue daily.",
    solution: "Built modern Next.js app with real-time inventory, improved checkout flow, and analytics dashboard. Implemented server-side rendering for SEO and image optimization.",
    outcomes: [
      "30% increase in conversion rate",
      "5s to 1.2s average page load (75% faster)",
      "Support for 10k+ concurrent users",
      "Revenue increased 45% within 3 months",
    ],
    tags: ["Web", "Mobile"],
    stack: ["Next.js", "React Native", "PostgreSQL", "Stripe", "CloudFlare"],
  },
  {
    id: "2",
    title: "IoT Home Automation System",
    description: "Complete hardware + software solution for smart home control",
    problem: "Users needed seamless control of multiple devices from one platform. Previous solutions were fragmented, expensive, and required different apps per manufacturer.",
    solution: "Designed custom firmware for ESP32 hub with React Native mobile app and Next.js web dashboard for unified control. Implemented MQTT for real-time device sync.",
    outcomes: [
      "Sub-100ms response time for device control",
      "Supports 50+ device types",
      "Offline mode for critical controls",
      "4.7⭐ App Store rating",
    ],
    tags: ["Hardware", "Mobile"],
    stack: ["ESP32", "React Native", "Node.js", "MQTT", "PostgreSQL"],
  },
  {
    id: "3",
    title: "Real-time Analytics Dashboard",
    description: "Business intelligence platform for SaaS metrics",
    problem: "Clients needed real-time insights without waiting for batch jobs. Legacy system updated every 8 hours.",
    solution: "Built WebSocket-based dashboard with live charts and AI-powered recommendations. Implemented real-time data pipeline with min-max aggregation.",
    outcomes: [
      "24/7 uptime, 99.99% reliability",
      "Handles 100k events/second",
      "Reduced insights discovery time by 80%",
      "Used by 500+ companies",
    ],
    tags: ["Web"],
    stack: ["React", "Node.js", "ClickHouse", "Redis", "WebSocket"],
  },
  {
    id: "4",
    title: "Mobile-First Fitness App",
    description: "Cross-platform app with wearable integration",
    problem: "Fragmented experience across devices, poor wearable sync, offline functionality missing",
    solution: "Native iOS/Android builds with real-time wearable sync via BLE and offline workouts stored locally. Built custom health data aggregation backend.",
    outcomes: [
      "4.8⭐ rating on both stores",
      "1M+ downloads in 6 months",
      "99.9% sync reliability",
      "Top 10 health app in 5 countries",
    ],
    tags: ["Mobile", "Hardware"],
    stack: ["React Native", "Swift", "Kotlin", "Firebase", "HealthKit/Google Fit"],
  },
  {
    id: "5",
    title: "B2B SaaS Management Suite",
    description: "Multi-tenant platform for enterprise operations",
    problem: "Clients managing teams and workflows across fragmented tools, no unified permissions model",
    solution: "Built comprehensive suite with white-label capabilities, advanced role-based permissions, and API for custom integrations. Implemented SSO for enterprise.",
    outcomes: [
      "Serves 500+ companies",
      "99.95% uptime SLA",
      "Reduced customer tool stack by 60%",
      "Enterprise contracts with 50k+ users",
    ],
    tags: ["Web"],
    stack: ["Next.js", "PostgreSQL", "Supabase", "Stripe", "Vercel"],
  },
  {
    id: "6",
    title: "Smart Sensor Network",
    description: "Distributed sensor system for environmental monitoring",
    problem: "Traditional logging was manual and error-prone, no early warnings for anomalies",
    solution: "Custom PCBs with long-range wireless, cloud aggregation, and ML alerts. Implemented low-power design for 5-year battery life.",
    outcomes: [
      "5-year battery life on sensor nodes",
      "50km+ range with minimal power",
      "Proactive anomaly detection with 95% accuracy",
      "Deployed across 100+ facilities",
    ],
    tags: ["Hardware"],
    stack: ["ARM Cortex-M", "LoRaWAN", "Python", "TensorFlow", "PostgreSQL"],
  },
  {
    id: "7",
    title: "E-Learning Video Platform",
    description: "Scalable video streaming and progress tracking",
    problem: "Needed to handle 100k+ concurrent students with adaptive bitrate streaming and offline playback",
    solution: "Built CDN-backed video delivery with HLS streaming, progress tracking via PostgreSQL, and React frontend. Implemented DRM for content protection.",
    outcomes: [
      "Supports 500k+ concurrent viewers",
      "Average startup time: 1.2s",
      "99.97% streaming reliability",
      "Used by 50+ universities",
    ],
    tags: ["Web", "Mobile"],
    stack: ["Next.js", "React Native", "CloudFlare Stream", "PostgreSQL", "Redis"],
  },
  {
    id: "8",
    title: "Supply Chain Tracking",
    description: "Real-time inventory and logistics optimization",
    problem: "Manual tracking led to lost shipments and inventory mismatches",
    solution: "IoT-enabled network with GPS trackers, RFID readers, and real-time dashboard. Built predictive models for demand forecasting.",
    outcomes: [
      "Reduced lost shipments by 95%",
      "Inventory accuracy improved to 99.8%",
      "Delivery time reduced by 20%",
      "Handles 1M+ events daily",
    ],
    tags: ["Hardware", "Web"],
    stack: ["ESP32", "GPS/LoRa", "Node.js", "Python", "PostgreSQL"],
  },
  {
    id: "9",
    title: "AI-Powered Chat Assistant",
    description: "Customer support bot with context awareness",
    problem: "Manual support was slow and expensive, needed 24/7 availability",
    solution: "Built LLM-based chat with RAG for context, escalation to human agents, and knowledge base management. Integrated with Slack and web.",
    outcomes: [
      "Handles 80% of inquiries without human input",
      "Response time: <1s",
      "99.9% availability",
      "Reduces support costs by 60%",
    ],
    tags: ["Web"],
    stack: ["Next.js", "OpenAI API", "Pinecone", "Node.js", "PostgreSQL"],
  },
]

export default function WorkPage() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"])
  const [searchTerm, setSearchTerm] = useState("")
  const [filteredCaseStudies, setFilteredCaseStudies] = useState(caseStudies)

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters.length === 0 ? ["All"] : filters)
    applyFilters(filters, searchTerm)
  }

  const handleSearch = (term: string) => {
    setSearchTerm(term)
    applyFilters(selectedFilters, term)
  }

  const applyFilters = (filters: string[], search: string) => {
    let result = caseStudies

    // Filter by selected tags
    if (filters.length > 0 && !filters.includes("All")) {
      result = result.filter(cs => cs.tags.some(tag => filters.includes(tag)))
    }

    // Filter by search term
    if (search.trim()) {
      const lowerSearch = search.toLowerCase()
      result = result.filter(cs =>
        cs.title.toLowerCase().includes(lowerSearch) ||
        cs.description.toLowerCase().includes(lowerSearch)
      )
    }

    setFilteredCaseStudies(result)
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 sm:py-28 md:py-32 border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            eyebrow="Our Work"
            title="Case Studies"
            subtitle="Real projects, real results. See how we've helped companies build products that matter"
          />
        </div>
      </section>

      {/* Filters & Search */}
      <section className="py-8 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <div className="space-y-4">
            <div>
              <label className="text-sm font-semibold text-foreground block mb-3">Filter by Type</label>
              <FilterChips
                options={["All", "Web", "Mobile", "Hardware"]}
                selectedFilters={selectedFilters}
                onFilterChange={handleFilterChange}
              />
            </div>

            <div>
              <label className="text-sm font-semibold text-foreground block mb-3">Search</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                <Input
                  placeholder="Search case studies..."
                  value={searchTerm}
                  onChange={(e) => handleSearch(e.target.value)}
                  className="pl-10"
                />
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Case Studies Grid */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4">
          {filteredCaseStudies.length === 0 ? (
            <div className="text-center py-12">
              <p className="text-lg text-muted-foreground">No case studies found matching your filters.</p>
            </div>
          ) : (
            <>
              <p className="text-sm text-muted-foreground mb-6">{filteredCaseStudies.length} case studies</p>
              <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
                {filteredCaseStudies.map((cs) => (
                  <CaseStudyCard key={cs.id} caseStudy={cs} />
                ))}
              </div>
            </>
          )}
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-muted/30 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Let's build something great together</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Have a project in mind? We'd love to discuss it
          </p>
          <Button size="lg" asChild>
            <a href="/contact">Get Started</a>
          </Button>
        </div>
      </section>
    </main>
  )
}
