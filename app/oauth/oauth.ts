// Stateless OAuth 2.1 helpers for the Dopamine2.0 MCP connector.
//
// No KV/D1 is bound to the Worker, so instead of storing auth codes / access tokens we issue
// self-contained HMAC-SHA256 signed tokens (a minimal JWS). The shared MCP_TOKEN secret doubles as
// both the login password (entered on the /oauth/authorize page) and the signing key. Everything
// here runs on Web Crypto, which exists on both the Workers runtime and Node 18+.

const enc = new TextEncoder();
const dec = new TextDecoder();

function b64urlBytes(bytes: Uint8Array): string {
  let s = "";
  for (const b of bytes) s += String.fromCharCode(b);
  return btoa(s).replace(/\+/g, "-").replace(/\//g, "_").replace(/=+$/, "");
}
function bytesFromB64url(s: string): Uint8Array<ArrayBuffer> {
  s = s.replace(/-/g, "+").replace(/_/g, "/");
  while (s.length % 4) s += "=";
  const bin = atob(s);
  const out = new Uint8Array(bin.length);
  for (let i = 0; i < bin.length; i++) out[i] = bin.charCodeAt(i);
  return out;
}
const b64urlStr = (s: string) => b64urlBytes(enc.encode(s));
const strFromB64url = (s: string) => dec.decode(bytesFromB64url(s));

async function hmacKey(secret: string): Promise<CryptoKey> {
  return crypto.subtle.importKey("raw", enc.encode(secret), { name: "HMAC", hash: "SHA-256" }, false, ["sign", "verify"]);
}

/** Sign a payload into a `<base64url(json)>.<base64url(sig)>` token. */
export async function signToken(payload: Record<string, unknown>, secret: string): Promise<string> {
  const body = b64urlStr(JSON.stringify(payload));
  const sig = new Uint8Array(await crypto.subtle.sign("HMAC", await hmacKey(secret), enc.encode(body)));
  return `${body}.${b64urlBytes(sig)}`;
}

/** Verify signature + `exp`; returns the payload or null. */
export async function verifyToken(token: string, secret: string): Promise<Record<string, unknown> | null> {
  const parts = token.split(".");
  if (parts.length !== 2) return null;
  const [body, sig] = parts;
  let ok = false;
  try {
    ok = await crypto.subtle.verify("HMAC", await hmacKey(secret), bytesFromB64url(sig), enc.encode(body));
  } catch {
    return null;
  }
  if (!ok) return null;
  let payload: Record<string, unknown>;
  try {
    payload = JSON.parse(strFromB64url(body));
  } catch {
    return null;
  }
  if (typeof payload.exp === "number" && payload.exp < Math.floor(Date.now() / 1000)) return null;
  return payload;
}

/** Base64url of SHA-256(input) — the PKCE S256 transform. */
export async function sha256b64url(input: string): Promise<string> {
  const digest = new Uint8Array(await crypto.subtle.digest("SHA-256", enc.encode(input)));
  return b64urlBytes(digest);
}

export function timingSafeEqual(a: string, b: string): boolean {
  if (a.length !== b.length) return false;
  let diff = 0;
  for (let i = 0; i < a.length; i++) diff |= a.charCodeAt(i) ^ b.charCodeAt(i);
  return diff === 0;
}

export const now = () => Math.floor(Date.now() / 1000);
export const CODE_TTL = 300; // 5 min
export const TOKEN_TTL = 60 * 60 * 24 * 30; // 30 days
