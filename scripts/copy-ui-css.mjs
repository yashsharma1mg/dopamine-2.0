import { cp, mkdir } from "node:fs/promises";

await mkdir("packages/ui/dist", { recursive: true });
await cp("packages/ui/src/styles.css", "packages/ui/dist/styles.css");
await cp("packages/ui/src/generated/tokens.css", "packages/ui/dist/generated/tokens.css");
await cp("packages/ui/src/fonts", "packages/ui/dist/fonts", { recursive: true });
console.log("Copied package styles.");
