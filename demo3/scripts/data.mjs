const navigation = [
  { id: 'overview', label: 'Command overview', icon: 'grid' },
  {
    id: 'partners', label: 'Partner operations', icon: 'users', badge: '12', children: [
      { id: 'discover', label: 'Discover partners' },
      { id: 'applications', label: 'Applications', badge: '12' },
      { id: 'my-partners', label: 'My partners' },
      { id: 'invites', label: 'Invitation center' },
    ],
  },
  {
    id: 'campaigns', label: 'Campaign control', icon: 'orbit', badge: '2', children: [
      { id: 'all-campaigns', label: 'All campaigns' },
      { id: 'affiliate-programs', label: 'Affiliate programs' },
      { id: 'influencer-campaigns', label: 'Influencer campaigns' },
    ],
  },
  {
    id: 'assets', label: 'Product & assets', icon: 'box', state: 'alert', children: [
      { id: 'product-feed', label: 'Product feed', state: 'alert' },
      { id: 'coupons', label: 'Coupons' },
      { id: 'creatives', label: 'Creative library' },
    ],
  },
  { id: 'rules', label: 'Commission logic', icon: 'coins', children: [{ id: 'commission-rules', label: 'Commission rules' }, { id: 'attribution', label: 'Attribution rules' }] },
  { id: 'data', label: 'Data & transactions', icon: 'pulse', badge: '28', children: [{ id: 'performance', label: 'Performance' }, { id: 'transactions', label: 'Transactions', badge: '28' }, { id: 'exports', label: 'Exports' }] },
  { id: 'finance', label: 'Finance', icon: 'wallet', children: [{ id: 'balance', label: 'Balance & payments', state: 'alert' }, { id: 'invoices', label: 'Invoices' }] },
  { id: 'communications', label: 'Communications', icon: 'message', badge: '4', children: [{ id: 'inbox', label: 'Inbox', badge: '4' }, { id: 'notifications', label: 'Notifications' }, { id: 'templates', label: 'Email templates' }] },
  { id: 'systems', label: 'Systems & access', icon: 'settings', children: [{ id: 'integrations', label: 'Integrations' }, { id: 'team', label: 'Team & permissions' }, { id: 'api', label: 'API & developer' }] },
];

const partners = [
  { id: 'northstar', name: 'Northstar Media', type: 'Publisher · Content', initials: 'NM', color: '#203f4b', revenue: '$6,845.20', share: 100, trend: '+18.4%', orders: '214 orders', conversion: '3.4%', status: 'Active', insight: 'Highest-converting publisher this week. Its editorial review is driving the largest share of assisted revenue.' },
  { id: 'dealroom', name: 'The Dealroom', type: 'Publisher · Deals', initials: 'TD', color: '#332b4f', revenue: '$5,126.80', share: 75, trend: '+12.1%', orders: '186 orders', conversion: '2.9%', status: 'Active', insight: 'Reliable order volume. A private coupon could lift its conversion before Summer Sale begins.' },
  { id: 'shopper-edit', name: 'Shopper Edit', type: 'Influencer · Editorial', initials: 'SE', color: '#4a3627', revenue: '$4,382.10', share: 64, trend: '+7.8%', orders: '142 orders', conversion: '2.6%', status: 'Active', insight: 'Audience reach is expanding steadily, with healthy assisted conversions from recent editorial placements.' },
  { id: 'tech-forward', name: 'Tech Forward', type: 'Publisher · Reviews', initials: 'TF', color: '#263651', revenue: '$3,614.60', share: 53, trend: '+4.6%', orders: '118 orders', conversion: '2.3%', status: 'Active', insight: 'The review channel remains strongest for high-consideration products and should receive the next product drop.' },
  { id: 'daily-living', name: 'Daily Living', type: 'Influencer · Lifestyle', initials: 'DL', color: '#4a2f3d', revenue: '$2,906.40', share: 42, trend: '+2.9%', orders: '96 orders', conversion: '2.1%', status: 'Growing', insight: 'A promising early-stage partnership that needs a clearer offer and fresh creative assets to grow.' },
];

const decisions = [
  { id: 'balance-cover', priority: 1, domain: 'Finance', tone: 'action', icon: 'wallet', title: 'Balance covers six payout days', description: 'Current balance may not cover the next approved payout run.', impact: 'Payout continuity', due: 'Review today', action: 'Review balance', destination: 'balance' },
  { id: 'feed-sync', priority: 2, domain: 'Product feed', tone: 'risk', icon: 'refresh', title: 'Three products failed to sync', description: 'Affected products may be missing from partner discovery and campaign links.', impact: 'Partner availability', due: '3 failed records', action: 'Inspect records', destination: 'product-feed' },
  { id: 'transaction-review', priority: 3, domain: 'Transactions', tone: 'risk', icon: 'receipt', title: '28 transactions need approval', description: 'Orders are ready for review before commissions can move toward payout.', impact: 'Commission release', due: '28 pending', action: 'Start review', destination: 'transactions' },
  { id: 'applications', priority: 4, domain: 'Partner operations', tone: 'signal', icon: 'users', title: '12 partner applications are waiting', description: 'High-fit publisher and influencer applications have not been reviewed.', impact: 'Partner pipeline', due: '12 pending', action: 'Open applications', destination: 'applications' },
  { id: 'summer-sale', priority: 5, domain: 'Campaign control', tone: 'campaign', icon: 'orbit', title: 'Summer Sale starts in five days', description: 'The campaign still needs a final offer and one creative approval.', impact: 'Launch readiness', due: '82% complete', action: 'Open campaign', destination: 'all-campaigns' },
];

const campaigns = [
  { id: 'summer', name: 'Summer Sale', lifecycle: 'Scheduled', completeness: 82, start: 'Starts in 5 days', tone: 'campaign', missing: '1 creative approval' },
  { id: 'northstar-program', name: 'Northstar Partner Program', lifecycle: 'Active', completeness: 100, start: '48 active partners', tone: 'success', missing: 'All dependencies ready' },
  { id: 'creator-launch', name: 'Creator Launch', lifecycle: 'Draft', completeness: 46, start: 'Owner: M. Chen', tone: 'action', missing: 'Rule and assets missing' },
];

const risks = [
  { id: 'finance-risk', label: 'Finance', title: 'Balance cover is trending down', detail: '6 days remaining', tone: 'action', destination: 'balance' },
  { id: 'sync-risk', label: 'Integration', title: 'Product feed has three failed records', detail: 'Last sync 12 min ago', tone: 'risk', destination: 'product-feed' },
  { id: 'transaction-risk', label: 'Transactions', title: 'Review queue is above weekly target', detail: '28 pending approvals', tone: 'risk', destination: 'transactions' },
  { id: 'rule-risk', label: 'Rules', title: 'One scheduled commission rule overlaps', detail: 'Effective Aug 17', tone: 'campaign', destination: 'commission-rules' },
];

const quickCommands = [
  { id: 'invite', label: 'Invite partner', description: 'Start an outreach flow', icon: 'send', destination: 'invites' },
  { id: 'campaign', label: 'Create campaign', description: 'Set the next launch in motion', icon: 'orbit', destination: 'all-campaigns' },
  { id: 'product', label: 'Add product', description: 'Make a product promotable', icon: 'box', destination: 'product-feed' },
  { id: 'coupon', label: 'Add coupon', description: 'Create a conversion lever', icon: 'tag', destination: 'coupons' },
  { id: 'export', label: 'Export report', description: 'Send a decision-ready view', icon: 'download', destination: 'exports' },
];

const periodData = {
  '7d': {
    label: 'Aug 05 — Aug 12, 2026', shortLabel: 'Last 7 days', refresh: 'Updated 4 min ago',
    metrics: [
      { id: 'clicks', label: 'Clicks', value: '48,620', change: '+12.8%', tone: 'success', icon: 'cursor' },
      { id: 'orders', label: 'Orders', value: '1,284', change: '+8.4%', tone: 'success', icon: 'receipt' },
      { id: 'sales', label: 'Gross sales', value: '$186,420.80', change: '+15.2%', tone: 'success', icon: 'trend' },
      { id: 'net-sales', label: 'Net sales', value: '$172,840.30', change: '+11.6%', tone: 'success', icon: 'trend' },
      { id: 'commission', label: 'Commission', value: '$24,860.40', change: '+9.6%', tone: 'success', icon: 'coins' },
      { id: 'conversion', label: 'Conversion', value: '2.6%', change: '+0.3%', tone: 'success', icon: 'pulse' },
      { id: 'payout', label: 'Total payout', value: '$31,280.40', change: '+7.9%', tone: 'action', icon: 'wallet' },
      { id: 'balance', label: 'Balance cover', value: '6 days', change: 'Attention', tone: 'action', icon: 'shield' },
    ],
    trajectories: {
      sales: { label: 'Gross sales', value: '$186,420.80', change: '+15.2%', series: [22, 31, 28, 46, 39, 58, 64, 76, 69, 86, 81, 100], comparison: [19, 25, 32, 31, 40, 45, 47, 53, 50, 61, 66, 72], reasons: ['Northstar Media contribution rose 18.4%.', 'Summer Sale pre-launch links increased qualified clicks.', 'Three products failed to sync and need review.'] },
      orders: { label: 'Orders', value: '1,284', change: '+8.4%', series: [20, 24, 36, 31, 45, 56, 51, 66, 69, 79, 85, 92], comparison: [18, 22, 24, 30, 37, 42, 47, 50, 59, 61, 69, 76], reasons: ['Dealroom order volume grew after its coupon placement.', 'Two partner channels improved conversion.', '28 approved-ready orders still need transaction review.'] },
      commission: { label: 'Commission', value: '$24,860.40', change: '+9.6%', series: [18, 25, 29, 35, 32, 44, 49, 55, 61, 74, 78, 88], comparison: [17, 20, 23, 25, 31, 36, 40, 44, 50, 59, 64, 71], reasons: ['Commission is tracking below sales while 28 transactions remain pending.', 'The current CPS rule is performing within target.', 'One scheduled rule overlaps on Aug 17.'] },
      clicks: { label: 'Clicks', value: '48,620', change: '+12.8%', series: [21, 34, 28, 45, 49, 55, 52, 68, 76, 72, 84, 95], comparison: [16, 25, 27, 31, 36, 41, 47, 52, 58, 65, 71, 79], reasons: ['Editorial placements increased discovery traffic.', 'Summer Sale preview links are generating more visits.', 'Feed errors reduced product coverage for three records.'] },
    },
  },
  '30d': {
    label: 'Jul 14 — Aug 12, 2026', shortLabel: 'Last 30 days', refresh: 'Updated 4 min ago',
    metrics: [
      { id: 'clicks', label: 'Clicks', value: '182,940', change: '+16.4%', tone: 'success', icon: 'cursor' },
      { id: 'orders', label: 'Orders', value: '4,982', change: '+13.1%', tone: 'success', icon: 'receipt' },
      { id: 'sales', label: 'Gross sales', value: '$724,680.10', change: '+18.2%', tone: 'success', icon: 'trend' },
      { id: 'net-sales', label: 'Net sales', value: '$681,240.70', change: '+14.4%', tone: 'success', icon: 'trend' },
      { id: 'commission', label: 'Commission', value: '$96,420.80', change: '+12.8%', tone: 'success', icon: 'coins' },
      { id: 'conversion', label: 'Conversion', value: '2.7%', change: '+0.4%', tone: 'success', icon: 'pulse' },
      { id: 'payout', label: 'Total payout', value: '$121,840.50', change: '+10.6%', tone: 'action', icon: 'wallet' },
      { id: 'balance', label: 'Balance cover', value: '9 days', change: 'Watch', tone: 'action', icon: 'shield' },
    ],
    trajectories: {
      sales: { label: 'Gross sales', value: '$724,680.10', change: '+18.2%', series: [18, 25, 28, 36, 34, 41, 53, 48, 61, 67, 72, 86], comparison: [15, 19, 22, 26, 29, 34, 37, 44, 48, 55, 61, 69], reasons: ['Partner-attributed revenue is compounding across three top channels.', 'Campaign pipeline is adding demand ahead of launch.', 'Feed quality remains the main operational drag.'] },
      orders: { label: 'Orders', value: '4,982', change: '+13.1%', series: [15, 24, 29, 31, 40, 43, 52, 58, 55, 70, 78, 86], comparison: [14, 18, 21, 25, 31, 34, 40, 45, 50, 56, 64, 70], reasons: ['Order quality improved in active publisher channels.', 'The Dealroom is consistently above weekly target.', 'Application review is limiting new pipeline capacity.'] },
      commission: { label: 'Commission', value: '$96,420.80', change: '+12.8%', series: [17, 22, 27, 34, 38, 42, 49, 54, 60, 68, 75, 81], comparison: [16, 18, 22, 26, 30, 35, 39, 43, 48, 55, 62, 68], reasons: ['Approved commission is following revenue growth.', 'Pending transactions are still delaying payout readiness.', 'Upcoming rule overlap should be resolved before it activates.'] },
      clicks: { label: 'Clicks', value: '182,940', change: '+16.4%', series: [20, 25, 31, 35, 44, 49, 55, 60, 66, 72, 77, 91], comparison: [17, 20, 24, 29, 34, 39, 44, 49, 55, 61, 66, 74], reasons: ['Partner content is expanding discovery reach.', 'Publisher campaigns are sustaining quality traffic.', 'Three missing products are reducing product-level coverage.'] },
    },
  },
  '90d': {
    label: 'May 15 — Aug 12, 2026', shortLabel: 'Last 90 days', refresh: 'Updated 4 min ago',
    metrics: [
      { id: 'clicks', label: 'Clicks', value: '526,840', change: '+21.2%', tone: 'success', icon: 'cursor' },
      { id: 'orders', label: 'Orders', value: '14,620', change: '+17.6%', tone: 'success', icon: 'receipt' },
      { id: 'sales', label: 'Gross sales', value: '$2.18M', change: '+24.9%', tone: 'success', icon: 'trend' },
      { id: 'net-sales', label: 'Net sales', value: '$2.05M', change: '+20.3%', tone: 'success', icon: 'trend' },
      { id: 'commission', label: 'Commission', value: '$286.4K', change: '+19.8%', tone: 'success', icon: 'coins' },
      { id: 'conversion', label: 'Conversion', value: '2.8%', change: '+0.5%', tone: 'success', icon: 'pulse' },
      { id: 'payout', label: 'Total payout', value: '$362.8K', change: '+18.1%', tone: 'action', icon: 'wallet' },
      { id: 'balance', label: 'Balance cover', value: '12 days', change: 'Healthy', tone: 'success', icon: 'shield' },
    ],
    trajectories: {
      sales: { label: 'Gross sales', value: '$2.18M', change: '+24.9%', series: [14, 22, 26, 35, 41, 47, 56, 60, 69, 79, 86, 98], comparison: [12, 16, 19, 25, 30, 34, 39, 47, 52, 61, 68, 75], reasons: ['The partner portfolio is sustaining quarter-long momentum.', 'Top five partners account for a growing share of quality revenue.', 'Operational fixes now have a material compounding effect.'] },
      orders: { label: 'Orders', value: '14,620', change: '+17.6%', series: [17, 21, 29, 34, 37, 46, 53, 62, 66, 73, 82, 91], comparison: [15, 18, 22, 27, 32, 36, 43, 48, 54, 60, 69, 76], reasons: ['Order volume remains consistent across primary publishers.', 'Repeat campaign mechanics are improving operational efficiency.', 'Pending approval is the remaining short-term release point.'] },
      commission: { label: 'Commission', value: '$286.4K', change: '+19.8%', series: [16, 23, 28, 33, 41, 48, 52, 58, 67, 74, 84, 93], comparison: [14, 18, 23, 27, 33, 39, 44, 49, 56, 63, 71, 79], reasons: ['Commission growth is keeping pace with the portfolio.', 'The future rule overlap should be resolved while the team has room.', 'Payout health is stable over the wider period.'] },
      clicks: { label: 'Clicks', value: '526,840', change: '+21.2%', series: [16, 27, 30, 38, 46, 52, 58, 64, 73, 81, 86, 96], comparison: [13, 19, 24, 29, 35, 41, 46, 53, 59, 66, 73, 81], reasons: ['Content and deal channels are adding discovery together.', 'Campaign cadence is creating a predictable traffic floor.', 'Product data completeness remains important before the next launch.'] },
    },
  },
};

const moduleView = ({ eyebrow, title, description, action, stats, rows, side, filters = ['All records', 'This week', 'Needs attention'] }) => ({
  eyebrow,
  title,
  description,
  action,
  stats,
  rows,
  side,
  filters,
});

const signalStats = (...items) => items.map(([label, value, note, tone = 'signal']) => ({ label, value, note, tone }));
const signalRows = (...items) => items.map(([title, meta, value, badge, tone = 'signal', progress = 0]) => ({ title, meta, value, badge, tone, progress }));

const moduleViews = {
  partners: moduleView({
    eyebrow: 'Partner operations', title: 'Partner portfolio', description: 'A working view of relationship health, revenue concentration and next outreach.', action: 'Invite partner',
    stats: signalStats(['48', 'Active partners', '+6 this quarter'], ['12', 'Applications', '4 high-fit'], ['$24.9K', 'Attributed revenue', '+18.4%']),
    rows: signalRows(['Northstar Media', 'Content publisher · US', '$6,845.20', 'Growing', 'success', 92], ['The Dealroom', 'Deals publisher · US', '$5,126.80', 'Active', 'signal', 75], ['Daily Living', 'Lifestyle creator · CA', '$2,906.40', 'Needs assets', 'action', 42]),
    side: { title: 'Portfolio signal', value: '86%', detail: 'of revenue is covered by active relationships', tone: 'success', items: ['4 partners need a fresh creative set', '2 high-fit applicants are waiting', 'Top 5 partners account for 61% of sales'] },
  }),
  discover: moduleView({
    eyebrow: 'Partner operations / Discovery', title: 'Discover partners', description: 'Shortlist publishers and creators that fit the current category and launch window.', action: 'Save shortlist',
    stats: signalStats(['32', 'Recommended', 'This matching run'], ['8', 'High intent', 'Viewed offer page'], ['4.1x', 'Potential ROAS', 'Portfolio estimate']),
    rows: signalRows(['Retail Edit', 'Editorial · Home & lifestyle', '92 fit score', 'High fit', 'success', 92], ['Pixel Review', 'Review site · Consumer tech', '88 fit score', 'Ready to contact', 'signal', 88], ['Weekend Finds', 'Creator collective · Deals', '81 fit score', 'New audience', 'campaign', 81]),
    side: { title: 'Discovery brief', value: '3', detail: 'new audiences match the Summer Sale audience', tone: 'campaign', items: ['Prioritize editorial partners this week', 'Offer a creator-only 12% code', 'Reuse the product launch creative kit'] },
  }),
  applications: moduleView({
    eyebrow: 'Partner operations / Review', title: 'Partner applications', description: 'Review the applications that can add qualified reach to the program.', action: 'Review queue',
    stats: signalStats(['12', 'Waiting review', '4 high priority', 'action'], ['7', 'Publisher applications', '2 referred'], ['5', 'Creator applications', '3 verified']),
    rows: signalRows(['Mosaic Savings', 'Publisher · 48k monthly visits', '94 fit', 'Needs review', 'action', 94], ['Luna Carr', 'Creator · 82k followers', '89 fit', 'Verified', 'success', 89], ['Dealproof', 'Publisher · Coupon & cashback', '76 fit', 'Policy check', 'risk', 76]),
    side: { title: 'Review capacity', value: '2 days', detail: 'until the oldest application reaches SLA', tone: 'action', items: ['Approve Mosaic Savings after terms check', 'Request channel details from Dealproof', 'Assign 4 creator applications to M. Chen'] },
  }),
  'my-partners': moduleView({
    eyebrow: 'Partner operations / Performance', title: 'My partners', description: 'A focused relationship ledger with business outcome and account health.', action: 'Export list',
    stats: signalStats(['48', 'Managed partners', '46 active'], ['61%', 'Top 5 contribution', 'Revenue concentration'], ['2.7%', 'Portfolio CVR', '+0.4 pts']),
    rows: signalRows(['Northstar Media', 'Account owner: F. Lin · Editorial', '$6,845.20', '+18.4%', 'success', 100], ['Shopper Edit', 'Account owner: M. Chen · Creator', '$4,382.10', '+7.8%', 'success', 64], ['Tech Forward', 'Account owner: F. Lin · Reviews', '$3,614.60', '+4.6%', 'signal', 53]),
    side: { title: 'Relationship risk', value: '4', detail: 'partners have not activated in 14 days', tone: 'risk', items: ['Send a reactivation brief to Daily Living', 'Share Summer Sale preview with top partners', 'Review stagnant publisher traffic'] },
  }),
  invites: moduleView({
    eyebrow: 'Partner operations / Outreach', title: 'Invitation center', description: 'Keep outbound partnership work visible from draft to accepted invitation.', action: 'Create invite',
    stats: signalStats(['18', 'Open invitations', '7 sent this week'], ['44%', 'Acceptance rate', '+8 pts'], ['3', 'Drafts', 'Need review']),
    rows: signalRows(['Retail Edit', 'Summer Sale · Sent Aug 11', 'Awaiting reply', 'Open', 'signal', 58], ['Weekend Finds', 'Creator launch · Draft', 'Personalize brief', 'Draft', 'campaign', 32], ['Mosaic Savings', 'Always-on program · Sent Aug 08', 'Viewed 2 hours ago', 'Warm', 'success', 80]),
    side: { title: 'Outreach cue', value: '4', detail: 'partners opened an invite in the last 24 hours', tone: 'success', items: ['Follow up with Retail Edit tomorrow', 'Add a coupon to Weekend Finds draft', 'Send the updated terms to Mosaic Savings'] },
  }),

  campaigns: moduleView({
    eyebrow: 'Campaign control', title: 'Campaign command', description: 'Track launch readiness and remove the dependencies holding campaigns back.', action: 'Create campaign',
    stats: signalStats(['3', 'Live campaigns', '1 scheduled'], ['82%', 'Summer Sale ready', 'Starts in 5 days', 'campaign'], ['18', 'Partners activated', '+5 today']),
    rows: signalRows(['Summer Sale', 'Scheduled · Starts Aug 17', '82% ready', '1 approval', 'action', 82], ['Northstar Partner Program', 'Always-on · 48 partners', '100% ready', 'Live', 'success', 100], ['Creator Launch', 'Draft · Owner: M. Chen', '46% ready', 'Dependencies', 'risk', 46]),
    side: { title: 'Launch gate', value: '1', detail: 'creative approval blocks Summer Sale release', tone: 'action', items: ['Approve final display creative', 'Confirm creator-only coupon', 'Notify 18 activated partners'] },
  }),
  'all-campaigns': moduleView({
    eyebrow: 'Campaign control / Portfolio', title: 'All campaigns', description: 'Compare the campaigns sharing budget, partners and launch capacity.', action: 'New campaign',
    stats: signalStats(['6', 'Campaigns this quarter', '3 active'], ['$186.4K', 'Gross sales', '+15.2%'], ['2.6%', 'Campaign CVR', 'Above plan']),
    rows: signalRows(['Summer Sale', 'Seasonal · Aug 17–31', '$0 forecast', 'Scheduled', 'campaign', 82], ['Northstar Partner Program', 'Affiliate · Always on', '$126,840', 'Live', 'success', 100], ['Back to School', 'Seasonal · Sep 03–12', '$48,600 forecast', 'Planning', 'signal', 38]),
    side: { title: 'Calendar pressure', value: '2', detail: 'campaigns need a confirmed offer before next week', tone: 'campaign', items: ['Lock Back to School commission rule', 'Publish the Summer Sale partner brief', 'Set a launch owner for Creator Launch'] },
  }),
  'affiliate-programs': moduleView({
    eyebrow: 'Campaign control / Affiliate', title: 'Affiliate programs', description: 'See the always-on programs that keep publisher revenue moving between launches.', action: 'Create program',
    stats: signalStats(['2', 'Active programs', '48 partners'], ['1,024', 'Tracked orders', '+11.8%'], ['$18.9K', 'Approved commission', 'Ready to pay']),
    rows: signalRows(['Northstar Partner Program', 'CPS · US storefront', '48 partners', 'Healthy', 'success', 100], ['Creator Essentials', 'CPS · Creator cohort', '16 partners', 'Growing', 'signal', 67], ['Holiday Publishers', 'CPS · Pending setup', '0 partners', 'Draft', 'campaign', 25]),
    side: { title: 'Program signal', value: '16', detail: 'partners are eligible for the creator cohort', tone: 'signal', items: ['Add 4 qualified applicants', 'Attach the new product feed', 'Review holiday terms before Aug 20'] },
  }),
  'influencer-campaigns': moduleView({
    eyebrow: 'Campaign control / Creators', title: 'Influencer campaigns', description: 'Balance creator content, offer timing and fulfillment checkpoints in one view.', action: 'Create creator brief',
    stats: signalStats(['14', 'Creators invited', '8 confirmed'], ['7', 'Assets approved', '2 pending'], ['2.9M', 'Estimated reach', 'Summer Sale']),
    rows: signalRows(['Summer Stories', 'Lifestyle creators · Aug 17', '8 / 10 confirmed', 'On track', 'success', 80], ['Creator Launch', 'Tech reviewers · Aug 22', '3 / 8 confirmed', 'Needs briefs', 'action', 38], ['Weekend Drop', 'Deals creators · Draft', '0 / 6 confirmed', 'Draft', 'campaign', 12]),
    side: { title: 'Creator blocker', value: '2', detail: 'briefs are waiting on approved creative', tone: 'action', items: ['Approve vertical story asset', 'Assign product samples', 'Send final tracking links'] },
  }),

  assets: moduleView({
    eyebrow: 'Product & assets', title: 'Product & asset health', description: 'Keep products, offers and creative material ready for partner distribution.', action: 'Add product',
    stats: signalStats(['1,284', 'Promotable products', '98.1% coverage'], ['3', 'Feed errors', 'Need review', 'risk'], ['24', 'Live assets', '6 added this month']),
    rows: signalRows(['Summer Essentials feed', '1,284 products · Synced 12 min ago', '98.1%', 'Healthy', 'success', 98], ['Creator kit / August', '8 images · 3 copy blocks', '1 pending', 'Review', 'action', 74], ['Coupon library', '6 active offers', '2 expiring', 'Watch', 'risk', 58]),
    side: { title: 'Distribution gap', value: '3', detail: 'failed products are missing from partner links', tone: 'risk', items: ['Repair failed product records', 'Approve one display creative', 'Renew two expiring coupons'] },
  }),
  'product-feed': moduleView({
    eyebrow: 'Product & assets / Catalog', title: 'Product feed', description: 'A data-quality view of the records partners can discover and promote.', action: 'Sync feed',
    stats: signalStats(['1,284', 'Products synced', 'Last sync 12 min ago'], ['3', 'Failed records', 'Action required', 'risk'], ['96', 'New this week', 'Ready for links']),
    rows: signalRows(['Northstar Travel Bottle', 'SKU NS-441 · Missing image URL', 'Failed', 'Needs fix', 'risk', 24], ['Thermal Day Pack', 'SKU NS-209 · Price updated', 'Synced', 'Healthy', 'success', 100], ['Lumen Desk Lamp', 'SKU NS-892 · Category updated', 'Synced', 'Review mapping', 'action', 68]),
    side: { title: 'Feed reliability', value: '98.1%', detail: 'of records are ready for partner discovery', tone: 'success', items: ['Fix missing image URLs', 'Check the category mapping', 'Run a fresh validation after sync'] },
  }),
  coupons: moduleView({
    eyebrow: 'Product & assets / Offers', title: 'Coupon library', description: 'Manage the conversion levers partners can use without losing offer control.', action: 'Create coupon',
    stats: signalStats(['6', 'Active coupons', '2 expire this month'], ['18.6%', 'Best conversion lift', 'Partner code'], ['2', 'Approval drafts', 'Ready to publish']),
    rows: signalRows(['SUMMER12', '12% off · Summer Sale', 'Aug 31', 'Active', 'success', 100], ['DEALROOM15', '15% off · Private publisher code', 'Aug 20', 'Expiring', 'action', 68], ['CREATOR10', '10% off · Creator cohort', 'Unscheduled', 'Draft', 'campaign', 35]),
    side: { title: 'Offer timing', value: '2', detail: 'codes expire before the next payout cycle', tone: 'action', items: ['Renew DEALROOM15', 'Schedule CREATOR10 for launch', 'Check coupon stacking policy'] },
  }),
  creatives: moduleView({
    eyebrow: 'Product & assets / Library', title: 'Creative library', description: 'Make approved, channel-ready assets easy for partners to find and use.', action: 'Upload asset',
    stats: signalStats(['24', 'Approved assets', '8 in current kit'], ['3', 'Waiting approval', 'Content review'], ['72%', 'Partner adoption', '+9 pts']),
    rows: signalRows(['Summer hero / 1600×900', 'Display · Updated yesterday', '18 downloads', 'Approved', 'success', 100], ['Creator story / 1080×1920', 'Social · Owner: N. Park', 'Review pending', 'Needs approval', 'action', 68], ['Product grid / 1200×1200', 'Commerce · 4 variants', '6 downloads', 'Live', 'signal', 82]),
    side: { title: 'Creative action', value: '1', detail: 'asset needs approval before Summer Sale goes live', tone: 'action', items: ['Review Creator story', 'Package the updated product grid', 'Share hero asset with top partners'] },
  }),

  rules: moduleView({
    eyebrow: 'Commission logic', title: 'Commission logic', description: 'A readable system view of payout rules, attribution and policy exceptions.', action: 'Create rule',
    stats: signalStats(['8', 'Active rules', '1 overlaps soon'], ['$24.9K', 'Commission accrued', 'This week'], ['30 days', 'Attribution window', 'Last click']),
    rows: signalRows(['US affiliate CPS', '8% base commission · US store', 'Live', 'Healthy', 'success', 100], ['Summer Sale booster', '+2% commission · Aug 17–31', 'Scheduled', 'Review overlap', 'action', 74], ['Creator launch CPS', '10% commission · Draft', 'Draft', 'Needs terms', 'campaign', 42]),
    side: { title: 'Rule conflict', value: '1', detail: 'scheduled rule overlaps the base CPS policy', tone: 'campaign', items: ['Set rule priority', 'Confirm eligible partner group', 'Preview payout impact'] },
  }),
  'commission-rules': moduleView({
    eyebrow: 'Commission logic / Rules', title: 'Commission rules', description: 'See what each partner can earn and where policy overlaps need attention.', action: 'New commission rule',
    stats: signalStats(['8', 'Rules active', '2 scheduled'], ['1', 'Overlap detected', 'Aug 17', 'risk'], ['86%', 'Payouts covered', 'By valid terms']),
    rows: signalRows(['US affiliate CPS', 'All publishers · 8%', 'Priority 1', 'Active', 'success', 100], ['Summer Sale booster', 'Selected partners · +2%', 'Priority unset', 'Conflict', 'risk', 52], ['Creator launch CPS', 'Creator cohort · 10%', 'Starts Aug 22', 'Scheduled', 'campaign', 76]),
    side: { title: 'Recommended fix', value: 'P1', detail: 'assign Summer Sale booster above the base CPS rule', tone: 'risk', items: ['Set priority before Aug 17', 'Validate eligible publishers', 'Preview sample commissions'] },
  }),
  attribution: moduleView({
    eyebrow: 'Commission logic / Attribution', title: 'Attribution rules', description: 'Keep credit logic visible so partners understand how conversions are rewarded.', action: 'Edit policy',
    stats: signalStats(['30 days', 'Click window', 'Last click'], ['1 day', 'View-through window', 'Disabled'], ['98.6%', 'Tracked orders', 'Policy matched']),
    rows: signalRows(['Default web attribution', 'Last click · 30 day window', '98.6%', 'Active', 'success', 100], ['Creator social attribution', 'UTM + last click · 14 days', '12.4%', 'Active', 'signal', 75], ['Coupon override', 'Private codes · 7 days', '3 exceptions', 'Watch', 'action', 48]),
    side: { title: 'Policy cue', value: '3', detail: 'coupon overrides need a final owner check', tone: 'action', items: ['Confirm coupon-code priority', 'Share policy with new partners', 'Review creator tracking links'] },
  }),

  data: moduleView({
    eyebrow: 'Data & transactions', title: 'Data operations', description: 'Move from raw activity to reliable revenue, approvals and shareable reporting.', action: 'Export report',
    stats: signalStats(['4,982', 'Orders tracked', '+13.1%'], ['28', 'Needs review', 'Approval queue', 'risk'], ['99.2%', 'Data coverage', 'Last 24 hours']),
    rows: signalRows(['Transaction approval queue', '28 ready for review', '28', 'Action required', 'risk', 68], ['Performance report', 'Last 30 days · US store', '$724.7K', 'Ready', 'success', 100], ['Partner export', 'Scheduled each Monday', '09:00', 'Automated', 'signal', 90]),
    side: { title: 'Data trust', value: '99.2%', detail: 'of expected activity arrived in the last 24 hours', tone: 'success', items: ['Clear the approval queue', 'Verify 3 late transactions', 'Download the partner performance report'] },
  }),
  performance: moduleView({
    eyebrow: 'Data & transactions / Reporting', title: 'Performance', description: 'A decision-ready cut of revenue, traffic and conversion by active channel.', action: 'Download report',
    stats: signalStats(['$724.7K', 'Gross sales', '+18.2%'], ['182.9K', 'Clicks', '+16.4%'], ['2.7%', 'Conversion', '+0.4 pts']),
    rows: signalRows(['Northstar Media', 'Content publisher', '$126,840', '+18.4%', 'success', 100], ['The Dealroom', 'Deals publisher', '$86,210', '+12.1%', 'success', 72], ['Creator cohort', 'Influencer campaign', '$42,620', '+7.4%', 'signal', 48]),
    side: { title: 'Performance cue', value: '+18.2%', detail: 'revenue growth is outpacing the traffic baseline', tone: 'success', items: ['Scale top editorial placement', 'Add a dealroom private coupon', 'Compare campaign conversion next week'] },
  }),
  transactions: moduleView({
    eyebrow: 'Data & transactions / Approval', title: 'Transactions', description: 'Review the revenue events that need a decision before commissions can be paid.', action: 'Approve selected',
    stats: signalStats(['28', 'Needs review', 'Above weekly target', 'risk'], ['$8,420', 'Commission pending', 'Release after approval'], ['4,954', 'Approved orders', 'This period']),
    rows: signalRows(['TX-48531', 'Northstar Media · Order #88421', '$428.00', 'Needs review', 'risk', 68], ['TX-48530', 'The Dealroom · Order #88418', '$182.50', 'Needs review', 'risk', 58], ['TX-48529', 'Shopper Edit · Order #88415', '$249.00', 'Approved', 'success', 100]),
    side: { title: 'Approval runway', value: '28', detail: 'transactions are delaying commission release', tone: 'risk', items: ['Review high-value transactions first', 'Resolve 3 tracking mismatches', 'Approve valid orders before payout lock'] },
  }),
  exports: moduleView({
    eyebrow: 'Data & transactions / Delivery', title: 'Exports', description: 'Prepare reusable data cuts for finance, partners and weekly operating reviews.', action: 'New export',
    stats: signalStats(['7', 'Saved exports', '3 scheduled'], ['3', 'Delivered today', 'All successful'], ['1', 'Needs attention', 'Schema changed', 'action']),
    rows: signalRows(['Weekly partner performance', 'CSV · Every Monday 09:00', 'Delivered', 'Scheduled', 'success', 100], ['Finance payout ledger', 'XLSX · On approval', 'Aug 12', 'Ready', 'signal', 88], ['Creator campaign summary', 'CSV · Summer Sale', 'Schema check', 'Review', 'action', 54]),
    side: { title: 'Delivery health', value: '6 / 7', detail: 'exports completed without intervention this week', tone: 'success', items: ['Review creator schema mapping', 'Download payout ledger', 'Share weekly partner report'] },
  }),

  finance: moduleView({
    eyebrow: 'Finance', title: 'Finance command', description: 'Keep cash coverage, commission liability and approval timing aligned.', action: 'Add funds',
    stats: signalStats(['6 days', 'Balance cover', 'Attention', 'action'], ['$31.3K', 'Next payout', 'Approved estimate'], ['$8.4K', 'Pending commission', '28 transactions']),
    rows: signalRows(['Operating balance', 'Available for next payout', '$42,820', 'Watch', 'action', 48], ['Aug 16 payout run', 'Approved commissions', '$31,280', 'Scheduled', 'signal', 72], ['Pending approvals', '28 transactions · Est. commission', '$8,420', 'Blocked', 'risk', 36]),
    side: { title: 'Cash priority', value: '6 days', detail: 'until projected balance cover runs short', tone: 'action', items: ['Top up before Aug 16', 'Release valid pending transactions', 'Review payout forecast'] },
  }),
  balance: moduleView({
    eyebrow: 'Finance / Liquidity', title: 'Balance & payments', description: 'A direct view of available funds, upcoming payouts and payout continuity.', action: 'Add funds',
    stats: signalStats(['$42,820', 'Available balance', 'USD wallet'], ['$31,280', 'Next payout', 'Aug 16'], ['6 days', 'Coverage', 'Below target', 'action']),
    rows: signalRows(['Available balance', 'USD operating wallet', '$42,820', 'Watch', 'action', 48], ['Approved payout run', 'Aug 16 · 124 partners', '$31,280', 'Scheduled', 'signal', 72], ['Funding recommendation', 'Maintain 14-day cover', '$28,600', 'Top up', 'risk', 32]),
    side: { title: 'Payout runway', value: '6 days', detail: 'current funds cover the approved payout schedule', tone: 'action', items: ['Add $28.6K to reach target cover', 'Confirm Aug 16 payout run', 'Release approved commission holds'] },
  }),
  invoices: moduleView({
    eyebrow: 'Finance / Records', title: 'Invoices', description: 'Keep billing records, payout receipts and renewal dates easy to reconcile.', action: 'Download statement',
    stats: signalStats(['12', 'Invoices this year', '10 paid'], ['2', 'Awaiting payment', '$8.6K'], ['Aug 20', 'Next renewal', 'Platform plan']),
    rows: signalRows(['INV-2026-0812', 'Platform subscription · August', '$2,400', 'Paid', 'success', 100], ['INV-2026-0808', 'Creator sample fulfillment', '$6,280', 'Awaiting payment', 'action', 64], ['INV-2026-0801', 'Data enrichment add-on', '$1,140', 'Approved', 'signal', 82]),
    side: { title: 'Reconciliation', value: '2', detail: 'records need a payment confirmation', tone: 'action', items: ['Confirm sample fulfillment invoice', 'Download August statement', 'Set renewal owner'] },
  }),

  communications: moduleView({
    eyebrow: 'Communications', title: 'Communication center', description: 'Make outbound coordination and inbound partner signals part of the operating rhythm.', action: 'Compose message',
    stats: signalStats(['4', 'Unread messages', '2 need reply'], ['18', 'Messages sent', 'This week'], ['62%', 'Template open rate', '+7 pts']),
    rows: signalRows(['Northstar Media', 'Re: Summer Sale editorial date', '2h ago', 'Needs reply', 'action', 72], ['Mosaic Savings', 'Application follow-up', '5h ago', 'Unread', 'risk', 56], ['Campaign updates', 'Summer Sale partner brief', 'Yesterday', 'Sent', 'success', 100]),
    side: { title: 'Response cue', value: '2', detail: 'partner messages are due for a reply today', tone: 'action', items: ['Reply to Northstar Media', 'Approve Mosaic Savings response', 'Share Summer Sale brief'] },
  }),
  inbox: moduleView({
    eyebrow: 'Communications / Inbox', title: 'Partner inbox', description: 'A working queue for the conversations that can unblock revenue and launch readiness.', action: 'Compose',
    stats: signalStats(['4', 'Unread', '2 high priority'], ['2h', 'Median response time', 'Within target'], ['18', 'Messages sent', 'This week']),
    rows: signalRows(['Northstar Media', 'Can we confirm the Summer Sale editorial date?', '2h ago', 'Needs reply', 'action', 72], ['Mosaic Savings', 'Application: tracking policy question', '5h ago', 'Unread', 'risk', 56], ['Daily Living', 'New creative request', 'Yesterday', 'Open', 'signal', 48]),
    side: { title: 'Conversation priority', value: '2', detail: 'messages can affect a live campaign this week', tone: 'action', items: ['Confirm editorial date', 'Answer tracking policy question', 'Send approved creative kit'] },
  }),
  notifications: moduleView({
    eyebrow: 'Communications / Alerts', title: 'Notifications', description: 'Tune the alerts that keep operators aware without turning the workspace into noise.', action: 'Notification settings',
    stats: signalStats(['16', 'Delivered today', 'All channels'], ['3', 'Escalated alerts', 'Need owner'], ['98%', 'Delivery rate', 'Last 7 days']),
    rows: signalRows(['Balance coverage alert', 'Finance · Escalated to Brand Admin', '6 days', 'Active', 'action', 78], ['Feed sync failed', 'Product data · Email + in-app', '3 records', 'Active', 'risk', 64], ['Campaign approval', 'Summer Sale · In-app only', '1 pending', 'Active', 'campaign', 42]),
    side: { title: 'Alert hygiene', value: '3', detail: 'rules are escalated beyond the workspace', tone: 'signal', items: ['Keep balance alert escalated', 'Add feed owner backup', 'Review campaign approval reminder'] },
  }),
  templates: moduleView({
    eyebrow: 'Communications / Content', title: 'Email templates', description: 'Reusable messages for partner invitations, launch briefs and operational follow-up.', action: 'New template',
    stats: signalStats(['9', 'Published templates', '3 updated this month'], ['62%', 'Average open rate', '+7 pts'], ['3', 'Draft templates', 'Need review']),
    rows: signalRows(['Summer Sale partner brief', 'Campaign · Updated today', '68% open', 'Published', 'success', 100], ['Application welcome', 'Partner operations · Updated Aug 08', '61% open', 'Published', 'signal', 82], ['Creator sample request', 'Influencer campaigns · Draft', '—', 'Draft', 'campaign', 34]),
    side: { title: 'Content opportunity', value: '1', detail: 'draft can unblock creator sampling this week', tone: 'campaign', items: ['Finish sample request template', 'Refresh application welcome copy', 'Share Summer Sale brief'] },
  }),

  systems: moduleView({
    eyebrow: 'Systems & access', title: 'System health', description: 'Keep data connections, operator access and developer surfaces visible and trustworthy.', action: 'Open settings',
    stats: signalStats(['6', 'Connected systems', '5 healthy'], ['1', 'Attention needed', 'Feed connector', 'risk'], ['12', 'Workspace members', '3 admins']),
    rows: signalRows(['Commerce platform', 'Orders and product feed', 'Healthy', 'Connected', 'success', 100], ['Product feed connector', 'Catalog sync · Last run 12 min ago', '3 errors', 'Attention', 'risk', 68], ['Partner tracking', 'Clicks and conversion events', 'Healthy', 'Connected', 'success', 100]),
    side: { title: 'System action', value: '1', detail: 'connector needs review before the next campaign', tone: 'risk', items: ['Repair feed connector', 'Review admin access', 'Rotate development token'] },
  }),
  integrations: moduleView({
    eyebrow: 'Systems & access / Connections', title: 'Integrations', description: 'Monitor the services responsible for product, order and partner data continuity.', action: 'Add integration',
    stats: signalStats(['6', 'Connections', '5 healthy'], ['12 min', 'Last catalog sync', '3 errors', 'risk'], ['99.2%', 'Event delivery', 'Last 24 hours']),
    rows: signalRows(['Commerce platform', 'Order and product sync', 'Connected', 'Healthy', 'success', 100], ['Catalog connector', 'Product validation', '3 failed', 'Needs fix', 'risk', 54], ['Analytics stream', 'Click and conversion events', 'Connected', 'Healthy', 'success', 100]),
    side: { title: 'Integration reliability', value: '5 / 6', detail: 'connections are currently operating as expected', tone: 'success', items: ['Open catalog error log', 'Run a manual validation', 'Review last event delivery'] },
  }),
  team: moduleView({
    eyebrow: 'Systems & access / Team', title: 'Team & permissions', description: 'Make ownership visible and keep the right people close to operational decisions.', action: 'Invite teammate',
    stats: signalStats(['12', 'Team members', '3 admins'], ['4', 'Active today', 'Operating workspace'], ['2', 'Pending invites', 'Expire in 5 days']),
    rows: signalRows(['Fiona Lin', 'Brand Admin · Partner operations', 'Active now', 'Admin', 'success', 100], ['M. Chen', 'Campaign manager · Creator campaigns', 'Today', 'Editor', 'signal', 76], ['N. Park', 'Creative reviewer · Asset library', 'Yesterday', 'Reviewer', 'campaign', 52]),
    side: { title: 'Access review', value: '2', detail: 'invitations will expire in five days', tone: 'action', items: ['Follow up with two invited teammates', 'Review editor permissions', 'Assign a feed backup owner'] },
  }),
  api: moduleView({
    eyebrow: 'Systems & access / Developer', title: 'API & developer', description: 'A lightweight control surface for integrations, tokens and data-delivery health.', action: 'Create token',
    stats: signalStats(['3', 'Active tokens', '1 expires soon'], ['99.2%', 'API success rate', 'Last 24 hours'], ['42k', 'Requests today', 'Within plan']),
    rows: signalRows(['Reporting export token', 'Read-only · Expires Sep 01', '18k requests', 'Active', 'success', 100], ['Catalog sync token', 'Write access · Expires Aug 18', '12k requests', 'Rotate soon', 'action', 62], ['Sandbox token', 'Development · No expiry', '12k requests', 'Active', 'signal', 78]),
    side: { title: 'Developer action', value: '1', detail: 'token should be rotated before it expires', tone: 'action', items: ['Rotate catalog sync token', 'Review write permissions', 'Download API activity log'] },
  }),
};

export const controlRoomData = {
  workspace: { organization: 'YeahPromos', brand: 'Northstar Labs', store: 'US Store', role: 'Brand Admin', currency: 'USD', timezone: 'America/Los_Angeles' },
  periods: Object.entries(periodData).map(([id, data]) => ({ id, label: data.shortLabel, dateLabel: data.label })),
  periodData,
  navigation,
  partners,
  decisions,
  campaigns,
  risks,
  quickCommands,
  moduleViews,
};
