import { Client } from "@modelcontextprotocol/sdk/client/index.js";
import { StdioClientTransport } from "@modelcontextprotocol/sdk/client/stdio.js";

const transport = new StdioClientTransport({ command: "npx", args: ["tsx", "src/index.ts"] });
const client = new Client({ name: "smoke-test", version: "1.0.0" });
await client.connect(transport);

const tools = await client.listTools();
console.log("TOOLS:", tools.tools.map((t) => t.name).join(", "));

const first = (r: any) => (r.content?.[0]?.text ?? "").split("\n").slice(0, 6).join("\n");

console.log("\n— search_components 'undo toast' —\n" + first(await client.callTool({ name: "search_components", arguments: { query: "undo toast" } })));
console.log("\n— get_component_docs Snackbar (head) —\n" + first(await client.callTool({ name: "get_component_docs", arguments: { name: "Snackbar" } })));
console.log("\n— get_general_docs install (head) —\n" + first(await client.callTool({ name: "get_general_docs", arguments: { topic: "install" } })));
console.log("\n— get_tokens radius (head) —\n" + first(await client.callTool({ name: "get_tokens", arguments: { category: "radius" } })));

await client.close();
