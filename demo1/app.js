import { campaignPageData, dashboardData } from './data.mjs';
import {
  createDashboardState,
  selectDemoState,
  selectPeriod,
  toggleNavigationGroup,
} from './app-core.mjs';

let state = createDashboardState(dashboardData);
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

const icon = (name, className = '') => `
  <svg class="${className}" aria-hidden="true">
    <use href="#icon-${name}"></use>
  </svg>
`;

const findNavigationContext = (navigationId) => {
  for (const item of state.navigation) {
    if (item.id === navigationId) return { parent: item, current: item };
    const child = item.children?.find((entry) => entry.id === navigationId);
    if (child) return { parent: item, current: child };
  }

  return { parent: state.navigation[0], current: state.navigation[0] };
};

const renderNavigation = () => {
  navigation.innerHTML = state.navigation
    .map((item) => {
      const hasChildren = Array.isArray(item.children);
      const isExpanded = state.expandedGroups.includes(item.id);
      const isActive = state.activeNavigationId === item.id;

      return `
        <div class="nav-entry${isExpanded ? ' is-expanded' : ''}" data-nav-entry="${item.id}">
          <button
            class="nav-item${isActive ? ' is-active' : ''}"
            type="button"
            data-nav-item="${item.id}"
            ${hasChildren ? `data-nav-group="${item.id}" aria-expanded="${isExpanded}"` : ''}
          >
            <span class="nav-item__icon">${icon(item.icon)}</span>
            <span class="nav-item__label">${item.label}</span>
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
                          >${child.label}</button>
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

const renderMetrics = () => {
  const isEmpty = state.demoState === 'empty';
  metricsGrid.innerHTML = state.metrics
    .map(
      (metric) => `
        <article class="metric-card" data-metric-id="${metric.id}" data-tone="${metric.tone}">
          <div class="metric-card__top">
            <span class="metric-card__icon">${icon(metric.icon)}</span>
            <span class="metric-card__label">${metric.label}</span>
          </div>
          <strong class="metric-card__value">${isEmpty ? '—' : metric.value}</strong>
          <span class="metric-card__meta">
            <b class="metric-card__change">${isEmpty ? 'No data' : metric.change}</b>
            <span>${isEmpty ? 'No activity in this range' : metric.note}</span>
          </span>
        </article>
      `,
    )
    .join('');
};

const renderPartnerPerformance = () => {
  const isEmpty = state.demoState === 'empty';
  rankingList.innerHTML = isEmpty
    ? '<div class="inline-empty"><strong>No partner performance yet</strong><span>Partner results will appear after tracked orders are recorded.</span></div>'
    : state.partnerPerformance
        .map(
          (partner, index) => `
            <div class="ranking-row">
              <span class="ranking-row__rank">${index + 1}</span>
              <span class="ranking-row__name">
                <span class="ranking-row__avatar" aria-hidden="true">${partner.name.charAt(0)}</span>
                <span class="ranking-row__identity">
                  <strong>${partner.name}</strong>
                  <small>${partner.type}</small>
                </span>
              </span>
              <span class="ranking-row__orders">${partner.orders}</span>
              <strong class="ranking-row__amount">${partner.amount}</strong>
              <span class="ranking-row__trend">${partner.trend}</span>
            </div>
          `,
        )
        .join('');

  requestAnimationFrame(() => {
    document.querySelectorAll('[data-ranking-fill]').forEach((bar) => {
      bar.style.width = `${bar.dataset.rankingFill}%`;
    });
  });
};

const renderCommissionSummary = () => {
  const { commission } = state;
  const rows = [commission.pending, commission.approved, commission.paid];
  const isEmpty = state.demoState === 'empty';

  commissionSummary.innerHTML = `
    <div class="summary-card__header">
      <div>
        <span class="eyebrow">Settlement snapshot</span>
        <h2>Commission summary</h2>
      </div>
      <span class="summary-card__icon">${icon('wallet')}</span>
    </div>
    <div class="summary-total">
      <span>Total tracked</span>
      <strong>${isEmpty ? '—' : commission.total}</strong>
    </div>
    <div class="commission-bar" aria-label="Commission distribution">
      ${rows.map((item) => `<span class="tone-${item.tone}" style="width:${isEmpty ? 0 : item.percent}%"></span>`).join('')}
    </div>
    <div class="summary-list">
      ${rows
        .map(
          (item) => `
            <button class="summary-row" type="button" data-action-navigation="transactions">
              <span class="summary-row__label">
                <i class="summary-row__dot tone-${item.tone}"></i>
                ${item.label}
              </span>
              <strong>${isEmpty ? '—' : item.value}</strong>
            </button>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderPartnerStatus = () => {
  const isEmpty = state.demoState === 'empty';
  partnerStatus.innerHTML = `
    <div class="summary-card__header">
      <div>
        <span class="eyebrow">Relationship health</span>
        <h2>Partner status</h2>
      </div>
      <span class="summary-card__icon">${icon('users')}</span>
    </div>
    <div class="status-list">
      ${state.partnerStatus
        .map(
          (item) => `
            <button class="status-row" type="button" data-action-navigation="my-partners">
              <span class="status-row__top">
                <span><i class="summary-row__dot tone-${item.tone}"></i>${item.label}</span>
                <span class="status-row__meta">
                  <strong>${isEmpty ? '—' : item.value}</strong>
                  <em>${isEmpty ? '—' : `${item.percent}%`}</em>
                </span>
              </span>
            </button>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderActionCenter = () => {
  sectionCount.textContent = state.demoState === 'empty' ? '0 tasks' : `${state.actionItems.length} tasks`;
  actionCenter.innerHTML = state.demoState === 'empty'
    ? '<div class="action-empty"><span class="action-empty__icon">✓</span><strong>You are all caught up</strong><p>No actions need attention in this workspace.</p></div>'
    : state.actionItems
        .map(
          (item) => `
            <article class="action-card" data-tone="${item.tone}">
              <div class="action-card__icon">${icon(item.icon)}</div>
              <div class="action-card__content">
                <span class="eyebrow">${item.eyebrow}</span>
                <h3>${item.title}</h3>
                <p>${item.description}</p>
              </div>
              <div class="action-card__aside">
                <span class="status-chip">${item.meta}</span>
                <button class="button button--secondary" type="button" data-action-navigation="${item.navigationId}">
                  ${item.action}
                  ${icon('arrow')}
                </button>
              </div>
            </article>
          `,
        )
        .join('');
};

const renderQuickActions = () => {
  quickActions.innerHTML = state.quickActions
    .map(
      (item) => `
        <button class="quick-action" type="button" data-action-navigation="${item.navigationId}">
          <span>${icon(item.icon)}</span>
          <strong>${item.label}</strong>
          ${icon('arrow', 'quick-action__arrow')}
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

    return matchesTab && matchesQuery && matchesType && matchesChannel && matchesStatus && matchesOwner;
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
    campaignResultCount.textContent = shown ? `Showing 1 to ${shown} of ${shown} campaigns` : 'Showing 0 campaigns';
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

const renderPage = () => {
  const context = findNavigationContext(state.activeNavigationChild ?? state.activeNavigationId);
  const isOverview = state.activeNavigationId === 'overview' && !state.activeNavigationChild;
  const isCampaignPage = state.activeNavigationChild === 'all-campaigns';

  document.body.classList.toggle('is-campaign-page', isCampaignPage);
  pageTitle.textContent = isOverview ? 'Business overview' : context.current.label;
  pageDescription.textContent = isOverview
    ? 'Monitor your affiliate program performance and partner activity.'
    : isCampaignPage
      ? 'View, manage, and analyze all your campaigns in one place.'
      : `${context.current.label} workspace preview for the current brand scope.`;
  breadcrumbParent.textContent = isCampaignPage ? 'Campaigns' : 'Merchant workspace';
  breadcrumbCurrent.textContent = isCampaignPage ? 'All campaigns' : isOverview ? 'Overview' : context.current.label;
  breadcrumbCurrent.setAttribute('aria-current', 'page');
  overviewPage.hidden = !isOverview;
  campaignPage.hidden = !isCampaignPage;
  modulePlaceholder.hidden = isOverview || isCampaignPage;

  if (!isOverview && !isCampaignPage) {
    modulePlaceholder.querySelector('[data-module-title]').textContent = context.current.label;
    modulePlaceholder.querySelector('[data-module-parent]').textContent = context.parent.label;
  }

  if (isCampaignPage) renderCampaignPage();
};

const renderAll = () => {
  renderNavigation();
  renderPeriods();
  renderMetrics();
  renderPartnerPerformance();
  renderCommissionSummary();
  renderPartnerStatus();
  renderActionCenter();
  renderQuickActions();
  renderDemoStateBanner();
  renderPage();
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
