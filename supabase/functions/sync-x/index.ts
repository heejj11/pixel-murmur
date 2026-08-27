import {
  authorizeSyncRequest,
  createAdminClient,
} from "../_shared/supabase.ts";
import { fetchJson, jsonResponse, publicError } from "../_shared/http.ts";
import {
  getOrCreateAccount,
  updateSyncState,
  upsertPost,
  upsertSnapshot,
} from "../_shared/sync.ts";

type XPublicMetrics = {
  followers_count?: number;
  following_count?: number;
  tweet_count?: number;
  listed_count?: number;
  retweet_count?: number;
  reply_count?: number;
  like_count?: number;
  quote_count?: number;
  bookmark_count?: number;
  impression_count?: number;
  view_count?: number;
};

type XPrivateMetrics = {
  impression_count?: number;
  url_link_clicks?: number;
  user_profile_clicks?: number;
  engagements?: number;
};

type XUser = {
  id: string;
  username: string;
  profile_image_url?: string;
  public_metrics?: XPublicMetrics;
};

type XPost = {
  id: string;
  text: string;
  created_at: string;
  public_metrics?: XPublicMetrics;
  non_public_metrics?: XPrivateMetrics;
  organic_metrics?: XPrivateMetrics & XPublicMetrics;
  attachments?: { media_keys?: string[] };
};

type XMedia = {
  media_key: string;
  type?: string;
  url?: string;
  preview_image_url?: string;
  public_metrics?: XPublicMetrics;
  non_public_metrics?: XPrivateMetrics;
};

type XUserResponse = { data: XUser };
type XTimelineResponse = { data?: XPost[]; includes?: { media?: XMedia[] } };

function requiredEnv(name: string) {
  const value = Deno.env.get(name);
  if (!value) throw new Error(`Missing Edge Function secret: ${name}`);
  return value;
}

function sum(values: Array<number | undefined>) {
  const present = values.filter((value): value is number =>
    typeof value === "number"
  );
  return present.length > 0
    ? present.reduce((total, value) => total + value, 0)
    : null;
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

  const username = (Deno.env.get("X_USERNAME") ?? "pixelmurmur").replace(
    /^@/,
    "",
  );
  let accountId: string | null = null;

  try {
    const publicToken = requiredEnv("X_BEARER_TOKEN");
    const userAccessToken = Deno.env.get("X_USER_ACCESS_TOKEN");
    const token = userAccessToken ?? publicToken;
    const requestPrivateMetrics = Boolean(userAccessToken);
    const authorizationHeader = { Authorization: `Bearer ${token}` };

    const seedAccount = await getOrCreateAccount(admin, "x", username);
    accountId = seedAccount.id;
    await updateSyncState(admin, accountId!, "syncing");

    const userUrl = new URL(
      `https://api.x.com/2/users/by/username/${encodeURIComponent(username)}`,
    );
    userUrl.searchParams.set("user.fields", "profile_image_url,public_metrics");
    const userResponse = await fetchJson<XUserResponse>(userUrl, {
      headers: authorizationHeader,
    });
    const user = userResponse.data;

    const account = await getOrCreateAccount(
      admin,
      "x",
      user.username || username,
      {
        external_account_id: user.id,
        profile_url: `https://x.com/${user.username || username}`,
        profile_image_url: user.profile_image_url ?? null,
        metadata: {
          following_count: user.public_metrics?.following_count ?? null,
          post_count: user.public_metrics?.tweet_count ?? null,
          listed_count: user.public_metrics?.listed_count ?? null,
          private_metrics_enabled: requestPrivateMetrics,
        },
      },
    );
    accountId = account.id;

    await upsertSnapshot(admin, accountId!, null, {
      followers: user.public_metrics?.followers_count ?? null,
    }, user.public_metrics ?? {});

    const timelineUrl = new URL(`https://api.x.com/2/users/${user.id}/tweets`);
    const postFields = ["created_at", "public_metrics", "attachments"];
    const mediaFields = ["type", "url", "preview_image_url", "public_metrics"];

    if (requestPrivateMetrics) {
      postFields.push("non_public_metrics", "organic_metrics");
      mediaFields.push("non_public_metrics", "organic_metrics");
    }

    timelineUrl.searchParams.set("max_results", "100");
    timelineUrl.searchParams.set("exclude", "retweets,replies");
    timelineUrl.searchParams.set("tweet.fields", postFields.join(","));
    timelineUrl.searchParams.set("expansions", "attachments.media_keys");
    timelineUrl.searchParams.set("media.fields", mediaFields.join(","));

    const timeline = await fetchJson<XTimelineResponse>(timelineUrl, {
      headers: authorizationHeader,
    });
    const mediaByKey = new Map(
      (timeline.includes?.media ?? []).map((media) => [media.media_key, media]),
    );

    for (const post of timeline.data ?? []) {
      const media = (post.attachments?.media_keys ?? [])
        .map((key) => mediaByKey.get(key))
        .filter((item): item is XMedia => Boolean(item));
      const publicMetrics = post.public_metrics ?? {};
      const privateMetrics = post.non_public_metrics ?? post.organic_metrics ??
        {};
      const mediaViews = sum(
        media.map((item) => item.public_metrics?.view_count),
      );
      const mediaPrivate = media.map((item) => item.non_public_metrics ?? {});

      const postId = await upsertPost(admin, {
        account_id: accountId!,
        external_post_id: post.id,
        url: `https://x.com/${user.username || username}/status/${post.id}`,
        caption: post.text,
        thumbnail_url: media[0]?.preview_image_url ?? media[0]?.url ?? null,
        published_at: post.created_at,
        metadata: {
          media_types: media.map((item) => item.type ?? "unknown"),
        },
      });

      await upsertSnapshot(admin, accountId!, postId, {
        views: mediaViews,
        impressions: publicMetrics.impression_count ??
          privateMetrics.impression_count ??
          null,
        likes: publicMetrics.like_count ?? null,
        comments: publicMetrics.reply_count ?? null,
        shares: sum([
          publicMetrics.retweet_count,
          publicMetrics.quote_count,
        ]),
        saves: publicMetrics.bookmark_count ?? null,
        profile_views: privateMetrics.user_profile_clicks ?? null,
        link_clicks: privateMetrics.url_link_clicks ?? null,
      }, {
        public_metrics: publicMetrics,
        non_public_metrics: post.non_public_metrics ?? null,
        organic_metrics: post.organic_metrics ?? null,
        media_metrics: media.map((item, index) => ({
          public: item.public_metrics ?? null,
          private: mediaPrivate[index] ?? null,
        })),
      });
    }

    await updateSyncState(admin, accountId!, "success");

    return jsonResponse(req, {
      ok: true,
      platform: "x",
      source: authorization.source,
      status: "success",
      posts: timeline.data?.length ?? 0,
      privateMetrics: requestPrivateMetrics,
    });
  } catch (error) {
    const message = publicError(error).slice(0, 500);
    if (accountId) await updateSyncState(admin, accountId, "error", message);
    return jsonResponse(req, { ok: false, platform: "x", error: message }, 500);
  }
});
