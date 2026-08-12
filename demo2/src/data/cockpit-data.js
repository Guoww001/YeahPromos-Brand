import { dashboardData as baseDashboardData } from '../../data.mjs';

const partnerProfiles = [
  { id: 'northstar', name: 'Northstar Media', category: 'Publisher · Content', status: 'High-intent content channel', revenue: '$6,845.20', share: 100, clicks: '12,480', conversion: '3.4%', color: '#d7f0ed', initials: 'NM', insight: 'Northstar Media is currently your highest-converting partner and is contributing the strongest revenue momentum this week.' },
  { id: 'dealroom', name: 'The Dealroom', category: 'Publisher · Deals', status: 'Steady weekly momentum', revenue: '$5,126.80', share: 75, clicks: '9,640', conversion: '2.9%', color: '#e8defa', initials: 'TD', insight: 'The Dealroom is consistently producing efficient order volume and has room to grow with the Summer Sale launch.' },
  { id: 'shopper-edit', name: 'Shopper Edit', category: 'Influencer · Editorial', status: 'Growing audience reach', revenue: '$4,382.10', share: 64, clicks: '8,190', conversion: '2.6%', color: '#fde6c8', initials: 'SE', insight: 'Shopper Edit is adding healthy upper-funnel reach while maintaining a reliable conversion baseline.' },
  { id: 'tech-forward', name: 'Tech Forward', category: 'Publisher · Reviews', status: 'Strong product fit', revenue: '$3,614.60', share: 53, clicks: '6,820', conversion: '2.3%', color: '#dfeafb', initials: 'TF', insight: 'Tech Forward performs best on higher-consideration products and is a good candidate for the next product drop.' },
  { id: 'daily-living', name: 'Daily Living', category: 'Influencer · Lifestyle', status: 'Early-stage partner', revenue: '$2,906.40', share: 42, clicks: '5,440', conversion: '2.1%', color: '#f8e1ec', initials: 'DL', insight: 'Daily Living is still building momentum and could benefit from a tighter offer and fresh creative assets.' },
];

const normalizedPeriods = baseDashboardData.periods.map(({ snapshot, ...period }) => period);
const snapshots = Object.fromEntries(baseDashboardData.periods.map((period) => [period.id, period.snapshot]));
const normalizedActionItems = baseDashboardData.actionItems.map((item) => ({
  ...item,
  category: item.eyebrow,
  due: item.meta,
}));
const normalizedQuickActions = baseDashboardData.quickActions.map((item, index) => ({
  ...item,
  tone: ['lake', 'campaign', 'success', 'warning', 'purple'][index % 5],
  description: ['Bring a new voice into your partner mix', 'Set up an offer and launch window', 'Keep your product catalog discoverable', 'Give partners a reason to convert', 'Share a decision-ready snapshot'][index % 5],
}));

const dashboardData = {
  ...baseDashboardData,
  periods: normalizedPeriods,
  snapshots,
  actionItems: normalizedActionItems,
  quickActions: normalizedQuickActions,
  partners: partnerProfiles,
};

const operationalStatus = {
  '7d': {
    periodLabel: 'Aug 05 — Aug 12, 2026',
    score: 86,
    state: 'Healthy rhythm',
    headline: 'Your partner engine is moving in the right direction.',
    description: 'Orders and partner activity are on plan. There are three small issues worth clearing before the next payout run.',
    summary: 'Revenue is up 12.4% versus the previous period.',
    syncLabel: 'All key feeds synced',
    syncTone: 'success',
    todayDelta: '+12.4%',
  },
  '30d': {
    periodLabel: 'Jul 13 — Aug 12, 2026',
    score: 79,
    state: 'Needs attention',
    headline: 'Momentum is solid, with a few operational leaks to close.',
    description: 'The longer view shows healthy demand, but unresolved feed issues are starting to slow partner conversion.',
    summary: 'Partner-attributed revenue is up 8.1% versus the previous period.',
    syncLabel: '3 feed issues open',
    syncTone: 'warning',
    todayDelta: '+8.1%',
  },
  '90d': {
    periodLabel: 'May 14 — Aug 12, 2026',
    score: 91,
    state: 'Strong quarter',
    headline: 'The operating model is compounding across your best channels.',
    description: 'Northstar Labs has built a dependable partner base and sustained order quality across the quarter.',
    summary: 'Partner-attributed revenue is up 18.7% versus the previous period.',
    syncLabel: 'Historical data complete',
    syncTone: 'success',
    todayDelta: '+18.7%',
  },
};

const riskItems = [
  {
    id: 'balance-alert',
    tone: 'risk',
    icon: 'wallet',
    label: 'Balance watch',
    title: 'Top up before the next payout run',
    description: 'Current balance covers roughly six more days of approved partner payouts.',
    meta: '6 days remaining',
    action: 'Open finance',
    navigationId: 'balance-payments',
  },
  {
    id: 'sync-degraded',
    tone: 'warning',
    icon: 'refresh',
    label: 'Feed health',
    title: 'Product feed sync needs attention',
    description: 'Three products failed their last sync and may be missing from partner discovery.',
    meta: '3 failed records',
    action: 'Review sync',
    navigationId: 'product-feed',
  },
  {
    id: 'transaction-review',
    tone: 'risk',
    icon: 'alert',
    label: 'Review queue',
    title: 'Review unusual transaction volume',
    description: 'A spike of 28 transactions needs a quick quality check before approval.',
    meta: '28 pending',
    action: 'Open transactions',
    navigationId: 'transactions',
  },
];

const campaignPulse = [
  {
    id: 'summer-sale',
    tone: 'campaign',
    icon: 'spark',
    name: 'Summer Sale',
    status: 'Ready to launch',
    completion: 82,
    meta: 'Starts in 5 days',
    action: 'Open campaign',
    navigationId: 'all-campaigns',
  },
  {
    id: 'northstar-program',
    tone: 'lake',
    icon: 'users',
    name: 'Northstar Partner Program',
    status: 'Live',
    completion: 68,
    meta: '48 active partners',
    action: 'View partners',
    navigationId: 'my-partners',
  },
];

export { dashboardData, campaignPulse, operationalStatus, riskItems };
