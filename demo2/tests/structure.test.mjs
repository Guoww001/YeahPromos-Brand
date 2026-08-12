import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const demoDir = path.resolve(import.meta.dirname, '..');
const htmlPath = path.join(demoDir, 'index.html');
const cssPath = path.join(demoDir, 'styles.css');

test('方案二 demo 提供独立的侧边栏工作台页面', () => {
  assert.equal(fs.existsSync(htmlPath), true, 'demo2/index.html should exist');
  if (!fs.existsSync(htmlPath)) return;

  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(html, /class="sidebar"/);
  assert.match(html, /data-navigation/);
  assert.match(html, /data-metrics-grid/);
  assert.match(html, /data-filter-bar/);
  assert.match(html, /data-drawer/);
  assert.match(html, /type="module" src="\.\/app\.js"/);
});

test('方案二使用雾灰蓝 SaaS 视觉 Token 和本地字体', () => {
  assert.equal(fs.existsSync(cssPath), true, 'demo2/styles.css should exist');
  if (!fs.existsSync(cssPath)) return;

  const css = fs.readFileSync(cssPath, 'utf8');
  assert.match(css, /--page-bg:\s*#f4f7fa/i);
  assert.match(css, /--accent-blue:\s*#2878e8/i);
  assert.match(css, /--card-bg:\s*#ffffff/i);
  assert.match(css, /filter-chip/);
  assert.match(css, /data-table/);
  assert.match(css, /plus-jakarta-sans-latin-400-normal\.woff2/);
  assert.doesNotMatch(css, /fonts\.googleapis\.com|use\.typekit\.net/i);
});
