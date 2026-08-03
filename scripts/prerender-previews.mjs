// Build-time SSR of component + pattern previews into self-contained HTML (inlined CSS, data-URI
// icons) so the MCP `preview_component` / `preview_pattern` tools can return an in-chat artifact.
// Reuses the Storybook story files as fixtures (prefers the `FigmaVariants` all-variants story) so
// previews match Storybook. Run via tsx (it imports .tsx). Per-story try/catch → a stub, so one
// bad story never fails the build.
import { readFileSync, writeFileSync, mkdirSync, readdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UI = join(ROOT, "packages/ui/src");
const OUT = join(ROOT, "packages/mcp/data/previews");
mkdirSync(join(OUT, "patterns"), { recursive: true });

// Self-contained CSS: inline tokens (styles.css only @imports them) and drop @font-face (external
// font files won't exist in the artifact; the reset's `var(--font-family-body), system-ui` falls back).
const tokensCss = readFileSync(join(UI, "generated/tokens.css"), "utf8");
const stylesCss = readFileSync(join(UI, "styles.css"), "utf8")
  .replace(/@import\s+["'][^"']*tokens\.css["'];?/g, "")
  .replace(/@font-face\s*\{[\s\S]*?\}/g, "");
const CSS = tokensCss + "\n" + stylesCss;

const registry = JSON.parse(readFileSync(join(ROOT, "packages/content/generated/registry.json"), "utf8"));
const byName = (name) => registry.find((e) => e.name.toLowerCase() === name.toLowerCase());

const page = (title, body) =>
  `<!doctype html>
<html lang="en"><head><meta charset="utf-8"><meta name="viewport" content="width=device-width,initial-scale=1">
<title>${title} — Dopamine2.0</title>
<style>${CSS}
body{margin:0;padding:24px;background:#f7f8fa;font-family:var(--font-family-body,system-ui),system-ui,sans-serif;color:var(--semantic-color-content-primary)}
.ds-preview-grid{display:flex;flex-direction:column;gap:24px;align-items:flex-start;max-width:100%}</style>
</head><body><div class="ds-preview-grid">${body}</div></body></html>`;

// Prefer the all-variants gallery; fall back to the first renderable story or the bare component.
function renderStory(mod) {
  const meta = mod.default;
  const story =
    mod.FigmaVariants ??
    mod.Screen ??
    mod.Playground ??
    Object.values(mod).find((v) => v && typeof v === "object" && ("render" in v || "args" in v));
  const args = { ...(meta.args ?? {}), ...(story?.args ?? {}) };
  const el = story?.render ? story.render(args, { args, globals: {} }) : createElement(meta.component, args);
  return renderToStaticMarkup(el);
}

const storyFiles = readdirSync(UI).filter((f) => f.endsWith(".stories.tsx"));
const patternDir = join(UI, "patterns");
const patternFiles = existsSync(patternDir)
  ? readdirSync(patternDir).filter((f) => f.endsWith(".stories.tsx")).map((f) => join("patterns", f))
  : [];

let ok = 0;
let stub = 0;
for (const rel of [...storyFiles, ...patternFiles]) {
  let mod;
  let title = rel;
  try {
    mod = await import(join(UI, rel));
    title = mod.default?.title ?? rel;
  } catch (e) {
    console.warn("prerender: import failed, skipping", rel, "—", String(e).split("\n")[0]);
    continue;
  }
  const isPattern = title.startsWith("Patterns/");
  const name = title.replace(/^(Components|Patterns)\//, "").trim();
  const dest = isPattern
    ? join(OUT, "patterns", `${name.toLowerCase().replace(/\s+/g, "-")}.html`)
    : (() => {
        const entry = byName(name);
        return entry ? join(OUT, `${entry.slug}.html`) : null;
      })();
  if (!dest) {
    console.warn("prerender: no registry entry for", name);
    continue;
  }
  try {
    writeFileSync(dest, page(name, renderStory(mod)));
    ok++;
  } catch (e) {
    writeFileSync(dest, page(name, `<p>Preview unavailable for <b>${name}</b>. ${String(e).split("\n")[0]}</p>`));
    stub++;
    console.warn("prerender: stubbed", name, "—", String(e).split("\n")[0]);
  }
}
console.log(`prerender-previews: ${ok} rendered, ${stub} stubbed → packages/mcp/data/previews`);
