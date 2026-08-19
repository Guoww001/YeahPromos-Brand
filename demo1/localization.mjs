const LOCALE_STORAGE_KEY = 'yeahpromos-demo1-locale';
const CHINESE_LOCALE = 'zh-CN';

const translations = {
  'shell.primaryNavigation': '主导航',
  'shell.merchantWorkspace': '商家工作台',
  'page.overview.title': '业务概览',
  'page.overview.description': '查看联盟计划表现与合作伙伴动态。',
  'document.title': '业务概览 · YeahPromos',
  'document.description': 'YeahPromos 商家经营概览演示',
};

const navigationTranslations = {
  overview: '概览',
  'recruitment-partners': '招募与合作伙伴',
  'discover-influencers': '发现影响者',
  'discover-publishers': '发现发布者',
  'my-partners': '我的合作伙伴',
  applications: '申请',
  'invite-history': '邀请记录',
  campaigns: '活动',
  'all-campaigns': '全部活动',
  'affiliate-programs': '联盟计划',
  'influencer-campaigns': '影响者活动',
  'products-assets': '商品与素材',
  'product-feed': '商品数据源',
  coupons: '优惠券',
  'banners-images': '横幅与图片',
  videos: '视频',
  'commission-rules': '佣金与规则',
  'commission-rules-list': '佣金规则',
  'attribution-rules': '归因规则',
  'restriction-rules': '限制规则',
  ppc: 'PPC',
  'data-transactions': '数据与交易',
  performance: '表现',
  'performance-brand': '按品牌查看表现',
  transactions: '交易',
  'amazon-brb': 'Amazon BRB',
  finance: '财务',
  'balance-payments': '余额与付款',
  'transaction-history': '交易记录',
  payouts: '付款',
  invoices: '发票',
  'payment-methods': '付款方式',
  'messages-notifications': '消息与通知',
  'all-messages': '全部消息',
  'partner-messages': '合作伙伴消息',
  'system-alerts': '系统提醒',
  archived: '已归档',
  settings: '集成与设置',
  'team-accounts': '团队账户',
  permissions: '权限',
  'recruitment-page': '招募页面',
  'brand-integration': '品牌集成',
  'api-credentials': 'API 凭证',
  'help-center': '帮助中心',
};

const textTranslations = new Map(Object.entries({
  'Merchant workspace': '商家工作台',
  'Business overview': '业务概览',
  'Track performance, partner growth, and revenue across your affiliate programs.': '跟踪联盟计划中的表现、合作伙伴增长和收入。',
  'Monitor your affiliate program performance and partner activity.': '查看联盟计划表现与合作伙伴动态。',
  'Scope: All partners and campaigns': '范围：所有合作伙伴和活动',
  'Help center': '帮助中心',
  Settings: '设置',
  Messages: '消息',
  Notifications: '通知',
  'Download center': '下载中心',
  'Demo state': '演示状态',
  'Normal data': '正常数据',
  'Empty state': '空数据状态',
  'Load error': '加载错误',
  'Permission limited': '权限受限',
  Syncing: '同步中',
  Overview: '概览',
  'Recruitment & Partners': '招募与合作伙伴',
  'Discover influencers': '发现影响者',
  'Discover publishers': '发现发布者',
  'My partners': '我的合作伙伴',
  Applications: '申请',
  'Invite history': '邀请记录',
  Campaigns: '活动',
  'All campaigns': '全部活动',
  'Affiliate programs': '联盟计划',
  'Influencer campaigns': '影响者活动',
  'Products & Assets': '商品与素材',
  'Product feed': '商品数据源',
  Coupons: '优惠券',
  'Banners & images': '横幅与图片',
  Videos: '视频',
  'Commission & Rules': '佣金与规则',
  'Commission rules': '佣金规则',
  'Attribution rules': '归因规则',
  'Restriction rules': '限制规则',
  'Data & Transactions': '数据与交易',
  Performance: '表现',
  'Performance by brand': '按品牌查看表现',
  Transactions: '交易',
  Finance: '财务',
  'Balance & payments': '余额与付款',
  'Transaction history': '交易记录',
  Payouts: '付款',
  Invoices: '发票',
  'Payment methods': '付款方式',
  'Messages & Notifications': '消息与通知',
  'All Messages': '全部消息',
  'Partner Messages': '合作伙伴消息',
  'System Alerts': '系统提醒',
  Archived: '已归档',
  'Integrations & Settings': '集成与设置',
  'Team accounts': '团队账户',
  Permissions: '权限',
  'Recruitment page': '招募页面',
  'Brand integration': '品牌集成',
  'API credentials': 'API 凭证',
  Clicks: '点击量',
  Orders: '订单量',
  'Gross sales': '销售总额',
  'Net sales': '净销售额',
  Commission: '佣金',
  Conversion: '转化率',
  'Total payout': '总支出',
  'Pending payout': '待付款项',
  'vs previous period': '较上一周期',
  'vs Apr 28 – May 04': '较 4 月 28 日-5 月 4 日',
  'completed orders': '已完成订单',
  'before adjustments': '调整前',
  'after returns & voids': '扣除退货和作废后',
  'approved this period': '本周期已批准',
  'click-to-order rate': '点击到下单转化率',
  'commission + fees': '佣金加服务费',
  'Performance tracking': '表现跟踪',
  'Performance overview': '表现概览',
  Daily: '每日',
  Weekly: '每周',
  Monthly: '每月',
  'Partner performance': '合作伙伴表现',
  'Top performing partners': '表现最佳的合作伙伴',
  'View all': '查看全部',
  Rank: '排名',
  Partner: '合作伙伴',
  Conversions: '转化次数',
  'Settlement snapshot': '结算快照',
  'Commission summary': '佣金汇总',
  Approved: '已批准',
  'Pending approval': '待批准',
  'Total paid': '已付总额',
  'Total commission': '佣金总额',
  'Payouts this period': '本周期付款',
  Pending: '待处理',
  Declined: '已拒绝',
  'Partner status': '合作伙伴状态',
  'In relationship': '已建立合作关系',
  'New partners': '新增合作伙伴',
  'Pending review': '待审核',
  'Partner relationship': '合作伙伴关系',
  'Active partners': '活跃合作伙伴',
  'Applications pending': '待处理申请',
  'Invitations sent': '已发邀请',
  'Action center': '操作中心',
  '2 tasks': '2 项任务',
  '18 new partner applications': '18 个新的合作伙伴申请',
  'Review and respond to new applications.': '审核并回复新的申请。',
  'Open 18 new partner applications': '打开 18 个新的合作伙伴申请',
  '3 campaigns nearing budget limit': '3 个活动即将达到预算上限',
  'Review and adjust campaign budgets.': '审核并调整活动预算。',
  'Open 3 campaigns nearing budget limit': '打开 3 个即将达到预算上限的活动',
  'Shortcuts': '快捷操作',
  'Invite partners': '邀请合作伙伴',
  'Invite partner': '邀请合作伙伴',
  'Create campaign': '创建活动',
  'Add product': '添加商品',
  'Add coupon': '添加优惠券',
  'Export report': '导出报告',
  'Select a period': '选择周期',
  'Last 7 days': '最近 7 天',
  'Last 30 days': '最近 30 天',
  'Last 90 days': '最近 90 天',
  'May 05 – May 12, 2025': '2025 年 5 月 05 日-5 月 12 日',
  'Apr 28 – May 04': '4 月 28 日-5 月 4 日',
  'No data': '暂无数据',
  'No activity in this range': '该时间范围内暂无活动',
  'No partner performance yet': '暂无合作伙伴表现',
  'Partner results will appear after tracked orders are recorded.': '记录跟踪订单后将显示合作伙伴表现。',
  'Demo Admin': '演示管理员',
  'Demo Admin · Demo Store': '演示管理员 / 演示店铺',
  Reports: '报表',
  'YeahPromos Merchant Workspace': 'YeahPromos 商家工作台',
  'Framework demo · 2026': '框架演示 2026',
}));

const attributeTranslations = new Map(Object.entries({
  'Primary navigation': '主导航',
  'Workspace utilities': '工作区工具',
  'Open help center': '打开帮助中心',
  'Open workspace settings': '打开工作区设置',
  'Open account menu': '打开账户菜单',
  Messages: '消息',
  Notifications: '通知',
  'Download center': '下载中心',
  'Choose demo state': '选择演示状态',
  'Collapse sidebar': '收起侧边栏',
  'Open menu': '打开菜单',
  'Close menu': '关闭菜单',
  Breadcrumb: '面包屑导航',
  'Key performance metrics': '关键绩效指标',
  'Performance and partner insights': '表现与合作伙伴洞察',
  'Performance metric': '表现指标',
  'Chart interval': '图表间隔',
  'Performance trend chart': '表现趋势图',
  'Commission, partner status and action center': '佣金、合作伙伴状态与操作中心',
  'Dismiss partner details overlay': '关闭合作伙伴详情浮层',
}));

export const getLocale = () => window.localStorage.getItem(LOCALE_STORAGE_KEY) === CHINESE_LOCALE
  ? CHINESE_LOCALE
  : 'en';

export const translate = (locale, key, fallback = key) => locale === CHINESE_LOCALE
  ? translations[key] ?? fallback
  : fallback;

export const translateNavigationLabel = (locale, item) => locale === CHINESE_LOCALE
  ? navigationTranslations[item.id] ?? item.label
  : item.label;

export const translatePageTitle = (locale, pageId, fallback) => locale === CHINESE_LOCALE
  ? navigationTranslations[pageId] ?? fallback
  : fallback;

const localizeNode = (node) => {
  const source = node.nodeValue;
  const trimmed = source.trim();
  const translated = textTranslations.get(trimmed);
  if (!translated) return;
  const leading = source.match(/^\s*/)?.[0] ?? '';
  const trailing = source.match(/\s*$/)?.[0] ?? '';
  node.nodeValue = `${leading}${translated}${trailing}`;
};

const localizeAttributes = (root) => {
  const elements = root instanceof Element ? [root, ...root.querySelectorAll('*')] : [];
  elements.forEach((element) => {
    ['aria-label', 'title', 'placeholder'].forEach((attribute) => {
      const source = element.getAttribute(attribute);
      const translated = attributeTranslations.get(source);
      if (translated) element.setAttribute(attribute, translated);
    });
  });
};

const localizeText = (root = document.body) => {
  if (!root) return;
  localizeAttributes(root);
  const walker = document.createTreeWalker(root, NodeFilter.SHOW_TEXT, {
    acceptNode(node) {
      const parent = node.parentElement;
      return parent && !['SCRIPT', 'STYLE', 'SVG'].includes(parent.tagName)
        ? NodeFilter.FILTER_ACCEPT
        : NodeFilter.FILTER_REJECT;
    },
  });
  while (walker.nextNode()) localizeNode(walker.currentNode);
};

let observer;

export const applyLocale = () => {
  const locale = getLocale();
  const isChinese = locale === CHINESE_LOCALE;
  document.documentElement.lang = isChinese ? CHINESE_LOCALE : 'en';
  document.title = translate(locale, 'document.title', 'Business Overview · YeahPromos');
  document.querySelector('meta[name="description"]')?.setAttribute(
    'content',
    translate(locale, 'document.description', 'YeahPromos merchant business overview demo'),
  );

  const button = document.querySelector('[data-language-toggle]');
  if (button) {
    button.textContent = isChinese ? '中文' : 'EN';
    button.setAttribute('aria-pressed', String(isChinese));
    button.setAttribute('aria-label', isChinese ? '切换到英文' : 'Switch to Chinese');
    button.setAttribute('title', isChinese ? '切换到英文' : 'Switch to Chinese');
  }

  observer?.disconnect();
  if (!isChinese) return;
  localizeText();
  observer = new MutationObserver((records) => {
    records.forEach((record) => {
      record.addedNodes.forEach((node) => {
        if (node.nodeType === Node.ELEMENT_NODE) localizeText(node);
        if (node.nodeType === Node.TEXT_NODE) localizeNode(node);
      });
    });
  });
  observer.observe(document.body, { childList: true, subtree: true });
};

export const bindLanguageToggle = () => {
  document.querySelector('[data-language-toggle]')?.addEventListener('click', () => {
    const nextLocale = getLocale() === CHINESE_LOCALE ? 'en' : CHINESE_LOCALE;
    window.localStorage.setItem(LOCALE_STORAGE_KEY, nextLocale);
    window.location.reload();
  });
};
