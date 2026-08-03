// Copies the canonical generated docs/tokens/rules into packages/mcp/data (for the stdio package)
// AND assembles a single edge-bundle.json (the full McpData incl. prerendered previews) that the
// Worker route imports — one JSON import, no fs/glob at the edge. Run AFTER generate:registry and
// prerender-previews. Single source of truth: everything here is a copy of a generated file.
import { cpSync, mkdirSync, rmSync, readFileSync, writeFileSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const GEN = join(ROOT, "packages/content/generated");
const DATA = join(ROOT, "packages/mcp/data");

mkdirSync(DATA, { recursive: true });
cpSync(join(GEN, "registry.json"), join(DATA, "registry.json"));
rmSync(join(DATA, "knowledgebase"), { recursive: true, force: true });
cpSync(join(GEN, "knowledgebase"), join(DATA, "knowledgebase"), { recursive: true });
cpSync(join(ROOT, "packages/tokens/tokens.json"), join(DATA, "tokens.json"));
cpSync(join(ROOT, "AGENTS.md"), join(DATA, "AGENTS.md"));

// Assemble the edge bundle from the just-copied data + prerendered previews.
const KB = join(DATA, "knowledgebase");
const readDir = (dir) => {
  const out = {};
  if (existsSync(dir)) for (const f of readdirSync(dir)) if (/\.(md|html)$/.test(f)) out[f.replace(/\.(md|html)$/, "")] = readFileSync(join(dir, f), "utf8");
  return out;
};
const bundle = {
  registry: JSON.parse(readFileSync(join(DATA, "registry.json"), "utf8")),
  componentDocs: readDir(join(KB, "components")),
  patternDocs: readDir(join(KB, "patterns")),
  generalDocs: readDir(join(KB, "general")),
  tokens: JSON.parse(readFileSync(join(DATA, "tokens.json"), "utf8")),
  agentRules: existsSync(join(DATA, "AGENTS.md")) ? readFileSync(join(DATA, "AGENTS.md"), "utf8") : "",
  previews: readDir(join(DATA, "previews")),
  patternPreviews: readDir(join(DATA, "previews", "patterns"))
};
const json = JSON.stringify(bundle);
writeFileSync(join(DATA, "edge-bundle.json"), json);

console.log(`bundle-mcp: data/ copied + edge-bundle.json written (${(json.length / 1e6).toFixed(1)}MB, ${Object.keys(bundle.previews).length} previews)`);
