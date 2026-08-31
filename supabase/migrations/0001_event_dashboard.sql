-- Event Dashboard: Techquity Distribution + Next Step Tech Lab
-- Run this in the monte-os Supabase project's SQL editor (Project ID: dhrurqjbmvqltoofmlmd).
-- Mirrors the RLS pattern already used by habit_logs / ignition_checkins: every row is
-- scoped to the authenticated owner via auth.uid().

create table if not exists event_settings (
  user_id uuid primary key references auth.users(id) on delete cascade,
  event_date date not null default '2026-10-24',
  event_time text not null default '4:00 PM',
  event_label text not null default 'Techquity Distribution + Tech Lab Graduation',
  seeded_at timestamptz,
  updated_at timestamptz not null default now()
);

create table if not exists event_contacts (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  name text not null,
  org text,
  role text,
  email text,
  phone text,
  relationship text,
  status text not null default 'active' check (status in ('active', 'stalled', 'closed')),
  next_action text,
  next_action_due date,
  created_at timestamptz not null default now()
);

create table if not exists event_touches (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  contact_id uuid not null references event_contacts(id) on delete cascade,
  channel text not null check (channel in ('phone', 'email', 'text', 'in_person', 'other')),
  direction text not null default 'outbound' check (direction in ('outbound', 'inbound')),
  summary text,
  occurred_at timestamptz not null default now()
);

create table if not exists event_tasks (
  id uuid primary key default gen_random_uuid(),
  user_id uuid not null references auth.users(id) on delete cascade,
  title text not null,
  category text not null default 'logistics' check (category in ('outreach', 'logistics', 'compliance', 'content', 'cohort')),
  status text not null default 'todo' check (status in ('todo', 'in_progress', 'done', 'blocked')),
  due_date date,
  notes text,
  created_at timestamptz not null default now()
);

create index if not exists event_contacts_user_idx on event_contacts (user_id);
create index if not exists event_touches_user_idx on event_touches (user_id);
create index if not exists event_touches_contact_idx on event_touches (contact_id);
create index if not exists event_tasks_user_idx on event_tasks (user_id);

alter table event_settings enable row level security;
alter table event_contacts enable row level security;
alter table event_touches enable row level security;
alter table event_tasks enable row level security;

drop policy if exists "own rows" on event_settings;
drop policy if exists "own rows" on event_contacts;
drop policy if exists "own rows" on event_touches;
drop policy if exists "own rows" on event_tasks;

create policy "own rows" on event_settings for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on event_contacts for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on event_touches for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
create policy "own rows" on event_tasks for all using (auth.uid() = user_id) with check (auth.uid() = user_id);
