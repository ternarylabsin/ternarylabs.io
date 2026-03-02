import type { Metadata } from "next"
import { Inter } from "next/font/google"
import "./globals.css"
import Header from "@/components/layout/Header"
import Footer from "@/components/layout/Footer"

const inter = Inter({ subsets: ["latin"] })

export const metadata: Metadata = {
  title: "Ternary Labs - Software + Hardware Design",
  description: "Web, mobile, and hardware design and development specialists. We build MVPs to production systems.",
  keywords: "web design, mobile app development, hardware prototyping, IoT, software development",
  authors: [{ name: "Ternary Labs" }],
  openGraph: {
    type: "website",
    locale: "en_US",
    url: "https://ternarylabs.io",
    siteName: "Ternary Labs",
    title: "Ternary Labs - Software + Hardware Design",
    description: "Web, mobile, and hardware design and development specialists.",
    images: [
      {
        url: "https://ternarylabs.io/og-image.png",
        width: 1200,
        height: 630,
        alt: "Ternary Labs",
      },
    ],
  },
  twitter: {
    card: "summary_large_image",
    title: "Ternary Labs - Software + Hardware Design",
    description: "Web, mobile, and hardware design and development specialists.",
    images: ["https://ternarylabs.io/og-image.png"],
  },
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={inter.className}>
        <div className="flex flex-col min-h-screen">
          <Header />
          <main className="flex-grow">
            {children}
          </main>
          <Footer />
        </div>
      </body>
    </html>
  )
}
