# Nexus AI — Full Stack AI Workspace Hub

A production-ready, full-stack AI workspace platform built with Next.js 14, Supabase, TypeScript, Tailwind CSS and the Anthropic Claude API.

---

## What's Inside

### Pages
| Route              | Description                                      |
|--------------------|--------------------------------------------------|
| `/`                | Homepage — hero, how it works, features, pricing |
| `/features`        | Full feature breakdown (36 features across 6 categories) |
| `/pricing`         | Pricing tiers with annual/monthly toggle + comparison table |
| `/blog`            | Blog listing page with category tags             |
| `/about`           | Team, mission and values                         |
| `/security`        | Security certifications, features and deployment options |
| `/contact`         | Contact form with inquiry type selection         |
| `/login`           | Sign-in with email/password                      |
| `/signup`          | Sign-up with role and company fields             |
| `/dashboard`       | Real AI chat powered by Claude — the actual product |
| `/solutions/startups`   | Solutions page for startups              |
| `/solutions/enterprise` | Solutions page for enterprise            |

### API Routes
| Route              | Description                                      |
|--------------------|--------------------------------------------------|
| `POST /api/ai`     | Real AI chat powered by Anthropic Claude API     |
| `POST /api/waitlist` | Join waitlist — saves to Supabase              |

---

## Tech Stack

| Layer       | Technology                          |
|-------------|-------------------------------------|
| Framework   | Next.js 14 (App Router)             |
| Language    | TypeScript                          |
| Styling     | Tailwind CSS                        |
| Database    | Supabase (PostgreSQL)               |
| Auth        | Supabase Auth                       |
| AI Engine   | Anthropic Claude (claude-sonnet)    |
| State       | Zustand (theme + chat state)        |
| Toasts      | Sonner                              |
| Icons       | Lucide React                        |
| Fonts       | Fraunces (display) + Cabinet Grotesk|
| Deployment  | Vercel + Supabase                   |

---

## Quick Start

### 1. Clone and install

```bash
cd nexusai
npm install
```

### 2. Create Supabase project

1. Go to [supabase.com](https://supabase.com) → New project
2. Go to **SQL Editor** → paste the contents of `supabase/schema.sql` → Run
3. Go to **Settings → API** and copy your URL, anon key and service role key

### 3. Get Anthropic API key

1. Go to [console.anthropic.com](https://console.anthropic.com)
2. Create an API key
3. This powers the real AI chat in the dashboard

### 4. Set up environment variables

```bash
cp .env.example .env.local
```

Fill in `.env.local`:

```
NEXT_PUBLIC_SUPABASE_URL=https://your-project.supabase.co
NEXT_PUBLIC_SUPABASE_ANON_KEY=eyJhb...
SUPABASE_SERVICE_ROLE_KEY=eyJhb...
ANTHROPIC_API_KEY=sk-ant-...
NEXT_PUBLIC_APP_URL=http://localhost:3000
```

### 5. Run locally

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000)

---

## Deploy to Vercel

1. Push to GitHub:
```bash
git init
git add .
git commit -m "Initial commit - Nexus AI"
git remote add origin https://github.com/YOUR-USERNAME/nexusai.git
git push -u origin main
```

2. Go to [vercel.com](https://vercel.com) → New Project → Import your repo

3. Add environment variables (same 5 from `.env.local`)

4. Set **Framework Preset** to **Next.js**

5. Click **Deploy**

---

## Customization Guide

### Change brand name
Find and replace `Nexus AI` across:
- `app/layout.tsx` (metadata)
- `components/layout/Navbar.tsx`
- `components/layout/Footer.tsx`

### Change colors
Open `tailwind.config.ts` and modify the `navy` and `accent` color scales.

### Change AI behavior
Edit the system prompt in `app/api/ai/route.ts` to customize how the AI responds to your users.

### Add a new page
Create `app/your-page/page.tsx` — it automatically becomes a route.

### Push updates to live site
```bash
git add .
git commit -m "describe your change"
git push
```
Vercel redeploys automatically within 2 minutes.

---

## Project Structure

```
nexusai/
├── app/
│   ├── page.tsx              # Homepage
│   ├── layout.tsx            # Root layout
│   ├── features/page.tsx     # Features page
│   ├── pricing/page.tsx      # Pricing page
│   ├── blog/page.tsx         # Blog listing
│   ├── about/page.tsx        # About page
│   ├── security/page.tsx     # Security page
│   ├── contact/page.tsx      # Contact form
│   ├── login/page.tsx        # Sign in
│   ├── signup/page.tsx       # Sign up
│   ├── dashboard/            # AI workspace (the product)
│   └── api/
│       ├── ai/route.ts       # Claude AI endpoint
│       └── waitlist/route.ts # Waitlist endpoint
├── components/
│   ├── layout/
│   │   ├── Navbar.tsx        # Navigation with dark mode toggle
│   │   ├── Footer.tsx        # Footer
│   │   └── ThemeProvider.tsx # Dark/light mode manager
│   └── sections/
│       ├── Hero.tsx          # Animated hero with live demo
│       ├── LogoBar.tsx       # Scrolling logo strip
│       ├── HowItWorks.tsx    # 3-step process
│       ├── Features.tsx      # 6 feature cards
│       ├── UseCases.tsx      # Startup / Enterprise / Engineering tabs
│       ├── Integrations.tsx  # Integration grid
│       ├── Testimonials.tsx  # 6 testimonial cards
│       ├── Pricing.tsx       # 3 tiers + comparison table
│       ├── FAQ.tsx           # Accordion FAQ
│       └── CTA.tsx           # Bottom call to action
├── lib/
│   ├── utils.ts              # Helpers and constants
│   └── theme-store.ts        # Dark mode Zustand store
├── supabase/
│   ├── client.ts             # Browser Supabase client
│   ├── server.ts             # Server Supabase client
│   └── schema.sql            # Full database schema
├── types/index.ts            # All TypeScript types
└── .env.example              # Environment variable template
```
