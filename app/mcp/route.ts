// Remote Dopamine2.0 MCP endpoint (/mcp) — a stateless JSON-RPC 2.0 handler over HTTP POST,
// sharing the exact tool logic with the stdio server via packages/mcp/src/tools.ts. Add it to
// claude.ai web / Claude Desktop / Claude Code as a Connector URL. Gated by a bearer token
// (Worker secret MCP_TOKEN) since the design system is private.
import { TOOL_DEFS, createHandlers } from "@/packages/mcp/src/tools";
import { data } from "./data.edge";

const handlers = createHandlers(data);
const PROTOCOL_VERSION = "2024-11-05";

const rpc = (id: unknown, result: unknown) => ({ jsonrpc: "2.0", id, result });
const rpcError = (id: unknown, code: number, message: string) => ({ jsonrpc: "2.0", id, error: { code, message } });

function authorized(request: Request): boolean {
  const token = process.env.MCP_TOKEN;
  if (!token) return false; // secure by default — deny until the secret is configured
  const header = request.headers.get("authorization") ?? "";
  const match = header.match(/^Bearer\s+(.+)$/i);
  if (!match) return false;
  const provided = match[1];
  if (provided.length !== token.length) return false;
  let diff = 0;
  for (let i = 0; i < token.length; i++) diff |= provided.charCodeAt(i) ^ token.charCodeAt(i);
  return diff === 0;
}

export async function GET() {
  return new Response(
    "Dopamine2.0 MCP endpoint. POST JSON-RPC 2.0 (initialize / tools/list / tools/call) with header `Authorization: Bearer <MCP_TOKEN>`. Add this URL as a custom connector in Claude.",
    { status: 200, headers: { "content-type": "text/plain; charset=utf-8" } }
  );
}

export async function POST(request: Request) {
  if (!authorized(request)) {
    const configured = Boolean(process.env.MCP_TOKEN);
    return Response.json(rpcError(null, -32001, configured ? "Unauthorized." : "Endpoint not configured: set the MCP_TOKEN Worker secret."), {
      status: configured ? 401 : 503
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
