import test from 'node:test';
import assert from 'node:assert/strict';

import {
  createRecruitmentState,
  filterRecruitmentRecords,
  getRecruitmentPage,
  recruitmentData,
  recruitmentPageIds,
  selectRecruitmentTab,
} from '../recruitment.mjs';

test('recruitment group exposes the five navigable page contracts', () => {
  assert.deepEqual(recruitmentPageIds, [
    'discover-influencers',
    'discover-publishers',
    'my-partners',
    'applications',
    'invite-history',
  ]);

  assert.equal(getRecruitmentPage('discover-influencers').title, 'Discover influencers');
  assert.equal(getRecruitmentPage('discover-publishers').title, 'Discover publishers');
  assert.equal(getRecruitmentPage('my-partners').stats.length, 5);
  assert.equal(getRecruitmentPage('applications').tabs.length, 4);
  assert.equal(getRecruitmentPage('invite-history').columns.length, 6);
});

test('recruitment records filter by search query and structured criteria', () => {
  const results = filterRecruitmentRecords(recruitmentData.partners, {
    query: 'alpha',
    filters: { status: 'In relationship', type: 'Publisher' },
  });

  assert.deepEqual(results.map((record) => record.id), ['alpha-media']);
});

test('recruitment tab selection is immutable and scoped to one page', () => {
  const source = createRecruitmentState();
  const next = selectRecruitmentTab(source, 'applications', 'under-review');

  assert.equal(source.tabs.applications, 'new');
  assert.equal(next.tabs.applications, 'under-review');
  assert.equal(next.tabs['my-partners'], 'joined');
  assert.notEqual(next, source);
});
