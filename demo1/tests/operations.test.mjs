import test from 'node:test';
import assert from 'node:assert/strict';
import { createOperationsState, filterOperationsRecords, getOperationsPage, operationsPageIds, selectOperationsRecord, selectOperationsTab, updateOperationsFilter, updateOperationsSearch } from '../operations.mjs';

test('data and transactions exposes its four routed workspace pages', () => {
  assert.deepEqual(operationsPageIds, ['performance', 'performance-brand', 'transactions', 'amazon-brb', 'affiliate-programs', 'influencer-campaigns']);
  assert.equal(getOperationsPage('performance').parent, 'Data & Transactions');
  assert.equal(getOperationsPage('performance-brand').title, 'Performance by brand');
  assert.equal(getOperationsPage('transactions').title, 'Transactions');
  assert.equal(getOperationsPage('amazon-brb').title, 'Amazon BRB');
});

test('operations filters match visible records without mutating source data', () => {
  const records = [
    { id: 'a', name: 'Alpha Media', status: 'Active', country: 'US' },
    { id: 'b', name: 'Beta House', status: 'Pending', country: 'UK' },
  ];
  const filtered = filterOperationsRecords(records, { query: 'alpha', filters: { status: 'Active' } });
  assert.deepEqual(filtered.map((record) => record.id), ['a']);
  assert.equal(records.length, 2);
  assert.equal(filterOperationsRecords(records, { query: 'missing' }).length, 0);
});

test('operations state updates remain local to the requested page', () => {
  const initial = createOperationsState();
  const withSearch = updateOperationsSearch(initial, 'transactions', 'order-1042');
  const withFilter = updateOperationsFilter(withSearch, 'transactions', 'status', 'Pending');
  const withSelection = selectOperationsRecord(withFilter, 'transactions', 'txn-1042');
  assert.equal(initial.transactions.query, '');
  assert.equal(withSelection.transactions.query, 'order-1042');
  assert.equal(withSelection.transactions.filters.status, 'Pending');
  assert.equal(withSelection.transactions.selectedId, 'txn-1042');
  assert.equal(withSelection.performance.query, '');
});

test('operations tabs update only the requested page', () => {
  const initial = createOperationsState();
  const next = selectOperationsTab(initial, 'performance', 'commission');
  assert.equal(initial.performance.tab, 'clicks');
  assert.equal(next.performance.tab, 'commission');
  assert.equal(next.transactions.tab, 'all');
});
