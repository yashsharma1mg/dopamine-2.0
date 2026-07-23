import assert from "node:assert/strict";
import { readFile, writeFile } from "node:fs/promises";
import path from "node:path";
import { fileURLToPath } from "node:url";

const root = path.dirname(path.dirname(fileURLToPath(import.meta.url)));
const sourcePath = path.join(root, "packages/tokens/tokens.json");
const cssPath = path.join(root, "packages/tokens/generated/tokens.css");
const tsPath = path.join(root, "packages/tokens/generated/tokens.ts");
const uiCssPath = path.join(root, "packages/ui/src/generated/tokens.css");
const uiTsPath = path.join(root, "packages/ui/src/generated/tokens.ts");
const checkOnly = process.argv.includes("--check");
const source = JSON.parse(await readFile(sourcePath, "utf8"));

const flat = new Map();

function collect(node, parts = []) {
  if (node && typeof node === "object" && "value" in node) {
    flat.set(parts.join("."), node);
    return;
  }
  for (const [key, value] of Object.entries(node)) collect(value, [...parts, key]);
}

collect(source);

const aliasPattern = /^\{([^}]+)\}$/;

function resolve(name, trail = []) {
  assert(!trail.includes(name), `Circular token alias: ${[...trail, name].join(" → ")}`);
  const token = flat.get(name);
  assert(token, `Missing token alias: ${name}`);
  const alias = String(token.value).match(aliasPattern);
  return alias ? resolve(alias[1], [...trail, name]) : token.value;
}

const entries = [...flat.entries()].map(([name, token]) => ({
  name,
  cssName: `--${name.replaceAll(".", "-")}`,
  rawValue: token.value,
  value: resolve(name),
  description: token.description ?? "",
  type: token.type ?? "unknown"
}));

assert(entries.length > 0, "tokens.json contains no token leaves");

const css = `/* Generated from packages/tokens/tokens.json. Do not edit. */\n:root {\n${entries
  .map(({ cssName, rawValue }) => {
    const alias = String(rawValue).match(aliasPattern);
    return `  ${cssName}: ${alias ? `var(--${alias[1].replaceAll(".", "-")})` : rawValue};`;
  })
  .join("\n")}\n}\n`;

const ts = `/* Generated from packages/tokens/tokens.json. Do not edit. */\nexport const tokens = ${JSON.stringify(
  Object.fromEntries(entries.map(({ name, value }) => [name, value])),
  null,
  2
)} as const;\n\nexport type TokenName = keyof typeof tokens;\n`;

async function assertCurrent(file, expected) {
  assert.equal(await readFile(file, "utf8"), expected, `${path.relative(root, file)} is stale. Run npm run generate:tokens.`);
}

if (checkOnly) {
  await Promise.all([cssPath, uiCssPath].map((file) => assertCurrent(file, css)));
  await Promise.all([tsPath, uiTsPath].map((file) => assertCurrent(file, ts)));
} else {
  await Promise.all([
    writeFile(cssPath, css),
    writeFile(uiCssPath, css),
    writeFile(tsPath, ts),
    writeFile(uiTsPath, ts)
  ]);
}

console.log(`${checkOnly ? "Validated" : "Generated"} ${entries.length} design tokens.`);
