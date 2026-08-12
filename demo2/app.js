import { dashboardData } from './data.mjs';
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
        <article class="metric-card" data-tone="${metric.tone}">
          <div class="metric-card__top">
            <span class="metric-card__label">${metric.label}</span>
            <span class="metric-card__icon">${icon(metric.icon)}</span>
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
              <span class="ranking-row__rank">${String(index + 1).padStart(2, '0')}</span>
              <span class="ranking-row__name">
                <strong>${partner.name}</strong>
                <small>${partner.type} · ${partner.orders} orders</small>
              </span>
              <span class="ranking-row__track">
                <span class="ranking-row__fill" data-ranking-fill="${partner.percent}"></span>
              </span>
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
  const rows = [commission.approved, commission.pending, commission.paid, commission.voided];
  const isEmpty = state.demoState === 'empty';

  commissionSummary.innerHTML = `
    <div class="summary-card__header">
      <div>
        <span class="eyebrow">Settlement snapshot</span>
        <h2>Commission</h2>
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
        <h2>Partners</h2>
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
                <strong>${isEmpty ? '—' : item.value}</strong>
              </span>
              <span class="status-row__track">
                <span class="status-row__fill tone-${item.tone}" style="width:${isEmpty ? 0 : item.percent}%"></span>
              </span>
            </button>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderActionCenter = () => {
  sectionCount.textContent = state.demoState === 'empty' ? '0 open items' : `${state.actionItems.length} open items`;
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

const renderPage = () => {
  const context = findNavigationContext(state.activeNavigationChild ?? state.activeNavigationId);
  const isOverview = state.activeNavigationId === 'overview' && !state.activeNavigationChild;

  pageTitle.textContent = isOverview ? 'Business overview' : context.current.label;
  pageDescription.textContent = isOverview
    ? 'Monitor partnerships, campaigns and revenue performance.'
    : `${context.current.label} workspace preview for the current brand scope.`;
  breadcrumbCurrent.textContent = isOverview ? 'Overview' : context.current.label;
  overviewPage.hidden = !isOverview;
  modulePlaceholder.hidden = isOverview;

  if (!isOverview) {
    modulePlaceholder.querySelector('[data-module-title]').textContent = context.current.label;
    modulePlaceholder.querySelector('[data-module-parent]').textContent = context.parent.label;
  }
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
  state = {
    ...state,
    activeNavigationId: context.parent.id,
    activeNavigationChild: context.current.id === context.parent.id ? null : context.current.id,
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

document.addEventListener('click', (event) => {
  if (!event.target.closest('.period-picker')) closePeriodMenu();

  const filterChip = event.target.closest('[data-filter-chip]');
  if (filterChip) {
    const isActive = filterChip.classList.toggle('is-active');
    filterChip.setAttribute('aria-pressed', String(isActive));
    showToast(`${filterChip.querySelector('span')?.textContent ?? 'Filter'} ${isActive ? 'enabled' : 'cleared'}`);
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

  const demoAction = event.target.closest('[data-demo-action]');
  if (demoAction) {
    if (demoAction.dataset.demoAction === 'Reset filters') {
      document.querySelectorAll('[data-filter-chip]').forEach((chip) => {
        const active = chip.dataset.filterChip === 'date';
        chip.classList.toggle('is-active', active);
        chip.setAttribute('aria-pressed', String(active));
      });
      showToast('Filters reset');
      return;
    }

    showToast(`${demoAction.dataset.demoAction} is ready for product integration`);
  }
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
