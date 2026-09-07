create or replace function public.valid_instagram_post_urls(urls text[])
returns boolean
language sql
immutable
set search_path = ''
as $$
  select
    count(*) <= 12
    and count(*) = count(distinct url)
    and coalesce(bool_and(
      url is not null
      and url ~ '^https://(www\.)?instagram\.com/([^/?#]+/)?(p|reel|tv)/[^/?#]+/?([?#].*)?$'
    ), true)
  from pg_catalog.unnest(urls) as url;
$$;

create or replace function public.valid_x_post_urls(urls text[])
returns boolean
language sql
immutable
set search_path = ''
as $$
  select
    count(*) <= 12
    and count(*) = count(distinct url)
    and coalesce(bool_and(
      url is not null
      and url ~ '^https://(www\.)?(x\.com|twitter\.com)/[^/?#]+/status/[0-9]+/?([?#].*)?$'
    ), true)
  from pg_catalog.unnest(urls) as url;
$$;

alter table public.object_publication
  drop constraint if exists object_publication_instagram_url_check;

alter table public.object_publication
  add constraint object_publication_instagram_url_check check (
    instagram_url is null
    or instagram_url ~ '^https://(www\.)?instagram\.com/([^/?#]+/)?(p|reel|tv)/[^/?#]+/?([?#].*)?$'
  );

alter table public.object_publication
  add column if not exists instagram_urls text[] not null default '{}',
  add column if not exists x_urls text[] not null default '{}';

update public.object_publication
set
  instagram_urls = case
    when instagram_url is null then '{}'
    else array[instagram_url]
  end,
  x_urls = case
    when x_url is null then '{}'
    else array[x_url]
  end;

alter table public.object_publication
  drop constraint if exists object_publication_instagram_urls_valid,
  drop constraint if exists object_publication_x_urls_valid;

alter table public.object_publication
  add constraint object_publication_instagram_urls_valid
    check (public.valid_instagram_post_urls(instagram_urls)),
  add constraint object_publication_x_urls_valid
    check (public.valid_x_post_urls(x_urls));

insert into public.object_publication (
  object_id,
  is_published,
  instagram_url,
  x_url,
  instagram_urls,
  x_urls
)
values (
  'PM-018',
  true,
  'https://www.instagram.com/pixelmurmur/p/Dc7rFxtEkAf/',
  'https://x.com/pixelmurmur/status/2096759400325394940',
  array['https://www.instagram.com/pixelmurmur/p/Dc7rFxtEkAf/'],
  array['https://x.com/pixelmurmur/status/2096759400325394940']
)
on conflict (object_id) do update
set
  is_published = excluded.is_published,
  instagram_url = excluded.instagram_url,
  x_url = excluded.x_url,
  instagram_urls = excluded.instagram_urls,
  x_urls = excluded.x_urls;

comment on column public.object_publication.instagram_urls is
  'Up to 12 Instagram post or reel URLs attached to this object.';

comment on column public.object_publication.x_urls is
  'Up to 12 X or Twitter status URLs attached to this object.';
