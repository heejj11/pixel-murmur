import type { SupabaseClient } from "npm:@supabase/supabase-js@2.112.4";

export type Platform = "instagram" | "x";

export type NormalizedMetrics = {
  followers?: number | null;
  views?: number | null;
  reach?: number | null;
  impressions?: number | null;
  likes?: number | null;
  comments?: number | null;
  shares?: number | null;
  saves?: number | null;
  profile_views?: number | null;
  link_clicks?: number | null;
};

export function utcDate(date = new Date()) {
  return date.toISOString().slice(0, 10);
}

export async function getOrCreateAccount(
  admin: SupabaseClient,
  platform: Platform,
  username: string,
  values: Record<string, unknown> = {},
) {
  const { data, error } = await admin
    .from("social_accounts")
    .upsert({ platform, username, ...values }, {
      onConflict: "platform,username",
    })
    .select("*")
    .single();

  if (error) throw error;
  return data;
}

export async function updateSyncState(
  admin: SupabaseClient,
  accountId: string,
  status: "syncing" | "success" | "partial" | "error",
  errorMessage: string | null = null,
) {
  const values: Record<string, unknown> = {
    sync_status: status,
    last_sync_error: errorMessage,
  };

  if (status !== "syncing") values.last_synced_at = new Date().toISOString();

  const { error } = await admin
    .from("social_accounts")
    .update(values)
    .eq("id", accountId);

  if (error) throw error;
}

export async function upsertPost(
  admin: SupabaseClient,
  values: {
    account_id: string;
    external_post_id: string;
    url: string;
    caption: string | null;
    thumbnail_url: string | null;
    published_at: string;
    metadata: Record<string, unknown>;
  },
) {
  const { data, error } = await admin
    .from("social_posts")
    .upsert(values, { onConflict: "account_id,external_post_id" })
    .select("id")
    .single();

  if (error) throw error;
  return data.id as string;
}

export async function upsertSnapshot(
  admin: SupabaseClient,
  accountId: string,
  postId: string | null,
  metrics: NormalizedMetrics,
  rawMetrics: Record<string, unknown>,
) {
  const { error } = await admin
    .from("social_metric_snapshots")
    .upsert({
      account_id: accountId,
      post_id: postId,
      snapshot_date: utcDate(),
      captured_at: new Date().toISOString(),
      followers: metrics.followers ?? null,
      views: metrics.views ?? null,
      reach: metrics.reach ?? null,
      impressions: metrics.impressions ?? null,
      likes: metrics.likes ?? null,
      comments: metrics.comments ?? null,
      shares: metrics.shares ?? null,
      saves: metrics.saves ?? null,
      profile_views: metrics.profile_views ?? null,
      link_clicks: metrics.link_clicks ?? null,
      metrics: rawMetrics,
    }, { onConflict: "account_id,post_id,snapshot_date" });

  if (error) throw error;
}

export async function mapWithConcurrency<T, R>(
  values: T[],
  concurrency: number,
  mapper: (value: T, index: number) => Promise<R>,
) {
  const results = new Array<R>(values.length);
  let cursor = 0;

  async function worker() {
    while (cursor < values.length) {
      const index = cursor;
      cursor += 1;
      results[index] = await mapper(values[index], index);
    }
  }

  await Promise.all(
    Array.from(
      { length: Math.min(concurrency, values.length) },
      () => worker(),
    ),
  );

  return results;
}
