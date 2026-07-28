// Builds the canonical machine-readable component registry (Phase 1 of the MCP work).
//
// Spine of the design: props come from the REAL TypeScript types (react-docgen-typescript),
// prose (summary/usage/a11y/variants/links) from componentManifests, retrieval keywords from
// each spec's `prompts:` block. The website, Storybook, the knowledgebase, and the MCP all read
// the output — killing the manifest-vs-code drift. Run with: tsx scripts/generate-registry.mts
import { readFileSync, writeFileSync, mkdirSync, existsSync } from "node:fs";
import { join, dirname } from "node:path";
import { fileURLToPath } from "node:url";
import * as docgen from "react-docgen-typescript";
import { componentManifests } from "../packages/content/src/index.js";

const ROOT = join(dirname(fileURLToPath(import.meta.url)), "..");
const UI_SRC = join(ROOT, "packages/ui/src");
const SPECS = join(ROOT, "specs");
const OUT_DIR = join(ROOT, "packages/content/generated");
const PROMPT_FALLBACK: Record<string, string[]> = JSON.parse(readFileSync(join(ROOT, "scripts/registry-prompts.json"), "utf8"));

// Keep only props declared in our own source — drop inherited DOM/React attributes.
const parser = docgen.withCompilerOptions(
  { esModuleInterop: true, jsx: 4 /* react-jsx */ },
  {
    savePropValueAsString: true,
    shouldExtractLiteralValuesFromEnum: true,
    shouldRemoveUndefinedFromOptional: true,
    propFilter: (prop) =>
      !prop.parent || (prop.parent.fileName.includes("packages/ui/src") && !prop.parent.fileName.includes("node_modules"))
  }
);

function specPrompts(name: string): string[] {
  const file = join(SPECS, `${name}.md`);
  if (!existsSync(file)) return [];
  const md = readFileSync(file, "utf8");
  const block = md.match(/prompts:\s*\n((?:\s*-\s*.*\n?)+)/);
  if (!block) return [];
  return [...block[1].matchAll(/-\s*"?([^"\n]+?)"?\s*$/gm)].map((m) => m[1].trim());
}

function codeProps(name: string) {
  const file = join(UI_SRC, `${name}.tsx`);
  const parsed = parser.parse(file);
  const comp = parsed.find((c) => c.displayName === name) ?? parsed[0];
  if (!comp) return [];
  return Object.values(comp.props).map((p) => {
    // Expand string-literal unions ("enum") into a readable "A" | "B" type.
    const t = p.type as { name: string; value?: { value: string }[] };
    const type = t.name === "enum" && Array.isArray(t.value) ? t.value.map((v) => v.value).join(" | ") : t.name;
    return { name: p.name, type, required: p.required, description: p.description || "" };
  });
}

let recovered = 0;
const registry = componentManifests.map((m) => {
  const props = codeProps(m.name);
  const manifestApi = Object.fromEntries(m.api.map((a) => [a.name, a]));

  // Type/required from code (truth); default + description fall back to curated manifest.
  const merged = props
    .filter((p) => p.name !== "className")
    .map((p) => ({
      name: p.name,
      type: p.type,
      required: p.required,
      default: manifestApi[p.name]?.defaultValue ?? "—",
      description: p.description || manifestApi[p.name]?.description || ""
    }));

  // Recover curated props that docgen dropped because their NAME collides with an inherited
  // DOM attribute (disabled, style, title, children …) — they are real DS props, sourced here
  // from the manifest so the registry stays complete.
  const have = new Set(merged.map((p) => p.name));
  for (const a of m.api) {
    if (have.has(a.name)) continue;
    merged.push({ name: a.name, type: a.type, required: false, default: a.defaultValue, description: a.description });
    recovered++;
  }

  return {
    slug: m.slug,
    name: m.name,
    summary: m.summary,
    category: m.category,
    status: m.status,
    package: m.packageName,
    import: m.importExample,
    storyId: m.storyId,
    figma: m.links.figma ?? null,
    prompts: specPrompts(m.name).length ? specPrompts(m.name) : (PROMPT_FALLBACK[m.name] ?? []),
    variants: m.variants,
    sizes: m.sizes,
    states: m.states,
    usage: m.usage,
    accessibility: m.accessibility,
    contentGuidance: m.contentGuidance,
    props: merged
  };
});

if (!existsSync(OUT_DIR)) mkdirSync(OUT_DIR, { recursive: true });
writeFileSync(join(OUT_DIR, "registry.json"), JSON.stringify(registry, null, 2) + "\n");

// ── Phase 2: LLM knowledgebase (one agent-shaped markdown per component) ──────────────
const KB_DIR = join(OUT_DIR, "knowledgebase", "components");
const EXAMPLES = join(ROOT, "examples/components");
if (!existsSync(KB_DIR)) mkdirSync(KB_DIR, { recursive: true });

const TEXT_CHILDREN = new Set(["Button", "SuggestionChip"]);

function attrFor(p: (typeof registry)[number]["props"][number]): string | null {
  if (p.name === "children" || p.type.includes("=>")) return null; // handlers/children handled elsewhere
  if (p.type.includes('"')) return p.default && p.default !== "—" ? `${p.name}="${p.default}"` : `${p.name}="${p.type.split("|")[0].replace(/["\s]/g, "")}"`;
  if (p.type === "boolean") return `${p.name}`;
  if (p.type === "number") return `${p.name}={1}`;
  return `${p.name}="…"`; // string / ReactNode
}

function autoExample(e: (typeof registry)[number]): string {
  const attrs: string[] = [];
  // Required props first (so the example type-checks), then a couple representative enum props.
  for (const p of e.props.filter((p) => p.required)) {
    const a = attrFor(p);
    if (a) attrs.push(a);
  }
  for (const p of e.props.filter((p) => !p.required && p.type.includes('"') && p.default !== "—")) {
    if (attrs.length >= 3) break;
    const a = attrFor(p);
    if (a && !attrs.some((x) => x.startsWith(a.split(/[=\s]/)[0]))) attrs.push(a);
  }
  const open = `<${e.name}${attrs.length ? " " + attrs.join(" ") : ""}`;
  const body = TEXT_CHILDREN.has(e.name) ? `${open}>Label</${e.name}>` : `${open} />`;
  return `import { ${e.name} } from "@dopamine2.0/ui";\nimport "@dopamine2.0/ui/styles.css";\n\nexport default function Example() {\n  return ${body};\n}`;
}

function example(e: (typeof registry)[number]): string {
  const override = join(EXAMPLES, `${e.slug}.tsx`);
  return existsSync(override) ? readFileSync(override, "utf8").trim() : autoExample(e);
}

function propsTable(e: (typeof registry)[number]): string {
  if (!e.props.length) return "_No configurable props._";
  const rows = e.props.map(
    (p) => `| \`${p.name}\` | \`${p.type.replace(/\|/g, "\\|")}\` | ${p.required ? "yes" : "no"} | ${p.default === "—" ? "" : `\`${p.default}\``} | ${p.description} |`
  );
  return ["| Prop | Type | Required | Default | Description |", "|---|---|---|---|---|", ...rows].join("\n");
}

function kb(e: (typeof registry)[number]): string {
  const list = (xs: string[]) => (xs.length ? xs.map((x) => `- ${x}`).join("\n") : "_none_");
  return `# ${e.name}

${e.summary}

- **Package:** \`${e.package}\` · **Status:** ${e.status} · **Category:** ${e.category}
- **Import:** \`${e.import}\`
- Load the stylesheet once at your app root: \`import "@dopamine2.0/ui/styles.css";\`

**Use when the user asks for:** ${e.prompts.join(", ")}

## Props
${propsTable(e)}

## Variants / sizes / states
- **Variants:** ${e.variants.join(", ") || "—"}
- **Sizes:** ${e.sizes.join(", ") || "—"}
- **States:** ${e.states.join(", ") || "—"}

## Usage
**Do**
${list(e.usage.do)}

**Don't**
${list(e.usage.dont)}

## Accessibility
${list(e.accessibility)}

## Example
\`\`\`tsx
${example(e)}
\`\`\`
${e.figma ? `\n[Figma source](${e.figma})` : ""}
`;
}

for (const e of registry) writeFileSync(join(KB_DIR, `${e.slug}.md`), kb(e));
console.log(`Knowledgebase: ${registry.length} docs → packages/content/generated/knowledgebase/components/`);

const noPrompts = registry.filter((r) => r.prompts.length === 0).map((r) => r.name);
console.log(`Registry: ${registry.length} components → packages/content/generated/registry.json`);
console.log(`Props: ${registry.reduce((n, r) => n + r.props.length, 0)} total (${recovered} recovered from manifest for DOM-name collisions).`);
if (noPrompts.length) console.log(`⚠ missing spec prompts (${noPrompts.length}): ${noPrompts.join(", ")}`);
