import { Metadata } from "next"

export const metadata: Metadata = {
  title: "Terms of Service - Ternary Labs",
  description: "Terms of service for Ternary Labs",
}

export default function TermsPage() {
  return (
    <main className="min-h-screen">
      <div className="max-w-4xl mx-auto px-4 py-20">
        <h1 className="text-4xl font-bold mb-8 text-foreground">Terms of Service</h1>

        <div className="prose prose-invert max-w-none space-y-6 text-muted-foreground">
          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">1. Agreement to Terms</h2>
            <p>
              By accessing and using this website and our services, you accept and agree to be bound by the terms and provision of this agreement.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">2. Use License</h2>
            <p>
              Permission is granted to temporarily download one copy of the materials (information or software) on Ternary Labs's website for personal, non-commercial transitory viewing only. This is the grant of a license, not a transfer of title, and under this license you may not:
            </p>
            <ul className="list-disc list-inside space-y-2 ml-4">
              <li>Modify or copy the materials</li>
              <li>Use the materials for any commercial purpose or for any public display</li>
              <li>Attempt to decompile or reverse engineer any software contained on the website</li>
              <li>Remove any copyright or other proprietary notations from the materials</li>
              <li>Transfer the materials to another person or "mirror" the materials on any other server</li>
            </ul>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">3. Disclaimer</h2>
            <p>
              The materials on Ternary Labs's website are provided on an 'as is' basis. Ternary Labs makes no warranties, expressed or implied, and hereby disclaims and negates all other warranties including, without limitation, implied warranties or conditions of merchantability, fitness for a particular purpose, or non-infringement of intellectual property or other violation of rights.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">4. Limitations</h2>
            <p>
              In no event shall Ternary Labs or its suppliers be liable for any damages (including, without limitation, damages for loss of data or profit, or due to business interruption) arising out of the use or inability to use the materials on Ternary Labs's website.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">5. Revisions</h2>
            <p>
              Ternary Labs may revise these terms of service for the website at any time without notice. By using this website you are agreeing to be bound by the then current version of these terms of service.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">6. Governing Law</h2>
            <p>
              These terms and conditions are governed by and construed in accordance with the laws of California, and you irrevocably submit to the exclusive jurisdiction of the courts located in California.
            </p>
          </section>

          <section>
            <h2 className="text-2xl font-semibold text-foreground mb-4">7. Contact Information</h2>
            <p>
              If you have any questions about these Terms of Service, please contact us at{" "}
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
