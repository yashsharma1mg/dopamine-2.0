import assert from "node:assert/strict";
import { readFile } from "node:fs/promises";
import test from "node:test";
import { createElement } from "react";
import { renderToStaticMarkup } from "react-dom/server";

const root = new URL("../", import.meta.url);

function countLeaves(node) {
  if (node && typeof node === "object" && "value" in node) return 1;
  return Object.values(node).reduce((total, value) => total + countLeaves(value), 0);
}

test("generated token exports match the canonical source", async () => {
  const source = JSON.parse(await readFile(new URL("packages/tokens/tokens.json", root), "utf8"));
  const { tokens } = await import(new URL("packages/ui/dist/generated/tokens.js", root));
  assert.equal(Object.keys(tokens).length, countLeaves(source));
  assert.equal(tokens["semantic.color.surface.brand"], "#3568F4");
  assert.equal(tokens["component.button.primary.background"], "#3568F4");
});

test("the package exposes an accessible native Button without runtime dependencies", async () => {
  const packageJson = JSON.parse(await readFile(new URL("packages/ui/package.json", root), "utf8"));
  const { Button } = await import(new URL("packages/ui/dist/index.js", root));
  const html = renderToStaticMarkup(
    createElement(Button, { loading: true, variant: "primary" }, "Save changes")
  );

  assert.equal(packageJson.dependencies, undefined);
  assert.deepEqual(Object.keys(packageJson.peerDependencies).sort(), ["react", "react-dom"]);
  assert.match(html, /^<button/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /Save changes/);
});
