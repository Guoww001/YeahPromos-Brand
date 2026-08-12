# 方案二：雾灰蓝 SaaS 控制台 Implementation Plan

> **For agentic workers:** 本计划在当前会话内直接执行，所有 demo 产物均位于 `demo2` 目录。

**Goal:** 新建一个独立的 YeahPromos Merchant 工作台 demo，用雾灰蓝 SaaS 视觉替代 demo1 的蓝白经营看板，同时保留侧边栏导航、指标、伙伴表现、佣金、待办、详情抽屉和演示状态。

**Architecture:** 继续使用原生 HTML、CSS 和 ES Modules，不引入框架或在线依赖。`data.mjs` 负责模拟数据，`app-core.mjs` 负责无 DOM 状态变换，`app.js` 负责渲染和交互，`styles.css` 负责方案二的视觉 Token、布局、响应式和状态。

**Tech Stack:** HTML5、CSS3、原生 ES Modules、Node.js `node:test`、仓库 `fonts` 目录中的 Plus Jakarta Sans。

## Global Constraints

- 所有 demo 文件放在 `D:\Code\YeahPromos-Brand\demo2`。
- 不修改 `demo1`、根目录字体和产品文档。
- 保留固定侧边栏、移动端侧边栏抽屉、日期切换、演示状态、模块占位页和伙伴详情抽屉。
- 方案二必须使用雾灰蓝背景、白色内容卡、克制蓝色主色、筛选胶囊和 SaaS 数据工作区布局。
- 不请求在线字体；不连接真实接口；数据仅用于演示。
- 页面需支持键盘焦点、Esc 关闭抽屉、减少动画和移动端响应式布局。

### Task 1: 建立失败测试与目录

**Files:**
- Create: `demo2/tests/structure.test.mjs`
- Create: `demo2/tests/app-core.test.mjs`

先验证 demo2 尚未存在，再实现页面和状态模块。

### Task 2: 页面骨架、模拟数据和状态模块

**Files:**
- Create: `demo2/index.html`
- Create: `demo2/data.mjs`
- Create: `demo2/app-core.mjs`
- Create: `demo2/app.js`

沿用产品信息架构，页面包括商家上下文、指标、筛选工具栏、伙伴表现、佣金摘要、伙伴关系、Action Center、Quick Actions、模块占位和伙伴详情抽屉。

### Task 3: 方案二视觉和响应式

**Files:**
- Create: `demo2/styles.css`

实现 `#F4F7FA` 雾灰蓝背景、白色卡片、蓝色选中导航、指标趋势线、筛选胶囊、表格区域、右侧抽屉和移动端重排。

### Task 4: 验证

运行：

```powershell
node --test .\demo2\tests\*.test.mjs
node --check .\demo2\app.js
node --check .\demo2\data.mjs
node --check .\demo2\app-core.mjs
```

然后通过本地静态服务器检查桌面端、移动端、日期切换、状态切换、导航和详情抽屉。
