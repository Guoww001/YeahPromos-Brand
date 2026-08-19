import test from 'node:test';
import assert from 'node:assert/strict';
import * as operations from '../operations.mjs';
import { renderOperationsPage } from '../operations-renderers.mjs';

test('Campaigns 子页面挂载到现有模块路由并保留页面标题契约', () => {
  assert.equal(operations.getOperationsPage('affiliate-programs').parent, 'Campaigns');
  assert.equal(operations.getOperationsPage('affiliate-programs').title, 'Affiliate programs');
  assert.equal(operations.getOperationsPage('influencer-campaigns').parent, 'Campaigns');
  assert.equal(operations.getOperationsPage('influencer-campaigns').title, 'Influencer campaigns');
});

test('Campaigns 子页面状态更新保持不可变且互不串页', () => {
  const initial = operations.createOperationsState();
  const opened = operations.toggleOperationsFilters(initial, 'affiliate-programs');
  const selected = operations.selectOperationsRecord(opened, 'affiliate-programs', 'program-tech');
  const filtered = operations.updateOperationsFilter(selected, 'influencer-campaigns', 'platform', 'Instagram');

  assert.equal(initial.affiliatePrograms.filtersOpen, false);
  assert.equal(opened.affiliatePrograms.filtersOpen, true);
  assert.equal(selected.affiliatePrograms.selectedId, 'program-tech');
  assert.equal(filtered.influencerCampaigns.filters.platform, 'Instagram');
  assert.equal(filtered.affiliatePrograms.selectedId, 'program-tech');
});

test('Affiliate programs 排序与 Influencer campaigns 预算筛选改变可见记录', () => {
  const programs = [
    { id: 'a', partners: '18', commission: '12%' },
    { id: 'b', partners: '86', commission: '20%' },
  ];
  const campaigns = [
    { id: 'small', name: 'Small campaign', status: 'Live', category: 'Beauty & Personal Care', platforms: ['Instagram'], budget: '$4,500', dateRangeKey: 'May 05 – May 12, 2025' },
    { id: 'large', name: 'Large campaign', status: 'Live', category: 'Beauty & Personal Care', platforms: ['Instagram'], budget: '$12,000', dateRangeKey: 'May 05 – May 12, 2025' },
  ];

  assert.deepEqual(operations.sortAffiliateProgramRecords(programs, 'Most partners').map((record) => record.id), ['b', 'a']);
  assert.deepEqual(operations.sortAffiliateProgramRecords(programs, 'Highest commission').map((record) => record.id), ['b', 'a']);
  assert.deepEqual(operations.filterInfluencerCampaignRecords(campaigns, {
    filters: { budget: 'Under $5,000', date: 'May 05 – May 12, 2025' },
    tab: 'live',
  }).map((record) => record.id), ['small']);
});

test('两个 Campaigns 页面渲染头像、双视频封面与详情操作钩子', () => {
  const state = operations.createOperationsState();
  const programs = renderOperationsPage('affiliate-programs', { pageState: state.affiliatePrograms });
  const campaigns = renderOperationsPage('influencer-campaigns', { pageState: state.influencerCampaigns });
  const campaignFiltersOpen = renderOperationsPage('influencer-campaigns', {
    pageState: operations.toggleOperationsFilters(state, 'influencer-campaigns').influencerCampaigns,
  });

  assert.match(programs, /class="program-card/);
  assert.match(programs, /data-campaign-support-action="view-program"/);
  assert.match(campaigns, /class="influencer-card__avatar/);
  assert.equal((campaigns.match(/class="influencer-card__video-cover/g) ?? []).length, operations.influencerCampaignRecords.filter((record) => record.status === 'Live').length * 2);
  assert.match(campaigns, /data-campaign-support-action="view-campaign"/);
  assert.match(campaignFiltersOpen, /data-campaign-support-filter-panel/);
});
