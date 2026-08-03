#!/usr/bin/env node
// Dopamine2.0 MCP — stdio server. Serves the generated registry + knowledgebase + tokens +
// prerendered previews so any agent can discover, document, and preview Dopamine2.0 UI.
// Tool logic is shared with the edge HTTP route (app/mcp/route.ts) via ./tools.js.
import { Server } from "@modelcontextprotocol/sdk/server/index.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { CallToolRequestSchema, ListToolsRequestSchema } from "@modelcontextprotocol/sdk/types.js";
import { TOOL_DEFS, createHandlers, type McpData } from "./tools.js";
import { loadData } from "./data.node.js";

let data: McpData;
try {
  data = loadData();
} catch (e) {
  // Never crash at startup — degrade to an explanatory error so the client still connects.
  const msg = `Dopamine2.0 MCP data is missing. Rebuild with \`npm run build\` or reinstall the package.\n${String(e)}`;
  data = { registry: [], componentDocs: {}, patternDocs: {}, generalDocs: {}, tokens: {}, agentRules: msg, previews: {}, patternPreviews: {} };
  process.stderr.write(msg + "\n");
}

const handlers = createHandlers(data);
const server = new Server({ name: "dopamine2-mcp", version: "0.2.0" }, { capabilities: { tools: {} } });

server.setRequestHandler(ListToolsRequestSchema, async () => ({ tools: TOOL_DEFS }));
server.setRequestHandler(CallToolRequestSchema, async (req) => {
  const handler = handlers[req.params.name];
  if (!handler) return { content: [{ type: "text" as const, text: `Unknown tool "${req.params.name}".` }], isError: true };
  return handler(req.params.arguments ?? {});
});

await server.connect(new StdioServerTransport());
