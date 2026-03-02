import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { LucideIcon } from "lucide-react"

interface MiniCardProps {
  title: string
  description: string
  icon: LucideIcon
}

export function MiniCard({ title, description, icon: Icon }: MiniCardProps) {
  return (
    <Card>
      <CardHeader className="pb-3">
        <div className="flex items-center gap-3">
          <div className="p-2 rounded-md bg-accent/10">
            <Icon className="w-4 h-4 text-accent" strokeWidth={1.5} />
          </div>
          <CardTitle className="text-base">{title}</CardTitle>
        </div>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{description}</p>
      </CardContent>
    </Card>
  )
}
