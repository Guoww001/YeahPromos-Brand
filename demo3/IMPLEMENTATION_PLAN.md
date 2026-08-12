# Demo 3 原生增长塔台实施计划

**目标：** 使用原生 HTML、CSS 和 JavaScript，把 `DESIGN_SPEC.md` 中的暗色增长塔台落地为可展示、可交互的静态 Demo。

**架构：** `scripts/data.mjs` 提供演示数据，`scripts/state.mjs` 提供纯状态工厂和更新函数，`scripts/app.mjs` 负责 DOM 渲染与事件绑定。`index.html` 只承载语义结构与应用挂载点，`styles/` 按 Token、全局规则和塔台页面样式拆分。

**约束：** 不使用 Vue、React、Vite 或在线字体；所有实现都在 `demo3` 内；只使用本地 Plus Jakarta Sans；页面需支持导航、日期切换、指标切换、任务跳转、伙伴抽屉和正常/空/同步/错误/权限演示状态。

## 任务

1. 创建 Node 测试、数据和状态接口；先确认测试因模块不存在而失败。
2. 实现数据模型和状态工厂，覆盖时间范围、导航、面板、任务和演示状态。
3. 实现 HTML 应用壳和 JavaScript 渲染层，提供 Flight Strip、信号轨迹、决策队列、伙伴排行、活动轨道与风险雷达。
4. 实现暗色 Token、双层面板、响应式和减少动画规则。
5. 运行测试、语法检查和浏览器验收，检查桌面端、390px 端及核心交互。
