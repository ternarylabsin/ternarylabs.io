"use client"

import { motion } from "framer-motion"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/Tabs"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/Accordion"
import { CheckCircle2, Code2, Smartphone, Zap, Cpu, Cloud, Lock, RefreshCw, BarChart3, Workflow, Package, Database, Settings, Smartphone as MobileIcon, Radio, Wind } from "lucide-react"
import Link from "next/link"
import { SectionHeader } from "@/components/marketing/SectionHeader"
import { MiniCard } from "@/components/marketing/MiniCard"
import { Workflow as WorkflowComponent } from "@/components/marketing/Workflow"
import { CaseStudyCard, type CaseStudy } from "@/components/marketing/CaseStudyCard"
import { FilterChips } from "@/components/marketing/FilterChips"
import { useState } from "react"

const containerVariants = {
  hidden: { opacity: 0 },
  visible: {
    opacity: 1,
    transition: {
      staggerChildren: 0.1,
      delayChildren: 0.2,
    },
  },
}

const itemVariants = {
  hidden: { opacity: 0, y: 20 },
  visible: {
    opacity: 1,
    y: 0,
    transition: {
      duration: 0.5,
    },
  },
}

const caseStudies: CaseStudy[] = [
  {
    id: "1",
    title: "E-Commerce Platform Redesign",
    description: "Complete web application overhaul for a multi-vendor marketplace",
    problem: "Legacy platform had poor UX, slow performance, and couldn't scale with growing inventory",
    solution: "Built modern Next.js app with real-time inventory, improved checkout, and analytics dashboard",
    outcomes: [
      "30% increase in conversion rate",
      "5s to 1.2s average page load",
      "Support for 10k+ concurrent users",
    ],
    tags: ["Web", "Mobile"],
    stack: ["Next.js", "React Native", "PostgreSQL", "Stripe"],
  },
  {
    id: "2",
    title: "IoT Home Automation System",
    description: "Complete hardware + software solution for smart home control",
    problem: "Users needed seamless control of multiple devices from one platform",
    solution: "Designed custom firmware for ESP32 hub with mobile + web apps for unified control",
    outcomes: [
      "Sub-100ms response time",
      "Supports 50+ device types",
      "Offline mode for critical controls",
    ],
    tags: ["Hardware", "Mobile"],
    stack: ["ESP32", "React Native", "Node.js", "MQTT"],
  },
  {
    id: "3",
    title: "Real-time Analytics Dashboard",
    description: "Business intelligence platform for SaaS metrics",
    problem: "Clients needed real-time insights without waiting for batch jobs",
    solution: "Built WebSocket-based dashboard with live charts and AI-powered recommendations",
    outcomes: [
      "24/7 uptime, 99.99% reliability",
      "Handles 100k events/second",
      "Reduced insights discovery time by 80%",
    ],
    tags: ["Web"],
    stack: ["React", "Node.js", "ClickHouse", "Redis"],
  },
  {
    id: "4",
    title: "Mobile-First Fitness App",
    description: "Cross-platform app with wearable integration",
    problem: "Fragmented experience across devices, poor wearable sync",
    solution: "Native iOS/Android builds with real-time wearable sync and offline workouts",
    outcomes: [
      "4.8⭐ rating on both stores",
      "1M+ downloads in 6 months",
      "99.9% sync reliability",
    ],
    tags: ["Mobile", "Hardware"],
    stack: ["React Native", "Swift", "Kotlin", "Firebase"],
  },
  {
    id: "5",
    title: "B2B SaaS Management Suite",
    description: "Multi-tenant platform for enterprise operations",
    problem: "Clients managing teams and workflows across fragmented tools",
    solution: "Built comprehensive suite with white-label capabilities and advanced permissions",
    outcomes: [
      "Serves 500+ companies",
      "99.95% uptime SLA",
      "Reduced customer tool stack by 60%",
    ],
    tags: ["Web"],
    stack: ["Next.js", "PostgreSQL", "Supabase", "Vercel"],
  },
  {
    id: "6",
    title: "Smart Sensor Network",
    description: "Distributed sensor system for environmental monitoring",
    problem: "Traditional logging was manual and error-prone",
    solution: "Custom PCBs with long-range wireless, cloud aggregation, and ML alerts",
    outcomes: [
      "5-year battery life on nodes",
      "50km+ range with minimal power",
      "Proactive anomaly detection",
    ],
    tags: ["Hardware"],
    stack: ["ARM Cortex-M", "LoRaWAN", "Python", "PostgreSQL"],
  },
]

const faqs = [
  {
    question: "Do you build MVPs?",
    answer: "Yes! We specialize in rapid MVP development. We can launch a functional product in 4-8 weeks. We focus on core features first, validate with users, then iterate. Perfect for startups validating ideas.",
  },
  {
    question: "Can you integrate payments and authentication?",
    answer: "Absolutely. We integrate Stripe (payments), Supabase/Auth0 (authentication), and other platforms seamlessly. We handle PCI compliance, security best practices, and smooth UX.",
  },
  {
    question: "Do you do hardware + software together?",
    answer: "Yes, that's our specialty! We design custom PCBs, firmware (ESP32, ARM), mobile apps, cloud backends, and dashboards. We manage the full stack from embedded to cloud.",
  },
  {
    question: "What does a typical project timeline look like?",
    answer: "MVP: 4-8 weeks. Full product: 3-6 months. Maintenance: ongoing. We use 2-week sprints, with demos and feedback every two weeks. You own the roadmap.",
  },
  {
    question: "Do you offer ongoing support?",
    answer: "Yes! We offer maintenance plans, feature development, infrastructure monitoring, and performance optimization. Many clients keep us on retainer post-launch.",
  },
]

export default function Home() {
  const [selectedFilters, setSelectedFilters] = useState<string[]>(["All"])
  const [filteredCaseStudies, setFilteredCaseStudies] = useState(caseStudies)

  const handleFilterChange = (filters: string[]) => {
    setSelectedFilters(filters.length === 0 ? ["All"] : filters)
    
    if (filters.length === 0 || filters.includes("All")) {
      setFilteredCaseStudies(caseStudies)
    } else {
      setFilteredCaseStudies(
        caseStudies.filter(cs => cs.tags.some(tag => filters.includes(tag)))
      )
    }
  }

  return (
    <div className="min-h-screen">
      {/* Hero Section */}
      <motion.section
        className="relative overflow-hidden py-20 sm:py-24 md:py-32"
        initial="hidden"
        animate="visible"
        variants={containerVariants}
      >
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
            {/* Left Column */}
            <div className="lg:col-span-2 space-y-8">
              {/* Badges */}
              <motion.div className="flex flex-wrap gap-2" variants={itemVariants}>
                {["Web + Mobile", "Hardware Prototyping", "Product Design"].map((badge) => (
                  <Badge key={badge} variant="secondary" className="rounded-full">
                    {badge}
                  </Badge>
                ))}
              </motion.div>

              {/* Main Headline */}
              <motion.div className="space-y-4" variants={itemVariants}>
                <h1 className="text-4xl sm:text-5xl lg:text-6xl font-bold text-foreground leading-tight">
                  Software + hardware that ships
                </h1>
              </motion.div>

              {/* Subtext */}
              <motion.p className="text-lg sm:text-xl text-muted-foreground max-w-xl leading-relaxed" variants={itemVariants}>
                We design and build websites, mobile apps, IoT devices, and embedded systems. From MVP to production scale, we deliver products that matter.
              </motion.p>

              {/* CTA Buttons */}
              <motion.div className="flex flex-wrap gap-3 pt-4" variants={itemVariants}>
                <Button size="lg" asChild>
                  <Link href="/contact">Get Started</Link>
                </Button>
                <Button size="lg" variant="outline" asChild>
                  <Link href="/work">View Work</Link>
                </Button>
              </motion.div>

              {/* Bullet List */}
              <motion.ul className="space-y-3 pt-8" variants={itemVariants}>
                {[
                  "End-to-end design and development",
                  "From concept to production support",
                  "Hardware prototyping to firmware",
                ].map((item, i) => (
                  <li key={i} className="flex gap-3 items-start">
                    <CheckCircle2 className="w-5 h-5 text-accent flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <span className="text-foreground">{item}</span>
                  </li>
                ))}
              </motion.ul>
            </div>

            {/* Right Column - Cards */}
            <motion.div className="lg:col-span-1 space-y-4" variants={itemVariants}>
              {/* What we build */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">What we build</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Web Apps", "Mobile Apps", "APIs", "IoT Hardware", "Dashboards"].map((item) => (
                    <div key={item} className="flex items-center justify-between py-1">
                      <span className="text-sm text-foreground">{item}</span>
                      <Badge variant="secondary" className="text-xs">{Math.floor(Math.random() * 5) + 1}+</Badge>
                    </div>
                  ))}
                </CardContent>
              </Card>

              {/* How we work */}
              <Card className="hover:shadow-lg transition-shadow">
                <CardHeader className="pb-3">
                  <CardTitle className="text-lg">How we work</CardTitle>
                </CardHeader>
                <CardContent className="space-y-2">
                  {["Discover your needs", "Design solutions", "Build & iterate", "Launch & monitor"].map((step, i) => (
                    <div key={i} className="flex items-center gap-2 py-1">
                      <span className="w-6 h-6 rounded-full bg-accent/10 text-accent flex items-center justify-center text-xs font-semibold">{i + 1}</span>
                      <span className="text-sm text-foreground">{step}</span>
                    </div>
                  ))}
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </motion.section>

      {/* Tabs Section */}
      <motion.section
        className="py-20 sm:py-28 border-t border-border bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            eyebrow="How Ternary Labs helps"
            title="Comprehensive expertise"
            subtitle="We cover the full spectrum of modern product development"
          />

          <Tabs defaultValue="overview" className="w-full">
            <TabsList className="grid w-full grid-cols-2 lg:grid-cols-4">
              <TabsTrigger value="overview">Overview</TabsTrigger>
              <TabsTrigger value="software">Software</TabsTrigger>
              <TabsTrigger value="hardware">Hardware</TabsTrigger>
              <TabsTrigger value="delivery">Delivery</TabsTrigger>
            </TabsList>

            <TabsContent value="overview" className="mt-8">
              <div className="grid md:grid-cols-3 gap-4">
                <MiniCard
                  title="Speed"
                  description="Rapid iteration cycles with agile methodology. Launch MVPs in weeks, not months."
                  icon={Zap}
                />
                <MiniCard
                  title="Quality"
                  description="Built to scale. Clean code, comprehensive testing, and performance optimization."
                  icon={CheckCircle2}
                />
                <MiniCard
                  title="Ownership"
                  description="You own the code and IP. Transparent handoff and full documentation included."
                  icon={Package}
                />
              </div>
            </TabsContent>

            <TabsContent value="software" className="mt-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <WorkflowComponent
                  title="Web Applications"
                  icon={Code2}
                  steps={[
                    { label: "Design system & components" },
                    { label: "Next.js/React frontend" },
                    { label: "API integration" },
                    { label: "Analytics & monitoring" },
                  ]}
                />
                <WorkflowComponent
                  title="Mobile Applications"
                  icon={MobileIcon}
                  steps={[
                    { label: "UI/UX design" },
                    { label: "React Native/Expo" },
                    { label: "Push notifications" },
                    { label: "App store deployment" },
                  ]}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <WorkflowComponent
                  title="Backend & APIs"
                  icon={Database}
                  steps={[
                    { label: "Node.js/Python services" },
                    { label: "Database design (SQL/NoSQL)" },
                    { label: "Authentication & authorization" },
                    { label: "Payment & integrations" },
                  ]}
                />
                <WorkflowComponent
                  title="Infrastructure"
                  icon={Cloud}
                  steps={[
                    { label: "Cloud deployment (AWS/GCP)" },
                    { label: "Serverless functions" },
                    { label: "CI/CD pipelines" },
                    { label: "Monitoring & logging" },
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="hardware" className="mt-8 space-y-4">
              <div className="grid md:grid-cols-2 gap-4">
                <WorkflowComponent
                  title="PCB Design"
                  icon={Cpu}
                  steps={[
                    { label: "Schematic design" },
                    { label: "PCB layout & routing" },
                    { label: "Manufacturing & testing" },
                    { label: "Quality assurance" },
                  ]}
                />
                <WorkflowComponent
                  title="Firmware Development"
                  icon={Settings}
                  steps={[
                    { label: "Embedded C/Rust" },
                    { label: "Real-time requirements" },
                    { label: "Power optimization" },
                    { label: "OTA updates" },
                  ]}
                />
              </div>
              <div className="grid md:grid-cols-2 gap-4">
                <WorkflowComponent
                  title="Connectivity"
                  icon={Radio}
                  steps={[
                    { label: "BLE/WiFi provisioning" },
                    { label: "LoRaWAN networks" },
                    { label: "Cellular connectivity" },
                    { label: "Mesh networking" },
                  ]}
                />
                <WorkflowComponent
                  title="Mechanical Design"
                  icon={Wind}
                  steps={[
                    { label: "CAD modeling" },
                    { label: "Thermal analysis" },
                    { label: "Enclosure design" },
                    { label: "Manufacturing specs" },
                  ]}
                />
              </div>
            </TabsContent>

            <TabsContent value="delivery" className="mt-8">
              <div className="grid md:grid-cols-3 gap-4">
                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Deployment</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>Automated CI/CD pipelines</p>
                    <p>Zero-downtime deployments</p>
                    <p>Blue-green releases</p>
                    <p>Rollback capabilities</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Monitoring</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>24/7 uptime monitoring</p>
                    <p>Error tracking & alerts</p>
                    <p>Performance dashboards</p>
                    <p>User analytics</p>
                  </CardContent>
                </Card>

                <Card>
                  <CardHeader>
                    <CardTitle className="text-lg">Maintenance</CardTitle>
                  </CardHeader>
                  <CardContent className="space-y-2 text-sm text-muted-foreground">
                    <p>Security patching</p>
                    <p>Dependency updates</p>
                    <p>Performance optimization</p>
                    <p>SLA guarantees</p>
                  </CardContent>
                </Card>
              </div>
            </TabsContent>
          </Tabs>
        </div>
      </motion.section>

      {/* Feature Grid */}
      <motion.section
        className="py-20 sm:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            eyebrow="Core capabilities"
            title="Everything you need"
            subtitle="A complete toolkit for modern product development"
          />

          <div className="grid sm:grid-cols-2 lg:grid-cols-3 gap-6">
            {[
              { icon: Code2, title: "UI/UX + Design Systems", desc: "Figma to React component libraries" },
              { icon: Package, title: "Next.js + React", desc: "Server & client rendering, App Router" },
              { icon: Smartphone, title: "React Native", desc: "Cross-platform iOS & Android apps" },
              { icon: Database, title: "Backend APIs", desc: "Node, Python, PostgreSQL, Supabase" },
              { icon: Lock, title: "Auth + Multi-tenant", desc: "Secure user management at scale" },
              { icon: BarChart3, title: "Payments", desc: "Stripe, payment processing, invoicing" },
              { icon: Cpu, title: "IoT + Embedded", desc: "ESP32, ARM, sensors, custom hardware" },
              { icon: Radio, title: "BLE/WiFi Prov.", desc: "Device onboarding & wireless sync" },
              { icon: Cloud, title: "Cloud + Observability", desc: "AWS, GCP, monitoring, logging" },
            ].map((feature, i) => (
              <motion.div
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.05 }}
                viewport={{ once: true }}
              >
                <Card className="h-full hover:shadow-lg hover:-translate-y-1 transition-all">
                  <CardHeader>
                    <div className="flex items-center gap-3 mb-2">
                      <div className="p-2 rounded-md bg-accent/10">
                        <feature.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                      </div>
                      <CardTitle className="text-base">{feature.title}</CardTitle>
                    </div>
                  </CardHeader>
                  <CardContent>
                    <p className="text-sm text-muted-foreground">{feature.desc}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {/* Work / Case Studies Preview */}
      <motion.section
        className="py-20 sm:py-28 border-t border-border bg-muted/30"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            eyebrow="Recent work"
            title="Case studies"
            subtitle="Examples of projects we've delivered"
          />

          <div className="mb-8">
            <FilterChips
              options={["All", "Web", "Mobile", "Hardware"]}
              selectedFilters={selectedFilters}
              onFilterChange={handleFilterChange}
            />
          </div>

          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-4">
            {filteredCaseStudies.map((cs, i) => (
              <motion.div
                key={cs.id}
                initial={{ opacity: 0 }}
                animate={{ opacity: 1 }}
                transition={{ delay: i * 0.05 }}
              >
                <CaseStudyCard caseStudy={cs} />
              </motion.div>
            ))}
          </div>

          <motion.div className="text-center mt-12" initial={{ opacity: 0 }} whileInView={{ opacity: 1 }} viewport={{ once: true }}>
            <Button size="lg" variant="outline" asChild>
              <Link href="/work">View All Case Studies</Link>
            </Button>
          </motion.div>
        </div>
      </motion.section>

      {/* FAQ Accordion */}
      <motion.section
        className="py-20 sm:py-28"
        initial={{ opacity: 0 }}
        whileInView={{ opacity: 1 }}
        transition={{ duration: 0.5 }}
        viewport={{ once: true, margin: "-10%" }}
      >
        <div className="max-w-3xl mx-auto px-4">
          <SectionHeader
            eyebrow="Frequently Asked"
            title="Common questions"
            subtitle="Everything you need to know about working with us"
          />

          <Accordion type="single" collapsible className="w-full">
            {faqs.map((faq, i) => (
              <AccordionItem key={i} value={`item-${i}`}>
                <AccordionTrigger className="text-lg">{faq.question}</AccordionTrigger>
                <AccordionContent className="text-base text-muted-foreground leading-relaxed">
                  {faq.answer}
                </AccordionContent>
              </AccordionItem>
            ))}
          </Accordion>
        </div>
      </motion.section>
    </div>
  )
}
