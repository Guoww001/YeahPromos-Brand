import { dashboardData } from './data.mjs?v=merchant-reference-18';
import {
  createDashboardState,
  isNavigationItemActive,
  selectDemoState,
  selectPeriod,
  toggleNavigationGroup,
} from './app-core.mjs?v=merchant-reference-18';
import {
  createRecruitmentState,
  filterRecruitmentRecords,
  getRecruitmentPage,
  recruitmentData,
  recruitmentPageIds,
  selectRecruitmentTab,
  updateRecruitmentFilter,
  updateRecruitmentSearch,
} from './recruitment.mjs';
import {
  buildSmoothChartPath,
  createOverviewState,
  getOverviewChart,
  getOverviewSnapshot,
  overviewChartTabs,
  overviewData,
  selectOverviewCadence,
  selectOverviewMetric,
} from './overview.mjs';
import {
  createOperationsState,
  getOperationsPage,
  getOperationsStateKey,
  operationsPageIds,
  selectOperationsRecord,
  selectOperationsTab,
  updateOperationsFilter,
  updateOperationsSearch,
} from './operations.mjs?v=merchant-reference-18';
import { renderOperationsPage } from './operations-renderers.mjs?v=merchant-reference-18';

let state = createDashboardState(dashboardData);
let recruitmentState = createRecruitmentState();
let overviewState = createOverviewState();
let operationsState = createOperationsState();
let toastTimer;
let lastDrawerTrigger = null;


const navigation = document.querySelector('[data-navigation]');
const metricsGrid = document.querySelector('[data-metrics-grid]');
const rankingList = document.querySelector('[data-ranking-list]');
const commissionSummary = document.querySelector('[data-commission-summary]');
const partnerStatus = document.querySelector('[data-partner-status]');
const actionCenter = document.querySelector('[data-action-center]');
const sectionCount = document.querySelector('[data-section-count]');
const quickActions = document.querySelector('[data-quick-actions]');
const demoStateBanner = document.querySelector('[data-demo-state-banner]');
const demoStateSelect = document.querySelector('[data-demo-state]');
const overviewPage = document.querySelector('[data-overview-page]');
const modulePage = document.querySelector('[data-module-page]');
const modulePlaceholder = document.querySelector('[data-module-placeholder]');
const pageTitle = document.querySelector('[data-page-title]');
const pageDescription = document.querySelector('[data-page-description]');
const breadcrumbParent = document.querySelector('[data-breadcrumb-parent]');
const breadcrumbCurrent = document.querySelector('[data-breadcrumb-current]');
const periodToggle = document.querySelector('[data-period-toggle]');
const periodMenu = document.querySelector('[data-period-menu]');
const periodLabel = document.querySelector('[data-period-label]');
const drawer = document.querySelector('[data-drawer]');
const drawerContent = document.querySelector('[data-drawer-content]');
const drawerBackdrop = document.querySelector('[data-drawer-backdrop]');
const toast = document.querySelector('[data-toast]');
const toastMessage = document.querySelector('[data-toast-message]');
const sidebar = document.querySelector('[data-sidebar]');
const sidebarBackdrop = document.querySelector('[data-sidebar-backdrop]');
const sidebarOpenButton = document.querySelector('[data-sidebar-open]');
const sidebarCloseButton = document.querySelector('[data-sidebar-close]');

const icon = (name, className = '') => `
  <svg class="${className}" aria-hidden="true">
    <use href="#icon-${name}"></use>
  </svg>
`;

const localizedNavigationLabel = (item) => item.label;


const findNavigationContext = (navigationId) => {
  for (const item of state.navigation) {
    if (item.id === navigationId) return { parent: { ...item, label: localizedNavigationLabel(item) }, current: { ...item, label: localizedNavigationLabel(item) } };
    const child = item.children?.find((entry) => entry.id === navigationId);
    if (child) return { parent: { ...item, label: localizedNavigationLabel(item) }, current: { ...child, label: localizedNavigationLabel(child) } };
  }

  const fallback = state.navigation[0];
  navigation.setAttribute('aria-label', 'Primary navigation');
};

const renderNavigation = () => {
  navigation.setAttribute('aria-label', t('shell.primaryNavigation'));
  navigation.innerHTML = state.navigation
    .map((item) => {
      const hasChildren = Array.isArray(item.children);
      const isExpanded = state.expandedGroups.includes(item.id);
      const isActive = isNavigationItemActive(state, item.id);

      return `
        <div class="nav-entry${isExpanded ? ' is-expanded' : ''}" data-nav-entry="${item.id}">
          <button
            class="nav-item${isActive ? ' is-active' : ''}"
            type="button"
            data-nav-item="${item.id}"
            ${hasChildren ? `data-nav-group="${item.id}" aria-expanded="${isExpanded}"` : ''}
            ${isActive && !state.activeNavigationChild ? 'aria-current="page"' : ''}
          >
            <span class="nav-item__icon">${icon(item.icon)}</span>
            <span class="nav-item__label">${localizedNavigationLabel(item)}</span>
            ${hasChildren ? icon('chevron', 'nav-item__chevron') : ''}
          </button>
          ${
            hasChildren
              ? `
                <div class="nav-children">
                  <div class="nav-children__inner">
                    ${item.children
                      .map(
                        (child) => `
                          <button
                            class="nav-child${state.activeNavigationChild === child.id ? ' is-active' : ''}"
                            type="button"
                            data-nav-child="${child.id}"
                            data-nav-parent="${item.id}"
                            ${state.activeNavigationChild === child.id ? 'aria-current="page"' : ''}
                          >${localizedNavigationLabel(child)}</button>
                        `,
                      )
                      .join('')}
                  </div>
                </div>
              `
              : ''
          }
        </div>
      `;
    })
    .join('');
};

const renderPeriods = () => {
  const selectedPeriod = state.periods.find((period) => period.id === state.selectedPeriod);
  periodLabel.textContent = selectedPeriod?.label ?? 'Select a period';
  periodMenu.innerHTML = state.periods
    .map(
      (period) => `
        <button
          class="period-option${period.id === state.selectedPeriod ? ' is-selected' : ''}"
          type="button"
          data-period="${period.id}"
        >
          <span>${period.label}</span>
          <small>${period.shortLabel}</small>
        </button>
      `,
    )
    .join('');
};

const renderOverviewSparkline = (values = []) => {
  if (!values.length) return '';
  const width = 86;
  const height = 30;
  const max = Math.max(...values);
  const min = Math.min(...values);
  const spread = max - min || 1;
  const points = values.map((value, index) => {
    const x = (index / Math.max(values.length - 1, 1)) * width;
    const y = height - ((value - min) / spread) * (height - 6) - 3;
    return `${x.toFixed(1)},${y.toFixed(1)}`;
  });

  return `<svg class="overview-metric__sparkline" viewBox="0 0 ${width} ${height}" aria-hidden="true"><path d="M${points.join(' L')}" /></svg>`;
};

const renderMetrics = () => {
  const snapshot = getOverviewSnapshot(state.selectedPeriod);
  const isEmpty = state.demoState === 'empty';
  metricsGrid.innerHTML = snapshot.metrics
    .map(
      (metric) => `
        <button
          class="metric-card overview-metric-card${overviewState.selectedMetric === metric.id ? ' is-chart-selected' : ''}"
          type="button"
          data-metric-id="${metric.id}"
          data-overview-metric="${metric.id}"
          aria-pressed="${overviewState.selectedMetric === metric.id}"
        >
          <span class="overview-metric__top">
            <span class="overview-metric__label">${metric.label}</span>
            <span class="overview-metric__icon">${icon(metric.icon)}</span>
          </span>
          <strong class="overview-metric__value">${isEmpty ? '—' : metric.value}</strong>
          <span class="overview-metric__footer">
            <b class="overview-metric__change" data-trend="${metric.trend}">${isEmpty ? 'No data' : `${metric.trend === 'down' ? '↓' : '↑'} ${metric.change}`}</b>
            <span>${isEmpty ? 'No activity in this range' : metric.note}</span>
          </span>
          ${renderOverviewSparkline(metric.sparkline)}
        </button>
      `,
    )
    .join('');
};

const renderPartnerPerformance = () => {
  const snapshot = getOverviewSnapshot(state.selectedPeriod);
  const isEmpty = state.demoState === 'empty';
  rankingList.innerHTML = isEmpty
    ? '<div class="inline-empty"><strong>No partner performance yet</strong><span>Partner results will appear after tracked orders are recorded.</span></div>'
    : snapshot.partners
        .map(
          (partner, index) => `
            <div class="ranking-row">
              <span class="ranking-row__rank">${index + 1}</span>
              <button class="ranking-row__name" type="button" data-partner-view="${partner.id}">
                <span class="ranking-row__avatar" data-tone="${partner.accent ?? 'neutral'}" aria-hidden="true">${partner.initial ?? partner.name.charAt(0)}</span>
                <span class="ranking-row__identity">
                  <strong>${partner.name}</strong>
                  <small>${partner.category}</small>
                </span>
              </button>
              <span class="ranking-row__clicks">${partner.clicks}</span>
              <span class="ranking-row__conversions">${partner.conversions}</span>
              <strong class="ranking-row__amount">${partner.commission}</strong>
            </div>
          `,
        )
        .join('');
};

const renderCommissionSummary = () => {
  const { commissionSummary: summaryData } = getOverviewSnapshot(state.selectedPeriod);
  const isEmpty = state.demoState === 'empty';

  commissionSummary.innerHTML = `
    <div class="summary-card__header">
      <div>
        <span class="eyebrow">Settlement snapshot</span>
        <h2>Commission summary</h2>
      </div>
      <button class="text-link" type="button" data-action-navigation="transactions">View all</button>
    </div>
    <div class="overview-summary-columns">
      ${[summaryData.approved, summaryData.pending, summaryData.declined].map((item) => `
        <div class="overview-summary-column" data-tone="${item.tone}">
          <span>${item.label}</span>
          <strong>${isEmpty ? '—' : item.value}</strong>
          <em>${isEmpty ? '—' : item.percent}</em>
          <i><b style="width:${isEmpty ? 0 : Number.parseFloat(item.percent)}%"></b></i>
        </div>
      `).join('')}
    </div>
    <div class="overview-summary-totals">
      <div><span>Total commission</span><strong>${isEmpty ? '—' : summaryData.total}</strong></div>
      <div><span>Payouts this period</span><strong>${isEmpty ? '—' : summaryData.paid}</strong></div>
    </div>
  `;
};

const renderPartnerStatus = () => {
  const snapshot = getOverviewSnapshot(state.selectedPeriod);
  const isEmpty = state.demoState === 'empty';
  partnerStatus.innerHTML = `
    <div class="summary-card__header">
      <div>
        <span class="eyebrow">Relationship health</span>
        <h2>Partner status</h2>
      </div>
      <button class="text-link" type="button" data-action-navigation="my-partners">View all</button>
    </div>
    <div class="status-list">
      ${snapshot.partnerStatus
        .map(
          (item) => `
            <button class="status-row" type="button" data-action-navigation="my-partners">
              <span class="status-row__top">
                <span><i class="overview-status-icon" data-tone="${item.tone}">${icon(item.icon)}</i>${item.label}</span>
                <strong>${isEmpty ? '—' : item.value}</strong>
              </span>
            </button>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderActionCenter = () => {
  const actionItems = overviewData.actionItems;
  sectionCount.textContent = state.demoState === 'empty' ? '0 tasks' : `${actionItems.length} tasks`;
  actionCenter.innerHTML = state.demoState === 'empty'
    ? '<div class="action-empty"><span class="action-empty__icon">✓</span><strong>You are all caught up</strong><p>No actions need attention in this workspace.</p></div>'
    : actionItems
        .map(
          (item) => `
            <article class="action-card" data-tone="${item.tone}">
              <div class="action-card__icon">${icon(item.icon)}</div>
              <div class="action-card__content">
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
              <button class="action-card__link" type="button" data-action-navigation="${item.navigationId}" aria-label="Open ${item.title}">${icon('arrow')}</button>
            </article>
          `,
        )
        .join('');
};

const renderQuickActions = () => {
  quickActions.innerHTML = overviewData.quickActions
    .map(
      (item) => `
        <button class="quick-action" type="button" data-action-navigation="${item.navigationId}">
          <span>${icon(item.icon)}</span>
          <strong>${item.label}</strong>
        </button>
      `,
    )
    .join('');
};

const renderDemoStateBanner = () => {
  const messages = {
    normal: null,
    empty: { title: 'No activity in this date range', detail: 'Try a wider date range or connect another store.', tone: 'neutral' },
    error: { title: 'Performance data could not load', detail: 'Retry the request or check the data connection.', tone: 'danger' },
    permission: { title: 'Some data is restricted', detail: 'Ask an organization owner for access to this brand scope.', tone: 'warning' },
    syncing: { title: 'Data sync in progress', detail: 'The latest transactions will appear after synchronization finishes.', tone: 'info' },
  };
  const message = messages[state.demoState];

  if (!message) {
    demoStateBanner.hidden = true;
    demoStateBanner.innerHTML = '';
    return;
  }

  demoStateBanner.hidden = false;
  demoStateBanner.dataset.tone = message.tone;
  demoStateBanner.innerHTML = `<strong>${message.title}</strong><span>${message.detail}</span>`;
};

const formatOverviewChartValue = (value, metricId) => {
  const prefix = ['gross-sales', 'commission'].includes(metricId) ? '$' : '';
  if (value >= 1000000) return `${prefix}${(value / 1000000).toFixed(1)}M`;
  if (value >= 1000) return `${prefix}${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return `${prefix}${Math.round(value)}`;
};

const renderOverviewChart = () => {
  const snapshot = getOverviewSnapshot(state.selectedPeriod);
  const chart = getOverviewChart(overviewState, state.selectedPeriod);
  const tabs = document.querySelector('[data-overview-chart-tabs]');
  const range = document.querySelector('[data-overview-chart-range]');
  const period = document.querySelector('[data-overview-chart-period]');
  const cadence = document.querySelector('[data-overview-chart-cadence]');

  if (tabs) {
    tabs.innerHTML = overviewChartTabs
      .map((metricId) => `
        <button class="overview-chart-tab${overviewState.selectedMetric === metricId ? ' is-active' : ''}" type="button" role="tab" aria-selected="${overviewState.selectedMetric === metricId}" data-overview-metric="${metricId}">
          ${snapshot.chart[metricId].label}
        </button>
      `)
      .join('');
  }

  if (range) range.textContent = snapshot.rangeLabel;
  if (period) period.textContent = snapshot.rangeLabel;
  if (cadence) cadence.value = overviewState.cadence;

  if (state.demoState === 'empty') {
    document.querySelector('[data-overview-chart]').innerHTML = '<div class="overview-chart__empty"><strong>No activity in this date range</strong><span>Try a wider date range to see performance trends.</span></div>';
    return;
  }

  const plot = { width: 720, height: 220, left: 48, right: 16, top: 24, bottom: 42 };
  const plotWidth = plot.width - plot.left - plot.right;
  const plotHeight = plot.height - plot.top - plot.bottom;
  const maxValue = Math.max(...chart.points.map((point) => point.value));
  const roundedMax = Math.ceil(maxValue / 10000) * 10000 || maxValue;
  const points = chart.points.map((point, index) => {
    const x = plot.left + (index / Math.max(chart.points.length - 1, 1)) * plotWidth;
    const y = plot.top + (1 - point.value / roundedMax) * plotHeight;
    return { ...point, x, y };
  });
  const baseline = plot.top + plotHeight;
  const linePath = buildSmoothChartPath(points);
  const areaPath = `${linePath} L${points.at(-1).x.toFixed(1)},${baseline.toFixed(1)} L${points[0].x.toFixed(1)},${baseline.toFixed(1)} Z`;
  const gridLines = Array.from({ length: 5 }, (_, index) => {
    const value = roundedMax * (1 - index / 4);
    const y = plot.top + (index / 4) * plotHeight;
    return `<g class="overview-chart__grid-line"><line x1="${plot.left}" y1="${y.toFixed(1)}" x2="${plot.width - plot.right}" y2="${y.toFixed(1)}"></line><text x="${plot.left - 10}" y="${(y + 3).toFixed(1)}" text-anchor="end">${formatOverviewChartValue(value, chart.metricId)}</text></g>`;
  }).join('');

  document.querySelector('[data-overview-chart]').innerHTML = `
    <svg viewBox="0 0 ${plot.width} ${plot.height}" preserveAspectRatio="none" aria-hidden="true">
      ${gridLines}
      <path class="overview-chart__area" d="${areaPath}"></path>
      <path class="overview-chart__line" d="${linePath}"></path>
      ${points.map((point) => `<g class="overview-chart__point"><circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3.2"></circle><text x="${point.x.toFixed(1)}" y="${(point.y - 12).toFixed(1)}" text-anchor="middle">${point.display}</text></g>`).join('')}
      ${points.map((point) => `<text class="overview-chart__x-label" x="${point.x.toFixed(1)}" y="${plot.height - 12}" text-anchor="middle">${point.label}</text>`).join('')}
    </svg>
    <div class="overview-chart__legend"><i></i><span>${chart.label}</span></div>
  `;
};

const escapeHtml = (value) => String(value ?? '').replace(/[&<>"']/g, (character) => ({
  '&': '&amp;',
  '<': '&lt;',
  '>': '&gt;',
  '"': '&quot;',
  "'": '&#39;',
}[character]));

const recruitmentPageSet = new Set(recruitmentPageIds);
const operationsPageSet = new Set(operationsPageIds);

const getInitials = (name) => String(name ?? '')
  .split(/\s+/)
  .filter(Boolean)
  .slice(0, 2)
  .map((part) => part.charAt(0))
  .join('')
  .toUpperCase();

const renderRecruitmentAvatar = (record, className = '') => `
  <span class="recruitment-avatar ${className}" data-tone="${record.accent ?? 'neutral'}" aria-hidden="true">
    ${escapeHtml(record.initial ?? getInitials(record.name))}
  </span>
`;

const renderRecruitmentTags = (items = [], className = '') => `
  <div class="recruitment-tags ${className}">
    ${items.slice(0, 3).map((item) => `<span class="recruitment-tag">${escapeHtml(item)}</span>`).join('')}
  </div>
`;

const renderRecruitmentFilterBar = (page, placeholder = 'Search by name or keyword') => `
  <form class="recruitment-filterbar" data-recruitment-search-form>
    <div class="recruitment-filterbar__fields">
      ${page.filters.map((filter) => {
        const selected = recruitmentState.filters[filter.id] ?? '';
        return `
          <label class="recruitment-filter">
            <span>${escapeHtml(filter.label)}</span>
            <select data-recruitment-filter data-filter-key="${filter.id}" aria-label="${escapeHtml(filter.label)}">
              ${filter.options.map((option, index) => {
                const value = index === 0 ? '' : option;
                return `<option value="${escapeHtml(value)}"${selected === value ? ' selected' : ''}>${escapeHtml(option)}</option>`;
              }).join('')}
            </select>
          </label>
        `;
      }).join('')}
    </div>
    <label class="recruitment-search">
      <span>Search</span>
      <span class="recruitment-search__control">
        ${icon('globe')}
        <input type="search" data-recruitment-search value="${escapeHtml(recruitmentState.search)}" placeholder="${escapeHtml(placeholder)}" />
      </span>
    </label>
  </form>
`;

const renderRecruitmentStats = (stats = []) => `
  <div class="recruitment-stat-grid">
    ${stats.map((stat) => `
      <article class="recruitment-stat" data-tone="${stat.tone ?? 'neutral'}">
        <div class="recruitment-stat__top">
          <span>${escapeHtml(stat.label)}</span>
          <span class="recruitment-stat__icon">${icon(stat.icon ?? 'chart')}</span>
        </div>
        <strong>${escapeHtml(stat.value)}</strong>
        ${stat.note ? `<small>${escapeHtml(stat.note)}</small>` : ''}
      </article>
    `).join('')}
  </div>
`;

const renderRecruitmentTabs = (page) => {
  if (!page.tabs?.length || (page.tabs.length === 1 && page.tabs[0].id === 'all')) return '';

  const selectedTab = recruitmentState.tabs[page.id] ?? page.tabs[0].id;
  return `
    <div class="recruitment-tabs" role="tablist" aria-label="${escapeHtml(page.title)} views">
      ${page.tabs.map((tab) => `
        <button
          class="recruitment-tab${selectedTab === tab.id ? ' is-active' : ''}"
          type="button"
          role="tab"
          aria-selected="${selectedTab === tab.id}"
          data-recruitment-tab="${tab.id}"
        >
          <span>${escapeHtml(tab.label)}</span>
          ${tab.count != null ? `<b>${escapeHtml(tab.count)}</b>` : ''}
        </button>
      `).join('')}
    </div>
  `;
};

const getRecruitmentRecords = (page, records) => {
  const filterIds = new Set(page.filters.map((filter) => filter.id));
  const filters = Object.fromEntries(
    Object.entries(recruitmentState.filters).filter(([key, value]) => filterIds.has(key) && value),
  );
  const filtered = filterRecruitmentRecords(records, {
    query: recruitmentState.search,
    filters,
  });

  if (recruitmentState.sort === 'name') {
    return [...filtered].sort((left, right) => left.name.localeCompare(right.name));
  }
  if (recruitmentState.sort === 'reach') {
    return [...filtered].sort((left, right) => Number.parseInt(right.reach ?? right.followers ?? right.visits ?? '0', 10) - Number.parseInt(left.reach ?? left.followers ?? left.visits ?? '0', 10));
  }
  return filtered;
};

const renderRecruitmentSort = () => `
  <label class="recruitment-sort">
    <span>Sort by</span>
    <select data-recruitment-sort aria-label="Sort results">
      <option value="relevance"${recruitmentState.sort === 'relevance' ? ' selected' : ''}>Recommended</option>
      <option value="name"${recruitmentState.sort === 'name' ? ' selected' : ''}>Name</option>
      <option value="reach"${recruitmentState.sort === 'reach' ? ' selected' : ''}>Audience size</option>
    </select>
  </label>
`;

const renderRecruitmentEmpty = (title, detail) => `
  <div class="recruitment-empty">
    <span class="recruitment-empty__mark">◎</span>
    <strong>${escapeHtml(title)}</strong>
    <span>${escapeHtml(detail)}</span>
  </div>
`;

const renderMediaStrip = (record) => `
  <div class="recruitment-media-strip" aria-label="${escapeHtml(record.name)} content preview">
    ${(record.media ?? []).slice(0, 5).map((label, index) => `
      <span class="recruitment-media-tile" data-tone="${record.accent ?? 'neutral'}" style="--tile-index:${index}">
        <small>${escapeHtml(label)}</small>
      </span>
    `).join('')}
  </div>
`;

const renderInfluencerFeatured = (record) => `
  <article class="influencer-featured-card">
    <div class="influencer-featured-card__profile">
      ${renderRecruitmentAvatar(record, 'recruitment-avatar--large')}
      <div>
        <strong>${escapeHtml(record.name)}</strong>
        <span>${escapeHtml(record.country)} · ${escapeHtml(record.followers)}</span>
      </div>
    </div>
    ${renderRecruitmentTags(record.categories)}
    <button class="recruitment-button recruitment-button--quiet" type="button" data-recruitment-action="view" data-record-id="${record.id}">
      View profile ${icon('arrow')}
    </button>
  </article>
`;

const renderInfluencerRow = (record) => `
  <article class="discovery-influencer-row">
    <div class="discovery-influencer-row__identity">
      ${renderRecruitmentAvatar(record)}
      <div>
        <strong>${escapeHtml(record.name)}</strong>
        <span>${escapeHtml(record.country)} · ${escapeHtml(record.followers)}</span>
        <small>${escapeHtml(record.channels?.join(' · '))}</small>
      </div>
    </div>
    <div class="discovery-influencer-row__categories">
      <span class="recruitment-field-label">Categories</span>
      ${renderRecruitmentTags(record.categories)}
    </div>
    ${renderMediaStrip(record)}
    <div class="recruitment-row-actions">
      <button class="recruitment-button recruitment-button--primary" type="button" data-recruitment-action="invite" data-record-id="${record.id}">Invite</button>
      <button class="recruitment-button recruitment-button--secondary" type="button" data-recruitment-action="message" data-record-id="${record.id}">${icon('message')} Message</button>
    </div>
  </article>
`;

const renderPublisherFeatured = (record) => `
  <article class="publisher-featured-card">
    <span class="publisher-mark" data-tone="${record.accent ?? 'neutral'}">${escapeHtml(getInitials(record.name).slice(0, 2))}</span>
    <div>
      <strong>${escapeHtml(record.name)}</strong>
      <span>${escapeHtml(record.type)} · ${escapeHtml(record.visits)}</span>
    </div>
    <button class="recruitment-icon-link" type="button" data-recruitment-action="view" data-record-id="${record.id}" aria-label="View ${escapeHtml(record.name)}">${icon('arrow')}</button>
  </article>
`;

const renderPublisherCard = (record) => `
  <article class="publisher-card">
    <div class="publisher-card__header">
      <span class="publisher-mark publisher-mark--large" data-tone="${record.accent ?? 'neutral'}">${escapeHtml(getInitials(record.name).slice(0, 2))}</span>
      <button class="recruitment-icon-link" type="button" data-recruitment-action="view" data-record-id="${record.id}" aria-label="View ${escapeHtml(record.name)}">${icon('arrow')}</button>
    </div>
    <strong class="publisher-card__name">${escapeHtml(record.name)}</strong>
    <span class="publisher-card__type">${escapeHtml(record.type)} · ${escapeHtml(record.country)}</span>
    <div class="publisher-card__metric"><span>Monthly reach</span><strong>${escapeHtml(record.visits)}</strong></div>
    ${renderRecruitmentTags(record.categories)}
    <div class="publisher-card__footer">
      <button class="recruitment-button recruitment-button--secondary" type="button" data-recruitment-action="message" data-record-id="${record.id}">${icon('message')} Message</button>
      <button class="recruitment-button recruitment-button--primary" type="button" data-recruitment-action="invite" data-record-id="${record.id}">Invite</button>
    </div>
  </article>
`;

const renderPartnerCard = (record) => `
  <article class="partner-card">
    <div class="partner-card__header">
      <div class="partner-card__identity">
        ${renderRecruitmentAvatar(record)}
        <div>
          <strong>${escapeHtml(record.name)}</strong>
          <span>${escapeHtml(record.type)} · ${escapeHtml(record.country)}</span>
        </div>
      </div>
      <button class="recruitment-icon-link" type="button" data-recruitment-action="view" data-record-id="${record.id}" aria-label="View ${escapeHtml(record.name)}">${icon('arrow')}</button>
    </div>
    <div class="partner-card__meta">
      <span class="recruitment-status-chip" data-tone="${record.status === 'Followed' ? 'neutral' : 'success'}">${escapeHtml(record.status)}</span>
      <span>${escapeHtml(record.lastActivity)}</span>
    </div>
    ${renderRecruitmentTags(record.categories)}
    <div class="partner-card__facts">
      <span><small>Audience</small><strong>${escapeHtml(record.audience)}</strong></span>
      <span><small>Reach</small><strong>${escapeHtml(record.reach)}</strong></span>
    </div>
    <div class="partner-card__footer">
      <button class="partner-group-button" type="button" data-recruitment-action="change-group" data-record-id="${record.id}">${escapeHtml(record.group)} ${icon('chevron')}</button>
      <div class="recruitment-row-actions">
        <button class="recruitment-button recruitment-button--secondary" type="button" data-recruitment-action="message" data-record-id="${record.id}">${icon('message')} Message</button>
        <button class="recruitment-button recruitment-button--quiet" type="button" data-recruitment-action="follow" data-record-id="${record.id}">Follow</button>
      </div>
    </div>
  </article>
`;

const renderApplicationRow = (record) => `
  <article class="application-row">
    <div class="application-row__identity">
      ${renderRecruitmentAvatar(record)}
      <div>
        <strong>${escapeHtml(record.name)}</strong>
        <span>${escapeHtml(record.identifier)} · ${escapeHtml(record.type)}</span>
        <small>${escapeHtml(record.source)} · ${escapeHtml(record.submitted)}</small>
      </div>
    </div>
    <div class="application-row__profile">
      <span class="recruitment-field-label">Profile</span>
      <span>${escapeHtml(record.country)} · ${escapeHtml(record.followers)} followers</span>
      ${renderRecruitmentTags(record.categories)}
    </div>
    <p class="application-row__message">${escapeHtml(record.message)}</p>
    <div class="application-row__actions">
      <button class="recruitment-button recruitment-button--secondary" type="button" data-recruitment-action="decline" data-record-id="${record.id}">Decline</button>
      <button class="recruitment-button recruitment-button--primary" type="button" data-recruitment-action="approve" data-record-id="${record.id}">Approve</button>
      <button class="recruitment-icon-link" type="button" data-recruitment-action="view" data-record-id="${record.id}" aria-label="View ${escapeHtml(record.name)} details">${icon('arrow')}</button>
    </div>
  </article>
`;

const inviteStatusTone = (statusKey) => ({
  accepted: 'success',
  pending: 'warning',
  expired: 'danger',
}[statusKey] ?? 'neutral');

const renderInviteTable = (records, page) => `
  <section class="recruitment-panel recruitment-table-panel">
    <div class="recruitment-panel__header">
      <div>
        <span class="eyebrow">Invitation activity</span>
        <h2>Recent invitations</h2>
      </div>
      <button class="recruitment-button recruitment-button--primary" type="button" data-recruitment-action="invite">${icon('send')} Invite partner</button>
    </div>
    <div class="recruitment-table-scroll">
      <table class="recruitment-table">
        <thead><tr>${page.columns.map((column) => `<th scope="col">${escapeHtml(column)}</th>`).join('')}</tr></thead>
        <tbody>
          ${records.length ? records.map((record) => `
            <tr>
              <td>
                <div class="table-identity">
                  ${renderRecruitmentAvatar(record)}
                  <span><strong>${escapeHtml(record.name)}</strong><small>${escapeHtml(record.email)}</small></span>
                </div>
              </td>
              <td>${escapeHtml(record.channel)}</td>
              <td>${escapeHtml(record.sentDate)}</td>
              <td>${escapeHtml(record.lastActivity)}</td>
              <td><span class="recruitment-status-chip" data-tone="${inviteStatusTone(record.statusKey)}">${escapeHtml(record.status)}</span></td>
              <td>
                <div class="table-actions">
                  <button class="recruitment-button recruitment-button--quiet" type="button" data-recruitment-action="view" data-record-id="${record.id}">View</button>
                  ${record.statusKey !== 'accepted' ? `<button class="recruitment-button recruitment-button--quiet" type="button" data-recruitment-action="resend" data-record-id="${record.id}">Resend</button>` : ''}
                </div>
              </td>
            </tr>
          `).join('') : `<tr><td colspan="${page.columns.length}">${renderRecruitmentEmpty('No invitations found', 'Try clearing a filter or searching another partner.')}</td></tr>`}
        </tbody>
      </table>
    </div>
  </section>
`;

const renderInfluencersPage = (page) => {
  const records = getRecruitmentRecords(page, recruitmentData.influencers);
  const featured = recruitmentData.influencers.slice(0, 3);

  return `
    <div class="recruitment-module recruitment-module--discovery" data-recruitment-page="${page.id}">
      ${renderRecruitmentFilterBar(page, 'Search influencers')}
      <section class="recruitment-panel recruitment-featured-panel">
        <div class="recruitment-panel__header">
          <div><span class="eyebrow">Curated matches</span><h2>Featured influencers</h2></div>
          <button class="recruitment-button recruitment-button--quiet" type="button" data-recruitment-action="refresh">Refresh matches ${icon('arrow')}</button>
        </div>
        <div class="influencer-featured-grid">${featured.map(renderInfluencerFeatured).join('')}</div>
      </section>
      <section class="recruitment-panel">
        <div class="recruitment-panel__header recruitment-panel__header--results">
          <div><span class="eyebrow">Influencer directory</span><h2>${records.length} profiles ready to review</h2></div>
          ${renderRecruitmentSort()}
        </div>
        <div class="discovery-influencer-list">
          ${records.length ? records.map(renderInfluencerRow).join('') : renderRecruitmentEmpty('No influencers match these filters', 'Try a broader category, country or follower range.')}
        </div>
      </section>
    </div>
  `;
};

const renderPublishersPage = (page) => {
  const records = getRecruitmentRecords(page, recruitmentData.publishers);
  const featured = recruitmentData.publishers.slice(0, 3);

  return `
    <div class="recruitment-module recruitment-module--discovery" data-recruitment-page="${page.id}">
      ${renderRecruitmentFilterBar(page, 'Search publishers')}
      <section class="recruitment-panel publisher-featured-panel">
        <div class="recruitment-panel__header">
          <div><span class="eyebrow">Curated matches</span><h2>Publishers to explore</h2></div>
          <span class="recruitment-panel__note">Updated today</span>
        </div>
        <div class="publisher-featured-grid">${featured.map(renderPublisherFeatured).join('')}</div>
      </section>
      <section class="recruitment-panel">
        <div class="recruitment-panel__header recruitment-panel__header--results">
          <div><span class="eyebrow">Publisher directory</span><h2>${records.length} publishers ready to review</h2></div>
          ${renderRecruitmentSort()}
        </div>
        <div class="publisher-grid">
          ${records.length ? records.map(renderPublisherCard).join('') : renderRecruitmentEmpty('No publishers match these filters', 'Try a broader category, platform or language.')}
        </div>
      </section>
    </div>
  `;
};

const renderPartnersPage = (page) => {
  const allRecords = getRecruitmentRecords(page, recruitmentData.partners);
  const selectedTab = recruitmentState.tabs[page.id] ?? 'joined';
  const records = allRecords.filter((record) => {
    if (selectedTab === 'joined') return record.status === 'In relationship';
    if (selectedTab === 'followed') return record.status === 'Followed';
    if (selectedTab === 'new') return ['Invited', 'Pending'].includes(record.status);
    return record.status === 'Blocked';
  });

  return `
    <div class="recruitment-module recruitment-module--relationship" data-recruitment-page="${page.id}">
      ${renderRecruitmentStats(page.stats)}
      ${renderRecruitmentFilterBar(page, 'Search partners')}
      <div class="recruitment-module-toolbar">
        ${renderRecruitmentTabs(page)}
        <button class="recruitment-button recruitment-button--secondary" type="button" data-recruitment-action="sync">${icon('trend')} Sync partners</button>
      </div>
      <section class="recruitment-panel">
        <div class="recruitment-panel__header recruitment-panel__header--results">
          <div><span class="eyebrow">Relationship workspace</span><h2>${records.length} partners in this view</h2></div>
          ${renderRecruitmentSort()}
        </div>
        <div class="partner-grid">
          ${records.length ? records.map(renderPartnerCard).join('') : renderRecruitmentEmpty(selectedTab === 'blocked' ? 'No blocked partners' : 'No partners match this view', 'Try another tab or clear one of the relationship filters.')}
        </div>
      </section>
    </div>
  `;
};

const renderApplicationsPage = (page) => {
  const allRecords = getRecruitmentRecords(page, recruitmentData.applications);
  const selectedTab = recruitmentState.tabs[page.id] ?? 'new';
  const records = allRecords.filter((record) => record.status === selectedTab);

  return `
    <div class="recruitment-module recruitment-module--applications" data-recruitment-page="${page.id}">
      ${renderRecruitmentStats(page.stats)}
      ${renderRecruitmentFilterBar(page, 'Search applicants')}
      <div class="recruitment-module-toolbar">
        ${renderRecruitmentTabs(page)}
        <span class="recruitment-toolbar-note">Review applications with the same audit trail as the detail view.</span>
      </div>
      <section class="recruitment-panel">
        <div class="recruitment-panel__header recruitment-panel__header--results">
          <div><span class="eyebrow">Application queue</span><h2>${records.length} applications in this view</h2></div>
          <span class="recruitment-panel__note">Updated a few minutes ago</span>
        </div>
        <div class="application-list">
          ${records.length ? records.map(renderApplicationRow).join('') : renderRecruitmentEmpty('No applications in this view', 'New partner applications will appear here when they are submitted.')}
        </div>
      </section>
    </div>
  `;
};

const renderInviteHistoryPage = (page) => {
  const records = getRecruitmentRecords(page, recruitmentData.invites);

  return `
    <div class="recruitment-module recruitment-module--invites" data-recruitment-page="${page.id}">
      ${renderRecruitmentStats(page.stats)}
      ${renderRecruitmentFilterBar(page, 'Search partner or email')}
      ${renderInviteTable(records, page)}
    </div>
  `;
};

const renderRecruitmentPage = (pageId) => {
  const page = getRecruitmentPage(pageId);
  const pageRenderers = {
    'discover-influencers': renderInfluencersPage,
    'discover-publishers': renderPublishersPage,
    'my-partners': renderPartnersPage,
    applications: renderApplicationsPage,
    'invite-history': renderInviteHistoryPage,
  };

  modulePage.innerHTML = pageRenderers[page.id]?.(page) ?? renderRecruitmentEmpty('Module unavailable', 'This workspace is not configured yet.');
};

const renderWorkspacePage = (pageId) => {
  const pageState = operationsState[getOperationsStateKey(pageId)];
  modulePage.innerHTML = renderOperationsPage(pageId, { pageState, icon, escapeHtml });
};

const renderUtilityNavigationState = () => {
  const activePageId = state.activeNavigationChild ?? state.activeNavigationId;
  document.querySelectorAll('[data-utility-route]').forEach((utility) => {
    const isActive = utility.dataset.utilityRoute === activePageId;
    utility.classList.toggle('is-active', isActive);
    if (isActive) utility.setAttribute('aria-current', 'page');
    else utility.removeAttribute('aria-current');
  });
};

const renderPage = () => {
  const context = findNavigationContext(state.activeNavigationChild ?? state.activeNavigationId);
  const isOverview = state.activeNavigationId === 'overview' && !state.activeNavigationChild;
  const activePageId = state.activeNavigationChild ?? state.activeNavigationId;
  const recruitmentPage = recruitmentPageSet.has(activePageId) ? getRecruitmentPage(activePageId) : null;
  const operationsPage = operationsPageSet.has(activePageId) ? getOperationsPage(activePageId) : null;

  const currentPageTitle = recruitmentPage?.title ?? operationsPage?.title ?? context.current.label;
  pageTitle.textContent = isOverview ? t('page.overview.title') : localizedPageTitle(activePageId, currentPageTitle);
  pageDescription.textContent = isOverview
    ? t('page.overview.description')
    : recruitmentPage?.description ?? operationsPage?.description ?? `${context.current.label} workspace preview for the current brand scope.`;
  breadcrumbParent.textContent = isOverview ? t('shell.merchantWorkspace') : context.parent.label;
  breadcrumbCurrent.textContent = isOverview ? t('page.overview.title') : localizedPageTitle(activePageId, currentPageTitle);
  overviewPage.hidden = !isOverview;
  modulePage.hidden = isOverview || (!recruitmentPage && !operationsPage);
  modulePlaceholder.hidden = isOverview || Boolean(recruitmentPage || operationsPage);

  if (recruitmentPage) {
    renderRecruitmentPage(recruitmentPage.id);
  } else if (operationsPage) {
    renderWorkspacePage(operationsPage.id);
  } else if (!isOverview) {
    modulePlaceholder.querySelector('[data-module-title]').textContent = context.current.label;
    modulePlaceholder.querySelector('[data-module-parent]').textContent = context.parent.label;
  }
};

const renderAll = () => {
  renderNavigation();
  renderPeriods();
  renderMetrics();
  renderOverviewChart();
  renderPartnerPerformance();
  renderCommissionSummary();
  renderPartnerStatus();
  renderActionCenter();
  renderQuickActions();
  renderDemoStateBanner();
  renderPage();
  renderUtilityNavigationState();
};

const showToast = (message) => {
  window.clearTimeout(toastTimer);
  toastMessage.textContent = message;
  toast.hidden = false;

  requestAnimationFrame(() => toast.classList.add('is-visible'));
  toastTimer = window.setTimeout(() => {
    toast.classList.remove('is-visible');
    window.setTimeout(() => {
      toast.hidden = true;
    }, 220);
  }, 3200);
};

const closePeriodMenu = () => {
  periodMenu.hidden = true;
  periodToggle.setAttribute('aria-expanded', 'false');
};

const navigateTo = (navigationId) => {
  const context = findNavigationContext(navigationId);
  state = {
    ...state,
    activeNavigationId: context.parent.id,
    activeNavigationChild: context.current.id === context.parent.id ? null : context.current.id,
    expandedGroups: context.parent.children && !state.expandedGroups.includes(context.parent.id)
      ? [...state.expandedGroups, context.parent.id]
      : state.expandedGroups,
  };
  renderPage();
  renderNavigation();
  renderUtilityNavigationState();
  showToast(`${context.current.label} selected`);

  if (window.matchMedia('(max-width: 767px)').matches) closeSidebar();
};

const openPartnerDrawer = (partnerId, trigger) => {
  const partner = state.partners.find((item) => item.id === partnerId);
  if (!partner) return;

  lastDrawerTrigger = trigger ?? document.activeElement;
  state = { ...state, activePartnerId: partnerId };
  drawerContent.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-header__merchant">
        <span class="merchant-logo" style="--logo-background:#eaf5fe;--logo-color:#1777bf">N</span>
        <div>
          <h2 id="merchant-drawer-title">${partner.name}</h2>
          <p>${partner.type} · ${partner.channel}</p>
        </div>
      </div>
      <button class="icon-button" type="button" data-drawer-close aria-label="Close partner details">
        ${icon('x')}
      </button>
    </div>
    <section class="drawer-section">
      <p class="drawer-section__label">Relationship summary</p>
      <div class="drawer-commission">
        <span>Tracked commission</span>
        <strong>${partner.commission}</strong>
      </div>
    </section>
    <section class="drawer-section">
      <p class="drawer-section__label">Partner profile</p>
      <div class="drawer-facts">
        <div class="drawer-fact"><span>Status</span><strong>${partner.status}</strong></div>
        <div class="drawer-fact"><span>Group</span><strong>${partner.group}</strong></div>
        <div class="drawer-fact"><span>Channel</span><strong>${partner.channel}</strong></div>
        <div class="drawer-fact"><span>Audience</span><strong>${partner.audience}</strong></div>
      </div>
    </section>
    <div class="drawer-actions">
      <button class="button button--secondary" type="button" data-action-navigation="my-partners">
        View partner record
      </button>
      <button class="button button--primary" type="button" data-action-navigation="transactions">
        View performance
      </button>
    </div>
  `;
  drawer.hidden = false;
  document.body.classList.add('is-overlay-open');
  requestAnimationFrame(() => {
    drawer.classList.add('is-open');
    drawerBackdrop.classList.add('is-open');
    drawer.querySelector('[data-drawer-close]')?.focus();
  });
};

const closePartnerDrawer = () => {
  const activePartnerId = state.activePartnerId;
  drawer.classList.remove('is-open');
  drawerBackdrop.classList.remove('is-open');
  window.setTimeout(() => {
    const fallbackTrigger = document.querySelector(`[data-partner-view="${activePartnerId}"]`);
    const focusTarget = lastDrawerTrigger?.isConnected ? lastDrawerTrigger : fallbackTrigger;

    drawer.hidden = true;
    state = { ...state, activePartnerId: null };
    document.body.classList.remove('is-overlay-open');
    focusTarget?.focus();
    lastDrawerTrigger = null;
  }, 240);
};

const openSidebar = () => {
  sidebar.classList.add('is-open');
  sidebarBackdrop.classList.add('is-open');
  document.body.classList.add('is-navigation-open');
  sidebarCloseButton.focus();
};

const closeSidebar = () => {
  sidebar.classList.remove('is-open');
  sidebarBackdrop.classList.remove('is-open');
  document.body.classList.remove('is-navigation-open');
  sidebarOpenButton.focus();
};

navigation.addEventListener('click', (event) => {
  const groupButton = event.target.closest('[data-nav-group]');
  const childButton = event.target.closest('[data-nav-child]');
  const itemButton = event.target.closest('[data-nav-item]');

  if (childButton) {
    navigateTo(childButton.dataset.navChild);
    return;
  }

  if (!itemButton) return;

  if (groupButton) {
    state = toggleNavigationGroup(state, groupButton.dataset.navGroup);
    renderNavigation();
    return;
  }

  navigateTo(itemButton.dataset.navItem);
});

overviewPage.addEventListener('click', (event) => {
  const metricTrigger = event.target.closest('[data-overview-metric]');
  if (!metricTrigger) return;

  overviewState = selectOverviewMetric(overviewState, metricTrigger.dataset.overviewMetric);
  renderMetrics();
  renderOverviewChart();
  showToast(`${metricTrigger.textContent.trim().replace(/\s+/g, ' ')} trend selected`);
});

overviewPage.addEventListener('change', (event) => {
  const cadence = event.target.closest('[data-overview-chart-cadence]');
  if (!cadence) return;

  overviewState = selectOverviewCadence(overviewState, cadence.value);
  renderOverviewChart();
  showToast(`${cadence.options[cadence.selectedIndex].textContent} interval selected`);
});


const getActiveRecruitmentPageId = () => state.activeNavigationChild ?? state.activeNavigationId;
const getActiveOperationsPageId = () => state.activeNavigationChild ?? state.activeNavigationId;

modulePage.addEventListener('submit', (event) => {
  const workspaceForm = event.target.closest('[data-workspace-search-form]');
  if (workspaceForm) {
    event.preventDefault();
    const pageId = workspaceForm.dataset.workspacePageId ?? getActiveOperationsPageId();
    const search = workspaceForm.querySelector('[data-workspace-search]')?.value ?? '';
    operationsState = updateOperationsSearch(operationsState, pageId, search);
    renderWorkspacePage(pageId);
    showToast(search ? `Search updated to “${search}”` : 'Search cleared');
    return;
  }

  const form = event.target.closest('[data-recruitment-search-form]');
  if (!form) return;
  event.preventDefault();
  const search = form.querySelector('[data-recruitment-search]')?.value ?? '';
  recruitmentState = updateRecruitmentSearch(recruitmentState, search);
  renderRecruitmentPage(getActiveRecruitmentPageId());
  showToast(search ? `Search updated to “${search}”` : 'Search cleared');
});

modulePage.addEventListener('change', (event) => {
  const workspaceFilter = event.target.closest('[data-workspace-filter]');
  if (workspaceFilter) {
    const pageId = workspaceFilter.dataset.workspacePageId ?? getActiveOperationsPageId();
    operationsState = updateOperationsFilter(operationsState, pageId, workspaceFilter.dataset.filterKey, workspaceFilter.value);
    renderWorkspacePage(pageId);
    showToast(`${workspaceFilter.getAttribute('aria-label') ?? 'Filter'} updated`);
    return;
  }

  const filter = event.target.closest('[data-recruitment-filter]');
  const sort = event.target.closest('[data-recruitment-sort]');
  const pageId = getActiveRecruitmentPageId();
  if (filter) {
    recruitmentState = updateRecruitmentFilter(recruitmentState, filter.dataset.filterKey, filter.value);
    renderRecruitmentPage(pageId);
    showToast(`${filter.getAttribute('aria-label') ?? 'Filter'} updated`);
    return;
  }
  if (sort) {
    recruitmentState = { ...recruitmentState, sort: sort.value };
    renderRecruitmentPage(pageId);
    showToast('Result order updated');
  }
});

modulePage.addEventListener('click', (event) => {
  const workspaceTab = event.target.closest('[data-workspace-tab]');
  if (workspaceTab) {
    const pageId = workspaceTab.dataset.workspacePageId ?? getActiveOperationsPageId();
    operationsState = selectOperationsTab(operationsState, pageId, workspaceTab.dataset.workspaceTabValue);
    renderWorkspacePage(pageId);
    showToast(`${workspaceTab.textContent.trim()} selected`);
    return;
  }

  const workspaceRecord = event.target.closest('[data-workspace-record-id]');
  if (workspaceRecord) {
    const pageId = workspaceRecord.dataset.workspacePageId ?? getActiveOperationsPageId();
    operationsState = selectOperationsRecord(operationsState, pageId, workspaceRecord.dataset.workspaceRecordId);
    renderWorkspacePage(pageId);
    showToast('Record details updated');
    return;
  }

  const workspaceAction = event.target.closest('[data-workspace-action]');
  if (workspaceAction) {
    const messages = {
      'export-performance': 'Performance CSV export prepared',
      'export-brand-performance': 'Brand performance report prepared',
      'bulk-approve': 'Selected transactions are ready for approval',
      'export-transactions': 'Transaction CSV export prepared',
      'add-transaction': 'Transaction creation flow is ready',
      'find-campaign': 'Campaign finder is ready',
      'create-amazon-campaign': 'Amazon BRB campaign creation is ready',
      'previous-page': 'Previous page selected',
      'next-page': 'Next page selected',
    };
    showToast(messages[workspaceAction.dataset.workspaceAction] ?? 'Workspace action is ready for product integration');
    return;
  }

  const tab = event.target.closest('[data-recruitment-tab]');
  if (tab) {
    const pageId = getActiveRecruitmentPageId();
    recruitmentState = selectRecruitmentTab(recruitmentState, pageId, tab.dataset.recruitmentTab);
    renderRecruitmentPage(pageId);
    showToast(`${tab.textContent.trim().replace(/\s+/g, ' ')} selected`);
    return;
  }

  const action = event.target.closest('[data-recruitment-action]');
  if (!action) return;
  const records = [
    ...recruitmentData.influencers,
    ...recruitmentData.publishers,
    ...recruitmentData.partners,
    ...recruitmentData.applications,
    ...recruitmentData.invites,
  ];
  const record = records.find((item) => item.id === action.dataset.recordId);
  const actionMessages = {
    invite: record ? `Invite prepared for ${record.name}` : 'Invite partner flow is ready',
    message: record ? `Message composer opened for ${record.name}` : 'Message composer is ready',
    follow: record ? `${record.name} added to followed partners` : 'Partner follow flow is ready',
    'change-group': record ? `Group selector opened for ${record.name}` : 'Group selector is ready',
    sync: 'Partner sync started',
    refresh: 'Featured matches refreshed',
    approve: record ? `${record.name} approved` : 'Application approved',
    decline: record ? `${record.name} declined` : 'Application declined',
    view: record ? `Opening details for ${record.name}` : 'Details view is ready',
    resend: record ? `Invitation resent to ${record.name}` : 'Invitation resent',
  };
  showToast(actionMessages[action.dataset.recruitmentAction] ?? 'Action is ready for product integration');
});


periodToggle.addEventListener('click', (event) => {
  event.stopPropagation();
  const nextOpenState = periodMenu.hidden;
  periodMenu.hidden = !nextOpenState;
  periodToggle.setAttribute('aria-expanded', String(nextOpenState));
});

periodMenu.addEventListener('click', (event) => {
  const option = event.target.closest('[data-period]');
  if (!option) return;

  state = selectPeriod(state, option.dataset.period);
  renderAll();
  closePeriodMenu();
  showToast(`Date range updated to ${option.textContent.trim().replace(/\s+/g, ' ')}`);
});

demoStateSelect.addEventListener('change', (event) => {
  state = selectDemoState(state, event.target.value);
  renderAll();
});

document.addEventListener('click', (event) => {
  if (!event.target.closest('.period-picker')) closePeriodMenu();
  const actionNavigation = event.target.closest('[data-action-navigation]');
  if (actionNavigation) {
    navigateTo(actionNavigation.dataset.actionNavigation);
    return;
  }

  const partnerView = event.target.closest('[data-partner-view]');
  if (partnerView) {
    openPartnerDrawer(partnerView.dataset.partnerView, partnerView);
    return;
  }

  const demoAction = event.target.closest('[data-demo-action]');
  if (demoAction) showToast(`${demoAction.dataset.demoAction} is ready for product integration`);
});

drawerContent.addEventListener('click', (event) => {
  if (event.target.closest('[data-drawer-close]')) closePartnerDrawer();
});

drawerBackdrop.addEventListener('click', closePartnerDrawer);
sidebarOpenButton.addEventListener('click', openSidebar);
sidebarCloseButton.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (drawer.classList.contains('is-open')) {
    closePartnerDrawer();
    return;
  }

  if (sidebar.classList.contains('is-open')) {
    closeSidebar();
    return;
  }

  closePeriodMenu();
});

window.addEventListener('resize', () => {
  if (window.innerWidth > 767 && sidebar.classList.contains('is-open')) {
    sidebar.classList.remove('is-open');
    sidebarBackdrop.classList.remove('is-open');
    document.body.classList.remove('is-navigation-open');
  }
});

document.querySelector('[data-toast-close]').addEventListener('click', () => {
  window.clearTimeout(toastTimer);
  toast.classList.remove('is-visible');
  window.setTimeout(() => {
    toast.hidden = true;
  }, 220);
});

renderAll();
