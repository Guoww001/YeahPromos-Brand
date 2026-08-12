import { cpSync, mkdirSync, rmSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");
const metadata = resolve(dist, ".openai");

rmSync(dist, { recursive: true, force: true });
mkdirSync(resolve(client, "fonts"), { recursive: true });
mkdirSync(server, { recursive: true });
mkdirSync(metadata, { recursive: true });

for (const file of ["index.html", "styles.css", "app.js", "app-core.mjs", "data.mjs"]) {
  cpSync(resolve(root, file), resolve(client, file));
}

cpSync(resolve(root, "..", "fonts"), resolve(client, "fonts"), { recursive: true });
cpSync(resolve(root, "site-runtime", "index.mjs"), resolve(server, "index.js"));
cpSync(resolve(root, ".openai", "hosting.json"), resolve(metadata, "hosting.json"));
