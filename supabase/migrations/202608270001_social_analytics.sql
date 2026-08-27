create extension if not exists pgcrypto with schema extensions;

create table public.social_accounts (
  id uuid primary key default extensions.gen_random_uuid(),
  platform text not null check (platform in ('instagram', 'x')),
  username text not null,
  external_account_id text,
  profile_url text,
  profile_image_url text,
  last_synced_at timestamptz,
  sync_status text not null default 'pending'
    check (sync_status in ('pending', 'syncing', 'success', 'partial', 'error')),
  last_sync_error text,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (platform, username)
);

create table public.social_posts (
  id uuid primary key default extensions.gen_random_uuid(),
  account_id uuid not null references public.social_accounts(id) on delete cascade,
  external_post_id text not null,
  url text not null,
  caption text,
  thumbnail_url text,
  published_at timestamptz not null,
  metadata jsonb not null default '{}'::jsonb,
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now(),
  unique (account_id, external_post_id)
);

create table public.social_metric_snapshots (
  id uuid primary key default extensions.gen_random_uuid(),
  account_id uuid not null references public.social_accounts(id) on delete cascade,
  post_id uuid references public.social_posts(id) on delete cascade,
  snapshot_date date not null default (now() at time zone 'utc')::date,
  captured_at timestamptz not null default now(),
  followers bigint,
  views bigint,
  reach bigint,
  impressions bigint,
  likes bigint,
  comments bigint,
  shares bigint,
  saves bigint,
  profile_views bigint,
  link_clicks bigint,
  metrics jsonb not null default '{}'::jsonb,
  constraint social_metric_snapshots_daily_unique
    unique nulls not distinct (account_id, post_id, snapshot_date)
);

create index social_posts_account_published_idx
  on public.social_posts (account_id, published_at desc);

create index social_metric_snapshots_account_captured_idx
  on public.social_metric_snapshots (account_id, captured_at desc);

create index social_metric_snapshots_post_captured_idx
  on public.social_metric_snapshots (post_id, captured_at desc)
  where post_id is not null;

create or replace function public.set_updated_at()
returns trigger
language plpgsql
set search_path = ''
as $$
begin
  new.updated_at = now();
  return new;
end;
$$;

create trigger social_accounts_set_updated_at
before update on public.social_accounts
for each row execute function public.set_updated_at();

create trigger social_posts_set_updated_at
before update on public.social_posts
for each row execute function public.set_updated_at();

create or replace function public.is_pixelmurmur_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
    and (auth.jwt() ->> 'is_anonymous')::boolean is not true,
    false
  );
$$;

alter table public.social_accounts enable row level security;
alter table public.social_posts enable row level security;
alter table public.social_metric_snapshots enable row level security;

revoke all on public.social_accounts from anon, authenticated;
revoke all on public.social_posts from anon, authenticated;
revoke all on public.social_metric_snapshots from anon, authenticated;

grant select on public.social_accounts to authenticated;
grant select on public.social_posts to authenticated;
grant select on public.social_metric_snapshots to authenticated;
grant execute on function public.is_pixelmurmur_admin() to authenticated;

create policy "PixelMurmur admin reads social accounts"
on public.social_accounts
for select
to authenticated
using ((select public.is_pixelmurmur_admin()));

create policy "PixelMurmur admin reads social posts"
on public.social_posts
for select
to authenticated
using ((select public.is_pixelmurmur_admin()));

create policy "PixelMurmur admin reads metric snapshots"
on public.social_metric_snapshots
for select
to authenticated
using ((select public.is_pixelmurmur_admin()));

insert into public.social_accounts (platform, username, profile_url)
values
  ('instagram', 'pixelmurmur', 'https://www.instagram.com/pixelmurmur/'),
  ('x', 'pixelmurmur', 'https://x.com/pixelmurmur')
on conflict (platform, username) do nothing;

comment on table public.social_accounts is 'Connected Instagram and X accounts plus sync health.';
comment on table public.social_posts is 'Platform posts cached for the private analytics dashboard.';
comment on table public.social_metric_snapshots is 'Daily normalized metrics with original platform payload preserved in metrics.';
