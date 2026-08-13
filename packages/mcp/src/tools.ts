// Pure Dopamine2.0 MCP tool logic — no fs, no transport, no SDK import. Both shells consume this:
// the stdio server (src/index.ts) and the edge HTTP route (app/mcp/route.ts). Each shell supplies
// the data (bundled files for Node, Vite-globbed strings for the edge) via `McpData`.

export type Entry = {
  slug: string;
  name: string;
  summary: string;
  category: string;
  status: string;
  storyId?: string;
  prompts: string[];
  variants: string[];
  states: string[];
};

export type McpData = {
  registry: Entry[];
  componentDocs: Record<string, string>; // slug -> markdown
  patternDocs: Record<string, string>; // pattern name -> markdown
  generalDocs: Record<string, string>; // topic -> markdown
  tokens: Record<string, unknown>; // parsed tokens.json
  agentRules: string; // AGENTS.md
  previews: Record<string, string>; // component slug -> self-contained HTML
  patternPreviews: Record<string, string>; // pattern name -> self-contained HTML
};

export type ToolResult = { content: { type: "text"; text: string }[]; isError?: boolean };
export type ToolDef = { name: string; description: string; inputSchema: Record<string, unknown> };

const text = (t: string): ToolResult => ({ content: [{ type: "text", text: t }] });
const err = (t: string): ToolResult => ({ content: [{ type: "text", text: t }], isError: true });
const noArgs = { type: "object", properties: {}, additionalProperties: false };

// Deployed origin so preview "View live" links and the bundled previews' asset/storybook URLs
// resolve from claude.ai web — relative paths are dead once the preview leaves this origin.
// Override via MCP_SITE_URL if the domain changes.
const SITE_URL = (typeof process !== "undefined" && process.env?.MCP_SITE_URL) || "https://dopamine2-0.dopamine-ds.workers.dev";
const absolutize = (html: string): string => html.replace(/(src|href)="\/(assets|storybook)\//g, `$1="${SITE_URL}/$2/`);

export const GENERAL_TOPICS = ["install", "theming-tokens", "conventions"] as const;
const TOKEN_CATEGORIES = ["base", "semantic", "component", "space", "radius", "layout", "font", "shadow"] as const;

export const TOOL_DEFS: ToolDef[] = [
  { name: "list_components", description: "List every Dopamine2.0 component with a one-line summary, category, and status.", inputSchema: noArgs },
  {
    name: "search_components",
    description: "Find the right Dopamine2.0 component(s) by intent/keywords (e.g. 'tab bar', 'otp input', 'toast').",
    inputSchema: { type: "object", properties: { query: { type: "string", description: "What the UI needs, in plain words." } }, required: ["query"], additionalProperties: false }
  },
  {
    name: "get_component_docs",
    description: "Full docs for one component: real props (from TypeScript), variants/states, do/don't, accessibility, and a usage example. Read this before using a component.",
    inputSchema: { type: "object", properties: { name: { type: "string", description: "Component name or slug, e.g. 'Snackbar' or 'snackbar'." } }, required: ["name"], additionalProperties: false }
  },
  { name: "list_patterns", description: "List composed multi-component patterns (recipes) available.", inputSchema: noArgs },
  { name: "get_pattern_docs", description: "Full recipe for one composed pattern.", inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"], additionalProperties: false } },
  {
    name: "get_general_docs",
    description: "Setup and cross-cutting guidance: install, theming-tokens, conventions.",
    inputSchema: { type: "object", properties: { topic: { type: "string", enum: [...GENERAL_TOPICS] } }, required: ["topic"], additionalProperties: false }
  },
  {
    name: "get_tokens",
    description: "Design token values (colours, spacing, radius, typography, shadow). Optionally filter by top-level category.",
    inputSchema: { type: "object", properties: { category: { type: "string", enum: [...TOKEN_CATEGORIES] } }, additionalProperties: false }
  },
  { name: "get_agent_rules", description: "Returns AGENTS.md — the rules to drop into a project so agents build with Dopamine2.0 correctly.", inputSchema: noArgs },
  {
    name: "preview_component",
    description: "Render a self-contained HTML preview (every Figma variant) of one component, to view it in-chat as an artifact rather than only reading code.",
    inputSchema: { type: "object", properties: { name: { type: "string", description: "Component name or slug." } }, required: ["name"], additionalProperties: false }
  },
  {
    name: "preview_pattern",
    description: "Render a self-contained HTML preview of a composed pattern (e.g. cart-checkout) to view it in-chat as an artifact.",
    inputSchema: { type: "object", properties: { name: { type: "string" } }, required: ["name"], additionalProperties: false }
  }
];

const galleryStoryId = (e: Entry) => (e.storyId ? e.storyId.replace(/--.*$/, "--figma-variants") : undefined);
const slugify = (s: string) => s.replace(/[^a-z0-9-]/gi, "").toLowerCase();

export type Handler = (args: Record<string, unknown>) => ToolResult;

export function createHandlers(data: McpData): Record<string, Handler> {
  const { registry } = data;
  const byKey = (q: string) => registry.find((c) => c.name.toLowerCase() === q.toLowerCase() || c.slug === q.toLowerCase());

  return {
    list_components: () =>
      text(
        "# Dopamine2.0 components\n\n" +
          registry.map((c) => `- **${c.name}** (${c.category}, ${c.status}) — ${c.summary}`).join("\n") +
          "\n\nCall `get_component_docs` with a name for the full prop contract, `preview_component` to see it rendered, or `search_components` to find one by intent."
      ),

    search_components: (args) => {
      const query = String(args.query ?? "");
      const q = query.toLowerCase();
      const words = q.split(/\s+/).filter(Boolean);
      const scored = registry
        .map((c) => {
          const hay = `${c.name} ${c.category} ${c.summary} ${c.prompts.join(" ")}`.toLowerCase();
          const score = words.reduce((n, w) => n + (hay.includes(w) ? 1 : 0), 0) + (c.prompts.some((p) => p.includes(q) || q.includes(p)) ? 2 : 0);
          return { c, score };
        })
        .filter((s) => s.score > 0)
        .sort((a, b) => b.score - a.score)
        .slice(0, 8);
      if (!scored.length) return text(`No component matched "${query}". Try \`list_components\`.`);
      return text(`# Matches for "${query}"\n\n` + scored.map(({ c }) => `- **${c.name}** — ${c.summary}\n  _matches:_ ${c.prompts.slice(0, 4).join(", ")}`).join("\n") + "\n\nUse `get_component_docs` with the chosen name.");
    },

    get_component_docs: (args) => {
      const entry = byKey(String(args.name ?? ""));
      if (!entry) return err(`Unknown component "${args.name}". Available: ${registry.map((c) => c.name).join(", ")}.`);
      const doc = data.componentDocs[entry.slug];
      return doc ? text(doc) : err(`No docs bundled for "${entry.name}".`);
    },

    list_patterns: () => {
      const names = Object.keys(data.patternDocs);
      if (!names.length) return text("No patterns published yet. Compose from single components (`list_components`) for now.");
      return text("# Patterns\n\n" + names.map((n) => `- ${n}`).join("\n") + "\n\nUse `get_pattern_docs` with a name, or `preview_pattern` to see it rendered.");
    },

    get_pattern_docs: (args) => {
      const name = slugify(String(args.name ?? ""));
      const doc = data.patternDocs[name];
      return doc ? text(doc) : err(`No pattern "${args.name}". Try \`list_patterns\`.`);
    },

    get_general_docs: (args) => {
      const topic = String(args.topic ?? "");
      const doc = data.generalDocs[topic];
      return doc ? text(doc) : err(`Unknown topic "${topic}". One of: ${GENERAL_TOPICS.join(", ")}.`);
    },

    get_tokens: (args) => {
      const category = args.category ? String(args.category) : undefined;
      const out = category ? { [category]: data.tokens[category] } : data.tokens;
      return text("```json\n" + JSON.stringify(out, null, 2) + "\n```");
    },

    get_agent_rules: () => text(data.agentRules),

    preview_component: (args) => {
      const entry = byKey(String(args.name ?? ""));
      if (!entry) return err(`Unknown component "${args.name}". Available: ${registry.map((c) => c.name).join(", ")}.`);
      const html = data.previews[entry.slug];
      if (!html) return err(`No preview bundled for "${entry.name}".`);
      const story = galleryStoryId(entry);
      const live = story ? `> View live: ${SITE_URL}/storybook/iframe.html?id=${story}\n\n` : "";
      return text(`${live}Rendered preview of **${entry.name}** (all variants):\n\n\`\`\`html\n${absolutize(html)}\n\`\`\``);
    },

    preview_pattern: (args) => {
      const name = slugify(String(args.name ?? ""));
      const html = data.patternPreviews[name];
      if (!html) return err(`No pattern preview "${args.name}". Try \`list_patterns\`.`);
      return text(`> View live: ${SITE_URL}/storybook/iframe.html?id=patterns-${name}--screen\n\nRendered preview of the **${name}** pattern:\n\n\`\`\`html\n${absolutize(html)}\n\`\`\``);
    }
  };
}
