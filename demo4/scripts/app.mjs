import { renderApp } from './render.mjs';
import {
  advanceWorkflow,
  closeWorkflow,
  closeInspector,
  createBrandPulseState,
  navigateTo,
  openWorkflow,
  openInspector,
  rewindWorkflow,
  selectMetric,
  selectPeriod,
  setActiveFilter,
  setCommandOpen,
  setCommandQuery,
  setDemoState,
  setLanguage,
  setMobileNavOpen,
  setToast,
  toggleSidebar,
} from './state.mjs';

const app = document.querySelector('#app');
const LANGUAGE_STORAGE_KEY = 'yeahpromos-demo4-language';

function readLanguagePreference() {
  try {
    return localStorage.getItem(LANGUAGE_STORAGE_KEY) === 'zh-CN' ? 'zh-CN' : 'en';
  } catch {
    return 'en';
  }
}

let state = createBrandPulseState({ language: readLanguagePreference() });
let toastTimer;

function render({ focusCommand = false } = {}) {
  document.documentElement.lang = state.language;
  document.title = state.language === 'zh-CN' ? 'YeahPromos · 品牌脉搏' : 'YeahPromos · Brand Pulse';
  const skipLink = document.querySelector('.skip-link');
  if (skipLink) skipLink.textContent = state.language === 'zh-CN' ? '跳转到主要内容' : 'Skip to content';
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
  if (button.dataset.languageToggle !== undefined) {
    const nextLanguage = state.language === 'zh-CN' ? 'en' : 'zh-CN';
    state = setLanguage(state, nextLanguage);
    try {
      localStorage.setItem(LANGUAGE_STORAGE_KEY, state.language);
    } catch {
      // file:// 或隐私模式可能禁用存储，当前会话内切换仍然有效。
    }
    render();
    return;
  }
  if (button.dataset.demoReset !== undefined) {
    state = setDemoState(state, 'normal');
    render();
    return;
  }
  if (button.dataset.workflow) {
    state = openWorkflow(state, button.dataset.workflow);
    render();
    return;
  }
  if (button.dataset.workflowNext !== undefined) {
    state = advanceWorkflow(state);
    render();
    return;
  }
  if (button.dataset.workflowBack !== undefined) {
    state = rewindWorkflow(state);
    render();
    return;
  }
  if (button.dataset.workflowFinish !== undefined) {
    state = closeWorkflow(state);
    notify('Workflow demo completed');
    return;
  }
  if (button.dataset.closeWorkflow !== undefined) {
    state = closeWorkflow(state);
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
    else if (state.workflowId) state = closeWorkflow(state);
    else if (state.inspectorId) state = closeInspector(state);
    else if (state.mobileNavOpen) state = setMobileNavOpen(state, false);
    else return;
    render();
  }
});

render();
