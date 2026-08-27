-- Run this once in your Supabase project's SQL Editor (Project > SQL Editor > New query)
-- to create the shared pins table Canly reads and writes to.

create table if not exists pins (
  id text primary key,
  drink_id text not null,
  store_name text not null,
  city text,
  note text,
  lat double precision,
  lng double precision,
  posted_by text,
  created_at timestamptz not null default now()
);

alter table pins enable row level security;

-- Canly has no accounts yet, so every visitor uses the public "anon" key.
-- These policies let anyone read and post pins (an open, public sighting
-- log — like a corkboard, not a personal list). There is deliberately no
-- delete or update policy: nothing in the app can remove a row once it's
-- posted, since without real accounts there's no way to tell who is
-- allowed to remove what. Pruning the table is a manual job for you, the
-- project owner, from the Supabase dashboard.
create policy "Public read" on pins for select using (true);
create policy "Public insert" on pins for insert with check (true);

-- Accounts (ratings, favorites, public profile)
--
-- Before running this part: in your Supabase project, go to
-- Authentication > Providers > Email and turn OFF "Confirm email".
-- This is an MVP tradeoff for signup friction — anyone can sign up and
-- start using an account immediately with no email-verification step.
-- Turn it back on later once you care about verifying real email
-- addresses (e.g. before doing anything email-based like password reset
-- notifications at scale).

create table if not exists profiles (
  id uuid primary key references auth.users(id) on delete cascade,
  username text unique not null,
  display_name text not null default '',
  bio text not null default '',
  avatar_url text,
  created_at timestamptz not null default now()
);

alter table profiles enable row level security;

-- Profiles are public by design — the whole point is a shareable /u/username
-- page. Only the owner can create or edit their own row.
create policy "Profiles are public" on profiles for select using (true);
create policy "Users insert their own profile" on profiles for insert with check (auth.uid() = id);
create policy "Users update their own profile" on profiles for update using (auth.uid() = id);

create table if not exists ratings (
  user_id uuid not null references auth.users(id) on delete cascade,
  drink_id text not null,
  stars numeric not null,
  review text not null default '',
  updated_at timestamptz not null default now(),
  primary key (user_id, drink_id)
);

alter table ratings enable row level security;

-- Also public by design — a rating on someone's public profile needs to be
-- readable by other people. Only the owner can write their own ratings.
create policy "Ratings are public" on ratings for select using (true);
create policy "Users manage their own ratings" on ratings for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);

create table if not exists favorites (
  user_id uuid not null references auth.users(id) on delete cascade,
  slot integer not null check (slot in (0, 1, 2)),
  drink_id text not null,
  primary key (user_id, slot)
);

alter table favorites enable row level security;

create policy "Favorites are public" on favorites for select using (true);
create policy "Users manage their own favorites" on favorites for all
  using (auth.uid() = user_id) with check (auth.uid() = user_id);
