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
  assert.equal(tokens["base.color.brand.coral"], "#ff5443");
  assert.equal(tokens["semantic.color.branding.1mg"], "#ff5443");
  assert.equal(tokens["component.button.fill.primary.background"], "#ff5443");
});

test("the package exposes the pilot components without runtime dependencies", async () => {
  const packageJson = JSON.parse(await readFile(new URL("packages/ui/package.json", root), "utf8"));
  const { Button, FloatingActionButton, Stepper } = await import(new URL("packages/ui/dist/index.js", root));
  const html = renderToStaticMarkup(
    createElement(Button, { loading: true, type: "fill" }, "Save changes")
  );

  assert.equal(packageJson.dependencies, undefined);
  assert.deepEqual(Object.keys(packageJson.peerDependencies).sort(), ["react", "react-dom"]);
  assert.match(html, /^<button/);
  assert.match(html, /aria-busy="true"/);
  assert.match(html, /disabled=""/);
  assert.match(html, /Save changes/);
  assert.equal(typeof Stepper, "function");
  assert.equal(typeof FloatingActionButton, "object");
});
