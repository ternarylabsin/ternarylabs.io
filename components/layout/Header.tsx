"use client"

import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Package } from "lucide-react"
import { useState, useEffect } from "react"

export default function Header() {
  const [isScrolled, setIsScrolled] = useState(false)

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 10)
    }
    window.addEventListener("scroll", handleScroll)
    return () => window.removeEventListener("scroll", handleScroll)
  }, [])

  return (
    <header
      className={`sticky top-0 z-40 transition-all duration-200 ${
        isScrolled
          ? "bg-background/80 border-b border-border backdrop-blur-md"
          : "bg-background"
      }`}
    >
      <nav className="max-w-6xl mx-auto px-4 h-16 flex items-center justify-between">
        {/* Logo and Brand */}
        <Link href="/" className="flex items-center gap-2 hover:opacity-80 transition-opacity">
          <div className="w-10 h-10 rounded-md border border-border bg-accent/10 flex items-center justify-center">
            <Package className="w-6 h-6 text-accent" strokeWidth={1.5} />
          </div>
          <div className="hidden sm:block">
            <div className="font-semibold text-foreground">Ternary Labs</div>
            <div className="text-xs text-muted-foreground">Design + Build</div>
          </div>
        </Link>

        {/* Nav Items */}
        <div className="hidden md:flex items-center gap-8">
          <Link href="/" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
            Home
          </Link>
          <Link href="/services" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
            Services
          </Link>
          <Link href="/work" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
            Work
          </Link>
          <Link href="/labs" className="text-sm font-medium text-foreground hover:text-accent transition-colors">
            Labs
          </Link>
        </div>

        {/* CTA Buttons */}
        <div className="flex items-center gap-3">
          <Button variant="outline" size="sm" asChild>
            <Link href="/contact">Contact</Link>
          </Button>
          <Button size="sm" asChild className="hidden sm:inline-flex">
            <Link href="/work">View Work</Link>
          </Button>
        </div>
      </nav>
    </header>
  )
}
