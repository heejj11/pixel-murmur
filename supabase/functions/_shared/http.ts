export type JsonRecord = Record<string, unknown>;

const defaultAllowedOrigins = [
  "https://pixelmurmur.com",
  "https://www.pixelmurmur.com",
  "http://127.0.0.1:5173",
  "http://localhost:5173",
];

export function corsHeaders(req: Request) {
  const configured = (Deno.env.get("ADMIN_ALLOWED_ORIGINS") ?? "")
    .split(",")
    .map((origin) => origin.trim())
    .filter(Boolean);
  const allowedOrigins = configured.length > 0
    ? configured
    : defaultAllowedOrigins;
  const requestOrigin = req.headers.get("origin");
  const allowedOrigin = requestOrigin && allowedOrigins.includes(requestOrigin)
    ? requestOrigin
    : allowedOrigins[0];

  return {
    "Access-Control-Allow-Origin": allowedOrigin,
    "Access-Control-Allow-Headers":
      "authorization, x-client-info, apikey, content-type, x-sync-secret",
    "Access-Control-Allow-Methods": "POST, OPTIONS",
    "Access-Control-Max-Age": "86400",
    "Vary": "Origin",
  };
}

export function jsonResponse(req: Request, body: JsonRecord, status = 200) {
  return Response.json(body, {
    status,
    headers: corsHeaders(req),
  });
}

export class ExternalApiError extends Error {
  status: number;
  payload: unknown;

  constructor(message: string, status: number, payload: unknown) {
    super(message);
    this.name = "ExternalApiError";
    this.status = status;
    this.payload = payload;
  }
}

export async function fetchJson<T>(
  url: URL | string,
  init?: RequestInit,
): Promise<T> {
  const response = await fetch(url, init);
  const raw = await response.text();
  let payload: unknown = null;

  if (raw) {
    try {
      payload = JSON.parse(raw);
    } catch {
      payload = raw;
    }
  }

  if (!response.ok) {
    throw new ExternalApiError(
      `External API request failed with ${response.status}`,
      response.status,
      payload,
    );
  }

  return payload as T;
}

export function publicError(error: unknown) {
  if (error instanceof ExternalApiError) {
    return `Platform API returned ${error.status}. Check the account permissions and token.`;
  }

  if (error instanceof Error) return error.message;
  return "Unknown synchronization error";
}
