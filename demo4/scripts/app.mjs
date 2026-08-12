import { renderApp } from './render.mjs';
import {
  closeInspector,
  createBrandPulseState,
  navigateTo,
  openInspector,
  selectMetric,
  selectPeriod,
  setActiveFilter,
  setCommandOpen,
  setCommandQuery,
  setDemoState,
  setMobileNavOpen,
  setToast,
  toggleSidebar,
} from './state.mjs';

const app = document.querySelector('#app');
let state = createBrandPulseState();
let toastTimer;

function render({ focusCommand = false } = {}) {
  app.innerHTML = renderApp(state);
  if (focusCommand) requestAnimationFrame(() => app.querySelector('[data-command-input]')?.focus());
}

function notify(message) {
  state = setToast(state, message);
  render();
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => {
    state = setToast(state, '');
    render();
  }, 2400);
}

function goTo(page, record = null) {
  state = navigateTo(state, page);
  if (record) state = openInspector(state, record);
  render();
  window.scrollTo({ top: 0, behavior: window.matchMedia('(prefers-reduced-motion: reduce)').matches ? 'auto' : 'smooth' });
}

app.addEventListener('click', (event) => {
  const button = event.target.closest('button');
  if (!button) return;

  if (button.dataset.openNav !== undefined) {
    state = setMobileNavOpen(state, true);
    render();
    return;
  }
  if (button.dataset.closeNav !== undefined) {
    state = setMobileNavOpen(state, false);
    render();
    return;
  }
  if (button.dataset.collapseSidebar !== undefined) {
    state = toggleSidebar(state);
    render();
    return;
  }
  if (button.dataset.demoReset !== undefined) {
    state = setDemoState(state, 'normal');
    render();
    return;
  }
  if (button.dataset.closeInspector !== undefined) {
    state = closeInspector(state);
    render();
    return;
  }
  if (button.dataset.openCommand !== undefined) {
    state = setCommandOpen(state, true);
    render({ focusCommand: true });
    return;
  }
  if (button.dataset.closeCommand !== undefined) {
    state = setCommandOpen(state, false);
    render();
    return;
  }
  if (button.dataset.commandPage) {
    goTo(button.dataset.commandPage, button.dataset.commandRecord ?? null);
    return;
  }
  if (button.dataset.page) {
    goTo(button.dataset.page, button.dataset.record ?? null);
    return;
  }
  if (button.dataset.record) {
    state = openInspector(state, button.dataset.record);
    render();
    return;
  }
  if (button.dataset.metric) {
    state = selectMetric(state, button.dataset.metric);
    render();
    return;
  }
  if (button.dataset.filter) {
    state = setActiveFilter(state, button.dataset.filter);
    render();
    return;
  }
  if (button.dataset.toast) notify(button.dataset.toast);
});

app.addEventListener('change', (event) => {
  if (event.target.matches('[data-period]')) {
    state = selectPeriod(state, event.target.value);
    render();
  }
  if (event.target.matches('[data-demo-state]')) {
    state = setDemoState(state, event.target.value);
    render();
  }
});

app.addEventListener('input', (event) => {
  if (!event.target.matches('[data-command-input]')) return;
  state = setCommandQuery(state, event.target.value);
  render({ focusCommand: true });
});

document.addEventListener('keydown', (event) => {
  if ((event.metaKey || event.ctrlKey) && event.key.toLowerCase() === 'k') {
    event.preventDefault();
    state = setCommandOpen(state, true);
    render({ focusCommand: true });
  }
  if (event.key === 'Escape') {
    if (state.commandOpen) state = setCommandOpen(state, false);
    else if (state.inspectorId) state = closeInspector(state);
    else if (state.mobileNavOpen) state = setMobileNavOpen(state, false);
    else return;
    render();
  }
});

render();
