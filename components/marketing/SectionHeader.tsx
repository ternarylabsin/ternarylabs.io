interface SectionHeaderProps {
  eyebrow?: string
  title: string
  subtitle?: string
}

export function SectionHeader({ eyebrow, title, subtitle }: SectionHeaderProps) {
  return (
    <div className="space-y-3 mb-12">
      {eyebrow && (
        <p className="text-sm font-semibold text-accent uppercase tracking-wide">
          {eyebrow}
        </p>
      )}
      <h2 className="text-3xl sm:text-4xl font-bold text-foreground">
        {title}
      </h2>
      {subtitle && (
        <p className="text-lg text-muted-foreground max-w-2xl">
          {subtitle}
        </p>
      )}
    </div>
  )
}
