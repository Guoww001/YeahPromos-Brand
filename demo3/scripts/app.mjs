import { controlRoomData } from './data.mjs';
import { closePartner, createControlRoomState, navigateTo, selectMetric, selectPartner, selectPeriod, setDemoState, setNavigationOpen, setToast, toggleNavGroup } from './state.mjs';

const app = document.querySelector('#app');
let state = createControlRoomState();
let toastTimer;

const iconPaths = {
  grid: ['M4 4h6v6H4z', 'M14 4h6v6h-6z', 'M4 14h6v6H4z', 'M14 14h6v6h-6z'],
  users: ['M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2', 'M9 11a4 4 0 1 0 0-8 4 4 0 0 0 0 8z', 'M22 21v-2a4 4 0 0 0-3-3.87', 'M16 3.13a4 4 0 0 1 0 7.75'],
  orbit: ['M12 3a9 9 0 1 0 9 9', 'M12 7a5 5 0 1 0 5 5', 'M12 11h.01', 'M20.5 3.5l-3 3'],
  box: ['M4 7l8-4 8 4-8 4-8-4z', 'M4 7v10l8 4 8-4V7', 'M12 11v10'],
  coins: ['M12 6c4.42 0 8-1.34 8-3s-3.58-3-8-3-8 1.34-8 3 3.58 3 8 3z', 'M4 3v6c0 1.66 3.58 3 8 3s8-1.34 8-3V3', 'M4 9v6c0 1.66 3.58 3 8 3s8-1.34 8-3V9', 'M4 15v6c0 1.66 3.58 3 8 3s8-1.34 8-3v-6'],
  pulse: ['M3 12h4l2-6 4 12 2-6h6'],
  wallet: ['M3 7h18v13H3z', 'M3 7l2-4h14l2 4', 'M16 13h5'],
  message: ['M21 11.5a8.38 8.38 0 0 1-9 8.5 9.7 9.7 0 0 1-4-.8L3 21l1.8-4A8.2 8.2 0 0 1 3 11.5a8.5 8.5 0 0 1 18 0z'],
  settings: ['M12 15.5a3.5 3.5 0 1 0 0-7 3.5 3.5 0 0 0 0 7z', 'M19.4 15a1.7 1.7 0 0 0 .34 1.88l.06.06-1.42 1.42-.06-.06a1.7 1.7 0 0 0-1.88-.34 1.7 1.7 0 0 0-1.03 1.55v.09h-2v-.09a1.7 1.7 0 0 0-1.03-1.55 1.7 1.7 0 0 0-1.88.34l-.06.06-1.42-1.42.06-.06A1.7 1.7 0 0 0 9.4 15a1.7 1.7 0 0 0-1.55-1.03h-.09v-2h.09A1.7 1.7 0 0 0 9.4 10.9a1.7 1.7 0 0 0-.34-1.88L9 8.96l1.42-1.42.06.06a1.7 1.7 0 0 0 1.88.34A1.7 1.7 0 0 0 13.4 6.4v-.09h2v.09a1.7 1.7 0 0 0 1.03 1.54 1.7 1.7 0 0 0 1.88-.34l.06-.06 1.42 1.42-.06.06a1.7 1.7 0 0 0-.34 1.88 1.7 1.7 0 0 0 1.55 1.03h.09v2h-.09A1.7 1.7 0 0 0 19.4 15z'],
  chevron: ['M6 9l6 6 6-6'],
  calendar: ['M4 5h16v15H4z', 'M8 3v4', 'M16 3v4', 'M4 10h16'],
  bell: ['M18 8a6 6 0 0 0-12 0c0 7-3 7-3 9h18c0-2-3-2-3-9', 'M10 21h4'],
  cursor: ['M5 3l13 8-6 1-3 7-4-16z'],
  receipt: ['M6 2h12v20l-3-2-3 2-3-2-3 2V2z', 'M9 7h6', 'M9 11h6', 'M9 15h4'],
  trend: ['M3 17l6-6 4 4 8-9', 'M14 6h7v7'],
  shield: ['M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z', 'M9 12l2 2 4-4'],
  refresh: ['M20 11a8 8 0 0 0-14.9-3', 'M4 5v4h4', 'M4 13a8 8 0 0 0 14.9 3', 'M20 19v-4h-4'],
  send: ['M22 2L11 13', 'M22 2l-7 20-4-9-9-4 20-7z'],
  tag: ['M20.59 13.41L11 3.83V3H4v7h.83l9.58 9.59a2 2 0 0 0 2.83 0l3.35-3.35a2 2 0 0 0 0-2.83z', 'M7 7h.01'],
  download: ['M12 3v12', 'M7 10l5 5 5-5', 'M4 20h16'],
  arrow: ['M5 12h14', 'M13 6l6 6-6 6'],
  close: ['M6 6l12 12', 'M18 6L6 18'],
  menu: ['M4 7h16', 'M4 12h16', 'M4 17h16'],
  check: ['M5 12l4 4L19 6'],
  alert: ['M12 3l9 17H3L12 3z', 'M12 9v4', 'M12 16h.01'],
  help: ['M12 22a10 10 0 1 0 0-20 10 10 0 0 0 0 20z', 'M9.1 9a3 3 0 1 1 5.3 2c-1.25 1.08-2.4 1.5-2.4 3', 'M12 17h.01'],
};

function icon(name, size = 16) {
  const paths = iconPaths[name] ?? iconPaths.grid;
  return `<svg class="icon" width="${size}" height="${size}" viewBox="0 0 24 24" fill="none" aria-hidden="true">${paths.map((path) => `<path d="${path}"></path>`).join('')}</svg>`;
}

function metricSpark(index) {
  const heights = [36, 57, 43, 74, 52, 82, 66];
  return `<span class="mini-spark" aria-hidden="true">${heights.map((height, barIndex) => `<i style="height:${height + ((index + barIndex) % 3) * 4}%"></i>`).join('')}</span>`;
}

function linePoints(series) {
  const max = Math.max(...series);
  const min = Math.min(...series);
  const range = Math.max(max - min, 1);
  return series.map((value, index) => `${(index / (series.length - 1)) * 100},${84 - ((value - min) / range) * 66}`).join(' ');
}

function navItem(item) {
  const activeChild = item.children?.some((child) => child.id === state.activeNavigationId);
  const active = item.id === state.activeNavigationId || activeChild;
  const expandable = item.children?.length;
  const expanded = state.expandedGroups.includes(item.id);
  const topButton = `<button class="nav-item ${active ? 'is-active' : ''}" type="button" data-nav="${item.id}" ${expandable ? `data-toggle-group="${item.id}" aria-expanded="${expanded}"` : ''}>
    <span class="nav-icon">${icon(item.icon, 16)}</span><span>${item.label}</span>${item.state === 'alert' ? '<span class="nav-alert" aria-label="Needs attention">!</span>' : ''}${item.badge ? `<span class="nav-badge">${item.badge}</span>` : ''}${expandable ? `<span class="nav-chevron ${expanded ? 'is-open' : ''}">${icon('chevron', 14)}</span>` : ''}
  </button>`;
  const children = expandable && expanded ? `<div class="nav-children">${item.children.map((child) => `<button class="nav-child ${child.id === state.activeNavigationId ? 'is-active' : ''}" type="button" data-nav="${child.id}"><span class="child-dot ${child.state === 'alert' ? 'is-alert' : ''}"></span><span>${child.label}</span>${child.badge ? `<span class="nav-badge">${child.badge}</span>` : ''}</button>`).join('')}</div>` : '';
  return `<div class="nav-group">${topButton}${children}</div>`;
}

function renderSidebar() {
  return `<aside class="sidebar ${state.navOpen ? 'is-open' : ''}" aria-label="Primary navigation">
    <div class="sidebar-brand"><div class="brand-signature"><span class="brand-grid"><i></i><i></i><i></i><i></i></span><span><strong>YeahPromos</strong><small>Signal control room</small></span></div><button class="icon-button mobile-close" type="button" aria-label="Close navigation" data-close-nav>${icon('close', 18)}</button></div>
    <button class="brand-switcher" type="button" data-toast="Brand switcher opened"><span class="live-dot"></span><span><strong>Northstar Labs</strong><small>US Store · USD</small></span>${icon('chevron', 14)}</button>
    <p class="rail-label">Command</p><nav class="main-nav">${state.navigation.map(navItem).join('')}</nav>
    <div class="sidebar-bottom"><p class="rail-label">System</p><button class="utility-link" type="button" data-toast="Help center opened">${icon('help', 16)} Help center</button><button class="utility-link" type="button" data-nav="systems">${icon('settings', 16)} Settings</button><div class="operator-card"><span class="operator-avatar">G</span><span><strong>Guowv</strong><small>Brand Admin</small></span><span class="operator-status" title="Online"></span></div></div>
  </aside>`;
}

function renderHeader() {
  const periods = controlRoomData.periods.map((period) => `<option value="${period.id}" ${period.id === state.selectedPeriod ? 'selected' : ''}>${period.label}</option>`).join('');
  return `<header class="context-bar"><button class="icon-button menu-button" type="button" aria-label="Open navigation" data-open-nav>${icon('menu', 19)}</button><div class="context-breadcrumb"><span class="eyebrow"><i></i> Signal control</span><h1>Northstar Labs <span>/</span> US Store</h1><p>${state.workspace.currency} · ${state.workspace.timezone} · ${state.refresh}</p></div><div class="context-actions"><label class="select-shell">${icon('calendar', 16)}<span class="visually-hidden">Reporting period</span><select data-period>${periods}</select>${icon('chevron', 13)}</label><label class="select-shell state-selector"><span class="visually-hidden">Demo state</span><select data-demo-state><option value="normal" ${state.demoState === 'normal' ? 'selected' : ''}>Normal</option><option value="empty" ${state.demoState === 'empty' ? 'selected' : ''}>Empty</option><option value="syncing" ${state.demoState === 'syncing' ? 'selected' : ''}>Syncing</option><option value="error" ${state.demoState === 'error' ? 'selected' : ''}>Error</option><option value="permission" ${state.demoState === 'permission' ? 'selected' : ''}>Permission</option></select>${icon('chevron', 13)}</label><button class="icon-button notification-button" type="button" aria-label="Open notifications" data-toast="4 notifications waiting">${icon('bell', 18)}<i></i></button><button class="profile-button" type="button" data-toast="Account menu opened">G</button></div></header>`;
}

function renderBanner() {
  if (state.demoState === 'normal') return '';
  const content = {
    empty: [icon('orbit', 16), 'No operational activity exists in this period. Connect a store or invite your first partner to create a signal.', 'Open partner discovery'],
    syncing: [icon('refresh', 16), 'Store and product data are syncing now. Existing data remains available while new signals are collected.', 'View integration'],
    error: [icon('alert', 16), 'Product feed failed to return three records. Revenue and partner data are still available.', 'Inspect records'],
    permission: [icon('shield', 16), 'You can view the operations signal, but transaction approval requires Finance or Brand Admin access.', 'Request access'],
  }[state.demoState];
  return `<div class="state-banner state-${state.demoState}"><span>${content[0]}</span><p>${content[1]}</p><button type="button" data-toast="${content[2]} flow opened">${content[2]} ${icon('arrow', 14)}</button></div>`;
}

function renderFlightStrip() {
  const metrics = state.demoState === 'empty' ? state.flightMetrics.map((metric) => ({ ...metric, value: '—', change: 'No data', tone: 'muted' })) : state.flightMetrics;
  return `<section class="flight-shell reveal-stage" aria-labelledby="flight-title"><div class="flight-topline"><div><span class="section-kicker">Business flight strip</span><h2 id="flight-title">A continuous read of your operating signal.</h2></div><span class="sync-chip ${state.demoState === 'error' ? 'is-risk' : ''}"><i></i>${state.demoState === 'error' ? '3 records need attention' : 'Systems synced · 4 min ago'}</span></div><div class="flight-strip" role="list">${metrics.map((metric, index) => `<button class="flight-metric tone-${metric.tone}" type="button" data-metric="${metric.id === 'net-sales' ? 'sales' : metric.id === 'payout' || metric.id === 'balance' ? 'commission' : metric.id}" role="listitem"><span class="flight-label">${icon(metric.icon, 14)} ${metric.label}</span><strong>${metric.value}</strong><span class="flight-change">${metric.change}</span>${metricSpark(index)}</button>`).join('')}</div></section>`;
}

function renderTrajectory() {
  const metricTabs = ['sales', 'orders', 'commission', 'clicks'];
  const line = linePoints(state.trajectory.series);
  const compare = linePoints(state.trajectory.comparison);
  return `<section class="trajectory-shell panel-shell reveal-stage" aria-labelledby="trajectory-title"><div class="panel-core trajectory-core"><div class="panel-heading"><div><span class="section-kicker">Primary signal</span><h2 id="trajectory-title">${state.trajectory.label}</h2></div><div class="metric-tabs" role="tablist">${metricTabs.map((id) => `<button class="metric-tab ${state.selectedMetric === id ? 'is-active' : ''}" type="button" role="tab" aria-selected="${state.selectedMetric === id}" data-metric="${id}">${id === 'sales' ? 'Sales' : id[0].toUpperCase() + id.slice(1)}</button>`).join('')}</div></div><div class="trajectory-summary"><strong>${state.demoState === 'empty' ? '—' : state.trajectory.value}</strong><span class="trend-positive">${state.demoState === 'empty' ? 'No comparison' : `${state.trajectory.change} vs previous period`}</span><span>${state.periodLabel}</span></div><div class="chart-wrap"><div class="chart-grid" aria-hidden="true"><i></i><i></i><i></i><i></i></div><svg class="signal-chart" viewBox="0 0 100 100" preserveAspectRatio="none" aria-label="${state.trajectory.label} trajectory chart"><polyline class="compare-line" points="${compare}"></polyline><polyline class="active-line" points="${line}"></polyline><circle cx="100" cy="${line.split(' ').at(-1).split(',')[1]}" r="2.2"></circle></svg><span class="chart-event event-one">Northstar ↑</span><span class="chart-event event-two">Feed alert</span><div class="chart-axis"><span>Aug 05</span><span>Aug 07</span><span>Aug 09</span><span>Aug 12</span></div></div><div class="signal-reasons"><span class="reason-label">What changed</span>${(state.demoState === 'empty' ? ['Signals will appear once the first partner, product or order data arrives.'] : state.trajectory.reasons).map((reason, index) => `<p><i class="reason-dot reason-${index}"></i>${reason}</p>`).join('')}</div><button class="table-link" type="button" data-toast="Accessible data table opened">View data table ${icon('arrow', 14)}</button></div></section>`;
}

function renderDecisionQueue() {
  const queue = state.demoState === 'empty' ? [] : state.decisionQueue;
  return `<section class="decision-shell panel-shell reveal-stage" aria-labelledby="decision-title"><div class="panel-core decision-core"><div class="panel-heading"><div><span class="section-kicker">Decision queue</span><h2 id="decision-title">Today’s highest-impact work</h2></div><span class="queue-count">${queue.length} open</span></div>${queue.length ? `<div class="decision-list">${queue.slice(0, 4).map((task) => `<article class="decision-item tone-${task.tone}"><span class="priority-marker"><b>${String(task.priority).padStart(2, '0')}</b></span><div><span class="decision-domain">${task.domain}</span><h3>${task.title}</h3><p>${task.description}</p><div class="decision-meta"><span>${task.impact}</span><span>${task.due}</span></div><button class="action-link" type="button" data-nav="${task.destination}">${task.action}<span>${icon('arrow', 13)}</span></button></div></article>`).join('')}</div>` : `<div class="queue-empty"><span>${icon('check', 19)}</span><strong>No decisions waiting.</strong><p>Once there is new activity, urgent work will be sorted here.</p></div>`}</div></section>`;
}

function renderPartnerMomentum() {
  return `<section class="partner-shell panel-shell reveal-stage" aria-labelledby="partner-title"><div class="panel-core partner-core"><div class="panel-heading"><div><span class="section-kicker">Partner momentum</span><h2 id="partner-title">Who is moving the operating signal</h2></div><button class="icon-button ghost" type="button" aria-label="Open partners" data-nav="my-partners">${icon('arrow', 16)}</button></div><div class="ranking-header"><span>Partner</span><span>Contribution</span><span>Trend</span></div><div class="ranking-list">${state.partners.map((partner, index) => `<button class="partner-row" type="button" data-partner="${partner.id}"><span class="rank">${String(index + 1).padStart(2, '0')}</span><span class="partner-avatar" style="--avatar:${partner.color}">${partner.initials}</span><span class="partner-copy"><strong>${partner.name}</strong><small>${partner.type} · ${partner.status}</small></span><span class="contribution"><b>${partner.revenue}</b><i><em style="width:${partner.share}%"></em></i></span><span class="partner-trend">${partner.trend}</span>${icon('chevron', 13)}</button>`).join('')}</div><button class="table-link" type="button" data-nav="my-partners">Open partner operations ${icon('arrow', 14)}</button></div></section>`;
}

function renderCampaignTrack() {
  return `<section class="campaign-shell panel-shell reveal-stage" aria-labelledby="campaign-title"><div class="panel-core campaign-core"><div class="panel-heading"><div><span class="section-kicker">Campaign track</span><h2 id="campaign-title">Readiness across the launch line</h2></div><button class="text-button" type="button" data-nav="all-campaigns">All campaigns ${icon('arrow', 13)}</button></div><div class="campaign-track">${state.campaigns.map((campaign, index) => `<button class="campaign-step tone-${campaign.tone}" type="button" data-nav="all-campaigns"><span class="campaign-node"><b>${index + 1}</b></span><span class="campaign-copy"><span>${campaign.lifecycle}</span><strong>${campaign.name}</strong><small>${campaign.start} · ${campaign.missing}</small></span><span class="campaign-completeness"><b>${campaign.completeness}%</b><i><em style="width:${campaign.completeness}%"></em></i></span></button>`).join('')}</div></div></section>`;
}

function renderRiskAndCommands() {
  return `<section class="risk-command-grid"><section class="risk-shell panel-shell reveal-stage" aria-labelledby="risk-title"><div class="panel-core risk-core"><div class="panel-heading"><div><span class="section-kicker">Risk radar</span><h2 id="risk-title">Watch the edges of the system</h2></div><span class="risk-pulse"><i></i>4 signals</span></div><div class="risk-list">${state.risks.map((risk) => `<button class="risk-row tone-${risk.tone}" type="button" data-nav="${risk.destination}"><span class="risk-icon">${icon(risk.tone === 'risk' ? 'alert' : risk.tone === 'action' ? 'wallet' : risk.tone === 'campaign' ? 'orbit' : 'pulse', 16)}</span><span><small>${risk.label}</small><strong>${risk.title}</strong><em>${risk.detail}</em></span>${icon('arrow', 14)}</button>`).join('')}</div></div></section><section class="commands-shell panel-shell reveal-stage" aria-labelledby="command-title"><div class="panel-core commands-core"><div class="panel-heading"><div><span class="section-kicker">Quick commands</span><h2 id="command-title">Move the work forward</h2></div><span class="command-mark">+</span></div><div class="command-list">${state.quickCommands.map((command) => `<button class="command-row" type="button" data-nav="${command.destination}"><span>${icon(command.icon, 16)}</span><span><strong>${command.label}</strong><small>${command.description}</small></span><i>${icon('arrow', 13)}</i></button>`).join('')}</div></div></section></section>`;
}

function renderModulePlaceholder() {
  const labels = [...state.navigation.flatMap((item) => [item, ...(item.children ?? [])])];
  const item = labels.find((entry) => entry.id === state.activeNavigationId) ?? { label: 'Workspace module' };
  return `<section class="module-placeholder panel-shell"><div class="panel-core"><span class="placeholder-icon">${icon('grid', 27)}</span><span class="section-kicker">Workspace module</span><h2>${item.label}</h2><p>This display demo keeps the navigation path visible. Connect this module to the production data contract when the functional screen is ready.</p><button class="primary-button" type="button" data-nav="overview">${icon('arrow', 14)} Back to control room</button></div></section>`;
}

function renderDrawer() {
  const partner = state.partners.find((item) => item.id === state.selectedPartnerId);
  if (!partner) return '';
  return `<div class="drawer-layer"><button class="drawer-backdrop" type="button" aria-label="Close partner details" data-close-drawer></button><aside class="partner-drawer" role="dialog" aria-modal="true" aria-label="Partner details"><div class="drawer-heading"><div><span class="section-kicker">Partner signal</span><h2>${partner.name}</h2></div><button class="icon-button" type="button" aria-label="Close" data-close-drawer>${icon('close', 18)}</button></div><div class="drawer-identity"><span class="drawer-avatar" style="--avatar:${partner.color}">${partner.initials}</span><span><strong>${partner.type}</strong><small>${partner.status} relationship</small></span><span class="drawer-live"><i></i>Live</span></div><div class="drawer-metrics"><div><small>Attributed revenue</small><b>${partner.revenue}</b></div><div><small>Momentum</small><b>${partner.trend}</b></div><div><small>Orders</small><b>${partner.orders}</b></div><div><small>Conversion</small><b>${partner.conversion}</b></div></div><div class="drawer-insight">${icon('trend', 17)}<p>${partner.insight}</p></div><div class="drawer-actions"><button class="primary-button" type="button" data-nav="my-partners">Open performance ${icon('arrow', 14)}</button><button class="secondary-button" type="button" data-close-drawer>Close</button></div></aside></div>`;
}

function moduleToneIcon(tone) {
  return tone === 'risk' ? 'alert' : tone === 'action' ? 'wallet' : tone === 'campaign' ? 'orbit' : tone === 'success' ? 'check' : 'pulse';
}

function renderOperationalModule() {
  const view = controlRoomData.moduleViews[state.activeNavigationId];
  if (!view) return renderModulePlaceholder();

  return `<section class="module-page reveal-stage" aria-labelledby="module-page-title">
    <div class="module-intro"><div><span class="section-kicker">${view.eyebrow}</span><h2 id="module-page-title">${view.title}</h2><p>${view.description}</p></div><button class="primary-button" type="button" data-toast="${view.action} flow opened">${icon('arrow', 14)} ${view.action}</button></div>
    <div class="module-stat-grid" role="list">${view.stats.map((stat) => `<article class="module-stat tone-${stat.tone}" role="listitem"><span>${stat.label}</span><strong>${stat.value}</strong><small>${stat.note}</small></article>`).join('')}</div>
    <div class="module-content-grid"><section class="module-records panel-shell" aria-label="${view.title} records"><div class="panel-core module-records-core"><div class="module-records-heading"><div><span class="section-kicker">Live working set</span><h3>What needs a decision or follow-through</h3></div><button class="icon-button ghost" type="button" aria-label="Export ${view.title}" data-toast="${view.title} export prepared">${icon('download', 16)}</button></div><div class="module-filter-row">${view.filters.map((filter, index) => `<button class="module-filter ${index === 0 ? 'is-active' : ''}" type="button" data-toast="Showing ${filter.toLowerCase()}">${filter}</button>`).join('')}</div><div class="module-record-list">${view.rows.map((row, index) => `<button class="module-record tone-${row.tone}" type="button" data-toast="${row.title} details opened"><span class="record-index">${String(index + 1).padStart(2, '0')}</span><span class="record-symbol">${icon(moduleToneIcon(row.tone), 16)}</span><span class="record-copy"><strong>${row.title}</strong><small>${row.meta}</small></span><span class="record-progress"><i><em style="width:${row.progress}%"></em></i></span><span class="record-value">${row.value}</span><span class="record-badge">${row.badge}</span>${icon('arrow', 14)}</button>`).join('')}</div></div></section><aside class="module-side panel-shell" aria-label="${view.side.title}"><div class="panel-core module-side-core tone-${view.side.tone}"><span class="section-kicker">Operating cue</span><h3>${view.side.title}</h3><strong class="module-side-value">${view.side.value}</strong><p>${view.side.detail}</p><div class="module-side-list">${view.side.items.map((item, index) => `<button type="button" data-toast="${item} opened"><span>${String(index + 1).padStart(2, '0')}</span>${item}${icon('arrow', 13)}</button>`).join('')}</div></div></aside></div>
  </section>`;
}

function renderToast() {
  return state.toast ? `<div class="toast" role="status">${icon('check', 16)}<span>${state.toast}</span></div>` : '';
}

function render() {
  app.innerHTML = `<div class="control-room ${state.navOpen ? 'nav-open' : ''}">${renderSidebar()}<main id="main-content" class="workspace"><div class="workspace-frame">${renderHeader()}${renderBanner()}${state.activeNavigationId === 'overview' ? `<div class="overview-content">${renderFlightStrip()}<div class="primary-grid">${renderTrajectory()}${renderDecisionQueue()}</div>${renderPartnerMomentum()}${renderCampaignTrack()}${renderRiskAndCommands()}</div>` : renderOperationalModule()}</div></main>${state.navOpen ? '<button class="mobile-scrim" type="button" aria-label="Close navigation" data-close-nav></button>' : ''}${renderDrawer()}${renderToast()}</div>`;
}

function showToast(message) {
  state = setToast(state, message);
  render();
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { state = setToast(state, ''); render(); }, 2600);
}

app.addEventListener('click', (event) => {
  const trigger = event.target.closest('button');
  if (!trigger) return;
  if (trigger.dataset.openNav !== undefined) { state = setNavigationOpen(state, true); render(); return; }
  if (trigger.dataset.closeNav !== undefined) { state = setNavigationOpen(state, false); render(); return; }
  if (trigger.dataset.closeDrawer !== undefined) { state = closePartner(state); render(); return; }
  if (trigger.dataset.toggleGroup) {
    state = navigateTo(state, trigger.dataset.nav);
    if (!state.expandedGroups.includes(trigger.dataset.toggleGroup)) state = toggleNavGroup(state, trigger.dataset.toggleGroup);
    render();
    return;
  }
  if (trigger.dataset.metric) { state = selectMetric(state, trigger.dataset.metric); render(); return; }
  if (trigger.dataset.partner) { state = selectPartner(state, trigger.dataset.partner); render(); return; }
  if (trigger.dataset.nav) { state = navigateTo(state, trigger.dataset.nav); render(); return; }
  if (trigger.dataset.toast) showToast(trigger.dataset.toast);
});

app.addEventListener('change', (event) => {
  if (event.target.matches('[data-period]')) { state = selectPeriod(state, event.target.value); render(); }
  if (event.target.matches('[data-demo-state]')) { state = setDemoState(state, event.target.value); render(); }
});

document.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' && state.selectedPartnerId) { state = closePartner(state); render(); }
  else if (event.key === 'Escape' && state.navOpen) { state = setNavigationOpen(state, false); render(); }
});

render();
