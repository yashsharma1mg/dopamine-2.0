// Remote Dopamine2.0 MCP endpoint (/mcp) — a stateless JSON-RPC 2.0 handler over HTTP POST,
// sharing the exact tool logic with the stdio server via packages/mcp/src/tools.ts. Add it to
// claude.ai web / Claude Desktop / Claude Code as a Connector URL. Gated by a bearer token
// (Worker secret MCP_TOKEN) since the design system is private.
import { TOOL_DEFS, createHandlers } from "@/packages/mcp/src/tools";
import { verifyToken, timingSafeEqual } from "@/app/oauth/oauth";
import { data } from "./data.edge";

const handlers = createHandlers(data);
const PROTOCOL_VERSION = "2024-11-05";

const rpc = (id: unknown, result: unknown) => ({ jsonrpc: "2.0", id, result });
const rpcError = (id: unknown, code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } });

// Accept either the raw MCP_TOKEN (Claude Desktop/Code/curl paste it directly) or an OAuth access
// token minted by /oauth/token (claude.ai web, which only speaks OAuth). Both are validated
// against the same MCP_TOKEN secret.
async function authorized(request: Request): Promise<boolean> {
  const token = process.env.MCP_TOKEN;
  if (!token) return false; // secure by default — deny until the secret is configured
  const match = (request.headers.get("authorization") ?? "").match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  const provided = match[1];
  if (timingSafeEqual(provided, token)) return true;
  const payload = await verifyToken(provided, token);
  return payload?.t === "access";
}

const cors = { "access-control-allow-origin": "*", "access-control-allow-methods": "POST, GET, OPTIONS", "access-control-allow-headers": "authorization, content-type", "access-control-expose-headers": "WWW-Authenticate" };

export function OPTIONS() {
  return new Response(null, { status: 204, headers: cors });
}

export async function GET() {
  return new Response(
    "Dopamine2.0 MCP endpoint. Add this URL as a custom connector in Claude (claude.ai web authorizes via OAuth; Desktop/Code can send Authorization: Bearer <MCP_TOKEN>). POST JSON-RPC 2.0: initialize / tools/list / tools/call.",
    { status: 200, headers: { "content-type": "text/plain; charset=utf-8", ...cors } }
  );
}

export async function POST(request: Request) {
  if (!(await authorized(request))) {
    const configured = Boolean(process.env.MCP_TOKEN);
    if (!configured) {
      return Response.json(rpcError(null, -32001, "Endpoint not configured: set the MCP_TOKEN Worker secret."), { status: 503 });
    }
    // Point unauthenticated clients at the OAuth flow (claude.ai web reads this header to discover it).
    const origin = new URL(request.url).origin;
    return Response.json(rpcError(null, -32001, "Unauthorized."), {
      status: 401,
      headers: { ...cors, "WWW-Authenticate": `Bearer resource_metadata="${origin}/.well-known/oauth-protected-resource"` }
    });
  }

  let msg: { id?: unknown; method?: string; params?: { name?: string; arguments?: Record<string, unknown> } };
  try {
    msg = await request.json();
  } catch {
    return Response.json(rpcError(null, -32700, "Parse error"), { status: 400 });
  }

  const id = msg.id ?? null;
  const method = msg.method;
  try {
    switch (method) {
      case "initialize":
        return Response.json(rpc(id, { protocolVersion: PROTOCOL_VERSION, capabilities: { tools: {} }, serverInfo: { name: "dopamine2-mcp", version: "0.2.0" } }));
      case "notifications/initialized":
      case "initialized":
        return new Response(null, { status: 202 }); // notification — no response body
      case "ping":
        return Response.json(rpc(id, {}));
      case "tools/list":
        return Response.json(rpc(id, { tools: TOOL_DEFS }));
      case "tools/call": {
        const name = msg.params?.name ?? "";
        const handler = handlers[name];
        if (!handler) return Response.json(rpc(id, { content: [{ type: "text", text: `Unknown tool "${name}".` }], isError: true }));
        return Response.json(rpc(id, handler(msg.params?.arguments ?? {})));
      }
      default:
        return Response.json(rpcError(id, -32601, `Method not found: ${method}`));
    }
  } catch (e) {
    return Response.json(rpcError(id, -32603, `Internal error: ${String(e)}`));
  }
}
