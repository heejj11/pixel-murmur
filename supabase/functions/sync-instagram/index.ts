import {
  authorizeSyncRequest,
  createAdminClient,
} from "../_shared/supabase.ts";
import { fetchJson, jsonResponse, publicError } from "../_shared/http.ts";
import {
  getOrCreateAccount,
  mapWithConcurrency,
  updateSyncState,
  upsertPost,
  upsertSnapshot,
} from "../_shared/sync.ts";

type InstagramProfile = {
  id: string;
  username: string;
  followers_count?: number;
  media_count?: number;
  profile_picture_url?: string;
};

type InstagramMedia = {
  id: string;
  caption?: string;
  media_type?: string;
  media_product_type?: string;
  media_url?: string;
  thumbnail_url?: string;
  permalink: string;
  timestamp: string;
  like_count?: number;
  comments_count?: number;
};

type InstagramInsight = {
  name: string;
  values?: Array<{ value: unknown; end_time?: string }>;
  total_value?: { value: unknown };
};

type InstagramInsightsResponse = { data?: InstagramInsight[] };
type InstagramMediaResponse = { data?: InstagramMedia[] };

function requiredEnv(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing Edge Function secret: ${name}`);
  return value;
}

function numericValue(value: unknown) {
  return typeof value === "number" && Number.isFinite(value) ? value : null;
}

function flattenInsights(response: InstagramInsightsResponse) {
  return Object.fromEntries(
    (response.data ?? []).map((insight) => {
      const value = insight.total_value?.value ??
        insight.values?.at(-1)?.value ??
        null;
      return [insight.name, value];
    }),
  );
}

Deno.serve(async (req) => {
  if (req.method === "OPTIONS") return jsonResponse(req, { ok: true });
  if (req.method !== "POST") {
    return jsonResponse(req, { error: "Method not allowed" }, 405);
  }

  const admin = createAdminClient();
  const authorization = await authorizeSyncRequest(req, admin);
  if (!authorization.authorized) {
    return jsonResponse(req, { error: "Unauthorized" }, 401);
  }

  const username = (Deno.env.get("INSTAGRAM_USERNAME") ?? "pixelmurmur")
    .replace(/^@/, "");
  let accountId: string | null = null;

  try {
    const token = requiredEnv("INSTAGRAM_ACCESS_TOKEN");
    const instagramAccountId = requiredEnv("INSTAGRAM_ACCOUNT_ID");
    const apiVersion = requiredEnv("INSTAGRAM_API_VERSION");
    const baseUrl = Deno.env.get("INSTAGRAM_GRAPH_BASE_URL") ??
      "https://graph.instagram.com";
    const mediaLimit = Math.min(
      Number(Deno.env.get("INSTAGRAM_MEDIA_LIMIT") ?? 25),
      50,
    );
    const authorizationHeader = { Authorization: `Bearer ${token}` };

    const seedAccount = await getOrCreateAccount(admin, "instagram", username);
    accountId = seedAccount.id;
    await updateSyncState(admin, accountId!, "syncing");

    const profileUrl = new URL(
      `${baseUrl}/${apiVersion}/${instagramAccountId}`,
    );
    profileUrl.searchParams.set(
      "fields",
      "id,username,followers_count,media_count,profile_picture_url",
    );
    const profile = await fetchJson<InstagramProfile>(profileUrl, {
      headers: authorizationHeader,
    });

    const account = await getOrCreateAccount(
      admin,
      "instagram",
      profile.username || username,
      {
        external_account_id: profile.id,
        profile_url: `https://www.instagram.com/${
          profile.username || username
        }/`,
        profile_image_url: profile.profile_picture_url ?? null,
        metadata: {
          media_count: profile.media_count ?? null,
          api_version: apiVersion,
        },
      },
    );
    accountId = account.id;

    let accountInsights: Record<string, unknown> = {};
    try {
      const insightsUrl = new URL(
        `${baseUrl}/${apiVersion}/${instagramAccountId}/insights`,
      );
      insightsUrl.searchParams.set(
        "metric",
        "views,reach,profile_views,follower_count",
      );
      insightsUrl.searchParams.set("period", "day");
      accountInsights = flattenInsights(
        await fetchJson<InstagramInsightsResponse>(insightsUrl, {
          headers: authorizationHeader,
        }),
      );
    } catch (error) {
      accountInsights = { unavailable: publicError(error) };
    }

    await upsertSnapshot(admin, accountId!, null, {
      followers: profile.followers_count ??
        numericValue(accountInsights.follower_count),
      views: numericValue(accountInsights.views),
      reach: numericValue(accountInsights.reach),
      profile_views: numericValue(accountInsights.profile_views),
    }, accountInsights);

    const mediaUrl = new URL(
      `${baseUrl}/${apiVersion}/${instagramAccountId}/media`,
    );
    mediaUrl.searchParams.set(
      "fields",
      "id,caption,media_type,media_product_type,media_url,thumbnail_url,permalink,timestamp,like_count,comments_count",
    );
    mediaUrl.searchParams.set("limit", String(mediaLimit));
    const mediaResponse = await fetchJson<InstagramMediaResponse>(mediaUrl, {
      headers: authorizationHeader,
    });
    const media = mediaResponse.data ?? [];
    let partialFailures = 0;

    await mapWithConcurrency(media, 4, async (item) => {
      let insights: Record<string, unknown> = {};
      try {
        const mediaInsightsUrl = new URL(
          `${baseUrl}/${apiVersion}/${item.id}/insights`,
        );
        mediaInsightsUrl.searchParams.set(
          "metric",
          "views,reach,likes,comments,shares,saved",
        );
        insights = flattenInsights(
          await fetchJson<InstagramInsightsResponse>(mediaInsightsUrl, {
            headers: authorizationHeader,
          }),
        );
      } catch (error) {
        partialFailures += 1;
        insights = { unavailable: publicError(error) };
      }

      const postId = await upsertPost(admin, {
        account_id: accountId!,
        external_post_id: item.id,
        url: item.permalink,
        caption: item.caption ?? null,
        thumbnail_url: item.thumbnail_url ?? item.media_url ?? null,
        published_at: item.timestamp,
        metadata: {
          media_type: item.media_type ?? null,
          media_product_type: item.media_product_type ?? null,
        },
      });

      await upsertSnapshot(admin, accountId!, postId, {
        views: numericValue(insights.views),
        reach: numericValue(insights.reach),
        likes: numericValue(insights.likes) ?? item.like_count ?? null,
        comments: numericValue(insights.comments) ?? item.comments_count ??
          null,
        shares: numericValue(insights.shares),
        saves: numericValue(insights.saved),
      }, insights);
    });

    const status = partialFailures > 0 ? "partial" : "success";
    const message = partialFailures > 0
      ? `${partialFailures} media insight request(s) were unavailable.`
      : null;
    await updateSyncState(admin, accountId!, status, message);

    return jsonResponse(req, {
      ok: true,
      platform: "instagram",
      source: authorization.source,
      status,
      posts: media.length,
      partialFailures,
    });
  } catch (error) {
    const message = publicError(error).slice(0, 500);
    if (accountId) await updateSyncState(admin, accountId, "error", message);
    return jsonResponse(req, {
      ok: false,
      platform: "instagram",
      error: message,
    }, 500);
  }
});
