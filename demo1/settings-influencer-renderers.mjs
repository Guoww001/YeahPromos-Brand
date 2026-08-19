import {
  filterInfluencerCampaignRecords,
  influencerCampaignRecords,
  workspaceSettingsDefaults,
} from './settings-influencer.mjs';

const fallbackEscape = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

const escape = (value, escapeHtml) => (escapeHtml ? escapeHtml(value) : fallbackEscape(value));
const iconFor = (name, icon) => (icon ? icon(name) : `<span class="target-icon target-icon--${name}" aria-hidden="true"></span>`);

const selectControl = ({ pageId, key, label, value, options, className = '' }) => `
  <label class="target-select ${className}">
    <span>${label}</span>
    <select data-target-filter data-target-page-id="${pageId}" data-target-filter-key="${key}">
      ${options.map((option) => `<option value="${option}"${option === value ? ' selected' : ''}>${option}</option>`).join('')}
    </select>
  </label>`;

const targetButton = (label, action, { pageId, primary = false, recordId = '', icon = '' } = {}) => `
  <button class="target-button${primary ? ' target-button--primary' : ''}" type="button" data-target-action="${action}" data-target-page-id="${pageId ?? ''}"${recordId ? ` data-target-record-id="${recordId}"` : ''}>
    ${icon ? `<span class="target-button__icon">${iconFor(icon)}</span>` : ''}<span>${label}</span>
  </button>`;

const renderInfluencerToolbar = (pageState, { icon }) => `
  <div class="target-toolbar">
    <div>
      <span class="target-eyebrow">Creator campaigns</span>
      <h2>Influencer campaigns</h2>
      <p>Plan creator partnerships, track deliverables, and keep campaign spend visible.</p>
    </div>
    ${targetButton('Create campaign', 'create-influencer-campaign', { pageId: 'influencer-campaigns', primary: true, icon: 'users' })}
  </div>
  <div class="target-tabs" role="tablist" aria-label="Influencer campaign status">
    ${[['live', 'Live'], ['upcoming', 'Upcoming'], ['draft', 'Draft'], ['completed', 'Completed']].map(([value, label]) => `<button type="button" role="tab" aria-selected="${pageState.tab === value}" class="target-tab${pageState.tab === value ? ' is-active' : ''}" data-target-tab data-target-page-id="influencer-campaigns" data-target-tab-value="${value}">${label}</button>`).join('')}
  </div>`;

const renderInfluencerPage = (pageState, { icon, escapeHtml }) => {
  const records = filterInfluencerCampaignRecords(influencerCampaignRecords, { query: pageState.query, filters: pageState.filters, tab: pageState.tab });
  return `
    <div class="target-workspace target-workspace--influencer" data-target-page="influencer-campaigns">
      ${renderInfluencerToolbar(pageState, { icon })}
      <div class="target-filterbar">
        ${selectControl({ pageId: 'influencer-campaigns', key: 'category', label: 'Category', value: pageState.filters.category, options: ['All categories', 'Beauty & Personal Care', 'Health & Fitness', 'Fashion', 'Tech & Electronics', 'Travel', 'Food & Beverage', 'Photography', 'Home & Living'] })}
        ${selectControl({ pageId: 'influencer-campaigns', key: 'platform', label: 'Platform', value: pageState.filters.platform, options: ['All platforms', 'Instagram', 'TikTok', 'YouTube'] })}
        ${selectControl({ pageId: 'influencer-campaigns', key: 'budget', label: 'Budget', value: pageState.filters.budget, options: ['Any budget', 'Under $5,000', '$5,000 – $10,000', 'Over $10,000'] })}
        <form class="target-search" data-target-search-form data-target-page-id="influencer-campaigns">
          <label><span class="sr-only">Search campaigns</span><input data-target-search placeholder="Search campaigns" value="${escape(pageState.query, escapeHtml)}" /></label>
          <button type="submit" aria-label="Search campaigns">${iconFor('search', icon)}</button>
        </form>
        ${targetButton(pageState.filtersOpen ? 'Close filters' : 'Filter focus', 'toggle-influencer-filters', { pageId: 'influencer-campaigns' })}
        ${targetButton('Reset', 'reset-influencer-filters', { pageId: 'influencer-campaigns' })}
      </div>
      ${pageState.filtersOpen ? `<div class="target-filter-panel" data-target-filter-panel><span>Filter focus</span><strong>${records.length} campaigns match your view</strong><small>Use the controls above to refine platform, budget, or category.</small></div>` : ''}
      <div class="target-result-heading"><div><span class="target-eyebrow">Campaign directory</span><h3>${records.length} campaigns in this view</h3></div><span>${influencerCampaignRecords.length} total campaigns</span></div>
      <div class="target-influencer-grid">
        ${records.length ? records.map((record, index) => `
          <article class="target-influencer-card${pageState.selectedId === record.id ? ' is-selected' : ''}" style="--target-card-index:${index}" data-target-record-id="${record.id}">
            <div class="target-influencer-card__profile">
              <div class="target-influencer-avatar target-influencer-avatar--${record.avatar.tone}">${escape(record.avatar.initials, escapeHtml)}</div>
              <span class="target-influencer-favorite" aria-hidden="true">♡</span>
            </div>
            <div class="target-influencer-card__body">
              <div class="target-influencer-card__heading"><div><h3>${escape(record.name, escapeHtml)}</h3><span>${escape(record.date, escapeHtml)}</span></div><span class="target-status target-status--${record.tone}">${record.status}</span></div>
              <div class="target-influencer-card__tags"><span>${escape(record.category, escapeHtml)}</span>${record.platforms.map((platform) => `<span>${escape(platform, escapeHtml)}</span>`).join('')}</div>
              <div class="target-influencer-card__meta"><span>${iconFor('users', icon)}<strong>${record.creators}</strong><small>creators</small></span><span>${iconFor('tag', icon)}<strong>${record.deliverables}</strong><small>deliverables</small></span><span>${iconFor('wallet', icon)}<strong>${record.budget}</strong><small>budget</small></span></div>
              <div class="target-influencer-card__footer"><div class="target-progress"><div><span>Budget used</span><strong>${record.budgetPercent}%</strong></div><span><i style="width:${record.budgetPercent}%"></i></span></div>${targetButton('View campaign', 'view-influencer-campaign', { pageId: 'influencer-campaigns', recordId: record.id, icon: 'arrow' })}</div>
            </div>
            <div class="target-influencer-card__videos" aria-label="Related videos">${record.videos.map((video) => `<figure class="target-influencer-video"><div class="target-influencer-video__cover target-influencer-video__cover--${video.tone}"><span>${escape(video.mark, escapeHtml)}</span><i aria-hidden="true"></i><strong>${escape(video.title, escapeHtml)}</strong></div><figcaption><span>▶ ${escape(video.views, escapeHtml)}</span><time>${escape(video.date, escapeHtml)}</time></figcaption></figure>`).join('')}</div>
          </article>`).join('') : '<div class="target-empty"><strong>No campaigns match these filters</strong><span>Try clearing a filter or using a broader search.</span></div>'}
      </div>
    </div>`;
};

const preferenceRows = [
  ['account', 'Account activity', 'Workspace changes, access and security alerts'],
  ['campaign', 'Campaign updates', 'Budget, deliverable and approval updates'],
  ['marketing', 'Product news', 'New tools, guides and partner growth tips'],
];

const renderSettingsPage = (pageState, { icon, escapeHtml }) => `
  <div class="target-workspace target-workspace--settings" data-target-page="workspace-settings">
    <div class="target-toolbar"><div><span class="target-eyebrow">Workspace control</span><h2>Workspace settings</h2><p>Manage your workspace profile, regional defaults, and notification preferences.</p></div></div>
    <div class="target-settings-layout">
      <nav class="target-settings-rail" aria-label="Settings sections">
        ${[['profile', 'Workspace profile', 'store'], ['notifications', 'Notifications', 'bell'], ['security', 'Security', 'check'], ['regional', 'Regional settings', 'globe'], ['billing', 'Billing preferences', 'wallet']].map(([value, label, iconName]) => `<button class="target-settings-rail__item${pageState.tab === value ? ' is-active' : ''}" type="button" data-target-settings-tab="${value}">${iconFor(iconName, icon)}<span>${label}</span></button>`).join('')}
      </nav>
      <div class="target-settings-main">
        <section class="target-settings-panel"><div class="target-panel-heading"><span class="target-eyebrow">Profile details</span><h3>Workspace profile</h3></div><div class="target-settings-form-grid"><label><span>Workspace name</span><input value="${escape(workspaceSettingsDefaults.workspaceName, escapeHtml)}" /></label><label><span>Store name</span><input value="${escape(workspaceSettingsDefaults.storeName, escapeHtml)}" /></label><label><span>Display name</span><input value="${escape(workspaceSettingsDefaults.displayName, escapeHtml)}" /></label><label><span>Website</span><input value="${escape(workspaceSettingsDefaults.website, escapeHtml)}" /></label><label><span>Business email</span><input value="${escape(workspaceSettingsDefaults.businessEmail, escapeHtml)}" /></label><label><span>Support email</span><input value="${escape(workspaceSettingsDefaults.supportEmail, escapeHtml)}" /></label><label class="target-settings-form-grid__wide"><span>Workspace description</span><textarea rows="3">${escape(workspaceSettingsDefaults.description, escapeHtml)}</textarea></label></div></section>
        <section class="target-settings-panel"><div class="target-panel-heading"><span class="target-eyebrow">Used for reports and payouts</span><h3>Regional defaults</h3></div><div class="target-settings-form-grid target-settings-form-grid--regional">${selectControl({ pageId: 'workspace-settings', key: 'country', label: 'Country / region', value: pageState.filters.country, options: ['United States', 'Canada', 'United Kingdom'] })}${selectControl({ pageId: 'workspace-settings', key: 'industry', label: 'Industry', value: pageState.filters.industry, options: ['Retail', 'Beauty', 'Technology', 'Travel'] })}${selectControl({ pageId: 'workspace-settings', key: 'companySize', label: 'Company size', value: pageState.filters.companySize, options: ['1–10 employees', '11–50 employees', '51–200 employees', '201–500 employees'] })}${selectControl({ pageId: 'workspace-settings', key: 'timeZone', label: 'Time zone', value: pageState.filters.timeZone, options: ['(GMT-07:00) Pacific Time (US & Canada)', '(GMT-05:00) Eastern Time (US & Canada)', '(GMT+08:00) Beijing, Chongqing, Hong Kong'] })}${selectControl({ pageId: 'workspace-settings', key: 'currency', label: 'Currency', value: pageState.filters.currency, options: ['USD – US Dollar ($)', 'CAD – Canadian Dollar ($)', 'GBP – Pound Sterling (£)'] })}</div></section>
        <section class="target-settings-panel"><div class="target-panel-heading"><span class="target-eyebrow">Email and in-app notifications</span><h3>Notification preferences</h3></div><div class="target-settings-preferences">${preferenceRows.map(([key, label, description]) => `<div class="target-settings-preference"><div><strong>${label}</strong><span>${description}</span></div><button class="target-settings-toggle${pageState.preferences[key] ? ' is-on' : ''}" type="button" role="switch" aria-checked="${pageState.preferences[key]}" data-target-preference="${key}"><i></i><span class="sr-only">Toggle ${label}</span></button></div>`).join('')}</div></section>
        <div class="target-settings-actions"><button type="button" class="target-button" data-target-action="cancel-settings" data-target-page-id="workspace-settings">Cancel</button>${targetButton('Save changes', 'save-settings', { pageId: 'workspace-settings', primary: true })}</div>
      </div>
    </div>
  </div>`;

export function renderTargetPage(pageId, { pageState, icon, escapeHtml } = {}) {
  if (pageId === 'influencer-campaigns') return renderInfluencerPage(pageState, { icon, escapeHtml });
  if (pageId === 'workspace-settings') return renderSettingsPage(pageState, { icon, escapeHtml });
  return '<div class="target-empty"><strong>Module unavailable</strong><span>This target workspace is not configured yet.</span></div>';
}
