import test from 'node:test';
import assert from 'node:assert/strict';

import {
  applyMerchant,
  createDashboardState,
  selectPeriod,
  toggleNavigationGroup,
} from '../app-core.mjs';

const fixture = {
  periods: [
    { id: '7d', label: 'Last 7 days' },
    { id: '30d', label: 'Last 30 days' },
  ],
  merchants: [
    { id: 'appsumo', name: 'AppSumo', applied: false },
    { id: 'briefcase', name: 'Briefcase', applied: false },
  ],
};

test('createDashboardState uses the first period and clones source data', () => {
  const source = structuredClone(fixture);
  const state = createDashboardState(source);

  assert.equal(state.selectedPeriod, '7d');
  assert.deepEqual(state.expandedGroups, []);
  assert.equal(state.activeMerchantId, null);
  assert.notEqual(state.merchants, source.merchants);

  state.merchants[0].name = 'Changed';
  assert.equal(source.merchants[0].name, 'AppSumo');
});

test('selectPeriod updates the selected period without mutating source state', () => {
  const source = createDashboardState(fixture);
  const result = selectPeriod(source, '30d');

  assert.equal(source.selectedPeriod, '7d');
  assert.equal(result.selectedPeriod, '30d');
  assert.notEqual(result, source);
});

test('selectPeriod ignores an unknown period', () => {
  const source = createDashboardState(fixture);
  const result = selectPeriod(source, 'unknown');

  assert.equal(result, source);
});

test('toggleNavigationGroup expands and collapses the same group immutably', () => {
  const source = createDashboardState(fixture);
  const expanded = toggleNavigationGroup(source, 'reports');
  const collapsed = toggleNavigationGroup(expanded, 'reports');

  assert.deepEqual(source.expandedGroups, []);
  assert.deepEqual(expanded.expandedGroups, ['reports']);
  assert.deepEqual(collapsed.expandedGroups, []);
});

test('applyMerchant marks the merchant as applied and returns matching feedback', () => {
  const source = createDashboardState(fixture);
  const result = applyMerchant(source, 'appsumo');

  assert.equal(source.merchants[0].applied, false);
  assert.equal(result.state.merchants[0].applied, true);
  assert.equal(result.message, 'Application sent to AppSumo');
});

test('applyMerchant leaves state untouched when merchant does not exist', () => {
  const source = createDashboardState(fixture);
  const result = applyMerchant(source, 'missing');

  assert.equal(result.state, source);
  assert.equal(result.message, 'Merchant not found');
});
