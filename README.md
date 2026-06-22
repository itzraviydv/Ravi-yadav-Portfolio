# Ravi Yadav — Portfolio Site

Premium recruiter-focused portfolio for a Performance Marketing Lead.

Built on **Next.js 15** + **Tailwind CSS v4** + **Framer Motion** + **TypeScript**.

Every number on the live site is traceable to a real campaign in the consolidated Meta Ads Manager export. There are **zero placeholder numbers** in the data layer — only placeholders for assets that need to be uploaded (LinkedIn URL, headshot, resume PDF, dashboard screenshots).

---

## Quickstart

```bash
# 1. Install
pnpm install    # or npm install / yarn install

# 2. Generate content (case studies, process, clients, proof-of-work from .md sources)
pnpm run generate-content

# 3. Dev server
pnpm dev
# Open http://localhost:3000

# 4. Production build
pnpm build && pnpm start
```

The `generate-content` script reads `.md` files from `C:/Foremost Leads/` (the analysis directory one level above this project) and writes structured JSON to `content/`. Re-run it after editing the source `.md` files.

---

## Stack

- **Next.js 15** — App Router, RSC, ISR, static generation
- **Tailwind CSS v4** — CSS-first config, `@theme` tokens
- **Framer Motion** (motion package) — entrance animations, count-up, tab transitions, scroll-reveal
- **TypeScript 5** — strict
- **Recharts** — area charts, bar charts, donuts
- **Lucide React** — icons
- **Geist Sans + Geist Mono** — via `next/font/google`

No UI library. Design follows Vercel / Linear / Stripe: dark surfaces, generous whitespace, mono numerals for KPIs, gradient accents, sticky-blur header, custom scrollbar.

---

## File structure

```
portfolio/
├── app/                       # Next.js App Router
│   ├── layout.tsx             # Root layout, fonts, metadata, JSON-LD
│   ├── page.tsx               # Homepage — hero, KPIs, charts, process, CTA
│   ├── case-studies/
│   │   ├── page.tsx           # 6 case studies grid
│   │   └── [slug]/page.tsx    # Long-form (6 routes, statically generated)
│   ├── experience/page.tsx    # 6 client cards + 4 operating principles
│   ├── skills/page.tsx        # Stack, funnel split, certs
│   ├── process/page.tsx       # 5-step Meta Ads process
│   ├── proof-of-work/page.tsx # Artifact inventory
│   ├── resume/page.tsx        # 15 ATS bullets + resume PDF
│   ├── sitemap.ts, robots.ts, opengraph-image.tsx
│   └── globals.css            # Tailwind + design tokens
├── components/
│   ├── layout/   (Header, Footer, Container)
│   ├── ui/       (Button, Card, Badge, Section, KpiCard, Counter, Tabs, ScrollReveal, Skeleton)
│   ├── charts/   (MonthlyTimeline, ClientBreakdown, FunnelSplit, CurrencyMix, TopCampaigns)
│   ├── hero/     (Hero, KpiGrid, AvailabilityPill)
│   ├── case-studies/ (CaseStudyCard, CaseStudyBody, ScreenshotSlot)
│   ├── process/  (ProcessStep)
│   ├── proof-of-work/ (ArtifactCard)
│   └── seo/      (JsonLd)
├── lib/
│   ├── data.ts         # Server-side data loader (RSC, static gen)
│   ├── formatters.ts   # fmt_money_lakh_crore, fmt_int_lakh_crore — mirrors the Python analyzer
│   ├── types.ts        # TypeScript interfaces
│   └── utils.ts        # cn(), easing
├── content/                   # Generated JSON (committed for build)
│   ├── case-studies.json
│   ├── process.json
│   ├── proof-of-work.json
│   ├── clients.json
│   ├── top-campaigns.json
│   └── monthly_aggregates.json  (38-month timeline, INR + USD)
├── public/
│   ├── favicon.svg
│   ├── resume.pdf        (placeholder — replace with real PDF)
│   └── og.png            (static fallback OG)
└── scripts/
    └── generate-content-json.mjs   # .md → .json
```

---

## Data sources

| File | Source |
|---|---|
| `content/monthly_aggregates.json` | `reports/monthly_aggregates.json` — 38-month per-day pro-rata of 478 campaigns |
| `content/case-studies.json` | `case-studies.md` — 6 deep-dive case studies |
| `content/clients.json` | `reports/portfolio-data-summary.md` + `reports/portfolio-metrics.md` |
| `content/top-campaigns.json` | `reports/portfolio-data-summary.md` — top-10 leaderboards |
| `content/process.json` | Generated from cross-case-study patterns in `case-studies.md` |
| `content/proof-of-work.json` | `proof-of-work.md` — visual inventory |

**The single source of truth:** every number on the live site is computed from these JSON files. There is no hardcoded number anywhere in the React components.

Sanity check: the sum of `monthly_aggregates.json` matches the portfolio totals from `reports/portfolio-metrics.md` within ±0.005% (per-day pro-rata rounding).

---

## Sections

### Homepage (`/`)
1. **Hero** — status pill, gradient headline, data-anchored sub-headline, 5 KPI cards
2. **Metrics Dashboard** — secondary KPIs, 38-month timeline, client breakdown, funnel split, currency mix, lowest-CPL leaderboard, top-spend / top-CTR / top-reach leaderboards
3. **Case Studies preview** — 6 cards → `/case-studies`
4. **My Meta Ads Process** — 5 cards → `/process`
5. **Proof of Work preview** — 4 tile categories → `/proof-of-work`
6. **CTA** — LinkedIn + Email + Resume

### Case Studies (`/case-studies`)
Index of 6 cards. Each links to a deep-dive page with:
- Objective (markdown → HTML)
- Strategy (numbered bullets)
- Budget (table)
- Results (table)
- Screenshot grid (5 placeholder slots)
- Learnings (numbered)
- My Contribution (numbered)
- Prev/Next navigation

### Process (`/process`)
5 steps: Research → Creative Testing → Audience Testing → Scaling → Optimization. Each with icon, tagline, description, stat, example campaign, and tools.

### Experience (`/experience`)
6 client cards (FML × Abhishek Pal, A Hishek Pal — FML, SSA × Satyam Khandelwal, Agrika Khatri 2, Piyush Ahuja, RAJ Polanki) + 4 operating principles (20% step rule, kill thresholds, spend-weighted reporting, single-variable testing).

### Skills (`/skills`)
Stack grouped by category (Meta / Analytics / Creative / E-commerce / PM). Funnel split (TOF 55% / MOF 25% / BOF 20%). Playbook list. Certifications (Meta Blueprint in progress, Q3 2026).

### Proof of Work (`/proof-of-work`)
Inventory of artifacts grouped by type — 10 dashboards, 6 creatives, 4 before-after comparisons, 7 playbooks. Each is a placeholder card with title + type label.

### Resume (`/resume`)
15 quantified ATS bullets + download button + LinkedIn + Email.

---

## SEO

- Per-page metadata (`title`, `description`, `og`, `twitter`)
- JSON-LD structured data (`Person`, `WebSite`, `BreadcrumbList`)
- Dynamic OG image (`opengraph-image.tsx` renders a 1200×630 hero card with the gradient headline)
- `sitemap.xml` (10 routes) and `robots.txt`
- Canonical URL: `https://raviyadav.com`

---

## Responsive

- **Mobile (375px)**: 1-column grids, stacked KPIs, hamburger menu, charts maintain height
- **Tablet (768px)**: 2-column grids
- **Desktop (1024px+)**: 5-column KPI grid, full charts

---

## Performance

- Static generation for all 11 routes
- Geist fonts via `next/font` (zero CLS)
- Lazy-mount charts via `useInView`
- Recharts SVGs are tree-shakeable
- No external image dependencies at build time (placeholder slots)

Expected Lighthouse: **Performance ≥ 95, Accessibility ≥ 95, SEO = 100**.

---

## Deployment (Vercel)

```bash
# Install Vercel CLI
pnpm i -g vercel

# Deploy
vercel
```

Or import the GitHub repo in the Vercel dashboard — zero config needed.

---

## What's a placeholder

The site is data-complete. Numbers are real. The following are **asset placeholders** that need real files:

| File | Replace with |
|---|---|
| `public/resume.pdf` | The actual resume PDF |
| `components/case-studies/ScreenshotSlot.tsx` | Real dashboard screenshots |

> All contact info (LinkedIn, email) is now live: `https://www.linkedin.com/in/ravi-yadav-60b339336` and `ravi.marketiing@gmail.com`.

The 4 testimonial quotes in `recruiter-brief.md` are placeholder copy and are **NOT** displayed on the site.

---

## Re-running content generation

After editing any of the source `.md` files in `C:/Foremost Leads/`:

```bash
pnpm run generate-content
```

This re-writes `content/*.json`. The Next.js dev server hot-reloads on content changes; for production, `pnpm build` picks up the latest JSON automatically.