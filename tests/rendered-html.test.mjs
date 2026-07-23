import assert from "node:assert/strict";
import test from "node:test";

async function render(pathname = "/") {
  const workerUrl = new URL("../dist/server/index.js", import.meta.url);
  workerUrl.searchParams.set("test", `${pathname}-${process.pid}-${Date.now()}`);
  const { default: worker } = await import(workerUrl.href);

  return worker.fetch(
    new Request(`http://localhost${pathname}`, {
      headers: { accept: "text/html" }
    }),
    {
      ASSETS: { fetch: async () => new Response("Not found", { status: 404 }) }
    },
    {
      waitUntil() {},
      passThroughOnException() {}
    }
  );
}

test("renders the finished documentation home", async () => {
  const response = await render();
  assert.equal(response.status, 200);
  const html = await response.text();
  assert.match(html, /<title>Dopamine 2\.0<\/title>/i);
  assert.match(html, /A shared language for every interface/);
  assert.match(html, /generated tokens/);
  assert.doesNotMatch(html, /codex-preview|taking shape|react-loading-skeleton/i);
});

test("renders foundation and component deep links", async () => {
  const [foundation, component] = await Promise.all([
    render("/foundations/colours"),
    render("/components/button")
  ]);
  assert.equal(foundation.status, 200);
  assert.equal(component.status, 200);

  const foundationHtml = await foundation.text();
  const componentHtml = await component.text();
  assert.match(foundationHtml, /Base colours/);
  assert.match(foundationHtml, /semantic\.color\.branding\.1mg/);
  assert.match(componentHtml, /Interactive playground/);
  assert.match(componentHtml, /storybook\/iframe\.html\?id=components-button--playground/);
});
