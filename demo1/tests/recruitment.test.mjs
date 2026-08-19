import test from 'node:test';
import assert from 'node:assert/strict';

import * as recruitment from '../recruitment.mjs';

import {
  applyRecruitmentAction,
  createRecruitmentState,
  cycleRecruitmentFeatured,
  filterRecruitmentRecords,
  getRecruitmentRecordGroup,
  getRecruitmentRecordStatus,
  getRecruitmentPage,
  recruitmentData,
  recruitmentPageIds,
  selectRecruitmentTab,
  setRecruitmentInvitePage,
  toggleRecruitmentMessage,
  updateRecruitmentGroup,
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

test('recruitment active criteria expose selected filters and search context', () => {
  const source = {
    ...createRecruitmentState(),
    filters: { category: 'Coupons', status: 'All status' },
    search: 'deal',
  };

  const activeCriteria = typeof recruitment.getRecruitmentActiveCriteria === 'function'
    ? recruitment.getRecruitmentActiveCriteria(source, getRecruitmentPage('discover-publishers'))
    : undefined;

  assert.deepEqual(activeCriteria, [
    { id: 'category', label: 'Category', value: 'Coupons' },
    { id: 'search', label: 'Search', value: 'deal' },
  ]);
});

test('recruitment criteria can be cleared without touching relationship actions', () => {
  const source = {
    ...createRecruitmentState(),
    filters: { category: 'Coupons', channel: 'Email' },
    search: 'deal',
    followedIds: ['alpha-media'],
  };

  const clearedFilter = typeof recruitment.clearRecruitmentCriterion === 'function'
    ? recruitment.clearRecruitmentCriterion(source, 'category')
    : undefined;
  const clearedSearch = typeof recruitment.clearRecruitmentCriterion === 'function'
    ? recruitment.clearRecruitmentCriterion(clearedFilter, 'search')
    : undefined;

  assert.deepEqual(clearedFilter?.filters, { channel: 'Email' });
  assert.equal(clearedSearch?.search, '');
  assert.deepEqual(clearedSearch?.followedIds, ['alpha-media']);
  assert.deepEqual(source.filters, { category: 'Coupons', channel: 'Email' });
});

test('recruitment view reset clears view context while preserving relationship actions', () => {
  const source = {
    ...createRecruitmentState(),
    filters: { category: 'Coupons', channel: 'Email' },
    search: 'deal',
    sort: 'name',
    invitePage: 2,
    invitePageSize: 10,
    followedIds: ['alpha-media'],
    invitedIds: ['peak-insights'],
  };

  const next = typeof recruitment.resetRecruitmentView === 'function'
    ? recruitment.resetRecruitmentView(source)
    : undefined;

  assert.deepEqual(next?.filters, {});
  assert.equal(next?.search, '');
  assert.equal(next?.sort, 'relevance');
  assert.equal(next?.invitePage, 1);
  assert.equal(next?.invitePageSize, 10);
  assert.deepEqual(next?.followedIds, ['alpha-media']);
  assert.deepEqual(next?.invitedIds, ['peak-insights']);
  assert.notEqual(next, source);
});

test('recruitment tab selection is immutable and scoped to one page', () => {
  const source = createRecruitmentState();
  const next = selectRecruitmentTab(source, 'applications', 'under-review');

  assert.equal(source.tabs.applications, 'new');
  assert.equal(next.tabs.applications, 'under-review');
  assert.equal(next.tabs['my-partners'], 'joined');
  assert.notEqual(next, source);
});

test('recruitment actions persist follow, invite and application decisions immutably', () => {
  const source = createRecruitmentState();
  const followed = applyRecruitmentAction(source, 'follow', 'alpha-media');
  const invited = applyRecruitmentAction(followed, 'invite', 'alpha-media');
  const approved = applyRecruitmentAction(invited, 'approve', 'trendlens-media');

  assert.deepEqual(source.followedIds, []);
  assert.deepEqual(approved.followedIds, ['alpha-media']);
  assert.deepEqual(approved.invitedIds, ['alpha-media']);
  assert.equal(getRecruitmentRecordStatus(followed, recruitmentData.partners[0]), 'Followed');
  assert.equal(getRecruitmentRecordStatus(approved, recruitmentData.applications[0]), 'approved');
  assert.notEqual(approved, source);
});

test('partner group and application message expansion are selectable local state', () => {
  const source = createRecruitmentState();
  const grouped = updateRecruitmentGroup(source, 'alpha-media', 'Creator network');
  const expanded = toggleRecruitmentMessage(grouped, 'trendlens-media');

  assert.equal(getRecruitmentRecordGroup(expanded, recruitmentData.partners[0]), 'Creator network');
  assert.deepEqual(expanded.expandedMessageIds, ['trendlens-media']);
  assert.deepEqual(toggleRecruitmentMessage(expanded, 'trendlens-media').expandedMessageIds, []);
});

test('featured carousel and invite history page state stay within available bounds', () => {
  const source = createRecruitmentState();
  const next = cycleRecruitmentFeatured(source, 'discover-publishers', 1, 8, 3);
  const last = cycleRecruitmentFeatured(next, 'discover-publishers', 20, 8, 3);
  const first = cycleRecruitmentFeatured(last, 'discover-publishers', -20, 8, 3);
  const paged = setRecruitmentInvitePage(first, 2, 3);

  assert.equal(next.featuredOffsets['discover-publishers'], 1);
  assert.equal(last.featuredOffsets['discover-publishers'], 5);
  assert.equal(first.featuredOffsets['discover-publishers'], 0);
  assert.equal(paged.invitePage, 2);
  assert.equal(paged.invitePageSize, 3);
});
