# 框架确认清单

## 使用方法

请把每项状态从 `[ ]` 改为：

- `[x]` 同意
- `[-]` 暂不实现
- `[?]` 需要补充讨论

并把选择或说明直接写在该项下方。也可用仓库的 [Framework feedback](../.github/ISSUE_TEMPLATE/framework-feedback.md) 模板反馈。

---

## A. 范围与方法

- [x] 本阶段只冻结站内功能框架，不建立桌面或高保真 Demo。
- [x] 后续不同视觉方向必须共享同一页面、字段、状态、权限和核心任务。
- [x] 本项目不包含商家站外官网/营销页。
- [x] Amazon Attribution 等第三方后台页面不纳入 YeahPromos 站内实现，只定义集成和数据边界。
- [x] 原始手册图片包含敏感信息，不上传公开仓库；若需在线证据则另做去敏版本。

## B. 顶层信息架构

- [x] 使用任务导向顶层栏目：总览、招募与伙伴、活动、商品与推广资产、佣金与规则、数据与交易、财务、消息与通知、集成与设置。
- [x] 伙伴发现下保留“达人”和“媒体”两个视图，共享流程但保留不同画像字段。
- [x] Reports 的绩效、品牌、交易与 BRB 归入“数据与交易”。
- [x] Creatives 和部分 Tools 重新组合为“商品与推广资产”“佣金与规则”。
- [x] Newsletters 与站内信箱/通知归入“消息与通知”。
- [x] Payments 与 Payment Methods 分离：前者是财务流水，后者是设置。

## C. 伙伴与邀请关键决定

- [x] 将 In Relationship / Joined 统一为“合作中”。
- [x] 关注是独立标记，不作为合作生命周期状态。
- [x] Pending Partners、New Partners 和 Pending 统计卡进入同一申请审核队列。
- [x] 伙伴屏蔽的作用域是：`当前账号`。
- [x] 一个伙伴可同时加入：`多个组合`。
- [x] 已有未过期邀请时：`提醒后允许`。
- [x] 邀请拒绝后的再次邀请规则：______。
- [x] “奖励/Bonus”卡片动作的真实业务含义与是否保留：______。
- [x] 自动批准伙伴后续新渠道的默认值、适用范围和撤销方式：______。
- [x] 批量邀请需要保留：`邀请链接`。

## D. 活动模块（素材证据不足，必须补齐）

- [x] 保留 `Affiliate Program` 与 `Influencer Campaign` 两种产品类型。
- [x] 两者的业务差异是：______。
- [x] 活动最低状态采用：草稿、计划中、进行中、暂停、结束、归档。
- [x] 活动是否包含预算、交付物审批、内容审核和付款里程碑：______。
- [x] 活动工作区使用 Overview / Partners / Offers / Creatives / Communication / Performance 结构。

## E. 商品、优惠券与素材

- [x] Product Feed 是 Amazon 为主还是未来支持多店铺/多网络：______。
- [x] 商品同步与“手工维护”冲突时，以 ______ 为准。
- [x] Amazon Filter Rules 仅保留 White List，还是同时保留 Black List：______。
- [x] 优惠券 Public / Private 的作用域是全平台、组织、品牌还是计划：______。
- [x] Private 优惠券可指定：`单个伙伴 / 分组 / 活动`（全部）。
- [x] Texts/Emails 与 Newsletter Templates 的明确区别：______。
- [x] Banners/Images 需要支持的格式、尺寸、嵌入代码和审批：______。

## F. 佣金与合规规则

- [x] CPS 是 P0 并保留。
- [x] CPI：`保留 / 移除 / 后续阶段`（请选择）。
- [x] 佣金规则允许条件：Parent ASIN、SKU、Category、Partner、Customer Type、Coupon、Group。
- [x] 多条件逻辑需要：`AND + OR`（请选择）。
- [x] 多条规则冲突时的优先级：______。
- [x] 是否允许追溯修改已产生交易的佣金：______。
- [x] Performance Incentive 的规则定义：______。
- [x] Coupon Attribution、PPC Restriction、Link Parameters 的详细需求负责人和补充日期：______。

## G. 数据与交易

- [x] Performance By Brand 是独立页面，还是绩效分析的品牌保存视图：______。
- [x] P0 指标：Clicks、Orders、Commission、Gross Sales、Net Sales、Voids、EPC、Conversion、AOV、Network Fee、Total Payout。
- [x] 每个指标需要明确币种、归因口径、数据来源和刷新时间。
- [x] 保存报告与异步导出进入统一下载中心。
- [x] Add Transaction 的业务场景、权限与必填字段：______。
- [x] Bulk Approve/Void 的原因、审批和审计要求：______。
- [x] Transaction Inquiries 的申诉流程和 SLA：______。
- [x] Amazon BRB 是否继续独立页面，以及需要支持的市场：______。

## H. 财务

- [x] 余额不足在总览和财务页同时预警。
- [x] 允许充值的角色：_____。
- [x] 充值支持的支付方式和币种：______。
- [x] 发票的生成规则、抬头、税务字段和可下载期限：______。
- [x] 是否需要财务导出、退款和失败付款重试：______。

## I. 消息与通知

- [x] 站内 Message 使用统一会话，而不是每个模块各自一套消息。
- [x] 系统通知至少覆盖申请、邀请、同步、导出、交易、余额、付款和权限事件。
- [x] 邮件模板变量、版本、品牌/语言范围由系统管理。
- [x] 是否支持邮件群发、定时发送、退信和取消订阅：______。
- [x] 是否需要消息/邮件审批：______。

## J. 账号、品牌与权限

- [x] 组织与账号详情需要包含的法定、联系、账单、币种与时区字段：______。
- [x] 不让管理员为其他用户创建可见密码，改为邀请 + 用户自行设置密码/MFA。
- [x] 团队账号列表移除密码列，增加角色、品牌范围、状态、最近登录和 MFA。
- [x] 权限使用“角色模板 + 品牌范围 + 动作级例外”。
- [x] 默认角色模板：Owner、Brand Admin、Partnership Manager、Campaign Manager、Analyst、Finance、Developer、Viewer。
- [x] 高风险权限变更和 API 凭证操作需要审计，必要时重新验证身份。
- [-] 支持的集成：Amazon ______、Shopify ______、其他网络 ______。
- [-] API Credentials 和 API Docs 是否属于本次 P1：______。

## K. 去留待决模块

- [-] PBoost.AI 的明确任务与价值：______；如果无法定义，移除独立导航。
- [-] Recruitment Page 仅做站内配置；站外页面是否另立项目：______。
- [-] Multi-Network Manager 的目标网络和同步对象：______。
- [x] Tickets 是否为真实站内模块：______。
- [x] Dashboard 的 P0 待办与经营指标：______。

## L. Amazon 商家入驻与商品启用补充决定

- [?] 当前生产授权使用：指南 + 首页 URL 验证 / Profile + Storefront / 按账号类型分流。
- [?] 首版开放的 Campaign：CPS / CPI；Platform：Website / Mobile App。
- [?] 首版开放的 Tracking Provider：Amazon / Shopify / Shoplazza / WooCommerce / 网站嵌入 / API。
- [?] NA / EU / FE 与 marketplace/country 的正式映射：______。
- [?] 测试订单的触发方式、成功标准、超时和是否可跳过：______。
- [?] 站点从线下变在线的最小条件，以及是否允许人工强制上线：______。
- [?] 确认周期的准确业务语义、默认值和可选范围：______。
- [?] 自动批准的对象、站点/品牌作用域、默认值与撤销影响：______。
- [?] Amazon 商品只通过筛选规则增减；产品库通用 Add/Edit/Delete 对 Amazon 来源隐藏或禁用。
- [?] ASIN 是否强制以 B 开头；若支持其他合法 Amazon ASIN，兼容范围：______。
- [?] Black List 是否保留；与 White List 冲突时的优先级：______。
- [?] 每日商品同步的执行时区、SLA、失败重试和“立即同步”能力：______。
- [?] 手动维护仅适用于哪些非 Amazon 来源或紧急场景：______。
- [?] 充值支持的币种、最低/最高金额、汇率来源、费用承担方：______。
- [?] 支付宝个人账户、PayPal、银行卡保存/默认/自动付款的地区与角色限制：______。
- [?] 原始 Profile ID、Storefront URL、卡信息和支付身份的脱敏、保留期限与审计规则：______。

## M. 框架冻结标准

- [x] 所有 P0 栏目、页面、字段、动作和状态已确认。
- [x] 所有 `R` 项已明确为保留、删除或补需求，且有负责人。
- [x] 伙伴、邀请、活动、交易与付款状态机已确认。
- [x] 角色、品牌范围和敏感动作权限已确认。
- [x] 所有站外/第三方边界已确认。
- [x] 核心流程的成功、空、错误、权限、部分成功和并发分支已确认。
- [x] 建立 `framework-v1` 版本后，才进入不同风格高保真阶段。
