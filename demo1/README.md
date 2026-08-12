# Demo 1：PartnerBoost 蓝白卡片工作台

该目录是 YeahPromos Amounts / Overview 页面的方案一 Demo。页面使用固定侧边栏代替原顶部导航，保留经营指标、广告主排行、佣金、商家状态和 New Arrivals 等业务模块。

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

端口可以替换为其他未占用端口。不要直接双击 `index.html`，浏览器可能会限制本地 ES Module 加载。

## 已实现内容

- 固定白色侧边栏和蓝色当前菜单；
- Reports、Amazon、Tools 子菜单展开与收起；
- 七张经营指标状态卡；
- Top 5 Advertisers 横向排行；
- Commission 和 Merchants 状态摘要；
- 六张 New Arrivals 商家卡片；
- 日期范围切换；
- 商家右侧详情抽屉；
- Apply / Applied 状态同步；
- 操作反馈 Toast；
- 桌面、平板和手机响应式布局；
- 键盘焦点、`Esc` 关闭和减少动画支持。

页面数据为展示用模拟数据，不会连接真实账号、支付或商家申请接口。

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
| `index.html` | 页面语义骨架、SVG 图标库、抽屉和 Toast 容器 |
| `styles.css` | 视觉 Token、布局、组件、动效和响应式样式 |
| `data.mjs` | 导航、指标、排行和商家模拟数据 |
| `app-core.mjs` | 无 DOM 依赖的状态函数 |
| `app.js` | 数据渲染、事件绑定和浏览器交互 |
| `tests/app-core.test.mjs` | 状态行为测试 |
| `tests/structure.test.mjs` | 结构、字体、响应式和无障碍规则测试 |

## 自动化检查

在仓库根目录运行：

```powershell
node --test .\demo1\tests\*.test.mjs
node --check .\demo1\app.js
node --check .\demo1\data.mjs
node --check .\demo1\app-core.mjs
```

## 迁移到 Vue

建议保持现有数据对象字段不变，并按下面的边界转换：

| 当前模块 | Vue 组件建议 |
| --- | --- |
| `.sidebar` | `SideNavigation.vue` |
| `.page-header` | `DashboardHeader.vue` |
| `.metrics-grid` | `MetricsStrip.vue` + `MetricCard.vue` |
| `.ranking-card` | `AdvertiserRanking.vue` |
| Commission 摘要 | `CommissionSummary.vue` |
| Merchants 摘要 | `MerchantStatus.vue` |
| `.merchant-card` | `MerchantCard.vue` |
| `.merchant-drawer` | `MerchantDetailDrawer.vue` |
| `.toast` | 全局 Toast 组件或 UI 库消息组件 |

迁移时把 `state` 替换为 Vue `reactive` 或 Pinia Store，把 `render*` 函数替换为模板循环，把事件监听器替换为 Vue 事件即可。CSS Token、DOM 层级和数据文件可以继续复用。
