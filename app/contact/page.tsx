"use client"

import { useState } from "react"
import { useForm } from "react-hook-form"
import { zodResolver } from "@hookform/resolvers/zod"
import * as z from "zod"
import { Button } from "@/components/ui/Button"
import { Input } from "@/components/ui/Input"
import { Textarea } from "@/components/ui/Textarea"
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/Card"
import { SectionHeader } from "@/components/marketing/SectionHeader"
import { Mail, Phone, MapPin, CheckCircle2 } from "lucide-react"
import Link from "next/link"

const contactSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email address"),
  company: z.string().optional(),
  projectType: z.string().min(1, "Please select a project type"),
  budget: z.string().optional(),
  message: z.string().min(10, "Message must be at least 10 characters"),
})

type ContactFormData = z.infer<typeof contactSchema>

export default function ContactPage() {
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [submitSuccess, setSubmitSuccess] = useState(false)

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<ContactFormData>({
    resolver: zodResolver(contactSchema),
    mode: "onBlur",
  })

  const onSubmit = async (data: ContactFormData) => {
    setIsSubmitting(true)
    try {
      const response = await fetch("/api/contact", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      })

      if (response.ok) {
        setSubmitSuccess(true)
        reset()
        setTimeout(() => setSubmitSuccess(false), 5000)
      }
    } catch (error) {
      console.error("Error submitting form:", error)
    } finally {
      setIsSubmitting(false)
    }
  }

  return (
    <main className="min-h-screen">
      {/* Hero */}
      <section className="py-20 sm:py-28 md:py-32 border-b border-border">
        <div className="max-w-4xl mx-auto px-4">
          <SectionHeader
            eyebrow="Get in Touch"
            title="Let's build together"
            subtitle="Have a project in mind? We'd love to hear about it. Fill out the form and we'll get back to you within 24 hours."
          />
        </div>
      </section>

      {/* Content */}
      <section className="py-20 sm:py-28">
        <div className="max-w-6xl mx-auto px-4">
          <div className="grid lg:grid-cols-3 gap-12">
            {/* Info */}
            <div className="space-y-6 lg:col-span-1">
              <div>
                <h3 className="font-semibold text-foreground mb-8">Contact Information</h3>
                <div className="space-y-4">
                  <a
                    href="mailto:hello@ternarylabs.io"
                    className="flex gap-3 items-start text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Mail className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="font-semibold text-foreground">Email</div>
                      <div>hello@ternarylabs.io</div>
                    </div>
                  </a>

                  <a
                    href="tel:+1234567890"
                    className="flex gap-3 items-start text-muted-foreground hover:text-accent transition-colors"
                  >
                    <Phone className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="font-semibold text-foreground">Phone</div>
                      <div>+1 (555) 123-4567</div>
                    </div>
                  </a>

                  <div className="flex gap-3 items-start text-muted-foreground">
                    <MapPin className="w-5 h-5 flex-shrink-0 mt-0.5" strokeWidth={1.5} />
                    <div>
                      <div className="font-semibold text-foreground">Location</div>
                      <div>San Francisco, CA</div>
                    </div>
                  </div>
                </div>
              </div>

              <div>
                <h3 className="font-semibold text-foreground mb-4">Response time</h3>
                <ul className="space-y-2 text-sm text-muted-foreground">
                  {[
                    "Inquiries: 24 hours",
                    "Quotes: 1-2 business days",
                    "Strategy calls: 1 week",
                  ].map((item) => (
                    <li key={item} className="flex gap-2">
                      <CheckCircle2 className="w-4 h-4 text-accent flex-shrink-0 mt-0.5" strokeWidth={2} />
                      {item}
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            {/* Form */}
            <div className="lg:col-span-2">
              <Card>
                <CardHeader>
                  <CardTitle>Send us a message</CardTitle>
                </CardHeader>
                <CardContent>
                  {submitSuccess ? (
                    <div className="space-y-4 py-8 text-center">
                      <CheckCircle2 className="w-12 h-12 text-accent mx-auto" strokeWidth={1.5} />
                      <h3 className="text-lg font-semibold text-foreground">Thank you!</h3>
                      <p className="text-muted-foreground">
                        We've received your message and will get back to you soon.
                      </p>
                    </div>
                  ) : (
                    <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Name *
                          </label>
                          <Input
                            {...register("name")}
                            placeholder="Your name"
                            className={errors.name ? "border-red-500" : ""}
                          />
                          {errors.name && (
                            <p className="text-red-500 text-sm mt-1">{errors.name.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Email *
                          </label>
                          <Input
                            {...register("email")}
                            type="email"
                            placeholder="you@company.com"
                            className={errors.email ? "border-red-500" : ""}
                          />
                          {errors.email && (
                            <p className="text-red-500 text-sm mt-1">{errors.email.message}</p>
                          )}
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Company
                        </label>
                        <Input {...register("company")} placeholder="Your company" />
                      </div>

                      <div className="grid sm:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Project Type *
                          </label>
                          <select
                            {...register("projectType")}
                            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Select a type</option>
                            <option value="web">Web Application</option>
                            <option value="mobile">Mobile App</option>
                            <option value="hardware">Hardware</option>
                            <option value="saas">SaaS Platform</option>
                            <option value="other">Other</option>
                          </select>
                          {errors.projectType && (
                            <p className="text-red-500 text-sm mt-1">{errors.projectType.message}</p>
                          )}
                        </div>

                        <div>
                          <label className="block text-sm font-semibold text-foreground mb-2">
                            Budget Range
                          </label>
                          <select
                            {...register("budget")}
                            className="w-full h-10 px-3 py-2 rounded-md border border-input bg-background text-foreground ring-offset-background focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring"
                          >
                            <option value="">Select budget</option>
                            <option value="5-25k">$5K - $25K</option>
                            <option value="25-50k">$25K - $50K</option>
                            <option value="50-100k">$50K - $100K</option>
                            <option value="100k+">$100K+</option>
                          </select>
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm font-semibold text-foreground mb-2">
                          Message *
                        </label>
                        <Textarea
                          {...register("message")}
                          placeholder="Tell us about your project..."
                          className={errors.message ? "border-red-500" : ""}
                          rows={5}
                        />
                        {errors.message && (
                          <p className="text-red-500 text-sm mt-1">{errors.message.message}</p>
                        )}
                      </div>

                      <Button type="submit" className="w-full" disabled={isSubmitting}>
                        {isSubmitting ? "Sending..." : "Send Message"}
                      </Button>
                    </form>
                  )}
                </CardContent>
              </Card>
            </div>
          </div>
        </div>
      </section>

      {/* Schedule Call */}
      <section className="py-20 sm:py-28 bg-muted/30 border-t border-border">
        <div className="max-w-2xl mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Prefer a quick call?</h2>
          <p className="text-lg text-muted-foreground mb-8">
            Schedule a 30-minute discovery call with our team
          </p>
          <Button size="lg" variant="outline" asChild>
            <a
              href="https://calendly.com/ternarylabs"
              target="_blank"
              rel="noopener noreferrer"
            >
              Book a Call
            </a>
          </Button>
        </div>
      </section>
    </main>
  )
}
