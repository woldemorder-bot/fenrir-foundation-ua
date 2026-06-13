-- Run in Supabase SQL Editor (Dashboard → SQL → New query)

create table if not exists public.donations (
  id uuid primary key default gen_random_uuid(),
  order_id text not null unique,
  gateway text not null check (gateway in ('liqpay', 'stripe')),
  amount numeric(12, 2) not null,
  currency text not null default 'UAH',
  email text,
  note text,
  project_slug text,
  recurring boolean not null default false,
  status text not null,
  external_id text,
  raw_payload jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create index if not exists donations_created_at_idx on public.donations (created_at desc);
create index if not exists donations_email_idx on public.donations (email);
create index if not exists donations_gateway_idx on public.donations (gateway);

alter table public.donations enable row level security;

-- No public policies: only service role (server) can read/write.

create or replace function public.set_donations_updated_at()
returns trigger as $$
begin
  new.updated_at = now();
  return new;
end;
$$ language plpgsql;

drop trigger if exists donations_updated_at on public.donations;
create trigger donations_updated_at
  before update on public.donations
  for each row execute function public.set_donations_updated_at();
