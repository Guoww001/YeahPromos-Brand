import { apiCredentialsPageData, attributionPageData, bannersImagesPageData, campaignPageData, commissionInvoicesPageData, commissionRulesPageData, dashboardData, financeBalancePageData, helpCenterPageData, messagesPageData } from './data.mjs?v=merchant-reference-19';
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
const campaignPage = document.querySelector('[data-campaign-page]');
const campaignMetrics = document.querySelector('[data-campaign-metrics]');
const campaignTabs = document.querySelector('[data-campaign-tabs]');
const campaignRows = document.querySelector('[data-campaign-rows]');
const campaignSearch = document.querySelector('[data-campaign-search]');
const campaignSelectionCount = document.querySelector('[data-campaign-selection-count]');
const campaignSelectAll = document.querySelector('[data-campaign-select-all]');
const campaignResultCount = document.querySelector('[data-campaign-result-count]');
const pageActions = document.querySelector('[data-page-actions]');
const attributionPage = document.querySelector('[data-attribution-page]');
const attributionModelSelect = document.querySelector('[data-attribution-model]');
const attributionCalloutIcon = document.querySelector('.attribution-callout__icon');
const attributionCalloutCopy = document.querySelector('[data-attribution-callout-copy]');
const attributionActiveModel = document.querySelector('[data-attribution-active-model]');
const attributionModelState = document.querySelector('[data-attribution-model-state]');
const attributionAssistedRevenue = document.querySelector('[data-attribution-assisted-revenue]');
const attributionCoverage = document.querySelector('[data-attribution-coverage]');
const attributionDistribution = document.querySelector('[data-attribution-distribution]');
const attributionRules = document.querySelector('[data-attribution-rules]');
const attributionAudit = document.querySelector('[data-attribution-audit]');
const commissionRulesPage = document.querySelector('[data-commission-rules-page]');
const commissionRulesActions = document.querySelector('[data-commission-rules-actions]');
const commissionRulesSummary = document.querySelector('[data-commission-rules-summary]');
const commissionRulesRows = document.querySelector('[data-commission-rules-rows]');
const commissionRulesSearch = document.querySelector('[data-commission-rules-search]');
const commissionRulesSelectAll = document.querySelector('[data-commission-rules-select-all]');
const commissionRulesResultCount = document.querySelector('[data-commission-rules-result-count]');
const commissionRulesDetail = document.querySelector('[data-commission-rules-detail]');
const financePage = document.querySelector('[data-finance-page]');
const financeActions = document.querySelector('[data-finance-actions]');
const financeSummary = document.querySelector('[data-finance-summary]');
const financeChart = document.querySelector('[data-finance-chart]');
const financeTrendSummary = document.querySelector('[data-finance-trend-summary]');
const financePeriodSelect = document.querySelector('[data-finance-period]');
const financePayoutSchedule = document.querySelector('[data-finance-payout-schedule]');
const financePaymentMethods = document.querySelector('[data-finance-payment-methods]');
const financePayoutRows = document.querySelector('[data-finance-payout-rows]');
const financeResultCount = document.querySelector('[data-finance-result-count]');
const invoicesPage = document.querySelector('[data-invoices-page]');
const invoicesDateRange = document.querySelector('[data-invoices-date-range]');
const invoicesRows = document.querySelector('[data-invoices-rows]');
const invoicesResultCount = document.querySelector('[data-invoices-result-count]');
const invoicesSelectAll = document.querySelector('[data-invoices-select-all]');
const helpCenterPage = document.querySelector('[data-help-center-page]');
const helpCenterCategories = document.querySelector('[data-help-center-categories]');
const helpCenterArticles = document.querySelector('[data-help-center-articles]');
const helpCenterSearch = document.querySelector('[data-help-center-search]');
const helpCenterLoadMore = document.querySelector('[data-help-center-action="load-more-articles"]');
const helpCenterStatus = document.querySelector('[data-help-center-status]');
const helpCenterUtility = document.querySelector('[data-help-center-utility]');
const apiCredentialsPage = document.querySelector('[data-api-credentials-page]');
const apiCredentialsActions = document.querySelector('[data-api-credentials-actions]');
const apiCredentialsEnvironmentButtons = document.querySelectorAll('[data-api-credentials-environment]');
const apiCredentialsSearch = document.querySelector('[data-api-credentials-search]');
const apiCredentialsStatus = document.querySelector('[data-api-credentials-status]');
const apiCredentialsFilterButton = document.querySelector('[data-api-credentials-action="toggle-filter"]');
const apiCredentialsFilterMenu = document.querySelector('[data-api-credentials-filter-menu]');
const apiCredentialsRows = document.querySelector('[data-api-credentials-rows]');
const apiCredentialsResultCount = document.querySelector('[data-api-credentials-result-count]');
const apiCredentialsWebhooks = document.querySelector('[data-api-credentials-webhooks]');
const messagesPage = document.querySelector('[data-messages-page]');
const messagesPageActions = document.querySelector('[data-messages-page-actions]');
const messagesTabs = document.querySelector('[data-messages-tabs]');
const messagesSearch = document.querySelector('[data-messages-search]');
const messagesFilter = document.querySelector('[data-messages-filter]');
const messagesSort = document.querySelector('[data-messages-sort]');
const messagesList = document.querySelector('[data-messages-list]');
const messagesResultCount = document.querySelector('[data-messages-result-count]');
const messagesSelectAll = document.querySelector('[data-messages-select-all]');
const messagesConversation = document.querySelector('[data-messages-conversation]');
const messagesPartnerDetails = document.querySelector('[data-messages-partner-details]');
const productsAssetsPage = document.querySelector('[data-products-assets-page]');
const productsAssetsTabs = document.querySelector('[data-products-assets-tabs]');
const productsAssetsGrid = document.querySelector('[data-products-assets-grid]');
const productsAssetsDetail = document.querySelector('[data-products-assets-detail]');
const productsAssetsSearch = document.querySelector('[data-products-assets-search]');
const productsAssetsSearchForm = document.querySelector('[data-products-assets-search-form]');
const productsAssetsResultCount = document.querySelector('[data-products-assets-result-count]');
const productsAssetsPageLabel = document.querySelector('[data-products-assets-page-label]');
const productsAssetsSort = document.querySelector('[data-products-assets-sort]');
const productsAssetsPageSize = document.querySelector('[data-products-assets-page-size]');

const campaignState = {
  activeTab: 'all',
  search: '',
  filters: {
    type: 'all',
    channel: 'all',
    status: 'all',
    owner: 'all',
    date: '90d',
    savedView: 'all',
  },
  selectedIds: new Set(['spring-collection-promo']),
};

const campaignStatusMeta = {
  Active: { tone: 'active' },
  Pending: { tone: 'pending' },
  Completed: { tone: 'completed' },
  Paused: { tone: 'paused' },
  Closed: { tone: 'closed' },
  Draft: { tone: 'draft' },
};

const campaignDateRangeDays = {
  '7d': 7,
  '30d': 30,
  '90d': 90,
};

const campaignReferenceDate = Date.parse('2025-05-16T23:59:59Z');
const campaignCurrentOwner = 'Demo Owner A';

const attributionState = {
  activeModel: attributionPageData.activeModel,
  isDirty: false,
};

const commissionRulesState = {
  search: '',
  selectedRuleId: commissionRulesPageData.selectedRuleId,
  filters: {
    status: 'all',
    partnerType: 'all',
    channel: 'all',
    effectiveDate: 'all',
  },
  selectedIds: new Set([commissionRulesPageData.selectedRuleId]),
};

const financeState = {
  trendPeriod: '30d',
};

const invoicesState = {
  search: '',
  dateRange: 'last-7d',
  filters: {
    paymentMethod: 'all',
    paymentType: 'all',
    status: 'all',
    brand: 'all',
  },
  selectedIds: new Set(),
};

const helpCenterState = {
  search: '',
  visibleArticleCount: 5,
};

const apiCredentialsState = {
  environment: 'live',
  search: '',
  status: 'all',
};

const messagesState = {
  activeTab: 'all-messages',
  search: '',
  filter: 'all',
  sort: 'newest',
  selectedId: messagesPageData.conversation.messageId,
  selectedIds: new Set(),
  readIds: new Set(),
  starredIds: new Set(),
  replyDraft: '',
  sentReplies: [],
};

const productsAssetsState = {
  activeTab: 'all-assets',
  search: '',
  sort: 'newest',
  view: 'grid',
  pageSize: 12,
  filters: {
    folder: 'all',
    campaign: 'all',
    status: 'all',
  },
  selectedId: bannersImagesPageData.assets[0]?.id ?? null,
};

const icon = (name, className = '') => `
  <svg class="${className}" aria-hidden="true">
    <use href="#icon-${name}"></use>
  </svg>
`;

const localizedNavigationLabel = (item) => item.label;
const t = (_key, fallback = _key) => fallback;
const localizedPageTitle = (_pageId, fallback) => fallback;


const findNavigationContext = (navigationId) => {
  if (navigationId === 'help-center') {
    const helpCenter = { id: 'help-center', label: 'Help center', icon: 'help' };
    return { parent: helpCenter, current: helpCenter };
  }

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


const getFilteredCampaigns = () => {
  const query = campaignState.search.trim().toLowerCase();
  return campaignPageData.campaigns.filter((campaign) => {
    const matchesTab = campaignState.activeTab === 'all' || campaign.status === campaignState.activeTab;
    const matchesQuery = !query || [
      campaign.name,
      campaign.code,
      campaign.type,
      campaign.channel,
      campaign.status,
      campaign.stage,
      campaign.nextAction,
      campaign.updatedBy,
    ].some((value) => value.toLowerCase().includes(query));
    const matchesType = campaignState.filters.type === 'all' || campaign.type === campaignState.filters.type;
    const matchesChannel = campaignState.filters.channel === 'all' || campaign.channel === campaignState.filters.channel;
    const matchesStatus = campaignState.filters.status === 'all' || campaign.status === campaignState.filters.status;
    const matchesOwner = campaignState.filters.owner === 'all' || campaign.updatedBy === campaignState.filters.owner;
    const rangeDays = campaignDateRangeDays[campaignState.filters.date] ?? 90;
    const updatedAt = Date.parse(campaign.updated);
    const matchesDate = !Number.isNaN(updatedAt)
      && updatedAt <= campaignReferenceDate
      && campaignReferenceDate - updatedAt <= rangeDays * 24 * 60 * 60 * 1000;
    const matchesSavedView = campaignState.filters.savedView === 'all'
      || (campaignState.filters.savedView === 'active' && campaign.status === 'Active')
      || (campaignState.filters.savedView === 'owned' && campaign.updatedBy === campaignCurrentOwner);

    return matchesTab
      && matchesQuery
      && matchesType
      && matchesChannel
      && matchesStatus
      && matchesOwner
      && matchesDate
      && matchesSavedView;
  });
};

const renderCampaignMetrics = () => {
  if (!campaignMetrics) return;
  campaignMetrics.innerHTML = campaignPageData.metrics.map((metric) => `
    <article class="campaign-metric">
      <span class="campaign-metric__icon">${icon(metric.icon)}</span>
      <div class="campaign-metric__copy">
        <span class="campaign-metric__label">${metric.label}</span>
        <strong>${metric.value}</strong>
        <span class="campaign-metric__meta"><b>${metric.change}</b><span>${metric.note}</span></span>
      </div>
      <svg class="campaign-metric__sparkline" viewBox="0 0 100 34" role="img" aria-label="${metric.label} trend">
        <polyline points="${metric.sparkline}" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"></polyline>
      </svg>
    </article>
  `).join('');
};

const renderCampaignTabs = () => {
  if (!campaignTabs) return;
  const tabs = [
    ['all', 'All'],
    ['Active', 'Active'],
    ['Draft', 'Draft'],
    ['Completed', 'Completed'],
    ['Pending', 'Pending'],
    ['Paused', 'Paused'],
    ['Closed', 'Closed'],
  ];
  campaignTabs.innerHTML = tabs.map(([value, label]) => `
    <button class="campaign-tab${campaignState.activeTab === value ? ' is-active' : ''}" type="button" role="tab" aria-selected="${campaignState.activeTab === value}" data-campaign-tab="${value}">${label}</button>
  `).join('');
};

const renderCampaignRows = () => {
  if (!campaignRows) return;
  const filteredCampaigns = getFilteredCampaigns();
  if (!filteredCampaigns.length) {
    campaignRows.innerHTML = '<tr><td class="campaign-empty" colspan="12"><strong>No campaigns found</strong><span>Try changing your search or filters.</span></td></tr>';
  } else {
    campaignRows.innerHTML = filteredCampaigns.map((campaign) => {
      const statusTone = campaignStatusMeta[campaign.status]?.tone ?? 'draft';
      return `
        <tr data-campaign-row="${campaign.id}">
          <td class="campaign-cell--check">
            <label class="campaign-checkbox">
              <input type="checkbox" data-campaign-select="${campaign.id}" ${campaignState.selectedIds.has(campaign.id) ? 'checked' : ''} aria-label="Select ${campaign.name}" />
              <span aria-hidden="true"></span>
            </label>
          </td>
          <td class="campaign-cell--campaign">
            <strong>${campaign.name}</strong>
            <small>${campaign.code}</small>
          </td>
          <td class="campaign-cell--type">
            <span class="campaign-cell__icon">${icon(campaign.typeIcon)}</span>
            <span>${campaign.type}</span>
          </td>
          <td class="campaign-cell--channel">
            <span class="campaign-cell__icon">${icon(campaign.channelIcon)}</span>
            <span>${campaign.channel}</span>
          </td>
          <td class="campaign-cell--status">
            <span class="campaign-status campaign-status--${statusTone}">
              <span class="campaign-status__top"><i></i><strong>${campaign.status}</strong></span>
              <small>${campaign.statusDetail}</small>
            </span>
          </td>
          <td>${campaign.stage}</td>
          <td class="campaign-cell--number">${campaign.partners}</td>
          <td class="campaign-cell--sales"><strong>${campaign.sales}</strong><small>${campaign.orders}</small></td>
          <td class="campaign-cell--progress">
            <strong>${campaign.progress}%</strong>
            <span class="campaign-progress__track"><i style="width:${campaign.progress}%"></i></span>
          </td>
          <td class="campaign-cell--next">
            <span class="campaign-cell__icon">${icon(campaign.nextActionIcon)}</span>
            <span>${campaign.nextAction}</span>
          </td>
          <td class="campaign-cell--updated"><span>${campaign.updated}</span><small>by ${campaign.updatedBy}</small></td>
          <td class="campaign-cell--actions">
            <button type="button" class="campaign-row-action" data-campaign-action="row" data-campaign-id="${campaign.id}" aria-label="More actions for ${campaign.name}">${icon('more')}</button>
          </td>
        </tr>
      `;
    }).join('');
  }

  if (campaignResultCount) {
    const total = campaignPageData.campaigns.length;
    const shown = filteredCampaigns.length;
    campaignResultCount.textContent = shown
      ? `Showing 1 to ${shown} of ${total} campaigns`
      : `Showing 0 of ${total} campaigns`;
    campaignResultCount.dataset.total = String(total);
  }
};

const updateCampaignSelection = () => {
  const visibleIds = getFilteredCampaigns().map((campaign) => campaign.id);
  const visibleSelected = visibleIds.filter((id) => campaignState.selectedIds.has(id));
  if (campaignSelectionCount) campaignSelectionCount.textContent = `${visibleSelected.length} selected`;
  if (campaignSelectAll) {
    campaignSelectAll.checked = visibleIds.length > 0 && visibleSelected.length === visibleIds.length;
    campaignSelectAll.indeterminate = visibleSelected.length > 0 && visibleSelected.length < visibleIds.length;
  }
};

const renderCampaignPage = () => {
  if (!campaignPage) return;
  renderCampaignMetrics();
  renderCampaignTabs();
  renderCampaignRows();
  updateCampaignSelection();
};

const renderAttributionPage = () => {
  if (!attributionPage) return;

  const model = attributionPageData.models.find((item) => item.id === attributionState.activeModel) ?? attributionPageData.models[0];

  attributionModelSelect.innerHTML = attributionPageData.models
    .map((item) => `<option value="${item.id}" ${item.id === model.id ? 'selected' : ''}>${item.label}</option>`)
    .join('');
  attributionActiveModel.textContent = model.summaryLabel;
  attributionModelState.textContent = attributionState.isDirty ? 'Unsaved changes' : 'Active model';
  attributionAssistedRevenue.textContent = attributionPageData.summary.assistedRevenue;
  attributionCoverage.textContent = attributionPageData.summary.trackingCoverage;
  attributionCalloutIcon.innerHTML = icon('check');
  attributionCalloutCopy.textContent = model.description;

  attributionDistribution.innerHTML = attributionPageData.distribution
    .map((channel) => `
      <div class="attribution-distribution-row">
        <div class="attribution-distribution-label">
          <span class="attribution-channel-icon attribution-channel-icon--${channel.tone}">${icon(channel.icon)}</span>
          <span>${channel.label}</span>
        </div>
        <span class="attribution-distribution-bar"><i style="width:${channel.value}%"></i></span>
        <strong>${channel.value}%</strong>
      </div>
    `)
    .join('');

  attributionRules.innerHTML = attributionPageData.rules
    .map((rule) => `
      <tr data-attribution-rule="${rule.id}">
        <td class="attribution-cell--name"><strong>${rule.name}</strong></td>
        <td><span class="attribution-channel-chip attribution-channel-chip--${rule.channelTone}">${rule.channelType}</span></td>
        <td>${rule.logic}</td>
        <td>${rule.lookback}</td>
        <td class="attribution-cell--priority">${rule.priority}</td>
        <td><span class="attribution-status"><i></i>${rule.status}</span></td>
        <td class="attribution-cell--actions">
          <button type="button" data-attribution-action="edit-rule" data-attribution-rule="${rule.name}" aria-label="Edit ${rule.name}">${icon('edit')}</button>
          <button type="button" data-attribution-action="rule-menu" data-attribution-rule="${rule.name}" aria-label="More actions for ${rule.name}">${icon('more')}</button>
        </td>
      </tr>
    `)
    .join('');

  attributionAudit.innerHTML = attributionPageData.audit
    .map((entry) => `
      <div class="attribution-audit-entry">
        <span class="attribution-audit-entry__marker" aria-hidden="true"></span>
        <div>
          <time>${entry.date}</time>
          <strong>${entry.title}</strong>
          <small>by ${entry.by}</small>
        </div>
      </div>
    `)
    .join('');
};

const getFilteredCommissionRules = () => {
  const { search, filters } = commissionRulesState;
  const normalizedSearch = search.trim().toLowerCase();
  const referenceDate = Date.parse('2025-05-12T23:59:59Z');

  return commissionRulesPageData.rules.filter((rule) => {
    const matchesSearch = !normalizedSearch || [
      rule.name,
      rule.ruleId,
      rule.scopePrimary,
      rule.scopeSecondary,
      rule.scopeSummary,
      rule.status,
      rule.baseCommission,
    ].some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesStatus = filters.status === 'all' || rule.status === filters.status;
    const matchesPartnerType = filters.partnerType === 'all' || rule.partnerType === filters.partnerType;
    const matchesChannel = filters.channel === 'all' || rule.channel === filters.channel;
    const effectiveDate = Date.parse(rule.effectiveAt);
    const ageInDays = (referenceDate - effectiveDate) / 86400000;
    const matchesEffectiveDate = filters.effectiveDate === 'all'
      || (filters.effectiveDate === '30d' && ageInDays <= 30)
      || (filters.effectiveDate === '90d' && ageInDays <= 90)
      || (filters.effectiveDate === '2025' && new Date(effectiveDate).getUTCFullYear() === 2025);

    return matchesSearch && matchesStatus && matchesPartnerType && matchesChannel && matchesEffectiveDate;
  });
};

const renderCommissionRulesSummary = () => {
  if (!commissionRulesSummary) return;

  commissionRulesSummary.innerHTML = commissionRulesPageData.metrics
    .map((metric) => `
      <article class="commission-rules-summary-card commission-rules-summary-card--${metric.tone}">
        <div class="commission-rules-summary-card__copy">
          <span>${metric.label}</span>
          <strong>${metric.value}</strong>
          <small>${metric.note}</small>
        </div>
        <span class="commission-rules-summary-card__icon">${icon(metric.icon)}</span>
      </article>
    `)
    .join('');
};

const updateCommissionRulesSelection = () => {
  const visibleIds = getFilteredCommissionRules().map((rule) => rule.id);
  const visibleSelected = visibleIds.filter((id) => commissionRulesState.selectedIds.has(id));

  if (commissionRulesSelectAll) {
    commissionRulesSelectAll.checked = visibleIds.length > 0 && visibleSelected.length === visibleIds.length;
    commissionRulesSelectAll.indeterminate = visibleSelected.length > 0 && visibleSelected.length < visibleIds.length;
  }
};

const renderCommissionRulesRows = () => {
  if (!commissionRulesRows) return;

  const filteredRules = getFilteredCommissionRules();
  commissionRulesRows.innerHTML = filteredRules.length
    ? filteredRules.map((rule) => `
        <tr class="${rule.id === commissionRulesState.selectedRuleId ? 'is-selected' : ''}" data-commission-rules-row="${rule.id}">
          <td class="commission-rules-cell--check">
            <label class="commission-rules-checkbox">
              <input type="checkbox" data-commission-rules-select="${rule.id}" ${commissionRulesState.selectedIds.has(rule.id) ? 'checked' : ''} aria-label="Select ${rule.name}" />
              <span aria-hidden="true"></span>
            </label>
          </td>
          <td class="commission-rules-cell--name">
            <strong>${rule.name}</strong>
            <small>${rule.ruleId}</small>
          </td>
          <td class="commission-rules-cell--scope">
            <strong>${rule.scopePrimary}</strong>
            <small>${rule.scopeSecondary}</small>
          </td>
          <td class="commission-rules-cell--rate"><strong>${rule.baseCommission}</strong><small>${rule.unit} rate</small></td>
          <td class="commission-rules-cell--bonus">
            <strong>${rule.bonusRate}</strong>
            <small>${rule.bonusThreshold || 'No bonus'}</small>
          </td>
          <td class="commission-rules-cell--attribution">
            <strong>${rule.attributionWindow}</strong>
            <small>${rule.attributionType}</small>
          </td>
          <td class="commission-rules-cell--effective"><strong>${rule.effectiveDate}</strong></td>
          <td><span class="commission-rules-status commission-rules-status--${rule.statusTone}"><i></i>${rule.status}</span></td>
          <td class="commission-rules-cell--actions">
            <button type="button" data-commission-rules-action="edit" data-commission-rules-rule="${rule.name}" aria-label="Edit ${rule.name}">${icon('edit')}</button>
            <button type="button" data-commission-rules-action="row-menu" data-commission-rules-rule="${rule.name}" aria-label="More actions for ${rule.name}">${icon('more')}</button>
          </td>
        </tr>
      `).join('')
    : '<tr><td class="commission-rules-empty" colspan="9"><strong>No commission rules found</strong><span>Try changing your search or filters.</span></td></tr>';

  if (commissionRulesResultCount) {
    const total = commissionRulesPageData.rules.length;
    commissionRulesResultCount.textContent = filteredRules.length
      ? `Showing 1 to ${filteredRules.length} of ${total} rules`
      : `Showing 0 of ${total} rules`;
  }

  updateCommissionRulesSelection();
};

const renderCommissionRulesDetail = () => {
  if (!commissionRulesDetail) return;

  const rule = commissionRulesPageData.rules.find((item) => item.id === commissionRulesState.selectedRuleId);
  if (!rule) {
    commissionRulesDetail.hidden = true;
    commissionRulesDetail.innerHTML = '';
    commissionRulesPage?.classList.add('is-detail-closed');
    return;
  }

  const detail = commissionRulesPageData.details[rule.id] ?? {
    description: `Applies to ${rule.scopePrimary.toLowerCase()} across ${rule.scopeSecondary.toLowerCase()}.`,
    scope: `${rule.scopePrimary} · ${rule.scopeSecondary}`,
    attributionWindow: rule.attributionWindow,
    attributionType: rule.attributionType,
    effectiveDate: rule.effectiveDate,
    lastUpdated: rule.lastUpdated,
    updatedBy: 'Demo Admin',
    tiers: [{ label: 'Base rate', amount: 'All sales', base: rule.baseCommission, bonus: rule.bonusRate }],
    conditions: ['Applies to eligible partner traffic', 'Excludes invalid or cancelled orders'],
    performance: { period: 'Selected period', clicks: '—', conversions: '—', commission: '—' },
  };

  commissionRulesDetail.hidden = false;
  commissionRulesPage?.classList.remove('is-detail-closed');
  commissionRulesDetail.innerHTML = `
    <div class="commission-rules-detail__header">
      <div>
        <span class="eyebrow">Selected rule</span>
        <h2 id="commission-rules-detail-title">${rule.name}</h2>
        <p>${rule.ruleId}</p>
      </div>
      <button class="icon-button" type="button" data-commission-rules-action="close-detail" aria-label="Close rule details">${icon('x')}</button>
    </div>
    <p class="commission-rules-detail__description">${detail.description}</p>

    <div class="commission-rules-detail__facts">
      <div><span>Scope</span><strong>${detail.scope}</strong></div>
      <div><span>Attribution window</span><strong>${detail.attributionWindow} <small>(${detail.attributionType})</small></strong></div>
      <div><span>Effective date</span><strong>${detail.effectiveDate}</strong></div>
      <div><span>Last updated</span><strong>${detail.lastUpdated} by ${detail.updatedBy}</strong></div>
    </div>

    <section class="commission-rules-detail__section">
      <div class="commission-rules-detail__section-header">
        <div><h3>Commission structure</h3><p>Rates are applied by qualifying sales amount.</p></div>
        <button type="button" class="commission-rules-detail__edit" data-commission-rules-action="edit-rates">Edit rates</button>
      </div>
      <div class="commission-rules-tier-table">
        <div class="commission-rules-tier-row commission-rules-tier-row--header"><span>Tier</span><span>Sales amount (USD)</span><span>Base commission</span><span>Bonus</span><span class="sr-only">Actions</span></div>
        ${detail.tiers.map((tier) => `
          <div class="commission-rules-tier-row">
            <strong>${tier.label}</strong>
            <span>${tier.amount}</span>
            <span>${tier.base}</span>
            <span>${tier.bonus}</span>
            <span class="commission-rules-tier-actions">
              <button type="button" data-commission-rules-action="edit-tier" aria-label="Edit ${tier.label}">${icon('edit')}</button>
              <button type="button" data-commission-rules-action="delete-tier" aria-label="Delete ${tier.label}">${icon('trash')}</button>
            </span>
          </div>
        `).join('')}
      </div>
    </section>

    <section class="commission-rules-detail__section commission-rules-conditions">
      <div class="commission-rules-detail__section-header"><div><h3>Conditions</h3></div><button type="button" class="commission-rules-detail__edit" data-commission-rules-action="edit-conditions">Edit</button></div>
      <ul>${detail.conditions.map((condition) => `<li>${condition}</li>`).join('')}</ul>
    </section>

    <section class="commission-rules-detail__section commission-rules-performance">
      <div class="commission-rules-detail__section-header"><div><h3>Rule performance</h3><p>${detail.performance.period}</p></div></div>
      <div class="commission-rules-performance-grid">
        <div><span>Clicks</span><strong>${detail.performance.clicks}</strong></div>
        <div><span>Conversions</span><strong>${detail.performance.conversions}</strong></div>
        <div><span>Commission</span><strong>${detail.performance.commission}</strong></div>
      </div>
    </section>
  `;
};

const renderCommissionRulesPage = () => {
  if (!commissionRulesPage) return;
  renderCommissionRulesSummary();
  renderCommissionRulesRows();
  renderCommissionRulesDetail();
};

const renderFinanceSummary = () => {
  if (!financeSummary) return;

  financeSummary.innerHTML = financeBalancePageData.summary
    .map((metric) => `
      <article class="finance-summary-card finance-summary-card--${metric.tone}">
        <div class="finance-summary-card__copy">
          <span>${metric.label} <button class="inline-info finance-info" type="button" data-finance-action="summary-info" data-finance-label="${metric.label}" aria-label="About ${metric.label}"><svg><use href="#icon-info"></use></svg></button></span>
          <strong>${metric.value}</strong>
          <small class="finance-summary-card__note finance-summary-card__note--${metric.noteTone}">${metric.note}</small>
        </div>
        <span class="finance-summary-card__icon">${icon(metric.icon)}</span>
      </article>
    `)
    .join('');
};

const renderFinanceTrend = () => {
  if (!financeChart || !financeTrendSummary) return;

  const trend = financeBalancePageData.trend;
  const period = trend.periods[financeState.trendPeriod] ?? trend.periods['30d'];
  const chartWidth = 680;
  const chartHeight = 164;
  const chartPaddingX = 9;
  const chartPaddingY = 13;
  const maxValue = 25000;
  const usableWidth = chartWidth - chartPaddingX * 2;
  const usableHeight = chartHeight - chartPaddingY * 2;
  const points = period.points.map((point, index) => ({
    ...point,
    x: chartPaddingX + (usableWidth * index) / Math.max(1, period.points.length - 1),
    y: chartPaddingY + usableHeight * (1 - point.value / maxValue),
  }));
  const linePath = points.map((point, index) => `${index ? 'L' : 'M'} ${point.x.toFixed(1)} ${point.y.toFixed(1)}`).join(' ');
  const areaPath = `${linePath} L ${points.at(-1).x.toFixed(1)} ${chartHeight - chartPaddingY} L ${points[0].x.toFixed(1)} ${chartHeight - chartPaddingY} Z`;
  const tooltipPoint = points[period.tooltip.index] ?? points[Math.floor(points.length / 2)];
  const tooltipX = Math.min(Math.max(tooltipPoint.x - 43, 2), chartWidth - 88);
  const tooltipY = Math.max(2, tooltipPoint.y - 51);

  if (financePeriodSelect) financePeriodSelect.value = financeState.trendPeriod;
  financeChart.innerHTML = `
    <div class="finance-chart__axis-y" aria-hidden="true">${period.yAxis.map((label) => `<span>${label}</span>`).join('')}</div>
    <div class="finance-chart__plot">
      <svg viewBox="0 0 ${chartWidth} ${chartHeight}" role="img" aria-label="${period.label} account balance trend">
        <defs>
          <linearGradient id="finance-trend-fill" x1="0" y1="0" x2="0" y2="1">
            <stop offset="0%" stop-color="#ff4c4c" stop-opacity=".2" />
            <stop offset="100%" stop-color="#ff4c4c" stop-opacity="0" />
          </linearGradient>
        </defs>
        <g class="finance-chart__grid" aria-hidden="true">
          ${period.yAxis.map((_, index) => {
            const y = chartPaddingY + (usableHeight * index) / Math.max(1, period.yAxis.length - 1);
            return `<line x1="${chartPaddingX}" y1="${y.toFixed(1)}" x2="${chartWidth - chartPaddingX}" y2="${y.toFixed(1)}" />`;
          }).join('')}
        </g>
        <path class="finance-chart__area" d="${areaPath}" />
        <path class="finance-chart__line" d="${linePath}" />
        <circle class="finance-chart__point" cx="${tooltipPoint.x.toFixed(1)}" cy="${tooltipPoint.y.toFixed(1)}" r="4.5" />
        <g class="finance-chart__tooltip" transform="translate(${tooltipX.toFixed(1)} ${tooltipY.toFixed(1)})">
          <rect width="86" height="42" rx="4" />
          <text x="43" y="15">${period.points[period.tooltip.index]?.label ?? 'Selected date'}</text>
          <text class="finance-chart__tooltip-value" x="43" y="32">${period.tooltip.value}</text>
        </g>
      </svg>
      <div class="finance-chart__axis-x" aria-hidden="true">${period.xAxis.map((label) => `<span>${label}</span>`).join('')}</div>
    </div>
  `;

  financeTrendSummary.innerHTML = [
    ['Opening balance', trend.openingBalance, 'neutral'],
    ['Total credits', trend.totalCredits, 'positive'],
    ['Total debits', trend.totalDebits, 'negative'],
    ['Closing balance', trend.closingBalance, 'neutral'],
  ].map(([label, value, tone]) => `<div class="finance-trend-stat"><span>${label}</span><strong class="finance-trend-stat--${tone}">${value}</strong></div>`).join('');
};

const renderFinancePayoutSchedule = () => {
  if (!financePayoutSchedule) return;

  financePayoutSchedule.innerHTML = financeBalancePageData.payoutSchedule
    .map((payout) => `
      <div class="finance-payout-row">
        <div><strong>${payout.date}</strong><small>${payout.relative}</small></div>
        <div><strong>${payout.amount}</strong><span class="finance-schedule-status finance-schedule-status--${payout.tone}">${payout.status}</span></div>
      </div>
    `)
    .join('');
};

const renderFinancePaymentMethods = () => {
  if (!financePaymentMethods) return;

  financePaymentMethods.innerHTML = financeBalancePageData.paymentMethods
    .map((method) => `
      <div class="finance-method-row">
        <span class="finance-method-brand finance-method-brand--${method.brandTone}">
          ${method.brandTone === 'visa' ? 'VISA' : method.brandTone === 'mastercard' ? '<i></i><i></i>' : icon('bank')}
        </span>
        <div class="finance-method-copy"><strong>${method.brand} ending in ${method.masked.replace('•••• ', '')} ${method.primary ? '<em>Primary</em>' : ''}</strong><small>${method.expiry}</small></div>
        <button type="button" class="finance-method-menu" data-finance-action="method-menu" data-finance-method="${method.brand}" aria-label="More actions for ${method.brand}">${icon('more')}</button>
      </div>
    `)
    .join('');
};

const renderFinancePayoutRows = () => {
  if (!financePayoutRows) return;

  financePayoutRows.innerHTML = financeBalancePageData.recentPayouts
    .map((payout) => `
      <tr>
        <td><strong>${payout.id}</strong></td>
        <td>${payout.date}</td>
        <td><strong>${payout.amount}</strong></td>
        <td><span class="finance-table-method finance-table-method--${payout.methodTone}">${payout.method}</span></td>
        <td><span class="finance-paid-status"><i></i>${payout.status}</span></td>
        <td>${payout.description}</td>
        <td>${payout.reference}</td>
      </tr>
    `)
    .join('');

  if (financeResultCount) financeResultCount.textContent = `Showing 1 to ${financeBalancePageData.recentPayouts.length} of 24 results`;
};

const renderFinancePage = () => {
  if (!financePage) return;
  renderFinanceSummary();
  renderFinanceTrend();
  renderFinancePayoutSchedule();
  renderFinancePaymentMethods();
  renderFinancePayoutRows();
};

const getFilteredInvoices = () => {
  const normalizedSearch = invoicesState.search.trim().toLowerCase();
  const { filters } = invoicesState;

  return commissionInvoicesPageData.rows.filter((invoice) => {
    const matchesSearch = !normalizedSearch || [
      invoice.id,
      invoice.date,
      invoice.brand,
      invoice.paymentMethod,
      invoice.paymentType,
      invoice.description,
      invoice.amount,
      invoice.status,
    ].some((value) => value.toLowerCase().includes(normalizedSearch));
    const matchesPaymentMethod = filters.paymentMethod === 'all' || invoice.paymentMethod === filters.paymentMethod;
    const matchesPaymentType = filters.paymentType === 'all' || invoice.paymentType === filters.paymentType;
    const matchesStatus = filters.status === 'all' || invoice.status === filters.status;
    const matchesBrand = filters.brand === 'all' || invoice.brand === filters.brand;

    return matchesSearch && matchesPaymentMethod && matchesPaymentType && matchesStatus && matchesBrand;
  });
};

const updateInvoicesSelection = () => {
  const visibleIds = getFilteredInvoices().map((invoice) => invoice.id);
  const visibleSelected = visibleIds.filter((id) => invoicesState.selectedIds.has(id));

  if (invoicesSelectAll) {
    invoicesSelectAll.checked = visibleIds.length > 0 && visibleSelected.length === visibleIds.length;
    invoicesSelectAll.indeterminate = visibleSelected.length > 0 && visibleSelected.length < visibleIds.length;
  }
};

const renderInvoicesRows = () => {
  if (!invoicesRows) return;

  const filteredInvoices = getFilteredInvoices();
  invoicesRows.innerHTML = filteredInvoices.length
    ? filteredInvoices.map((invoice) => [
      '<tr data-invoices-row="', invoice.id, '">',
      '<td class="invoices-cell--check"><label class="invoices-checkbox">',
      '<input type="checkbox" data-invoices-select="', invoice.id, '" ',
      invoicesState.selectedIds.has(invoice.id) ? 'checked ' : '',
      'aria-label="Select invoice ', invoice.id, '" /><span aria-hidden="true"></span></label></td>',
      '<td class="invoices-cell--date">', invoice.date, '</td>',
      '<td class="invoices-cell--id"><strong>', invoice.id, '</strong></td>',
      '<td>', invoice.brand, '</td>',
      '<td><span class="invoices-method invoices-method--', invoice.paymentMethod.toLowerCase().replaceAll(' ', '-'), '">', invoice.paymentMethod, '</span></td>',
      '<td>', invoice.paymentType, '</td>',
      '<td class="invoices-cell--description">', invoice.description, '</td>',
      '<td class="invoices-cell--amount"><strong>', invoice.amount, '</strong></td>',
      '<td><span class="invoices-status invoices-status--', invoice.statusTone, '"><i></i>', invoice.status, '</span></td>',
      '<td class="invoices-cell--actions">',
      '<button type="button" class="invoices-details-button" data-invoices-action="details" data-invoices-id="', invoice.id, '">Details</button>',
      '<button type="button" class="invoices-download-button" data-invoices-action="download" data-invoices-id="', invoice.id, '" aria-label="Download invoice ', invoice.id, '">', icon('download'), '</button>',
      '</td></tr>',
    ].join('')).join('')
    : '<tr><td class="invoices-empty" colspan="10"><strong>No invoices found</strong><span>Try changing your filters or search terms.</span></td></tr>';

  if (invoicesResultCount) {
    const total = commissionInvoicesPageData.totalCount;
    invoicesResultCount.textContent = filteredInvoices.length
      ? 'Showing 1 to ' + filteredInvoices.length + ' of ' + total + ' invoices'
      : 'Showing 0 of ' + total + ' invoices';
  }

  updateInvoicesSelection();
};

const renderInvoicesPage = () => {
  if (!invoicesPage) return;
  if (invoicesDateRange) invoicesDateRange.value = invoicesState.dateRange;
  renderInvoicesRows();
};

const getFilteredHelpArticles = () => {
  const query = helpCenterState.search.trim().toLowerCase();
  if (!query) return helpCenterPageData.articles;

  return helpCenterPageData.articles.filter((article) => [
    article.title,
    article.description,
    article.category,
  ].some((value) => value.toLowerCase().includes(query)));
};

const renderHelpCenterPage = () => {
  if (!helpCenterPage) return;

  helpCenterCategories.innerHTML = helpCenterPageData.categories.map((category) => `
    <button class="help-center-category help-center-category--${category.tone}" type="button" data-help-center-category="${category.id}" aria-label="Browse ${category.label} help">
      <span class="help-center-category__top">
        <span class="help-center-category__icon">${icon(category.icon)}</span>
        ${icon('arrow', 'help-center-category__arrow')}
      </span>
      <strong>${category.label}</strong>
      <span class="help-center-category__description">${category.description}</span>
      <span class="help-center-category__meta"><b>${category.articles} articles</b><i aria-hidden="true">•</i><b>${category.guides} guides</b></span>
    </button>
  `).join('');

  const filteredArticles = getFilteredHelpArticles();
  const visibleArticles = filteredArticles.slice(0, helpCenterState.visibleArticleCount);
  helpCenterArticles.innerHTML = visibleArticles.length
    ? visibleArticles.map((article) => `
        <article class="help-center-article">
          <span class="help-center-article__icon">${icon('file')}</span>
          <div class="help-center-article__copy">
            <strong>${article.title}</strong>
            <p>${article.description}</p>
          </div>
          <time datetime="${article.datetime}"><span>Updated</span>${article.updated}</time>
        </article>
      `).join('')
    : '<div class="help-center-empty"><strong>No help articles found</strong><span>Try a different search term or browse a help category.</span></div>';

  helpCenterLoadMore.hidden = filteredArticles.length <= visibleArticles.length;
  helpCenterLoadMore.disabled = filteredArticles.length === 0;
  helpCenterStatus.innerHTML = helpCenterPageData.systems.map((system) => `
    <div class="help-center-status-row">
      <span class="help-center-status-row__name"><i aria-hidden="true"></i>${system.label}</span>
      <strong>${system.status}</strong>
    </div>
  `).join('');
};

const getFilteredApiCredentials = () => {
  const query = apiCredentialsState.search.trim().toLowerCase();

  return apiCredentialsPageData.credentials.filter((credential) => {
    const matchesEnvironment = credential.environment === apiCredentialsState.environment;
    const matchesStatus = apiCredentialsState.status === 'all' || credential.statusTone === apiCredentialsState.status;
    const matchesSearch = !query || [credential.name, credential.createdBy.name, credential.createdBy.detail, ...credential.scopes]
      .some((value) => value.toLowerCase().includes(query));

    return matchesEnvironment && matchesStatus && matchesSearch;
  });
};

const renderApiCredentialsRows = () => {
  if (!apiCredentialsRows) return;

  const credentials = getFilteredApiCredentials();
  apiCredentialsRows.innerHTML = credentials.length
    ? credentials.map((credential) => `
        <tr>
          <td class="api-credentials-cell--key">
            <div class="api-credentials-key-copy">
              <span class="api-credentials-key-icon">${icon('key')}</span>
              <div>
                <strong>${credential.name}</strong>
                <small>${credential.masked} <button type="button" data-api-credentials-action="copy-key" data-api-credentials-name="${credential.name}" aria-label="Copy masked key for ${credential.name}">${icon('copy')}</button></small>
              </div>
            </div>
          </td>
          <td>
            <div class="api-credentials-created-by">
              <span class="api-credentials-avatar">${credential.createdBy.initials}</span>
              <span><strong>${credential.createdBy.name}</strong><small>${credential.createdBy.detail}</small></span>
            </div>
          </td>
          <td><strong>${credential.createdOn}</strong><small>${credential.createdTime}</small></td>
          <td><strong>${credential.lastUsed}</strong>${credential.lastUsedTime ? `<small>${credential.lastUsedTime}</small>` : ''}</td>
          <td>
            <div class="api-credentials-scopes">
              ${credential.scopes.map((scope) => `<span>${scope}</span>`).join('')}
              ${credential.extraScopes ? `<span class="api-credentials-scope-extra">+${credential.extraScopes}</span>` : ''}
            </div>
          </td>
          <td><span class="api-credentials-status api-credentials-status--${credential.statusTone}"><i></i>${credential.status}</span></td>
          <td class="api-credentials-cell--actions"><button type="button" data-api-credentials-action="row-menu" data-api-credentials-name="${credential.name}" aria-label="More actions for ${credential.name}">${icon('more')}</button></td>
        </tr>
      `).join('')
    : '<tr><td class="api-credentials-empty" colspan="7"><strong>No API credentials found</strong><span>Try changing your search or filters.</span></td></tr>';

  if (apiCredentialsResultCount) {
    const total = apiCredentialsPageData.credentials.filter((credential) => credential.environment === apiCredentialsState.environment).length;
    apiCredentialsResultCount.textContent = credentials.length
      ? `Showing 1 to ${credentials.length} of ${total} results`
      : `Showing 0 of ${total} results`;
  }
};

const renderApiCredentialsWebhooks = () => {
  if (!apiCredentialsWebhooks) return;

  apiCredentialsWebhooks.innerHTML = apiCredentialsPageData.webhooks.map((webhook) => `
    <article class="api-credentials-webhook">
      <div class="api-credentials-webhook__title">
        <strong>${webhook.label}</strong>
        <span class="api-credentials-status api-credentials-status--${webhook.statusTone}"><i></i>${webhook.status}</span>
      </div>
      <div class="api-credentials-webhook__url">
        <span>${webhook.url}</span>
        <button type="button" data-api-credentials-action="copy-webhook" data-api-credentials-name="${webhook.label}" aria-label="Copy ${webhook.label} endpoint">${icon('copy')}</button>
      </div>
      <div class="api-credentials-webhook__actions">
        <button type="button" data-api-credentials-action="rotate-webhook" data-api-credentials-name="${webhook.label}">${icon('refresh')}Rotate</button>
        <button type="button" class="is-danger" data-api-credentials-action="revoke-webhook" data-api-credentials-name="${webhook.label}">${icon('trash')}Revoke</button>
      </div>
    </article>
  `).join('');
};

const renderApiCredentialsPage = () => {
  if (!apiCredentialsPage) return;

  apiCredentialsEnvironmentButtons.forEach((button) => {
    const isActive = button.dataset.apiCredentialsEnvironment === apiCredentialsState.environment;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  renderApiCredentialsRows();
  renderApiCredentialsWebhooks();
};

const messageIsUnread = (message) => message.unread && !messagesState.readIds.has(message.id);

const getFilteredMessages = () => {
  const query = messagesState.search.trim().toLowerCase();
  const filtered = messagesPageData.messages.filter((message) => {
    const matchesTab = messagesState.activeTab === 'all-messages'
      || (messagesState.activeTab === 'partner-messages' && message.category === 'partner')
      || (messagesState.activeTab === 'system-alerts' && message.category === 'system')
      || (messagesState.activeTab === 'archived-messages' && message.category === 'archived');
    const matchesFilter = messagesState.filter === 'all'
      || (messagesState.filter === 'unread' && messageIsUnread(message))
      || (messagesState.filter === 'partner' && message.category === 'partner')
      || (messagesState.filter === 'system' && message.category === 'system');
    const matchesQuery = !query || [message.sender, message.subject, message.preview, message.kind]
      .some((value) => value.toLowerCase().includes(query));

    return matchesTab && matchesFilter && matchesQuery;
  });

  return messagesState.sort === 'oldest' ? [...filtered].reverse() : filtered;
};

const getSelectedMessage = (visibleMessages = getFilteredMessages()) => {
  return visibleMessages.find((message) => message.id === messagesState.selectedId)
    ?? visibleMessages[0]
    ?? messagesPageData.messages.find((message) => message.id === messagesState.selectedId)
    ?? messagesPageData.messages[0];
};

const messageAvatar = (person, className = '') => `
  <span class="messages-avatar messages-avatar--${person.avatarTone ?? 'slate'} ${className}" aria-hidden="true">${escapeHtml(person.initials ?? person.name?.slice(0, 2) ?? '?')}</span>
`;

const updateMessagesSelection = () => {
  const visibleIds = getFilteredMessages().map((message) => message.id);
  const selectedCount = visibleIds.filter((id) => messagesState.selectedIds.has(id)).length;
  if (messagesSelectAll) {
    messagesSelectAll.checked = visibleIds.length > 0 && selectedCount === visibleIds.length;
    messagesSelectAll.indeterminate = selectedCount > 0 && selectedCount < visibleIds.length;
  }
};

const renderMessagesTabs = () => {
  if (!messagesTabs) return;
  messagesTabs.innerHTML = messagesPageData.tabs.map((tab) => `
    <button
      class="messages-tab${messagesState.activeTab === tab.id ? ' is-active' : ''}"
      type="button"
      role="tab"
      aria-selected="${messagesState.activeTab === tab.id}"
      data-messages-tab="${tab.id}"
    >
      <span>${tab.label}</span>
      ${tab.count === null ? '' : `<strong>${tab.count}</strong>`}
    </button>
  `).join('');
};

const renderMessagesRows = (visibleMessages) => {
  if (!messagesList) return;
  messagesList.innerHTML = visibleMessages.length
    ? visibleMessages.map((message) => `
        <div
          class="messages-list-row${message.id === messagesState.selectedId ? ' is-selected' : ''}${messageIsUnread(message) ? ' is-unread' : ''}"
          data-messages-row="${message.id}"
          role="option"
          aria-selected="${message.id === messagesState.selectedId}"
          tabindex="0"
        >
          <label class="messages-checkbox messages-list-row__checkbox">
            <input type="checkbox" data-messages-select="${message.id}" ${messagesState.selectedIds.has(message.id) ? 'checked' : ''} aria-label="Select message from ${escapeHtml(message.sender)}" />
            <span aria-hidden="true"></span>
          </label>
          ${messageAvatar(message)}
          <span class="messages-list-row__copy">
            <strong>${escapeHtml(message.sender)}</strong>
            <span>${escapeHtml(message.subject)}</span>
            <small>${escapeHtml(message.preview)}</small>
          </span>
          <time datetime="${message.date}">${escapeHtml(message.time)}</time>
          ${messageIsUnread(message) ? '<i class="messages-unread-dot" title="Unread message">Unread</i>' : ''}
        </div>
      `).join('')
    : '<div class="messages-empty"><strong>No messages found</strong><span>Try changing the search or filter.</span></div>';

  const total = 38;
  messagesResultCount.textContent = visibleMessages.length
    ? `Showing 1 to ${visibleMessages.length} of ${total} messages`
    : `Showing 0 of ${total} messages`;
  updateMessagesSelection();
};

const getConversationForMessage = (message) => {
  if (message.id === messagesPageData.conversation.messageId) return messagesPageData.conversation;
  return {
    messageId: message.id,
    subject: message.subject,
    kind: message.kind,
    sender: {
      name: message.sender,
      initials: message.initials,
      avatarTone: message.avatarTone,
      email: `${message.sender.toLowerCase().replaceAll(' ', '')} contact [at] partner.example`,
    },
    recipient: messagesPageData.conversation.recipient,
    sent: `${message.date} ${message.time}`,
    body: [
      `Hi Demo1 team,`,
      message.preview.replace(/\.\.\.$/, '.') + ' Please review this update when you have a moment.',
      'Reply to this conversation when you are ready, or use the actions above to manage it.',
    ],
    attachments: [],
    replies: [],
  };
};

const renderMessagesConversation = (visibleMessages) => {
  if (!messagesConversation) return;
  if (!visibleMessages.length) {
    messagesConversation.innerHTML = `
      <div class="messages-conversation-empty">
        <span class="messages-conversation-empty__icon">${icon('message')}</span>
        <strong>Select a message to read it</strong>
        <p>Choose a different search or filter to see available conversations.</p>
      </div>
    `;
    return;
  }

  const message = getSelectedMessage(visibleMessages);
  messagesState.selectedId = message.id;
  const conversation = getConversationForMessage(message);
  const replies = [...conversation.replies, ...messagesState.sentReplies.filter((reply) => reply.messageId === message.id)];
  const body = conversation.body.map((paragraph) => `<p>${escapeHtml(paragraph)}</p>`).join('');

  messagesConversation.innerHTML = `
    <div class="messages-conversation__header">
      <div class="messages-conversation__heading">
        <h2>${escapeHtml(conversation.subject)}</h2>
        <span class="messages-kind messages-kind--${message.category}">${escapeHtml(conversation.kind)}</span>
      </div>
      <div class="messages-conversation__actions" aria-label="Conversation actions">
        <button type="button" class="messages-icon-button${messagesState.starredIds?.has(message.id) ? ' is-selected' : ''}" data-messages-action="star" aria-label="Star conversation">${icon('star')}</button>
        <button type="button" class="messages-icon-button" data-messages-action="archive" aria-label="Archive conversation">${icon('archive')}</button>
        <button type="button" class="messages-icon-button" data-messages-action="more" aria-label="More conversation actions">${icon('more')}</button>
      </div>
    </div>
    <div class="messages-conversation__meta">
      <div class="messages-person-meta">
        ${messageAvatar(conversation.sender)}
        <span><strong>From</strong><b>${escapeHtml(conversation.sender.name)}</b><small>${escapeHtml(conversation.sender.email)}</small></span>
      </div>
      <div class="messages-person-meta">
        ${messageAvatar(conversation.recipient)}
        <span><strong>To</strong><b>${escapeHtml(conversation.recipient.name)}</b><small>${escapeHtml(conversation.recipient.email)}</small></span>
      </div>
      <span class="messages-sent-meta"><strong>Sent</strong><span>${escapeHtml(conversation.sent)}</span></span>
    </div>
    <article class="messages-message-body">
      ${body}
    </article>
    ${conversation.attachments.length ? `
      <section class="messages-attachments" aria-labelledby="messages-attachments-title">
        <h3 id="messages-attachments-title">Attachments <span>${conversation.attachments.length}</span></h3>
        <div class="messages-attachment-list">
          ${conversation.attachments.map((attachment) => `
            <button type="button" class="messages-attachment" data-messages-action="download-attachment" data-messages-file="${escapeHtml(attachment.name)}">
              <span class="messages-attachment__icon messages-attachment__icon--${attachment.tone}">${icon(attachment.icon)}</span>
              <span><strong>${escapeHtml(attachment.name)}</strong><small>${escapeHtml(attachment.type)} · ${escapeHtml(attachment.size)}</small></span>
              ${icon('download')}
            </button>
          `).join('')}
        </div>
      </section>
    ` : ''}
    <section class="messages-replies" aria-labelledby="messages-replies-title">
      <h3 id="messages-replies-title">Replies <span>${replies.length}</span></h3>
      ${replies.length ? replies.map((reply) => `
        <article class="messages-reply">
          ${messageAvatar(reply)}
          <div><header><strong>${escapeHtml(reply.sender)}</strong><time>${escapeHtml(reply.time)}</time></header><p>${escapeHtml(reply.body).replaceAll('\n', '<br />')}</p></div>
        </article>
      `).join('') : '<p class="messages-replies__empty">No replies yet. Start the conversation below.</p>'}
    </section>
    <form class="messages-reply-form" data-messages-reply-form>
      <label for="messages-reply-input">Reply to ${escapeHtml(conversation.sender.name)}</label>
      <textarea id="messages-reply-input" data-messages-reply rows="3" placeholder="Write a reply...">${escapeHtml(messagesState.replyDraft)}</textarea>
      <div class="messages-reply-form__footer">
        <span>Demo interaction · replies are not sent</span>
        <button class="button button--primary" type="submit" data-messages-action="send-reply">${icon('send')} Send reply</button>
      </div>
    </form>
  `;
};

const renderMessagesPartnerDetails = () => {
  if (!messagesPartnerDetails) return;
  const details = messagesPageData.partnerDetails;
  messagesPartnerDetails.innerHTML = `
    <section class="messages-detail-card messages-partner-card">
      <div class="messages-detail-card__header"><span>Partner</span><button type="button" class="messages-icon-button" data-messages-action="partner-menu" aria-label="Partner actions">${icon('more')}</button></div>
      <div class="messages-partner-card__identity">${messageAvatar(details, 'messages-avatar--large')}<div><h2>${escapeHtml(details.name)}</h2><span>${escapeHtml(details.location)}</span></div></div>
      <p class="messages-partner-card__contact">${escapeHtml(details.contact)}</p>
      <button type="button" class="messages-text-action" data-messages-action="view-partner">View partner profile ${icon('arrow')}</button>
    </section>
    <section class="messages-detail-card">
      <div class="messages-detail-card__header"><h3>Active Campaigns <span>${details.activeCampaigns.length}</span></h3><button type="button" class="messages-icon-button" data-messages-action="view-campaigns" aria-label="View partner campaigns">${icon('arrow')}</button></div>
      <div class="messages-campaign-list">
        ${details.activeCampaigns.map((campaign) => `<div class="messages-campaign-item"><strong>${escapeHtml(campaign.name)}</strong><span>${escapeHtml(campaign.dates)}</span><b><i></i>${escapeHtml(campaign.status)}</b></div>`).join('')}
      </div>
    </section>
    <section class="messages-detail-card">
      <div class="messages-detail-card__header"><h3>Partner Overview</h3><button type="button" class="messages-icon-button" data-messages-action="view-analytics" aria-label="View partner analytics">${icon('arrow')}</button></div>
      <dl class="messages-stats-grid">${details.stats.map((stat) => `<div><dt>${escapeHtml(stat.label)}</dt><dd>${escapeHtml(stat.value)}</dd></div>`).join('')}</dl>
    </section>
    <section class="messages-detail-card">
      <div class="messages-detail-card__header"><h3>Conversation Info</h3></div>
      <dl class="messages-info-list"><div><dt>Conversation ID</dt><dd>${escapeHtml(details.conversationId)}</dd></div><div><dt>Status</dt><dd class="messages-info-status"><i></i>${escapeHtml(details.conversationStatus)}</dd></div><div><dt>Labels</dt><dd><span class="messages-label-chip">${escapeHtml(details.labels)}</span></dd></div><div><dt>Added to CRM</dt><dd>${escapeHtml(details.addedToCrm)}</dd></div></dl>
    </section>
  `;
};

const renderMessagesPage = () => {
  if (!messagesPage) return;
  if (!messagesPageData.tabs.some((tab) => tab.id === messagesState.activeTab)) messagesState.activeTab = 'all-messages';
  if (messagesSearch) messagesSearch.value = messagesState.search;
  if (messagesFilter) messagesFilter.value = messagesState.filter;
  if (messagesSort) messagesSort.value = messagesState.sort;
  renderMessagesTabs();
  const visibleMessages = getFilteredMessages();
  renderMessagesRows(visibleMessages);
  renderMessagesConversation(visibleMessages);
  renderMessagesPartnerDetails();
};

const submitMessageReply = () => {
  const message = getSelectedMessage();
  const draft = messagesState.replyDraft.trim();
  if (!draft) {
    showToast('Write a reply before sending');
    return;
  }

  messagesState.sentReplies.push({
    id: `reply-demo-${Date.now()}`,
    messageId: message.id,
    sender: 'Demo1 (You)',
    initials: 'D1',
    avatarTone: 'slate',
    time: 'Just now',
    body: draft,
  });
  messagesState.replyDraft = '';
  renderMessagesPage();
  showToast('Reply saved to this demo conversation');
};

const handleMessagesAction = (action) => {
  const actionName = action?.dataset.messagesAction;
  if (!actionName) return false;

  const message = getSelectedMessage();
  if (actionName === 'sort-direction') {
    messagesState.sort = messagesState.sort === 'newest' ? 'oldest' : 'newest';
    renderMessagesPage();
  } else if (actionName === 'star') {
    if (messagesState.starredIds.has(message.id)) messagesState.starredIds.delete(message.id);
    else messagesState.starredIds.add(message.id);
    renderMessagesPage();
    showToast(messagesState.starredIds.has(message.id) ? 'Conversation starred' : 'Conversation unstarred');
  } else if (actionName === 'archive') {
    showToast('Archive action is ready for product integration');
  } else if (actionName === 'more' || actionName === 'partner-menu') {
    showToast('More conversation actions are ready for product integration');
  } else if (actionName === 'download-attachment') {
    showToast(`${action.dataset.messagesFile} download is ready for product integration`);
  } else if (actionName === 'page') {
    showToast(`Messages page ${action.dataset.messagesPageNumber} is ready for product integration`);
  } else if (actionName === 'view-partner') {
    showToast('Partner profile is ready for product integration');
  } else if (actionName === 'view-campaigns') {
    showToast('Partner campaigns are ready for product integration');
  } else if (actionName === 'view-analytics') {
    showToast('Partner analytics are ready for product integration');
  } else {
    showToast(`${actionName.replaceAll('-', ' ')} is ready for product integration`);
  }
  return true;
};

const getFilteredProductsAssets = () => {
  const query = productsAssetsState.search.trim().toLowerCase();
  const filtered = bannersImagesPageData.assets.filter((asset) => {
    const matchesTab = productsAssetsState.activeTab === 'all-assets' || asset.category === productsAssetsState.activeTab;
    const matchesFolder = productsAssetsState.filters.folder === 'all' || asset.folderValue === productsAssetsState.filters.folder;
    const matchesCampaign = productsAssetsState.filters.campaign === 'all' || asset.campaignValue === productsAssetsState.filters.campaign;
    const matchesStatus = productsAssetsState.filters.status === 'all' || asset.status === productsAssetsState.filters.status;
    const matchesQuery = !query || [asset.fileName, asset.title, asset.subtitle, asset.folder, asset.campaign, ...asset.tags]
      .some((value) => value.toLowerCase().includes(query));
    return matchesTab && matchesFolder && matchesCampaign && matchesStatus && matchesQuery;
  });

  if (productsAssetsState.sort === 'name') return [...filtered].sort((left, right) => left.fileName.localeCompare(right.fileName));
  if (productsAssetsState.sort === 'oldest') return [...filtered].reverse();
  return filtered;
};

const renderProductsAssetsMedia = (asset) => `
  <div class="products-asset-card__media${asset.strip ? ' products-asset-card__media--strip' : ''}" data-tone="${asset.tone}">
    <span class="products-assets-art products-assets-art--${asset.tone}" aria-hidden="true"></span>
    <span class="products-asset-card__copy">
      <strong>${escapeHtml(asset.title)}</strong>
      <small>${escapeHtml(asset.subtitle)}</small>
      ${asset.cta ? `<span class="products-assets-art__cta">${escapeHtml(asset.cta)}</span>` : ''}
    </span>
    <span class="products-asset-card__format">${escapeHtml(asset.dimensions)}</span>
  </div>
`;

const renderProductsAssetsTabs = () => {
  if (!productsAssetsTabs) return;
  productsAssetsTabs.innerHTML = bannersImagesPageData.tabs.map((tab) => `
    <button
      class="products-assets-tab${productsAssetsState.activeTab === tab.id ? ' is-active' : ''}"
      type="button"
      role="tab"
      aria-selected="${productsAssetsState.activeTab === tab.id}"
      data-products-assets-tab="${tab.id}"
    >${escapeHtml(tab.label)}</button>
  `).join('');
};

const renderProductsAssetsFilters = () => {
  if (!productsAssetsPage) return;
  const filterMap = {
    folder: bannersImagesPageData.filters.folders,
    campaign: bannersImagesPageData.filters.campaigns,
    status: bannersImagesPageData.filters.statuses,
  };

  Object.entries(filterMap).forEach(([key, options]) => {
    const select = productsAssetsPage.querySelector(`[data-products-assets-filter="${key}"]`);
    if (!select) return;
    select.innerHTML = options.map((option) => `<option value="${escapeHtml(option.value)}">${escapeHtml(option.label)}</option>`).join('');
    select.value = productsAssetsState.filters[key];
  });

  if (productsAssetsSearch) productsAssetsSearch.value = productsAssetsState.search;
  if (productsAssetsSort) productsAssetsSort.value = productsAssetsState.sort;
  if (productsAssetsPageSize) productsAssetsPageSize.value = String(productsAssetsState.pageSize);
};

const renderProductsAssetsGrid = (visibleAssets) => {
  if (!productsAssetsGrid) return;
  productsAssetsGrid.classList.toggle('is-list', productsAssetsState.view === 'list');
  productsAssetsGrid.innerHTML = visibleAssets.length
    ? visibleAssets.map((asset) => `
        <button
          class="products-asset-card${asset.id === productsAssetsState.selectedId ? ' is-selected' : ''}${asset.strip ? ' is-strip' : ''}"
          type="button"
          data-products-assets-asset-id="${asset.id}"
          role="listitem"
          aria-pressed="${asset.id === productsAssetsState.selectedId}"
        >
          ${renderProductsAssetsMedia(asset)}
          <span class="products-asset-card__footer">
            <span>
              <strong>${escapeHtml(asset.fileName)}</strong>
              <small>${escapeHtml(asset.dimensions)}</small>
            </span>
            <span class="products-asset-card__meta">
              <small>${escapeHtml(asset.folder)}</small>
              <span class="products-asset-card__status products-asset-card__status--${asset.statusTone}"><i aria-hidden="true"></i>${escapeHtml(asset.status)}</span>
            </span>
          </span>
          <span class="products-asset-card__menu" aria-hidden="true">${icon('more')}</span>
          ${asset.id === productsAssetsState.selectedId ? `<span class="products-asset-card__selected" title="Selected asset">${icon('check')}</span>` : ''}
        </button>
      `).join('')
    : '<div class="products-assets-empty"><span aria-hidden="true">⌕</span><strong>No assets found</strong><p>Try another category, folder, status, or search term.</p></div>';
};

const renderProductsAssetsDetail = (visibleAssets) => {
  if (!productsAssetsDetail) return;
  const asset = visibleAssets.find((item) => item.id === productsAssetsState.selectedId)
    ?? visibleAssets[0];

  if (!asset) {
    productsAssetsDetail.innerHTML = `
      <div class="products-assets-detail__empty">
        <span>${icon('image')}</span>
        <strong>Select an asset</strong>
        <p>Choose an asset from the library to review its details.</p>
      </div>
    `;
    return;
  }

  productsAssetsState.selectedId = asset.id;
  productsAssetsDetail.innerHTML = `
    <div class="products-assets-detail__header">
      <div>
        <span class="eyebrow">Selected asset</span>
        <h2 id="products-assets-detail-title">${escapeHtml(asset.fileName)}</h2>
      </div>
      <div class="products-assets-detail__header-actions">
        <button class="products-assets-icon-button" type="button" data-products-assets-action="open-preview" aria-label="Open asset preview">${icon('external')}</button>
        <button class="products-assets-icon-button" type="button" data-products-assets-action="close-detail" aria-label="Close asset details">${icon('x')}</button>
      </div>
    </div>
    <div class="products-assets-detail__preview">
      ${renderProductsAssetsMedia(asset)}
    </div>
    <div class="products-assets-detail__identity">
      <strong>${escapeHtml(asset.fileName)}</strong>
      <span class="products-asset-card__status products-asset-card__status--${asset.statusTone}"><i aria-hidden="true"></i>${escapeHtml(asset.status)}</span>
    </div>
    <dl class="products-assets-detail__facts">
      <div><dt>Type</dt><dd>${escapeHtml(asset.type)}</dd></div>
      <div><dt>Dimensions</dt><dd>${escapeHtml(asset.dimensions)}</dd></div>
      <div><dt>File size</dt><dd>${escapeHtml(asset.fileSize)}</dd></div>
      <div><dt>Uploaded</dt><dd>${escapeHtml(asset.uploaded)}</dd></div>
      <div><dt>Uploaded by</dt><dd>${escapeHtml(asset.uploadedBy)}</dd></div>
      <div><dt>Folder</dt><dd>${escapeHtml(asset.folder)}</dd></div>
      <div><dt>Used in</dt><dd>${escapeHtml(asset.usedIn)}</dd></div>
    </dl>
    <div class="products-assets-detail__tags">
      <span>Tags</span>
      <div>${asset.tags.map((tag) => `<span>${escapeHtml(tag)}</span>`).join('')}</div>
    </div>
    <p class="products-assets-detail__description">${escapeHtml(asset.description)}</p>
    <div class="products-assets-detail__actions">
      <button class="products-assets-button products-assets-button--primary products-assets-detail__edit" type="button" data-products-assets-action="edit">Edit asset</button>
      <button class="products-assets-icon-button" type="button" data-products-assets-action="more" aria-label="More asset actions">${icon('more')}</button>
    </div>
  `;
};

const renderProductsAssetsPage = () => {
  if (!productsAssetsPage) return;
  renderProductsAssetsTabs();
  renderProductsAssetsFilters();
  const visibleAssets = getFilteredProductsAssets();
  if (!visibleAssets.some((asset) => asset.id === productsAssetsState.selectedId)) {
    productsAssetsState.selectedId = visibleAssets[0]?.id ?? null;
  }
  if (!productsAssetsPage.classList.contains('is-detail-closed')) productsAssetsDetail.hidden = false;
  productsAssetsPage.querySelectorAll('[data-products-assets-view]').forEach((button) => {
    const isActive = button.dataset.productsAssetsView === productsAssetsState.view;
    button.classList.toggle('is-active', isActive);
    button.setAttribute('aria-pressed', String(isActive));
  });
  renderProductsAssetsGrid(visibleAssets);
  renderProductsAssetsDetail(visibleAssets);
  const isDefaultView = productsAssetsState.activeTab === 'all-assets'
    && productsAssetsState.search === ''
    && Object.values(productsAssetsState.filters).every((value) => value === 'all');
  const count = isDefaultView ? bannersImagesPageData.totalCount : visibleAssets.length;
  if (productsAssetsResultCount) productsAssetsResultCount.textContent = `${count} assets`;
  if (productsAssetsPageLabel) productsAssetsPageLabel.textContent = isDefaultView
    ? bannersImagesPageData.pageLabel
    : `${visibleAssets.length} matching asset${visibleAssets.length === 1 ? '' : 's'}`;
};

const renderPage = () => {
  const context = findNavigationContext(state.activeNavigationChild ?? state.activeNavigationId);
  const isOverview = state.activeNavigationId === 'overview' && !state.activeNavigationChild;
  const activePageId = state.activeNavigationChild ?? state.activeNavigationId;
  const recruitmentPage = recruitmentPageSet.has(activePageId) ? getRecruitmentPage(activePageId) : null;
  const operationsPage = operationsPageSet.has(activePageId) ? getOperationsPage(activePageId) : null;
  const isCampaignPage = state.activeNavigationChild === 'all-campaigns';
  const isAttributionPage = state.activeNavigationChild === 'attribution-rules';
  const isCommissionRulesPage = state.activeNavigationChild === 'commission-rules-list';
  const isFinancePage = state.activeNavigationChild === 'balance-payments';
  const isInvoicesPage = state.activeNavigationChild === 'commission-invoices' || state.activeNavigationChild === 'invoices';
  const isHelpCenterPage = state.activeNavigationId === 'help-center';
  const isApiCredentialsPage = state.activeNavigationChild === 'api-credentials';
  const isMessagesPage = ['all-messages', 'partner-messages', 'system-alerts', 'archived-messages'].includes(state.activeNavigationChild);
  const isProductsAssetsPage = state.activeNavigationChild === 'banners-images';
  const isMainPage = isCampaignPage || isAttributionPage || isCommissionRulesPage || isFinancePage || isInvoicesPage || isHelpCenterPage || isApiCredentialsPage || isMessagesPage || isProductsAssetsPage;

  document.body.classList.toggle('is-campaign-page', isCampaignPage);
  document.body.classList.toggle('is-attribution-page', isAttributionPage);
  document.body.classList.toggle('is-commission-rules-page', isCommissionRulesPage);
  document.body.classList.toggle('is-finance-page', isFinancePage);
  document.body.classList.toggle('is-invoices-page', isInvoicesPage);
  document.body.classList.toggle('is-commission-invoices-page', state.activeNavigationChild === 'commission-invoices');
  document.body.classList.toggle('is-finance-invoices-page', state.activeNavigationChild === 'invoices');
  document.body.classList.toggle('is-help-center-page', isHelpCenterPage);
  document.body.classList.toggle('is-api-credentials-page', isApiCredentialsPage);
  document.body.classList.toggle('is-messages-page', isMessagesPage);
  document.body.classList.toggle('is-products-assets-page', isProductsAssetsPage);
  if (helpCenterUtility) {
    helpCenterUtility.classList.toggle('is-active', isHelpCenterPage);
    if (isHelpCenterPage) helpCenterUtility.setAttribute('aria-current', 'page');
    else helpCenterUtility.removeAttribute('aria-current');
  }
  const currentPageTitle = recruitmentPage?.title ?? operationsPage?.title ?? context.current.label;
  if (isMessagesPage) {
    pageTitle.innerHTML = `Messages &amp; Notifications <span class="messages-page-title-badge" aria-label="${messagesPageData.unreadCount} unread messages">${messagesPageData.unreadCount}</span>`;
  } else {
    pageTitle.textContent = isOverview
      ? t('page.overview.title', 'Business overview')
      : isMainPage
        ? context.current.label
        : localizedPageTitle(activePageId, currentPageTitle);
  }
  pageDescription.textContent = isOverview
    ? t('page.overview.description', 'Monitor your affiliate program performance and partner activity.')
    : isCampaignPage
      ? 'View, manage, and analyze all your campaigns in one place.'
      : isAttributionPage
        ? 'Configure how conversions are attributed across channels and partners.'
        : isCommissionRulesPage
          ? 'Manage base commission rates, bonuses, attribution windows, and rule conditions for your partners.'
          : isFinancePage
            ? 'Track your account balance, commissions, payouts, and payment methods.'
            : isInvoicesPage
              ? 'Review, filter, and download demo invoice records for the selected workspace.'
            : isHelpCenterPage
              ? 'Find answers, learn best practices, and get the support you need.'
            : isApiCredentialsPage
              ? 'Create and manage API keys to authenticate and authorize access to the YeahPromos Merchant API. Keep your credentials secure and never share them publicly.'
            : isMessagesPage
              ? 'Stay connected with your partners and never miss an important update.'
            : isProductsAssetsPage
              ? 'Manage your creative assets and organize them into folders for easy access and use across campaigns.'
            : recruitmentPage?.description ?? operationsPage?.description ?? context.current.label + ' workspace preview for the current brand scope.';
  breadcrumbParent.textContent = isCampaignPage || isAttributionPage || isCommissionRulesPage || isFinancePage || isInvoicesPage || isApiCredentialsPage || isMessagesPage || isProductsAssetsPage
    ? (isCampaignPage ? 'Campaigns' : isAttributionPage || isCommissionRulesPage || isInvoicesPage ? 'Commission & Rules' : isApiCredentialsPage ? 'Settings' : isMessagesPage ? 'Messages & Notifications' : isProductsAssetsPage ? 'Products & Assets' : 'Finance')
    : isHelpCenterPage ? 'Help center'
    : isOverview ? t('shell.merchantWorkspace', 'Merchant workspace') : context.parent.label;
  breadcrumbCurrent.textContent = isCampaignPage ? 'All campaigns' : isAttributionPage ? 'Attribution rules' : isCommissionRulesPage ? 'Commission rules' : isFinancePage ? 'Balance & payments' : isInvoicesPage ? 'Invoices' : isHelpCenterPage ? 'Help center' : isApiCredentialsPage ? 'API credentials' : isMessagesPage ? context.current.label : isProductsAssetsPage ? 'Banners & images' : isOverview ? 'Overview' : context.current.label;
  breadcrumbCurrent.setAttribute('aria-current', 'page');
  overviewPage.hidden = !isOverview;
  modulePage.hidden = isOverview || (!recruitmentPage && !operationsPage);
  campaignPage.hidden = !isCampaignPage;
  attributionPage.hidden = !isAttributionPage;
  commissionRulesPage.hidden = !isCommissionRulesPage;
  financePage.hidden = !isFinancePage;
  invoicesPage.hidden = !isInvoicesPage;
  helpCenterPage.hidden = !isHelpCenterPage;
  apiCredentialsPage.hidden = !isApiCredentialsPage;
  messagesPage.hidden = !isMessagesPage;
  productsAssetsPage.hidden = !isProductsAssetsPage;
  modulePlaceholder.hidden = isOverview || isMainPage || Boolean(recruitmentPage || operationsPage);
  if (pageActions) pageActions.hidden = !isAttributionPage;
  if (commissionRulesActions) commissionRulesActions.hidden = !isCommissionRulesPage;
  if (financeActions) financeActions.hidden = !isFinancePage;
  if (apiCredentialsActions) apiCredentialsActions.hidden = !isApiCredentialsPage;
  if (messagesPageActions) messagesPageActions.hidden = !isMessagesPage;

  if (recruitmentPage) {
    renderRecruitmentPage(recruitmentPage.id);
  } else if (operationsPage) {
    renderWorkspacePage(operationsPage.id);
  } else if (!isOverview && !isMainPage) {
    modulePlaceholder.querySelector('[data-module-title]').textContent = context.current.label;
    modulePlaceholder.querySelector('[data-module-parent]').textContent = context.parent.label;
  }

  if (isCampaignPage) renderCampaignPage();
  if (isAttributionPage) renderAttributionPage();
  if (isCommissionRulesPage) renderCommissionRulesPage();
  if (isFinancePage) renderFinancePage();
  if (isInvoicesPage) renderInvoicesPage();
  if (isHelpCenterPage) renderHelpCenterPage();
  if (isApiCredentialsPage) renderApiCredentialsPage();
  if (isMessagesPage) renderMessagesPage();
  if (isProductsAssetsPage) renderProductsAssetsPage();
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
  const activeNavigationChild = context.current.id === context.parent.id ? null : context.current.id;
  if (messagesPageData.tabs.some((tab) => tab.id === navigationId)) messagesState.activeTab = navigationId;
  state = {
    ...state,
    activeNavigationId: context.parent.id,
    activeNavigationChild,
    expandedGroups: context.parent.children?.length
      ? [...new Set([...state.expandedGroups, context.parent.id])]
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


if (campaignPage) {
  campaignPage.addEventListener('input', (event) => {
    if (event.target.matches('[data-campaign-search]')) {
      campaignState.search = event.target.value;
      renderCampaignRows();
      updateCampaignSelection();
    }
  });

  campaignPage.addEventListener('change', (event) => {
    const filter = event.target.closest('[data-campaign-filter]');
    if (filter) {
      campaignState.filters[filter.dataset.campaignFilter] = filter.value;
      renderCampaignRows();
      updateCampaignSelection();
      return;
    }

    const rowCheckbox = event.target.closest('[data-campaign-select]');
    if (rowCheckbox) {
      if (rowCheckbox.checked) campaignState.selectedIds.add(rowCheckbox.dataset.campaignSelect);
      else campaignState.selectedIds.delete(rowCheckbox.dataset.campaignSelect);
      updateCampaignSelection();
      return;
    }

    if (event.target.matches('[data-campaign-select-all]')) {
      const visibleIds = getFilteredCampaigns().map((campaign) => campaign.id);
      if (event.target.checked) visibleIds.forEach((id) => campaignState.selectedIds.add(id));
      else visibleIds.forEach((id) => campaignState.selectedIds.delete(id));
      renderCampaignRows();
      updateCampaignSelection();
    }
  });

  campaignPage.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-campaign-tab]');
    if (tab) {
      campaignState.activeTab = tab.dataset.campaignTab;
      renderCampaignTabs();
      renderCampaignRows();
      updateCampaignSelection();
      return;
    }

    const action = event.target.closest('[data-campaign-action]');
    if (!action) return;
    const actionName = action.dataset.campaignAction;

    if (actionName === 'clear') {
      campaignState.selectedIds.clear();
      renderCampaignRows();
      updateCampaignSelection();
      return;
    }

    const selectedCount = campaignState.selectedIds.size;
    if (actionName === 'create') {
      showToast('Create campaign is ready for product integration');
    } else if (actionName === 'row') {
      showToast('Campaign actions are ready for product integration');
    } else {
      showToast(`${actionName.replace('-', ' ')} is ready for product integration (${selectedCount} selected)`);
    }
  });
}

if (commissionRulesPage) {
  commissionRulesPage.addEventListener('input', (event) => {
    if (!event.target.matches('[data-commission-rules-search]')) return;
    commissionRulesState.search = event.target.value;
    renderCommissionRulesRows();
  });

  commissionRulesPage.addEventListener('change', (event) => {
    const filter = event.target.closest('[data-commission-rules-filter]');
    if (filter) {
      commissionRulesState.filters[filter.dataset.commissionRulesFilter] = filter.value;
      renderCommissionRulesRows();
      return;
    }

    const ruleCheckbox = event.target.closest('[data-commission-rules-select]');
    if (ruleCheckbox) {
      if (ruleCheckbox.checked) commissionRulesState.selectedIds.add(ruleCheckbox.dataset.commissionRulesSelect);
      else commissionRulesState.selectedIds.delete(ruleCheckbox.dataset.commissionRulesSelect);
      updateCommissionRulesSelection();
      return;
    }

    if (event.target.matches('[data-commission-rules-select-all]')) {
      const visibleIds = getFilteredCommissionRules().map((rule) => rule.id);
      if (event.target.checked) visibleIds.forEach((id) => commissionRulesState.selectedIds.add(id));
      else visibleIds.forEach((id) => commissionRulesState.selectedIds.delete(id));
      renderCommissionRulesRows();
    }
  });

  commissionRulesPage.addEventListener('click', (event) => {
    const action = event.target.closest('[data-commission-rules-action]');
    if (action) {
      event.stopPropagation();
      const actionName = action.dataset.commissionRulesAction;
      if (actionName === 'close-detail') {
        commissionRulesState.selectedRuleId = null;
        renderCommissionRulesDetail();
      } else if (actionName === 'next-page' || actionName === 'more-filters' || actionName === 'settings') {
        showToast(`${actionName.replace('-', ' ')} is ready for product integration`);
      } else if (actionName === 'edit' || actionName === 'row-menu') {
        showToast(`${action.dataset.commissionRulesRule} ${actionName === 'edit' ? 'edit' : 'more actions'} is ready for product integration`);
      } else if (actionName === 'edit-rates' || actionName === 'edit-conditions' || actionName === 'edit-tier' || actionName === 'delete-tier') {
        showToast(`${actionName.replaceAll('-', ' ')} is ready for product integration`);
      }
      return;
    }

    const pageNumber = event.target.closest('[data-commission-rules-page-number]');
    if (pageNumber) {
      event.stopPropagation();
      showToast(`Commission rules page ${pageNumber.dataset.commissionRulesPageNumber} is ready for product integration`);
      return;
    }

    const row = event.target.closest('[data-commission-rules-row]');
    if (!row || event.target.closest('input')) return;
    event.stopPropagation();
    commissionRulesState.selectedRuleId = row.dataset.commissionRulesRow;
    renderCommissionRulesRows();
    renderCommissionRulesDetail();
  });
}

if (financePage) {
  financePage.addEventListener('change', (event) => {
    if (!event.target.matches('[data-finance-period]')) return;
    financeState.trendPeriod = event.target.value;
    renderFinanceTrend();
    showToast(`Balance trend updated to ${event.target.options[event.target.selectedIndex].text}`);
  });

  financePage.addEventListener('click', (event) => {
    const action = event.target.closest('[data-finance-action]');
    if (!action) return;
    event.stopPropagation();

    const actionName = action.dataset.financeAction;
    if (actionName === 'page') {
      showToast(`Payout activity page ${action.dataset.financePageNumber} is ready for product integration`);
    } else if (actionName === 'method-menu') {
      showToast(`${action.dataset.financeMethod} payment method actions are ready for product integration`);
    } else if (actionName === 'summary-info') {
      showToast(`${action.dataset.financeLabel} details are ready for product integration`);
    } else if (actionName === 'deposit') {
      showToast('Deposit flow is ready for product integration');
    } else {
      showToast(`${actionName.replaceAll('-', ' ')} is ready for product integration`);
    }
  });
}

if (invoicesPage) {
  invoicesPage.addEventListener('input', (event) => {
    if (!event.target.matches('[data-invoices-search]')) return;
    invoicesState.search = event.target.value;
    renderInvoicesRows();
  });

  invoicesPage.addEventListener('change', (event) => {
    const filter = event.target.closest('[data-invoices-filter]');
    if (filter) {
      invoicesState.filters[filter.dataset.invoicesFilter] = filter.value;
      renderInvoicesRows();
      return;
    }

    if (event.target.matches('[data-invoices-date-range]')) {
      invoicesState.dateRange = event.target.value;
      showToast('Invoice date range updated to ' + event.target.options[event.target.selectedIndex].text);
      return;
    }

    const checkbox = event.target.closest('[data-invoices-select]');
    if (checkbox) {
      if (checkbox.checked) invoicesState.selectedIds.add(checkbox.dataset.invoicesSelect);
      else invoicesState.selectedIds.delete(checkbox.dataset.invoicesSelect);
      updateInvoicesSelection();
      return;
    }

    if (event.target.matches('[data-invoices-select-all]')) {
      const visibleIds = getFilteredInvoices().map((invoice) => invoice.id);
      if (event.target.checked) visibleIds.forEach((id) => invoicesState.selectedIds.add(id));
      else visibleIds.forEach((id) => invoicesState.selectedIds.delete(id));
      renderInvoicesRows();
    }
  });

  invoicesPage.addEventListener('click', (event) => {
    const action = event.target.closest('[data-invoices-action]');
    if (!action) return;
    event.stopPropagation();

    if (action.dataset.invoicesAction === 'details') {
      showToast('Invoice ' + action.dataset.invoicesId + ' details are ready for product integration');
    } else if (action.dataset.invoicesAction === 'download') {
      showToast('Invoice ' + action.dataset.invoicesId + ' download is ready for product integration');
    } else if (action.dataset.invoicesAction === 'page') {
      showToast('Invoices page ' + action.dataset.invoicesPageNumber + ' is ready for product integration');
    }
  });
}

if (helpCenterPage) {
  helpCenterPage.addEventListener('input', (event) => {
    if (!event.target.matches('[data-help-center-search]')) return;
    helpCenterState.search = event.target.value;
    helpCenterState.visibleArticleCount = 5;
    renderHelpCenterPage();
  });

  helpCenterPage.addEventListener('click', (event) => {
    const category = event.target.closest('[data-help-center-category]');
    if (category) {
      const selectedCategory = helpCenterPageData.categories.find((item) => item.id === category.dataset.helpCenterCategory);
      helpCenterState.search = selectedCategory?.label ?? '';
      helpCenterState.visibleArticleCount = 5;
      helpCenterSearch.value = helpCenterState.search;
      renderHelpCenterPage();
      showToast(`${selectedCategory?.label ?? 'Help'} articles selected`);
      return;
    }

    const action = event.target.closest('[data-help-center-action]');
    if (!action) return;

    const actionName = action.dataset.helpCenterAction;
    if (actionName === 'load-more-articles') {
      helpCenterState.visibleArticleCount += 3;
      renderHelpCenterPage();
    } else if (actionName === 'view-all-articles') {
      helpCenterState.search = '';
      helpCenterState.visibleArticleCount = helpCenterPageData.articles.length;
      helpCenterSearch.value = '';
      renderHelpCenterPage();
      showToast('Showing all help articles');
    } else if (actionName === 'contact-support') {
      showToast('Contact support is ready for product integration');
    } else if (actionName === 'view-tickets') {
      showToast('Support tickets are ready for product integration');
    } else if (actionName === 'view-status') {
      showToast('System status page is ready for product integration');
    }
  });
}

if (apiCredentialsPage) {
  apiCredentialsPage.addEventListener('input', (event) => {
    if (!event.target.matches('[data-api-credentials-search]')) return;
    apiCredentialsState.search = event.target.value;
    renderApiCredentialsRows();
  });

  apiCredentialsPage.addEventListener('change', (event) => {
    if (!event.target.matches('[data-api-credentials-status]')) return;
    apiCredentialsState.status = event.target.value;
    renderApiCredentialsRows();
  });

  apiCredentialsPage.addEventListener('click', (event) => {
    const action = event.target.closest('[data-api-credentials-action]');
    if (!action) return;

    const actionName = action.dataset.apiCredentialsAction;
    const itemName = action.dataset.apiCredentialsName;
    if (actionName === 'toggle-filter') {
      const nextOpenState = apiCredentialsFilterMenu.hidden;
      apiCredentialsFilterMenu.hidden = !nextOpenState;
      apiCredentialsFilterButton.setAttribute('aria-expanded', String(nextOpenState));
      return;
    }

    if (actionName === 'copy-key') {
      showToast(`Masked key for ${itemName} is ready to copy`);
    } else if (actionName === 'row-menu') {
      showToast(`Actions for ${itemName} are ready for product integration`);
    } else if (actionName === 'next-page') {
      showToast('API keys page 2 is ready for product integration');
    } else if (actionName === 'security-help') {
      showToast('API key security guidance is ready for product integration');
    } else if (actionName === 'create-key') {
      showToast('Create API key flow is ready for product integration');
    } else if (actionName === 'add-endpoint') {
      showToast('Webhook endpoint setup is ready for product integration');
    } else if (actionName === 'copy-webhook') {
      showToast(`${itemName} endpoint is ready to copy`);
    } else if (actionName === 'rotate-webhook') {
      showToast(`${itemName} rotation is ready for product integration`);
    } else if (actionName === 'revoke-webhook') {
      showToast(`${itemName} revoke flow is ready for product integration`);
    } else if (actionName === 'webhook-help') {
      showToast('Webhook documentation is ready for product integration');
    }
  });
}

apiCredentialsEnvironmentButtons.forEach((button) => {
  button.addEventListener('click', () => {
    apiCredentialsState.environment = button.dataset.apiCredentialsEnvironment;
    apiCredentialsState.search = '';
    apiCredentialsState.status = 'all';
    if (apiCredentialsSearch) apiCredentialsSearch.value = '';
    if (apiCredentialsStatus) apiCredentialsStatus.value = 'all';
    renderApiCredentialsPage();
    showToast(`${button.textContent.trim()} environment selected`);
  });
});

if (messagesPage) {
  messagesPage.addEventListener('input', (event) => {
    if (event.target.matches('[data-messages-search]')) {
      messagesState.search = event.target.value;
      renderMessagesPage();
      messagesSearch?.focus();
      return;
    }

    if (event.target.matches('[data-messages-reply]')) {
      messagesState.replyDraft = event.target.value;
    }
  });

  messagesPage.addEventListener('change', (event) => {
    if (event.target.matches('[data-messages-filter]')) {
      messagesState.filter = event.target.value;
      renderMessagesPage();
      return;
    }

    if (event.target.matches('[data-messages-sort]')) {
      messagesState.sort = event.target.value;
      renderMessagesPage();
      return;
    }

    const checkbox = event.target.closest('[data-messages-select]');
    if (checkbox) {
      if (checkbox.checked) messagesState.selectedIds.add(checkbox.dataset.messagesSelect);
      else messagesState.selectedIds.delete(checkbox.dataset.messagesSelect);
      updateMessagesSelection();
      return;
    }

    if (event.target.matches('[data-messages-select-all]')) {
      const visibleIds = getFilteredMessages().map((message) => message.id);
      if (event.target.checked) visibleIds.forEach((id) => messagesState.selectedIds.add(id));
      else visibleIds.forEach((id) => messagesState.selectedIds.delete(id));
      renderMessagesPage();
    }
  });

  messagesPage.addEventListener('keydown', (event) => {
    const row = event.target.closest('[data-messages-row]');
    if (!row || !['Enter', ' '].includes(event.key) || event.target.closest('input')) return;
    event.preventDefault();
    messagesState.selectedId = row.dataset.messagesRow;
    messagesState.readIds.add(messagesState.selectedId);
    messagesState.replyDraft = '';
    renderMessagesPage();
  });

  messagesPage.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-messages-tab]');
    if (tab) {
      navigateTo(tab.dataset.messagesTab);
      return;
    }

    const row = event.target.closest('[data-messages-row]');
    if (row && !event.target.closest('input, button, label')) {
      messagesState.selectedId = row.dataset.messagesRow;
      messagesState.readIds.add(messagesState.selectedId);
      messagesState.replyDraft = '';
      renderMessagesPage();
      return;
    }

    const action = event.target.closest('[data-messages-action]');
    if (action && action.dataset.messagesAction !== 'send-reply') handleMessagesAction(action);
  });

  messagesPage.addEventListener('submit', (event) => {
    if (!event.target.matches('[data-messages-reply-form]')) return;
    event.preventDefault();
    submitMessageReply();
  });
}

if (productsAssetsPage) {
  productsAssetsPage.addEventListener('input', (event) => {
    if (!event.target.matches('[data-products-assets-search]')) return;
    productsAssetsState.search = event.target.value;
    renderProductsAssetsPage();
    productsAssetsSearch?.focus();
  });

  productsAssetsPage.addEventListener('change', (event) => {
    const filter = event.target.closest('[data-products-assets-filter]');
    if (filter) {
      productsAssetsState.filters[filter.dataset.productsAssetsFilter] = filter.value;
      renderProductsAssetsPage();
      showToast(`${filter.options[filter.selectedIndex].text} selected`);
      return;
    }

    if (event.target.matches('[data-products-assets-sort]')) {
      productsAssetsState.sort = event.target.value;
      renderProductsAssetsPage();
      showToast('Asset order updated');
      return;
    }

    if (event.target.matches('[data-products-assets-page-size]')) {
      productsAssetsState.pageSize = Number(event.target.value);
      renderProductsAssetsPage();
      showToast(`${event.target.options[event.target.selectedIndex].text} selected`);
    }
  });

  productsAssetsPage.addEventListener('submit', (event) => {
    if (!event.target.matches('[data-products-assets-search-form]')) return;
    event.preventDefault();
    renderProductsAssetsPage();
    productsAssetsSearch?.focus();
    showToast(productsAssetsState.search ? `Searching assets for “${productsAssetsState.search}”` : 'Asset search cleared');
  });

  productsAssetsPage.addEventListener('click', (event) => {
    const tab = event.target.closest('[data-products-assets-tab]');
    if (tab) {
      productsAssetsState.activeTab = tab.dataset.productsAssetsTab;
      productsAssetsPage.classList.remove('is-detail-closed');
      renderProductsAssetsPage();
      showToast(`${tab.textContent.trim()} selected`);
      return;
    }

    const view = event.target.closest('[data-products-assets-view]');
    if (view) {
      productsAssetsState.view = view.dataset.productsAssetsView;
      renderProductsAssetsPage();
      return;
    }

    const asset = event.target.closest('[data-products-assets-asset-id]');
    if (asset) {
      productsAssetsState.selectedId = asset.dataset.productsAssetsAssetId;
      productsAssetsPage.classList.remove('is-detail-closed');
      renderProductsAssetsPage();
      return;
    }

    const pageNumber = event.target.closest('[data-products-assets-page-number]');
    if (pageNumber) {
      showToast(`Assets page ${pageNumber.dataset.productsAssetsPageNumber} is ready for product integration`);
      return;
    }

    const action = event.target.closest('[data-products-assets-action]');
    if (!action) return;
    const actionName = action.dataset.productsAssetsAction;
    if (actionName === 'close-detail') {
      productsAssetsPage.classList.add('is-detail-closed');
      productsAssetsDetail.hidden = true;
    } else if (actionName === 'upload') {
      showToast('Upload asset flow is ready for product integration');
    } else if (actionName === 'folder') {
      showToast('Create folder flow is ready for product integration');
    } else if (actionName === 'edit') {
      showToast('Asset editor is ready for product integration');
    } else {
      showToast(`${actionName.replaceAll('-', ' ')} is ready for product integration`);
    }
  });
}

if (attributionPage) {
  attributionPage.addEventListener('change', (event) => {
    if (!event.target.matches('[data-attribution-model]')) return;
    attributionState.activeModel = event.target.value;
    attributionState.isDirty = true;
    renderAttributionPage();
    showToast('Attribution model updated. Save changes to apply.');
  });
}

document.addEventListener('click', (event) => {
  if (!event.target.closest('.period-picker')) closePeriodMenu();
  const messagesAction = event.target.closest('[data-messages-action]');
  if (messagesAction && !messagesPage?.contains(messagesAction)) {
    if (messagesAction.dataset.messagesAction === 'compose') {
      if (!document.body.classList.contains('is-messages-page')) {
        navigateTo('all-messages');
      }
      requestAnimationFrame(() => messagesConversation?.querySelector('[data-messages-reply]')?.focus());
      showToast('Compose a reply in the selected conversation');
    } else if (messagesAction.dataset.messagesAction === 'preferences') {
      showToast('Notification preferences are ready for product integration');
    }
    return;
  }
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

  const commissionAction = event.target.closest('[data-commission-action]');
  if (commissionAction) {
    const action = commissionAction.dataset.commissionAction;
    if (action === 'create') showToast('Commission rule editor is ready for product integration');
    return;
  }

  const financeAction = event.target.closest('[data-finance-action]');
  if (financeAction) {
    const action = financeAction.dataset.financeAction;
    if (action === 'deposit') showToast('Deposit flow is ready for product integration');
    return;
  }

  const attributionAction = event.target.closest('[data-attribution-action]');
  if (attributionAction) {
    const action = attributionAction.dataset.attributionAction;
    if (action === 'save') {
      attributionState.isDirty = false;
      renderAttributionPage();
      showToast('Attribution settings saved');
    } else if (action === 'export') {
      showToast('Attribution settings export is ready for download');
    } else if (action === 'add-rule') {
      showToast('Rule editor is ready for product integration');
    } else if (action === 'performance') {
      showToast('Model performance is ready for product integration');
    } else if (action === 'history') {
      showToast('Full audit history is ready for product integration');
    } else if (action === 'edit-rule') {
      showToast(`Edit ${attributionAction.dataset.attributionRule} is ready for product integration`);
    } else if (action === 'rule-menu') {
      showToast(`More actions for ${attributionAction.dataset.attributionRule} are ready for product integration`);
    } else {
      showToast('This attribution metric is ready for product integration');
    }
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
  const activeElement = document.activeElement;
  const isTyping = activeElement?.matches('input, select, textarea, [contenteditable="true"]');
  if (event.key === '/' && document.body.classList.contains('is-help-center-page') && !isTyping) {
    event.preventDefault();
    helpCenterSearch?.focus();
    return;
  }

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
