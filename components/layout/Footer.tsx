import Link from "next/link"
import { Button } from "@/components/ui/Button"
import { Package, Mail, Github, Linkedin } from "lucide-react"

export default function Footer() {
  const currentYear = new Date().getFullYear()

  return (
    <footer className="border-t border-border bg-background mt-20">
      {/* CTA Section */}
      <div className="max-w-6xl mx-auto px-4 py-16 border-b border-border">
        <div className="flex items-center justify-between flex-col sm:flex-row gap-8">
          <div>
            <h3 className="text-2xl font-semibold mb-2">Ready to build something great?</h3>
            <p className="text-muted-foreground">Let's discuss your next project</p>
          </div>
          <div className="flex gap-3">
            <Button variant="outline" asChild>
              <Link href="/work">View Work</Link>
            </Button>
            <Button asChild>
              <Link href="/contact">Contact Us</Link>
            </Button>
          </div>
        </div>
      </div>

      {/* Footer Content */}
      <div className="max-w-6xl mx-auto px-4 py-12">
        <div className="grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
          {/* Brand */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <div className="w-8 h-8 rounded-md border border-border bg-accent/10 flex items-center justify-center">
                <Package className="w-5 h-5 text-accent" strokeWidth={1.5} />
              </div>
              <div>
                <div className="font-semibold text-foreground">Ternary Labs</div>
              </div>
            </div>
            <p className="text-sm text-muted-foreground">Software + hardware design & development</p>
          </div>

          {/* Quick Links */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Company</h4>
            <ul className="space-y-2">
              <li><Link href="/" className="text-sm text-muted-foreground hover:text-accent transition-colors">Home</Link></li>
              <li><Link href="/services" className="text-sm text-muted-foreground hover:text-accent transition-colors">Services</Link></li>
              <li><Link href="/work" className="text-sm text-muted-foreground hover:text-accent transition-colors">Work</Link></li>
              <li><Link href="/labs" className="text-sm text-muted-foreground hover:text-accent transition-colors">Labs</Link></li>
            </ul>
          </div>

          {/* Legal */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Legal</h4>
            <ul className="space-y-2">
              <li><Link href="/privacy" className="text-sm text-muted-foreground hover:text-accent transition-colors">Privacy</Link></li>
              <li><Link href="/terms" className="text-sm text-muted-foreground hover:text-accent transition-colors">Terms</Link></li>
            </ul>
          </div>

          {/* Social */}
          <div>
            <h4 className="font-semibold mb-4 text-foreground">Connect</h4>
            <div className="flex gap-3">
              <a
                href="mailto:hello@ternarylabs.io"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="Email"
              >
                <Mail className="w-5 h-5" />
              </a>
              <a
                href="https://github.com/ternarylabsin"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="GitHub"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Github className="w-5 h-5" />
              </a>
              <a
                href="https://linkedin.com/company/ternary-labs"
                className="text-muted-foreground hover:text-accent transition-colors"
                aria-label="LinkedIn"
                target="_blank"
                rel="noopener noreferrer"
              >
                <Linkedin className="w-5 h-5" />
              </a>
            </div>
          </div>
        </div>

        {/* Footer Bottom */}
        <div className="border-t border-border pt-8 flex flex-col sm:flex-row justify-between items-center gap-4">
          <p className="text-xs text-muted-foreground">
            &copy; {currentYear} Ternary Labs. All rights reserved.
          </p>
          <p className="text-xs text-muted-foreground">
            Crafted with precision in the cloud
          </p>
        </div>
      </div>
    </footer>
  )
}
