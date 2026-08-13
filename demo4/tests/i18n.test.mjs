import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';
import { renderApp } from '../scripts/render.mjs';
import { createBrandPulseState, navigateTo, openWorkflow, setCommandOpen, setCommandQuery } from '../scripts/state.mjs';

test('默认使用英文并提供可访问的中英文切换按钮', () => {
  const state = createBrandPulseState();
  const html = renderApp(state);

  assert.equal(state.language, 'en');
  assert.match(html, /class="language-switch"[^>]+data-language-toggle/);
  assert.match(html, /aria-label="切换到中文"/);
  assert.match(html, /<span class="is-active">EN<\/span>/);
});

test('中文状态覆盖导航、核心数据和页面操作文案', () => {
  const state = { ...createBrandPulseState(), language: 'zh-CN' };
  const html = renderApp(state);

  assert.match(html, /aria-label="主导航"/);
  assert.match(html, /<span class="nav-label">招募与合作伙伴<\/span>/);
  assert.match(html, /营收增长速度超过流量增长。/);
  assert.match(html, /总销售额/);
  assert.match(html, /待处理事项/);
  assert.doesNotMatch(html, /Search or jump to/);
});

test('功能展示抽屉也随页面语言切换', () => {
  const state = openWorkflow(
    navigateTo({ ...createBrandPulseState(), language: 'zh-CN' }, 'product-feed'),
    'product-filter',
  );
  const html = renderApp(state);

  assert.match(html, /塑造合作伙伴商品源/);
  assert.match(html, /选择商城与规则行为/);
  assert.match(html, /继续：规则/);
  assert.match(html, /示例数据 · 不会保存任何更改/);
});

test('中文命令面板显示中文操作并支持中文关键词', () => {
  const base = { ...createBrandPulseState(), language: 'zh-CN' };
  const openedHtml = renderApp(setCommandOpen(base, true));
  const queriedHtml = renderApp(setCommandQuery(setCommandOpen(base, true), '交易'));

  assert.match(openedHtml, /创建活动/);
  assert.doesNotMatch(openedHtml, />Create a campaign</);
  assert.match(queriedHtml, /审核交易/);
  assert.doesNotMatch(queriedHtml, /没有匹配的命令/);
});

test('应用保存语言偏好并同步文档语言属性', () => {
  const appSource = readFileSync(new URL('../scripts/app.mjs', import.meta.url), 'utf8');

  assert.match(appSource, /dataset\.languageToggle/);
  assert.match(appSource, /localStorage\.setItem\(LANGUAGE_STORAGE_KEY/);
  assert.match(appSource, /document\.documentElement\.lang = state\.language/);
});
