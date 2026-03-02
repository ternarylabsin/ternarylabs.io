import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { LucideIcon } from "lucide-react"
import { ArrowRight } from "lucide-react"

interface WorkflowStep {
  label: string
  icon?: LucideIcon
}

interface WorkflowProps {
  title: string
  steps: WorkflowStep[]
  icon?: LucideIcon
}

export function Workflow({ title, steps, icon: Icon }: WorkflowProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          {Icon && (
            <div className="p-2 rounded-md bg-accent/10">
              <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
            </div>
          )}
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <div className="space-y-3">
          {steps.map((step, index) => (
            <div key={index} className="flex items-center gap-3">
              {step.icon && (
                <div className="p-1.5 rounded-md bg-muted">
                  <step.icon className="w-4 h-4 text-muted-foreground" strokeWidth={1.5} />
                </div>
              )}
              <span className="text-sm text-foreground">{step.label}</span>
              {index < steps.length - 1 && (
                <ArrowRight className="w-4 h-4 text-muted-foreground ml-auto" strokeWidth={1.5} />
              )}
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  )
}
