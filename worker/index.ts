/** Cloudflare Worker entry point for the vinext-starter template. */
import { handleImageOptimization, DEFAULT_DEVICE_SIZES, DEFAULT_IMAGE_SIZES } from "vinext/server/image-optimization";
import handler from "vinext/server/app-router-entry";

interface Env {
  ASSETS: Fetcher;
  IMAGES: {
    input(stream: ReadableStream): {
      transform(options: Record<string, unknown>): {
        output(options: { format: string; quality: number }): Promise<{ response(): Response }>;
      };
    };
  };

  // --- Google Workspace SSO gate (restricts the whole site to one email domain) ---
  // Active when all three are set. Every request must sign in with Google and
  // carry an @<ALLOWED_EMAIL_DOMAIN> address; everyone else is blocked.
  //   npx wrangler secret put GOOGLE_CLIENT_ID     -c dist/server/wrangler.json
  //   npx wrangler secret put GOOGLE_CLIENT_SECRET -c dist/server/wrangler.json
  //   npx wrangler secret put AUTH_SECRET          -c dist/server/wrangler.json   (random 32+ chars)
  GOOGLE_CLIENT_ID?: string;
  GOOGLE_CLIENT_SECRET?: string;
  AUTH_SECRET?: string;
  ALLOWED_EMAIL_DOMAIN?: string; // defaults to "1mg.com"

  // --- Fallback shared-password gate (used only when Google SSO is NOT configured) ---
  BASIC_AUTH_USER?: string;
  BASIC_AUTH_PASS?: string;
}

interface ExecutionContext {
  waitUntil(promise: Promise<unknown>): void;
  passThroughOnException(): void;
}

type IdClaims = { iss?: string; aud?: string; exp?: number; email?: string; email_verified?: boolean; hd?: string };

const enc = new TextEncoder();
const SESSION_TTL = 60 * 60 * 8; // 8 hours
const SESSION_COOKIE = "ds_session";
const NONCE_COOKIE = "ds_oauth";
const DEFAULT_DOMAIN = "1mg.com";

// ---------- encoding / crypto helpers ----------
function b64urlEncode(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function b64urlDecode(str: string): Uint8Array {
  const s = str.replace(/-/g, "+").replace(/_/g, "/") + "===".slice((str.length + 3) % 4);
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
function safeEqual(a: string, b: string): boolean {
  const ab = enc.encode(a);
  const bb = enc.encode(b);
  if (ab.byteLength !== bb.byteLength) return false;
  let diff = 0;
  for (let i = 0; i < ab.byteLength; i++) diff |= ab[i] ^ bb[i];
  return diff === 0;
}
async function hmac(secret: string, data: string): Promise<string> {
  const key = await crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign"]);
  const sig = await crypto.subtle.sign("HMAC", key, enc.encode(data));
  return b64urlEncode(new Uint8Array(sig));
}
async function signToken(payload: object, secret: string): Promise<string> {
  const body = b64urlEncode(enc.encode(JSON.stringify(payload)));
  return `${body}.${await hmac(secret, body)}`;
}
async function verifyToken<T>(token: string, secret: string): Promise<T | null> {
  const dot = token.indexOf(".");
  if (dot < 0) return null;
  const body = token.slice(0, dot);
  const sig = token.slice(dot + 1);
  if (!safeEqual(sig, await hmac(secret, body))) return null;
  try {
    return JSON.parse(new TextDecoder().decode(b64urlDecode(body))) as T;
  } catch {
    return null;
  }
}

// ---------- cookies ----------
function getCookie(request: Request, name: string): string | null {
  const header = request.headers.get("Cookie");
  if (!header) return null;
  for (const part of header.split(";")) {
    const [k, ...v] = part.trim().split("=");
    if (k === name) return v.join("=");
  }
  return null;
}
function setCookie(name: string, value: string, maxAge: number): string {
  return [`${name}=${value}`, "Path=/", "HttpOnly", "Secure", "SameSite=Lax", `Max-Age=${maxAge}`].join("; ");
}

// ---------- Google OAuth gate ----------
function domainOf(env: Env): string {
  return env.ALLOWED_EMAIL_DOMAIN || DEFAULT_DOMAIN;
}

async function startLogin(env: Env, url: URL): Promise<Response> {
  const nonceBytes = new Uint8Array(16);
  crypto.getRandomValues(nonceBytes);
  const nonce = b64urlEncode(nonceBytes);
  const returnPath = url.pathname.startsWith("/") ? url.pathname + url.search : "/";
  const state = await signToken({ n: nonce, r: returnPath }, env.AUTH_SECRET as string);

  const auth = new URL("https://accounts.google.com/o/oauth2/v2/auth");
  auth.searchParams.set("client_id", env.GOOGLE_CLIENT_ID as string);
  auth.searchParams.set("redirect_uri", `${url.origin}/__auth/callback`);
  auth.searchParams.set("response_type", "code");
  auth.searchParams.set("scope", "openid email profile");
  auth.searchParams.set("access_type", "online");
  auth.searchParams.set("prompt", "select_account");
  auth.searchParams.set("hd", domainOf(env));
  auth.searchParams.set("state", state);

  return new Response(null, {
    status: 302,
    headers: { Location: auth.toString(), "Set-Cookie": setCookie(NONCE_COOKIE, nonce, 600) },
  });
}

function denied(message: string): Response {
  return new Response(
    `<!doctype html><meta charset="utf-8"><title>Access denied</title>` +
      `<body style="font-family:system-ui,sans-serif;max-width:32rem;margin:15vh auto;padding:0 1.5rem;color:#181a1f">` +
      `<h1 style="color:#ff5443">Access denied</h1><p>${message}</p>` +
      `<p><a style="color:#ff5443" href="/__auth/logout">Sign in with a different account</a></p></body>`,
    { status: 403, headers: { "Content-Type": "text/html; charset=utf-8" } }
  );
}

async function handleCallback(request: Request, env: Env, url: URL): Promise<Response> {
  const code = url.searchParams.get("code");
  const state = url.searchParams.get("state");
  if (!code || !state) return denied("Missing authorization response.");

  const parsed = await verifyToken<{ n: string; r: string }>(state, env.AUTH_SECRET as string);
  const nonceCookie = getCookie(request, NONCE_COOKIE);
  if (!parsed || !nonceCookie || !safeEqual(parsed.n, nonceCookie)) return denied("Invalid or expired sign-in request.");

  const tokenRes = await fetch("https://oauth2.googleapis.com/token", {
    method: "POST",
    headers: { "Content-Type": "application/x-www-form-urlencoded" },
    body: new URLSearchParams({
      code,
      client_id: env.GOOGLE_CLIENT_ID as string,
      client_secret: env.GOOGLE_CLIENT_SECRET as string,
      redirect_uri: `${url.origin}/__auth/callback`,
      grant_type: "authorization_code",
    }),
  });
  if (!tokenRes.ok) return denied("Could not verify your Google sign-in.");

  const tokens = (await tokenRes.json()) as { id_token?: string };
  if (!tokens.id_token) return denied("No identity token returned.");

  // The id_token came directly from Google's token endpoint over TLS (confidential
  // client), so we validate its claims rather than re-verifying the signature.
  const parts = tokens.id_token.split(".");
  if (parts.length !== 3) return denied("Malformed identity token.");
  let claims: IdClaims;
  try {
    claims = JSON.parse(new TextDecoder().decode(b64urlDecode(parts[1]))) as IdClaims;
  } catch {
    return denied("Malformed identity token.");
  }

  const domain = domainOf(env);
  const now = Math.floor(Date.now() / 1000);
  const email = (claims.email || "").toLowerCase();
  const issOk = claims.iss === "accounts.google.com" || claims.iss === "https://accounts.google.com";
  const audOk = claims.aud === env.GOOGLE_CLIENT_ID;
  const freshOk = typeof claims.exp === "number" && claims.exp >= now;
  if (!issOk || !audOk || !freshOk) return denied("Sign-in could not be validated.");
  if (claims.email_verified !== true || !email.endsWith(`@${domain}`) || (claims.hd && claims.hd !== domain)) {
    return denied(`Your account (${email || "unknown"}) is not a @${domain} address.`);
  }

  const session = await signToken({ email, exp: now + SESSION_TTL }, env.AUTH_SECRET as string);
  const dest = parsed.r && parsed.r.startsWith("/") ? parsed.r : "/";
  const headers = new Headers({ Location: dest });
  headers.append("Set-Cookie", setCookie(SESSION_COOKIE, session, SESSION_TTL));
  headers.append("Set-Cookie", setCookie(NONCE_COOKIE, "", 0));
  return new Response(null, { status: 302, headers });
}

function handleLogout(): Response {
  return new Response(null, { status: 302, headers: { Location: "/", "Set-Cookie": setCookie(SESSION_COOKIE, "", 0) } });
}

async function currentUser(request: Request, env: Env): Promise<string | null> {
  const cookie = getCookie(request, SESSION_COOKIE);
  if (!cookie) return null;
  const payload = await verifyToken<{ email: string; exp: number }>(cookie, env.AUTH_SECRET as string);
  if (!payload || typeof payload.exp !== "number" || payload.exp < Math.floor(Date.now() / 1000)) return null;
  if (typeof payload.email !== "string" || !payload.email.endsWith(`@${domainOf(env)}`)) return null;
  return payload.email;
}

// ---------- fallback shared-password gate ----------
function isBasicAuthorized(request: Request, user: string, pass: string): boolean {
  const header = request.headers.get("Authorization");
  if (!header || !header.startsWith("Basic ")) return false;
  let decoded: string;
  try {
    decoded = atob(header.slice(6).trim());
  } catch {
    return false;
  }
  const sep = decoded.indexOf(":");
  if (sep < 0) return false;
  const userOk = safeEqual(decoded.slice(0, sep), user);
  const passOk = safeEqual(decoded.slice(sep + 1), pass);
  return userOk && passOk;
}
const basicChallenge = () =>
  new Response("Authentication required.", {
    status: 401,
    headers: { "WWW-Authenticate": 'Basic realm="Dopamine 2.0", charset="UTF-8"' },
  });

const worker = {
  async fetch(request: Request, env: Env, ctx: ExecutionContext): Promise<Response> {
    const url = new URL(request.url);
    const googleOn = !!(env.GOOGLE_CLIENT_ID && env.GOOGLE_CLIENT_SECRET && env.AUTH_SECRET);

    if (googleOn) {
      if (url.pathname === "/__auth/callback") return handleCallback(request, env, url);
      if (url.pathname === "/__auth/logout") return handleLogout();
      const user = await currentUser(request, env);
      if (!user) return startLogin(env, url);
    } else if (env.BASIC_AUTH_USER && env.BASIC_AUTH_PASS) {
      if (!isBasicAuthorized(request, env.BASIC_AUTH_USER, env.BASIC_AUTH_PASS)) return basicChallenge();
    }

    if (url.pathname === "/_vinext/image") {
      const allowedWidths = [...DEFAULT_DEVICE_SIZES, ...DEFAULT_IMAGE_SIZES];
      return handleImageOptimization(request, {
        fetchAsset: (path) => env.ASSETS.fetch(new Request(new URL(path, request.url))),
        transformImage: async (body, { width, format, quality }) => {
          const result = await env.IMAGES.input(body).transform(width > 0 ? { width } : {}).output({ format, quality });
          return result.response();
        },
      }, allowedWidths);
    }

    return handler.fetch(request, env, ctx);
  },
};

export default worker;
