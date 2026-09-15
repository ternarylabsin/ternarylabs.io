import { useEffect, useState, type ReactNode } from 'react'

export default function DisclosureSection({
  title,
  id,
  defaultOpen = false,
  children,
}: {
  title: string
  id?: string
  defaultOpen?: boolean
  children: ReactNode
}) {
  const [open, setOpen] = useState(defaultOpen)

  useEffect(() => {
    setOpen(defaultOpen)
  }, [defaultOpen])

  return (
    <details
      id={id}
      className="soa-wiki-disclosure"
      open={open}
      onToggle={(event) => {
        const next = event.currentTarget.open
        if (next !== open) setOpen(next)
      }}
    >
      <summary className="soa-wiki-disclosure-summary">{title}</summary>
      <div className="soa-wiki-disclosure-body">{children}</div>
    </details>
  )
}
