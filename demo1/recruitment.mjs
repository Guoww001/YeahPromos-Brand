export const recruitmentPageIds = [
  'discover-influencers',
  'discover-publishers',
  'my-partners',
  'applications',
  'invite-history',
];

const discoveryFilters = {
  influencer: [
    { id: 'category', label: 'Category', options: ['All', 'Beauty', 'Technology', 'Travel', 'Wellness'] },
    { id: 'customerReach', label: 'Customer reach', options: ['All', 'United States', 'Canada', 'Australia', 'United Kingdom'] },
    { id: 'platform', label: 'Platform', options: ['All', 'YouTube', 'Instagram', 'TikTok', 'Multi-channel'] },
    { id: 'followers', label: 'Followers', options: ['All', 'Under 50K', '50K–150K', 'Over 150K'] },
    { id: 'relationship', label: 'Campaign relationships', options: ['All', 'Not contacted', 'Previously invited', 'Active campaign'] },
  ],
  publisher: [
    { id: 'category', label: 'Category', options: ['All', 'Technology', 'Coupons', 'Health', 'Lifestyle'] },
    { id: 'promotionMethod', label: 'Promotion method', options: ['All', 'Content/Blog', 'Coupon/Discount', 'Deal', 'Social/Influencer/KOL'] },
    { id: 'customerReach', label: 'Customer reach', options: ['All', 'United States', 'Canada', 'Australia', 'United Kingdom'] },
    { id: 'platform', label: 'Platform', options: ['All', 'Website', 'Newsletter', 'Social', 'Multi-channel'] },
    { id: 'language', label: 'Language', options: ['All', 'English', 'German', 'French'] },
  ],
};

const relationshipFilters = [
  { id: 'group', label: 'Partner group', options: ['All', 'Premium publishers', 'Creator network', 'Seasonal partners'] },
  { id: 'type', label: 'Partner type', options: ['All', 'Publisher', 'Influencer'] },
  { id: 'category', label: 'Category', options: ['All', 'Content/Blog', 'Technology', 'Beauty', 'Coupon/Discount'] },
  { id: 'promotionMethod', label: 'Promotion method', options: ['All', 'Content/Blog', 'Coupon/Discount', 'Deal'] },
  { id: 'customerReach', label: 'Customer reach', options: ['All', 'United States', 'Canada', 'United Kingdom', 'Germany'] },
  { id: 'platform', label: 'Platform', options: ['All', 'Website', 'Social', 'Multi-channel'] },
  { id: 'language', label: 'Language', options: ['All', 'English', 'German', 'French'] },
];

const applicationFilters = [
  { id: 'type', label: 'Partner type', options: ['All', 'Publisher', 'Influencer'] },
  { id: 'category', label: 'Category', options: ['All', 'Technology', 'Beauty', 'Home & Living', 'Deals & Coupons'] },
  { id: 'promotionMethod', label: 'Promotion method', options: ['All', 'Content/Blog', 'Coupon/Discount', 'Social'] },
  { id: 'customerReach', label: 'Customer reach', options: ['All', 'United States', 'Canada', 'Australia', 'United Kingdom'] },
  { id: 'platform', label: 'Platform', options: ['All', 'Website', 'Instagram', 'YouTube', 'Multi-channel'] },
  { id: 'language', label: 'Language', options: ['All', 'English', 'German', 'French'] },
];

export const recruitmentPages = {
  'discover-influencers': {
    id: 'discover-influencers',
    title: 'Discover influencers',
    parent: 'Recruitment & Partners',
    description: 'Find and connect with content creators who align with your brand and campaign goals.',
    filters: discoveryFilters.influencer,
    tabs: [{ id: 'all', label: 'All influencers' }],
  },
  'discover-publishers': {
    id: 'discover-publishers',
    title: 'Discover publishers',
    parent: 'Recruitment & Partners',
    description: 'Find and connect with publishers that fit your brand, category and audience.',
    filters: discoveryFilters.publisher,
    tabs: [{ id: 'all', label: 'All publishers' }],
  },
  'my-partners': {
    id: 'my-partners',
    title: 'My partners',
    parent: 'Recruitment & Partners',
    description: 'Manage and collaborate with your partners across the entire partnership lifecycle.',
    filters: relationshipFilters,
    stats: [
      { id: 'in-relationship', label: 'In relationship', value: '284', tone: 'success', icon: 'users' },
      { id: 'followed', label: 'Followed', value: '46', tone: 'neutral', icon: 'users' },
      { id: 'invited', label: 'Invited', value: '35', tone: 'warning', icon: 'send' },
      { id: 'pending', label: 'Pending', value: '0', tone: 'pending', icon: 'calendar' },
      { id: 'declined', label: 'Declined', value: '4', tone: 'danger', icon: 'x' },
    ],
    tabs: [
      { id: 'joined', label: 'Joined' },
      { id: 'new', label: 'New partners' },
      { id: 'followed', label: 'Followed' },
      { id: 'blocked', label: 'Blocked' },
    ],
  },
  applications: {
    id: 'applications',
    title: 'Applications',
    parent: 'Recruitment & Partners',
    description: 'Review and manage partner applications to grow your program network.',
    stats: [
      { id: 'new', label: 'New applications', value: '18', tone: 'danger', icon: 'receipt' },
      { id: 'under-review', label: 'Under review', value: '27', tone: 'warning', icon: 'calendar' },
      { id: 'approved', label: 'Approved', value: '41', tone: 'success', icon: 'check' },
      { id: 'declined', label: 'Declined', value: '9', tone: 'neutral', icon: 'x' },
    ],
    filters: applicationFilters,
    tabs: [
      { id: 'new', label: 'New applications', count: 18 },
      { id: 'under-review', label: 'Under review', count: 27 },
      { id: 'approved', label: 'Approved', count: 41 },
      { id: 'declined', label: 'Declined', count: 9 },
    ],
  },
  'invite-history': {
    id: 'invite-history',
    title: 'Invite history',
    parent: 'Recruitment & Partners',
    description: 'Track and manage all partner invitations you have sent.',
    filters: [
      { id: 'status', label: 'Status', options: ['All status', 'Accepted', 'Pending', 'Expired'] },
      { id: 'channel', label: 'Channel', options: ['All channels', 'Email', 'Platform', 'Referral'] },
    ],
    stats: [
      { id: 'sent', label: 'Sent', value: '125', note: '+8 this week', tone: 'neutral', icon: 'send' },
      { id: 'accepted', label: 'Accepted', value: '46', note: '36.8% acceptance rate', tone: 'success', icon: 'check' },
      { id: 'pending', label: 'Pending', value: '37', note: '+3 this week', tone: 'warning', icon: 'calendar' },
      { id: 'expired', label: 'Expired', value: '42', note: '+4 this week', tone: 'danger', icon: 'x' },
    ],
    columns: ['Partner', 'Channel', 'Sent date', 'Last activity', 'Status', 'Actions'],
  },
};

export const recruitmentData = {
  influencers: [
    {
      id: 'ethan-carter',
      name: 'Ethan Carter',
      country: 'United States',
      followers: '210K followers',
      channels: ['YouTube 128K', 'Instagram 78K', 'TikTok 2.1K'],
      categories: ['Technology', 'Gaming', 'Lifestyle'],
      media: ['Tech desk', 'Headphones', 'RGB setup', 'Laptop review', 'Phone gear'],
      filters: { category: 'Technology', customerReach: 'United States', platform: 'Multi-channel', followers: 'Over 150K', relationship: 'Not contacted' },
      accent: 'coral',
    },
    {
      id: 'mia-johnson',
      name: 'Mia Johnson',
      country: 'Canada',
      followers: '147K followers',
      channels: ['YouTube 95K', 'Instagram 52K', 'TikTok 1.4K'],
      categories: ['Beauty', 'Skincare', 'Lifestyle'],
      media: ['Serum bottles', 'Beauty shelf', 'Texture study', 'Daily routine', 'Editorial portrait'],
      filters: { category: 'Beauty', customerReach: 'Canada', platform: 'Multi-channel', followers: '50K–150K', relationship: 'Not contacted' },
      accent: 'rose',
    },
    {
      id: 'caleb-nguyen',
      name: 'Caleb Nguyen',
      country: 'Australia',
      followers: '183K followers',
      channels: ['YouTube 112K', 'Instagram 61K', 'TikTok 1.9K'],
      categories: ['Travel', 'Adventure', 'Photography'],
      media: ['Ocean trail', 'Mountain path', 'Aerial coast', 'Palm beach', 'Sunset field'],
      filters: { category: 'Travel', customerReach: 'Australia', platform: 'Multi-channel', followers: 'Over 150K', relationship: 'Previously invited' },
      accent: 'teal',
    },
    {
      id: 'ava-mitchell',
      name: 'Ava Mitchell',
      country: 'United Kingdom',
      followers: '98K followers',
      channels: ['YouTube 61K', 'Instagram 35K', 'TikTok 2K'],
      categories: ['Wellness', 'Fitness', 'Lifestyle'],
      media: ['Morning light', 'Training notes', 'Wellness kit', 'Studio class', 'Meal prep'],
      filters: { category: 'Wellness', customerReach: 'United Kingdom', platform: 'Multi-channel', followers: '50K–150K', relationship: 'Not contacted' },
      accent: 'sage',
    },
  ],
  publishers: [
    { id: 'peak-insights', name: 'Peak Insights', country: 'United States', visits: '120K monthly visits', type: 'Content/Blog', categories: ['Technology', 'Reviews'], filters: { category: 'Technology', promotionMethod: 'Content/Blog', customerReach: 'United States', platform: 'Website', language: 'English' }, accent: 'navy' },
    { id: 'niche-navigator', name: 'Niche Navigator', country: 'United Kingdom', visits: '95K monthly visits', type: 'Content/Blog', categories: ['Lifestyle', 'Guides'], filters: { category: 'Lifestyle', promotionMethod: 'Content/Blog', customerReach: 'United Kingdom', platform: 'Website', language: 'English' }, accent: 'charcoal' },
    { id: 'smart-shopper', name: 'Smart Shopper', country: 'Canada', visits: '88K monthly visits', type: 'Deal', categories: ['Beauty', 'Coupons'], filters: { category: 'Beauty', promotionMethod: 'Deal', customerReach: 'Canada', platform: 'Website', language: 'English' }, accent: 'mint' },
    { id: 'advisor-hub', name: 'Advisor Hub', country: 'Australia', visits: '75K monthly visits', type: 'Content/Blog', categories: ['Finance', 'Guides'], filters: { category: 'Technology', promotionMethod: 'Content/Blog', customerReach: 'Australia', platform: 'Newsletter', language: 'English' }, accent: 'violet' },
    { id: 'bright-advice', name: 'Bright Advice', country: 'United States', visits: '110K monthly visits', type: 'Content/Blog', categories: ['Finance', 'Personal finance'], filters: { category: 'Technology', promotionMethod: 'Content/Blog', customerReach: 'United States', platform: 'Website', language: 'English' }, accent: 'teal' },
    { id: 'deal-finder', name: 'Deal Finder', country: 'United States', visits: '210K monthly visits', type: 'Coupon/Discount', categories: ['Coupons', 'Deals'], filters: { category: 'Coupons', promotionMethod: 'Coupon/Discount', customerReach: 'United States', platform: 'Website', language: 'English' }, accent: 'gold' },
    { id: 'tech-simplified', name: 'Tech Simplified', country: 'United States', visits: '150K monthly visits', type: 'Content/Blog', categories: ['Technology', 'Gadgets'], filters: { category: 'Technology', promotionMethod: 'Content/Blog', customerReach: 'United States', platform: 'Website', language: 'English' }, accent: 'sky' },
    { id: 'wellness-daily', name: 'Wellness Daily', country: 'Canada', visits: '130K monthly visits', type: 'Content/Blog', categories: ['Health', 'Wellness'], filters: { category: 'Health', promotionMethod: 'Content/Blog', customerReach: 'Canada', platform: 'Website', language: 'English' }, accent: 'forest' },
  ],
  partners: [
    { id: 'alpha-media', name: 'Alpha Media', initial: 'A', type: 'Publisher', country: 'United States', status: 'In relationship', group: 'Premium publishers', categories: ['Content/Blog', 'Food & Drink'], promotionMethod: 'Content/Blog', platform: 'Website', language: 'English', reach: '+251', lastActivity: 'Today, 10:24 AM', audience: '1.2M monthly visits', commission: '$6,845.20', accent: 'rose' },
    { id: 'future-hub', name: 'Future Hub', initial: 'F', type: 'Publisher', country: 'United Kingdom', status: 'In relationship', group: 'Premium publishers', categories: ['Technology', 'Computer & Electronics'], promotionMethod: 'Content/Blog', platform: 'Website', language: 'English', reach: '+9', lastActivity: 'Yesterday, 4:18 PM', audience: '842K monthly visits', commission: '$5,126.80', accent: 'blue' },
    { id: 'gocertify', name: 'Gocertify', initial: 'G', type: 'Publisher', country: 'United Kingdom', status: 'In relationship', group: 'Seasonal partners', categories: ['Technology', 'Clothing & Accessories'], promotionMethod: 'Deal', platform: 'Website', language: 'English', reach: '+10', lastActivity: 'May 10, 2025', audience: '624K monthly visits', commission: '$4,382.10', accent: 'peach' },
    { id: 'creative-bytes', name: 'Creative Bytes', initial: 'C', type: 'Influencer', country: 'South Africa', status: 'In relationship', group: 'Creator network', categories: ['Content/Blog', 'Shoes & Bags'], promotionMethod: 'Content/Blog', platform: 'Social', language: 'English', reach: '+62', lastActivity: 'May 09, 2025', audience: '410K followers', commission: '$3,614.60', accent: 'lilac' },
    { id: 'karma-collective', name: 'Karma Collective', initial: 'K', type: 'Publisher', country: 'United States', status: 'In relationship', group: 'Premium publishers', categories: ['Other', 'Fashion'], promotionMethod: 'Content/Blog', platform: 'Website', language: 'English', reach: '+9', lastActivity: 'May 08, 2025', audience: '290K monthly visits', commission: '$2,906.40', accent: 'ink' },
    { id: 'coupons-couch', name: 'Coupons Couch', initial: 'CC', type: 'Publisher', country: 'Germany', status: 'Followed', group: 'Seasonal partners', categories: ['Coupon/Discount', 'Other'], promotionMethod: 'Coupon/Discount', platform: 'Website', language: 'German', reach: '+4', lastActivity: 'May 06, 2025', audience: '186K monthly visits', commission: '$1,280.40', accent: 'gold' },
  ],
  applications: [
    { id: 'trendlens-media', name: 'TrendLens Media', initial: 'T', identifier: 'Publisher ID: 842756', type: 'Publisher', source: 'Partner discovery', country: 'United States', categories: ['Technology', 'Gadgets'], channels: ['Website', 'Instagram'], followers: '85K', message: 'We create in-depth tech content and product reviews for a highly engaged audience. We would love to partner and promote your products.', submitted: 'May 12, 2025 10:32 AM', status: 'new', filters: { type: 'Publisher', category: 'Technology', promotionMethod: 'Content/Blog', customerReach: 'United States', platform: 'Website', language: 'English' }, accent: 'lilac' },
    { id: 'gizmo-guide', name: 'Gizmo Guide', initial: 'G', identifier: 'Publisher ID: 617288', type: 'Publisher', source: 'Website sign-up', country: 'United Kingdom', categories: ['Consumer Electronics', 'Reviews'], channels: ['Website', 'YouTube'], followers: '120K', message: 'Our channel helps shoppers make smart tech choices with honest reviews and comparisons.', submitted: 'May 12, 2025 09:18 AM', status: 'under-review', filters: { type: 'Publisher', category: 'Technology', promotionMethod: 'Content/Blog', customerReach: 'United Kingdom', platform: 'Website', language: 'English' }, accent: 'ink' },
    { id: 'eco-living-daily', name: 'Eco Living Daily', initial: 'E', identifier: 'Publisher ID: 391024', type: 'Influencer', source: 'Influencer discovery', country: 'Canada', categories: ['Sustainability', 'Home & Living'], channels: ['Instagram', 'TikTok'], followers: '64K', message: 'We share eco-friendly tips and product picks with our community. Your brand aligns closely with our mission.', submitted: 'May 11, 2025 07:45 PM', status: 'approved', filters: { type: 'Influencer', category: 'Home & Living', promotionMethod: 'Social', customerReach: 'Canada', platform: 'Instagram', language: 'English' }, accent: 'sage' },
    { id: 'bargain-hunter', name: 'Bargain Hunter', initial: 'B', identifier: 'Publisher ID: 905331', type: 'Publisher', source: 'Bulk invite', country: 'Australia', categories: ['Deals & Coupons', 'Shopping'], channels: ['Website', 'Pinterest'], followers: '200K', message: 'We share exclusive deals and saving tips with our audience. Let us team up to drive more value.', submitted: 'May 11, 2025 05:30 PM', status: 'declined', filters: { type: 'Publisher', category: 'Deals & Coupons', promotionMethod: 'Coupon/Discount', customerReach: 'Australia', platform: 'Website', language: 'English' }, accent: 'peach' },
  ],
  invites: [
    { id: 'future-hub-invite', name: 'Future Hub', email: 'futurehub@example.com', initial: 'F', channel: 'Email', sentDate: 'May 12, 2025 10:32 AM', lastActivity: 'May 12, 2025 10:45 AM', status: 'Accepted', statusKey: 'accepted', target: 'Summer Essentials 2025', accent: 'blue' },
    { id: 'gocertify-invite', name: 'Gocertify', email: 'partnerships@gocertify.com', initial: 'G', channel: 'Platform', sentDate: 'May 11, 2025 09:18 AM', lastActivity: 'May 11, 2025 02:21 PM', status: 'Pending', statusKey: 'pending', target: 'Affiliate program', accent: 'peach' },
    { id: 'alpha-media-invite', name: 'Alpha Media', email: 'collab@alphamedia.com', initial: 'A', channel: 'Email', sentDate: 'May 10, 2025 04:05 PM', lastActivity: '—', status: 'Expired', statusKey: 'expired', target: 'Summer Essentials 2025', accent: 'rose' },
    { id: 'creative-bytes-invite', name: 'Creative Bytes', email: 'hello@creativebytes.io', initial: 'C', channel: 'Platform', sentDate: 'May 09, 2025 11:27 AM', lastActivity: 'May 10, 2025 08:14 AM', status: 'Accepted', statusKey: 'accepted', target: 'Influencer campaign', accent: 'ink' },
    { id: 'coupons-couch-invite', name: 'Coupons Couch', email: 'partners@couponscouch.com', initial: 'C', channel: 'Email', sentDate: 'May 08, 2025 02:40 PM', lastActivity: '—', status: 'Expired', statusKey: 'expired', target: 'Affiliate program', accent: 'blue' },
    { id: 'karma-collective-invite', name: 'Karma Collective', email: 'team@karmacollec.co', initial: 'K', channel: 'Referral', sentDate: 'May 07, 2025 09:12 AM', lastActivity: 'May 07, 2025 10:03 AM', status: 'Accepted', statusKey: 'accepted', target: 'Summer Essentials 2025', accent: 'ink' },
    { id: 'tech-trends-invite', name: 'Tech Trends', email: 'hello@techtrends.com', initial: 'T', channel: 'Email', sentDate: 'May 06, 2025 01:15 PM', lastActivity: 'May 06, 2025 03:31 PM', status: 'Pending', statusKey: 'pending', target: 'Affiliate program', accent: 'violet' },
  ],
};

export function createRecruitmentState() {
  return {
    search: '',
    filters: {},
    tabs: {
      'discover-influencers': 'all',
      'discover-publishers': 'all',
      'my-partners': 'joined',
      applications: 'new',
      'invite-history': 'all',
    },
    sort: 'relevance',
  };
}

export function getRecruitmentPage(pageId) {
  return recruitmentPages[pageId] ?? recruitmentPages['my-partners'];
}

function collectSearchText(value) {
  if (Array.isArray(value)) return value.flatMap(collectSearchText);
  if (value && typeof value === 'object') return Object.values(value).flatMap(collectSearchText);
  return value == null ? [] : [String(value)];
}

export function filterRecruitmentRecords(records, { query = '', filters = {} } = {}) {
  const normalizedQuery = query.trim().toLowerCase();

  return records.filter((record) => {
    const matchesQuery = !normalizedQuery || collectSearchText(record).join(' ').toLowerCase().includes(normalizedQuery);
    const matchesFilters = Object.entries(filters).every(([key, value]) => {
      if (!value || value === 'All' || value === 'All status' || value === 'All channels') return true;
      return record.filters?.[key] === value || record[key] === value;
    });

    return matchesQuery && matchesFilters;
  });
}

export function selectRecruitmentTab(state, pageId, tabId) {
  return {
    ...state,
    tabs: {
      ...state.tabs,
      [pageId]: tabId,
    },
  };
}

export function updateRecruitmentFilter(state, key, value) {
  return {
    ...state,
    filters: {
      ...state.filters,
      [key]: value,
    },
  };
}

export function updateRecruitmentSearch(state, search) {
  return { ...state, search };
}
