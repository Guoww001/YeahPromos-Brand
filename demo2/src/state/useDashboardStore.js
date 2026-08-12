import { computed, reactive } from 'vue';
import { campaignPulse, dashboardData, operationalStatus, riskItems } from '../data/cockpit-data.js';

const clone = (value) => {
  if (typeof structuredClone === 'function') return structuredClone(value);
  return JSON.parse(JSON.stringify(value));
};

export function createDashboardStore() {
  const state = reactive({
    ...clone(dashboardData),
    selectedPeriod: dashboardData.periods[0]?.id ?? '7d',
    activeNavigationId: 'overview',
    activePartnerId: null,
    demoState: 'normal',
    navOpen: false,
    expandedGroups: ['recruitment', 'performance'],
    activeFilters: {
      brand: 'Northstar Labs',
      partnerType: 'All partners',
      channel: 'All channels',
    },
  });

  const currentPeriod = computed(() => state.periods.find((period) => period.id === state.selectedPeriod) ?? state.periods[0]);
  const currentSnapshot = computed(() => currentPeriod.value ? state.snapshots[currentPeriod.value.id] : state.snapshots['7d']);
  const operationalStatusView = computed(() => operationalStatus[state.selectedPeriod] ?? operationalStatus['7d']);
  const openTaskCount = computed(() => state.demoState === 'empty' ? 0 : state.actionItems.length);
  const actionItems = computed(() => state.demoState === 'empty' ? [] : state.actionItems);
  const riskItemsView = computed(() => state.demoState === 'empty' ? [] : riskItems);
  const campaignPulseView = computed(() => state.demoState === 'empty' ? [] : campaignPulse);
  const activePartner = computed(() => state.partners.find((partner) => partner.id === state.activePartnerId) ?? null);
  const navigationContext = computed(() => {
    for (const item of state.navigation) {
      if (item.id === state.activeNavigationId) return item;
      const child = item.children?.find((entry) => entry.id === state.activeNavigationId);
      if (child) return child;
    }
    return state.navigation[0];
  });

  function selectPeriod(periodId) {
    if (state.periods.some((period) => period.id === periodId)) state.selectedPeriod = periodId;
  }

  function selectDemoState(nextState) {
    if (['normal', 'empty', 'error', 'permission', 'syncing'].includes(nextState)) state.demoState = nextState;
  }

  function navigateTo(navigationId) {
    state.activeNavigationId = navigationId;
    state.navOpen = false;
  }

  function toggleNavigationGroup(groupId) {
    const index = state.expandedGroups.indexOf(groupId);
    if (index === -1) state.expandedGroups.push(groupId);
    else state.expandedGroups.splice(index, 1);
  }

  function openPartner(partnerId) {
    state.activePartnerId = partnerId;
  }

  function closePartner() {
    state.activePartnerId = null;
  }

  function toggleFilter(key) {
    const values = {
      brand: ['Northstar Labs', 'All brands'],
      partnerType: ['All partners', 'Content partners', 'Deal partners'],
      channel: ['All channels', 'Amazon US', 'Direct store'],
    };
    const options = values[key] ?? [];
    const currentIndex = options.indexOf(state.activeFilters[key]);
    state.activeFilters[key] = options[(currentIndex + 1) % options.length] ?? state.activeFilters[key];
  }

  return {
    state,
    currentPeriod,
    currentSnapshot,
    operationalStatus: operationalStatusView,
    openTaskCount,
    actionItems,
    riskItems: riskItemsView,
    campaignPulse: campaignPulseView,
    activePartner,
    navigationContext,
    selectPeriod,
    selectDemoState,
    navigateTo,
    toggleNavigationGroup,
    openPartner,
    closePartner,
    toggleFilter,
  };
}
