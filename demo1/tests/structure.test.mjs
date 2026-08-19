import test from 'node:test';
import assert from 'node:assert/strict';
import { spawnSync } from 'node:child_process';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const demoDirectory = resolve(currentDirectory, '..');
const html = readFileSync(resolve(demoDirectory, 'index.html'), 'utf8');
const css = readFileSync(resolve(demoDirectory, 'styles.css'), 'utf8');
const appJs = readFileSync(resolve(demoDirectory, 'app.js'), 'utf8');
const data = readFileSync(resolve(demoDirectory, 'data.mjs'), 'utf8');
const readme = readFileSync(resolve(demoDirectory, 'README.md'), 'utf8');

function cssBraceDepth(source) {
  let depth = 0;
  let mode = 'normal';
  let quote = '';

  for (let index = 0; index < source.length; index += 1) {
    const character = source[index];
    const nextCharacter = source[index + 1];

    if (mode === 'comment') {
      if (character === '*' && nextCharacter === '/') {
        mode = 'normal';
        index += 1;
      }
      continue;
    }

    if (mode === 'string') {
      if (character === '\\') {
        index += 1;
      } else if (character === quote) {
        mode = 'normal';
      }
      continue;
    }

    if (character === '/' && nextCharacter === '*') {
      mode = 'comment';
      index += 1;
    } else if (character === '"' || character === "'") {
      mode = 'string';
      quote = character;
    } else if (character === '{') {
      depth += 1;
    } else if (character === '}') {
      depth -= 1;
      if (depth < 0) return depth;
    }
  }

  return depth;
}

test('page provides the required sidebar and dashboard regions', () => {
  assert.match(html, /data-sidebar/);
  assert.match(html, /data-metrics-grid/);
  assert.match(html, /data-ranking-list/);
  assert.match(html, /data-commission-summary/);
  assert.match(html, /data-partner-status/);
  assert.match(html, /data-action-center/);
  assert.match(html, /data-drawer/);
  assert.match(html, /data-toast/);
  assert.match(html, /data-action-center/);
  assert.match(html, /data-demo-state/);
});

test('app entry remains syntactically valid after conflict resolution', () => {
  const syntax = spawnSync(process.execPath, ['--check', resolve(demoDirectory, 'app.js')], { encoding: 'utf8' });
  assert.equal(syntax.status, 0, syntax.stderr || syntax.stdout);
});

test('stylesheet blocks remain balanced so routed page styles can load', () => {
  assert.equal(cssBraceDepth(css), 0);
});

test('attribution rules has its own routed page shell and controls', () => {
  assert.match(html, /data-attribution-page/);
  assert.match(html, /Attribution rules/);
  assert.match(html, /data-page-actions/);
  assert.match(html, /data-attribution-model/);
  assert.match(html, /data-attribution-distribution/);
  assert.match(html, /data-attribution-rules/);
  assert.match(html, /data-attribution-audit/);
  assert.match(appJs, /isAttributionPage/);
  assert.match(appJs, /renderAttributionPage/);
  assert.match(data, /Commission & Rules/);
  assert.match(data, /attributionPageData/);
});

test('attribution rules reuses the README red navigation tokens', () => {
  assert.match(css, /body\.is-attribution-page[\s\S]*--attribution-red:\s*#e60000/i);
  assert.match(css, /--attribution-soft-red:\s*#fde8e8/i);
  assert.match(css, /--attribution-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="attribution-rules"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--attribution-selected-red\)/i);
});

test('commission rules has its own routed list and detail shell', () => {
  assert.match(html, /data-commission-rules-page/);
  assert.match(html, /Commission rules/);
  assert.match(html, /data-commission-rules-summary/);
  assert.match(html, /data-commission-rules-filter="status"/);
  assert.match(html, /data-commission-rules-filter="partnerType"/);
  assert.match(html, /data-commission-rules-filter="channel"/);
  assert.match(html, /data-commission-rules-search/);
  assert.match(html, /data-commission-rules-rows/);
  assert.match(html, /data-commission-rules-detail/);
  assert.match(appJs, /isCommissionRulesPage/);
  assert.match(appJs, /renderCommissionRulesPage/);
  assert.match(appJs, /getFilteredCommissionRules/);
  assert.match(data, /commissionRulesPageData/);
  assert.match(data, /standard-content-commission/);
  assert.match(data, /scopeSummary/);
});

test('commission rules reuses the README red navigation tokens', () => {
  assert.match(css, /body\.is-commission-rules-page[\s\S]*--commission-rules-red:\s*#e60000/i);
  assert.match(css, /--commission-rules-soft-red:\s*#fde8e8/i);
  assert.match(css, /--commission-rules-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="commission-rules-list"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--commission-rules-selected-red\)/i);
});

test('restriction rules has its own routed PPC policy workspace', () => {
  assert.match(html, /data-restriction-rules-page/);
  assert.match(html, /Restriction rules/);
  assert.match(html, /data-restriction-rules-summary/);
  assert.match(html, /data-restriction-rules-filter="status"/);
  assert.match(html, /data-restriction-rules-filter="policy"/);
  assert.match(html, /data-restriction-rules-filter="channel"/);
  assert.match(html, /data-restriction-rules-filter="region"/);
  assert.match(html, /data-restriction-rules-filter="effectiveDate"/);
  assert.match(html, /data-restriction-rules-search/);
  assert.match(html, /data-restriction-rules-rows/);
  assert.match(html, /Keywords \/ terms/);
  assert.match(html, /data-restriction-rules-detail/);
  assert.match(appJs, /isRestrictionRulesPage/);
  assert.match(appJs, /renderRestrictionRulesPage/);
  assert.match(appJs, /getFilteredRestrictionRules/);
  assert.match(data, /restrictionRulesPageData/);
  assert.match(data, /brand-search-protection/);
  assert.match(data, /restriction-rules/);
  assert.match(readme, /Commission & Rules > Restriction rules/);
});

test('restriction rules uses readable contrast-ready tokens and explicit policy semantics', () => {
  assert.match(css, /body\.is-restriction-rules-page[\s\S]*--restriction-rules-text-strong:\s*#1f2937/i);
  assert.match(css, /--restriction-rules-text:\s*#374151/);
  assert.match(css, /--restriction-rules-text-muted:\s*#4b5563/);
  assert.match(css, /nav-child\[data-nav-child="restriction-rules"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--restriction-rules-selected-red\)/i);
  assert.match(css, /\.restriction-rules-table th[\s\S]*font-size:\s*11px/);
  assert.match(css, /\.restriction-rules-table td[\s\S]*font-size:\s*12px/);
  assert.match(css, /\.restriction-rules-policy--blocked[\s\S]*color:\s*#9b1c1c/);
  assert.match(css, /\.restriction-rules-status--active[\s\S]*color:\s*#176b43/);
  assert.match(readme, /Restriction rules 的关键词\/品牌词/);
  assert.match(readme, /Restriction rules 使用 `#1F2937`/);
});

test('balance and payments has its own routed finance page shell', () => {
  assert.match(html, /data-finance-page/);
  assert.match(html, /Balance &amp; payments/);
  assert.match(html, /data-finance-summary/);
  assert.match(html, /data-finance-chart/);
  assert.match(html, /data-finance-payout-schedule/);
  assert.match(html, /data-finance-payment-methods/);
  assert.match(html, /data-finance-payout-rows/);
  assert.match(appJs, /isFinancePage/);
  assert.match(appJs, /renderFinancePage/);
  assert.match(data, /financeBalancePageData/);
  assert.match(data, /demoOnly:\s*true/);
});

test('help center has its own routed support page shell', () => {
  assert.match(html, /data-help-center-page/);
  assert.match(html, /Help center/);
  assert.match(html, /data-help-center-search/);
  assert.match(html, /data-help-center-categories/);
  assert.match(html, /data-help-center-articles/);
  assert.match(html, /data-help-center-status/);
  assert.match(appJs, /isHelpCenterPage/);
  assert.match(appJs, /renderHelpCenterPage/);
  assert.match(appJs, /visibleArticleCount/);
  assert.match(data, /helpCenterPageData/);
  assert.match(html, /All systems operational/);
});

test('help center reuses the README red navigation tokens', () => {
  assert.match(css, /body\.is-help-center-page[\s\S]*--help-red:\s*#e60000/i);
  assert.match(css, /--help-soft-red:\s*#fde8e8/i);
  assert.match(css, /--help-selected-red:\s*#ff312e/i);
  assert.match(css, /sidebar__utility\[data-help-center-utility\][\s\S]*background:\s*var\(--help-soft-red\)/i);
  assert.match(readme, /Help center > Help center/);
});

test('API credentials has its own Integrations & Settings page shell', () => {
  assert.match(html, /data-api-credentials-page/);
  assert.match(html, /API credentials/);
  assert.match(html, /data-api-credentials-environment="live"/);
  assert.match(html, /data-api-credentials-search/);
  assert.match(html, /data-api-credentials-status/);
  assert.match(html, /data-api-credentials-rows/);
  assert.match(html, /data-api-credentials-webhooks/);
  assert.match(appJs, /isApiCredentialsPage/);
  assert.match(appJs, /renderApiCredentialsPage/);
  assert.match(appJs, /getFilteredApiCredentials/);
  assert.match(data, /apiCredentialsPageData/);
  assert.match(data, /reporting-service/);
  assert.match(data, /demoOnly:\s*true/);
});

test('API credentials reuses the README red navigation tokens and safe copy rules', () => {
  assert.match(css, /body\.is-api-credentials-page[\s\S]*--api-credentials-red:\s*#e60000/i);
  assert.match(css, /--api-credentials-soft-red:\s*#fde8e8/i);
  assert.match(css, /--api-credentials-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="api-credentials"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--api-credentials-selected-red\)/i);
  assert.match(readme, /Integrations & Settings > API credentials/);
  assert.match(readme, /不可访问的 Webhook 占位 URL/);
});

test('Brand integration has its own Integrations & Settings page shell', () => {
  assert.match(html, /data-brand-integration-page/);
  assert.match(html, /Brand integration/);
  assert.match(html, /Connected brand/);
  assert.match(html, /Sync health summary/);
  assert.match(html, /data-brand-integration-health/);
  assert.match(html, /data-brand-integration-list/);
  assert.match(html, /data-brand-integration-activity/);
  assert.match(html, /Add integration/);
  assert.match(appJs, /isBrandIntegrationPage/);
  assert.match(appJs, /renderBrandIntegrationPage/);
  assert.match(appJs, /Integrations & Settings/);
  assert.match(appJs, /data-brand-integration-action/);
  assert.match(data, /brandIntegrationPageData/);
  assert.match(data, /shopify-storefront/);
  assert.match(data, /amazon-marketplace/);
});

test('Brand integration reuses the README red navigation tokens and safe demo copy', () => {
  assert.match(css, /body\.is-brand-integration-page[\s\S]*--brand-integration-red:\s*#e60000/i);
  assert.match(css, /--brand-integration-soft-red:\s*#fde8e8/i);
  assert.match(css, /--brand-integration-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="brand-integration"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--brand-integration-selected-red\)/i);
  assert.match(readme, /Integrations & Settings > Brand integration/);
  assert.match(readme, /demo-store\.com/);
  assert.match(data, /demoOnly:\s*true/);
});

test('Team accounts has its own Integrations & Settings page shell', () => {
  assert.match(html, /data-team-accounts-page/);
  assert.match(html, /Team accounts/);
  assert.match(html, /Create new account/);
  assert.match(html, /data-team-accounts-invite-form/);
  assert.match(html, /data-team-accounts-search/);
  assert.match(html, /data-team-accounts-filter-menu/);
  assert.match(html, /data-team-accounts-brand-filter/);
  assert.match(html, /data-team-accounts-rows/);
  assert.match(html, /data-team-accounts-pagination/);
  assert.match(appJs, /isTeamAccountsPage/);
  assert.match(appJs, /renderTeamAccountsPage/);
  assert.match(appJs, /getFilteredTeamAccounts/);
  assert.match(appJs, /data-team-accounts-action/);
  assert.match(data, /teamAccountsPageData/);
  assert.match(data, /ethan-turner/);
  assert.match(data, /mfa:\s*'Enabled'/);
  assert.match(readme, /Integrations & Settings > Team accounts/);
});

test('Team accounts reuses README red tokens and safe demo rules', () => {
  assert.match(css, /body\.is-team-accounts-page[\s\S]*--team-accounts-red:\s*#e60000/i);
  assert.match(css, /--team-accounts-soft-red:\s*#fde8e8/i);
  assert.match(css, /--team-accounts-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="team-accounts"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--team-accounts-selected-red\)/i);
  assert.match(readme, /不展示密码/);
  assert.match(readme, /Team accounts 使用 `#1F2937`/);
});

test('Recruitment page has its own Integrations & Settings configuration workspace', () => {
  assert.match(html, /data-recruitment-page-settings/);
  assert.match(html, /Recruitment page status/);
  assert.match(html, /Public page URL/);
  assert.match(html, /data-recruitment-page-action="toggle-status"/);
  assert.match(html, /data-recruitment-page-setting="brand"/);
  assert.match(html, /data-recruitment-page-setting="queue"/);
  assert.match(html, /data-recruitment-page-field="title"/);
  assert.match(html, /data-recruitment-page-field="description"/);
  assert.match(html, /data-recruitment-page-field-toggle="full-name"/);
  assert.match(html, /data-recruitment-page-preview/);
  assert.match(html, /Publishing checklist/);
  assert.match(appJs, /isRecruitmentSettingsPage/);
  assert.match(appJs, /renderRecruitmentSettingsPage/);
  assert.match(appJs, /renderRecruitmentPagePreview/);
  assert.match(appJs, /recruitmentPageSettingsData/);
  assert.match(data, /recruitmentPageSettingsData/);
  assert.match(data, /partners\.yeahpromos\.com\/demo-brand/);
  assert.match(data, /applicationFields/);
  assert.match(readme, /Integrations & Settings > Recruitment page/);
});

test('Recruitment page reuses README red tokens and demo-only publishing rules', () => {
  assert.match(css, /body\.is-recruitment-page-settings-page[\s\S]*--recruitment-settings-red:\s*#e60000/i);
  assert.match(css, /--recruitment-settings-soft-red:\s*#fde8e8/i);
  assert.match(css, /--recruitment-settings-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="recruitment-page"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--recruitment-settings-selected-red\)/i);
  assert.match(readme, /不发布公开页面、不发送邮件、不创建真实申请/);
  assert.match(readme, /Recruitment page 使用 `#1F2937`/);
});
test('messages and notifications has its own routed conversation workspace', () => {
  assert.match(html, /data-messages-page/);
  assert.match(html, /Messages &amp; Notifications/);
  assert.match(html, /data-messages-tabs/);
  assert.match(html, /data-messages-search/);
  assert.match(html, /data-messages-filter/);
  assert.match(html, /data-messages-list/);
  assert.match(html, /data-messages-conversation/);
  assert.match(html, /data-messages-partner-details/);
  assert.match(html, /Compose Message/);
  assert.match(appJs, /isMessagesPage/);
  assert.match(appJs, /renderMessagesPage/);
  assert.match(appJs, /getFilteredMessages/);
  assert.match(appJs, /data-messages-reply/);
  assert.match(data, /messagesPageData/);
  assert.match(data, /all-messages/);
  assert.match(data, /partner-messages/);
  assert.match(data, /system-alerts/);
  assert.match(readme, /Messages & Notifications > All Messages/);
});

test('messages and notifications uses readable contrast-ready tokens', () => {
  assert.match(css, /body\.is-messages-page[\s\S]*--messages-red:\s*#e60000/i);
  assert.match(css, /--messages-soft-red:\s*#fde8e8/i);
  assert.match(css, /--messages-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="all-messages"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--messages-selected-red\)/i);
  assert.match(css, /\.messages-list-row__copy small[\s\S]*font-size:\s*11px/);
  assert.match(css, /\.messages-message-body[\s\S]*font-size:\s*13px/);
  assert.match(css, /\.messages-reply-form textarea[\s\S]*font-size:\s*var\(--messages-font-body\)/);
  assert.match(readme, /Messages & Notifications 的消息列表、未读标记/);
  assert.match(readme, /Messages & Notifications 使用 `#1F2937`/);
});

test('products and assets banners page has its own routed asset workspace', () => {
  assert.match(html, /data-products-assets-page/);
  assert.match(html, /data-products-assets-tabs/);
  assert.match(html, /data-products-assets-filter="folder"/);
  assert.match(html, /data-products-assets-filter="campaign"/);
  assert.match(html, /data-products-assets-filter="status"/);
  assert.match(html, /data-products-assets-search/);
  assert.match(html, /data-products-assets-grid/);
  assert.match(html, /data-products-assets-detail/);
  assert.match(appJs, /isProductsAssetsPage/);
  assert.match(appJs, /renderProductsAssetsPage/);
  assert.match(appJs, /getFilteredProductsAssets/);
  assert.match(data, /bannersImagesPageData/);
  assert.match(data, /workspace-sale-1200x628.jpg/);
  assert.match(data, /Banners & images/);
  assert.match(readme, /Products & Assets > Banners & images/);
});

test('banners page keeps asset states readable and keyboard-addressable', () => {
  assert.match(css, /\.is-products-assets-page \.page-header__filters[\s\S]*display:\s*none/);
  assert.match(css, /\.products-assets-grid[\s\S]*grid-template-columns:\s*repeat\(3/);
  assert.match(css, /\.products-asset-card__status[\s\S]*font-size:\s*10px/);
  assert.match(css, /\.products-assets-detail__facts dt[\s\S]*font-size:\s*10px/);
  assert.match(css, /\.products-assets-detail__facts dd[\s\S]*color:\s*var\(--color-text-soft\)/);
  assert.match(appJs, /aria-pressed/);
  assert.match(readme, /Banners & images 的资产卡片、筛选器/);
  assert.match(readme, /Banners & images 使用 `#1F2937`/);
});

test('products and assets coupons page has its own routed filterable table', () => {
  assert.match(html, /data-coupons-page/);
  assert.match(html, /data-coupons-tabs/);
  assert.match(html, /data-coupons-filter="status"/);
  assert.match(html, /data-coupons-filter="permission"/);
  assert.match(html, /data-coupons-filter="category"/);
  assert.match(html, /data-coupons-search/);
  assert.match(html, /data-coupons-rows/);
  assert.match(html, /Coupon code/);
  assert.match(html, /Add coupon/);
  assert.match(appJs, /isCouponsPage/);
  assert.match(appJs, /renderCouponsPage/);
  assert.match(appJs, /getFilteredCoupons/);
  assert.match(data, /couponsPageData/);
  assert.match(data, /SUMMER20/);
  assert.match(readme, /Products & Assets > Coupons/);
});

test('coupons page keeps status contrast and keyboard-addressable filters', () => {
  assert.match(css, /body\.is-products-coupons-page[\s\S]*--coupons-red:\s*#e60000/i);
  assert.match(css, /--coupons-soft-red:\s*#fde8e8/i);
  assert.match(css, /\.products-coupon-filters__row[\s\S]*grid-template-columns/);
  assert.match(css, /\.products-coupon-status--active[\s\S]*color:\s*#167346/);
  assert.match(css, /\.products-coupon-status--expired[\s\S]*color:\s*#4b5563/);
  assert.match(css, /\.products-coupons-page \.products-coupon-table th[\s\S]*font-size:\s*11px/);
  assert.match(css, /\.products-coupons-page \.products-coupon-table td[\s\S]*font-size:\s*12px/);
  assert.match(appJs, /data-coupons-select-all/);
  assert.match(readme, /Coupons 的日期范围、筛选器/);
  assert.match(readme, /Coupons 使用 `#1F2937`/);
});

test('finance page reuses the README red navigation tokens', () => {
  assert.match(css, /body\.is-finance-page[\s\S]*--finance-red:\s*#e60000/i);
  assert.match(css, /--finance-soft-red:\s*#fde8e8/i);
  assert.match(css, /--finance-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="balance-payments"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--finance-selected-red\)/i);
});

test('commission rules invoices has its own routed, filterable table shell', () => {
  assert.match(html, /data-invoices-page/);
  assert.match(html, /Invoices \(73\)/);
  assert.match(html, /data-invoices-date-range/);
  assert.match(html, /data-invoices-filter="paymentMethod"/);
  assert.match(html, /data-invoices-filter="paymentType"/);
  assert.match(html, /data-invoices-filter="status"/);
  assert.match(html, /data-invoices-filter="brand"/);
  assert.match(html, /data-invoices-search/);
  assert.match(html, /data-invoices-rows/);
  assert.match(html, /Payment ID/);
  assert.match(appJs, /Download invoice/);
  assert.match(appJs, /isInvoicesPage/);
  assert.match(appJs, /renderInvoicesPage/);
  assert.match(appJs, /getFilteredInvoices/);
  assert.match(data, /commission-invoices/);
  assert.match(data, /commissionInvoicesPageData/);
});

test('invoices page uses readable dark-gray tokens and explicit status semantics', () => {
  assert.match(css, /body\.is-invoices-page[\s\S]*--invoices-text-strong:\s*#1f2937/);
  assert.match(css, /body\.is-invoices-page[\s\S]*--invoices-text:\s*#374151/);
  assert.match(css, /body\.is-invoices-page[\s\S]*--invoices-text-muted:\s*#4b5563/);
  assert.match(css, /\.invoices-table th[\s\S]*font-size:\s*11px/);
  assert.match(css, /\.invoices-table td[\s\S]*font-size:\s*12px/);
  assert.match(css, /\.invoices-status[\s\S]*font-size:\s*11px/);
  assert.match(css, /\.invoices-status--paid[\s\S]*color:\s*#1f7a4d/);
  assert.match(readme, /Invoices 页面中的日期控件、筛选器、发票表格/);
});

test('public demo data does not include credential or personal-data patterns', () => {
  assert.doesNotMatch(html, /Guowv|Taylor Morgan|Alex Rivera|Jamie Lee|Brand Admin\s*·\s*US Store/);
  assert.doesNotMatch(data, /(api[_-]?key|client[_-]?secret|password|cvc|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY)/i);
  assert.doesNotMatch(data, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.match(data, /masked:\s*'•••• 0000'/);
});

test('finance typography preserves readability and lightweight chart annotations', () => {
  assert.match(css, /body\.is-finance-page[\s\S]*--finance-font-body:\s*11px/);
  assert.match(css, /body\.is-finance-page[\s\S]*--finance-font-secondary:\s*10px/);
  assert.match(css, /\.finance-chart__tooltip text[\s\S]*font-weight:\s*400/);
  assert.match(css, /\.finance-chart__tooltip \.finance-chart__tooltip-value[\s\S]*font-size:\s*12px[\s\S]*font-weight:\s*600/);
  assert.match(css, /\.finance-table th[\s\S]*font-size:\s*var\(--finance-font-secondary\)/);
  assert.match(css, /\.finance-table td[\s\S]*font-size:\s*var\(--finance-font-body\)/);
  assert.match(readme, /可读性与无障碍/);
  assert.match(readme, /主要正文、表格数据和表单控件文字不小于/);
});

test('finance neutral text uses contrast-ready dark gray tokens', () => {
  assert.match(css, /body\.is-finance-page[\s\S]*--finance-text-strong:\s*#1f2937/);
  assert.match(css, /body\.is-finance-page[\s\S]*--finance-text-secondary:\s*#374151/);
  assert.match(css, /body\.is-finance-page[\s\S]*--finance-text-muted:\s*#4b5563/);
  assert.match(css, /\.finance-table td[\s\S]*color:\s*var\(--finance-text-secondary\)/);
  assert.match(css, /\.finance-chart__axis-y[\s\S]*color:\s*var\(--finance-text-muted\)/);
  assert.match(css, /\.finance-paid-status[\s\S]*color:\s*var\(--finance-success-text\)/);
  assert.match(readme, /对比度与灰阶/);
});

test('page loads one module entry and keeps the global navigation in the sidebar', () => {
  assert.match(html, /<script type="module" src="\.\/app\.js\?v=merchant-reference-22"><\/script>/);
  assert.match(html, /<aside[^>]+data-sidebar/);
  assert.doesNotMatch(html, /<header[^>]*>\s*<nav/i);
});

test('styles define the light red merchant-dashboard visual tokens', () => {
  assert.match(css, /--color-brand:\s*#e60000/i);
  assert.match(css, /--color-canvas:\s*#ffffff/i);
  assert.match(css, /--color-brand-soft:\s*#fde8e8/i);
  assert.match(css, /--radius-card:\s*6px/i);
});

test('overview follows the reference dashboard hierarchy', () => {
  assert.match(html, /class="brand__wordmark"><strong>YEAH<\/strong><b>P<\/b><strong>ROMOS<\/strong>/);
  assert.match(html, /Performance overview/);
  assert.match(html, /Scope: All partners and campaigns/);
  assert.match(html, /class="page-header__utility"/);
  assert.match(html, /class="ranking-table-head"/);
  assert.match(appJs, /data-metric-id="\$\{metric\.id\}"/);
  assert.match(css, /\.metric-card\[data-metric-id="net-sales"\]/i);
  assert.match(css, /\.overview-layout\s*\{/s);
  assert.match(css, /\.overview-summary-grid\s*\{/s);
  assert.match(css, /\.overview-metric-card::before\s*\{/s);
});

test('preview busts the entry cache for the reference dashboard skin', () => {
  assert.match(html, /href="\.\/styles\.css\?v=merchant-reference-22"/);
  assert.match(html, /src="\.\/app\.js\?v=merchant-reference-22"/);
});

test('reference dashboard keeps flat cards and red action controls', () => {
  assert.match(css, /\.card\s*\{[\s\S]*box-shadow:\s*none;/s);
  assert.match(css, /\.action-card\s*\{[\s\S]*border-radius:\s*0;/s);
  assert.match(css, /\.quick-action\s*\{[\s\S]*border-radius:\s*6px;/s);
});

test('mobile date control stays readable beside the demo state selector', () => {
  assert.match(css, /\.period-picker__trigger span\s*\{[^}]*white-space:\s*nowrap;/s);
  assert.match(css, /\.page-header__actions\s*\{[^}]*grid-template-columns:\s*minmax\(0, 1fr\)\s+minmax\(125px, \.62fr\);/s);
});

test('merchant overview keeps task-oriented navigation and account context', () => {
  assert.match(html, /Merchant workspace/);
  assert.match(html, /Demo Admin/);
  assert.match(data, /Recruitment & Partners/);
  assert.match(data, /Products & Assets/);
  assert.match(data, /Data & Transactions/);
});

test('target modules use the approved red visual tokens and light card surfaces', () => {
  assert.match(css, /--color-brand:\s*#e60000/);
  assert.match(css, /\.overview-chart\s*\{/);
  assert.match(css, /\.recruitment-module\s*\{/);
  assert.match(css, /\.workspace-module\s*\{/);
  assert.match(css, /\.workspace-button--primary\s*\{/);
});

test('smooth chart and selected child navigation contracts remain in the source', () => {
  assert.match(appJs, /buildSmoothChartPath/);
  assert.match(appJs, /isNavigationItemActive/);
  assert.match(css, /\.nav-child\.is-active/);
});


test('target workspace keeps the overview shell and routed module regions', () => {
  assert.match(html, /data-overview-page/);
  assert.match(html, /data-overview-chart/);
  assert.match(html, /data-module-page/);
  assert.match(appJs, /createOverviewState/);
  assert.match(appJs, /createRecruitmentState/);
  assert.match(appJs, /createOperationsState/);
  assert.match(appJs, /renderOperationsPage/);
  assert.match(data, /Data & Transactions/);
});
