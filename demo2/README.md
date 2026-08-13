# Demo 2：方案六卡片化运营驾驶舱

该目录是 YeahPromos Merchant 端方案六 Demo。页面参考 `pb_manual_images` 中 PartnerBoost 的商家工作台框架，但将首页重构为“行动中心”：先看今日业务状态，再处理任务和风险，最后查看指标、伙伴表现与快捷操作。

## 视觉与布局

- 固定侧边栏，按伙伴、活动、产品、规则、数据和财务等任务域分组；
- 浅灰蓝画布、湖蓝 `#168C9B` 主色，橙色风险、绿色完成、紫色活动；
- 使用不规则 Bento 卡片布局，突出“指标 + 原因 + 操作”；
- 顶部展示问候、商家上下文、数据周期和工作区状态，不使用顶部主导航；
- 伙伴区域使用排行卡和详情抽屉，不使用密集表格；
- 使用本地 Plus Jakarta Sans 字体，不请求在线字体；
- 支持桌面端、平板和手机端，手机端侧边栏变为抽屉。

## 技术结构

- Vue 3 + Vite：`src/main.js`、`src/App.vue`；
- 响应式状态：`src/state/useDashboardStore.js`；
- 演示数据：`src/data/cockpit-data.js` 和现有 `data.mjs`；
- 组件：`src/components/`；
- 视觉 Token 和样式：`src/styles/`；
- Sites Worker 打包桥接：`site-runtime/package-build.mjs`。

## 运行方式

```powershell
cd D:\Code\YeahPromos-Brand\demo2
npm install
npm run dev
```

打开 `http://127.0.0.1:5173/`。

## 检查命令

```powershell
cd D:\Code\YeahPromos-Brand\demo2
npm test
npm run build
```

页面右上角的演示状态选择器可以检查正常、空数据、同步中、错误和权限受限状态；点击伙伴排行可以打开详情抽屉，点击侧边栏模块可以检查后续迁移用的页面占位路径。
