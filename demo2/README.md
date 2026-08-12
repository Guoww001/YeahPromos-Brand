# Demo 2：雾灰蓝 SaaS 商家工作台

该目录是 YeahPromos Merchant 端方案二 Demo。页面参考 `pb_manual_images` 的 PartnerBoost 工作台，但将视觉调整为雾灰蓝 SaaS 控制台：浅灰蓝背景、白色内容卡、克制蓝色高亮、筛选胶囊、趋势指标和右侧详情抽屉。

## 运行方式

在仓库根目录运行：

```powershell
python -m http.server 8776 --bind 127.0.0.1
```

打开：

```text
http://127.0.0.1:8776/demo2/
```

## 页面内容

- 固定侧边栏和商家工作区上下文；
- 雾灰蓝 SaaS 页面背景与白色数据卡片；
- 日期、品牌、伙伴类型和渠道筛选胶囊；
- Clicks、Orders、Gross Sales、Net Sales、Commission、Conversion、Total Payout 指标；
- 伙伴表现排行、佣金结算、伙伴关系状态；
- Action Center 和 Quick Actions；
- 日期范围切换、筛选切换、模块导航和伙伴详情抽屉；
- 正常、空数据、加载错误、权限受限和同步中状态；
- 桌面端、平板和手机响应式布局；
- 本地 Plus Jakarta Sans 字体，不请求在线字体。

## 检查命令

```powershell
node --test .\demo2\tests\*.test.mjs
node --check .\demo2\app.js
node --check .\demo2\data.mjs
node --check .\demo2\app-core.mjs
```
