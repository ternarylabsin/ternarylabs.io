import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Privacy Policy - Ternary Labs",
  description: "Privacy policy for Ternary Labs",
}

export default function PrivacyPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Privacy Policy</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Introduction</h2>
            <p>
              Ternary Labs ("Company," "we," "our," or "us") is committed to protecting your privacy. This Privacy Policy explains how we collect, use, disclose, and otherwise process personal information in connection with our website and services.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Information We Collect</h2>
            <p>We collect information you provide directly to us, such as:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Contact information (name, email, phone)</li>
              <li>Company information</li>
              <li>Project details and preferences</li>
              <li>Communications and inquiries</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">How We Use Your Information</h2>
            <p>We use the information we collect to:</p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Respond to your inquiries and requests</li>
              <li>Provide and improve our services</li>
              <li>Communicate about projects and updates</li>
              <li>Comply with legal obligations</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Data Security</h2>
            <p>
              We implement appropriate technical and organizational measures designed to protect personal information against unauthorized access, alteration, disclosure, or destruction.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">Contact Us</h2>
            <p>
              If you have questions about this Privacy Policy, please contact us at{" "}
              <a href="mailto:hello@ternarylabs.io" className="text-accent hover:underline">
                hello@ternarylabs.io
              </a>
            </p>
          </section>

          <section className="text-sm pt-8 border-t border-border">
            <p>Last updated: February 14, 2026</p>
          </section>
        </div>
      </div>
    </main>
  )
}
