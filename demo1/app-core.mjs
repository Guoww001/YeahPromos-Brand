export function createDashboardState(data) {
  const clonedData = structuredClone(data);

  return {
    ...clonedData,
    selectedPeriod: clonedData.periods[0]?.id ?? null,
    expandedGroups: [],
    activeMerchantId: null,
  };
}

export function selectPeriod(state, periodId) {
  if (!state.periods.some((period) => period.id === periodId)) {
    return state;
  }

  return {
    ...state,
    selectedPeriod: periodId,
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

export function applyMerchant(state, merchantId) {
  const merchant = state.merchants.find((item) => item.id === merchantId);

  if (!merchant) {
    return {
      state,
      message: 'Merchant not found',
    };
  }

  return {
    state: {
      ...state,
      merchants: state.merchants.map((item) =>
        item.id === merchantId ? { ...item, applied: true } : item,
      ),
    },
    message: `Application sent to ${merchant.name}`,
  };
}
