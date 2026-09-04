-- Captures a brand's design/contact info for one spot before payment, so
-- the intent (and their logo) exists even if checkout is abandoned. Keyed
-- by text listing/spot ids since these currently come from the app's
-- mock catalog rather than real `listings`/`spots` tables — once those
-- exist, point this at them with proper foreign keys instead.
create table spot_bookings (
  id uuid primary key default gen_random_uuid(),
  listing_id text not null,
  spot_id text not null,
  brand_name text not null,
  brand_email text not null,
  logo_url text,
  website_url text,
  price_cents integer not null,
  paddle_transaction_id text,
  status text not null default 'pending_payment' check (status in ('pending_payment', 'paid', 'cancelled')),
  created_at timestamptz not null default now()
);

alter table spot_bookings enable row level security;

create policy "anyone can create a booking" on spot_bookings for insert with check (true);
