create or replace function public.is_pixelmurmur_admin()
returns boolean
language sql
stable
security invoker
set search_path = ''
as $$
  select coalesce(
    (
      (auth.jwt() -> 'app_metadata' ->> 'role') = 'admin'
      or lower(auth.jwt() ->> 'email') = 'pixelmurmurlab@gmail.com'
    )
    and (auth.jwt() ->> 'is_anonymous')::boolean is not true,
    false
  );
$$;

grant execute on function public.is_pixelmurmur_admin() to authenticated;

comment on function public.is_pixelmurmur_admin() is
  'Allows the configured PixelMurmur mailbox or an explicit admin role to operate the studio desk.';
