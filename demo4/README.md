# Demo 4 · Brand Pulse

这是一个用于视觉评审的原生 HTML/CSS/JavaScript 演示，主题方向为“白色品牌编辑台”：以白底黑字为基础，通过品牌洋红、珊瑚红、薄荷绿和数据蓝建立信息层级。

## 本地打开

请在 `demo4` 目录运行静态服务器：

```powershell
python -m http.server 8790 --bind 127.0.0.1
```

然后访问 `http://127.0.0.1:8790/`。因为页面使用 ES Modules，不建议直接双击 `index.html`。

## 演示内容

- 左侧栏替代原顶部导航，并按业务域分组。
- Overview 使用 Growth Ribbon、经营原因、待办优先级与伙伴/活动表现组成行动总览。
- 其余页面按四种骨架呈现：档案页、流程画布、运营台账、连接矩阵。
- 点击卡片或数据行可打开右侧详情检查器。
- `Ctrl/Cmd + K` 可打开全局命令面板。
- 顶部的 Demo State 可切换正常、加载、空白、错误、权限不足和成功状态。

## 文件结构

- `index.html`：页面入口。
- `styles/`：设计令牌、全局样式、应用外壳和模块样式。
- `scripts/data.mjs`：全部演示数据。
- `scripts/state.mjs`：页面状态与纯状态转换函数。
- `scripts/render.mjs`：Overview 与四种页面骨架的渲染。
- `scripts/app.mjs`：事件代理、键盘操作和交互入口。
- `fonts/`：本地 Plus Jakarta Sans 字体。
- `tests/`：数据、状态和页面结构测试。

## 后续迁移建议

迁移到 Vue 时，可将侧边栏、顶部工具区、状态横幅、详情检查器和命令面板拆为公共组件；四类页面骨架拆为布局组件；`data.mjs` 替换为接口层，`state.mjs` 的状态迁移到 Pinia 或组合式函数。视觉令牌可直接保留为全局 CSS Variables。
