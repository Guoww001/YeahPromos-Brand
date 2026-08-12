import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createDashboardState,
  selectDemoState,
  selectPeriod,
  toggleNavigationGroup,
} from '../app-core.mjs';

const fixture = {
  periods: [
    {
      id: '7d',
      label: 'Last 7 days',
      snapshot: {
        metrics: [{ id: 'clicks', value: '100' }],
        partnerPerformance: [{ id: 'a', amount: '$100' }],
      },
    },
    {
      id: '30d',
      label: 'Last 30 days',
      snapshot: {
        metrics: [{ id: 'clicks', value: '300' }],
        partnerPerformance: [{ id: 'a', amount: '$300' }],
      },
    },
  ],
  metrics: [{ id: 'clicks', value: '100' }],
  partnerPerformance: [{ id: 'a', amount: '$100' }],
};

test('createDashboardState uses the first period and clones source data', () => {
  const source = structuredClone(fixture);
  const state = createDashboardState(source);

  assert.equal(state.selectedPeriod, '7d');
  assert.deepEqual(state.expandedGroups, []);
  assert.equal(state.activePartnerId, null);
  assert.notEqual(state.partnerPerformance, source.partnerPerformance);

  state.partnerPerformance[0].name = 'Changed';
  assert.equal(source.partnerPerformance[0].id, 'a');
});

test('selectPeriod updates the selected period without mutating source state', () => {
  const source = createDashboardState(fixture);
  const result = selectPeriod(source, '30d');

  assert.equal(source.selectedPeriod, '7d');
  assert.equal(result.selectedPeriod, '30d');
  assert.equal(result.metrics[0].value, '300');
  assert.equal(result.partnerPerformance[0].amount, '$300');
  assert.notEqual(result, source);
});

test('selectPeriod ignores an unknown period', () => {
  const source = createDashboardState(fixture);
  const result = selectPeriod(source, 'unknown');

  assert.equal(result, source);
});

test('selectDemoState only accepts supported showcase states', () => {
  const source = createDashboardState(fixture);
  const empty = selectDemoState(source, 'empty');

  assert.equal(empty.demoState, 'empty');
  assert.equal(selectDemoState(source, 'unknown'), source);
});

test('toggleNavigationGroup expands and collapses the same group immutably', () => {
  const source = createDashboardState(fixture);
  const expanded = toggleNavigationGroup(source, 'reports');
  const collapsed = toggleNavigationGroup(expanded, 'reports');

  assert.deepEqual(source.expandedGroups, []);
  assert.deepEqual(expanded.expandedGroups, ['reports']);
  assert.deepEqual(collapsed.expandedGroups, []);
});
