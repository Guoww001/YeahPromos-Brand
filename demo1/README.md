# Demo 1：Merchant 蓝白经营工作台

该目录是 YeahPromos Merchant 端 Overview / Business Overview 的方案一 Demo。页面使用固定侧边栏代替顶部导航，按照产品框架展示经营指标、伙伴表现、佣金结算、伙伴关系、待办中心和快速操作。

## 运行方式

该 Demo 使用原生 HTML、CSS 和 ES Modules，需要通过静态服务器访问。

在仓库根目录运行：

```powershell
python -m http.server 8766 --bind 127.0.0.1
```

然后打开：

```text
http://127.0.0.1:8766/demo1/
```

不要直接双击 `index.html`，浏览器可能会限制本地 ES Module 加载。

## 已实现内容

- Merchant workspace 账户上下文：品牌、店铺、币种、角色；
- 任务导向的固定侧边栏：伙伴、活动、商品资产、佣金规则、数据交易、财务、消息和设置；
- 七张 Merchant 经营指标卡：Clicks、Orders、Gross Sales、Net Sales、Commission、Conversion、Total Payout；
- Top performing partners 伙伴表现排行；
- Commission 结算摘要和 Partner relationship 状态摘要；
- Action center：申请审核、商品同步、活动启动、交易审批；
- 快速操作：邀请伙伴、创建活动、添加商品、添加优惠券和导出报告；
- 日期范围切换会同步切换整组模拟数据；
- Demo state 切换：正常、空数据、加载错误、权限受限和同步中；
- 伙伴详情右侧抽屉；
- 模块导航占位页，方便后续继续接入产品框架中的 P0 页面；
- 桌面、平板和手机响应式布局；
- 键盘焦点、`Esc` 关闭、跳过链接、Toast `aria-live` 和减少动画支持。

页面数据为展示用模拟数据，不会连接真实账号、支付、伙伴或交易接口。

## 本地字体

页面通过 `@font-face` 加载仓库 `fonts` 目录中的 Plus Jakarta Sans：

- 400 Regular
- 500 Medium
- 600 SemiBold
- 700 Bold
- 800 ExtraBold

页面不会请求在线字体。中文内容会自动回退到系统中文字体。

## 文件职责

| 文件 | 职责 |
| --- | --- |
| `index.html` | Merchant 页面语义骨架、SVG 图标库、抽屉、状态选择器和占位页 |
| `styles.css` | 视觉 Token、布局、组件、状态、动效和响应式样式 |
| `data.mjs` | 工作区、任务导航、时间范围快照、指标、伙伴和待办模拟数据 |
| `app-core.mjs` | 不依赖 DOM 的状态函数 |
| `app.js` | 数据渲染、模块导航、筛选、状态切换、抽屉和浏览器交互 |
| `tests/app-core.test.mjs` | 时间范围、导航展开和 Demo 状态行为测试 |
| `tests/structure.test.mjs` | Merchant 结构、字体、响应式和无障碍规则测试 |

## 自动化检查

在仓库根目录运行：

```powershell
node --test .\demo1\tests\*.test.mjs
node --check .\demo1\app.js
node --check .\demo1\data.mjs
node --check .\demo1\app-core.mjs
```

## 迁移到 Vue

当前 Demo 的数据和页面边界已经可以直接迁移到 Vue，但建议先保持数据字段和交互语义不变：

| 当前模块 | Vue 组件建议 |
| --- | --- |
| `.sidebar` | `SideNavigation.vue` |
| `.page-header` | `WorkspaceHeader.vue` |
| `.metrics-grid` | `MetricsStrip.vue` + `MetricCard.vue` |
| `.ranking-card` | `PartnerPerformance.vue` |
| `[data-commission-summary]` | `CommissionSummary.vue` |
| `[data-partner-status]` | `PartnerRelationshipSummary.vue` |
| `[data-action-center]` | `ActionCenter.vue` + `ActionCard.vue` |
| `[data-quick-actions]` | `QuickActions.vue` |
| `.merchant-drawer` | `PartnerDetailDrawer.vue` |
| `.module-placeholder` | `ModulePreview.vue` |

迁移时可以把 `state` 替换为 Vue `reactive` 或 Pinia Store，把 `render*` 函数替换为模板循环，把导航和模块状态交给 Vue Router。CSS Token、字体和数据快照可以继续复用。
