import { readFileSync, existsSync } from "node:fs";
import { resolve } from "node:path";
import test from "node:test";
import assert from "node:assert/strict";

const portalIndex = resolve(import.meta.dirname, "portal", "index.html");

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
