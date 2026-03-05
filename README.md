# Ternary Labs Website

Marketing website for [Ternary Labs](https://ternarylabs.io) — a software studio building websites, applications, and IoT hardware.

## Stack

- **Framework:** React 19 + TypeScript
- **Build:** Vite 6
- **Styling:** Tailwind CSS v4 + CSS custom properties (design tokens)
- **Routing:** React Router v7 (HashRouter — works on GitHub Pages without a 404 workaround)
- **Hosting:** GitHub Pages via GitHub Actions
- **Forms:** Formspree (configurable endpoint)

## Development

```bash
npm install
npm run dev       # Dev server → http://localhost:5173
npm run build     # Production build → dist/
npm run preview   # Preview production build locally
```

## Project structure

```
src/
  content/
    projects.ts     # Single source of truth for all project data
    copy.ts         # Brand copy, hero text, services, etc.
  components/
    Header.tsx      # Sticky, scroll-aware navigation
    Footer.tsx
    Reveal.tsx      # IntersectionObserver scroll-reveal wrapper
  hooks/
    useInView.ts    # Reusable IntersectionObserver hook
  pages/
    HomePage.tsx          # Hero · Services · Projects · Differentiators · CTA
    ProjectsPage.tsx      # Project grid overview
    ProjectDetailPage.tsx # Dynamic detail template (/projects/:slug)
    ContactPage.tsx       # Software request intake form
    NotFoundPage.tsx      # 404
  App.tsx           # Router + AppShell
  main.tsx
  index.css         # Design tokens + global styles
public/
  CNAME             # ternarylabs.io
  .nojekyll         # Disables Jekyll processing on GitHub Pages
  favicon.svg
.github/
  workflows/deploy.yml              # GitHub Actions → Pages deploy
  ISSUE_TEMPLATE/software-request.md
```

## Deployment

Pushes to `main` trigger the GitHub Actions workflow (`.github/workflows/deploy.yml`), which:
1. Installs dependencies
2. Runs `npm run build` → `dist/`
3. Deploys `dist/` to GitHub Pages

Requires **GitHub Pages** enabled in repo settings with source: **GitHub Actions**.

## Troubleshooting

If the site loads as a blank page after pushing to `main`, the most common cause is Pages still being set to **Deploy from a branch** instead of **GitHub Actions**.

Set:
1. GitHub → **Settings** → **Pages**
2. **Build and deployment** → **Source: GitHub Actions**
3. Re-run the deploy workflow (or push a new commit)

## Contact form setup

The contact form POSTs to Formspree. To activate:
1. Create a free form at [formspree.io](https://formspree.io)
2. Copy your form endpoint (e.g. `https://formspree.io/f/xabcdefg`)
3. Update `src/content/copy.ts` → `contact.formspreeAction`

## Content updates

All page copy and project data lives in `src/content/`. No code changes needed for:
- Adding/editing projects → `src/content/projects.ts`
- Headline/copy changes → `src/content/copy.ts`
