import { mkdir, readdir, rm } from "node:fs/promises";

await mkdir("artifacts", { recursive: true });
for (const name of await readdir("artifacts")) {
  if (name.endsWith(".tgz")) await rm(`artifacts/${name}`);
}
