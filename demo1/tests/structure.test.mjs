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
  assert.match(html, /<script type="module" src="\.\/app\.js\?v=merchant-reference-18"><\/script>/);
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
  assert.match(html, /href="\.\/styles\.css\?v=merchant-reference-18"/);
  assert.match(html, /src="\.\/app\.js\?v=merchant-reference-18"/);
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
