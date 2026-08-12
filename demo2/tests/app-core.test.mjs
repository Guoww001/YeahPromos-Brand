import assert from 'node:assert/strict';
import test from 'node:test';
import { createDashboardStore } from '../src/state/useDashboardStore.js';

test('方案六状态层提供时间范围、任务与风险数据', () => {
  const store = createDashboardStore();

  assert.equal(store.state.selectedPeriod, '7d');
  assert.equal(store.openTaskCount.value, 4);
  assert.equal(store.riskItems.value.length, 3);
  assert.equal(store.currentSnapshot.value.metrics.length, 7);
});

test('切换时间范围会更新运营状态与指标快照', () => {
  const store = createDashboardStore();
  const originalClicks = store.currentSnapshot.value.metrics[0].value;

  store.selectPeriod('30d');

  assert.equal(store.state.selectedPeriod, '30d');
  assert.notEqual(store.currentSnapshot.value.metrics[0].value, originalClicks);
  assert.equal(store.operationalStatus.value.periodLabel, 'Jul 13 — Aug 12, 2026');
});
