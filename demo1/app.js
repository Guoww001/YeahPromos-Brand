import { dashboardData } from './data.mjs';
import {
  applyMerchant,
  createDashboardState,
  selectPeriod,
  toggleNavigationGroup,
} from './app-core.mjs';

let state = createDashboardState(dashboardData);
let activeNavigationId = 'overview';
let toastTimer;
let lastDrawerTrigger = null;

const navigation = document.querySelector('[data-navigation]');
const metricsGrid = document.querySelector('[data-metrics-grid]');
const rankingList = document.querySelector('[data-ranking-list]');
const commissionSummary = document.querySelector('[data-commission-summary]');
const merchantStatus = document.querySelector('[data-merchant-status]');
const merchantGrid = document.querySelector('[data-merchants-grid]');
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

const renderNavigation = () => {
  navigation.innerHTML = state.navigation
    .map((item) => {
      const hasChildren = Array.isArray(item.children);
      const isExpanded = state.expandedGroups.includes(item.id);
      const isActive = activeNavigationId === item.id;

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
                          <button class="nav-child" type="button" data-nav-child="${child}">${child}</button>
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
  metricsGrid.innerHTML = state.metrics
    .map(
      (metric) => `
        <article class="metric-card" data-tone="${metric.tone}">
          <div class="metric-card__top">
            <span class="metric-card__label">${metric.label}</span>
            <span class="metric-card__icon">${icon(metric.icon)}</span>
          </div>
          <strong class="metric-card__value">${metric.value}</strong>
          <span class="metric-card__meta">
            <b class="metric-card__change">${metric.change}</b>
            <span>${metric.note}</span>
          </span>
        </article>
      `,
    )
    .join('');
};

const renderRanking = () => {
  rankingList.innerHTML = state.advertisers
    .map(
      (advertiser, index) => `
        <div class="ranking-row">
          <span class="ranking-row__rank">${String(index + 1).padStart(2, '0')}</span>
          <span class="ranking-row__name">${advertiser.name}</span>
          <span class="ranking-row__track">
            <span class="ranking-row__fill" data-ranking-fill="${advertiser.percent}"></span>
          </span>
          <strong class="ranking-row__amount">${advertiser.amount}</strong>
          <span class="ranking-row__trend">${advertiser.trend}</span>
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
  const rows = [commission.approved, commission.pending, commission.paid];

  commissionSummary.innerHTML = `
    <div class="summary-card__header">
      <div>
        <span class="eyebrow">Earnings flow</span>
        <h2>Commission</h2>
      </div>
      <span class="summary-card__icon">${icon('wallet')}</span>
    </div>
    <div class="summary-total">
      <span>Total tracked</span>
      <strong>${commission.total}</strong>
    </div>
    <div class="commission-bar" aria-label="Commission distribution">
      ${rows.map((item) => `<span class="tone-${item.tone}" style="width:${item.percent}%"></span>`).join('')}
    </div>
    <div class="summary-list">
      ${rows
        .map(
          (item) => `
            <button class="summary-row" type="button" data-demo-action="${item.label} commission">
              <span class="summary-row__label">
                <i class="summary-row__dot tone-${item.tone}"></i>
                ${item.label}
              </span>
              <strong>${item.value}</strong>
            </button>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderMerchantStatus = () => {
  merchantStatus.innerHTML = `
    <div class="summary-card__header">
      <div>
        <span class="eyebrow">Program access</span>
        <h2>Merchants</h2>
      </div>
      <span class="summary-card__icon">${icon('store')}</span>
    </div>
    <div class="status-list">
      ${state.merchantStatus
        .map(
          (item) => `
            <button class="status-row" type="button" data-demo-action="${item.label} merchants">
              <span class="status-row__top">
                <span><i class="summary-row__dot tone-${item.tone}"></i>${item.label}</span>
                <strong>${item.value}</strong>
              </span>
              <span class="status-row__track">
                <span class="status-row__fill tone-${item.tone}" style="width:${item.percent}%"></span>
              </span>
            </button>
          `,
        )
        .join('')}
    </div>
  `;
};

const renderMerchantCard = (merchant) => `
  <article class="merchant-card" data-merchant-id="${merchant.id}">
    <div class="merchant-card__top">
      <button
        class="merchant-logo"
        type="button"
        style="--logo-background:${merchant.logoBackground};--logo-color:${merchant.brandColor}"
        data-merchant-view="${merchant.id}"
        aria-label="View ${merchant.name} details"
      >${merchant.mark}</button>
      <div class="merchant-card__identity">
        <h3>${merchant.name}</h3>
        <p>ID: ${merchant.displayId}</p>
      </div>
      <span class="status-chip">New</span>
    </div>
    <div class="merchant-card__commission">
      <span>${merchant.commissionLabel}</span>
      <strong>${merchant.commission}</strong>
    </div>
    <div class="merchant-card__meta">
      <span>${icon('location')}${merchant.countryCode}</span>
      <span>${icon('clock')}Cookie: ${merchant.cookieDays} days</span>
    </div>
    <div class="merchant-card__footer">
      <span class="merchant-card__domain">${merchant.domain}</span>
      <button class="button button--secondary" type="button" data-merchant-view="${merchant.id}">
        ${icon('eye')} View
      </button>
      <button
        class="button ${merchant.applied ? 'button--applied' : 'button--primary'}"
        type="button"
        data-merchant-apply="${merchant.id}"
        ${merchant.applied ? 'disabled' : ''}
      >
        ${icon(merchant.applied ? 'check' : 'send')}
        ${merchant.applied ? 'Applied' : 'Apply'}
      </button>
    </div>
  </article>
`;

const renderMerchants = () => {
  merchantGrid.innerHTML = state.merchants.map(renderMerchantCard).join('');
};

const renderDrawer = () => {
  const merchant = state.merchants.find((item) => item.id === state.activeMerchantId);
  if (!merchant) return;

  drawerContent.innerHTML = `
    <div class="drawer-header">
      <div class="drawer-header__merchant">
        <span
          class="merchant-logo"
          style="--logo-background:${merchant.logoBackground};--logo-color:${merchant.brandColor}"
        >${merchant.mark}</span>
        <div>
          <h2 id="merchant-drawer-title">${merchant.name}</h2>
          <p>Merchant ID: ${merchant.displayId}</p>
        </div>
      </div>
      <button class="icon-button" type="button" data-drawer-close aria-label="Close merchant details">
        ${icon('x')}
      </button>
    </div>

    <section class="drawer-section">
      <p class="drawer-section__label">Commission opportunity</p>
      <div class="drawer-commission">
        <span>${merchant.commissionLabel}</span>
        <strong>${merchant.commission}</strong>
      </div>
    </section>

    <section class="drawer-section">
      <p class="drawer-section__label">Program details</p>
      <div class="drawer-facts">
        <div class="drawer-fact"><span>Market</span><strong>${merchant.country}</strong></div>
        <div class="drawer-fact"><span>Cookie window</span><strong>${merchant.cookieDays} days</strong></div>
        <div class="drawer-fact"><span>Domain</span><strong>${merchant.domain}</strong></div>
        <div class="drawer-fact"><span>Status</span><strong>${merchant.applied ? 'Applied' : 'Open to apply'}</strong></div>
      </div>
    </section>

    <section class="drawer-section">
      <p class="drawer-section__label">Promotion fit</p>
      <div class="drawer-tags">
        <span class="tag-chip">${merchant.category}</span>
        <span class="tag-chip">${merchant.channel}</span>
      </div>
    </section>

    <section class="drawer-section">
      <p class="drawer-section__label">About the program</p>
      <p class="drawer-description">${merchant.description}</p>
    </section>

    <div class="drawer-actions">
      <button class="button button--secondary" type="button" data-demo-action="Open ${merchant.domain}">
        ${icon('external')} Visit website
      </button>
      <button
        class="button ${merchant.applied ? 'button--applied' : 'button--primary'}"
        type="button"
        data-merchant-apply="${merchant.id}"
        ${merchant.applied ? 'disabled' : ''}
      >
        ${icon(merchant.applied ? 'check' : 'send')}
        ${merchant.applied ? 'Application sent' : 'Apply to program'}
      </button>
    </div>
  `;
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

const openMerchantDrawer = (merchantId, trigger) => {
  lastDrawerTrigger = trigger ?? document.activeElement;
  state = { ...state, activeMerchantId: merchantId };
  renderDrawer();
  drawer.hidden = false;
  document.body.classList.add('is-overlay-open');
  requestAnimationFrame(() => {
    drawer.classList.add('is-open');
    drawerBackdrop.classList.add('is-open');
    drawer.querySelector('[data-drawer-close]')?.focus();
  });
};

const closeMerchantDrawer = () => {
  const activeMerchantId = state.activeMerchantId;
  drawer.classList.remove('is-open');
  drawerBackdrop.classList.remove('is-open');
  window.setTimeout(() => {
    const fallbackTrigger = document.querySelector(
      `[data-merchant-view="${activeMerchantId}"]`,
    );
    const focusTarget = lastDrawerTrigger?.isConnected
      ? lastDrawerTrigger
      : fallbackTrigger;

    drawer.hidden = true;
    state = { ...state, activeMerchantId: null };
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

const handleMerchantAction = (event) => {
  const viewButton = event.target.closest('[data-merchant-view]');
  const applyButton = event.target.closest('[data-merchant-apply]');

  if (viewButton) {
    openMerchantDrawer(viewButton.dataset.merchantView, viewButton);
    return;
  }

  if (applyButton) {
    const result = applyMerchant(state, applyButton.dataset.merchantApply);
    state = result.state;
    renderMerchants();
    renderDrawer();
    showToast(result.message);
  }
};

navigation.addEventListener('click', (event) => {
  const groupButton = event.target.closest('[data-nav-group]');
  const itemButton = event.target.closest('[data-nav-item]');
  const childButton = event.target.closest('[data-nav-child]');

  if (childButton) {
    showToast(`${childButton.dataset.navChild} selected`);
    return;
  }

  if (!itemButton) return;
  activeNavigationId = itemButton.dataset.navItem;

  if (groupButton) {
    state = toggleNavigationGroup(state, groupButton.dataset.navGroup);
  } else {
    showToast(`${itemButton.textContent.trim()} selected`);
  }

  renderNavigation();

  if (window.matchMedia('(max-width: 767px)').matches) {
    closeSidebar();
  }
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
  renderPeriods();
  closePeriodMenu();
  showToast(`Date range updated to ${option.textContent.trim().replace(/\s+/g, ' ')}`);
});

merchantGrid.addEventListener('click', handleMerchantAction);
drawerContent.addEventListener('click', (event) => {
  if (event.target.closest('[data-drawer-close]')) {
    closeMerchantDrawer();
    return;
  }

  handleMerchantAction(event);
});
drawerBackdrop.addEventListener('click', closeMerchantDrawer);
sidebarOpenButton.addEventListener('click', openSidebar);
sidebarCloseButton.addEventListener('click', closeSidebar);
sidebarBackdrop.addEventListener('click', closeSidebar);

document.addEventListener('click', (event) => {
  if (!event.target.closest('.period-picker')) closePeriodMenu();

  const demoAction = event.target.closest('[data-demo-action]');
  if (demoAction) showToast(`${demoAction.dataset.demoAction} is ready for product integration`);
});

document.addEventListener('keydown', (event) => {
  if (event.key !== 'Escape') return;

  if (drawer.classList.contains('is-open')) {
    closeMerchantDrawer();
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

renderNavigation();
renderPeriods();
renderMetrics();
renderRanking();
renderCommissionSummary();
renderMerchantStatus();
renderMerchants();
