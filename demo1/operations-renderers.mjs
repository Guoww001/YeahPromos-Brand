import { buildSmoothChartPath } from './overview.mjs';
import {
  amazonCampaignRecords,
  affiliateProgramRecords,
  brandPerformanceRecords,
  filterInfluencerCampaignRecords,
  filterOperationsRecords,
  influencerCampaignRecords,
  performanceMetricOptions,
  performanceSeries,
  sortAffiliateProgramRecords,
  transactionRecords,
} from './operations.mjs?v=merchant-reference-24';

const toneForStatus = (status) => {
  const normalized = String(status ?? '').toLowerCase();
  if (normalized.includes('active') || normalized.includes('paid') || normalized.includes('connected') || normalized.includes('complete')) return 'success';
  if (normalized.includes('pending') || normalized.includes('scheduled') || normalized.includes('processing') || normalized.includes('draft') || normalized.includes('attention') || normalized.includes('invited')) return 'warning';
  if (normalized.includes('void') || normalized.includes('suspend') || normalized.includes('declin')) return 'danger';
  return 'neutral';
};

const labelize = (value) => String(value ?? '').replace(/([a-z])([A-Z])/g, '$1 $2').replace(/^./, (character) => character.toUpperCase());

const button = (label, action, { primary = false, iconName = '', pageId = '', recordId = '' } = {}) => `
  <button class="workspace-button${primary ? ' workspace-button--primary' : ''}" type="button" data-workspace-action="${action}"${pageId ? ` data-workspace-page-id="${pageId}"` : ''}${recordId ? ` data-workspace-record-id="${recordId}"` : ''}>
    ${iconName ? icon(iconName) : ''}<span>${label}</span>
  </button>
`;

const icon = (name, className = '') => `
  <svg class="${className}" aria-hidden="true"><use href="#icon-${name}"></use></svg>
`;

const statusChip = (status, tone = '') => `<span class="workspace-status" data-tone="${tone || toneForStatus(status)}">${status}</span>`;

const selectControl = ({ pageId, key, label, value, options, className = '' }) => `
  <label class="workspace-select ${className}">
    <span>${label}</span>
    <select data-workspace-filter data-workspace-page-id="${pageId}" data-filter-key="${key}" aria-label="${label}">
      ${options.map((option) => `<option value="${option}"${option === value ? ' selected' : ''}>${option}</option>`).join('')}
    </select>
    ${icon('chevron')}
  </label>
`;

const searchControl = ({ pageId, query = '', placeholder = 'Search' }) => `
  <form class="workspace-search-form" data-workspace-search-form data-workspace-page-id="${pageId}">
    <label class="workspace-search">
      ${icon('globe')}
      <span class="sr-only">${placeholder}</span>
      <input type="search" data-workspace-search value="${query}" placeholder="${placeholder}" />
      <button type="submit" aria-label="Search">${icon('arrow')}</button>
    </label>
  </form>
`;

const campaignSupportButton = (label, action, { primary = false, iconName = '', pageId = '' } = {}) => `
  <button class="campaign-support-button${primary ? ' campaign-support-button--primary' : ''}" type="button" data-campaign-support-action="${action}" data-campaign-support-page-id="${pageId}">
    ${iconName ? icon(iconName) : ''}<span>${label}</span>
  </button>
`;

const campaignSupportSelect = ({ pageId, key, label, value, options }) => `
  <label class="campaign-support-select">
    <span>${label}</span>
    <select data-campaign-support-filter data-campaign-support-page-id="${pageId}" data-filter-key="${key}" aria-label="${label}">
      ${options.map((option) => `<option value="${option}"${option === value ? ' selected' : ''}>${option}</option>`).join('')}
    </select>
    ${icon('chevron')}
  </label>
`;

const campaignSupportSearch = ({ pageId, query = '', placeholder = 'Search' }) => `
  <form class="campaign-support-search-form" data-campaign-support-search-form data-campaign-support-page-id="${pageId}">
    <label class="campaign-support-search">
      ${icon('search')}
      <span class="sr-only">${placeholder}</span>
      <input type="search" data-campaign-support-search value="${query}" placeholder="${placeholder}" />
      <button type="submit" aria-label="Search">${icon('arrow')}</button>
    </label>
  </form>
`;

const campaignSupportToolbar = ({ eyebrow, title, meta = '', actions = '' }) => `
  <div class="campaign-support-toolbar">
    <div>
      <span class="campaign-support-eyebrow">${eyebrow}</span>
      <h2>${title}</h2>
      <p>${meta}</p>
    </div>
    <div class="campaign-support-toolbar__actions">${actions}</div>
  </div>
`;

const campaignSupportTabs = ({ pageId, active, items }) => `
  <div class="campaign-support-tabs" role="tablist" aria-label="Campaign views">
    ${items.map(([value, label]) => `<button class="campaign-support-tab${active === value ? ' is-active' : ''}" type="button" role="tab" aria-selected="${active === value}" data-campaign-support-tab data-campaign-support-page-id="${pageId}" data-campaign-support-tab-value="${value}">${label}</button>`).join('')}
  </div>
`;

const campaignSupportStatus = (status, tone = '') => `<span class="campaign-support-status" data-tone="${tone || toneForStatus(status)}">${status}</span>`;

const campaignSupportMark = (mark, tone = 'red') => `<span class="campaign-support-mark campaign-support-mark--${tone}">${mark}</span>`;

const campaignSupportQuickFilter = ({ pageId, key, value, label, selected }) => `<button class="campaign-support-filter-chip${selected ? ' is-selected' : ''}" type="button" data-campaign-support-quick-filter data-campaign-support-page-id="${pageId}" data-filter-key="${key}" data-filter-value="${value}" aria-pressed="${selected}">${label}</button>`;

const campaignSupportFilterPanel = ({ pageId, pageState, mode, resultCount }) => {
  if (!pageState.filtersOpen) return '';
  const isPrograms = mode === 'programs';
  const quickFilters = isPrograms
    ? `<div><span class="campaign-support-filter-panel__label">Status</span><div class="campaign-support-filter-chips">${['All statuses', 'Active', 'Paused', 'Draft'].map((value) => campaignSupportQuickFilter({ pageId, key: 'status', value, label: value.replace('All statuses', 'All'), selected: pageState.filters.status === value })).join('')}</div></div><div><span class="campaign-support-filter-panel__label">Sort emphasis</span><div class="campaign-support-filter-chips">${['Recently updated', 'Most partners', 'Highest commission'].map((value) => campaignSupportQuickFilter({ pageId, key: 'sort', value, label: value.replace('Recently updated', 'Recent'), selected: pageState.filters.sort === value })).join('')}</div></div>`
    : `<div><span class="campaign-support-filter-panel__label">Platform</span><div class="campaign-support-filter-chips">${['All platforms', 'Instagram', 'TikTok', 'YouTube'].map((value) => campaignSupportQuickFilter({ pageId, key: 'platform', value, label: value.replace('All platforms', 'All'), selected: pageState.filters.platform === value })).join('')}</div></div><div><span class="campaign-support-filter-panel__label">Budget focus</span><div class="campaign-support-filter-chips">${['Any budget', 'Under $5,000', '$5,000 – $10,000', 'Over $10,000'].map((value) => campaignSupportQuickFilter({ pageId, key: 'budget', value, label: value.replace('Any budget', 'Any'), selected: pageState.filters.budget === value })).join('')}</div></div>`;
  return `<div class="campaign-support-filter-panel" data-campaign-support-filter-panel><div class="campaign-support-filter-panel__intro"><span class="campaign-support-eyebrow">Filter focus</span><strong>Shape the view without leaving the workspace</strong><span>${resultCount} ${isPrograms ? 'programs' : 'campaigns'} currently visible</span></div><div class="campaign-support-filter-panel__controls">${quickFilters}</div><button class="campaign-support-filter-panel__reset" type="button" data-campaign-support-action="reset-campaign-filters" data-campaign-support-page-id="${pageId}">Clear all</button></div>`;
};

const toolbar = ({ eyebrow, title, meta = '', actions = '' }) => `
  <div class="workspace-toolbar">
    <div>
      <span class="workspace-eyebrow">${eyebrow}</span>
      ${title ? `<h2>${title}</h2>` : ''}
      ${meta ? `<p>${meta}</p>` : ''}
    </div>
    <div class="workspace-toolbar__actions">${actions}</div>
  </div>
`;

const statGrid = (items, className = '') => `
  <div class="workspace-stat-grid ${className}">
    ${items.map(([label, value, note = '', tone = 'neutral']) => `
      <article class="workspace-stat" data-tone="${tone}">
        <span>${label}</span>
        <strong>${value}</strong>
        ${note ? `<small>${note}</small>` : ''}
      </article>
    `).join('')}
  </div>
`;

const panel = (title, body, { className = '', eyebrow = '', action = '' } = {}) => `
  <section class="workspace-panel ${className}">
    ${(title || eyebrow || action) ? `<div class="workspace-panel__header">${eyebrow ? `<span class="workspace-eyebrow">${eyebrow}</span>` : ''}<div class="workspace-panel__title-row">${title ? `<h3>${title}</h3>` : ''}${action}</div></div>` : ''}
    ${body}
  </section>
`;

const tableHead = (columns) => `<div class="workspace-table__head">${columns.map((column) => `<span>${column}</span>`).join('')}</div>`;

const formatChartValue = (value, display) => {
  if (display === 'currency') return `$${(value / 1000).toFixed(value >= 100000 ? 0 : 1)}K`;
  if (value >= 1000) return `${(value / 1000).toFixed(value >= 10000 ? 0 : 1)}K`;
  return String(value);
};

const renderLineChart = ({ chart, comparison = null, ariaLabel = 'Performance chart', compact = false }) => {
  const width = 900;
  const height = compact ? 210 : 290;
  const plot = { left: 52, right: 18, top: 22, bottom: 42 };
  const plotWidth = width - plot.left - plot.right;
  const plotHeight = height - plot.top - plot.bottom;
  const allValues = [...(chart?.points ?? []), ...(comparison?.points ?? [])].map((point) => point.value);
  const maxValue = Math.max(...allValues, 1);
  const roundedMax = Math.ceil(maxValue / (maxValue > 10000 ? 10000 : maxValue > 1000 ? 1000 : 100)) * (maxValue > 10000 ? 10000 : maxValue > 1000 ? 1000 : 100) || maxValue;
  const getPoints = (source) => (source?.points ?? []).map((point, index) => ({
    ...point,
    x: plot.left + (index / Math.max((source.points.length ?? 1) - 1, 1)) * plotWidth,
    y: plot.top + (1 - point.value / roundedMax) * plotHeight,
  }));
  const points = getPoints(chart);
  const comparisonPoints = getPoints(comparison);
  const baseline = plot.top + plotHeight;
  const linePath = points.length ? buildSmoothChartPath(points) : '';
  const areaPath = linePath ? `${linePath} L${points.at(-1).x.toFixed(1)},${baseline.toFixed(1)} L${points[0].x.toFixed(1)},${baseline.toFixed(1)} Z` : '';
  const grid = Array.from({ length: 5 }, (_, index) => {
    const y = plot.top + (index / 4) * plotHeight;
    const value = roundedMax * (1 - index / 4);
    return `<g class="workspace-chart__grid"><line x1="${plot.left}" y1="${y.toFixed(1)}" x2="${width - plot.right}" y2="${y.toFixed(1)}"></line><text x="${plot.left - 10}" y="${(y + 3).toFixed(1)}" text-anchor="end">${formatChartValue(value, chart?.display)}</text></g>`;
  }).join('');
  const xLabels = points.map((point) => `<text class="workspace-chart__x-label" x="${point.x.toFixed(1)}" y="${height - 12}" text-anchor="middle">${point.label}</text>`).join('');
  const pointsMarkup = points.map((point) => `<g class="workspace-chart__point"><circle cx="${point.x.toFixed(1)}" cy="${point.y.toFixed(1)}" r="3.4"></circle><text x="${point.x.toFixed(1)}" y="${(point.y - 12).toFixed(1)}" text-anchor="middle">${formatChartValue(point.value, chart.display)}</text></g>`).join('');

  return `
    <div class="workspace-chart" role="img" aria-label="${ariaLabel}">
      <svg viewBox="0 0 ${width} ${height}" preserveAspectRatio="none" aria-hidden="true">
        ${grid}
        ${areaPath ? `<path class="workspace-chart__area" d="${areaPath}"></path>` : ''}
        ${comparisonPoints.length ? `<path class="workspace-chart__line workspace-chart__line--comparison" d="${buildSmoothChartPath(comparisonPoints)}"></path>` : ''}
        ${linePath ? `<path class="workspace-chart__line" d="${linePath}"></path>` : ''}
        ${pointsMarkup}
        ${xLabels}
      </svg>
      <div class="workspace-chart__legend"><span><i></i>${chart?.label ?? 'Current period'}</span>${comparison ? `<span class="workspace-chart__legend--comparison"><i></i>${comparison.label}</span>` : ''}</div>
    </div>
  `;
};


const renderMetricTabs = ({ pageId, active, options }) => `<div class="workspace-tabs" role="tablist" aria-label="Metric tabs">${options.map(([value, label]) => `<button type="button" role="tab" aria-selected="${active === value}" class="workspace-tab${active === value ? ' is-active' : ''}" data-workspace-tab data-workspace-page-id="${pageId}" data-workspace-tab-value="${value}">${label}</button>`).join('')}</div>`;

const renderAffiliateProgramsPage = ({ pageId, pageState }) => {
  const filtered = sortAffiliateProgramRecords(
    filterOperationsRecords(affiliateProgramRecords, { query: pageState.query, filters: { status: pageState.filters.status } })
      .filter((record) => pageState.tab === 'all' || record.status.toLowerCase() === pageState.tab),
    pageState.filters.sort,
  );
  return `
    <div class="campaigns-support-module campaigns-support-module--programs" data-campaign-support-page="${pageId}">
      ${campaignSupportToolbar({ eyebrow: 'Partner programs', title: 'Affiliate programs', meta: 'Create, organize, and optimize the programs your partners promote.', actions: campaignSupportButton('Create affiliate program', 'create-program', { primary: true, iconName: 'users', pageId }) })}
      ${statGrid([['Active programs', '8', 'Across all partner groups', 'success'], ['Total partners', '1,248', '+14 this month', 'neutral'], ['Clicks this month', '128,450', '+12.6% vs previous period', 'success'], ['Commission paid', '$8,281.57', '30-day attribution window', 'neutral'], ['Conversion rate', '1.98%', '+5.6% vs previous period', 'success']], 'campaign-support-stat-grid campaign-support-stat-grid--five')}
      <div class="campaign-support-filter-bar">
        ${campaignSupportSearch({ pageId, query: pageState.query, placeholder: 'Search programs' })}
        ${campaignSupportSelect({ pageId, key: 'status', label: 'Status', value: pageState.filters.status, options: ['All statuses', 'Active', 'Paused', 'Draft'] })}
        ${campaignSupportSelect({ pageId, key: 'sort', label: 'Sort by', value: pageState.filters.sort, options: ['Recently updated', 'Most partners', 'Highest commission'] })}
        ${campaignSupportButton(pageState.filtersOpen ? 'Close filters' : 'Filters', 'filter-programs', { pageId })}
      </div>
      ${campaignSupportFilterPanel({ pageId, pageState, mode: 'programs', resultCount: filtered.length })}
      <div class="program-grid">${filtered.length ? filtered.map((record, index) => `
        <article class="program-card${pageState.selectedId === record.id ? ' is-selected' : ''}" style="--card-index:${index}" data-campaign-support-card data-campaign-support-record-id="${record.id}">
          <div class="program-card__top"><div>${campaignSupportMark(record.initials, record.markTone)}<div><h3>${record.name}</h3><span>Updated May 08, 2025</span></div></div>${campaignSupportStatus(record.status, record.tone)}</div>
          <div class="program-card__metrics"><div><span>Commission</span><strong>${record.commission}</strong></div><div><span>Attribution</span><strong>${record.attribution}</strong></div><div><span>Partners</span><strong>${record.partners}</strong></div></div>
          <div class="program-card__tags">${record.tags.map((tag) => `<span>${tag}</span>`).join('')}</div>
          <div class="program-card__footer"><span>${record.dateRange}</span><button type="button" data-campaign-support-action="view-program" data-campaign-support-page-id="${pageId}" data-campaign-support-record-id="${record.id}">Manage ${icon('arrow')}</button></div>
        </article>`).join('') : `<div class="campaign-support-empty"><strong>No programs match these filters</strong><span>Try clearing a filter or using a broader search.</span></div>`}</div>
    </div>
  `;
};

const renderInfluencerCampaignsPage = ({ pageId, pageState }) => {
  const filtered = filterInfluencerCampaignRecords(influencerCampaignRecords, { query: pageState.query, filters: pageState.filters, tab: pageState.tab });
  return `
    <div class="campaigns-support-module campaigns-support-module--influencer" data-campaign-support-page="${pageId}">
      ${campaignSupportToolbar({ eyebrow: 'Creator campaigns', title: 'Influencer campaigns', meta: 'Plan creator partnerships, track deliverables, and keep campaign spend visible.', actions: campaignSupportButton('Create campaign', 'create-campaign', { primary: true, iconName: 'users', pageId }) })}
      ${campaignSupportTabs({ pageId, active: pageState.tab, items: [['live', 'Live'], ['upcoming', 'Upcoming'], ['draft', 'Draft'], ['completed', 'Completed']] })}
      <div class="campaign-support-filter-bar campaign-support-filter-bar--wide">
        ${campaignSupportSelect({ pageId, key: 'category', label: 'Category', value: pageState.filters.category, options: ['All categories', 'Beauty & Personal Care', 'Health & Fitness', 'Fashion', 'Tech & Electronics', 'Travel', 'Food & Beverage', 'Photography', 'Home & Living'] })}
        ${campaignSupportSelect({ pageId, key: 'platform', label: 'Platform', value: pageState.filters.platform, options: ['All platforms', 'Instagram', 'TikTok', 'YouTube'] })}
        ${campaignSupportSelect({ pageId, key: 'budget', label: 'Budget', value: pageState.filters.budget, options: ['Any budget', 'Under $5,000', '$5,000 – $10,000', 'Over $10,000'] })}
        ${campaignSupportSelect({ pageId, key: 'date', label: 'Date range', value: pageState.filters.date, options: ['May 05 – May 12, 2025', 'Apr 28 – May 04, 2025', 'Apr 21 – Apr 27, 2025'] })}
        ${campaignSupportButton('Reset', 'reset-campaign-filters', { pageId })}
        ${campaignSupportButton(pageState.filtersOpen ? 'Close filters' : 'Filter focus', 'filter-influencer', { pageId })}
        ${campaignSupportSearch({ pageId, query: pageState.query, placeholder: 'Search campaigns' })}
      </div>
      ${campaignSupportFilterPanel({ pageId, pageState, mode: 'influencer', resultCount: filtered.length })}
      <div class="influencer-grid">${filtered.length ? filtered.map((record, index) => `
        <article class="influencer-card${pageState.selectedId === record.id ? ' is-selected' : ''}" style="--card-index:${index}" data-campaign-support-card data-campaign-support-record-id="${record.id}">
          <div class="influencer-card__profile">
            <div class="influencer-card__avatar influencer-card__avatar--${record.avatar.tone}" role="img" aria-label="${record.name} creator avatar"><span>${record.avatar.initials}</span></div>
            <span class="influencer-card__favorite" aria-hidden="true">♡</span>
          </div>
          <div class="influencer-card__body">
            <div class="influencer-card__heading"><div><h3>${record.name}</h3><span>${record.date}</span></div>${campaignSupportStatus(record.status, record.tone)}</div>
            <div class="influencer-card__tags"><span>${record.category}</span>${record.platforms.map((platform) => `<span>${platform}</span>`).join('')}</div>
            <div class="influencer-card__meta"><span>${icon('users')}<strong>${record.creators}</strong><small>creators</small></span><span>${icon('tag')}<strong>${record.deliverables}</strong><small>deliverables</small></span><span>${icon('wallet')}<strong>${record.budget}</strong><small>budget</small></span></div>
            <div class="influencer-card__footer"><div class="campaign-progress"><div><span>Budget used</span><strong>${record.budgetPercent}%</strong></div><span><i style="width:${record.budgetPercent}%"></i></span></div><button type="button" class="influencer-card__action" data-campaign-support-action="view-campaign" data-campaign-support-page-id="${pageId}" data-campaign-support-record-id="${record.id}">View campaign ${icon('arrow')}</button></div>
          </div>
          <div class="influencer-card__videos" aria-label="Related videos">${record.videos.map((video) => `
            <figure class="influencer-card__video">
              <div class="influencer-card__video-cover influencer-card__video-cover--${video.tone}" role="img" aria-label="${record.name}: ${video.title}"><span>${video.mark}</span><i class="influencer-card__video-play" aria-hidden="true"></i><strong>${video.title}</strong></div>
              <figcaption><span><i class="influencer-card__video-dot" aria-hidden="true"></i>${video.views}</span><time>${video.date}</time></figcaption>
            </figure>`).join('')}</div>
        </article>`).join('') : `<div class="campaign-support-empty"><strong>No influencer campaigns match these filters</strong><span>Try clearing a filter or using a broader search.</span></div>`}</div>
    </div>
  `;
};

const renderPerformancePage = ({ pageId, pageState }) => {
  const chart = performanceSeries[pageState.tab] ?? performanceSeries.clicks;
  return `
    <div class="workspace-module workspace-module--performance" data-workspace-page="${pageId}">
      ${toolbar({ eyebrow: 'Performance tracking', meta: 'Compare daily performance across your affiliate program and partner channels.', actions: button('Export CSV', 'export-performance', { pageId, iconName: 'download' }) })}
      ${panel('', `${renderMetricTabs({ pageId, active: pageState.tab, options: performanceMetricOptions })}<div class="workspace-inline-controls">${selectControl({ pageId, key: 'cadence', label: 'Interval', value: pageState.filters.cadence, options: ['Daily', 'Weekly', 'Monthly'] })}${selectControl({ pageId, key: 'partner', label: 'Partner scope', value: pageState.filters.partner, options: ['All partners', 'Publishers', 'Influencers'] })}</div>`, { className: 'workspace-panel--chart-toolbar' })}
      ${panel('Performance overview', renderLineChart({ chart, ariaLabel: `${chart.label} performance trend` }), { className: 'workspace-panel--chart', eyebrow: 'May 05 – May 12, 2025', action: '<span class="workspace-panel__note">Compared with previous period</span>' })}
      ${statGrid([['Total clicks', '282,401', '+8.2% vs Apr 28 – May 04', 'success'], ['Total orders', '6,521', '+11.6% vs previous period', 'success'], ['Total commission', '$32,712.85', '+10.3% vs previous period', 'success'], ['Gross sales', '$327,128.54', '+9.7% vs previous period', 'success'], ['Net sales', '$301,842.10', '+8.9% vs previous period', 'neutral'], ['Voids', '$4,210.20', '-2.1% vs previous period', 'danger']], 'workspace-stat-grid--wide')}
    </div>
  `;
};

const renderBrandPerformancePage = ({ pageId, pageState }) => {
  const activeMetric = pageState.tab === 'orders' ? 'orders' : pageState.tab === 'commission' ? 'commission' : pageState.tab === 'grossSales' ? 'grossSales' : 'clicks';
  const metricValues = brandPerformanceRecords.map((record) => Number(record[activeMetric].replace?.(/[$,]/g, '') ?? 0));
  const chart = { label: labelize(activeMetric), display: activeMetric === 'commission' || activeMetric === 'grossSales' ? 'currency' : 'count', points: metricValues.map((value, index) => ({ label: ['May 05', 'May 06', 'May 07', 'May 08'][index], value: Math.round(value * [0.76, 0.88, 0.84, 1][index]) })) };
  const brandRows = filterOperationsRecords(brandPerformanceRecords, { query: pageState.query, filters: pageState.filters.brand === 'All brands' ? {} : { brand: pageState.filters.brand } });
  return `
    <div class="workspace-module workspace-module--performance-brand" data-workspace-page="${pageId}">
      ${toolbar({ eyebrow: 'Performance tracking', meta: 'Compare performance across brands, stores, and partner channels.', actions: `${button('Export report', 'export-brand-performance', { pageId, iconName: 'download' })}` })}
      <div class="workspace-filter-bar workspace-filter-bar--brand">${selectControl({ pageId, key: 'brand', label: 'Brands', value: pageState.filters.brand, options: ['All brands', ...brandPerformanceRecords.map((record) => record.brand)] })}${selectControl({ pageId, key: 'cadence', label: 'Interval', value: pageState.filters.cadence, options: ['Daily', 'Weekly', 'Monthly'] })}${searchControl({ pageId, query: pageState.query, placeholder: 'Search brands' })}</div>
      ${panel('Brand performance trend', `${renderMetricTabs({ pageId, active: pageState.tab, options: [['clicks', 'Clicks'], ['orders', 'Orders'], ['commission', 'Commission'], ['grossSales', 'Gross sales']] })}${renderLineChart({ chart, ariaLabel: 'Brand performance trend', compact: true })}`, { className: 'workspace-panel--chart workspace-panel--brand-chart', eyebrow: 'May 05 – May 12, 2025', action: '<span class="workspace-panel__note">4 brands selected</span>' })}
      ${panel('Brand performance', `<div class="workspace-table workspace-table--brand">${tableHead(['Brand', 'Clicks', 'Orders', 'Gross sales', 'Commission', 'Conversion'])}${brandRows.map((record) => `<div class="workspace-table__row"><span class="workspace-table__primary"><span class="workspace-dot" data-tone="${record.color}"></span><strong>${record.brand}</strong></span><span>${record.clicks}</span><span>${record.orders}</span><span>${record.grossSales}</span><span>${record.commission}</span><span>${record.conversion}</span></div>`).join('')}</div>`, { className: 'workspace-panel--table', action: '<span class="workspace-panel__count">Updated 4 min ago</span>' })}
    </div>
  `;
};

const renderTransactionsPage = ({ pageId, pageState }) => {
  const records = filterOperationsRecords(transactionRecords, { query: pageState.query, filters: { status: pageState.filters.status, country: pageState.filters.country, type: pageState.filters.type } });
  return `
    <div class="workspace-module workspace-module--transactions" data-workspace-page="${pageId}">
      ${toolbar({ eyebrow: 'Data operations', meta: 'Review, approve, and export the transactions generated by your affiliate program.', actions: `${button('Bulk approve', 'bulk-approve', { pageId })}${button('Export CSV', 'export-transactions', { pageId, iconName: 'download' })}${button('Add transaction', 'add-transaction', { primary: true, pageId })}` })}
      ${statGrid([['Total sales', '$327,128.54', '1,284 orders', 'neutral'], ['Locked commission', '$24,291.51', '74.2% of total', 'success'], ['Total commission', '$32,712.85', '+10.3% this period', 'success'], ['Estimated commission', '$8,421.34', 'Pending review', 'warning']])}
      <div class="workspace-filter-bar workspace-filter-bar--dense">${selectControl({ pageId, key: 'date', label: 'Time range', value: pageState.filters.date ?? 'Last 30 days', options: ['Last 30 days', 'Last 7 days', 'This quarter'] })}${selectControl({ pageId, key: 'status', label: 'Order status', value: pageState.filters.status, options: ['All statuses', 'Pending', 'Paid', 'Void'] })}${selectControl({ pageId, key: 'type', label: 'Transaction type', value: pageState.filters.type, options: ['All types', 'Sale', 'Return'] })}${selectControl({ pageId, key: 'country', label: 'Country', value: pageState.filters.country, options: ['All countries', 'US', 'UK', 'CA', 'AU', 'DE'] })}${selectControl({ pageId, key: 'brand', label: 'Brand', value: pageState.filters.brand ?? 'All brands', options: ['All brands', 'Northstar Labs', 'Fieldhouse Goods', 'Canyon Home', 'Atlas Outdoor'] })}${searchControl({ pageId, query: pageState.query, placeholder: 'Search order, partner or SKU' })}</div>
      ${panel('Transactions', `<div class="workspace-table workspace-table--transactions">${tableHead(['Order', 'Partner', 'Brand / SKU', 'Sale amount', 'Commission', 'Status', 'Date', ''])}${records.length ? records.map((record) => `<button class="workspace-table__row${record.id === pageState.selectedId ? ' is-selected' : ''}" type="button" data-workspace-record-id="${record.id}" data-workspace-page-id="${pageId}"><span class="workspace-table__primary"><strong>${record.order}</strong><small>${record.partner}</small></span><span>${record.brand}<small>${record.sku}</small></span><span>${record.amount}</span><span>${record.commission}</span><span>${statusChip(record.status)}</span><span>${record.date}</span><span>${icon('arrow')}</span></button>`).join('') : `<div class="workspace-empty"><strong>No transactions found</strong><span>Try another filter or search term.</span></div>`}</div><div class="workspace-pagination"><span>Showing ${records.length} of ${transactionRecords.length} transactions</span><button type="button" data-workspace-action="previous-page" data-workspace-page-id="${pageId}">Previous</button><button class="is-active" type="button">1</button><button type="button">2</button><button type="button" data-workspace-action="next-page" data-workspace-page-id="${pageId}">Next</button></div>`, { className: 'workspace-panel--table', action: `<span class="workspace-panel__count">${records.length} results</span>` })}
    </div>
  `;
};

const amazonSeries = {
  clicks: { label: 'Click-throughs', display: 'count', points: [8200, 9800, 11200, 12400, 15100, 16800, 18420, 19600].map((value, index) => ({ label: ['May 05', 'May 06', 'May 07', 'May 08', 'May 09', 'May 10', 'May 11', 'May 12'][index], value })) },
  views: { label: 'Product detail views', display: 'count', points: [5600, 6800, 7400, 8200, 9100, 10400, 12840, 13420].map((value, index) => ({ label: ['May 05', 'May 06', 'May 07', 'May 08', 'May 09', 'May 10', 'May 11', 'May 12'][index], value })) },
  carts: { label: 'Add-to-carts', display: 'count', points: [1200, 1480, 1660, 1920, 2380, 2860, 3440, 3820].map((value, index) => ({ label: ['May 05', 'May 06', 'May 07', 'May 08', 'May 09', 'May 10', 'May 11', 'May 12'][index], value })) },
  purchases: { label: 'Purchases', display: 'count', points: [220, 280, 318, 402, 520, 686, 842, 920].map((value, index) => ({ label: ['May 05', 'May 06', 'May 07', 'May 08', 'May 09', 'May 10', 'May 11', 'May 12'][index], value })) },
  sales: { label: 'Product sales', display: 'currency', points: [12000, 16800, 20200, 26400, 32800, 41600, 52400, 68420].map((value, index) => ({ label: ['May 05', 'May 06', 'May 07', 'May 08', 'May 09', 'May 10', 'May 11', 'May 12'][index], value })) },
};

const renderAmazonPage = ({ pageId, pageState }) => {
  const chart = amazonSeries[pageState.tab] ?? amazonSeries.clicks;
  const records = filterOperationsRecords(amazonCampaignRecords, { query: pageState.query });
  return `
    <div class="workspace-module workspace-module--amazon" data-workspace-page="${pageId}">
      ${toolbar({ eyebrow: 'Amazon brand referral', meta: 'Monitor campaign-level Amazon traffic and product activity.', actions: `${button('Find a campaign', 'find-campaign', { pageId })}${button('Create campaign', 'create-amazon-campaign', { primary: true, pageId })}` })}
      <div class="workspace-filter-bar">${selectControl({ pageId, key: 'date', label: 'Date range', value: pageState.filters.date, options: ['May 01 – May 12, 2025', 'Apr 01 – Apr 30, 2025', 'Q2 2025'] })}${selectControl({ pageId, key: 'cadence', label: 'Interval', value: pageState.filters.cadence, options: ['Daily', 'Weekly'] })}${searchControl({ pageId, query: pageState.query, placeholder: 'Search campaigns' })}</div>
      ${statGrid([['Click-throughs', '35,310', '+12.8%', 'success'], ['Product detail views', '24,586', '+9.4%', 'success'], ['Add-to-carts', '7,864', '+15.1%', 'success'], ['Purchases', '2,312', '+10.6%', 'success'], ['Product sales', '$120,221.40', '+18.2%', 'success']], 'workspace-stat-grid--five')}
      ${panel('Campaign performance', `${renderMetricTabs({ pageId, active: pageState.tab, options: [['clicks', 'Click-throughs'], ['views', 'Product detail views'], ['carts', 'Add-to-carts'], ['purchases', 'Purchases'], ['sales', 'Product sales']] })}${renderLineChart({ chart, comparison: { ...chart, label: 'Previous period', points: chart.points.map((point) => ({ ...point, value: Math.round(point.value * 0.82) })) }, ariaLabel: 'Amazon BRB campaign performance' })}`, { className: 'workspace-panel--chart', eyebrow: 'May 01 – May 12, 2025', action: '<span class="workspace-panel__note">Current period vs previous period</span>' })}
      ${panel('Amazon BRB campaigns', `<div class="workspace-table workspace-table--campaigns">${tableHead(['Campaign', 'Status', 'Click-throughs', 'Product views', 'Purchases', 'Product sales', 'Date'])}${records.map((record) => `<button class="workspace-table__row" type="button" data-workspace-record-id="${record.id}" data-workspace-page-id="${pageId}"><span class="workspace-table__primary"><span class="workspace-avatar workspace-avatar--soft">A</span><strong>${record.campaign}</strong></span><span>${statusChip(record.status)}</span><span>${record.clicks}</span><span>${record.detailViews}</span><span>${record.purchases}</span><span>${record.sales}</span><span>${record.date}</span></button>`).join('')}</div>`, { className: 'workspace-panel--table', action: '<span class="workspace-panel__count">3 campaigns</span>' })}
    </div>
  `;
};


export function renderOperationsPage(pageId, { pageState } = {}) {
  const renderers = {
    performance: renderPerformancePage,
    'performance-brand': renderBrandPerformancePage,
    transactions: renderTransactionsPage,
    'amazon-brb': renderAmazonPage,
    'affiliate-programs': renderAffiliateProgramsPage,
    'influencer-campaigns': renderInfluencerCampaignsPage,
  };
  return renderers[pageId]?.({ pageId, pageState }) ?? '<div class="workspace-module"><div class="workspace-empty"><strong>Module unavailable</strong><span>This workspace is not configured yet.</span></div></div>';
}
