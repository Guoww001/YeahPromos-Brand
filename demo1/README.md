# Demo 1：Merchant 红黑白经营工作台

该目录是 YeahPromos Merchant 端 Overview / Business Overview 的方案一 Demo。页面使用白色固定侧边栏代替顶部导航，以白色为背景、黑色承载主要信息、红色作为品牌强调，并按照产品框架展示经营指标、伙伴表现、佣金结算、伙伴关系、待办中心和快速操作。

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
- `Campaigns > All campaigns`：活动指标、Type / Channel 分列、状态筛选、进度和批量操作；
- `Commission & Rules > Attribution rules`：归因模型、渠道信用分配、归因规则表和审计历史；
- `Commission & Rules > Commission rules`：佣金规则列表、状态/伙伴类型/渠道筛选、规则详情、阶梯佣金和表现数据；
- `Finance > Balance & payments`：余额摘要、余额趋势、付款计划、掩码支付方式和近期 payout activity；
- 日期范围切换会同步切换整组模拟数据；
- Demo state 切换：正常、空数据、加载错误、权限受限和同步中；
- 伙伴详情右侧抽屉；
- 模块导航占位页，方便后续继续接入产品框架中的 P0 页面；
- 桌面、平板和手机响应式布局；
- 键盘焦点、`Esc` 关闭、跳过链接、Toast `aria-live` 和减少动画支持。

页面数据为展示用模拟数据，不会连接真实账号、支付、伙伴或交易接口。

## 视觉与颜色规则

Demo 1 使用白、黑、红三色构成品牌视觉；旧蓝色不得继续作为品牌强调色。

| Token / 用途 | Hex | 使用规则 |
| --- | --- | --- |
| 品牌主强调红 | `#E60000` | 唯一主红色。用于主按钮、链接、一级导航当前模块背景、面包屑一级文字、关键图标、图表主线和 `YEAHPROMOS` 标识中的字母 `P` |
| 深红交互态 | `#CD0200` | 仅用于红色按钮的 Hover、Active / Pressed 状态；不可替代主强调红 |
| 二级导航悬停/选中底色 | `#FDE8E8` | 用于二级菜单 Hover 和 Selected 的浅红背景，也可用于轻量提示背景 |
| 二级导航选中红 | `#FF312E` | 用于已选中二级菜单的文字、图标和左侧选中标记；不得替代品牌主强调红 |
| 页面与侧栏背景 | `#FFFFFF` | 主内容区和固定侧边栏均保持白色 |
| 主文字 | `#111111` | 标题、正文和主要图标；黑色承担主要信息层级 |
| 分隔线与边框 | `#E5E7EB` | 卡片边框、表格分隔线和侧边栏分隔线 |

### 面包屑层级

内容区顶部面包屑采用“一级模块 > 二级页面”的格式，例如 `Campaigns > All campaigns`：

- 一级模块 `Campaigns` 使用品牌主强调红 `#E60000`。
- 二级页面 `All campaigns` 使用主文字黑 `#111111`。
- 分隔符使用中性灰，不使用红色抢占层级。
- 当前页面使用 `aria-current="page"`，不得仅通过颜色表达当前位置。

### 侧栏层级与交互

| 导航层级 / 状态 | 背景 | 文字与图标 | 交互规则 |
| --- | --- | --- | --- |
| 一级默认 | `#FFFFFF` | `#111111` | 保持白底黑字 |
| 一级当前模块 | `#E60000` | `#FFFFFF` | 整行使用红底白字；图标和展开箭头同时变白 |
| 二级默认 | `#FFFFFF` 或透明 | `#111111` | 保持黑色文字，并通过缩进体现层级 |
| 二级 Hover | `#FDE8E8` | `#111111` | 鼠标悬停只改变浅红背景，不改变为白字 |
| 二级 Selected | `#FDE8E8` | `#FF312E` | 文字、图标和左侧选中标记使用选中红；同时设置 `aria-current="page"` |

- 一级红底状态只表示当前所在的主模块，不用于普通悬停。
- 二级选中项必须同时具备浅红背景、`#FF312E` 前景、左侧选中标记和语义属性，不能只依靠颜色。
- 键盘 Focus 不应与 Hover 混淆；在对应状态外增加清晰的 `2px solid #E60000` 焦点轮廓。
- 动画和颜色过渡应尊重 `prefers-reduced-motion`。

颜色使用约束：

- 红色只用于品牌强调和需要用户关注的操作，不用于大段正文。
- 成功、警告、错误和中性状态保留各自语义颜色，不得全部替换为品牌红。
- 不得仅依靠颜色表达状态；必须同时提供文字、图标、形状或其他可识别提示。
- 红色文字在白色背景上使用 `#E60000` 或更深颜色，以保持可读性；浅红 `#FDE8E8` 只作为背景色。
- 键盘焦点必须清晰可见；焦点轮廓可使用 `2px solid #E60000`，并与组件边缘保留间距。
- 新增组件应复用上述 Token，不得自行引入新的品牌红或旧蓝色强调。

### 演示数据与支付安全

- Demo 页面只能使用明确标注为演示用途的合成数据，不放入真实用户姓名、联系方式、账号凭证或业务导出数据。
- 支付页面只展示不可用于支付的掩码占位符；完整卡号、MM/YY、CVC、支付令牌和 webhook 凭证不得进入 HTML、JavaScript、日志或分析事件。
- `Deposit funds`、支付方式管理和自动付款按钮只保留产品接入占位交互，不收集或提交真实支付信息。

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
| `index.html` | Merchant 页面语义骨架、SVG 图标库、抽屉、状态选择器、活动页、归因规则页、佣金规则页和财务页 |
| `styles.css` | 视觉 Token、布局、组件、状态、动效和响应式样式 |
| `data.mjs` | 工作区、任务导航、时间范围快照、指标、伙伴、活动、归因规则、佣金规则和财务模拟数据 |
| `app-core.mjs` | 不依赖 DOM 的状态函数 |
| `app.js` | 数据渲染、模块导航、活动筛选、归因模型交互、佣金规则筛选/详情交互、财务趋势/付款交互、状态切换、抽屉和浏览器交互 |
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
