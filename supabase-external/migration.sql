-- =============================================================
-- EduStack R23 — External Supabase Setup
-- Run this in YOUR Supabase project: Dashboard → SQL Editor → New query
-- =============================================================

-- 1. Materials table
create table if not exists public.materials (
  id uuid primary key default gen_random_uuid(),
  title text,
  branch text not null,
  semester text not null,
  subject text not null,
  unit text,
  type text not null check (type in ('Materials', 'PPT', 'PYQs')),
  file_url text not null,
  created_at timestamptz not null default now()
);

-- 2. Enable Row Level Security
alter table public.materials enable row level security;

-- 3. Public read access (anyone can view materials)
drop policy if exists "Materials are viewable by everyone" on public.materials;
create policy "Materials are viewable by everyone"
  on public.materials
  for select
  using (true);

-- =============================================================
-- 4. STORAGE BUCKET (do this manually in the dashboard):
--    Storage → New bucket → Name: materials → Public: ON
--
-- Or run this SQL:
-- =============================================================
insert into storage.buckets (id, name, public)
values ('materials', 'materials', true)
on conflict (id) do update set public = true;

-- Allow public read on materials bucket
drop policy if exists "Public read access for materials bucket" on storage.objects;
create policy "Public read access for materials bucket"
  on storage.objects
  for select
  using (bucket_id = 'materials');
