import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { resolve } from 'node:path';
import {
  createTargetState,
  filterInfluencerCampaignRecords,
  influencerCampaignRecords,
  targetPages,
  toggleTargetPreference,
  updateTargetFilter,
} from '../settings-influencer.mjs';
import { renderTargetPage } from '../settings-influencer-renderers.mjs';

const demoDirectory = resolve(import.meta.dirname, '..');
const icon = (name) => `<svg data-icon="${name}"></svg>`;
const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

test('target routes are limited to influencer campaigns and workspace settings', () => {
  assert.deepEqual(targetPages.map(({ id }) => id), ['influencer-campaigns', 'workspace-settings']);
});

test('influencer records provide avatars and two related videos', () => {
  assert.ok(influencerCampaignRecords.length >= 4);
  assert.ok(influencerCampaignRecords.every((record) => record.avatar && record.videos?.length === 2));
});

test('influencer filters narrow records by category, platform, budget, and tab', () => {
  const filtered = filterInfluencerCampaignRecords(influencerCampaignRecords, {
    query: 'glow',
    filters: { category: 'Beauty & Personal Care', platform: 'Instagram', budget: 'Under $5,000' },
    tab: 'live',
  });
  assert.deepEqual(filtered.map(({ id }) => id), []);

  const liveBeauty = filterInfluencerCampaignRecords(influencerCampaignRecords, {
    filters: { category: 'Beauty & Personal Care', platform: 'Instagram', budget: 'Any budget' },
    tab: 'live',
  });
  assert.deepEqual(liveBeauty.map(({ id }) => id), ['inf-skin']);
});

test('settings preferences update immutably without changing other target state', () => {
  const source = createTargetState();
  const next = toggleTargetPreference(source, 'workspace-settings', 'marketing');
  assert.equal(source.workspaceSettings.preferences.marketing, false);
  assert.equal(next.workspaceSettings.preferences.marketing, true);
  assert.notEqual(next, source);

  const filtered = updateTargetFilter(next, 'workspace-settings', 'currency', 'GBP – Pound Sterling (£)');
  assert.equal(filtered.workspaceSettings.filters.currency, 'GBP – Pound Sterling (£)');
  assert.equal(filtered.influencerCampaigns.tab, source.influencerCampaigns.tab);
});

test('influencer renderer keeps one-row cards with avatar and two video covers', () => {
  const state = createTargetState().influencerCampaigns;
  const rendered = renderTargetPage('influencer-campaigns', { pageState: state, icon, escapeHtml });
  const visibleRecords = filterInfluencerCampaignRecords(influencerCampaignRecords, state);
  assert.match(rendered, /data-target-page="influencer-campaigns"/);
  assert.equal((rendered.match(/class="target-influencer-card(?: |")/g) ?? []).length, visibleRecords.length);
  assert.equal((rendered.match(/class="target-influencer-video"/g) ?? []).length, visibleRecords.length * 2);
  assert.match(rendered, /data-target-action="view-influencer-campaign"/);
});

test('settings renderer exposes tabs, form fields, preference switches, and save action', () => {
  const state = createTargetState().workspaceSettings;
  const rendered = renderTargetPage('workspace-settings', { pageState: state, icon, escapeHtml });
  assert.match(rendered, /data-target-page="workspace-settings"/);
  assert.match(rendered, /data-target-settings-tab="profile"/);
  assert.match(rendered, /data-target-preference="marketing"/);
  assert.match(rendered, /data-target-action="save-settings"/);
});

test('index and app expose only the requested top utility interaction hooks', () => {
  const html = readFileSync(resolve(demoDirectory, 'index.html'), 'utf8');
  const app = readFileSync(resolve(demoDirectory, 'app.js'), 'utf8');
  assert.match(html, /data-header-action="messages"/);
  assert.match(html, /data-header-action="notifications"/);
  assert.match(html, /data-header-action="download"/);
  assert.match(html, /data-header-popover/);
  assert.match(app, /toggleHeaderActionPanel/);
  assert.match(app, /downloadReport/);
});

test('target influencer route takes precedence over the upstream campaign workspace', () => {
  const app = readFileSync(resolve(demoDirectory, 'app.js'), 'utf8');
  assert.match(app, /operationsPageSet\.has\(activePageId\) && !targetPage/);
  assert.match(app, /else if \(targetPage\) \{\s+renderTargetWorkspace\(targetPage\.id\);/);
});
