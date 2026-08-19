export function createDashboardState(data) {
  const clonedData = structuredClone(data);
  const initialPeriod = clonedData.periods[0];

  return {
    ...clonedData,
    selectedPeriod: initialPeriod?.id ?? null,
    ...(initialPeriod?.snapshot ?? {}),
    expandedGroups: [],
    activePartnerId: null,
    activeNavigationId: 'overview',
    activeNavigationChild: null,
    demoState: 'normal',
  };
}

export function selectPeriod(state, periodId) {
  const period = state.periods.find((item) => item.id === periodId);

  if (!period) {
    return state;
  }

  return {
    ...state,
    selectedPeriod: periodId,
    ...(period.snapshot ?? {}),
  };
}

export function selectDemoState(state, demoState) {
  const supportedStates = ['normal', 'empty', 'error', 'permission', 'syncing'];

  if (!supportedStates.includes(demoState)) {
    return state;
  }

  return {
    ...state,
    demoState,
  };
}

export function toggleNavigationGroup(state, groupId) {
  const isExpanded = state.expandedGroups.includes(groupId);

  return {
    ...state,
    expandedGroups: isExpanded
      ? state.expandedGroups.filter((id) => id !== groupId)
      : [...state.expandedGroups, groupId],
  };
}

export function isNavigationItemActive(state, itemId) {
  return state.activeNavigationId === itemId;
}
