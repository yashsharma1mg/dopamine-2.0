// OAuth authorization endpoint. GET shows a password gate; POST checks the shared access key
// (MCP_TOKEN) and, if correct, mints a short-lived PKCE-bound authorization code (a signed token,
// nothing stored) and redirects back to the client.
import { signToken, timingSafeEqual, now, CODE_TTL } from "../oauth";

type Params = {
  response_type: string;
  redirect_uri: string;
  code_challenge: string;
  code_challenge_method: string;
  state: string;
  scope: string;
  client_id: string;
};

function esc(s: string): string {
  return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;").replace(/"/g, "&quot;");
}

function read(sp: URLSearchParams | FormData): Params {
  const g = (k: string) => String((sp.get(k) as string) ?? "");
  return {
    response_type: g("response_type"),
    redirect_uri: g("redirect_uri"),
    code_challenge: g("code_challenge"),
    code_challenge_method: g("code_challenge_method") || "S256",
    state: g("state"),
    scope: g("scope"),
    client_id: g("client_id")
  };
}

function invalid(msg: string): Response {
  return new Response(msg, { status: 400, headers: { "content-type": "text/plain; charset=utf-8" } });
}

function formHtml(p: Params, error: string): string {
  const hidden = (["response_type", "redirect_uri", "code_challenge", "code_challenge_method", "state", "scope", "client_id"] as const)
    .map((k) => `<input type="hidden" name="${k}" value="${esc(p[k])}">`)
    .join("");
  return `<!doctype html><html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width, initial-scale=1">
<title>Connect Dopamine 2.0</title><style>
:root{color-scheme:light dark}
*{box-sizing:border-box}
body{margin:0;min-height:100vh;display:grid;place-items:center;background:#0d0f13;color:#e9edf5;font:15px/1.5 system-ui,-apple-system,Segoe UI,Roboto,sans-serif}
.card{width:min(92vw,380px);background:#161a21;border:1px solid #242a34;border-radius:16px;padding:28px 26px}
h1{margin:0 0 4px;font-size:19px}
p{margin:0 0 20px;color:#9aa4b2;font-size:13px}
label{display:block;font-size:12px;font-weight:600;color:#c3cbd7;margin:0 0 6px}
input[type=password]{width:100%;padding:11px 12px;border-radius:10px;border:1px solid #2c333f;background:#0f1319;color:#fff;font-size:15px}
input[type=password]:focus{outline:none;border-color:#7c8cff}
button{margin-top:16px;width:100%;padding:11px;border:0;border-radius:10px;background:#6470ff;color:#fff;font-size:15px;font-weight:600;cursor:pointer}
button:hover{background:#5561f0}
.err{color:#ff8080;font-size:13px;margin:10px 0 0}
.brand{font-size:12px;color:#6b7280;margin-top:18px;text-align:center}
</style></head><body>
<form class="card" method="post" action="/oauth/authorize">
<h1>Connect Dopamine 2.0</h1>
<p>Enter the access key to link this design-system MCP to Claude.</p>
<label for="pw">Access key</label>
<input id="pw" name="password" type="password" autocomplete="current-password" autofocus required>
${error ? `<div class="err">${esc(error)}</div>` : ""}
${hidden}
<button type="submit">Authorize</button>
<div class="brand">Tata 1mg · private component library</div>
</form></body></html>`;
}

export function GET(request: Request) {
  const p = read(new URL(request.url).searchParams);
  if (p.response_type !== "code") return invalid("unsupported_response_type");
  if (!p.redirect_uri || !p.code_challenge) return invalid("invalid_request: missing redirect_uri or code_challenge");
  if (p.code_challenge_method !== "S256") return invalid("invalid_request: only S256 PKCE is supported");
  return new Response(formHtml(p, ""), { headers: { "content-type": "text/html; charset=utf-8" } });
}

export async function POST(request: Request) {
  const form = await request.formData();
  const p = read(form);
  const password = String((form.get("password") as string) ?? "");

  const secret = process.env.MCP_TOKEN;
  if (!secret) return new Response("Server not configured: MCP_TOKEN secret is unset.", { status: 503 });
  if (!p.redirect_uri || !p.code_challenge || p.code_challenge_method !== "S256") return invalid("invalid_request");

  if (!timingSafeEqual(password, secret)) {
    return new Response(formHtml(p, "Incorrect access key."), { status: 401, headers: { "content-type": "text/html; charset=utf-8" } });
  }

  const code = await signToken({ t: "code", cc: p.code_challenge, ru: p.redirect_uri, exp: now() + CODE_TTL }, secret);
  const back = new URL(p.redirect_uri);
  back.searchParams.set("code", code);
  if (p.state) back.searchParams.set("state", p.state);
  return Response.redirect(back.toString(), 302);
}
