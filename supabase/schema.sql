-- ═══════════════════════════════════════════════════════════
--  Nexus AI — Supabase Schema
--  Run in: Supabase Dashboard → SQL Editor → New Query
-- ═══════════════════════════════════════════════════════════

create extension if not exists "uuid-ossp";

-- ─── Profiles ────────────────────────────────────────────────
create table public.profiles (
  id           uuid references auth.users(id) on delete cascade primary key,
  email        text not null,
  full_name    text,
  company      text,
  role         text,
  plan         text default 'free' check (plan in ('free','pro','enterprise')),
  avatar_url   text,
  onboarded    boolean default false,
  created_at   timestamptz default now()
);

create or replace function public.handle_new_user()
returns trigger language plpgsql security definer set search_path = public as $$
begin
  insert into public.profiles (id, email, full_name, company, role)
  values (
    new.id,
    new.email,
    new.raw_user_meta_data->>'full_name',
    new.raw_user_meta_data->>'company',
    new.raw_user_meta_data->>'role'
  );
  return new;
end;
$$;

create trigger on_auth_user_created
  after insert on auth.users
  for each row execute procedure public.handle_new_user();

-- ─── Waitlist ─────────────────────────────────────────────────
create table public.waitlist (
  id         uuid default uuid_generate_v4() primary key,
  email      text not null unique,
  company    text,
  role       text,
  use_case   text,
  created_at timestamptz default now()
);

-- ─── Conversations ────────────────────────────────────────────
create table public.conversations (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  title      text not null default 'New conversation',
  created_at timestamptz default now(),
  updated_at timestamptz default now()
);

-- ─── Messages ─────────────────────────────────────────────────
create table public.messages (
  id              uuid default uuid_generate_v4() primary key,
  conversation_id uuid references public.conversations(id) on delete cascade,
  role            text not null check (role in ('user','assistant')),
  content         text not null,
  created_at      timestamptz default now()
);

-- ─── Integrations ─────────────────────────────────────────────
create table public.user_integrations (
  id         uuid default uuid_generate_v4() primary key,
  user_id    uuid references auth.users(id) on delete cascade,
  tool_slug  text not null,
  connected  boolean default true,
  created_at timestamptz default now(),
  unique(user_id, tool_slug)
);

-- ─── Row Level Security ───────────────────────────────────────
alter table public.profiles          enable row level security;
alter table public.waitlist          enable row level security;
alter table public.conversations     enable row level security;
alter table public.messages          enable row level security;
alter table public.user_integrations enable row level security;

-- Profiles
create policy "Users view own profile"   on profiles for select using (auth.uid() = id);
create policy "Users update own profile" on profiles for update using (auth.uid() = id);

-- Waitlist — public insert
create policy "Anyone can join waitlist" on waitlist for insert with check (true);

-- Conversations
create policy "Users manage own conversations" on conversations for all using (auth.uid() = user_id);

-- Messages
create policy "Users see own messages" on messages for all using (
  exists (select 1 from conversations where id = conversation_id and user_id = auth.uid())
);

-- Integrations
create policy "Users manage own integrations" on user_integrations for all using (auth.uid() = user_id);

-- ─── Grants ───────────────────────────────────────────────────
grant select on public.profiles          to anon, authenticated;
grant select, insert on public.waitlist  to anon, authenticated;
grant all    on public.conversations     to authenticated;
grant all    on public.messages          to authenticated;
grant all    on public.user_integrations to authenticated;

-- ─── Stripe billing fields (add to profiles) ─────────────────────
alter table public.profiles add column if not exists stripe_customer_id      text unique;
alter table public.profiles add column if not exists stripe_subscription_id  text;
alter table public.profiles add column if not exists stripe_subscription_status text default 'inactive';

-- ─── Billing events log ───────────────────────────────────────────
create table if not exists public.billing_events (
  id          uuid default uuid_generate_v4() primary key,
  user_id     uuid references auth.users(id) on delete cascade,
  event_type  text not null,
  amount      integer,
  currency    text default 'usd',
  invoice_id  text,
  created_at  timestamptz default now()
);

alter table public.billing_events enable row level security;

create policy "Users see own billing events" on billing_events
  for select using (auth.uid() = user_id);

grant select on public.billing_events to authenticated;
