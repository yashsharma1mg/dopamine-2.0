#!/usr/bin/env tsx
// Dopamine2.0 MCP server — lets any coding agent generate Dopamine2.0 UI by serving the
// generated registry + knowledgebase + tokens (see scripts/generate-registry.mts).
// Run: tsx packages/mcp/src/index.ts   (stdio transport)
import { readFileSync, existsSync, readdirSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { McpServer } from "@modelcontextprotocol/sdk/server/mcp.js";
import { StdioServerTransport } from "@modelcontextprotocol/sdk/server/stdio.js";
import { z } from "zod";

const REPO = join(dirname(fileURLToPath(import.meta.url)), "../../..");
const GEN = join(REPO, "packages/content/generated");
const KB = join(GEN, "knowledgebase");
const text = (t: string) => ({ content: [{ type: "text" as const, text: t }] });

type Entry = {
  slug: string; name: string; summary: string; category: string; status: string;
  prompts: string[]; variants: string[]; states: string[];
};
const registry: Entry[] = JSON.parse(readFileSync(join(GEN, "registry.json"), "utf8"));
const byKey = (q: string) => registry.find((c) => c.name.toLowerCase() === q.toLowerCase() || c.slug === q.toLowerCase());

const server = new McpServer({ name: "dopamine2-mcp", version: "0.1.0" });

server.registerTool(
  "list_components",
  { description: "List every Dopamine2.0 component with a one-line summary, category, and status." },
  async () =>
    text(
      "# Dopamine2.0 components\n\n" +
        registry.map((c) => `- **${c.name}** (${c.category}, ${c.status}) — ${c.summary}`).join("\n") +
        "\n\nCall `get_component_docs` with a name for the full prop contract, or `search_components` to find one by intent."
    )
);

server.registerTool(
  "search_components",
  {
    description: "Find the right Dopamine2.0 component(s) by intent/keywords (e.g. 'tab bar', 'otp input', 'toast').",
    inputSchema: { query: z.string().describe("What the UI needs, in plain words.") }
  },
  async ({ query }) => {
    const words = query.toLowerCase().split(/\s+/).filter(Boolean);
    const scored = registry
      .map((c) => {
        const hay = `${c.name} ${c.category} ${c.summary} ${c.prompts.join(" ")}`.toLowerCase();
        const score = words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0) + (c.prompts.some((p) => p.includes(query.toLowerCase()) || query.toLowerCase().includes(p)) ? 2 : 0);
        return { c, score };
      })
      .filter((s) => s.score > 0)
      .sort((a, b) => b.score - a.score)
      .slice(0, 8);
    if (!scored.length) return text(`No component matched "${query}". Try \`list_components\`.`);
    return text(
      `# Matches for "${query}"\n\n` +
        scored.map(({ c }) => `- **${c.name}** — ${c.summary}\n  _matches:_ ${c.prompts.slice(0, 4).join(", ")}`).join("\n") +
        "\n\nUse `get_component_docs` with the chosen name."
    );
  }
);

server.registerTool(
  "get_component_docs",
  {
    description: "Full docs for one component: real props (from TypeScript), variants/states, do/don't, accessibility, and a usage example. Read this before using a component.",
    inputSchema: { name: z.string().describe("Component name or slug, e.g. 'Snackbar' or 'snackbar'.") }
  },
  async ({ name }) => {
    const entry = byKey(name);
    if (!entry) return text(`Unknown component "${name}". Available: ${registry.map((c) => c.name).join(", ")}.`);
    return text(readFileSync(join(KB, "components", `${entry.slug}.md`), "utf8"));
  }
);

server.registerTool(
  "list_patterns",
  { description: "List composed multi-component patterns (recipes) available." },
  async () => {
    const dir = join(KB, "patterns");
    const files = existsSync(dir) ? readdirSync(dir).filter((f) => f.endsWith(".md")) : [];
    if (!files.length) return text("No patterns published yet. Compose from single components (`list_components`) for now.");
    return text("# Patterns\n\n" + files.map((f) => `- ${f.replace(/\.md$/, "")}`).join("\n") + "\n\nUse `get_pattern_docs` with a name.");
  }
);

server.registerTool(
  "get_pattern_docs",
  { description: "Full recipe for one composed pattern.", inputSchema: { name: z.string() } },
  async ({ name }) => {
    const file = join(KB, "patterns", `${name.replace(/[^a-z0-9-]/gi, "").toLowerCase()}.md`);
    if (!existsSync(file)) return text(`No pattern "${name}". Try \`list_patterns\`.`);
    return text(readFileSync(file, "utf8"));
  }
);

const GENERAL = ["install", "theming-tokens", "conventions"] as const;
server.registerTool(
  "get_general_docs",
  {
    description: "Setup and cross-cutting guidance: install, theming-tokens, conventions.",
    inputSchema: { topic: z.enum(GENERAL).describe("One of: install, theming-tokens, conventions.") }
  },
  async ({ topic }) => text(readFileSync(join(KB, "general", `${topic}.md`), "utf8"))
);

server.registerTool(
  "get_tokens",
  {
    description: "Design token values (colours, spacing, radius, typography, shadow). Optionally filter by top-level category.",
    inputSchema: { category: z.enum(["base", "semantic", "component", "space", "radius", "layout", "font", "shadow"]).optional() }
  },
  async ({ category }) => {
    const tokens = JSON.parse(readFileSync(join(REPO, "packages/tokens/tokens.json"), "utf8"));
    const data = category ? { [category]: tokens[category] } : tokens;
    return text("```json\n" + JSON.stringify(data, null, 2) + "\n```");
  }
);

server.registerTool(
  "get_agent_rules",
  { description: "Returns AGENTS.md — the rules to drop into a project so agents build with Dopamine2.0 correctly." },
  async () => text(readFileSync(join(REPO, "AGENTS.md"), "utf8"))
);

await server.connect(new StdioServerTransport());
