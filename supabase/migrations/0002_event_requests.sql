-- Event requests submitted from the planner. Written only by the server (service role).
create table if not exists public.event_requests (
  id uuid primary key default gen_random_uuid(),
  reference text not null unique,
  venue_slug text not null,
  name text not null,
  email text not null,
  event_type text,
  event_date date not null,
  hours integer not null,
  guests integer not null,
  layout text,
  add_ons text[] not null default '{}',
  notes text,
  estimate integer,
  status text not null default 'requested'
    check (status in ('requested', 'quoted', 'approved', 'paid', 'declined')),
  created_at timestamptz not null default now()
);

create index if not exists event_requests_status_idx on public.event_requests (status, created_at desc);

alter table public.event_requests enable row level security;
