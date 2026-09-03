import {
  createClient,
  type SupabaseClient,
} from "npm:@supabase/supabase-js@2.112.4";

function firstKeyFromJson(name: string) {
  const raw = Deno.env.get(name);
  if (!raw) return null;

  try {
    const parsed = JSON.parse(raw) as Record<string, unknown>;
    return Object.values(parsed).find((value): value is string =>
      typeof value === "string"
    ) ?? null;
  } catch {
    return null;
  }
}

function requiredSecret(...names: string[]) {
  for (const name of names) {
    const direct = Deno.env.get(name);
    if (direct) return direct;
    const fromJson = firstKeyFromJson(name);
    if (fromJson) return fromJson;
  }

  throw new Error(`Missing required Supabase secret: ${names.join(" or ")}`);
}

export function createAdminClient() {
  const url = requiredSecret("SUPABASE_URL");
  const secretKey = requiredSecret(
    "SUPABASE_SERVICE_ROLE_KEY",
    "SUPABASE_SECRET_KEYS",
  );

  return createClient(url, secretKey, {
    auth: {
      autoRefreshToken: false,
      persistSession: false,
    },
  });
}

export async function authorizeSyncRequest(
  req: Request,
  admin: SupabaseClient,
) {
  const configuredCronSecret = Deno.env.get("SYNC_CRON_SECRET");
  const requestCronSecret = req.headers.get("x-sync-secret");

  if (
    configuredCronSecret &&
    requestCronSecret &&
    requestCronSecret.length === configuredCronSecret.length &&
    requestCronSecret === configuredCronSecret
  ) {
    return { authorized: true, source: "cron" as const, userId: null };
  }

  const authorization = req.headers.get("authorization");
  const token = authorization?.match(/^Bearer\s+(.+)$/i)?.[1];
  if (!token) return { authorized: false, source: null, userId: null };

  const { data, error } = await admin.auth.getUser(token);
  const configuredAdminEmail = (
    Deno.env.get("ADMIN_EMAIL") ?? "pixelmurmurlab@gmail.com"
  ).trim().toLowerCase();
  const userEmail = data.user?.email?.trim().toLowerCase();
  const isAdmin = data.user?.app_metadata?.role === "admin" ||
    Boolean(configuredAdminEmail && userEmail === configuredAdminEmail);

  if (error || !isAdmin) {
    return { authorized: false, source: null, userId: data.user?.id ?? null };
  }

  return { authorized: true, source: "manual" as const, userId: data.user.id };
}
