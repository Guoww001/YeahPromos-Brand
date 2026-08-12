const parentByPage = {
  discover: 'partners', 'influencer-discovery': 'partners', 'publisher-discovery': 'partners', invitations: 'partners', applications: 'partners', 'my-partners': 'partners', 'partner-groups': 'partners',
  'all-campaigns': 'campaigns', 'affiliate-programs': 'campaigns', 'influencer-campaigns': 'campaigns',
  'product-feed': 'assets', coupons: 'assets', creatives: 'assets', 'text-assets': 'assets', 'banner-assets': 'assets',
  'commission-rules': 'rules', attribution: 'rules', 'ppc-rules': 'rules', 'link-parameters': 'rules',
  performance: 'data', 'brand-analysis': 'data', transactions: 'data', 'transaction-inquiries': 'data', 'amazon-brb': 'data', exports: 'data',
  balance: 'finance', payments: 'finance', invoices: 'finance',
  inbox: 'communications', notifications: 'communications', newsletters: 'communications', templates: 'communications',
  account: 'systems', brands: 'systems', integrations: 'systems', team: 'systems', subscriptions: 'systems', api: 'systems', security: 'systems', support: 'systems',
};

export function createBrandPulseState() {
  return {
    activePage: 'overview',
    expandedGroup: 'partners',
    selectedMetric: 'sales',
    selectedPeriod: '30d',
    activeFilter: 'All',
    demoState: 'normal',
    inspectorId: null,
    commandOpen: false,
    commandQuery: '',
    mobileNavOpen: false,
    sidebarCollapsed: false,
    toast: '',
  };
}

export function navigateTo(state, pageId) {
  return {
    ...state,
    activePage: pageId,
    expandedGroup: parentByPage[pageId] ?? (pageId === 'overview' ? state.expandedGroup : pageId),
    activeFilter: 'All',
    inspectorId: null,
    commandOpen: false,
    commandQuery: '',
    mobileNavOpen: false,
  };
}

export const selectPeriod = (state, period) => ({ ...state, selectedPeriod: period });
export const selectMetric = (state, metric) => ({ ...state, selectedMetric: metric });
export const setDemoState = (state, demoState) => ({ ...state, demoState });
export const setActiveFilter = (state, activeFilter) => ({ ...state, activeFilter });
export const openInspector = (state, inspectorId) => ({ ...state, inspectorId });
export const closeInspector = (state) => ({ ...state, inspectorId: null });
export const setCommandOpen = (state, commandOpen) => ({ ...state, commandOpen, commandQuery: commandOpen ? state.commandQuery : '' });
export const setCommandQuery = (state, commandQuery) => ({ ...state, commandQuery });
export const setMobileNavOpen = (state, mobileNavOpen) => ({ ...state, mobileNavOpen });
export const toggleSidebar = (state) => ({ ...state, sidebarCollapsed: !state.sidebarCollapsed });
export const setToast = (state, toast) => ({ ...state, toast });
