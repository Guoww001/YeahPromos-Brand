# Demo 3：暗色增长塔台

这是 YeahPromos Merchant 首页的原生静态展示 Demo。它将首页组织为一个“Signal Control Room”：连续业务信号、主业务轨迹、决策队列、伙伴动能、活动轨道、风险雷达和快捷指令共同组成运营判断界面。

## 技术方式

- 原生 HTML、CSS、JavaScript；
- 不使用 Vue、React、Vite 或其他构建框架；
- 演示数据和状态逻辑使用 ES Module；
- 使用本地 Plus Jakarta Sans 字体；
- 只用于页面展示与交互演示，不连接真实接口。

## 本地打开

```powershell
cd D:\Code\YeahPromos-Brand\demo3
python -m http.server 8788 --bind 127.0.0.1
```

打开：`http://127.0.0.1:8788/`

## 可演示交互

- 日期范围：Last 7 / 30 / 90 days；
- 主信号切换：Sales、Orders、Commission、Clicks；
- Demo 状态：Normal、Empty、Syncing、Error、Permission；
- 侧边栏任务域和二级菜单；
- 决策队列、风险、活动和快捷指令的模块跳转；
- 伙伴排行详情抽屉；
- 手机端侧边栏抽屉；
- Escape 关闭侧边栏或伙伴详情抽屉。

## 检查命令

```powershell
cd D:\Code\YeahPromos-Brand\demo3
node --test .\tests\*.test.mjs
node --check .\scripts\data.mjs
node --check .\scripts\state.mjs
node --check .\scripts\app.mjs
```

详细视觉、布局、状态、交互和验收规则见 [DESIGN_SPEC.md](./DESIGN_SPEC.md)。
