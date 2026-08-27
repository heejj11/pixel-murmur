create table public.object_publication (
  object_id text primary key check (object_id ~ '^PM-[0-9]{3}$'),
  is_published boolean not null default false,
  instagram_url text check (
    instagram_url is null
    or instagram_url ~ '^https://(www\.)?instagram\.com/(p|reel|tv)/[^/?#]+/?([?#].*)?$'
  ),
  x_url text check (
    x_url is null
    or x_url ~ '^https://(www\.)?(x\.com|twitter\.com)/[^/?#]+/status/[0-9]+/?([?#].*)?$'
  ),
  created_at timestamptz not null default now(),
  updated_at timestamptz not null default now()
);

create trigger object_publication_set_updated_at
before update on public.object_publication
for each row execute function public.set_updated_at();

alter table public.object_publication enable row level security;

revoke all on public.object_publication from anon, authenticated;
grant select on public.object_publication to anon, authenticated;
grant insert, update on public.object_publication to authenticated;

create policy "Anyone reads published objects"
on public.object_publication
for select
to anon, authenticated
using (is_published = true);

create policy "PixelMurmur admin reads every object"
on public.object_publication
for select
to authenticated
using ((select public.is_pixelmurmur_admin()));

create policy "PixelMurmur admin inserts objects"
on public.object_publication
for insert
to authenticated
with check ((select public.is_pixelmurmur_admin()));

create policy "PixelMurmur admin updates objects"
on public.object_publication
for update
to authenticated
using ((select public.is_pixelmurmur_admin()))
with check ((select public.is_pixelmurmur_admin()));

insert into public.object_publication (object_id, is_published)
select
  'PM-' || lpad(series::text, 3, '0'),
  series in (1, 2)
from generate_series(1, 19) as series
on conflict (object_id) do update
set is_published = excluded.is_published;

comment on table public.object_publication is
  'Public visibility and optional Instagram/X post links for each PixelMurmur object.';
