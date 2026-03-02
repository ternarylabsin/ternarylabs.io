"use client"

import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card"
import { Badge } from "@/components/ui/Badge"
import { Button } from "@/components/ui/Button"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/Dialog"
import { ArrowRight } from "lucide-react"

export interface CaseStudy {
  id: string
  title: string
  description: string
  problem: string
  solution: string
  outcomes: string[]
  tags: string[]
  stack: string[]
  image?: string
}

interface CaseStudyCardProps {
  caseStudy: CaseStudy
}

export function CaseStudyCard({ caseStudy }: CaseStudyCardProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>
        <Card className="cursor-pointer transition-all hover:shadow-lg hover:-translate-y-1">
          <CardHeader>
            <div className="flex items-start justify-between mb-2">
              <div className="flex-1">
                <CardTitle className="text-lg">{caseStudy.title}</CardTitle>
                <CardDescription className="mt-2">{caseStudy.description}</CardDescription>
              </div>
              <ArrowRight className="w-5 h-5 text-accent flex-shrink-0" strokeWidth={1.5} />
            </div>
          </CardHeader>
          <CardContent>
            <div className="flex flex-wrap gap-2">
              {caseStudy.tags.map((tag) => (
                <Badge key={tag} variant="secondary" className="cursor-default">
                  {tag}
                </Badge>
              ))}
            </div>
          </CardContent>
        </Card>
      </DialogTrigger>

      <DialogContent className="max-w-2xl max-h-[80vh] overflow-y-auto">
        <DialogHeader>
          <DialogTitle>{caseStudy.title}</DialogTitle>
          <DialogDescription>{caseStudy.description}</DialogDescription>
        </DialogHeader>

        <div className="space-y-6">
          <section>
            <h3 className="text-lg font-semibold mb-2">The Problem</h3>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.problem}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Our Solution</h3>
            <p className="text-muted-foreground leading-relaxed">{caseStudy.solution}</p>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-3">Outcomes</h3>
            <ul className="space-y-2">
              {caseStudy.outcomes.map((outcome, i) => (
                <li key={i} className="flex gap-2 text-muted-foreground">
                  <span className="text-accent font-semibold">✓</span>
                  <span>{outcome}</span>
                </li>
              ))}
            </ul>
          </section>

          <section>
            <h3 className="text-lg font-semibold mb-2">Technology Stack</h3>
            <div className="flex flex-wrap gap-2">
              {caseStudy.stack.map((tech) => (
                <Badge key={tech} variant="outline">
                  {tech}
                </Badge>
              ))}
            </div>
          </section>

          <div className="pt-4">
            <Button className="w-full" asChild>
              <a href="/contact">Start Your Own Project</a>
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  )
}
