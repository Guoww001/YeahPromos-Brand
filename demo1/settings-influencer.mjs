const page = (id, title, parent, description) => ({ id, title, label: title, parent, description });

export const targetPages = [
  page('influencer-campaigns', 'Influencer campaigns', 'Campaigns', 'Plan creator partnerships, track deliverables, and keep campaign spend visible.'),
  page('workspace-settings', 'Workspace settings', 'Settings', 'Manage your workspace profile, regional defaults, and notification preferences.'),
];

export const influencerCampaignRecords = [
  { id: 'inf-skin', name: 'Summer Glow Skincare', category: 'Beauty & Personal Care', platforms: ['Instagram', 'TikTok'], creators: '32', deliverables: '4', budget: '$8,000', budgetPercent: 68, status: 'Live', tone: 'success', date: 'May 05 – May 22', dateRangeKey: 'May 05 – May 12, 2025', markTone: 'sand', avatar: { initials: 'SG', tone: 'sand' }, videos: [{ title: 'Glow routine', views: '18.4K', date: 'May 06', tone: 'sand', mark: 'GLOW' }, { title: 'Texture test', views: '12.8K', date: 'May 04', tone: 'linen', mark: 'TEST' }] },
  { id: 'inf-fitness', name: 'Fit & Strong Challenge', category: 'Health & Fitness', platforms: ['Instagram', 'TikTok'], creators: '45', deliverables: '6', budget: '$12,000', budgetPercent: 55, status: 'Live', tone: 'success', date: 'May 01 – May 28', dateRangeKey: 'May 05 – May 12, 2025', markTone: 'slate', avatar: { initials: 'FS', tone: 'slate' }, videos: [{ title: 'Challenge prep', views: '22.6K', date: 'May 03', tone: 'slate', mark: 'MOVE' }, { title: 'Workout recap', views: '16.9K', date: 'May 01', tone: 'blue', mark: 'RECAP' }] },
  { id: 'inf-spring', name: 'Spring Collection Launch', category: 'Fashion', platforms: ['Instagram', 'TikTok', 'YouTube'], creators: '28', deliverables: '5', budget: '$10,000', budgetPercent: 62, status: 'Live', tone: 'success', date: 'Apr 28 – May 20', dateRangeKey: 'Apr 28 – May 04, 2025', markTone: 'linen', avatar: { initials: 'SC', tone: 'linen' }, videos: [{ title: 'Spring lookbook', views: '31.2K', date: 'Apr 30', tone: 'linen', mark: 'LOOK' }, { title: 'New arrivals', views: '20.5K', date: 'Apr 28', tone: 'sand', mark: 'NEW' }] },
  { id: 'inf-work', name: 'Work From Anywhere', category: 'Tech & Electronics', platforms: ['YouTube', 'Instagram'], creators: '20', deliverables: '4', budget: '$6,500', budgetPercent: 31, status: 'Live', tone: 'success', date: 'Apr 20 – May 16', dateRangeKey: 'Apr 28 – May 04, 2025', markTone: 'sand', avatar: { initials: 'WA', tone: 'sand' }, videos: [{ title: 'Desk setup', views: '14.7K', date: 'Apr 25', tone: 'blue', mark: 'DESK' }, { title: 'Remote kit', views: '11.1K', date: 'Apr 22', tone: 'slate', mark: 'KIT' }] },
  { id: 'inf-beach', name: 'Summer Getaway', category: 'Travel', platforms: ['Instagram'], creators: '18', deliverables: '3', budget: '$7,000', budgetPercent: 44, status: 'Upcoming', tone: 'warning', date: 'Starts May 20, 2025', dateRangeKey: 'Apr 21 – Apr 27, 2025', markTone: 'blue', avatar: { initials: 'SG', tone: 'blue' }, videos: [{ title: 'Beach edit', views: '9.8K', date: 'May 20', tone: 'blue', mark: 'TRIP' }, { title: 'Travel diary', views: '7.4K', date: 'May 21', tone: 'linen', mark: 'DIARY' }] },
  { id: 'inf-eating', name: 'Clean Eating Week', category: 'Food & Beverage', platforms: ['Instagram', 'TikTok'], creators: '25', deliverables: '5', budget: '$5,000', budgetPercent: 0, status: 'Upcoming', tone: 'warning', date: 'Starts May 25, 2025', dateRangeKey: 'Apr 21 – Apr 27, 2025', markTone: 'green', avatar: { initials: 'CE', tone: 'green' }, videos: [{ title: 'Meal prep', views: '13.1K', date: 'May 25', tone: 'green', mark: 'PREP' }, { title: 'Week reset', views: '10.6K', date: 'May 26', tone: 'sand', mark: 'RESET' }] },
  { id: 'inf-camera', name: 'Capture The Moment', category: 'Photography', platforms: ['Instagram'], creators: '15', deliverables: '3', budget: '$3,500', budgetPercent: 0, status: 'Draft', tone: 'neutral', date: 'Last edited May 08, 2025', dateRangeKey: 'Apr 21 – Apr 27, 2025', markTone: 'slate', avatar: { initials: 'CM', tone: 'slate' }, videos: [{ title: 'Portrait tips', views: '8.4K', date: 'May 08', tone: 'slate', mark: 'TIPS' }, { title: 'Shoot notes', views: '6.9K', date: 'May 07', tone: 'linen', mark: 'NOTES' }] },
  { id: 'inf-home', name: 'Home Comforts', category: 'Home & Living', platforms: ['Instagram', 'YouTube'], creators: '22', deliverables: '4', budget: '$6,000', budgetPercent: 0, status: 'Draft', tone: 'neutral', date: 'Last edited Apr 28, 2025', dateRangeKey: 'Apr 21 – Apr 27, 2025', markTone: 'linen', avatar: { initials: 'HC', tone: 'linen' }, videos: [{ title: 'Home reset', views: '12.2K', date: 'Apr 28', tone: 'linen', mark: 'RESET' }, { title: 'Room edit', views: '9.5K', date: 'Apr 27', tone: 'green', mark: 'EDIT' }] },
  { id: 'inf-fragrance', name: 'Fragrance Favorites', category: 'Beauty & Personal Care', platforms: ['Instagram', 'TikTok'], creators: '30', deliverables: '5', budget: '$9,000', budgetPercent: 100, status: 'Completed', tone: 'neutral', date: 'Completed Apr 30, 2025', dateRangeKey: 'Apr 21 – Apr 27, 2025', markTone: 'sand', avatar: { initials: 'FF', tone: 'sand' }, videos: [{ title: 'Layering guide', views: '19.7K', date: 'Apr 30', tone: 'sand', mark: 'LAYER' }, { title: 'Scent story', views: '15.3K', date: 'Apr 29', tone: 'blue', mark: 'STORY' }] },
];

export const workspaceSettingsDefaults = {
  workspaceName: 'Demo1',
  storeName: 'US Store',
  displayName: 'Demo1 Team',
  website: 'https://www.demo1store.com',
  businessEmail: 'team@demo1store.com',
  supportEmail: 'support@demo1store.com',
  country: 'United States',
  industry: 'Retail',
  companySize: '51–200 employees',
  description: 'Demo1 is a modern eCommerce brand offering quality products and exceptional customer experiences.',
  timeZone: '(GMT-07:00) Pacific Time (US & Canada)',
  currency: 'USD – US Dollar ($)',
};

const targetStateKey = {
  'influencer-campaigns': 'influencerCampaigns',
  'workspace-settings': 'workspaceSettings',
};

export function getTargetPage(pageId) {
  return targetPages.find((targetPage) => targetPage.id === pageId) ?? null;
}

export function getTargetStateKey(pageId) {
  return targetStateKey[pageId] ?? pageId;
}

export function createTargetState() {
  return {
    influencerCampaigns: {
      query: '',
      filters: { category: 'All categories', platform: 'All platforms', budget: 'Any budget', date: 'May 05 – May 12, 2025' },
      selectedId: null,
      filtersOpen: false,
      tab: 'live',
    },
    workspaceSettings: {
      filters: {
        country: workspaceSettingsDefaults.country,
        industry: workspaceSettingsDefaults.industry,
        companySize: workspaceSettingsDefaults.companySize,
        timeZone: workspaceSettingsDefaults.timeZone,
        currency: workspaceSettingsDefaults.currency,
      },
      preferences: { account: true, campaign: true, marketing: false },
      tab: 'profile',
    },
  };
}

const numericValue = (value) => Number(String(value ?? '').replace(/[^\d.]/g, '')) || 0;

export function filterInfluencerCampaignRecords(records, { query = '', filters = {}, tab = 'all' } = {}) {
  const normalizedQuery = String(query ?? '').trim().toLowerCase();
  const budget = String(filters.budget ?? '');
  return records.filter((record) => {
    const searchable = [record.name, record.category, ...record.platforms, record.status].join(' ').toLowerCase();
    const matchesQuery = !normalizedQuery || searchable.includes(normalizedQuery);
    const matchesCategory = !filters.category || /^all\b/i.test(filters.category) || record.category === filters.category;
    const matchesPlatform = !filters.platform || /^all\b/i.test(filters.platform) || record.platforms.includes(filters.platform);
    const matchesTab = tab === 'all' || record.status.toLowerCase() === tab;
    const budgetValue = numericValue(record.budget);
    const matchesBudget = !budget || /^any\b/i.test(budget) || (budget === 'Under $5,000' && budgetValue < 5000) || (budget === '$5,000 – $10,000' && budgetValue >= 5000 && budgetValue <= 10000) || (budget === 'Over $10,000' && budgetValue > 10000);
    const matchesDate = !filters.date || filters.date === 'May 05 – May 12, 2025' || record.dateRangeKey === filters.date;
    return matchesQuery && matchesCategory && matchesPlatform && matchesTab && matchesBudget && matchesDate;
  });
}

function updateTargetPage(state, pageId, updater) {
  const key = getTargetStateKey(pageId);
  if (!state[key]) return state;
  return { ...state, [key]: updater(state[key]) };
}

export function updateTargetSearch(state, pageId, query) {
  return updateTargetPage(state, pageId, (pageState) => ({ ...pageState, query: String(query ?? '') }));
}

export function updateTargetFilter(state, pageId, filterKey, value) {
  return updateTargetPage(state, pageId, (pageState) => ({ ...pageState, filters: { ...pageState.filters, [filterKey]: value } }));
}

export function selectTargetTab(state, pageId, tab) {
  return updateTargetPage(state, pageId, (pageState) => ({ ...pageState, tab: tab ?? pageState.tab }));
}

export function selectTargetRecord(state, pageId, recordId) {
  return updateTargetPage(state, pageId, (pageState) => ({ ...pageState, selectedId: pageState.selectedId === recordId ? null : recordId }));
}

export function toggleTargetFilters(state, pageId) {
  return updateTargetPage(state, pageId, (pageState) => ({ ...pageState, filtersOpen: !pageState.filtersOpen }));
}

export function resetTargetFilters(state, pageId) {
  const initialState = createTargetState()[getTargetStateKey(pageId)];
  if (!initialState?.filters) return state;
  return updateTargetPage(state, pageId, (pageState) => ({ ...pageState, query: '', filters: { ...initialState.filters }, selectedId: null, filtersOpen: false }));
}

export function toggleTargetPreference(state, pageId, preferenceKey) {
  return updateTargetPage(state, pageId, (pageState) => {
    if (!(preferenceKey in pageState.preferences)) return pageState;
    return { ...pageState, preferences: { ...pageState.preferences, [preferenceKey]: !pageState.preferences[preferenceKey] } };
  });
}
