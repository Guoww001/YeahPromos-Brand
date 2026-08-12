import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const corePath = path.resolve(import.meta.dirname, '..', 'app-core.mjs');
const dataPath = path.resolve(import.meta.dirname, '..', 'data.mjs');

test('方案二状态模块提供时间范围和演示状态切换', async () => {
  assert.equal(fs.existsSync(corePath), true, 'demo2/app-core.mjs should exist');
  assert.equal(fs.existsSync(dataPath), true, 'demo2/data.mjs should exist');
  if (!fs.existsSync(corePath) || !fs.existsSync(dataPath)) return;

  const [{ createDashboardState, selectPeriod, selectDemoState }, { dashboardData }] = await Promise.all([
    import('../app-core.mjs'),
    import('../data.mjs'),
  ]);
  const state = createDashboardState(dashboardData);
  const nextState = selectPeriod(state, '30d');
  const emptyState = selectDemoState(nextState, 'empty');

  assert.equal(state.selectedPeriod, '7d');
  assert.equal(nextState.selectedPeriod, '30d');
  assert.notEqual(nextState.metrics[0].value, state.metrics[0].value);
  assert.equal(emptyState.demoState, 'empty');
});

test('无效的时间范围和演示状态不会破坏当前状态', async () => {
  if (!fs.existsSync(corePath) || !fs.existsSync(dataPath)) return;

  const [{ createDashboardState, selectPeriod, selectDemoState }, { dashboardData }] = await Promise.all([
    import('../app-core.mjs'),
    import('../data.mjs'),
  ]);
  const state = createDashboardState(dashboardData);

  assert.equal(selectPeriod(state, 'unknown'), state);
  assert.equal(selectDemoState(state, 'unknown'), state);
});
