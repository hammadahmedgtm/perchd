# Perchd

Marketplace for ad-sticker space on personal items (laptops, water bottles, phone cases,
backpacks, bikes, cars). Next.js 16 (App Router) + TypeScript + Tailwind v4, Supabase for
auth/data, Paddle for payments, Leaflet/OpenStreetMap for the location map.

## What's here

- `/` — browse/homepage: filterable grid, sponsor rails, activity ticker, just-sold feed,
  how-it-works.
- `/listing/[id]` — one spot: photos, price, context tags, buy button, seller-approval note.
- `/sell` — 4-step seller flow (category → photos → price/duration → submit for review).
- `/advertise` — Perchd's own ad slots (homepage banner / sidebar / sponsored listing).
- `/browse/map` — split list + live map (OpenStreetMap tiles, no API key needed).
- `/dashboard/seller`, `/dashboard/brand`, `/dashboard/admin` — role dashboards.
- `/sign-in` — Supabase email/password auth (sign in + sign up with a seller/brand role toggle).

All pages currently run on the sample data in `src/lib/mock-data.ts` so the UI is fully
explorable without any credentials. Swapping to live Supabase queries means replacing those
`mock-data` reads with calls through `src/lib/supabase/{client,server}.ts` against the schema
below — the page components don't otherwise change.

## Setup

```bash
npm install
cp .env.example .env.local   # fill in the values below
npm run dev
```

### Supabase

1. Create a project at supabase.com.
2. Run `supabase/migrations/0001_init.sql` against it (SQL editor, or `supabase db push` if
   you're using the CLI) — it creates `profiles`, `listings`, `purchases`, `proof_photos`,
   `payouts`, `ad_slots`, `ad_bookings`, and row-level-security policies (sellers/brands see
   their own rows; a `profiles.role = 'admin'` row sees everything).
3. Copy the Project URL and anon key into `.env.local`.

### Paddle

1. In the Paddle dashboard, create one Product (e.g. "Perchd sticker spot") — its id goes in
   `PADDLE_PRODUCT_ID`. Listings use non-catalog (inline) prices attached to that product since
   each seller sets their own price, rather than a fixed price catalog.
2. Grab a client-side token (Developer Tools → Authentication) for
   `NEXT_PUBLIC_PADDLE_CLIENT_TOKEN`, and an API key for `PADDLE_API_KEY`.
3. Point a webhook at `/api/paddle/webhook` and copy its signing secret into
   `PADDLE_WEBHOOK_SECRET`. The handler verifies the signature and has a `TODO` marking where
   to mark a purchase `awaiting_approval` once `transaction.completed` fires.
4. Leave `NEXT_PUBLIC_PADDLE_ENV=sandbox` until you're ready to go live.

Without these set, the Buy/Reserve buttons and sign-in form degrade to a visible inline message
instead of failing silently — that's intentional.

## Known gaps (by design, for a first pass)

- No responsive treatment on the dashboard sidebar (240px fixed) — fine on desktop, tight on
  phones. Everything else (browse, listing, sell, advertise, map) is responsive.
- Photo upload in `/sell` is UI-only — no storage upload wired up yet (use Supabase Storage).
- No session/auth guard on the dashboard routes yet — they're reachable by URL regardless of
  role. Add middleware/`proxy.ts` checking `profiles.role` once real auth is in place.
- Admin approve/reject and seller approve/decline currently only update local component state,
  not the database.
