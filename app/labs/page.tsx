"use client"

import { useState } from "react"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { SectionHeader } from "@/components/marketing/SectionHeader"
import { Cpu, Wifi, Zap, Smartphone, Eye, GitBranch, Code2 } from "lucide-react"
import Link from "next/link"

interface Prototype {
  id: string
  title: string
  description: string
  status: "active" | "completed" | "experimental"
  technologies: string[]
  idea: string
  outcome?: string
  github?: string
  demo?: string
  icon: React.ReactNode
}

const prototypes: Prototype[] = [
  {
    id: "1",
    title: "Ultra-Low Power Mesh Network",
    description: "Exploring battery-free IoT networks using energy harvesting",
    status: "experimental",
    technologies: ["ESP32", "Energy Harvesting", "Mesh Networking"],
    idea: "Can we build a network where nodes never need battery replacement?",
    outcome: "Achieved 5-year operation with solar + kinetic harvesting on prototype boards",
    github: "https://github.com/ternarylabsin/mesh-harvesting",
    icon: <Wifi className="w-6 h-6" />,
  },
  {
    id: "2",
    title: "AI-Powered Code Reviews",
    description: "Local LLM for code quality and security analysis",
    status: "active",
    technologies: ["LLaMA 2", "Node.js", "Git API"],
    idea: "Can we run effective code reviews entirely on-device without external APIs?",
    outcome: "Successfully integrated into GitHub with <2s latency per PR",
    github: "https://github.com/ternarylabsin/ai-code-review",
    demo: "https://ai-review.ternary.local",
    icon: <Code2 className="w-6 h-6" />,
  },
  {
    id: "3",
    title: "Gesture Control Protocol",
    description: "Hand gesture recognition for wearable device control",
    status: "completed",
    technologies: ["MediaPipe", "WebGL", "React Native"],
    idea: "Gesture control without cameras - using radar sensors instead",
    outcome: "Achieved 95% accuracy at 10cm range with <50ms latency",
    github: "https://github.com/ternarylabsin/gesture-radar",
    icon: <Eye className="w-6 h-6" />,
  },
  {
    id: "4",
    title: "Distributed ML Training",
    description: "Training large models across heterogeneous edge devices",
    status: "experimental",
    technologies: ["TensorFlow Lite", "Python", "Federated Learning"],
    idea: "What if devices could train ML models collectively without sharing data?",
    outcome: "Prototype trained on 100 devices achieved 92% accuracy vs 94% centralized",
    icon: <Cpu className="w-6 h-6" />,
  },
  {
    id: "5",
    title: "Haptic Feedback Library",
    description: "Cross-platform haptic effects for web and mobile",
    status: "active",
    technologies: ["React", "React Native", "Web Haptics API"],
    idea: "Unified haptic experience - same code on web, iOS, Android",
    outcome: "Open-sourced library used by 2k+ developers",
    github: "https://github.com/ternarylabsin/haptic-js",
    demo: "https://haptic-demo.ternary.dev",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "6",
    title: "Wireless Power Transfer",
    description: "Long-range wireless charging for IoT devices",
    status: "experimental",
    technologies: ["RF Engineering", "PCB Design", "Embedded C"],
    idea: "Can we charge devices 1 meter away without contact?",
    outcome: "Achieved 5W transfer at 50cm with 60% efficiency",
    github: "https://github.com/ternarylabsin/wireless-power",
    icon: <Zap className="w-6 h-6" />,
  },
  {
    id: "7",
    title: "React Native for Embedded",
    description: "Running React Native on microcontroller displays",
    status: "completed",
    technologies: ["React Native", "ARM", "Display Drivers"],
    idea: "Can we use React for embedded UI with 2MB RAM?",
    outcome: "Working prototype with 60fps UI on ESP32-S3 with 8MB PSRAM",
    github: "https://github.com/ternarylabsin/rn-embedded",
    icon: <Smartphone className="w-6 h-6" />,
  },
]

const openSource = [
  {
    name: "Haptic Feedback Library",
    description: "Cross-platform haptic effects for web and mobile",
    stars: 2400,
    url: "https://github.com/ternarylabsin/haptic-js",
  },
  {
    name: "ESP32 Device Manager",
    description: "Cloud management for ESP32 fleets",
    stars: 1800,
    url: "https://github.com/ternarylabsin/esp32-manager",
  },
  {
    name: "React Query Persist",
    description: "Local-first persistence plugin for React Query",
    stars: 950,
    url: "https://github.com/ternarylabsin/react-query-persist",
  },
]

export default function LabsPage() {
  const [expandedPrototype, setExpandedPrototype] = useState<string | null>(null)

  const getStatusColor = (status: string) => {
    switch (status) {
      case "active":
        return "bg-green-500/10 text-green-700 dark:text-green-400"
      case "completed":
        return "bg-blue-500/10 text-blue-700 dark:text-blue-400"
      case "experimental":
        return "bg-amber-500/10 text-amber-700 dark:text-amber-400"
      default:
        return "bg-gray-500/10 text-gray-700 dark:text-gray-400"
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 sm:py-28 md:py-32 border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            eyebrow="Ternary Labs"
            title="Research & Development"
            subtitle="Exploring the future of software and hardware. Prototypes, experiments, and open-source projects"
          />
          <p className="text-muted-foreground mt-4">
            We invest in R&D to stay at the cutting edge. Here's what we're working on.
          </p>
        </div>
      </section>

      {/* Prototypes */}
      <section className="py-20 sm:py-28 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            eyebrow="Active & Experimental"
            title="Our prototypes"
            subtitle="Click to see details"
          />

          <div className="space-y-4">
            {prototypes.map((prototype) => (
              <div key={prototype.id}>
                <Card
                  className="cursor-pointer hover:shadow-md transition-all"
                  onClick={() => setExpandedPrototype(
                    expandedPrototype === prototype.id ? null : prototype.id
                  )}
                >
                  <CardHeader>
                    <div className="flex items-start justify-between">
                      <div className="flex items-start gap-4 flex-1">
                        <div className="p-3 rounded-lg bg-accent/10">
                          {prototype.icon}
                        </div>
                        <div className="flex-1">
                          <div className="flex items-center gap-2 mb-1">
                            <CardTitle className="text-lg">{prototype.title}</CardTitle>
                            <Badge className={getStatusColor(prototype.status)}>
                              {prototype.status}
                            </Badge>
                          </div>
                          <CardDescription>{prototype.description}</CardDescription>
                        </div>
                      </div>
                    </div>
                  </CardHeader>

                  {expandedPrototype === prototype.id && (
                    <CardContent className="space-y-4 border-t border-border pt-4">
                      <div>
                        <h4 className="font-semibold text-foreground mb-2">The Idea</h4>
                        <p className="text-muted-foreground text-sm">{prototype.idea}</p>
                      </div>

                      {prototype.outcome && (
                        <div>
                          <h4 className="font-semibold text-foreground mb-2">Current Status</h4>
                          <p className="text-muted-foreground text-sm">{prototype.outcome}</p>
                        </div>
                      )}

                      <div>
                        <h4 className="font-semibold text-foreground mb-2">Technologies</h4>
                        <div className="flex flex-wrap gap-2">
                          {prototype.technologies.map((tech) => (
                            <Badge key={tech} variant="secondary" className="text-xs">
                              {tech}
                            </Badge>
                          ))}
                        </div>
                      </div>

                      <div className="flex gap-2 pt-2">
                        {prototype.github && (
                          <Button
                            size="sm"
                            variant="outline"
                            asChild
                          >
                            <a href={prototype.github} target="_blank" rel="noopener noreferrer">
                              GitHub
                            </a>
                          </Button>
                        )}
                        {prototype.demo && (
                          <Button size="sm" asChild>
                            <a href={prototype.demo} target="_blank" rel="noopener noreferrer">
                              Live Demo
                            </a>
                          </Button>
                        )}
                      </div>
                    </CardContent>
                  )}
                </Card>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Open Source */}
      <section className="py-20 sm:py-28 bg-muted/30 border-b border-border">
        <div className="max-w-6xl mx-auto px-4">
          <SectionHeader
            eyebrow="Open Source"
            title="Projects we've shared"
            subtitle="Contributing back to the community"
          />

          <div className="grid md:grid-cols-3 gap-4">
            {openSource.map((project) => (
              <Card key={project.name} className="hover:shadow-lg hover:-translate-y-1 transition-all">
                <CardHeader>
                  <CardTitle className="text-lg">{project.name}</CardTitle>
                  <CardDescription>{project.description}</CardDescription>
                </CardHeader>
                <CardContent>
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-1 text-sm text-muted-foreground">
                      <GitBranch className="w-4 h-4" />
                      {project.stars}★
                    </div>
                    <Button
                      size="sm"
                      variant="outline"
                      asChild
                    >
                      <a href={project.url} target="_blank" rel="noopener noreferrer">
                        View
                      </a>
                    </Button>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Get Involved */}
      <section className="py-20 sm:py-28">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Interested in collaboration?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            We're always looking for partners to explore new technologies and ideas
          </p>
          <Button size="lg" asChild>
            <Link href="/contact">Let's Talk</Link>
          </Button>
        </div>
      </section>
    </main>
  )
}
