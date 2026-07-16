-- Supabase schema for Lentera Outdoor
-- Run this in the Supabase SQL editor after creating a new project.

create extension if not exists "pgcrypto";

-- User profiles mirrored from Supabase Auth registrations.
create table if not exists public.profiles (
  id uuid primary key references auth.users (id) on delete cascade,
  email text not null unique,
  full_name text,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

alter table public.profiles enable row level security;

create policy "Allow authenticated users to read their own profile"
  on public.profiles
  for select
  to authenticated
  using (auth.uid() = id);

create policy "Allow authenticated users to update their own profile"
  on public.profiles
  for update
  to authenticated
  using (auth.uid() = id)
  with check (auth.uid() = id);

create or replace function public.handle_new_user()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  insert into public.profiles (id, email, full_name)
  values (
    new.id,
    new.email,
    coalesce(
      new.raw_user_meta_data ->> 'full_name',
      new.raw_user_meta_data ->> 'name',
      split_part(new.email, '@', 1)
    )
  )
  on conflict (id) do update
    set email = excluded.email,
        full_name = coalesce(excluded.full_name, public.profiles.full_name),
        updated_at = now();

  return new;
end;
$$;

drop trigger if exists on_auth_user_created on auth.users;
create trigger on_auth_user_created
after insert on auth.users
for each row
execute function public.handle_new_user();

create or replace function public.sync_profile_email()
returns trigger
language plpgsql
security definer
set search_path = public
as $$
begin
  if new.email is distinct from old.email then
    update public.profiles
      set email = new.email,
          updated_at = now()
    where id = new.id;
  end if;

  return new;
end;
$$;

drop trigger if exists on_auth_user_email_updated on auth.users;
create trigger on_auth_user_email_updated
after update of email on auth.users
for each row
execute function public.sync_profile_email();

-- Public contact form submissions.
create table if not exists public.contact_messages (
  id uuid primary key default gen_random_uuid(),
  name text not null,
  topic text not null,
  visit_date date,
  message text not null,
  created_at timestamptz not null default now()
);

alter table public.contact_messages enable row level security;

create policy "Allow public insert for contact messages"
  on public.contact_messages
  for insert
  to anon, authenticated
  with check (true);

create policy "Allow admins or authenticated users to read contact messages"
  on public.contact_messages
  for select
  to authenticated
  using (true);

-- Checkout drafts tied to signed-in users.
create table if not exists public.checkout_drafts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users (id) on delete cascade,
  email text not null,
  pickup_date date not null,
  notes text,
  items jsonb not null default '[]'::jsonb,
  total numeric(12,2) not null check (total >= 0),
  status text not null default 'draft' check (status in ('draft', 'submitted', 'confirmed', 'cancelled')),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists checkout_drafts_user_id_created_at_idx
  on public.checkout_drafts (user_id, created_at desc);

create index if not exists checkout_drafts_status_idx
  on public.checkout_drafts (status);

alter table public.checkout_drafts enable row level security;

create policy "Allow authenticated users to insert their own checkout drafts"
  on public.checkout_drafts
  for insert
  to authenticated
  with check (auth.uid() = user_id);

create policy "Allow authenticated users to read their own checkout drafts"
  on public.checkout_drafts
  for select
  to authenticated
  using (auth.uid() = user_id);

create policy "Allow authenticated users to update their own checkout drafts"
  on public.checkout_drafts
  for update
  to authenticated
  using (auth.uid() = user_id)
  with check (auth.uid() = user_id);

create or replace function public.set_updated_at()
returns trigger
language plpgsql
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

drop trigger if exists set_checkout_drafts_updated_at on public.checkout_drafts;
create trigger set_checkout_drafts_updated_at
before update on public.checkout_drafts
for each row
execute function public.set_updated_at();
