export const overviewMetricIds = ['clicks', 'conversions', 'gross-sales', 'commission', 'pending-payout'];
export const overviewChartTabs = ['clicks', 'conversions', 'gross-sales', 'commission'];

const basePartners = [
  { id: 'northstar', name: 'Alpha Media', type: 'Publisher', category: 'Content/Blog', clicks: '18,542', conversions: '432', commission: '$2,812.45', initial: 'A', accent: 'rose' },
  { id: 'dealroom', name: 'Future Hub', type: 'Publisher', category: 'Technology', clicks: '15,236', conversions: '389', commission: '$2,413.18', initial: 'F', accent: 'blue' },
  { id: 'shopper-edit', name: 'Gocertify', type: 'Publisher', category: 'Technology', clicks: '12,784', conversions: '312', commission: '$1,978.40', initial: 'G', accent: 'peach' },
  { id: 'tech-forward', name: 'Creative Bytes', type: 'Influencer', category: 'Content/Blog', clicks: '11,629', conversions: '298', commission: '$1,742.65', initial: 'C', accent: 'lilac' },
  { id: 'daily-living', name: 'Karma Collective', type: 'Publisher', category: 'Other', clicks: '9,812', conversions: '241', commission: '$1,321.90', initial: 'K', accent: 'ink' },
];

const baseMetrics = [
  { id: 'clicks', label: 'Clicks', value: '282,401', change: '+8.2%', note: 'vs Apr 28 – May 04', trend: 'up', icon: 'cursor', sparkline: [29, 33, 31, 42, 36, 51, 48] },
  { id: 'conversions', label: 'Conversions', value: '6,521', change: '+11.6%', note: 'vs Apr 28 – May 04', trend: 'up', icon: 'trend', sparkline: [21, 27, 24, 36, 31, 42, 45] },
  { id: 'gross-sales', label: 'Gross sales', value: '$327,128.54', change: '+9.7%', note: 'vs Apr 28 – May 04', trend: 'up', icon: 'dollar', sparkline: [24, 25, 35, 31, 42, 39, 50] },
  { id: 'commission', label: 'Commission', value: '$32,712.85', change: '+10.3%', note: 'vs Apr 28 – May 04', trend: 'up', icon: 'coins', sparkline: [23, 29, 25, 38, 34, 44, 52] },
  { id: 'pending-payout', label: 'Pending payout', value: '$8,421.34', change: '-2.1%', note: 'vs Apr 28 – May 04', trend: 'down', icon: 'wallet', sparkline: [44, 36, 42, 35, 39, 31, 34] },
];

const baseChart = {
  clicks: {
    label: 'Clicks',
    unit: 'clicks',
    points: [
      { label: 'May 05', value: 31200, display: '31.2K' },
      { label: 'May 06', value: 32800, display: '32.8K' },
      { label: 'May 07', value: 33100, display: '33.1K' },
      { label: 'May 08', value: 36700, display: '36.7K' },
      { label: 'May 09', value: 41500, display: '41.5K' },
      { label: 'May 10', value: 39400, display: '39.4K' },
      { label: 'May 11', value: 34600, display: '34.6K' },
      { label: 'May 12', value: 32100, display: '32.1K' },
    ],
  },
  conversions: {
    label: 'Conversions',
    unit: 'conversions',
    points: [
      { label: 'May 05', value: 602, display: '602' },
      { label: 'May 06', value: 714, display: '714' },
      { label: 'May 07', value: 682, display: '682' },
      { label: 'May 08', value: 805, display: '805' },
      { label: 'May 09', value: 912, display: '912' },
      { label: 'May 10', value: 874, display: '874' },
      { label: 'May 11', value: 821, display: '821' },
      { label: 'May 12', value: 798, display: '798' },
    ],
  },
  'gross-sales': {
    label: 'Gross sales',
    unit: 'sales',
    points: [
      { label: 'May 05', value: 34210, display: '$34.2K' },
      { label: 'May 06', value: 38520, display: '$38.5K' },
      { label: 'May 07', value: 36180, display: '$36.2K' },
      { label: 'May 08', value: 42940, display: '$42.9K' },
      { label: 'May 09', value: 48760, display: '$48.8K' },
      { label: 'May 10', value: 46210, display: '$46.2K' },
      { label: 'May 11', value: 40380, display: '$40.4K' },
      { label: 'May 12', value: 39928, display: '$39.9K' },
    ],
  },
  commission: {
    label: 'Commission',
    unit: 'commission',
    points: [
      { label: 'May 05', value: 3280, display: '$3.3K' },
      { label: 'May 06', value: 3720, display: '$3.7K' },
      { label: 'May 07', value: 3510, display: '$3.5K' },
      { label: 'May 08', value: 4180, display: '$4.2K' },
      { label: 'May 09', value: 4650, display: '$4.7K' },
      { label: 'May 10', value: 4420, display: '$4.4K' },
      { label: 'May 11', value: 3990, display: '$4.0K' },
      { label: 'May 12', value: 3962, display: '$4.0K' },
    ],
  },
};

const baseSnapshot = {
  rangeLabel: 'May 05 – May 12, 2025',
  previousLabel: 'Apr 28 – May 04',
  metrics: baseMetrics,
  chart: baseChart,
  partners: basePartners,
  commissionSummary: {
    approved: { label: 'Approved', value: '$24,291.51', percent: '74.2%', tone: 'success' },
    pending: { label: 'Pending', value: '$8,421.34', percent: '25.7%', tone: 'warning' },
    declined: { label: 'Declined', value: '$0.00', percent: '0%', tone: 'neutral' },
    total: '$32,712.85',
    paid: '$21,145.66',
  },
  partnerStatus: [
    { id: 'relationship', label: 'In relationship', value: '284', tone: 'success', icon: 'users' },
    { id: 'new', label: 'New partners', value: '46', tone: 'info', icon: 'users' },
    { id: 'pending', label: 'Pending review', value: '18', tone: 'warning', icon: 'calendar' },
    { id: 'declined', label: 'Declined', value: '4', tone: 'danger', icon: 'x' },
  ],
};

const snapshots = {
  '7d': baseSnapshot,
  '30d': {
    ...baseSnapshot,
    rangeLabel: 'Apr 13 – May 12, 2025',
    previousLabel: 'Mar 14 – Apr 12',
    metrics: baseMetrics.map((metric, index) => ({
      ...metric,
      value: ['824,640', '18,924', '$936,420.80', '$94,720.45', '$21,840.12'][index],
      change: ['+12.4%', '+14.1%', '+16.8%', '+13.7%', '-1.4%'][index],
      note: 'vs Mar 14 – Apr 12',
    })),
    chart: Object.fromEntries(Object.entries(baseChart).map(([key, chart]) => [key, {
      ...chart,
      points: chart.points.map((point, index) => ({
        ...point,
        label: ['Apr 13', 'Apr 17', 'Apr 21', 'Apr 25', 'Apr 29', 'May 03', 'May 07', 'May 12'][index],
        value: Math.round(point.value * 2.8),
        display: key === 'clicks' ? `${(point.value * 2.8 / 1000).toFixed(1)}K` : point.display,
      })),
    }])),
    commissionSummary: {
      ...baseSnapshot.commissionSummary,
      approved: { ...baseSnapshot.commissionSummary.approved, value: '$70,142.30', percent: '74.0%' },
      pending: { ...baseSnapshot.commissionSummary.pending, value: '$21,840.12', percent: '23.1%' },
      total: '$94,720.45',
      paid: '$61,840.80',
    },
  },
  '90d': {
    ...baseSnapshot,
    rangeLabel: 'Feb 12 – May 12, 2025',
    previousLabel: 'Nov 14 – Feb 11',
    metrics: baseMetrics.map((metric, index) => ({
      ...metric,
      value: ['2.48M', '54,820', '$2.84M', '$286,420.18', '$68,412.42'][index],
      change: ['+19.8%', '+17.2%', '+22.6%', '+18.4%', '-3.2%'][index],
      note: 'vs Nov 14 – Feb 11',
    })),
    chart: Object.fromEntries(Object.entries(baseChart).map(([key, chart]) => [key, {
      ...chart,
      points: chart.points.map((point, index) => ({
        ...point,
        label: ['Feb 12', 'Feb 24', 'Mar 08', 'Mar 20', 'Apr 01', 'Apr 13', 'Apr 25', 'May 12'][index],
        value: Math.round(point.value * 7.4),
        display: key === 'clicks' ? `${(point.value * 7.4 / 1000).toFixed(1)}K` : point.display,
      })),
    }])),
    commissionSummary: {
      ...baseSnapshot.commissionSummary,
      approved: { ...baseSnapshot.commissionSummary.approved, value: '$212,840.16', percent: '74.3%' },
      pending: { ...baseSnapshot.commissionSummary.pending, value: '$68,412.42', percent: '23.9%' },
      total: '$286,420.18',
      paid: '$196,820.60',
    },
  },
};

export const overviewData = {
  snapshots,
  actionItems: [
    { id: 'application-review', icon: 'users', tone: 'brand', title: '18 new partner applications', description: 'Review and respond to new applications.', navigationId: 'applications' },
    { id: 'campaign-budget', icon: 'chart', tone: 'warning', title: '3 campaigns nearing budget limit', description: 'Review and adjust campaign budgets.', navigationId: 'all-campaigns' },
  ],
  quickActions: [
    { id: 'invite-partners', icon: 'users', label: 'Invite partners', navigationId: 'invite-history' },
    { id: 'create-campaign', icon: 'send', label: 'Create campaign', navigationId: 'all-campaigns' },
    { id: 'add-coupon', icon: 'tag', label: 'Add coupon', navigationId: 'coupons' },
    { id: 'reports', icon: 'trend', label: 'Reports', navigationId: 'performance' },
    { id: 'settings', icon: 'settings', label: 'Settings', navigationId: 'settings' },
  ],
};

export function createOverviewState() {
  return { selectedMetric: 'clicks', cadence: 'daily' };
}

export function selectOverviewMetric(state, metricId) {
  if (!overviewChartTabs.includes(metricId)) return state;
  return { ...state, selectedMetric: metricId };
}

export function selectOverviewCadence(state, cadence) {
  if (!['daily', 'weekly', 'monthly'].includes(cadence)) return state;
  return { ...state, cadence };
}

export function getOverviewSnapshot(periodId = '7d') {
  return snapshots[periodId] ?? snapshots['7d'];
}

export function getOverviewChart(state, periodId = '7d') {
  const selectedMetric = typeof state === 'string' ? state : state?.selectedMetric ?? 'clicks';
  const snapshot = getOverviewSnapshot(periodId);
  const chart = snapshot.chart[selectedMetric] ?? snapshot.chart.clicks;
  return { metricId: selectedMetric, ...chart };
}

export function buildSmoothChartPath(points) {
  if (!Array.isArray(points) || points.length === 0) return '';

  const formatPoint = (point) => `${Number(point.x).toFixed(1)},${Number(point.y).toFixed(1)}`;
  if (points.length === 1) return `M${formatPoint(points[0])}`;

  const formatControl = (x, y) => `${Number(x).toFixed(1)},${Number(y).toFixed(1)}`;
  let path = `M${formatPoint(points[0])}`;

  for (let index = 0; index < points.length - 1; index += 1) {
    const previous = points[index - 1] ?? points[index];
    const current = points[index];
    const next = points[index + 1];
    const following = points[index + 2] ?? next;
    const controlOne = {
      x: current.x + (next.x - previous.x) / 6,
      y: current.y + (next.y - previous.y) / 6,
    };
    const controlTwo = {
      x: next.x - (following.x - current.x) / 6,
      y: next.y - (following.y - current.y) / 6,
    };

    path += ` C${formatControl(controlOne.x, controlOne.y)} ${formatControl(controlTwo.x, controlTwo.y)} ${formatPoint(next)}`;
  }

  return path;
}
