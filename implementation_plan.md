# Spotlit: Implementation Plan

Spotlit is a Brand Vision Pros venue booking hub, deployed at `spotlit.brandvisionpros.com`.

## Assumptions (change any before approving)
- Next.js 15 (App Router), TypeScript, Tailwind CSS, deployed on Vercel.
- Supabase for Postgres, auth, storage and realtime messaging.
- Guests submit event requests, you quote and approve them, and payment happens online through Stripe only after approval (Phase 5).
- Supabase free tier only. Free projects pause after about a week of inactivity, so you'd need a keep-alive ping or a paid plan before launch.
- The admin is a single role (you). Venue-owner logins come later.

## Phase 1: Foundation and SEO
- [NEW] `package.json`, `tsconfig.json`, `next.config.ts`, `tailwind.config.ts`, `.gitignore`, `.env.example`
- [NEW] `src/app/layout.tsx`: global metadata, fonts, Open Graph defaults
- [NEW] `src/app/page.tsx`: landing page with hero, featured venues, how it works, CTA
- [NEW] `src/app/sitemap.ts`, `src/app/robots.ts`: dynamic sitemap and robots
- [NEW] `src/lib/seo.ts`: metadata helpers and JSON-LD builders (`LocalBusiness`, `BreadcrumbList`)
- [NEW] `src/app/opengraph-image.tsx`: generated social share image
- [NEW] `src/lib/site.ts`: site config (name, URL `https://spotlit.brandvisionpros.com`)

## Phase 2: Venue browsing
- [NEW] `src/app/venues/page.tsx`: browse, filter and search (city, capacity, event type, price band)
- [NEW] `src/app/venues/[slug]/page.tsx`: venue page with gallery, tour, amenities, capacity by layout, map, JSON-LD, generated metadata
- [NEW] `src/components/venue/`: `Gallery`, `LayoutVisualizer`, `AmenityList`, `AvailabilityCalendar`
- [NEW] `src/lib/data/venues.ts`: seed data so the site renders before the database is connected

## Phase 3: Event planner and requests
- [NEW] `src/app/plan/[slug]/page.tsx`: multi-step builder (date, guests, setup, add-ons, notes) with a live estimate
- [NEW] `src/components/planner/`: step components and a draft store saved to localStorage
- [NEW] `src/app/api/requests/route.ts`: submit a request and send a notification email

## Phase 4: Messaging and admin
- [NEW] `src/app/inbox/`: threaded guest-to-admin messaging (Supabase realtime)
- [NEW] `src/app/admin/`: dashboard for venues, availability, requests and messages (protected route)
- [NEW] `src/lib/supabase/`: client, server and middleware helpers
- [NEW] `supabase/migrations/0001_init.sql`: tables `venues`, `venue_images`, `event_requests`, `threads`, `messages`, `profiles`, with row-level security policies

## Phase 5: Payments after approval
Booking flow: guest submits request → you send a quote → you approve the booking → the guest pays online.
- [NEW] `src/app/api/checkout/route.ts`: creates a Stripe Checkout session for the approved quote (deposit or full amount)
- [NEW] `src/app/api/webhooks/stripe/route.ts`: verifies the webhook and marks the booking `paid`
- [NEW] `src/app/booking/[id]/page.tsx`: guest page showing quote, status and a Pay button (enabled only once approved)
- [MODIFY] `supabase/migrations/`: add `quotes` and `payments` tables, and a `status` enum on `event_requests` (`requested`, `quoted`, `approved`, `paid`, `declined`)
- [MODIFY] `src/app/admin/`: quote builder and approve/decline actions
- Env vars added: `STRIPE_SECRET_KEY`, `STRIPE_WEBHOOK_SECRET`, `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY`.

## Deployment
- [NEW] `README.md`: setup and env vars
- Connect the GitHub repo to Vercel and add env vars: `NEXT_PUBLIC_SITE_URL`, `NEXT_PUBLIC_SUPABASE_URL`, `NEXT_PUBLIC_SUPABASE_ANON_KEY`, `SUPABASE_SERVICE_ROLE_KEY`.
- In Vercel, add `spotlit.brandvisionpros.com` as a domain, then add a CNAME record for `spotlit` in the `brandvisionpros.com` DNS.

## Verification
- `npm run build` and `npm run lint` must pass after each phase.
- Run the dev server and check the landing page, a venue page and the planner in a browser.
- Confirm sitemap, robots and Open Graph tags render.

## Proposed order
Phases 1 to 3 first, working on seed data. Then I connect Supabase for Phase 4.

**Approve this plan, or tell me what to change.** I'll then create `task.md` and start building.
