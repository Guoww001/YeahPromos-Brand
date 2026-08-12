import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const root = path.resolve(import.meta.dirname, '..');

test('原生 demo3 提供增长塔台的页面入口和模块化脚本', () => {
  const htmlPath = path.join(root, 'index.html');
  const appPath = path.join(root, 'scripts', 'app.mjs');
  const cssPath = path.join(root, 'styles', 'control-room.css');

  assert.equal(fs.existsSync(htmlPath), true);
  assert.equal(fs.existsSync(appPath), true);
  assert.equal(fs.existsSync(cssPath), true);

  const html = fs.readFileSync(htmlPath, 'utf8');
  assert.match(html, /id="app"/);
  assert.match(html, /type="module" src="\.\/scripts\/app\.mjs"/);
});

test('视觉 Token 使用暗色增长塔台的主色而非 demo2 配色', () => {
  const tokensPath = path.join(root, 'styles', 'tokens.css');
  assert.equal(fs.existsSync(tokensPath), true);

  const tokens = fs.readFileSync(tokensPath, 'utf8');
  assert.match(tokens, /#08141B/i);
  assert.match(tokens, /#66D4E8/i);
  assert.match(tokens, /#F0A64A/i);
  assert.match(tokens, /#EF6B62/i);
});
