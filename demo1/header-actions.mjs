export const headerActionIds = ['messages', 'notifications', 'download'];

export function createHeaderActionState() {
  return {
    openPanel: null,
    notificationsRead: false,
  };
}

export function toggleHeaderActionPanel(state, actionId) {
  if (!headerActionIds.includes(actionId) || actionId === 'download') return state;
  return {
    ...state,
    openPanel: state.openPanel === actionId ? null : actionId,
  };
}

export function closeHeaderActionPanel(state) {
  return { ...state, openPanel: null };
}

export function markHeaderNotificationsRead(state) {
  return { ...state, notificationsRead: true };
}
