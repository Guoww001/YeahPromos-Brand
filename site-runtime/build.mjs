import { cpSync, existsSync, mkdirSync, readFileSync, rmSync, writeFileSync } from "node:fs";
import { resolve } from "node:path";

const root = resolve(import.meta.dirname, "..");
const dist = resolve(root, "dist");
const client = resolve(dist, "client");
const server = resolve(dist, "server");
const metadata = resolve(dist, ".openai");

rmSync(dist, { recursive: true, force: true });
mkdirSync(server, { recursive: true });
mkdirSync(metadata, { recursive: true });

function copyFile(source, target) {
  cpSync(source, target);
}

function copyDirectory(source, target) {
  cpSync(source, target, { recursive: true });
}

function requirePath(path, label) {
  if (!existsSync(path)) {
    throw new Error("缺少 " + label + "：" + path);
  }
}

function addStandaloneSwitcher(pagePath, demoName) {
  let html = readFileSync(pagePath, "utf8");
  if (html.includes("data-demo-switcher")) return;

  html = html.replace(
    /<head(\s[^>]*)?>/i,
    (match) => match + "\n  <link rel=\"stylesheet\" href=\"../demo-switcher/standalone-nav.css\">",
  );
  html = html.replace(
    /<body(\s[^>]*)?>/i,
    (match) => match.replace(/>$/, " data-demo-page=\"" + demoName + "\">"),
  );
  html = html.replace(
    /<\/body>/i,
    "  <script type=\"module\" data-demo-switcher src=\"../demo-switcher/standalone-nav.mjs\"></script>\n</body>",
  );
  writeFileSync(pagePath, html);
}

copyFile(resolve(root, "site-runtime", "portal", "index.html"), resolve(client, "index.html"));
copyFile(resolve(root, "site-runtime", "portal", "styles.css"), resolve(client, "styles.css"));
copyFile(resolve(root, "site-runtime", "portal", "app.js"), resolve(client, "app.js"));
copyDirectory(resolve(root, "fonts"), resolve(client, "fonts"));
copyDirectory(resolve(root, "site-runtime", "demo-switcher"), resolve(client, "demo-switcher"));

const demo1 = resolve(client, "demo1");
mkdirSync(demo1, { recursive: true });
for (const file of ["index.html", "styles.css", "app.js", "app-core.mjs", "data.mjs"]) {
  copyFile(resolve(root, "demo1", file), resolve(demo1, file));
}
addStandaloneSwitcher(resolve(demo1, "index.html"), "demo1");

const demo2Client = resolve(root, "demo2", "dist", "client");
requirePath(resolve(demo2Client, "index.html"), "demo2 构建产物");
copyDirectory(demo2Client, resolve(client, "demo2"));
addStandaloneSwitcher(resolve(client, "demo2", "index.html"), "demo2");

for (const demoName of ["demo3", "demo4"]) {
  const target = resolve(client, demoName);
  mkdirSync(target, { recursive: true });
  copyFile(resolve(root, demoName, "index.html"), resolve(target, "index.html"));
  for (const directory of ["styles", "scripts"]) {
    copyDirectory(resolve(root, demoName, directory), resolve(target, directory));
  }
  copyDirectory(resolve(root, "fonts"), resolve(target, "fonts"));
  addStandaloneSwitcher(resolve(target, "index.html"), demoName);
}

cpSync(resolve(root, "site-runtime", "index.mjs"), resolve(server, "index.js"));
cpSync(resolve(root, ".openai", "hosting.json"), resolve(metadata, "hosting.json"));
