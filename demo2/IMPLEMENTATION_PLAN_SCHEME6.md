# 方案六：卡片化运营驾驶舱 Implementation Plan

> **For agentic workers:** 本计划在当前会话内直接执行，所有产品文件和构建入口均位于 `demo2` 目录。

**Goal:** 将 `demo2` 从原生 HTML/CSS/JS 的 SaaS 数据页重构为 Vue 3 + Vite 的卡片化运营驾驶舱，同时保留商家工作台的侧边栏、数据、待办、风险、伙伴抽屉和演示状态。

**Architecture:** 使用 Vue 3 单页组件架构，`MerchantLayout` 负责应用壳，`useDashboardStore` 负责响应式状态，驾驶舱组件负责各类任务卡片。Vite 输出客户端资源，站点运行入口继续由 Cloudflare Worker 负责静态资源分发，确保现有 Sites URL 可以升级版本而不改变地址。

**Tech Stack:** Vue 3、Vite、原生 CSS、Node.js `node:test`、本地 Plus Jakarta Sans。

## Global Constraints

- 只修改 `D:\Code\YeahPromos-Brand\demo2` 的实现文件和 demo2 站点发布配置。
- 保留固定侧边栏和移动端侧边栏抽屉，不恢复顶部主导航。
- 视觉使用方案六：浅灰蓝背景、湖蓝 `#168C9B`、橙色风险、绿色完成、紫色活动。
- 首页优先表达今日业务状态、待处理任务、风险提醒和下一步操作，不做纯指标陈列。
- 使用 Bento 卡片布局；伙伴区域以排行卡和状态卡为主，避免过密表格。
- 保留日期切换、筛选、模块占位、伙伴详情抽屉、空数据/错误/权限/同步状态。
- 不请求在线字体，不连接真实接口，所有数据仍为演示数据。
- 所有动效使用 GPU 安全的 `transform` 和 `opacity`，支持 `prefers-reduced-motion`。

### Task 1: Vue 构建基础和失败测试

**Files:**
- Modify: `demo2/package.json`
- Create: `demo2/vite.config.js`
- Create: `demo2/index.html`
- Create: `demo2/tests/scheme6.test.mjs`

先定义 Vue/Vite 入口、构建输出和方案六所需组件契约，再运行测试确认组件和状态模块尚未实现。

### Task 2: 状态层和数据层

**Files:**
- Create: `demo2/src/state/useDashboardStore.js`
- Create: `demo2/src/data/cockpit-data.js`
- Create: `demo2/tests/dashboard-store.test.mjs`

使用 `reactive`、`computed` 和工厂函数管理日期、导航、筛选、任务、风险、抽屉和 Demo 状态。

### Task 3: Vue 组件和页面骨架

**Files:**
- Create: `demo2/src/main.js`
- Create: `demo2/src/App.vue`
- Create: `demo2/src/components/Icon.vue`
- Create: `demo2/src/components/SidebarNav.vue`
- Create: `demo2/src/components/WorkspaceHeader.vue`
- Create: `demo2/src/components/TodayStatus.vue`
- Create: `demo2/src/components/TaskCard.vue`
- Create: `demo2/src/components/MetricCard.vue`
- Create: `demo2/src/components/PartnerRanking.vue`
- Create: `demo2/src/components/RiskPanel.vue`
- Create: `demo2/src/components/QuickActions.vue`
- Create: `demo2/src/components/PartnerDrawer.vue`
- Create: `demo2/src/components/ModulePlaceholder.vue`

将运营驾驶舱拆成可迁移到正式产品的组件，所有事件通过 props/emits 或状态层传递。

### Task 4: 视觉系统、响应式和站点构建

**Files:**
- Create: `demo2/src/styles/tokens.css`
- Create: `demo2/src/styles/global.css`
- Create: `demo2/src/styles/scheme-six.css`
- Create: `demo2/site-runtime/package-build.mjs`
- Modify: `demo2/site-runtime/index.mjs`
- Modify: `demo2/README.md`

建立方案六的 Token、Bento 网格、运营卡片、移动端单列布局和 Sites 构建复制流程。

### Task 5: 验证和发布

运行：

```powershell
npm install
npm test
npm run build
```

再检查桌面端、390px 移动端、导航、日期切换、任务操作、风险卡、伙伴抽屉和站点部署。
