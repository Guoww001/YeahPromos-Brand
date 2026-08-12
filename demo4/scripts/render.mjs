import { brandPulseData } from './data.mjs';

const iconPaths = {
  home: ['M4 10.5 12 4l8 6.5V20H4z', 'M9 20v-6h6v6'],
  people: ['M16 20v-1.5a4 4 0 0 0-4-4H7a4 4 0 0 0-4 4V20', 'M9.5 10.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M17 5.2a3 3 0 0 1 0 5.6', 'M18 14.5a4 4 0 0 1 3 3.9V20'],
  campaign: ['M4 14V6l12-3v14L4 14z', 'M4 10H2', 'M8 15l1.5 5h3L11 15', 'M19 7l3-2', 'M19 12h3'],
  box: ['M4 7.5 12 3l8 4.5-8 4.5z', 'M4 7.5V17l8 4 8-4V7.5', 'M12 12v9'],
  rule: ['M5 4h14v5H5z', 'M5 15h14v5H5z', 'M9 9v6', 'M15 9v6'],
  chart: ['M4 20V10', 'M10 20V4', 'M16 20v-7', 'M22 20H2'],
  wallet: ['M3 7h18v13H3z', 'M3 7l3-4h12l3 4', 'M16 12h5v4h-5z'],
  message: ['M4 5h16v12H8l-4 4z', 'M8 9h8', 'M8 13h5'],
  settings: ['M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M19 13.5v-3l-2-.6-.7-1.7 1-1.9-2.1-2.1-1.9 1-1.8-.7L11 2H8l-.5 2.5-1.8.7-1.9-1-2.1 2.1 1 1.9L2 10v3l2.5.5.7 1.8-1 1.9 2.1 2.1 1.9-1 1.8.7.5 2.5h3l.6-2.5 1.7-.7 1.9 1 2.1-2.1-1-1.9z'],
  search: ['M10.5 18a7.5 7.5 0 1 1 0-15 7.5 7.5 0 0 1 0 15z', 'm16 16 5 5'],
  calendar: ['M4 6h16v14H4z', 'M8 3v6', 'M16 3v6', 'M4 10h16'],
  bell: ['M18 9a6 6 0 0 0-12 0c0 6-3 7-3 8h18c0-1-3-2-3-8', 'M10 21h4'],
  chevron: ['m7 10 5 5 5-5'],
  arrow: ['M5 12h14', 'm14 7 5 5-5 5'],
  collapse: ['M8 4 3 9l5 5', 'M16 4l5 5-5 5'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  close: ['m6 6 12 12', 'M18 6 6 18'],
  download: ['M12 3v12', 'm7 10 5 5 5-5', 'M4 20h16'],
  filter: ['M4 6h16', 'M7 12h10', 'M10 18h4'],
  check: ['m5 12 4 4L19 6'],
  alert: ['M12 3 2.7 5.1L20.5 19h-17L9.3 8.1z', 'M12 9v4', 'M12 16h.01'],
  plus: ['M12 5v14', 'M5 12h14'],
  command: ['M8 7a3 3 0 1 0-3 3h14a3 3 0 1 0-3-3v10a3 3 0 1 0 3-3H5a3 3 0 1 0 3 3z'],
  dots: ['M5 12h.01', 'M12 12h.01', 'M19 12h.01'],
};

function icon(name, size = 18) {
  const paths = iconPaths[name] ?? iconPaths.dots;
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">${paths.map((path) => `<path d="${path}"></path>`).join('')}</svg>`;
}

function escapeHtml(value = '') {
  return String(value).replace(/[&<>'"]/g, (character) => ({ '&': '&amp;', '<': '&lt;', '>': '&gt;', "'": '&#39;', '"': '&quot;' }[character]));
}

function nestedAction(label, attributes = '', tone = 'dark') {
  return `<button class="nested-action tone-${tone}" type="button" ${attributes}><span>${label}</span><i>${icon('arrow', 14)}</i></button>`;
}

function navGroup(item, state) {
  const activeChild = item.children?.some((child) => child.id === state.activePage);
  const active = state.activePage === item.id || activeChild;
  const expanded = state.expandedGroup === item.id;
  return `<div class="nav-group">
    <button class="nav-item ${active ? 'is-active' : ''}" type="button" data-page="${item.id}" aria-label="${item.label}" ${state.activePage === item.id ? 'aria-current="page"' : ''} ${item.children ? `data-group="${item.id}" aria-expanded="${expanded}"` : ''}>
      <span class="nav-icon">${icon(item.icon, 17)}</span><span class="nav-label">${item.label}</span>${item.alert ? '<i class="nav-alert"></i>' : ''}${item.badge ? `<b class="nav-count">${item.badge}</b>` : ''}${item.children ? `<span class="nav-chevron ${expanded ? 'is-open' : ''}">${icon('chevron', 13)}</span>` : ''}
    </button>
    ${item.children && expanded ? `<div class="nav-children">${item.children.map((child) => `<button class="nav-child ${child.id === state.activePage ? 'is-active' : ''}" type="button" data-page="${child.id}" aria-label="${child.label}" ${child.id === state.activePage ? 'aria-current="page"' : ''}><span>${child.label}</span>${child.alert ? '<i class="nav-alert"></i>' : ''}${child.badge ? `<b>${child.badge}</b>` : ''}</button>`).join('')}</div>` : ''}
  </div>`;
}

function renderSidebar(state) {
  return `<aside class="sidebar ${state.sidebarCollapsed ? 'is-collapsed' : ''} ${state.mobileNavOpen ? 'is-open' : ''}" aria-label="Primary navigation">
    <div class="sidebar-top"><div class="wordmark"><span>YEAH</span><b>P</b><span>ROMOS</span></div><button class="icon-control mobile-close" type="button" data-close-nav aria-label="Close navigation">${icon('close', 18)}</button></div>
    <button class="brand-scope" type="button" data-toast="Brand switcher opened"><span class="scope-mark">N</span><span class="scope-copy"><strong>Northstar Labs</strong><small>US Store · USD</small></span><span class="scope-arrow">${icon('chevron', 13)}</span></button>
    <p class="nav-caption">Workspace</p><nav>${brandPulseData.navigation.map((item) => navGroup(item, state)).join('')}</nav>
    <div class="sidebar-bottom"><button class="sidebar-collapse" type="button" data-collapse-sidebar><span>${icon('collapse', 16)}</span><span class="nav-label">Collapse sidebar</span></button><div class="operator"><span class="operator-avatar">G</span><span class="operator-copy"><strong>Guowv</strong><small>Brand Admin</small></span><i aria-label="Online"></i></div></div>
  </aside>`;
}

function pageContext(state) {
  if (state.activePage === 'overview') return { eyebrow: 'BRAND PULSE', title: 'Overview' };
  const view = brandPulseData.views[state.activePage];
  return { eyebrow: view.eyebrow, title: view.title };
}

function renderTopbar(state) {
  const context = pageContext(state);
  return `<header class="topbar">
    <button class="icon-control menu-control" type="button" data-open-nav aria-label="Open navigation">${icon('menu', 18)}</button>
    <div class="crumb"><span>${context.eyebrow}</span><strong>${context.title}</strong></div>
    <div class="topbar-actions">
      <button class="command-trigger" type="button" data-open-command aria-label="Search or jump to">${icon('search', 16)}<span>Search or jump to</span><kbd>⌘ K</kbd></button>
      <label class="period-control">${icon('calendar', 15)}<span class="sr-only">Date range</span><select data-period><option value="7d" ${state.selectedPeriod === '7d' ? 'selected' : ''}>Last 7 days</option><option value="30d" ${state.selectedPeriod === '30d' ? 'selected' : ''}>Last 30 days</option><option value="90d" ${state.selectedPeriod === '90d' ? 'selected' : ''}>Last 90 days</option></select>${icon('chevron', 12)}</label>
      <label class="demo-control"><span class="sr-only">Demo state</span><select data-demo-state><option value="normal" ${state.demoState === 'normal' ? 'selected' : ''}>Normal</option><option value="empty" ${state.demoState === 'empty' ? 'selected' : ''}>Empty</option><option value="loading" ${state.demoState === 'loading' ? 'selected' : ''}>Loading</option><option value="error" ${state.demoState === 'error' ? 'selected' : ''}>Error</option><option value="permission" ${state.demoState === 'permission' ? 'selected' : ''}>Permission</option><option value="success" ${state.demoState === 'success' ? 'selected' : ''}>Success</option></select>${icon('chevron', 12)}</label>
      <button class="icon-control bell-control" type="button" data-page="notifications" aria-label="Open notifications">${icon('bell', 17)}<i></i></button>
      <button class="account-control" type="button" data-toast="Account menu opened">G</button>
    </div>
    <div class="mobile-tools"><label>${icon('calendar', 14)}<select data-period aria-label="Mobile date range"><option value="7d" ${state.selectedPeriod === '7d' ? 'selected' : ''}>7 days</option><option value="30d" ${state.selectedPeriod === '30d' ? 'selected' : ''}>30 days</option><option value="90d" ${state.selectedPeriod === '90d' ? 'selected' : ''}>90 days</option></select></label><label><select data-demo-state aria-label="Mobile demo state"><option value="normal" ${state.demoState === 'normal' ? 'selected' : ''}>Normal</option><option value="empty" ${state.demoState === 'empty' ? 'selected' : ''}>Empty</option><option value="loading" ${state.demoState === 'loading' ? 'selected' : ''}>Loading</option><option value="error" ${state.demoState === 'error' ? 'selected' : ''}>Error</option><option value="permission" ${state.demoState === 'permission' ? 'selected' : ''}>Permission</option><option value="success" ${state.demoState === 'success' ? 'selected' : ''}>Success</option></select></label><button type="button" data-page="notifications" aria-label="Open notifications">${icon('bell', 14)}</button></div>
  </header>`;
}

function renderStateBanner(state) {
  const content = {
    error: ['Three catalog records did not sync.', 'Performance and partner data remain available.', 'Inspect records', 'product-feed', 'risk'],
    permission: ['Finance approval is restricted.', 'You can view this page; a Finance or Brand Admin role is required to change payouts.', 'Review access', 'team', 'attention'],
    success: ['Changes are published.', 'The working set and related partner views now use the latest settings.', 'View activity', 'notifications', 'positive'],
  }[state.demoState];
  if (!content) return '';
  return `<section class="state-banner tone-${content[4]}" role="status"><span>${icon(content[4] === 'risk' ? 'alert' : 'check', 17)}</span><div><strong>${content[0]}</strong><small>${content[1]}</small></div><button type="button" data-page="${content[3]}">${content[2]} ${icon('arrow', 13)}</button></section>`;
}

function lineGeometry(series, width = 800, height = 250) {
  const min = Math.min(...series);
  const max = Math.max(...series);
  const range = Math.max(max - min, 1);
  const points = series.map((value, index) => {
    const x = 18 + (index / (series.length - 1)) * (width - 36);
    const y = height - 24 - ((value - min) / range) * (height - 56);
    return [x, y];
  });
  return {
    polyline: points.map(([x, y]) => `${x.toFixed(1)},${y.toFixed(1)}`).join(' '),
    area: `M 18 ${height - 20} L ${points.map(([x, y]) => `${x.toFixed(1)} ${y.toFixed(1)}`).join(' L ')} L ${width - 18} ${height - 20} Z`,
    last: points.at(-1),
  };
}

function overviewMetric(state) {
  const period = brandPulseData.overview.periods[state.selectedPeriod];
  const labels = {
    sales: 'Gross sales',
    clicks: 'Clicks',
    orders: 'Orders',
    commission: 'Commission',
    conversion: 'Conversion',
    balance: 'Balance cover',
  };
  return period.metrics.find((metric) => metric.label === labels[state.selectedMetric]) ?? period.metrics[0];
}

function renderMetricRail(state) {
  const period = brandPulseData.overview.periods[state.selectedPeriod];
  const ids = { 'Gross sales': 'sales', Clicks: 'clicks', Orders: 'orders', Commission: 'commission', Conversion: 'conversion', 'Balance cover': 'balance' };
  return `<div class="metric-rail" role="list">${period.metrics.map((metric) => `<button class="metric-rail-item ${ids[metric.label] === state.selectedMetric ? 'is-active' : ''} tone-${metric.tone}" type="button" data-metric="${ids[metric.label] ?? 'sales'}" role="listitem"><span>${metric.label}</span><strong>${metric.value}</strong><small>${metric.delta}</small></button>`).join('')}</div>`;
}

function renderGrowthMetric(state) {
  const period = brandPulseData.overview.periods[state.selectedPeriod];
  const metric = overviewMetric(state);
  const series = period.series[state.selectedMetric];
  const geometry = lineGeometry(series);
  return `<section class="growth-shell bezel reveal" aria-labelledby="growth-title"><div class="bezel-core growth-core">
    <div class="growth-heading"><div><span class="eyebrow">PRIMARY SIGNAL</span><h2 id="growth-title">${metric.label}</h2></div><span class="period-note">${period.label}</span></div>
    <div class="growth-value"><strong>${state.demoState === 'empty' ? '—' : metric.value}</strong><span class="tone-${metric.tone}">${state.demoState === 'empty' ? 'No comparison' : `${metric.delta} vs previous period`}</span></div>
    <div class="growth-chart"><svg class="growth-ribbon" viewBox="0 0 800 250" preserveAspectRatio="none" aria-label="${metric.label} growth trajectory"><defs><linearGradient id="ribbon-fill" x1="0" x2="1"><stop offset="0" stop-color="#C9F5D8" stop-opacity=".7"></stop><stop offset=".58" stop-color="#F20A4F" stop-opacity=".23"></stop><stop offset="1" stop-color="#F20A4F" stop-opacity=".06"></stop></linearGradient></defs><path class="ribbon-area" d="${geometry.area}"></path><polyline class="ribbon-line" points="${geometry.polyline}"></polyline><circle cx="${geometry.last[0]}" cy="${geometry.last[1]}" r="5"></circle></svg><div class="chart-guides"><i></i><i></i><i></i></div><span class="chart-label label-start">${state.selectedPeriod === '7d' ? 'Aug 05' : state.selectedPeriod === '30d' ? 'Jul 14' : 'May 15'}</span><span class="chart-label label-end">Aug 12</span><span class="chart-event event-partner">Northstar +18.4%</span><span class="chart-event event-feed">Feed gap</span></div>
    <details class="metric-data-table"><summary>View chart data</summary><table><caption>${metric.label} · ${period.label}</caption><thead><tr><th>Point</th><th>Value</th></tr></thead><tbody>${series.map((value, index) => `<tr><td>${index + 1}</td><td>${value}</td></tr>`).join('')}</tbody></table></details>
    ${renderMetricRail(state)}
    <div class="reason-row"><span>Why it changed</span>${brandPulseData.overview.reasons.map((reason, index) => `<button type="button" class="reason-chip tone-${reason.tone}" data-toast="${reason.title}"><i></i><span><small>${reason.label}</small><strong>${reason.title}</strong></span><b>${String(index + 1).padStart(2, '0')}</b></button>`).join('')}</div>
  </div></section>`;
}

function renderPriorityStack() {
  return `<section class="priority-panel reveal" aria-labelledby="priority-title"><div class="section-heading"><div><span class="eyebrow">PRIORITY STACK</span><h2 id="priority-title">What deserves attention</h2></div><span class="stack-count">4 open</span></div><div class="priority-stack">${brandPulseData.overview.priorities.map((item, index) => `<article class="priority-sheet tone-${item.tone}" style="--stack:${index}"><span class="sheet-tab">${String(index + 1).padStart(2, '0')}</span><div><small>${item.meta}</small><h3>${item.title}</h3><button type="button" data-page="${item.page}">${item.action}<i>${icon('arrow', 13)}</i></button></div></article>`).join('')}</div></section>`;
}

function renderPartnersSpread() {
  return `<section class="editorial-panel partner-spread reveal"><div class="section-heading"><div><span class="eyebrow">PARTNER SIGNAL</span><h2>Editorial partners are leading revenue quality.</h2></div><button class="round-link" type="button" data-page="my-partners" aria-label="Open partners">${icon('arrow', 16)}</button></div><div class="partner-lines">${brandPulseData.overview.partners.map((partner, index) => `<button type="button" class="partner-line" data-page="my-partners" data-record="${partner.id}"><span class="partner-rank">${String(index + 1).padStart(2, '0')}</span><span class="partner-monogram">${partner.title.split(' ').map((word) => word[0]).join('').slice(0, 2)}</span><span class="partner-name"><strong>${partner.title}</strong><small>${partner.meta}</small></span><span class="partner-bar"><i style="transform:scaleX(${partner.progress / 100})"></i></span><strong>${partner.value}</strong><span class="row-status tone-${partner.tone}">${partner.status}</span></button>`).join('')}</div></section>`;
}

function renderCampaignTrack() {
  const stages = ['Draft', 'Ready', 'Live', 'Settled'];
  return `<section class="editorial-panel campaign-board reveal"><div class="section-heading"><div><span class="eyebrow">CAMPAIGN TRACK</span><h2>One approval stands between Summer Sale and launch.</h2></div><button class="round-link" type="button" data-page="all-campaigns" aria-label="Open campaigns">${icon('arrow', 16)}</button></div><div class="stage-labels">${stages.map((stage) => `<span>${stage}</span>`).join('')}</div><div class="stage-axis"><i></i><i></i><i></i><i></i></div><div class="campaign-lanes">${brandPulseData.overview.campaigns.map((campaign, index) => `<button type="button" data-page="all-campaigns" data-record="${campaign.id}" class="campaign-lane tone-${campaign.tone}"><span><strong>${campaign.title}</strong><small>${campaign.meta}</small></span><i style="transform:scaleX(${campaign.progress / 100})"></i><b style="left:calc(${campaign.progress}% - 7px)"></b><em>${campaign.value}</em></button>`).join('')}</div></section>`;
}

function renderOverview(state) {
  if (state.demoState === 'loading') return renderLoadingState();
  if (state.demoState === 'empty') return renderEmptyState('No growth signal yet', 'Connect a storefront or invite your first partner to begin building a measurable growth signal.', 'Discover partners', 'discover');
  return `<div class="overview-page">
    <section class="morning-thesis reveal"><div class="thesis-copy"><span class="eyebrow">GOOD MORNING, GUOWV</span><h1>${brandPulseData.overview.thesis}</h1><p>${brandPulseData.overview.subline}</p></div><div class="day-brief"><span>AUG 12 / US STORE</span><strong>5 of 6 systems healthy</strong><small>Next payout · Aug 16</small><i></i></div></section>
    <div class="overview-primary">${renderGrowthMetric(state)}${renderPriorityStack()}</div>
    <div class="overview-secondary">${renderPartnersSpread()}${renderCampaignTrack()}</div>
    <section class="quick-strip reveal"><div><span class="eyebrow">KEEP MOVING</span><strong>Three useful next moves, without leaving the signal.</strong></div>${nestedAction('Invite partner', 'data-page="invitations"', 'brand')}${nestedAction('Create campaign', 'data-page="all-campaigns"', 'light')}${nestedAction('Export report', 'data-page="exports"', 'light')}</section>
  </div>`;
}

function renderPageIntro(view, state) {
  const action = state.demoState === 'permission' ? '<button class="nested-action tone-light" type="button" disabled aria-disabled="true"><span>Role required</span></button>' : nestedAction(view.action, `data-toast="${view.action} flow opened"`, 'brand');
  return `<section class="module-intro reveal"><div><span class="eyebrow">${view.eyebrow}</span><h1>${view.thesis}</h1><p>${view.title} · Northstar Labs / US Store</p></div>${action}</section>`;
}

function renderModuleMetrics(view) {
  return `<div class="module-metrics reveal" role="list">${view.metrics.map((metric, index) => `<article class="module-metric tone-${metric.tone}" role="listitem"><span>${metric.label}</span><strong>${metric.value}</strong><small>${metric.delta}</small><b>${String(index + 1).padStart(2, '0')}</b></article>`).join('')}</div>`;
}

function renderModuleToolbar(view, state) {
  return `<div class="module-toolbar"><div class="filter-tabs">${view.filters.map((filter) => `<button class="filter-tab ${state.activeFilter === filter ? 'is-active' : ''}" type="button" data-filter="${filter}">${filter}</button>`).join('')}</div><div class="toolbar-actions"><button type="button" data-toast="More filters opened">${icon('filter', 15)} More filters</button><button type="button" data-toast="${view.title} export prepared">${icon('download', 15)} Export</button></div></div>`;
}

export function filterRecords(records, activeFilter) {
  if (activeFilter === 'Needs attention') return records.filter((record) => ['attention', 'risk'].includes(record.tone));
  return records;
}

function recordButton(record, extraClass = '') {
  return `<button type="button" class="record-row tone-${record.tone} ${extraClass}" data-record="${record.id}"><span class="record-status-line"></span><span class="record-identity"><strong>${record.title}</strong><small>${record.meta}</small></span><span class="record-meter"><i style="transform:scaleX(${record.progress / 100})"></i></span><strong class="record-value">${record.value}</strong><span class="record-state">${record.status}</span>${icon('arrow', 14)}</button>`;
}

function renderDossier(view, state) {
  const records = filterRecords(view.records, state.activeFilter);
  return `<section class="dossier-layout reveal"><div class="dossier-filters"><span class="eyebrow">CURRENT VIEW</span><h2>${view.title}</h2><p>${records.length} illustrative records</p><div class="facet-list"><button class="${state.activeFilter === 'All' ? 'is-active' : ''}" type="button" data-filter="All"><span>All records</span><b>${view.records.length}</b></button><button class="${state.activeFilter === 'Needs attention' ? 'is-active' : ''}" type="button" data-filter="Needs attention"><span>Needs attention</span><b>${view.records.filter((record) => ['attention', 'risk'].includes(record.tone)).length}</b></button><button class="${state.activeFilter === 'Updated this week' ? 'is-active' : ''}" type="button" data-filter="Updated this week"><span>Updated this week</span><b>${view.records.length}</b></button></div><small class="filter-note">Filters remain attached to this page when the detail inspector opens.</small></div><div class="dossier-list bezel"><div class="bezel-core">${renderModuleToolbar(view, state)}<div class="dossier-head"><span>Identity</span><span>Momentum</span><span>Value</span><span>Status</span></div><div class="record-list">${records.map((record) => recordButton(record)).join('')}</div></div></div></section>`;
}

function renderCanvas(view, state) {
  const stages = ['Draft', 'Ready', 'Live', 'Review'];
  return `<section class="control-canvas reveal"><div class="canvas-track"><div class="track-labels">${stages.map((stage, index) => `<span class="${index === 2 ? 'is-current' : ''}"><b>${index + 1}</b>${stage}</span>`).join('')}</div><i class="track-line"><b></b></i></div><div class="canvas-shell bezel"><div class="bezel-core">${renderModuleToolbar(view, state)}<div class="canvas-grid">${view.records.map((record, index) => `<button type="button" class="canvas-node tone-${record.tone} ${index === 0 ? 'is-featured' : ''}" data-record="${record.id}"><span class="node-top"><small>${record.status}</small><i>${icon(index === 0 ? 'campaign' : 'dots', 16)}</i></span><strong>${record.title}</strong><p>${record.meta}</p><div class="node-meter"><i><b style="transform:scaleX(${record.progress / 100})"></b></i><span>${record.progress}%</span></div><footer><b>${record.value}</b><span>Open details ${icon('arrow', 13)}</span></footer></button>`).join('')}</div></div></div><aside class="canvas-note"><span class="eyebrow">DECISION CUE</span><h3>${view.reasons[1]}</h3><p>${view.reasons[0]}</p>${nestedAction('Review working set', `data-record="${view.records[0].id}"`, 'dark')}</aside></section>`;
}

function renderLedger(view, state) {
  const hero = view.metrics[0];
  const geometry = lineGeometry([18, 24, 22, 34, 42, 39, 52, 59, 65, 72, 78, 91], 520, 180);
  return `<section class="analysis-ledger reveal"><div class="ledger-hero"><div class="ledger-number"><span class="eyebrow">PRIMARY POSITION</span><strong>${hero.value}</strong><h2>${hero.label}</h2><p>${hero.delta} against the previous period.</p></div><div class="ledger-chart"><div class="chart-copy"><span>Operating trajectory</span><strong>${view.reasons[0]}</strong></div><svg class="growth-ribbon" viewBox="0 0 520 180" preserveAspectRatio="none" aria-label="${hero.label} trajectory"><path class="ribbon-area" d="${geometry.area}"></path><polyline class="ribbon-line" points="${geometry.polyline}"></polyline></svg></div></div><div class="ledger-book bezel"><div class="bezel-core">${renderModuleToolbar(view, state)}<div class="ledger-header"><span>Reference / description</span><span>Progress</span><span>Amount</span><span>State</span><span></span></div><div class="ledger-rows">${view.records.map((record) => recordButton(record, 'ledger-row')).join('')}</div><footer class="ledger-footer"><span>Illustrative data · Refreshed 4 min ago</span><button type="button" data-toast="Accessible data table opened">View accessible data table ${icon('arrow', 13)}</button></footer></div></div></section>`;
}

function renderMatrix(view) {
  return `<section class="resource-layout reveal"><div class="resource-thesis"><span class="eyebrow">SYSTEM READ</span><strong>${view.metrics[0].value}</strong><h2>${view.metrics[0].label}</h2><p>${view.reasons[0]}</p><div class="health-key"><span><i class="positive"></i> Healthy</span><span><i class="attention"></i> Attention</span><span><i class="risk"></i> Action needed</span></div></div><div class="resource-matrix">${view.records.map((record, index) => `<button type="button" class="resource-cell tone-${record.tone} ${index === 0 ? 'is-wide' : ''}" data-record="${record.id}"><span class="resource-top"><i></i><small>${record.status}</small></span><strong>${record.title}</strong><p>${record.meta}</p><footer><b>${record.value}</b><span>${record.progress}%</span></footer><em style="transform:scaleX(${record.progress / 100})"></em></button>`).join('')}</div><div class="event-stream"><div class="section-heading"><div><span class="eyebrow">RECENT SIGNALS</span><h2>What changed in this workspace</h2></div><button class="round-link" type="button" data-page="notifications" aria-label="Open notifications">${icon('arrow', 15)}</button></div>${view.reasons.map((reason, index) => `<button type="button" data-toast="${reason}"><time>${index === 0 ? '4 min' : index === 1 ? '32 min' : 'Today'}</time><span>${reason}</span><i></i></button>`).join('')}</div></section>`;
}

function renderLoadingState() {
  return `<section class="loading-state" aria-label="Loading demo content"><span class="skeleton skeleton-title"></span><span class="skeleton skeleton-line"></span><div class="skeleton-grid"><span></span><span></span><span></span></div><div class="skeleton skeleton-panel"></div></section>`;
}

function renderEmptyState(title, copy, action, page) {
  return `<section class="empty-state reveal"><span class="empty-mark"><i></i><i></i><i></i></span><span class="eyebrow">READY WHEN YOU ARE</span><h1>${title}</h1><p>${copy}</p>${nestedAction(action, `data-page="${page}"`, 'brand')}</section>`;
}

function renderModule(state) {
  const view = brandPulseData.views[state.activePage];
  if (!view) return renderEmptyState('Page not found', 'Choose another workspace page from the sidebar.', 'Return to overview', 'overview');
  if (state.demoState === 'loading') return renderLoadingState();
  if (state.demoState === 'empty') return renderEmptyState(`No ${view.title.toLowerCase()} yet`, `Create the first record or change the current filters to begin working in ${view.title}.`, 'Show sample data', state.activePage).replace(`data-page="${state.activePage}"`, 'data-demo-reset');
  const layout = view.type === 'dossier' ? renderDossier(view, state) : view.type === 'canvas' ? renderCanvas(view, state) : view.type === 'ledger' ? renderLedger(view, state) : renderMatrix(view, state);
  return `<div class="module-page type-${view.type}">${renderPageIntro(view, state)}${renderModuleMetrics(view)}${layout}</div>`;
}

function currentRecord(state) {
  if (!state.inspectorId) return null;
  const view = brandPulseData.views[state.activePage];
  const pools = [view?.records ?? [], brandPulseData.overview.partners, brandPulseData.overview.campaigns];
  return pools.flat().find((record) => record.id === state.inspectorId) ?? null;
}

function renderInspector(state) {
  const record = currentRecord(state);
  if (!record) return '';
  return `<div class="inspector-layer"><button class="inspector-scrim" type="button" data-close-inspector aria-label="Close details"></button><aside class="inspector" role="dialog" aria-modal="true" aria-label="${record.title} details"><div class="inspector-head"><div><span class="eyebrow">DETAIL INSPECTOR</span><h2>${record.title}</h2></div><button class="icon-control" type="button" data-close-inspector aria-label="Close">${icon('close', 17)}</button></div><span class="inspector-status tone-${record.tone}"><i></i>${record.status}</span><p class="inspector-detail">${record.detail}</p><div class="inspector-number"><span>Current signal</span><strong>${record.value}</strong><small>${record.meta}</small></div><div class="inspector-progress"><span><b>Readiness</b><em>${record.progress}%</em></span><i><b style="transform:scaleX(${record.progress / 100})"></b></i></div><div class="inspector-list"><div><span>Owner</span><strong>Guowv · Brand Admin</strong></div><div><span>Last updated</span><strong>4 minutes ago</strong></div><div><span>Workspace</span><strong>Northstar Labs / US Store</strong></div></div><div class="inspector-actions">${nestedAction('Open working view', `data-toast="${record.title} working view opened"`, 'brand')}<button type="button" class="secondary-action" data-close-inspector>Close</button></div></aside></div>`;
}

function renderCommandPalette(state) {
  if (!state.commandOpen) return '';
  const query = state.commandQuery.trim().toLowerCase();
  const results = brandPulseData.commands.filter((command) => !query || `${command.label} ${command.hint} ${command.group}`.toLowerCase().includes(query));
  return `<div class="command-layer"><button class="command-scrim" type="button" data-close-command aria-label="Close command menu"></button><section class="command-palette" role="dialog" aria-modal="true" aria-label="Command menu"><div class="command-search">${icon('search', 18)}<input type="search" name="command-search" aria-label="Search commands" autocomplete="off" placeholder="Search actions, partners, transactions or pages" value="${escapeHtml(state.commandQuery)}" data-command-input><kbd>ESC</kbd></div><div class="command-results">${results.length ? results.map((command, index) => `<button type="button" data-command-page="${command.page}" ${command.record ? `data-command-record="${command.record}"` : ''}><span class="command-index">${String(index + 1).padStart(2, '0')}</span><span><small>${command.group}</small><strong>${command.label}</strong><em>${command.hint}</em></span>${icon('arrow', 14)}</button>`).join('') : '<div class="command-empty">No matching command. Try “transaction” or “partner”.</div>'}</div><footer><span>Type to filter</span><span>Click to open</span><span>Esc close</span></footer></section></div>`;
}

function renderToast(state) {
  return state.toast ? `<div class="toast" role="status">${icon('check', 15)}<span>${state.toast}</span></div>` : '';
}

export function renderApp(state) {
  return `<div class="brand-pulse ${state.sidebarCollapsed ? 'sidebar-collapsed' : ''}">${renderSidebar(state)}<main class="workspace" id="main-content"><div class="workspace-frame">${renderTopbar(state)}${renderStateBanner(state)}${state.activePage === 'overview' ? renderOverview(state) : renderModule(state)}</div></main>${state.mobileNavOpen ? '<button class="mobile-scrim" type="button" data-close-nav aria-label="Close navigation"></button>' : ''}${renderInspector(state)}${renderCommandPalette(state)}${renderToast(state)}</div>`;
}
