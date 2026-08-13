// vinext ignores dot-prefixed app/ folders, so the OAuth discovery documents (which live at the
// spec-fixed /.well-known/* paths) can't be App Router routes. Middleware runs before routing and
// a Response returned here is sent directly — so we serve the two metadata docs from here. Origin
// is read from the request, so this works on workers.dev or any custom domain. Everything else
// falls through (return nothing) to normal routing.
const cors = { "access-control-allow-origin": "*" };

export function proxy(request: Request): Response | undefined {
  const { pathname, origin } = new URL(request.url);

  if (pathname === "/.well-known/oauth-authorization-server") {
    return Response.json(
      {
        issuer: origin,
        authorization_endpoint: `${origin}/oauth/authorize`,
        token_endpoint: `${origin}/oauth/token`,
        registration_endpoint: `${origin}/oauth/register`,
        response_types_supported: ["code"],
        grant_types_supported: ["authorization_code"],
        code_challenge_methods_supported: ["S256"],
        token_endpoint_auth_methods_supported: ["none"],
        scopes_supported: ["mcp"]
      },
      { headers: cors }
    );
  }

  if (pathname === "/.well-known/oauth-protected-resource" || pathname === "/.well-known/oauth-protected-resource/mcp") {
    return Response.json(
      {
        resource: `${origin}/mcp`,
        authorization_servers: [origin],
        bearer_methods_supported: ["header"],
        scopes_supported: ["mcp"]
      },
      { headers: cors }
    );
  }

  return undefined; // fall through to normal routing
}
