import { controlRoomData } from './data.mjs';

const clone = (value) => JSON.parse(JSON.stringify(value));
const validDemoStates = new Set(['normal', 'empty', 'syncing', 'error', 'permission']);

function snapshotFor(state, periodId) {
  const period = controlRoomData.periodData[periodId];
  const metric = period.trajectories[state.selectedMetric] ?? period.trajectories.sales;
  return { ...state, selectedPeriod: periodId, flightMetrics: clone(period.metrics), trajectory: clone(metric), periodLabel: period.label, refresh: period.refresh };
}

export function createControlRoomState() {
  const initial = {
    selectedPeriod: '7d',
    selectedMetric: 'sales',
    activeNavigationId: 'overview',
    expandedGroups: ['partners'],
    selectedPartnerId: null,
    demoState: 'normal',
    navOpen: false,
    toast: '',
    navigation: clone(controlRoomData.navigation),
    decisionQueue: clone(controlRoomData.decisions),
    partners: clone(controlRoomData.partners),
    campaigns: clone(controlRoomData.campaigns),
    risks: clone(controlRoomData.risks),
    quickCommands: clone(controlRoomData.quickCommands),
    workspace: clone(controlRoomData.workspace),
  };
  return snapshotFor(initial, '7d');
}

export function selectPeriod(state, periodId) {
  if (!controlRoomData.periodData[periodId]) return state;
  return snapshotFor({ ...state }, periodId);
}

export function selectMetric(state, metricId) {
  const period = controlRoomData.periodData[state.selectedPeriod];
  if (!period.trajectories[metricId]) return state;
  return { ...state, selectedMetric: metricId, trajectory: clone(period.trajectories[metricId]) };
}

export function setDemoState(state, demoState) {
  if (!validDemoStates.has(demoState)) return state;
  return { ...state, demoState };
}

export function toggleNavGroup(state, groupId) {
  const expandedGroups = state.expandedGroups.includes(groupId)
    ? state.expandedGroups.filter((id) => id !== groupId)
    : [...state.expandedGroups, groupId];
  return { ...state, expandedGroups };
}

export function navigateTo(state, navigationId) {
  return { ...state, activeNavigationId: navigationId, navOpen: false };
}

export function setNavigationOpen(state, navOpen) {
  return { ...state, navOpen: Boolean(navOpen) };
}

export function selectPartner(state, partnerId) {
  const found = state.partners.some((partner) => partner.id === partnerId);
  return found ? { ...state, selectedPartnerId: partnerId } : state;
}

export function closePartner(state) {
  return { ...state, selectedPartnerId: null };
}

export function setToast(state, toast) {
  return { ...state, toast };
}
