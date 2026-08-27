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
