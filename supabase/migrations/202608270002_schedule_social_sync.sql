create extension if not exists pg_cron with schema pg_catalog;
create extension if not exists pg_net with schema extensions;
create extension if not exists supabase_vault with schema vault;

create schema if not exists private;
revoke all on schema private from public, anon, authenticated;

create or replace function private.invoke_social_sync(function_name text)
returns bigint
language plpgsql
security definer
set search_path = ''
as $$
declare
  project_url text;
  publishable_key text;
  sync_secret text;
  request_id bigint;
begin
  select decrypted_secret into project_url
  from vault.decrypted_secrets
  where name = 'pixelmurmur_project_url'
  limit 1;

  select decrypted_secret into publishable_key
  from vault.decrypted_secrets
  where name = 'pixelmurmur_publishable_key'
  limit 1;

  select decrypted_secret into sync_secret
  from vault.decrypted_secrets
  where name = 'pixelmurmur_sync_cron_secret'
  limit 1;

  if project_url is null or publishable_key is null or sync_secret is null then
    return null;
  end if;

  select net.http_post(
    url := project_url || '/functions/v1/' || function_name,
    headers := jsonb_build_object(
      'Content-Type', 'application/json',
      'apikey', publishable_key,
      'x-sync-secret', sync_secret
    ),
    body := '{"source":"cron"}'::jsonb,
    timeout_milliseconds := 30000
  ) into request_id;

  return request_id;
end;
$$;

select cron.schedule(
  'pixelmurmur-sync-instagram-daily',
  '5 18 * * *',
  $$select private.invoke_social_sync('sync-instagram');$$
);

select cron.schedule(
  'pixelmurmur-sync-x-daily',
  '15 18 * * *',
  $$select private.invoke_social_sync('sync-x');$$
);

comment on function private.invoke_social_sync(text) is
  'Invokes an authenticated social sync function. Returns null until the three required Vault secrets exist.';
