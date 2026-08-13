// RFC 7591 Dynamic Client Registration. Stateless: we don't persist clients — the connector is a
// public client secured by PKCE, so we accept the registration and echo back a fixed client_id.
import { now } from "../oauth";

const cors = { "access-control-allow-origin": "*" };

export function OPTIONS() {
  return new Response(null, { status: 204, headers: { ...cors, "access-control-allow-methods": "POST, OPTIONS", "access-control-allow-headers": "*" } });
}

export async function POST(request: Request) {
  let body: Record<string, unknown> = {};
  try {
    body = await request.json();
  } catch {
    /* empty registration body is fine */
  }
  return Response.json(
    {
      client_id: "dopamine2-mcp",
      client_id_issued_at: now(),
      token_endpoint_auth_method: "none",
      grant_types: ["authorization_code"],
      response_types: ["code"],
      redirect_uris: Array.isArray(body.redirect_uris) ? body.redirect_uris : [],
      ...(typeof body.client_name === "string" ? { client_name: body.client_name } : {})
    },
    { status: 201, headers: cors }
  );
}
