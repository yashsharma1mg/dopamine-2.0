// Loads McpData for the stdio server from the package's bundled ./data directory (copied in by
// scripts/bundle-mcp.mjs at build time). Paths are relative to this file, NOT the repo — so the
// package runs correctly when installed anywhere.
import { readFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import type { McpData, Entry } from "./tools.js";

const DATA = join(dirname(fileURLToPath(import.meta.url)), "../data");

const stripExt = (f: string) => f.replace(/\.(md|html)$/, "");
function readDir(dir: string): Record<string, string> {
  const out: Record<string, string> = {};
  if (!existsSync(dir)) return out;
  for (const f of readdirSync(dir)) {
    if (f.endsWith(".md") || f.endsWith(".html")) out[stripExt(f)] = readFileSync(join(dir, f), "utf8");
  }
  return out;
}

export function loadData(): McpData {
  const KB = join(DATA, "knowledgebase");
  const registry: Entry[] = JSON.parse(readFileSync(join(DATA, "registry.json"), "utf8"));
  return {
    registry,
    componentDocs: readDir(join(KB, "components")),
    patternDocs: readDir(join(KB, "patterns")),
    generalDocs: readDir(join(KB, "general")),
    tokens: JSON.parse(readFileSync(join(DATA, "tokens.json"), "utf8")),
    agentRules: existsSync(join(DATA, "AGENTS.md")) ? readFileSync(join(DATA, "AGENTS.md"), "utf8") : "",
    previews: readDir(join(DATA, "previews")),
    patternPreviews: readDir(join(DATA, "previews", "patterns"))
  };
}
