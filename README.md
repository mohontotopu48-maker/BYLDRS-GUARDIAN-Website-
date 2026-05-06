# BYLDRS GUARDIAN

**Hire with Certainty. Protect Your Property.**

California's only platform that audits home improvement Pros every 30 days. Find certified, vetted, and verified contractors you can trust.

[Live Demo](https://bylders-guardian-website.vercel.app)

---

## Overview

BYLDRS GUARDIAN is a full-stack web application built to protect California homeowners from contractor fraud, ghosting, and substandard work. It combines AI-powered concierge assistance (Guardian AI), a 20-Point Shield verification system, GHL CRM integration, and a comprehensive homeowner toolkit into a single platform.

### Key Features

- **Guardian AI** — Intelligent concierge with dual-mode operation:
  - **Rescue First Mode**: Activates when users report ghosting, abandoned projects, or disappearing contractors. Collects ZIP + Trade and matches with verified rescue Pros.
  - **Guard Mode**: General assistance for Pro discovery, deposit violation checks, and Shield education.
- **20-Point Shield** — Comprehensive Pro verification standard covering license, insurance, bond, complaint history, background checks, deposit limits, and 14 more audit points.
- **CA BPC $1,000 Deposit Compliance** — Automatic detection of deposit violations under California Business & Professions Code Section 7159.
- **GHL CRM Integration** — Dual-write rescue leads to GoHighLevel (NXLBYLDR CRM) + local database.
- **Pro Tier System** — Three tiers: Certified Guardian (Gold), Vetted Partner (Silver), Verified Pro (Bronze).
- **Homeowner Vault** — AES-256 encrypted document storage for contracts, insurance, permits, and completion docs.
- **Marketer's Pack** — 20 ready-to-use video scripts with hooks, captions, and full narration.

---

## Tech Stack

| Layer | Technology |
|-------|-----------|
| **Framework** | Next.js 16 (App Router) |
| **Language** | TypeScript 5 |
| **Styling** | Tailwind CSS 4 + shadcn/ui (New York style) |
| **Animation** | Framer Motion 12 |
| **State** | Zustand 5 (persist middleware) + TanStack Query |
| **Database** | Prisma ORM + SQLite |
| **AI** | z-ai-web-dev-sdk (LLM integration) |
| **CRM** | GoHighLevel REST API |
| **Icons** | Lucide React |
| **Theming** | next-themes (light/dark) |
| **Hosting** | Vercel (serverless) |

---

## Project Structure

```
src/
  app/
    layout.tsx              # Root layout with SEO, structured data, ThemeProvider
    page.tsx                # Single-page app with hash routing
    globals.css             # Global styles + Tailwind
    sitemap.ts              # Dynamic sitemap generation
    manifest.ts             # PWA manifest
    api/
      guardian-ai/route.ts  # Guardian AI chatbot (POST/DELETE)
      contact/route.ts      # Contact form submissions (POST)
      ghl/rescue-lead/route.ts  # Rescue lead dual-write (POST)
      shield-pdf/route.ts   # 20-Point Shield PDF/HTML generation (GET)
      route.ts              # Health check endpoint
  components/
    header.tsx              # Fixed nav with flyout menu + mobile hamburger
    footer.tsx              # Sticky footer with contact info
    guardian-ai.tsx         # Floating AI sidebar chatbot
    hero-section.tsx        # Landing hero
    how-it-works-section.tsx
    who-we-are-section.tsx
    how-we-rank-section.tsx
    audit-engine.tsx        # Interactive audit simulation
    pro-grid.tsx            # Pro search & filter grid
    academy-section.tsx     # Homeowner Academy educational content
    rewards-section.tsx     # Rewards program
    vault-section.tsx       # Homeowner Vault CTA
    check-my-pro-view.tsx   # Pro verification tool
    the-standard-view.tsx   # 20-Point Shield details
    pro-onboarding-view.tsx # Pro registration form
    pro-profile-view.tsx    # Individual Pro detail page
    blog-view.tsx           # Property Stories / Blog
    contact-view.tsx        # Contact form
    dashboard-view.tsx      # Homeowner dashboard
    enroll-shield-view.tsx  # Shield enrollment
    vault-view.tsx          # Document vault
    shield-scripts-view.tsx # Marketer's Pack viewer
    property-story-view.tsx # Individual blog post
    why-us-view.tsx         # Why BYLDRS GUARDIAN
    pro-splash-pages.tsx    # Tier 2 & 3 splash pages
    protection-guide-download-view.tsx
    audit-section.tsx
    ui/                     # shadcn/ui components (40+)
  lib/
    store.ts                # Zustand store with hash routing
    ghl.ts                  # GoHighLevel CRM integration
    db.ts                   # Prisma client
    pro-data.ts             # Pro profiles database (6 Pros, 20 categories)
    shield-scripts.ts       # 20-Point Shield script data
    utils.ts                # Utility functions
  hooks/
    use-toast.ts
    use-mobile.ts
prisma/
  schema.prisma             # SQLite schema (RescueLead, ContactSubmission)
public/                     # Static assets, images, robots.txt
```

---

## API Endpoints

| Method | Endpoint | Description |
|--------|----------|-------------|
| `POST` | `/api/guardian-ai` | Chat with Guardian AI (session-based, rate-limited) |
| `DELETE` | `/api/guardian-ai` | Clear AI session |
| `POST` | `/api/contact` | Submit contact form |
| `POST` | `/api/ghl/rescue-lead` | Submit rescue lead (GHL CRM + DB dual-write) |
| `GET` | `/api/shield-pdf` | Generate 20-Point Shield document (PDF or HTML) |
| `GET` | `/api/` | Health check |
| `GET` | `/sitemap.xml` | Dynamic XML sitemap |
| `GET` | `/robots.txt` | Search engine directives |

---

## Getting Started

### Prerequisites

- Node.js 18+ or Bun
- A Z.AI developer account (for Guardian AI)

### Installation

```bash
# Clone the repository
git clone https://github.com/mohontotopu48-maker/BYLDRS-GUARDIAN-Website-.git
cd BYLDRS-GUARDIAN-Website-

# Install dependencies
bun install

# Set up database
cp .env.example .env.local
# Edit .env.local with your DATABASE_URL and API keys
bun run db:push
bun run db:generate

# Start development server
bun run dev
```

### Environment Variables

| Variable | Description | Required |
|----------|-------------|----------|
| `DATABASE_URL` | SQLite connection string (e.g., `file:./custom.db`) | Yes |
| `GHL_API_KEY` | GoHighLevel API key | No (CRM features disabled without it) |
| `GHL_LOCATION_ID` | GoHighLevel location ID | No |

---

## Client-Side Routing

This is a single-page application using hash-based routing (`#/page-name`). All views render from the root `/` route via client-side state management.

| Hash Route | View |
|-----------|------|
| `#/` | Home page |
| `#/check-my-pro` | Pro verification tool |
| `#/the-standard` | 20-Point Shield |
| `#/why-us` | Why BYLDRS GUARDIAN |
| `#/pro-onboarding` | Join as a Pro |
| `#/blog` | Property Stories |
| `#/contact` | Contact form |
| `#/enroll-shield` | Enroll in Shield |
| `#/vault` | Homeowner Vault |
| `#/shield-scripts` | Marketer's Pack |
| `#/dashboard` | Homeowner dashboard |
| `#/pro-profile` | Pro profile detail |

---

## Guardian AI System

### Architecture

- **Backend**: Serverless API route with in-memory session store (30-min TTL, 500-session cap, LRU eviction)
- **Frontend**: Fixed sidebar chatbot with quick actions, workflow-triggered forms, and deposit violation alerts
- **Rate Limiting**: 15 requests/minute per session, 5 rescue leads/minute per IP

### Dual Mode Operation

1. **Rescue First** — Triggered by ghosting, abandonment, or no-show keywords. Collects ZIP + Trade and guides user through the rescue lead intake form.
2. **Concierge Matchmaking** — Triggered by Pro search intent. Sources and audits verified Pros for the user's area.

### Deposit Violation Detection

Automatic detection of California deposit law violations. When a user mentions an amount over $1,000, the system:
- Flags the violation with the relevant CA BPC code
- Adds a legal alert message in the chat
- Includes the violation in the rescue lead record

---

## Deployment

### Vercel

The project is configured for Vercel deployment with `vercel.json`:

- **Build Command**: `bunx prisma generate && next build`
- **Install Command**: `bun install && bunx prisma generate`
- **Region**: `iad1` (US East)
- **Function Timeouts**: Guardian AI (30s), Shield PDF (60s), Rescue Lead (15s), Contact (15s)

### GitHub

```bash
# Push to main branch
git push origin main

# Create and push a feature branch
git checkout -b feature/branch-name
git push -u origin feature/branch-name
```

---

## Design System

### Color Palette

| Token | Hex | Usage |
|-------|-----|-------|
| `#3257C2` | Royal Blue | Primary brand, buttons, links |
| `#3ED1B8` | Turquoise | Accent, Guardian AI, active states |
| `#0F1219` | Deep Navy | Header, footer, backgrounds |
| `#1A1D2E` | Dark Blue | Card backgrounds |
| `#F5A623` | Gold | Certified Guardian tier |
| `#FFFFFF` | White | Content backgrounds |

### Accessibility

- Skip-to-content link
- ARIA labels on interactive elements
- Keyboard navigation support
- Semantic HTML (`<main>`, `<header>`, `<nav>`, `<footer>`)
- Mobile-first responsive design

---

## License

Proprietary. All rights reserved by BYLDRS GUARDIAN.

---

## Managed By

Powered by **NXLBYLDR CRM** | Managed by [VSUAL digitalmedia.com](https://VSUALdigitalmedia.com)
