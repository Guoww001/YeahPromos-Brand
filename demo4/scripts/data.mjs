const navigation = [
  { id: 'overview', label: 'Overview', icon: 'home' },
  { id: 'partners', label: 'Recruit & partners', icon: 'people', badge: '12', children: [
    { id: 'discover', label: 'Discover partners' },
    { id: 'influencer-discovery', label: 'Influencer discovery' },
    { id: 'publisher-discovery', label: 'Publisher discovery' },
    { id: 'invitations', label: 'Invitation center' },
    { id: 'applications', label: 'Applications', badge: '12' },
    { id: 'my-partners', label: 'My partners' },
    { id: 'partner-groups', label: 'Partner groups' },
  ] },
  { id: 'campaigns', label: 'Campaigns', icon: 'campaign', badge: '1', children: [
    { id: 'all-campaigns', label: 'All campaigns' },
    { id: 'affiliate-programs', label: 'Affiliate programs' },
    { id: 'influencer-campaigns', label: 'Influencer campaigns' },
  ] },
  { id: 'assets', label: 'Products & assets', icon: 'box', alert: true, children: [
    { id: 'product-feed', label: 'Product feed', alert: true },
    { id: 'coupons', label: 'Coupons' },
    { id: 'creatives', label: 'Creative library' },
    { id: 'text-assets', label: 'Copy & email assets' },
    { id: 'banner-assets', label: 'Banners & images' },
  ] },
  { id: 'rules', label: 'Commission & rules', icon: 'rule', children: [
    { id: 'commission-rules', label: 'Commission rules' },
    { id: 'attribution', label: 'Attribution' },
    { id: 'ppc-rules', label: 'PPC restrictions' },
    { id: 'link-parameters', label: 'Link parameters' },
  ] },
  { id: 'data', label: 'Data & transactions', icon: 'chart', badge: '28', children: [
    { id: 'performance', label: 'Performance' },
    { id: 'brand-analysis', label: 'Brand analysis' },
    { id: 'transactions', label: 'Transactions', badge: '28' },
    { id: 'transaction-inquiries', label: 'Transaction inquiries' },
    { id: 'amazon-brb', label: 'Amazon BRB' },
    { id: 'exports', label: 'Reports & exports' },
  ] },
  { id: 'finance', label: 'Finance', icon: 'wallet', badge: '!', children: [
    { id: 'balance', label: 'Balance & deposits', alert: true },
    { id: 'payments', label: 'Payments & billing' },
    { id: 'invoices', label: 'Invoices' },
  ] },
  { id: 'communications', label: 'Messages', icon: 'message', badge: '4', children: [
    { id: 'inbox', label: 'Inbox', badge: '4' },
    { id: 'notifications', label: 'Notifications' },
    { id: 'newsletters', label: 'Email campaigns' },
    { id: 'templates', label: 'Email templates' },
  ] },
  { id: 'systems', label: 'Integrations & settings', icon: 'settings', children: [
    { id: 'account', label: 'Organization details' },
    { id: 'brands', label: 'Brands & sites' },
    { id: 'integrations', label: 'Integrations' },
    { id: 'team', label: 'Team & permissions' },
    { id: 'subscriptions', label: 'Plan & payment methods' },
    { id: 'api', label: 'API & developer' },
    { id: 'security', label: 'Email & sign-in security' },
    { id: 'support', label: 'Help & support' },
  ] },
];

const m = (label, value, delta, tone = 'neutral') => ({ label, value, delta, tone });
const r = (id, title, meta, value, status, tone = 'neutral', progress = 50, detail = '') => ({ id, title, meta, value, status, tone, progress, detail: detail || `${title} is included as illustrative data for this display demo.` });

const groupBase = {
  partners: {
    eyebrow: 'RECRUIT & PARTNERS',
    type: 'dossier',
    metrics: [m('Active partners', '48', '+6 this quarter', 'positive'), m('Applications', '12', '4 high-fit', 'attention'), m('Attributed revenue', '$24.9K', '+18.4%', 'positive')],
    records: [
      r('northstar-media', 'Northstar Media', 'Content publisher · United States', '$6,845', 'Growing', 'positive', 92, 'Highest-converting editorial partner this week with 214 attributed orders.'),
      r('dealroom', 'The Dealroom', 'Deals publisher · United States', '$5,126', 'Active', 'neutral', 76, 'Reliable order volume with an opportunity for a private Summer Sale coupon.'),
      r('daily-living', 'Daily Living', 'Lifestyle creator · Canada', '$2,906', 'Needs assets', 'attention', 44, 'Promising early relationship waiting on a refreshed vertical creative kit.'),
    ],
  },
  campaigns: {
    eyebrow: 'CAMPAIGNS',
    type: 'canvas',
    metrics: [m('Live campaigns', '3', '1 scheduled'), m('Summer Sale ready', '82%', 'Starts in 5 days', 'attention'), m('Partners activated', '18', '+5 today', 'positive')],
    records: [
      r('summer-sale', 'Summer Sale', 'Seasonal campaign · Aug 17–31', '82%', 'One approval', 'attention', 82, 'One vertical creative approval remains before the campaign can publish.'),
      r('partner-program', 'Northstar Partner Program', 'Always-on affiliate program', '$126.8K', 'Live', 'positive', 100, 'All dependencies are ready and 48 active partners are participating.'),
      r('creator-launch', 'Creator Launch', 'Influencer campaign · Owner M. Chen', '46%', 'Dependencies', 'risk', 46, 'The draft still needs a commission rule, creator brief and approved assets.'),
    ],
  },
  assets: {
    eyebrow: 'PRODUCTS & ASSETS',
    type: 'matrix',
    metrics: [m('Promotable products', '1,284', '98.1% coverage', 'positive'), m('Feed errors', '3', 'Action required', 'risk'), m('Approved assets', '24', '6 added this month')],
    records: [
      r('catalog-health', 'Catalog coverage', 'Products available to partners', '98.1%', 'Healthy', 'positive', 98),
      r('feed-errors', 'Feed exceptions', 'Missing images and category mapping', '3', 'Needs attention', 'risk', 38),
      r('creative-kit', 'Summer creative kit', 'Display, social and copy assets', '8 / 9', 'Review', 'attention', 88),
    ],
  },
  rules: {
    eyebrow: 'COMMISSION & RULES',
    type: 'canvas',
    metrics: [m('Active rules', '8', '2 scheduled'), m('Rule conflict', '1', 'Effective Aug 17', 'risk'), m('Attribution window', '14 days', 'Last click')],
    records: [
      r('base-cps', 'US affiliate CPS', 'All publishers · 8% commission', 'P1', 'Active', 'positive', 100),
      r('summer-booster', 'Summer Sale booster', 'Selected partners · +2%', 'P?', 'Conflict', 'risk', 58),
      r('creator-cps', 'Creator launch CPS', 'Creator cohort · 10%', 'P2', 'Scheduled', 'attention', 76),
    ],
  },
  data: {
    eyebrow: 'DATA & TRANSACTIONS',
    type: 'ledger',
    metrics: [m('Gross sales', '$724.7K', '+18.2%', 'positive'), m('Tracked orders', '4,982', '+13.1%', 'positive'), m('Needs review', '28', '$8.4K commission', 'risk')],
    records: [
      r('tx-88421', 'Order #88421', 'Northstar Media · Aug 12, 10:42', '$428.00', 'Needs review', 'risk', 62, 'This high-value order is waiting on approval before commission can be released.'),
      r('tx-88418', 'Order #88418', 'The Dealroom · Aug 12, 09:16', '$182.50', 'Locked', 'attention', 72, 'The order is inside the 14-day lock period and requires no action yet.'),
      r('tx-88415', 'Order #88415', 'Shopper Edit · Aug 11, 21:08', '$249.00', 'Approved', 'positive', 100, 'Approved transaction scheduled for the next payout run.'),
    ],
  },
  finance: {
    eyebrow: 'FINANCE',
    type: 'ledger',
    metrics: [m('Available balance', '$42,820', 'USD wallet'), m('Next payout', '$31,280', 'Aug 16'), m('Balance cover', '6 days', 'Below 14-day target', 'attention')],
    records: [
      r('wallet-usd', 'Operating balance', 'USD wallet · Available now', '$42,820', 'Watch', 'attention', 48),
      r('payout-aug16', 'Aug 16 payout run', '124 partner lines · Approved', '$31,280', 'Scheduled', 'neutral', 72),
      r('funding-rec', 'Funding recommendation', 'Restore 14-day payout cover', '$28,600', 'Add funds', 'risk', 34),
    ],
  },
  communications: {
    eyebrow: 'MESSAGES & NOTIFICATIONS',
    type: 'dossier',
    metrics: [m('Unread messages', '4', '2 need reply', 'attention'), m('Median reply time', '2h', 'Within target', 'positive'), m('Template open rate', '62%', '+7 pts', 'positive')],
    records: [
      r('msg-northstar', 'Northstar Media', 'Summer Sale editorial date', '2h', 'Needs reply', 'attention', 78),
      r('msg-mosaic', 'Mosaic Savings', 'Application tracking question', '5h', 'Unread', 'risk', 55),
      r('msg-daily', 'Daily Living', 'Request for new creative', 'Yesterday', 'Open', 'neutral', 46),
    ],
  },
  systems: {
    eyebrow: 'INTEGRATIONS & SETTINGS',
    type: 'matrix',
    metrics: [m('Connected systems', '6', '5 healthy', 'positive'), m('Data delivery', '99.2%', 'Last 24 hours', 'positive'), m('Workspace members', '12', '3 administrators')],
    records: [
      r('commerce-platform', 'Commerce platform', 'Orders and catalog connection', 'Live', 'Healthy', 'positive', 100),
      r('catalog-connector', 'Catalog connector', 'Last sync 12 minutes ago', '3 errors', 'Attention', 'risk', 62),
      r('tracking-stream', 'Partner tracking', 'Clicks and conversion events', '99.2%', 'Healthy', 'positive', 99),
    ],
  },
};

const pageSeeds = {
  partners: ['partners', 'Partner portfolio', 'The portfolio is growing, but four relationships need fresh momentum.', 'Invite partner'],
  discover: ['partners', 'Discover partners', 'Thirty-two partners match the audience behind the next launch.', 'Save shortlist', [
    r('retail-edit', 'Retail Edit', 'Editorial · Home & lifestyle · US', '92 fit', 'High fit', 'positive', 92),
    r('pixel-review', 'Pixel Review', 'Reviews · Consumer technology · UK', '88 fit', 'Contact', 'neutral', 88),
    r('weekend-finds', 'Weekend Finds', 'Creator collective · Deals · CA', '81 fit', 'New audience', 'attention', 81),
  ]],
  'influencer-discovery': ['partners', 'Influencer discovery', 'Six creators combine high audience fit with launch-ready content formats.', 'Invite creators', [
    r('creator-luna', 'Luna Carr', 'Lifestyle · 82K followers · US', '94 fit', 'Verified', 'positive', 94),
    r('creator-maya', 'Maya Field Notes', 'Travel · 116K followers · CA', '88 fit', 'Strong reach', 'neutral', 88),
    r('creator-iko', 'Iko Makes', 'Home design · 64K followers · UK', '81 fit', 'Review audience', 'attention', 81),
  ]],
  'publisher-discovery': ['partners', 'Publisher discovery', 'Editorial publishers offer the fastest path to qualified traffic this month.', 'Invite publishers', [
    r('publisher-retail', 'Retail Edit', 'Editorial · 48K monthly visits · US', '92 fit', 'High fit', 'positive', 92),
    r('publisher-pixel', 'Pixel Review', 'Reviews · 82K monthly visits · UK', '87 fit', 'Contact', 'neutral', 87),
    r('publisher-dealproof', 'Dealproof', 'Coupons · 126K monthly visits · US', '76 fit', 'Policy check', 'risk', 76),
  ]],
  invitations: ['partners', 'Invitation center', 'Four recently opened invitations are ready for a thoughtful follow-up.', 'Create invitation', [
    r('invite-retail', 'Retail Edit', 'Summer Sale · Sent Aug 11', 'Viewed', 'Follow up', 'attention', 74),
    r('invite-weekend', 'Weekend Finds', 'Creator launch · Draft', 'Draft', 'Personalize', 'neutral', 36),
    r('invite-mosaic', 'Mosaic Savings', 'Always-on program · Sent Aug 08', 'Accepted', 'Warm', 'positive', 100),
  ]],
  applications: ['partners', 'Partner applications', 'Four applicants can expand qualified reach this week.', 'Review applications', [
    r('app-mosaic', 'Mosaic Savings', 'Publisher · 48K monthly visits', '94 fit', 'Needs review', 'attention', 94),
    r('app-luna', 'Luna Carr', 'Creator · 82K followers · Verified', '89 fit', 'Verified', 'positive', 89),
    r('app-dealproof', 'Dealproof', 'Coupon & cashback publisher', '76 fit', 'Policy check', 'risk', 76),
  ]],
  'my-partners': ['partners', 'My partners', 'Editorial partners are producing the strongest revenue quality this month.', 'Export partners'],
  'partner-groups': ['partners', 'Partner groups', 'One high-growth cohort is ready for a dedicated commission rule.', 'Create group', [
    r('group-editorial', 'Editorial leaders', '12 publishers · Revenue quality cohort', '$14.8K', 'Growing', 'positive', 92),
    r('group-creators', 'Launch creators', '18 creators · Summer Sale brief', '14 ready', 'In progress', 'attention', 78),
    r('group-reengage', 'Re-engagement', '9 dormant partners · 60+ days', '9 partners', 'Needs outreach', 'risk', 42),
  ]],

  campaigns: ['campaigns', 'Campaign command', 'One approval stands between Summer Sale and launch.', 'Create campaign'],
  'all-campaigns': ['campaigns', 'All campaigns', 'The next two launches share one creative dependency.', 'New campaign'],
  'affiliate-programs': ['campaigns', 'Affiliate programs', 'Always-on programs are sustaining revenue between seasonal launches.', 'Create program', [
    r('affiliate-northstar', 'Northstar Partner Program', 'CPS · US storefront', '48 partners', 'Healthy', 'positive', 100),
    r('affiliate-creator', 'Creator Essentials', 'CPS · Creator cohort', '16 partners', 'Growing', 'neutral', 68),
    r('affiliate-holiday', 'Holiday Publishers', 'CPS · Pending setup', '0 partners', 'Draft', 'attention', 24),
  ]],
  'influencer-campaigns': ['campaigns', 'Influencer campaigns', 'Two creator briefs are waiting on approved vertical assets.', 'Create creator brief', [
    r('summer-stories', 'Summer Stories', 'Lifestyle creators · Aug 17', '8 / 10', 'On track', 'positive', 80),
    r('tech-reviewers', 'Creator Launch', 'Technology reviewers · Aug 22', '3 / 8', 'Needs briefs', 'attention', 38),
    r('weekend-drop', 'Weekend Drop', 'Deals creators · Draft', '0 / 6', 'Draft', 'neutral', 12),
  ]],

  assets: ['assets', 'Product & asset health', 'Three catalog gaps are reducing partner coverage.', 'Add product'],
  'product-feed': ['assets', 'Product feed', 'Three catalog gaps are reducing partner coverage.', 'Sync feed', [
    r('sku-ns441', 'Northstar Travel Bottle', 'SKU NS-441 · Missing image URL', 'Failed', 'Fix record', 'risk', 24),
    r('sku-ns209', 'Thermal Day Pack', 'SKU NS-209 · Price updated', '$89.00', 'Available', 'positive', 100),
    r('sku-ns892', 'Lumen Desk Lamp', 'SKU NS-892 · Category remapped', '$124.00', 'Review map', 'attention', 68),
  ]],
  coupons: ['assets', 'Coupon timeline', 'Two partner codes expire before the next payout cycle.', 'Create coupon', [
    r('coupon-summer12', 'SUMMER12', '12% off · Summer Sale', 'Aug 31', 'Active', 'positive', 100),
    r('coupon-deal15', 'DEALROOM15', '15% off · Private publisher code', 'Aug 20', 'Expiring', 'attention', 68),
    r('coupon-creator10', 'CREATOR10', '10% off · Creator cohort', 'Unscheduled', 'Draft', 'neutral', 32),
  ]],
  creatives: ['assets', 'Creative library', 'One vertical story asset is holding back the Summer Sale brief.', 'Upload asset', [
    r('creative-hero', 'Summer hero / 1600×900', 'Display · Updated yesterday', '18 uses', 'Approved', 'positive', 100),
    r('creative-story', 'Creator story / 1080×1920', 'Social · Owner N. Park', 'Review', 'Needs approval', 'attention', 68),
    r('creative-grid', 'Product grid / 1200×1200', 'Commerce · Four variants', '6 uses', 'Live', 'neutral', 82),
  ]],
  'text-assets': ['assets', 'Copy & email assets', 'Two partner-ready messages can move from draft to published today.', 'Create copy asset', [
    r('copy-summer', 'Summer Sale launch copy', 'Partner copy · English · 3 variants', '18 uses', 'Published', 'positive', 100),
    r('copy-creator', 'Creator sample request', 'Email copy · English · Owner M. Chen', 'Draft', 'Review', 'attention', 58),
    r('copy-product', 'August product update', 'Partner copy · English / French', '2 locales', 'In progress', 'neutral', 72),
  ]],
  'banner-assets': ['assets', 'Banners & images', 'The launch library is missing one mobile-first banner size.', 'Upload image', [
    r('banner-hero', 'Summer hero banner', '1600×900 · Display', '18 uses', 'Approved', 'positive', 100),
    r('banner-story', 'Creator story frame', '1080×1920 · Social', 'Review', 'Needs approval', 'attention', 68),
    r('banner-mobile', 'Mobile offer banner', '750×1000 · Commerce', 'Missing', 'Create asset', 'risk', 22),
  ]],

  rules: ['rules', 'Commission logic', 'One scheduled rule needs priority before it can go live.', 'Create rule'],
  'commission-rules': ['rules', 'Commission rules', 'The Summer Sale booster currently overlaps the base CPS rule.', 'New commission rule'],
  attribution: ['rules', 'Attribution rules', 'Three coupon overrides need a final ownership check.', 'Edit policy', [
    r('attr-default', 'Default web attribution', 'Last click · 14-day window', '98.6%', 'Active', 'positive', 100),
    r('attr-social', 'Creator social attribution', 'UTM + last click · 14 days', '12.4%', 'Active', 'neutral', 78),
    r('attr-coupon', 'Coupon override', 'Private codes · 7 days', '3 exceptions', 'Review', 'attention', 52),
  ]],
  'ppc-rules': ['rules', 'PPC restrictions', 'Two protected brand terms are missing a regional restriction.', 'Add restriction', [
    r('ppc-brand', 'Protected brand terms', 'Google · US and CA', '42 terms', 'Active', 'positive', 100),
    r('ppc-generic', 'Generic category terms', 'Search partners · Global', '18 terms', 'Allowed', 'neutral', 82),
    r('ppc-region', 'EU brand variation', 'Google · UK, DE and FR', '2 gaps', 'Needs rules', 'risk', 48),
  ]],
  'link-parameters': ['rules', 'Link parameters', 'One campaign parameter is drifting from the brand naming standard.', 'Create parameter', [
    r('link-source', 'utm_source', 'Partner slug · Required', '100%', 'Healthy', 'positive', 100),
    r('link-campaign', 'utm_campaign', 'Campaign code · Required', '1 mismatch', 'Review', 'attention', 72),
    r('link-content', 'utm_content', 'Creative variant · Optional', '82%', 'Active', 'neutral', 82),
  ]],

  data: ['data', 'Data operations', '$8,420 in commission is waiting on review.', 'Export report'],
  performance: ['data', 'Performance', 'Revenue is moving faster than traffic across the strongest partner channels.', 'Download report'],
  'brand-analysis': ['data', 'Brand analysis', 'Northstar Labs contributes 68% of this workspace’s tracked revenue.', 'Compare brands', [
    r('brand-northstar', 'Northstar Labs', 'US Store · 48 partners', '$492.8K', '+21.6%', 'positive', 100),
    r('brand-lumen', 'Lumen Home', 'US Store · 22 partners', '$148.2K', '+8.4%', 'neutral', 62),
    r('brand-roam', 'Roam Supply', 'CA Store · 14 partners', '$83.7K', '-2.1%', 'attention', 38),
  ]],
  transactions: ['data', 'Transactions', '$8,420 in commission is waiting on review.', 'Approve selected'],
  'transaction-inquiries': ['data', 'Transaction inquiries', 'Two partner inquiries are approaching the 48-hour response target.', 'Review inquiries', [
    r('inq-1042', 'Inquiry #1042', 'Order #88210 · Northstar Media', '$86.40', 'Needs response', 'attention', 74),
    r('inq-1041', 'Inquiry #1041', 'Order #88192 · The Dealroom', '$42.10', 'Investigating', 'neutral', 58),
    r('inq-1038', 'Inquiry #1038', 'Order #88064 · Shopper Edit', '$18.25', 'Resolved', 'positive', 100),
  ]],
  'amazon-brb': ['data', 'Amazon BRB', 'Brand Referral Bonus is tracking 11.4% above the previous period.', 'Export BRB report', [
    r('brb-northstar', 'Northstar Media', 'Publisher · US Store', '$12,480', '+18.4%', 'positive', 100),
    r('brb-dealroom', 'The Dealroom', 'Publisher · US Store', '$8,940', '+12.1%', 'positive', 72),
    r('brb-shopper', 'Shopper Edit', 'Creator · US Store', '$6,280', '+7.8%', 'neutral', 54),
  ]],
  exports: ['data', 'Reports & exports', 'Six of seven scheduled reports completed without intervention.', 'New export', [
    r('export-weekly', 'Weekly partner performance', 'CSV · Every Monday 09:00', 'Delivered', 'Scheduled', 'positive', 100),
    r('export-payout', 'Finance payout ledger', 'XLSX · On approval', 'Ready', 'Available', 'neutral', 88),
    r('export-creator', 'Creator campaign summary', 'CSV · Summer Sale', 'Schema check', 'Review', 'attention', 54),
  ]],

  finance: ['finance', 'Finance command', 'Current funds cover six payout days.', 'Add funds'],
  balance: ['finance', 'Balance & deposits', 'Current funds cover six payout days.', 'Add funds'],
  payments: ['finance', 'Payments & billing', 'The next payout run is funded, but the following cycle is exposed.', 'Review payout', [
    r('pay-aug16', 'Partner payout · Aug 16', '124 lines · ACH', '$31,280', 'Scheduled', 'neutral', 72),
    r('pay-aug02', 'Partner payout · Aug 02', '118 lines · ACH', '$28,940', 'Paid', 'positive', 100),
    r('pay-deposit', 'Wallet deposit · Aug 01', 'Bank transfer · Ending 0284', '$40,000', 'Settled', 'positive', 100),
  ]],
  invoices: ['finance', 'Invoices', 'Two billing records need payment confirmation before reconciliation closes.', 'Download statement', [
    r('inv-0812', 'INV-2026-0812', 'Platform subscription · August', '$2,400', 'Paid', 'positive', 100),
    r('inv-0808', 'INV-2026-0808', 'Creator sample fulfillment', '$6,280', 'Awaiting payment', 'attention', 64),
    r('inv-0801', 'INV-2026-0801', 'Data enrichment add-on', '$1,140', 'Approved', 'neutral', 82),
  ]],

  communications: ['communications', 'Communication center', 'Two partner conversations can affect a live campaign this week.', 'Compose message'],
  inbox: ['communications', 'Partner inbox', 'Two partner conversations can affect a live campaign this week.', 'Compose'],
  notifications: ['communications', 'Notifications', 'Three operational alerts are escalated beyond the workspace.', 'Notification settings', [
    r('note-balance', 'Balance coverage alert', 'Finance · Sent to Brand Admin', '6 days', 'Active', 'attention', 78),
    r('note-feed', 'Feed sync failed', 'Product data · Email + in-app', '3 records', 'Active', 'risk', 64),
    r('note-campaign', 'Campaign approval', 'Summer Sale · In-app', '1 pending', 'Active', 'neutral', 42),
  ]],
  newsletters: ['communications', 'Email campaigns', 'The Summer Sale brief is outperforming the last partner update.', 'Create email campaign', [
    r('mail-summer', 'Summer Sale partner brief', '48 recipients · Sent Aug 11', '68% open', 'Delivered', 'positive', 100),
    r('mail-products', 'August product update', '32 recipients · Draft', 'Draft', 'Needs review', 'attention', 46),
    r('mail-reactivation', 'Partner reactivation', '12 recipients · Scheduled Aug 14', 'Scheduled', 'Ready', 'neutral', 82),
  ]],
  templates: ['communications', 'Email templates', 'One draft can unblock creator sampling this week.', 'New template', [
    r('tpl-summer', 'Summer Sale partner brief', 'Campaign · Updated today', '68% open', 'Published', 'positive', 100),
    r('tpl-welcome', 'Application welcome', 'Partner operations · Updated Aug 08', '61% open', 'Published', 'neutral', 82),
    r('tpl-sample', 'Creator sample request', 'Influencer campaigns · Draft', 'Draft', 'Finish copy', 'attention', 34),
  ]],

  systems: ['systems', 'System health', 'Five of six data connections are healthy.', 'Open settings'],
  account: ['systems', 'Organization details', 'Billing and operating contacts are current across the workspace.', 'Edit organization', [
    r('org-profile', 'YeahPromos workspace', 'Organization profile · United States', 'Complete', 'Healthy', 'positive', 100),
    r('org-contact', 'Primary contact', 'Guowv · Brand Admin', 'Verified', 'Current', 'positive', 100),
    r('org-billing', 'Billing contact', 'Finance team · Updated Jul 28', 'Current', 'Review yearly', 'neutral', 86),
  ]],
  brands: ['systems', 'Brands & sites', 'Two storefronts share a healthy operating configuration.', 'Add brand', [
    r('site-northstar', 'Northstar Labs', 'US Store · USD · America/Los_Angeles', 'Live', 'Default', 'positive', 100),
    r('site-lumen', 'Lumen Home', 'US Store · USD · America/New_York', 'Live', 'Connected', 'positive', 100),
    r('site-roam', 'Roam Supply', 'CA Store · CAD · America/Toronto', 'Review', 'Sync lag', 'attention', 72),
  ]],
  integrations: ['systems', 'Integrations', 'Five of six data connections are healthy.', 'Add integration'],
  team: ['systems', 'Team & permissions', 'Two invitations expire in five days and need an owner follow-up.', 'Invite teammate', [
    r('team-fiona', 'Fiona Lin', 'Brand Admin · Partner operations', 'Now', 'Admin', 'positive', 100),
    r('team-chen', 'M. Chen', 'Campaign Manager · Creator campaigns', 'Today', 'Editor', 'neutral', 82),
    r('team-park', 'N. Park', 'Creative Reviewer · Asset library', 'Yesterday', 'Reviewer', 'neutral', 68),
  ]],
  subscriptions: ['systems', 'Plan & payment methods', 'The current plan supports the next launch; one backup payment method needs verification.', 'Manage billing', [
    r('plan-growth', 'Growth plan', 'Annual subscription · Renews Jan 18, 2027', '$2,400', 'Active', 'positive', 100),
    r('method-bank', 'Bank account · 0284', 'Primary funding method · USD', 'Verified', 'Primary', 'positive', 100),
    r('method-card', 'Corporate card · 1138', 'Backup method · Expires 11/26', 'Verify', 'Attention', 'attention', 64),
  ]],
  api: ['systems', 'API & developer', 'One catalog token should be rotated before the next launch.', 'Create token', [
    r('api-reporting', 'Reporting export token', 'Read-only · Expires Sep 01', '18K calls', 'Active', 'positive', 100),
    r('api-catalog', 'Catalog sync token', 'Write access · Expires Aug 18', '12K calls', 'Rotate soon', 'attention', 62),
    r('api-sandbox', 'Sandbox token', 'Development · No expiry', '12K calls', 'Active', 'neutral', 78),
  ]],
  security: ['systems', 'Email & sign-in security', 'Two administrators have strong sign-in coverage; one recovery method is outdated.', 'Review security', [
    r('security-mfa', 'Multi-factor authentication', '3 administrators · Authenticator app', '100%', 'Required', 'positive', 100),
    r('security-email', 'Primary email', 'guowv@northstarlabs.com', 'Verified', 'Healthy', 'positive', 100),
    r('security-recovery', 'Recovery contact', 'Last verified 11 months ago', 'Review', 'Attention', 'attention', 52),
  ]],
  support: ['systems', 'Help & support', 'The workspace is healthy and two contextual guides match the current setup.', 'Contact support', [
    r('support-guide', 'Launch readiness guide', 'Contextual guide · Campaign operations', '6 min', 'Recommended', 'positive', 92),
    r('support-status', 'System status', 'All customer-facing services', 'Operational', 'Healthy', 'positive', 100),
    r('support-ticket', 'Support request #1842', 'Catalog mapping · Updated yesterday', 'Open', 'Investigating', 'attention', 68),
  ]],
};

const typeOverrides = {
  invitations: 'dossier', applications: 'dossier', discover: 'dossier', 'influencer-discovery': 'dossier', 'publisher-discovery': 'dossier', 'my-partners': 'dossier', 'partner-groups': 'dossier',
  'all-campaigns': 'canvas', 'affiliate-programs': 'canvas', 'influencer-campaigns': 'canvas',
  'product-feed': 'canvas', coupons: 'canvas', creatives: 'canvas', 'text-assets': 'canvas', 'banner-assets': 'canvas',
  'commission-rules': 'canvas', attribution: 'canvas', 'ppc-rules': 'canvas', 'link-parameters': 'canvas',
  performance: 'ledger', 'brand-analysis': 'ledger', transactions: 'ledger', 'transaction-inquiries': 'dossier', 'amazon-brb': 'ledger', exports: 'ledger',
  balance: 'ledger', payments: 'ledger', invoices: 'ledger',
  inbox: 'dossier', notifications: 'matrix', newsletters: 'matrix', templates: 'matrix',
  account: 'matrix', brands: 'matrix', integrations: 'matrix', team: 'dossier', subscriptions: 'ledger', api: 'matrix', security: 'matrix', support: 'dossier',
};

const views = Object.fromEntries(Object.entries(pageSeeds).map(([id, seed]) => {
  const [group, title, thesis, action, records] = seed;
  const base = groupBase[group];
  return [id, {
    id,
    group,
    eyebrow: base.eyebrow,
    type: typeOverrides[id] ?? base.type,
    title,
    thesis,
    action,
    metrics: base.metrics,
    records: records ?? base.records,
    filters: ['All', 'Needs attention', 'Updated this week'],
    reasons: [
      `${base.metrics[0].label} is the strongest current signal.`,
      `${base.metrics[1].label} is shaping the next operational decision.`,
      `The working set was refreshed four minutes ago.`,
    ],
  }];
}));

const overviewPeriods = {
  '7d': {
    label: 'Aug 05 - Aug 12, 2026',
    metrics: [m('Gross sales', '$186,420.80', '+15.2%', 'positive'), m('Clicks', '48,620', '+12.8%', 'positive'), m('Orders', '1,284', '+8.4%', 'positive'), m('Commission', '$24,860.40', '+9.6%', 'positive'), m('Conversion', '2.6%', '+0.3 pts', 'positive'), m('Balance cover', '6 days', 'Attention', 'attention')],
    series: { sales: [20, 28, 26, 42, 38, 53, 49, 66, 72, 68, 84, 96], clicks: [18, 30, 24, 40, 45, 51, 48, 62, 70, 67, 78, 91], orders: [19, 24, 31, 29, 41, 48, 52, 61, 58, 72, 79, 88], commission: [17, 22, 27, 32, 30, 43, 47, 55, 61, 68, 73, 85], conversion: [2.1, 2.2, 2.15, 2.3, 2.28, 2.34, 2.4, 2.46, 2.52, 2.48, 2.56, 2.6], balance: [11, 10, 9, 8, 8, 7, 7, 6, 6, 6, 6, 6] },
  },
  '30d': {
    label: 'Jul 14 - Aug 12, 2026',
    metrics: [m('Gross sales', '$724,680.10', '+18.2%', 'positive'), m('Clicks', '182,940', '+16.4%', 'positive'), m('Orders', '4,982', '+13.1%', 'positive'), m('Commission', '$96,420.80', '+12.8%', 'positive'), m('Conversion', '2.7%', '+0.4 pts', 'positive'), m('Balance cover', '9 days', 'Watch', 'attention')],
    series: { sales: [18, 24, 30, 27, 41, 46, 55, 51, 66, 72, 79, 94], clicks: [16, 23, 28, 34, 39, 48, 54, 59, 67, 74, 80, 91], orders: [17, 21, 29, 31, 38, 44, 50, 58, 61, 69, 77, 88], commission: [15, 20, 26, 29, 36, 41, 47, 54, 59, 66, 73, 84], conversion: [2.2, 2.25, 2.3, 2.28, 2.36, 2.4, 2.44, 2.5, 2.55, 2.61, 2.65, 2.7], balance: [16, 15, 14, 13, 12, 12, 11, 10, 10, 9, 9, 9] },
  },
  '90d': {
    label: 'May 15 - Aug 12, 2026',
    metrics: [m('Gross sales', '$2.18M', '+24.9%', 'positive'), m('Clicks', '526,840', '+21.2%', 'positive'), m('Orders', '14,620', '+17.6%', 'positive'), m('Commission', '$286.4K', '+19.8%', 'positive'), m('Conversion', '2.8%', '+0.5 pts', 'positive'), m('Balance cover', '12 days', 'Healthy', 'positive')],
    series: { sales: [14, 21, 27, 34, 40, 47, 54, 62, 70, 78, 87, 98], clicks: [13, 19, 25, 31, 39, 46, 53, 61, 69, 77, 84, 95], orders: [15, 20, 26, 32, 38, 44, 51, 59, 66, 74, 82, 92], commission: [14, 18, 24, 29, 36, 42, 49, 56, 64, 72, 80, 91], conversion: [2.0, 2.08, 2.14, 2.2, 2.26, 2.32, 2.4, 2.48, 2.55, 2.64, 2.72, 2.8], balance: [20, 19, 18, 17, 16, 15, 15, 14, 13, 13, 12, 12] },
  },
};

const overview = {
  thesis: 'Revenue is moving faster than traffic.',
  subline: 'Partner-attributed growth is compounding while one approval and three catalog gaps remain in the way.',
  metrics: overviewPeriods['30d'].metrics,
  periods: overviewPeriods,
  reasons: [
    { label: 'Partner mix', title: 'Northstar Media contribution rose 18.4%.', tone: 'positive' },
    { label: 'Campaign demand', title: 'Summer Sale preview links are lifting qualified traffic.', tone: 'brand' },
    { label: 'Catalog drag', title: 'Three failed products are reducing partner coverage.', tone: 'risk' },
  ],
  priorities: [
    { id: 'priority-balance', title: 'Balance covers six payout days', meta: 'Finance · Review today', action: 'Review balance', page: 'balance', tone: 'attention' },
    { id: 'priority-feed', title: 'Three products failed to sync', meta: 'Product feed · 12 minutes ago', action: 'Inspect records', page: 'product-feed', tone: 'risk' },
    { id: 'priority-transactions', title: '28 transactions need approval', meta: 'Commission release · $8.4K pending', action: 'Start review', page: 'transactions', tone: 'brand' },
    { id: 'priority-apps', title: '12 partner applications are waiting', meta: 'Recruitment · 4 high-fit', action: 'Review applicants', page: 'applications', tone: 'neutral' },
  ],
  partners: groupBase.partners.records,
  campaigns: groupBase.campaigns.records,
};

const commands = [
  { group: 'Actions', label: 'Invite a partner', hint: 'Start an outreach flow', page: 'invitations' },
  { group: 'Actions', label: 'Create a campaign', hint: 'Open the campaign canvas', page: 'all-campaigns' },
  { group: 'Actions', label: 'Export performance', hint: 'Prepare a decision-ready report', page: 'exports' },
  { group: 'Pages', label: 'Review transactions', hint: '28 items waiting', page: 'transactions' },
  { group: 'Pages', label: 'Check product feed', hint: '3 failed records', page: 'product-feed' },
  { group: 'Partners', label: 'Northstar Media', hint: 'Top partner · $6,845', page: 'my-partners', record: 'northstar-media' },
];

export const brandPulseData = {
  workspace: { organization: 'YeahPromos', brand: 'Northstar Labs', site: 'US Store', role: 'Brand Admin', user: 'Guowv', currency: 'USD', timezone: 'America/Los_Angeles' },
  navigation,
  overview,
  views,
  commands,
};
