-- Visitor comments. Only the site's server (service_role key) reads or writes this table.
create table if not exists public.comments (
  id uuid primary key default gen_random_uuid(),
  name text check (char_length(name) <= 40),
  body text not null check (char_length(body) between 3 and 500),
  ip_hash text not null,
  created_at timestamptz not null default now(),
  approved_at timestamptz
);

create index if not exists comments_approved_at_idx on public.comments (approved_at desc);
create index if not exists comments_ip_hash_created_at_idx on public.comments (ip_hash, created_at);

-- Only the server role may touch the table (explicit, in case the project does not grant it by default).
revoke all on public.comments from anon, authenticated;
grant select, insert, update, delete on public.comments to service_role;

-- Row Level Security on, with no policies: the public anon key can do nothing.
alter table public.comments enable row level security;
