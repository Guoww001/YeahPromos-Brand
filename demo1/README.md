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
- `Commission & Rules > Coupon attribution`：优惠券归属、跟踪链接冲突、优先级、回退规则、人工复核和归因审计；
- `Commission & Rules > Commission rules`：佣金规则列表、状态/伙伴类型/渠道筛选、规则详情、阶梯佣金和表现数据；
- `Commission & Rules > Restriction rules`：原有 PPC 限制规则列表、关键词/品牌词、搜索渠道、地区、伙伴范围、违规处理和规则详情；
- `Commission & Rules > PPC`：当前 PPC 规则列表、关键词/品牌词、搜索渠道、地区、伙伴范围、Block / Allow / Review 冲突优先级、违规处理和审计详情；
- `Finance > Balance & payments`：余额摘要、余额趋势、付款计划、掩码支付方式和近期 payout activity；
- `Finance > Transaction history`：Total Sales、Locked / Total / Estimated Commission 摘要卡、十组交易筛选、Order ID / SKU / UID 搜索、交易表格、商品展开、批量审批/作废、CSV 导出和分页；
- `Help center > Help center`：帮助分类、热门文章搜索、联系客服、工单入口和系统状态摘要；
- `Integrations & Settings > API credentials`：Live/Test 环境切换、掩码 API 凭证表、状态筛选、Webhook endpoint 管理和安全提示；
- `Integrations & Settings > Brand integration`：已连接品牌摘要、Shopify / WooCommerce / Amazon / Web Analytics 集成状态、同步健康摘要和近期活动；
- `Integrations & Settings > Team accounts`：成员席位摘要、邀请队友、名称/用户名搜索、角色/状态/品牌筛选、编辑/停用占位操作和分页；
- `Integrations & Settings > Recruitment page`：招募页启停、品牌与申请队列、公开链接、页面文案、申请字段和实时公开页预览；
- `Messages & Notifications > All Messages`：消息分类、搜索/筛选、伙伴会话、附件、回复编辑器、伙伴详情和分页；
- `Products & Assets > Banners & images`：资产分类、文件夹/活动/状态筛选、名称或标签搜索、网格/列表视图、资产选中态、详情面板和分页占位交互；
- `Products & Assets > Coupons`：日期范围、状态、Permission、Category 和关键词筛选，优惠码表格、使用量、状态标签、选择、编辑/删除入口和分页占位交互；
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

### 收回式侧栏与交互反馈

- 桌面端侧栏右上角提供收回/展开按钮。收回后保留品牌 `P`、导航图标、帮助、设置与账号头像；主内容区会同步扩展。
- 收回状态下，一级导航图标仍保留可读的 `aria-label` 与悬停标题；二级菜单不参与键盘焦点。
- 键盘焦点和鼠标激活使用克制的红色边框反馈：`#E60000` 焦点轮廓配合浅红外环，点击时短暂出现 `#FF312E` 的 border beam。
- 卡片与导航保持平面、信息密度优先的经营工具风格，避免持续发光、夸张圆角或装饰性渐变。

颜色使用约束：

- 红色只用于品牌强调和需要用户关注的操作，不用于大段正文。
- 成功、警告、错误和中性状态保留各自语义颜色，不得全部替换为品牌红。
- 不得仅依靠颜色表达状态；必须同时提供文字、图标、形状或其他可识别提示。
- 红色文字在白色背景上使用 `#E60000` 或更深颜色，以保持可读性；浅红 `#FDE8E8` 只作为背景色。
- 键盘焦点必须清晰可见；焦点轮廓可使用 `2px solid #E60000`，并与组件边缘保留间距。
- 新增组件应复用上述 Token，不得自行引入新的品牌红或旧蓝色强调。

### 可读性与无障碍 / Readability & accessibility

新增或改造页面必须把可读性作为布局约束，而不是最后的视觉微调：

- 主要正文、表格数据和表单控件文字使用 `12px` 及以上；表格表头、状态标签、图表轴与辅助说明不小于 `11px`。
- 页面内不使用低于 `11px` 的可读文字；任何承载关键含义的文字必须保持与背景的足够对比度。
- 图表说明文字使用常规或中等字重（`400–600`）；数值可强调，但不使用过重字重造成视觉噪声。标题与正文的层级应通过字号、间距和结构共同表达。
- 正文和数据行使用至少 `1.35` 的行高；放大字号后必须同步检查截断、重叠、表格横向滚动和移动端换行。
- 文字与背景应保持清晰对比；状态不得只靠颜色表达，必须同时提供文字、图标、形状或辅助技术语义。
- 所有交互控件必须保留清晰的键盘焦点轮廓；页面在窄屏和放大浏览场景下仍应能读出标题、字段名、状态和数值。
- Finance 页面中的图表轴、Tooltip、付款表格、状态标签和辅助说明遵循以上规则；不得为了压缩卡片高度再次降低字号。
- Transaction history 页面中的摘要卡、十组筛选器、订单表格、Commission / Status 标签、商品展开和批量操作遵循以上字号与行高约束；表格在窄屏保持横向滚动，危险的 Approve / Void 操作只保留带审计原因的占位入口。
- Invoices 页面中的日期控件、筛选器、发票表格、状态标签和操作按钮同样遵循以上字号与行高约束；表格在窄屏保持横向滚动，不通过缩小文字来塞入所有字段。
- Help center 的搜索框支持键盘 `/` 快捷键；文章、分类、支持入口和系统状态均提供可读文本，不把颜色作为唯一状态线索。
- API credentials 的搜索、状态筛选、环境切换、复制、轮换和撤销入口均保留文字标签、键盘焦点和 `aria-label`；密钥与 Webhook 地址只展示掩码占位符，不展示可用凭证。
- Brand integration 的连接状态、同步时间、数据范围、数据状态、Manage / Reconnect 与活动日志均提供文字、图标和语义标签，不只依赖颜色；品牌域名入口与 Add integration 入口保留键盘焦点。
- Team accounts 的席位摘要、邀请、搜索、筛选、分页、MFA 语义和 Edit / Deactivate 均提供文字、可读标签和键盘焦点；不展示密码字段。
- Recruitment page 的启停开关、品牌/队列选择、公开链接复制、文案字段、申请字段和 Preview / Save 操作均提供文字标签、键盘焦点与状态语义；预览不会提交真实申请。
- Messages & Notifications 的消息列表、未读标记、状态标签、会话正文、附件和回复编辑器遵循以上字号与行高约束；未读状态同时提供文字、圆点和语义属性，不只依靠颜色。
- Banners & images 的资产卡片、筛选器、搜索框、状态标签、分页和右侧详情面板遵循以上字号与行高约束；选中、Active、In use 和 Draft 状态同时提供文字、边框、圆点或语义属性，不只依靠颜色。
- Coupons 的日期范围、筛选器、关键词搜索、优惠码表格、使用量、状态标签和操作按钮遵循以上字号与行高约束；Active、Scheduled、Expired 同时提供文字、圆点、边框或语义属性，不只依靠颜色。
- Restriction rules 的关键词/品牌词、Policy、渠道、地区、伙伴范围、有效期、状态标签和详情面板遵循以上字号与行高约束；Block、Allow、Review、Active、Pending 等状态同时提供文字、圆点、浅色背景或语义属性，不只依靠颜色。
- Coupon attribution 的优惠券范围、Match type、Priority、Fallback、Lookback、Conflict outcome 和详情面板遵循以上字号与行高约束；Primary signal、Assisted link only、Link fallback、Manual resolution 和 No commission 同时提供文字、圆点、浅色背景或语义属性，不只依靠颜色。
- PPC 的关键词/品牌词、Match type、Policy、渠道、地区、伙伴范围、Violation action、有效期、状态标签和决策优先级遵循以上字号与行高约束；Block、Allow、Review、Active、Pending、Inactive、Expired 同时提供文字、圆点、浅色背景或语义属性，不只依靠颜色。

### 对比度与灰阶 / Contrast & grayscale

可读文字必须使用足够深的中性灰，不能用浅灰压缩信息层级：

- Finance 主要数据使用 `#1F2937`，正文和表格数据使用 `#374151`，辅助说明、图表轴和 Tooltip 使用 `#4B5563`；`#6B7280` 及更浅颜色仅用于禁用态或非信息性装饰。
- Transaction history 使用 `#1F2937` 承载摘要数值、Order ID 和金额，`#374151` 承载订单字段与表格数据，`#4B5563` 承载筛选器、日期和辅助说明；Paid / Pending / Void 同时使用文字、圆点和浅色背景表达，不只依赖颜色。
- 白色背景上的普通文字以至少 `4.5:1` 的对比度目标进行设计；放大字号不能替代足够的颜色对比度。
- 成功、信息等语义色也必须使用较深的文字色，并搭配浅色背景、文字或图标，不能只依靠颜色区分状态。
- 新增 Finance 组件不得重新引入 `#69758C`、`#748198`、`#7C889C`、`#8994A7` 等低对比度灰色作为可读文字。
- Messages & Notifications 使用 `#1F2937` 承载标题和重要字段，`#374151` 承载正文与列表数据，`#4B5563` 承载辅助说明；红色只用于当前导航、未读提示、主操作和焦点，不用浅灰表达关键内容。
- Brand integration 使用 `#1F2937` 承载品牌名、集成名称和关键数值，`#374151` 承载数据范围与活动信息，`#4B5563` 承载同步时间和字段说明；Connected / Warning 额外保留文字和状态点，避免只依靠颜色。
- Team accounts 使用 `#1F2937` 承载成员名、用户名和关键数值，`#374151` 承载角色、品牌权限和表格数据，`#4B5563` 承载最后活跃时间与字段说明；Active / Pending 保留深色文字、状态点和浅色背景。
- Recruitment page 使用 `#1F2937` 承载设置标题、公开页标题和字段名，`#374151` 承载表单正文与说明，`#4B5563` 承载 URL、辅助说明和队列提示；Published / Disabled 通过深色文字、状态点和浅色背景共同表达。
- Banners & images 使用 `#1F2937` 承载资产名称和详情字段，`#374151` 承载文件信息，`#4B5563` 承载筛选器、文件夹和说明文字；Active、In use、Draft 使用深色文字配浅色背景，并保留文字标签和圆点语义。
- Coupons 使用 `#1F2937` 承载优惠码和主要 Offer，`#374151` 承载分类、有效日期和使用量，`#4B5563` 承载筛选器、最低消费和辅助说明；Active、Scheduled、Expired 使用深色文字配浅色背景，并保留文字标签和圆点语义。
- Restriction rules 使用 `#1F2937` 承载规则名称、ID 和详情字段，`#374151` 承载关键词、渠道、地区和伙伴范围，`#4B5563` 承载筛选器、辅助说明和更新时间；Block、Allow、Review 与 Active、Pending、Inactive、Expired 使用深色文字配浅色背景，并保留文字、圆点和状态语义。
- Coupon attribution 使用 `#1F2937` 承载规则名、规则 ID、优先级和主要决策，`#374151` 承载优惠券范围、匹配类型、回退方式和冲突说明，`#4B5563` 承载筛选器、Lookback 和更新时间；状态与冲突结果使用深色文字配浅色背景，并保留文字、圆点和状态语义。
- PPC 使用 `#1F2937` 承载规则名、ID、决策优先级和详情字段，`#374151` 承载关键词、渠道、地区、伙伴范围和条件，`#4B5563` 承载筛选器、违规处理和更新时间；Block、Allow、Review 与 Active、Pending、Inactive、Expired 使用深色文字配浅色背景，并保留文字、圆点和状态语义。

### Commission & Rules 业务规则 / Business rules

#### Coupon attribution

- 订单先校验优惠券是否有效、处于活动期、适用于商品/活动范围且未被撤销；取消或全额退款订单不产生伙伴归因。
- 有效且唯一匹配的伙伴专属优惠码拥有最高优先级，100% 的伙伴佣金归优惠码所有者；同一订单只允许一个 primary commission。
- 伙伴优惠码与有效跟踪链接同时出现时，优惠码所有者获得 primary credit，跟踪链接伙伴只保留 assisted touch，不再叠加第二笔 primary commission。
- 公共优惠码没有伙伴所有权时，不直接产生伙伴佣金；若存在 30 天 click lookback 内的有效伙伴点击，则回退到最近一次有效点击。
- 无效或过期优惠码被忽略并记录 fallback reason；两个或以上伙伴专属优惠码同时匹配时进入人工复核，在决策前不最终结算佣金。
- 每次决策记录 Order ID、Coupon code、Partner UID、匹配类型、命中的规则、回退原因、操作者和时间，支持审计与申诉。

#### PPC

- 规则匹配顺序为：最具体的伙伴 + 活动 + 地区范围优先；同等范围下 `Block` 覆盖 `Allow`，证据不完整时进入 `Review`。
- 品牌词和竞品词默认 `Block`；未被显式允许的新品牌词不自动放行。伙伴不得通过 paid search 直接投向商家站点绕过已批准的链接或落地页。
- Generic keyword 只有在渠道、地区、伙伴范围和落地页全部满足条件时才 `Allow`；Coupon / promo 词按专门规则进入 `Review` 或 `Block`，不能套用 generic keyword 的允许结果。
- `Block` 记录关键词、渠道、地区、伙伴、落地页和规则 ID并阻断流量；`Review` 暂停最终批准并创建人工复核项；`Allow` 仍保留检查记录。
- 未提供落地页、关键词证据或伙伴授权信息时不得自动批准；所有决策、规则优先级和违规处理结果写入 PPC 审计记录。

### 演示数据与支付安全

- Demo 页面只能使用明确标注为演示用途的合成数据，不放入真实用户姓名、联系方式、账号凭证或业务导出数据。
- 支付页面只展示不可用于支付的掩码占位符；完整卡号、MM/YY、CVC、支付令牌和 webhook 凭证不得进入 HTML、JavaScript、日志或分析事件。
- API credentials 页面只使用 `••••` 掩码、合成的 key suffix 和不可访问的 Webhook 占位 URL；创建、复制、轮换、撤销和一次性密钥展示均为产品接入占位交互，不写入真实 secret。
- Brand integration 页面只使用 Demo Store、`demo-store.com` 与合成的同步统计；Add integration、Manage、Reconnect、域名详情和活动日志均为产品接入占位交互，不连接真实店铺、市场或分析服务。
- Team accounts 只使用合成成员、用户名和席位数据；邀请、编辑、停用、重置访问等均为占位交互，不展示密码或真实账号信息。
- Recruitment page 只使用 Demo Brand、`partners.yeahpromos.com/demo-brand` 和合成的页面配置；Preview、Copy link、启停、Save changes 与申请按钮均为占位交互，不发布公开页面、不发送邮件、不创建真实申请。
- Transaction history 只使用合成订单、商品、佣金和国家数据；Approve / Void、Export CSV、Add transaction、商品展开和行操作均为产品接入占位交互，不提交真实交易、不导出业务数据。
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
| `index.html` | Merchant 页面语义骨架、SVG 图标库、抽屉、状态选择器、活动页、归因规则页、Coupon attribution、佣金规则页、Restriction rules、PPC、发票页、财务页、Transaction history、Help center、Team accounts、Recruitment page、Brand integration、API credentials、Messages & Notifications、Coupons 和 Products & Assets 页面 |
| `styles.css` | 视觉 Token、布局、组件、状态、动效和响应式样式 |
| `data.mjs` | 工作区、任务导航、时间范围快照、指标、伙伴、活动、归因规则、Coupon attribution、佣金规则、Restriction rules、PPC、发票、财务、Transaction history、Help center、Team accounts、Recruitment page、Brand integration、API credentials、Messages & Notifications、Coupons 和 Banners & images 模拟数据 |
| `app-core.mjs` | 不依赖 DOM 的状态函数 |
| `app.js` | 数据渲染、模块导航、活动筛选、归因模型交互、Coupon attribution 搜索/筛选/选择/优先级详情交互、佣金规则筛选/详情交互、Restriction rules 与 PPC 的筛选/选择/详情交互、发票筛选/下载交互、财务趋势/付款交互、Transaction history 搜索/筛选/选择/商品展开/批量操作/导出/分页交互、Help center 搜索/文章交互、Team accounts 搜索/筛选/邀请/编辑/停用/分页交互、Recruitment page 启停/品牌/队列/文案/申请字段/预览交互、Brand integration 集成管理/重连/活动交互、API credentials 环境/筛选/复制/轮换交互、Messages & Notifications 标签/搜索/回复/伙伴交互、Coupons 日期/筛选/搜索/选择交互、Banners & images 分类/筛选/搜索/详情交互、状态切换、抽屉和浏览器交互 |
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
