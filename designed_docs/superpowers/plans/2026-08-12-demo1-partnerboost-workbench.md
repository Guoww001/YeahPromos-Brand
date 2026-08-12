# Demo 1 PartnerBoost Blue Card Workbench Implementation Plan

> **For agentic workers:** REQUIRED SUB-SKILL: Use superpowers:subagent-driven-development (recommended) or superpowers:executing-plans to implement this plan task-by-task. Steps use checkbox (`- [ ]`) syntax for tracking.

**Goal:** 在 `demo1` 中实现方案一的可交互、可响应式、后续可迁移到 Vue 的原生 HTML/CSS/JS 页面。

**Architecture:** 页面使用静态 HTML 提供语义骨架，数据放在独立 ES Module 中，纯状态变更放在 `app-core.mjs`，浏览器 DOM 绑定放在 `app.js`。自动化测试使用 Node.js 内置 `node:test`，浏览器验证通过本地静态服务器完成。

**Tech Stack:** HTML5、CSS3、原生 JavaScript ES Modules、Node.js `node:test`

## Global Constraints

- 顶部全站导航必须改为固定左侧边栏。
- 保留现有业务模块和字段含义。
- 风格严格采用蓝白卡片工作台，不加入渐变、玻璃拟态或大面积深色区域。
- 英文和数字必须使用 `fonts` 目录中的本地 `Plus Jakarta Sans` WOFF2 文件，不请求在线字体。
- 页面在桌面、平板和移动端均保持侧边导航逻辑。
- Demo 不接入真实 API、登录、支付或商家申请流程。
- 数据和交互逻辑必须独立，便于后续转换成 Vue 组件。

---

## File Structure

- `demo1/index.html`：页面语义骨架、侧边栏、主内容容器、抽屉和 Toast 容器。
- `demo1/styles.css`：设计 Token、布局、组件状态、响应式和减少动态效果规则。
- `demo1/data.mjs`：导航、指标、排行、佣金、商家状态和新商家模拟数据。
- `demo1/app-core.mjs`：无 DOM 依赖的状态创建、日期切换、菜单展开、商家申请函数。
- `demo1/app.js`：渲染页面并绑定菜单、日期、抽屉、Apply、Toast 和移动侧边栏交互。
- `demo1/tests/app-core.test.mjs`：纯状态逻辑测试。
- `demo1/tests/structure.test.mjs`：HTML 结构、无障碍标记和 CSS 响应式规则测试。
- `demo1/README.md`：运行方式、交互范围和 Vue 迁移映射。
- `fonts/*.woff2`：由 Demo 只读引用的 Plus Jakarta Sans 400–800 字重字体资产。

### Task 1: Dashboard state and data contracts

**Files:**
- Create: `demo1/tests/app-core.test.mjs`
- Create: `demo1/app-core.mjs`
- Create: `demo1/data.mjs`

**Interfaces:**
- Produces: `createDashboardState(data) -> object`
- Produces: `selectPeriod(state, periodId) -> object`
- Produces: `toggleNavigationGroup(state, groupId) -> object`
- Produces: `applyMerchant(state, merchantId) -> { state, message }`

- [ ] **Step 1: Write the failing state tests**

```js
import test from 'node:test';
import assert from 'node:assert/strict';
import { applyMerchant, createDashboardState, selectPeriod } from '../app-core.mjs';

test('selectPeriod updates the selected period without mutating source state', () => {
  const source = createDashboardState({ periods: [{ id: '30d' }, { id: '90d' }], merchants: [] });
  const result = selectPeriod(source, '90d');
  assert.equal(source.selectedPeriod, '30d');
  assert.equal(result.selectedPeriod, '90d');
});

test('applyMerchant marks the merchant as applied and returns matching feedback', () => {
  const source = createDashboardState({ periods: [{ id: '30d' }], merchants: [{ id: 'appsumo', name: 'AppSumo' }] });
  const result = applyMerchant(source, 'appsumo');
  assert.equal(result.state.merchants[0].applied, true);
  assert.equal(result.message, 'Application sent to AppSumo');
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test demo1/tests/app-core.test.mjs`  
Expected: FAIL because `app-core.mjs` does not exist.

- [ ] **Step 3: Add minimal immutable state functions and dashboard mock data**

```js
export function createDashboardState(data) {
  return {
    ...structuredClone(data),
    selectedPeriod: data.periods[0]?.id ?? null,
    expandedGroups: [],
    activeMerchantId: null
  };
}

export function selectPeriod(state, periodId) {
  if (!state.periods.some((period) => period.id === periodId)) return state;
  return { ...state, selectedPeriod: periodId };
}

export function applyMerchant(state, merchantId) {
  const merchant = state.merchants.find((item) => item.id === merchantId);
  if (!merchant) return { state, message: 'Merchant not found' };
  return {
    state: { ...state, merchants: state.merchants.map((item) => item.id === merchantId ? { ...item, applied: true } : item) },
    message: `Application sent to ${merchant.name}`
  };
}
```

- [ ] **Step 4: Run tests and verify GREEN**

Run: `node --test demo1/tests/app-core.test.mjs`  
Expected: all state tests pass.

### Task 2: Semantic shell and visual components

**Files:**
- Create: `demo1/tests/structure.test.mjs`
- Create: `demo1/index.html`
- Create: `demo1/styles.css`
- Create: `demo1/app.js`

**Interfaces:**
- Consumes: `dashboardData` from `data.mjs`
- Consumes: state functions from `app-core.mjs`
- Produces: DOM hooks `[data-nav-item]`, `[data-period]`, `[data-merchant-id]`, `[data-drawer]`, `[data-toast]`

- [ ] **Step 1: Write failing structure tests**

```js
test('page provides the required sidebar and dashboard regions', () => {
  assert.match(html, /data-sidebar/);
  assert.match(html, /data-metrics-grid/);
  assert.match(html, /data-ranking-list/);
  assert.match(html, /data-merchants-grid/);
  assert.match(html, /data-drawer/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test demo1/tests/structure.test.mjs`  
Expected: FAIL because `index.html` does not exist.

- [ ] **Step 3: Implement HTML shell, render functions and full blue-card styles**

Implementation must render seven KPI cards, five advertisers, commission summary, merchant status, six merchant cards, a right-side detail drawer and a status Toast from the centralized data module.

- [ ] **Step 4: Run state and structure tests and verify GREEN**

Run: `node --test demo1/tests/*.test.mjs`  
Expected: all tests pass.

### Task 3: Accessibility and responsive behavior

**Files:**
- Modify: `demo1/tests/structure.test.mjs`
- Modify: `demo1/index.html`
- Modify: `demo1/styles.css`
- Modify: `demo1/app.js`

**Interfaces:**
- Produces: keyboard-closeable drawer, focus return, mobile sidebar overlay, reduced-motion support.

- [ ] **Step 1: Add failing assertions for labels, dialog semantics and media queries**

```js
test('page includes accessible drawer and responsive navigation rules', () => {
  assert.match(html, /role="dialog"/);
  assert.match(html, /aria-modal="true"/);
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /prefers-reduced-motion/);
});
```

- [ ] **Step 2: Run tests and verify RED**

Run: `node --test demo1/tests/structure.test.mjs`  
Expected: FAIL on the newly added accessibility or responsive assertion.

- [ ] **Step 3: Implement focus handling, Escape close, overlays and responsive rules**

Drawer open must move focus to its close button; closing must restore focus to the originating merchant action. Mobile navigation must remain a left-side drawer rather than a top navigation bar.

- [ ] **Step 4: Run complete automated tests and verify GREEN**

Run: `node --test demo1/tests/*.test.mjs`  
Expected: all tests pass with no warnings.

### Task 4: Runtime visual verification and handoff

**Files:**
- Create: `demo1/README.md`
- Modify: files above only when runtime inspection reveals a concrete issue.

**Interfaces:**
- Produces: documented local URL and Vue component mapping.

- [ ] **Step 1: Start a local static server**

Run: `python -m http.server 8765 --bind 127.0.0.1`  
Expected: server listens on `http://127.0.0.1:8765/demo1/` and can serve sibling assets from `fonts`.

- [ ] **Step 2: Verify desktop page visually and interactively**

Check at `1440 × 1000`: fixed sidebar, seven KPI cards, ranking card, two summary cards, merchant grid, period switching, drawer and Apply state synchronization.

- [ ] **Step 3: Verify mobile layout visually**

Check at `390 × 844`: side navigation opens as a left drawer, content has no horizontal overflow, KPI and merchant cards stack, merchant drawer fills the viewport.

- [ ] **Step 4: Write README and run final verification**

Run: `node --test demo1/tests/*.test.mjs`  
Expected: all tests pass.

Run: `git status --short`  
Expected: only intended `docs` and `demo1` files are untracked or modified.
