import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const portalIndex = resolve(import.meta.dirname, "portal", "index.html");
const distClient = resolve(import.meta.dirname, "..", "dist", "client");
const demo2Styles = resolve(import.meta.dirname, "..", "demo2", "src", "styles", "scheme-six.css");
const demo3Styles = resolve(import.meta.dirname, "..", "demo3", "styles", "control-room.css");

test("统一入口提供四个 demo 的切换入口和预览容器", () => {
  assert.ok(existsSync(portalIndex), "统一入口文件应该存在");

  const html = readFileSync(portalIndex, "utf8");

  for (const demo of ["demo1", "demo2", "demo3", "demo4"]) {
    assert.match(html, new RegExp(`data-demo=[\\"']${demo}[\\"']`));
    assert.match(html, new RegExp(`href=[\\"']\\./${demo}/index\\.html[\\"']`));
  }

  assert.match(html, /id=["']demo-frame["']/);
  assert.match(html, /id=["']demo-selector["']/);
});

test("每个独立 demo 页面都提供跨 demo 切换入口", () => {
  for (const demo of ["demo1", "demo2", "demo3", "demo4"]) {
    const standalonePage = resolve(distClient, demo, "index.html");
    assert.ok(existsSync(standalonePage), `${demo} 构建页面应该存在`);

    const html = readFileSync(standalonePage, "utf8");
    assert.match(html, /data-demo-switcher/);
    assert.match(html, /standalone-nav\.mjs/);
  }
});

test("demo2 和 demo3 的侧栏保留滚动能力但隐藏滚动条", () => {
  for (const stylesheet of [demo2Styles, demo3Styles]) {
    const css = readFileSync(stylesheet, "utf8");
    assert.match(css, /overflow-y:\s*auto/);
    assert.match(css, /scrollbar-width:\s*none/);
    assert.match(css, /-ms-overflow-style:\s*none/);
    assert.match(css, /\.sidebar::?-webkit-scrollbar|\.sidebar__navigation::?-webkit-scrollbar/);
  }
});
