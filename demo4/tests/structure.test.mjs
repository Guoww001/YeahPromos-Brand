import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';
import { fileURLToPath } from 'node:url';
import { renderApp } from '../scripts/render.mjs';
import { createBrandPulseState, navigateTo } from '../scripts/state.mjs';

const root = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const read = (file) => fs.readFileSync(path.join(root, file), 'utf8');

test('入口文件加载 Brand Pulse 的模块化资源', () => {
  const html = read('index.html');

  assert.match(html, /styles\/tokens\.css/);
  assert.match(html, /styles\/shell\.css/);
  assert.match(html, /styles\/modules\.css/);
  assert.match(html, /scripts\/app\.mjs/);
  assert.match(html, /id="app"/);
});

test('视觉 Token 使用白底黑字和 Media Kit 品牌色', () => {
  const tokens = read('styles/tokens.css');

  assert.match(tokens, /#FAFAF8/i);
  assert.match(tokens, /#111111/i);
  assert.match(tokens, /#F20A4F/i);
  assert.match(tokens, /Plus Jakarta Sans/);
  assert.doesNotMatch(tokens, /\b(?:Inter|Roboto|Arial|Helvetica)\b/);
});

test('渲染层包含增长轨迹和四类页面骨架', () => {
  const render = read('scripts/render.mjs');

  assert.match(render, /growth-ribbon/);
  assert.match(render, /renderDossier/);
  assert.match(render, /renderCanvas/);
  assert.match(render, /renderLedger/);
  assert.match(render, /renderMatrix/);
  assert.doesNotMatch(render, /module-placeholder/);
});

test('流程画布的进度轨道保持完整宽度，仅缩放内部填充', () => {
  const state = navigateTo(createBrandPulseState(), 'product-feed');
  const html = renderApp(state);

  assert.match(html, /node-meter"><i><b style="transform:scaleX\(/);
});

test('移动端图标按钮有可访问名称，离屏侧栏不会进入可访问树', () => {
  const html = renderApp(createBrandPulseState());
  const shell = read('styles/shell.css');

  assert.match(html, /class="command-trigger"[^>]+aria-label="Search or jump to"/);
  assert.match(shell, /@media \(max-width: 760px\)[\s\S]+\.sidebar \{[^}]+visibility: hidden/);
  assert.match(shell, /\.sidebar\.is-open \{[^}]+visibility: visible/);
});

test('折叠导航、图表数据与移动端控件保留可访问能力', () => {
  const html = renderApp(createBrandPulseState());
  const commandHtml = renderApp({ ...createBrandPulseState(), commandOpen: true });
  const shell = read('styles/shell.css');

  assert.match(html, /class="nav-item is-active"[^>]+aria-label="Overview"[^>]+aria-current="page"/);
  assert.match(html, /class="metric-data-table"/);
  assert.match(html, /class="mobile-tools"/);
  assert.match(commandHtml, /class="command-search"[\s\S]+aria-label="Search commands"/);
  assert.doesNotMatch(shell, /\.period-control select, \.demo-control select \{[^}]+outline:\s*0/);
});
