import { buildSmoothChartPath } from './overview.mjs';
import {
  amazonCampaignRecords,
  brandPerformanceRecords,
  filterOperationsRecords,
  performanceMetricOptions,
  performanceSeries,
  transactionRecords,
} from './operations.mjs';

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
  };
  return renderers[pageId]?.({ pageId, pageState }) ?? '<div class="workspace-module"><div class="workspace-empty"><strong>Module unavailable</strong><span>This workspace is not configured yet.</span></div></div>';
}
