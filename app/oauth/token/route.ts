// OAuth token endpoint. Exchanges a PKCE-bound authorization code for a signed access token.
// Stateless: the code carries its own challenge + redirect_uri, verified against the code_verifier.
import { signToken, verifyToken, sha256b64url, now, TOKEN_TTL } from "../oauth";

const cors = { "access-control-allow-origin": "*" };
const headers = { ...cors, "cache-control": "no-store", "content-type": "application/json" };

export function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...cors, "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "*" } });
}

function oauthError(error: string, status = 400): Response {
  return new Response(JSON.stringify({ error }), { status, headers });
}

export async function POST(request: Request) {
  const secret = process.env.MCP_TOKEN;
  if (!secret) return oauthError("temporarily_unavailable", 503);

  const form = await request.formData();
  const g = (k: string) => String((form.get(k) as string) ?? "");

  if (g("grant_type") !== "authorization_code") return oauthError("unsupported_grant_type");

  const payload = await verifyToken(g("code"), secret);
  if (!payload || payload.t !== "code") return oauthError("invalid_grant");
  if (payload.ru !== g("redirect_uri")) return oauthError("invalid_grant");

  const verifier = g("code_verifier");
  if (!verifier || (await sha256b64url(verifier)) !== payload.cc) return oauthError("invalid_grant");

  const access_token = await signToken({ t: "access", exp: now() + TOKEN_TTL }, secret);
  return new Response(JSON.stringify({ access_token, token_type: "Bearer", expires_in: TOKEN_TTL, scope: "mcp" }), { headers });
}
