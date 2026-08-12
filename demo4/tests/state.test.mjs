import assert from 'node:assert/strict';
import test from 'node:test';
import { renderApp } from '../scripts/render.mjs';
import { filterRecords } from '../scripts/render.mjs';
import { brandPulseData } from '../scripts/data.mjs';
import {
  closeInspector,
  createBrandPulseState,
  navigateTo,
  openInspector,
  selectMetric,
  selectPeriod,
  setCommandOpen,
  setDemoState,
  toggleSidebar,
} from '../scripts/state.mjs';

test('默认状态从白色增长总览开始', () => {
  const state = createBrandPulseState();

  assert.equal(state.activePage, 'overview');
  assert.equal(state.selectedMetric, 'sales');
  assert.equal(state.selectedPeriod, '30d');
  assert.equal(state.commandOpen, false);
});

test('导航到子页面时自动展开对应业务域', () => {
  const next = navigateTo(createBrandPulseState(), 'transactions');

  assert.equal(next.activePage, 'transactions');
  assert.equal(next.expandedGroup, 'data');
  assert.equal(next.mobileNavOpen, false);
});

test('详情检查器与命令面板保持独立状态', () => {
  const base = createBrandPulseState();
  const inspected = openInspector(base, 'tx-88421');
  const commanded = setCommandOpen(inspected, true);

  assert.equal(commanded.inspectorId, 'tx-88421');
  assert.equal(commanded.commandOpen, true);
  assert.equal(closeInspector(commanded).inspectorId, null);
});

test('日期、指标、演示状态和侧栏折叠可分别切换', () => {
  const base = createBrandPulseState();
  const period = selectPeriod(base, '7d');
  const metric = selectMetric(period, 'orders');
  const demo = setDemoState(metric, 'error');
  const collapsed = toggleSidebar(demo);

  assert.equal(collapsed.selectedPeriod, '7d');
  assert.equal(collapsed.selectedMetric, 'orders');
  assert.equal(collapsed.demoState, 'error');
  assert.equal(collapsed.sidebarCollapsed, true);
});

test('选择转化率时主增长数字同步切换', () => {
  const state = selectMetric(createBrandPulseState(), 'conversion');
  const html = renderApp(state);

  assert.match(html, /growth-value"><strong>2\.7%<\/strong>/);
});

test('Needs attention 筛选实际减少业务记录', () => {
  const view = brandPulseData.views.applications;
  const filtered = filterRecords(view.records, 'Needs attention');

  assert.equal(filtered.length, 2);
  assert.deepEqual(filtered.map((record) => record.id), ['app-mosaic', 'app-dealproof']);
});
