# Ternary Labs - Interactive Marketing Website

A modern, interactive marketing website for Ternary Labs - a software + hardware startup specializing in web, mobile, and IoT product development.

## 🚀 Tech Stack

- **Framework**: Next.js 16+ (App Router)
- **Language**: TypeScript
- **Styling**: Tailwind CSS v4 with CSS custom properties
- **UI Components**: shadcn/ui (Button, Card, Badge, Tabs, Accordion, Input, Textarea, Dialog, Sheet)
- **Icons**: lucide-react
- **Animations**: framer-motion
- **Forms**: react-hook-form + zod for validation
- **Deployment**: Vercel-ready

## 📁 Project Structure

```
app/
├── layout.tsx              # Root layout with header/footer
├── globals.css             # Global styles and CSS variables
├── page.tsx                # Landing page (/) with hero, tabs, case studies, FAQ
├── services/page.tsx       # Services detail page
├── work/page.tsx           # Work/case studies with filtering
├── labs/page.tsx           # R&D prototypes and experiments
├── contact/page.tsx        # Contact form
├── privacy/page.tsx        # Privacy policy
├── terms/page.tsx          # Terms of service
└── api/contact/route.ts    # Contact form API endpoint

components/
├── ui/                     # shadcn/ui components
├── layout/
│   ├── Header.tsx          # Sticky navigation header
│   └── Footer.tsx          # Footer with CTA and links
└── marketing/              # Custom marketing components
```

## ✨ Key Features

### Landing Page (/)
- Hero section with badges, headline, CTAs, and bullet points
- Right-side cards ("What we build" and "How we work")
- Tabbed content (Overview, Software, Hardware, Delivery)
- Feature grid with icon + title + description
- Case studies preview with interactive filtering
- FAQ accordion with 5 common questions

### Services Page (/services)
- Service listings by category (6 categories)
- Work process breakdown
- Technology stack showcase
- CTA footer

### Work Page (/work)
- Full case study library (9 detailed studies)
- Search and multi-select filtering
- Interactive case study cards with modal details
- Technology stack and outcomes display

### Labs Page (/labs)
- 7 active R&D prototypes with descriptions
- Expandable cards with GitHub links
- Open-source projects showcase
- Collaboration CTA

### Contact Page (/contact)
- Validated form (Zod + react-hook-form)
- Contact information sidebar
- "Book a call" CTA (Calendly link)
- Form submission to `/api/contact`

## 🎨 Design System

| Element | Style |
|---------|-------|
| **Background** | Light: 100% white / Dark: 3.6% black |
| **Accent** | Vibrant red (0° 84.2% 60.2%) |
| **Border** | Subtle gray (89.8%) |
| **Border Radius** | 0.5rem |
| **Transitions** | 200ms default |

## 🏃 Getting Started

### Prerequisites
- Node.js 18+
- npm or yarn

### Installation
```bash
npm install
```

### Development Server
```bash
npm run dev
# Open http://localhost:3000
```

### Production Build
```bash
npm run build
npm start
```

## 📝 Configuration

### Environment Variables
Create `.env.local` (optional):
```env
CONTACT_EMAIL=hello@ternarylabs.io
```

### Content Updates
- **Copy & SEO**: Edit `.tsx` files directly
- **Case Studies**: `app/work/page.tsx` & `app/page.tsx` → `caseStudies` array
- **FAQs**: `app/page.tsx` → `faqs` array
- **Services**: `app/services/page.tsx` → `services` array

## 🔌 API Routes

### POST /api/contact
Contact form submission endpoint.

```json
{
  "name": "string",
  "email": "string",
  "company": "string?",
  "projectType": "string",
  "budget": "string?",
  "message": "string"
}
```

**Current**: Logs to console. To implement:
- Database storage (Supabase, MongoDB)
- Email notifications (Resend, SendGrid)
- CRM integration (HubSpot)
- Slack notifications

## ⚡ Performance

- ✅ Static rendering for most pages
- ✅ Code splitting & lazy loading
- ✅ CSS minification (Tailwind)
- ✅ JSON-LD schema (Organization)
- ✅ OpenGraph & Twitter cards
- ✅ Mobile-responsive
- ✅ Keyboard accessible

**Lighthouse Targets**: Performance 90+, SEO 100, A11y 95+

## ♿ Accessibility

- Semantic HTML
- ARIA labels
- Keyboard navigation
- High contrast (WCAG AA)
- Focus indicators

## 🚀 Deployment

### Vercel (Recommended)
```bash
# Connect GitHub repo to Vercel dashboard
# Auto-deploys on main branch push
```

### Other Platforms
- GitHub Pages (static export)
- Netlify
- AWS Amplify
- Docker-based hosting

## 📄 License

ISC

## 📞 Support

- Email: hello@ternarylabs.io
- GitHub: https://github.com/ternarylabsin/ternarylabs.io
- LinkedIn: https://linkedin.com/company/ternary-labs

---

**Updated**: February 14, 2026
