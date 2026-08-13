import assert from 'node:assert/strict';
import test from 'node:test';
import { createDashboardStore } from '../src/state/useDashboardStore.js';

test('运营驾驶舱默认聚焦今日业务状态和待处理任务', () => {
  const store = createDashboardStore();

  assert.equal(store.state.activeNavigationId, 'overview');
  assert.equal(store.state.selectedPeriod, '7d');
  assert.equal(store.openTaskCount.value, 4);
  assert.equal(store.riskItems.value.length, 3);
  assert.equal(store.currentSnapshot.value.metrics.length, 7);
});

test('日期切换会更新指标和运营状态摘要', () => {
  const store = createDashboardStore();
  const initialClicks = store.currentSnapshot.value.metrics[0].value;

  store.selectPeriod('30d');

  assert.equal(store.state.selectedPeriod, '30d');
  assert.notEqual(store.currentSnapshot.value.metrics[0].value, initialClicks);
  assert.equal(store.operationalStatus.value.periodLabel, 'Jul 13 — Aug 12, 2026');
});

test('导航和抽屉状态可独立切换', () => {
  const store = createDashboardStore();

  store.navigateTo('performance');
  store.openPartner('northstar');

  assert.equal(store.state.activeNavigationId, 'performance');
  assert.equal(store.state.activePartnerId, 'northstar');

  store.closePartner();
  assert.equal(store.state.activePartnerId, null);
});
