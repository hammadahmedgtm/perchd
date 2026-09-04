-- Perchd core schema
-- Run against a Supabase project: supabase db push, or paste into the SQL editor.

create type user_role as enum ('seller', 'brand', 'admin');
create type listing_category as enum ('laptop', 'water_bottle', 'phone_case', 'backpack', 'bike', 'car');
create type seen_context as enum ('coffee_shops', 'gym', 'campus', 'commute', 'video_calls');
create type listing_status as enum ('draft', 'pending_review', 'live', 'sold', 'expired');
create type purchase_status as enum ('awaiting_approval', 'live', 'declined', 'expired');
create type ad_slot_kind as enum ('homepage_banner', 'category_sidebar', 'sponsored_listing');

create table profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  role user_role not null default 'seller',
  display_name text not null,
  avatar_url text,
  brand_name text,
  city text,
  state text,
  paddle_customer_id text,
  paddle_seller_id text,
  created_at timestamptz not null default now()
);

create table listings (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references profiles(id) on delete cascade,
  title text not null,
  category listing_category not null,
  placement text not null,
  sticker_size text not null,
  price_cents integer not null check (price_cents > 0),
  duration_days integer not null check (duration_days > 0),
  status listing_status not null default 'pending_review',
  contexts seen_context[] not null default '{}',
  city text not null,
  state text not null,
  lat double precision,
  lng double precision,
  photo_urls text[] not null default '{}',
  created_at timestamptz not null default now(),
  reviewed_at timestamptz,
  reviewed_by uuid references profiles(id)
);

create table purchases (
  id uuid primary key default gen_random_uuid(),
  listing_id uuid not null references listings(id) on delete cascade,
  brand_id uuid not null references profiles(id) on delete cascade,
  price_cents integer not null,
  status purchase_status not null default 'awaiting_approval',
  design_url text,
  paddle_transaction_id text,
  purchased_at timestamptz not null default now(),
  responded_at timestamptz,
  starts_at timestamptz,
  ends_at timestamptz
);

create table proof_photos (
  id uuid primary key default gen_random_uuid(),
  purchase_id uuid not null references purchases(id) on delete cascade,
  photo_url text not null,
  kind text not null default 'placement' check (kind in ('placement', 'check_in')),
  created_at timestamptz not null default now()
);

create table payouts (
  id uuid primary key default gen_random_uuid(),
  seller_id uuid not null references profiles(id) on delete cascade,
  purchase_id uuid references purchases(id) on delete set null,
  amount_cents integer not null,
  paddle_payout_id text,
  paid_at timestamptz not null default now()
);

create table ad_slots (
  id uuid primary key default gen_random_uuid(),
  kind ad_slot_kind not null,
  title text not null,
  description text not null,
  price_cents integer not null,
  available boolean not null default true
);

create table ad_bookings (
  id uuid primary key default gen_random_uuid(),
  ad_slot_id uuid not null references ad_slots(id) on delete cascade,
  brand_id uuid not null references profiles(id) on delete cascade,
  creative_url text,
  paddle_transaction_id text,
  starts_at timestamptz not null default now(),
  ends_at timestamptz not null
);

-- Row Level Security
alter table profiles enable row level security;
alter table listings enable row level security;
alter table purchases enable row level security;
alter table proof_photos enable row level security;
alter table payouts enable row level security;
alter table ad_slots enable row level security;
alter table ad_bookings enable row level security;

create policy "profiles are self-readable" on profiles for select using (auth.uid() = id);
create policy "profiles are self-updatable" on profiles for update using (auth.uid() = id);

create policy "live listings are public" on listings for select using (status = 'live' or seller_id = auth.uid());
create policy "sellers manage own listings" on listings for insert with check (seller_id = auth.uid());
create policy "sellers update own listings" on listings for update using (seller_id = auth.uid());

create policy "purchases visible to seller and brand" on purchases for select using (
  brand_id = auth.uid() or exists (select 1 from listings l where l.id = listing_id and l.seller_id = auth.uid())
);
create policy "brands create purchases" on purchases for insert with check (brand_id = auth.uid());
create policy "sellers approve or decline purchases" on purchases for update using (
  exists (select 1 from listings l where l.id = listing_id and l.seller_id = auth.uid())
);

create policy "ad slots are public" on ad_slots for select using (true);

-- Admin override: admins can see and moderate everything.
create or replace function is_admin() returns boolean as $$
  select exists (select 1 from profiles where id = auth.uid() and role = 'admin');
$$ language sql security definer stable;

create policy "admins read all listings" on listings for select using (is_admin());
create policy "admins update all listings" on listings for update using (is_admin());
create policy "admins read all purchases" on purchases for select using (is_admin());
create policy "admins read all profiles" on profiles for select using (is_admin());
