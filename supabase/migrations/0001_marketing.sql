-- Mailing list and vendor ad inquiries. Written only by the server (service role); no public access.
create table if not exists public.subscribers (
  id uuid primary key default gen_random_uuid(),
  email text not null unique,
  source text,
  created_at timestamptz not null default now()
);

create table if not exists public.ad_inquiries (
  id uuid primary key default gen_random_uuid(),
  business text not null,
  name text not null,
  email text not null,
  category text,
  placement text not null,
  message text,
  created_at timestamptz not null default now()
);

-- RLS on with no policies: anon/authenticated keys can't read or write; the service role bypasses RLS.
alter table public.subscribers enable row level security;
alter table public.ad_inquiries enable row level security;
