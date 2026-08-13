import assert from 'node:assert/strict';
import test from 'node:test';
import { createControlRoomState, selectMetric, selectPeriod, setDemoState, toggleNavGroup } from '../scripts/state.mjs';

test('增长塔台默认展示七天销售信号和最高优先级任务', () => {
  const state = createControlRoomState();

  assert.equal(state.selectedPeriod, '7d');
  assert.equal(state.selectedMetric, 'sales');
  assert.equal(state.decisionQueue[0].id, 'balance-cover');
  assert.equal(state.decisionQueue[0].priority, 1);
  assert.equal(state.flightMetrics.length, 8);
});

test('切换日期范围会同时更新 Flight Strip 和信号轨迹数据', () => {
  const state = createControlRoomState();
  const nextState = selectPeriod(state, '30d');

  assert.equal(nextState.selectedPeriod, '30d');
  assert.notEqual(nextState.flightMetrics[2].value, state.flightMetrics[2].value);
  assert.notDeepEqual(nextState.trajectory.series, state.trajectory.series);
});

test('指标、演示状态和导航展开状态可独立更新', () => {
  const state = createControlRoomState();
  const metricState = selectMetric(state, 'commission');
  const errorState = setDemoState(metricState, 'error');
  const navState = toggleNavGroup(errorState, 'partners');

  assert.equal(metricState.selectedMetric, 'commission');
  assert.equal(errorState.demoState, 'error');
  assert.equal(navState.expandedGroups.includes('partners'), false);
});
