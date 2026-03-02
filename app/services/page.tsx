import { motion } from "framer-motion"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { Button } from "@/components/ui/Button"
import { Code2, Smartphone, Cpu, Cloud, Lock, BarChart3, Settings, Zap, CheckCircle2 } from "lucide-react"
import Link from "next/link"
import { SectionHeader } from "@/components/marketing/SectionHeader"
import { MiniCard } from "@/components/marketing/MiniCard"
import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Services - Ternary Labs",
  description: "Web development, mobile apps, hardware design, and cloud infrastructure services",
}

const services = [
  {
    category: "Web Development",
    icon: Code2,
    items: [
      "Next.js & React applications",
      "Design systems & component libraries",
      "E-commerce platforms",
      "Admin dashboards",
      "Real-time features (WebSocket)",
      "SEO optimization",
    ],
  },
  {
    category: "Mobile Development",
    icon: Smartphone,
    items: [
      "React Native apps",
      "Expo managed services",
      "iOS/Android native apps",
      "Push notifications",
      "Offline-first architecture",
      "App store deployment",
    ],
  },
  {
    category: "Hardware & IoT",
    icon: Cpu,
    items: [
      "Custom PCB design",
      "Firmware development",
      "ESP32 & ARM microcontrollers",
      "Sensor integration",
      "BLE/WiFi provisioning",
      "LoRaWAN networks",
    ],
  },
  {
    category: "Backend & APIs",
    icon: Settings,
    items: [
      "REST & GraphQL APIs",
      "Node.js & Python services",
      "Database design",
      "Real-time backends",
      "Data pipelines",
      "Job queues & scheduling",
    ],
  },
  {
    category: "Cloud & Infrastructure",
    icon: Cloud,
    items: [
      "AWS & Google Cloud setup",
      "Serverless architecture",
      "CI/CD pipelines",
      "Kubernetes deployment",
      "Infrastructure as Code",
      "Cost optimization",
    ],
  },
  {
    category: "Security & Auth",
    icon: Lock,
    items: [
      "Authentication systems",
      "Multi-tenant architecture",
      "OAuth & SAML integration",
      "Data encryption",
      "Security audits",
      "Compliance (GDPR, SOC2)",
    ],
  },
]

export default function ServicesPage() {
  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 sm:py-28 md:py-32 border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            eyebrow="Our Services"
            title="Complete software + hardware solutions"
            subtitle="From concept to production, we provide end-to-end design and development services across web, mobile, and hardware platforms"
          />
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6">
            {services.map((service) => (
              <Card key={service.category} className="hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardHeader>
                  <div className="flex items-center gap-3 mb-2">
                    <div className="p-2 rounded-md bg-accent/10">
                      <service.icon className="w-5 h-5 text-accent" strokeWidth={1.5} />
                    </div>
                    <CardTitle className="text-lg">{service.category}</CardTitle>
                  </div>
                </CardHeader>
                <CardContent>
                  <ul className="space-y-2">
                    {service.items.map((item) => (
                      <li key={item} className="flex gap-2 text-sm text-muted-foreground">
                        <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                        <span>{item}</span>
                      </li>
                    ))}
                  </ul>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Process */}
      <section className="py-20 sm:py-28 bg-muted/30 border-t border-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            eyebrow="Our Process"
            title="How we work"
            subtitle="A proven methodology for shipping great products"
          />

          <div className="space-y-6">
            {[
              {
                num: "01",
                title: "Discovery",
                desc: "We understand your goals, users, and constraints. Requirements gathering, competitive analysis, and technical feasibility assessment.",
              },
              {
                num: "02",
                title: "Design",
                desc: "Wireframes, prototypes, and design systems. We validate ideas with users before writing code.",
              },
              {
                num: "03",
                title: "Development",
                desc: "Agile sprints with bi-weekly demos. Clean code, comprehensive testing, and documentation.",
              },
              {
                num: "04",
                title: "Launch",
                desc: "Deployment, monitoring setup, and user training. You get full handoff docs and code ownership.",
              },
              {
                num: "05",
                title: "Support",
                desc: "Ongoing maintenance, feature development, and optimization. Available as retainer or hourly basis.",
              },
            ].map((step) => (
              <div key={step.num} className="flex gap-6 items-start">
                <div className="w-16 h-16 rounded-lg bg-accent/10 flex items-center justify-center flex-shrink-0">
                  <span className="text-xl font-bold text-accent">{step.num}</span>
                </div>
                <div className="flex-1 pt-1">
                  <h3 className="text-lg font-semibold text-foreground mb-2">{step.title}</h3>
                  <p className="text-muted-foreground">{step.desc}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Tech Stack */}
      <section className="py-20 sm:py-28">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            eyebrow="Technology"
            title="Our preferred stack"
            subtitle="Modern, proven technologies for scalable products"
          />

          <div className="grid sm:grid-cols-2 gap-8">
            <div>
              <h3 className="font-semibold text-foreground mb-4">Frontend</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["React & Next.js", "TypeScript", "Tailwind CSS", "React Native", "Expo"].map((tech) => (
                  <li key={tech} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Backend</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["Node.js & Express", "Python & FastAPI", "PostgreSQL", "Redis", "Supabase"].map((tech) => (
                  <li key={tech} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Cloud & DevOps</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["AWS", "Google Cloud", "Vercel", "Docker", "Kubernetes"].map((tech) => (
                  <li key={tech} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>

            <div>
              <h3 className="font-semibold text-foreground mb-4">Embedded</h3>
              <ul className="space-y-2 text-sm text-muted-foreground">
                {["ESP32 & ARM", "Embedded C/Rust", "FreeRTOS", "PCB Design", "BLE/WiFi"].map((tech) => (
                  <li key={tech} className="flex gap-2">
                    <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                    {tech}
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="py-20 sm:py-28 bg-muted/30 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Ready to build?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Let's discuss your project and see how we can help
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Get in Touch</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
