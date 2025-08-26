# Product Requirements Document — Toolspick (toolspick.com)

## 1 — Executive summary

Toolspick will be a high-scale tools directory focused on programmatic SEO and conversion-ready UI/UX inspired by Peerlist / Product Hunt / AITools.inc. Primary objective: maximize organic search traffic (long-tail and intent keywords) and monetize via AdSense and affiliate deals once traffic and quality thresholds are met.

Primary tech stack (recommended):

* Frontend: Next.js (App Router, TypeScript), Tailwind CSS, shadcn UI components
* DB / Auth / File storage: Supabase (or Neon + Auth alternatives if you want serverless Postgres)
* Hosting: Vercel (for Next.js) + CDN (Vercel built in)
* Analytics / Search: Google Analytics 4, Google Search Console, Bing Webmaster
* CI/CD: GitHub Actions -> Vercel

## 2 — Goals & success metrics

**Primary goals**

* Launch an SEO-optimized directory and reach consistent organic traffic.
* Obtain AdSense approval and maintain policy compliance.
* Build a trustworthy submission & curation flow for tools.

**Success metrics (KPIs)**

* Organic sessions per month (target MVP: 10k/mo within 3–6 months as seed goal).
* Indexed pages in Google (target: 5k programmatic landing pages first year).
* Core Web Vitals: LCP < 2.5s, CLS < 0.1, FID/INP within targets.
* AdSense approval (yes/no) → then RPM / eCPM and monthly revenue.
* Conversion (submit, upvote, visit external tool link).

## 3 — Target users / personas

1. Product managers & builders discovering SaaS/tools.
2. Marketers & agencies researching categories (e.g., "AI writing tools for ecommerce").
3. Developers & early adopters hunting for niche tools.
4. Tool creators seeking traffic & signups.

## 4 — Product features (MVP -> 1.0)

### MVP (must-have)

* Home: trending tools, categories, search box.
* Tool detail page (canonical SEO template): logo, tagline, description, tags, category, pricing, screenshots, external link, reviews, upvote/bookmark.
* Category index pages (programmatic): `/category/ai-writing/`
* Tag pages: `/tag/prompt-engineering/`
* Search & basic filters (pricing, platform, free/paid).
* Submit tool flow (form + captcha) + simple moderation queue in admin.
* User accounts (email sign-up) + save/bookmark.
* Structured data (JSON-LD) for each tool page.
* Sitemap.xml (dynamic) and robots.txt.
* Privacy policy / About / Contact page.
* Analytics and Search Console verification.

### Post-MVP / advanced

* Programmatic SEO generation pipeline (CSV ingestion -> mass static pages).
* Editorial review workflows (human + small team).
* Review & rating system.
* Integrations: logos screenshots auto-capture, affiliate linking.
* Advanced filtering, sort, and paginated lists with SEO-safe URLs.
* Internationalization (i18n) and hreflang.
* AB testing ad placements for RPM optimization.
* Newsletter & email capture.

## 5 — Functional requirements (detailed)

### Pages & routes

* `/` — homepage with hero search and featured categories/tools
* `/category/[slug]/` — category hub, programmatic
* `/tool/[slug]/` — canonical tool detail (SSG/ISR)
* `/tag/[slug]/`
* `/search?q=...` — server-side or client-side search (index with Algolia / Meilisearch later)
* `/submit` — tool submission page
* `/admin/*` — moderation / content management
* `/about`, `/privacy`, `/terms`, `/contact`

### SEO-specific requirements

* Each tool page must have a unique, optimized `<title>` and `<meta description>` using templates and variable insertion (name, category, one USP, pricing).
* JSON-LD schema (SoftwareApplication / WebSite) for each tool page.
* Canonical tags for paginated/faceted pages to avoid duplicate content.
* Noindex low-value parameterized pages; use canonicalization and `rel="next/prev"` where appropriate.
* Programmatic landing pages for long-tail queries: create templates with unique content blocks (short intro, features list, comparison table, FAQs).
* Internal linking strategy: related tools, category hubs, “see also” modules.
* Sitemap generation on deploy (include priority & lastmod).

### Data model (Postgres logical)

Tables (core):

* users (id, email, name, role, created\_at)
* tools (id, slug, name, tagline, description, website, pricing, logo\_url, category\_id, verified boolean, created\_by, created\_at, updated\_at, meta\_title, meta\_description)
* categories (id, slug, name, description)
* tags (id, name)
* tool\_tags (tool\_id, tag\_id)
* reviews (id, tool\_id, user\_id, rating, title, body, created\_at)
* upvotes (user\_id, tool\_id, created\_at)
* screenshots (id, tool\_id, url, alt)
* submissions (raw submission payload, status, created\_at)
* audit\_logs

I’ll include a SQL sample below (see “Tech / infra” section).

## 6 — UX/UI / design system

* Use shadcn + Tailwind for consistent cards, lists, modals, forms.
* Components: ToolCard, ToolHero, CategoryCard, Filters, SubmitModal, AdminTable, RatingStars, ScreenshotCarousel.
* Mobile-first, accessible (WCAG AA), and performance-led.
* Patterns from Product Hunt/Peerlist: Upvote, save/bookmark, comment/review feed, curated lists.
* Emphasize quick scanning: badges for pricing/platform, visible CTA “Visit site” and “Compare”.

## 7 — Programmatic SEO strategy (how we scale pages safely)

* **Seed content creation**: start with manually curated content for top categories (20–50 pages).
* **Template + variables**: build page templates where headline/meta is populated with tool name, category, and primary keyword. Always include unique content blocks per page — not only auto-generated one-liners. Use human or high-quality editorial augmentation for each programmatic page (even a 2–3 paragraph unique intro).
* **Data sources**: combine public tool metadata (official websites, APIs, Marketplace pages) + vendor-provided copy + editorial rewrite.
* **CSV ingestion pipeline**: admins upload CSV with fields; the pipeline normalizes, enriches (pulls logo, screenshots), then queues pages for review; publish SSG pages with ISR.
* **Avoid duplicate content**: canonicalize and noindex near-duplicates; ensure every programmatic page has at least one unique content block (pro tip: small human edit or AI-assisted rewriting + human QA).
* **Keyword mapping**: map categories and templates to clusters of long-tail queries and track performance in Search Console.
* **Crawl budget**: create a crawl policy — noindex tag-filter combinations and low-value sorting pages, provide clean internal link graph to important pages.

## 8 — AdSense preparation & monetization

**AdSense approval checklist**

* Clear, original content on key pages (no thin pages).
* Privacy policy, About, Contact pages present and accessible.
* Site navigation & ownership (custom domain — you have toolspick.com).
* No policy-prohibited content (adult, copyright infringements, hate, etc.)
* Stable content; not just doorway pages. Programmatic pages must provide useful unique content/value.
* Must be easy to navigate and not a placeholder site.

**Monetization plan**

* Primary: AdSense once approved; optimize placements to meet RPM (above-the-fold, in-content, responsive).
* Secondary: Affiliate links (with disclosure), sponsored listings (after traffic thresholds), paid featured placements.
* Ad placement AB tests for RPM and UX balance. Keep ad density within AdSense policies.

## 9 — Analytics, tracking, & SEO tools

* Google Analytics 4 + Consent mode.
* Google Search Console site ownership + sitemap submission.
* Bing Webmaster Tools.
* Event tracking (click-through to external site, upvotes, submissions).
* Use a crawler or log analyzer monthly to find crawl issues and thin pages.

## 10 — Security & compliance

* Sanitize inputs, escape outputs, use prepared statements.
* Rate-limit submission endpoints and protect against spam (reCAPTCHA/Turnstile).
* HTTPS-only, secure cookies, CSP headers, XSS/CSRF protections.
* GDPR cookie consent (if you target EU).
* Privacy policy + data handling docs.

## 11 — Performance & infra

* Target Lighthouse: 90+ on mobile for core pages.
* Use Next.js image optimization (`next/image`), optimized fonts, prefetching.
* SSG where possible + ISR for tool pages to scale generating many pages without overloading build times.
* Use Vercel Edge functions or caching at CDN for SSR/edge caching.
* Use smaller, denormalized payloads from DB for index pages; lazy-load heavy components.

## 12 — Operational & moderation workflow

* Submissions queue in admin with statuses: pending, verified, rejected.
* Automated enrichment: fetch logo, website metadata, social links, screenshots (manual fallback).
* Human review before publishing to avoid low-value / spam pages.

## 13 — Acceptance criteria for MVP

* Home, tool page, category page, submit flow, admin moderation, sitemap, privacy/about/contact pages live.
* Google Search Console connected, sitemap submitted.
* 50+ curated tool pages with unique content blocks.
* AdSense application ready (site contains enough content & required pages).

---

# Tech & infra details + SQL sample

## Recommended architecture

* Next.js (App router) w/ TypeScript
* shadcn UI + Tailwind
* Supabase (Postgres) for DB, storage for images, and auth
* Vercel for deployment
* GitHub repo + GitHub Actions for CI

## Sample SQL (Postgres) to create main tables

```sql
-- categories
CREATE TABLE categories (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  description TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);

-- users
CREATE TABLE users (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  email TEXT UNIQUE,
  name TEXT,
  role TEXT DEFAULT 'user',
  created_at TIMESTAMPTZ DEFAULT now()
);

-- tools
CREATE TABLE tools (
  id SERIAL PRIMARY KEY,
  slug TEXT UNIQUE NOT NULL,
  name TEXT NOT NULL,
  tagline TEXT,
  description TEXT,
  website TEXT,
  pricing TEXT,
  logo_url TEXT,
  category_id INT REFERENCES categories(id),
  verified BOOLEAN DEFAULT FALSE,
  meta_title TEXT,
  meta_description TEXT,
  created_by uuid REFERENCES users(id),
  created_at TIMESTAMPTZ DEFAULT now(),
  updated_at TIMESTAMPTZ DEFAULT now()
);

-- tags & tool_tags
CREATE TABLE tags (
  id SERIAL PRIMARY KEY,
  name TEXT UNIQUE NOT NULL
);

CREATE TABLE tool_tags (
  tool_id INT REFERENCES tools(id),
  tag_id INT REFERENCES tags(id),
  PRIMARY KEY (tool_id, tag_id)
);

-- reviews
CREATE TABLE reviews (
  id SERIAL PRIMARY KEY,
  tool_id INT REFERENCES tools(id),
  user_id uuid REFERENCES users(id),
  rating SMALLINT CHECK (rating >= 1 AND rating <= 5),
  title TEXT,
  body TEXT,
  created_at TIMESTAMPTZ DEFAULT now()
);
```

---

# Content pipeline & editorial workflow (practical)

1. Seed: create 50–200 core pages manually (top categories + best-known tools) with high-quality intros and unique copy.
2. Ingestion: build CSV uploader for bulk tools (fields: name, slug, website, category, tags, tagline, short description, logo\_url, screenshot\_url).
3. Enrichment: server job pulls favicons, Open Graph images, metadata to populate missing fields.
4. Human QA: editorial user reviews each import; minimal edits or approve.
5. Publish: ISR / SSG pages generated and crawled.
6. Ongoing: weekly additions and link outreach (guest posts / partnerships), monitor Search Console for trends.

---

# 30 / 90 day rollout plan (high-level)

**Day 0–7**

* Initialize repo & project (commands below).
* Create skeleton UI: homepage, category listing, dummy tool page.
* Setup Supabase project & initial DB.
* Add privacy/about/contact pages.

**Day 8–30 (MVP)**

* Implement tool detail page with JSON-LD, meta templates.
* Build submit form + admin moderation.
* Seed 50 curated tool pages.
* Connect Search Console + Analytics.
* Prepare AdSense application checklist (privacy policy, content).

**Day 31–90**

* Build CSV ingestion and programmatic page pipeline.
* Launch marketing: outreach, link building.
* Add reviews, upvotes, bookmarking.
* Apply to AdSense once site meets content & policy thresholds.
* Optimize performance & run SEO audits monthly.

---

# Dev & org backlog (initial)

* [ ] Next.js + shadcn scaffold
* [ ] Supabase setup + migrations
* [ ] Tool detail SSG page + SEO meta templates + JSON-LD
* [ ] Submit page & admin moderation
* [ ] Sitemap generator + robots.txt
* [ ] Privacy / About / Contact pages
* [ ] Seed content (50 tools)
* [ ] GSC + GA4 + Analytics events
* [ ] AdSense application checklist completed

---

# First commit — Exact commands (copy/paste)

Below are shell commands to scaffold the project (Next.js + TypeScript + Tailwind), install shadcn, init git and make the initial commit. Run these in your terminal where you want the project folder to be created.

```bash
# 1. Create Next.js app (App Router, TypeScript)
npx create-next-app@latest toolspick \
  --typescript \
  --app \
  --eslint \
  --src-dir \
  --tailwind \
  --import-alias "@/*"

cd toolspick

# 2. Initialize git and create initial commit
git init
git add .
git commit -m "chore: initial Next.js + Tailwind scaffold for Toolspick"

# 3. Optional: add remote (replace YOUR_GIT_REMOTE_URL)
# git remote add origin git@github.com:YOUR_USERNAME/toolspick.git
# git branch -M main
# git push -u origin main

# 4. Install shadcn/ui (UI primitives)
# note: this will add shadcn scaffolding; follow prompts if any
npm install @shadcn/ui
# if you prefer the official shadcn installation flow:
# npx shadcn-ui@latest add button

# 5. Install Supabase client (and required libs)
npm install @supabase/supabase-js

# 6. Create basic README
cat > README.md <<'EOF'
# Toolspick - tools directory

Scaffolded with Next.js (App Router), Tailwind, shadcn.

## Local dev
1. Set up environment variables (.env.local) for NEXT_PUBLIC_SUPABASE_URL and NEXT_PUBLIC_SUPABASE_ANON_KEY
2. Run `npm run dev`
EOF

git add README.md
git commit -m "docs: add README"

# 7. Start dev server
npm run dev
```

**Notes**

* `npx create-next-app@latest toolspick --typescript --app --tailwind` will already wire Tailwind and TypeScript.
* After initial scaffold, create `.env.local` with Supabase credentials and Vercel preview keys.
* Add a `CNAME` or point domain in Vercel when deploying to use `toolspick.com`.

---

# Helpful code snippets (SEO meta template example)

You can drop this component into `app/components/Seo.tsx` (Next.js app router uses server components; adapt as needed).

```tsx
// app/components/Seo.tsx
import React from "react";

type Props = {
  title: string;
  description: string;
  url?: string;
  image?: string;
};

export default function Seo({ title, description, url, image }: Props) {
  const canonical = url ?? "https://toolspick.com";
  return (
    <>
      <title>{title}</title>
      <meta name="description" content={description} />
      <link rel="canonical" href={canonical} />
      <meta property="og:title" content={title} />
      <meta property="og:description" content={description} />
      {image && <meta property="og:image" content={image} />}
      <meta property="og:url" content={canonical} />
      <meta name="twitter:card" content={image ? "summary_large_image" : "summary"} />
    </>
  );
}
```

Use a template system to produce meta: e.g. `"{toolName} — {category} | Toolspick"`, and a meta description like: `"Discover {toolName}: {one-liner}. Compare features, pricing, and alternatives."`

---

# AdSense & content policy quick checklist before applying

* [ ] At least 50–100 pages with unique, useful content (not thin).
* [ ] Privacy Policy, About, Contact present.
* [ ] Clear navigation and no broken pages.
* [ ] No disallowed content.
* [ ] Site loads reliably and does not show spammy ads or placeholders.

---

# Final quick recommendations & next steps

1. Run the commands above to scaffold the repo and commit.
2. Create a Supabase project and add DB credentials to `.env.local`.
3. Seed 50 high-quality tool pages manually before bulk programmatic publishing.
4. Focus on unique content blocks for programmatic pages to pass Google’s quality filters.
5. Deploy to Vercel, verify domain (toolspick.com), connect Search Console, and submit sitemap.
6. When content/structure looks complete, apply to AdSense.

---

If you want, I can:

* generate the exact DB migration SQL file and seed CSV template,
* provide a ready-to-use GitHub Actions workflow for Vercel,
* or create the first React components (ToolCard + ToolPage scaffold) and push them into a canvas/code file.

Which of those would you like me to produce next?
