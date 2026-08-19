import test from 'node:test';
import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import { fileURLToPath } from 'node:url';
import { dirname, resolve } from 'node:path';

const currentDirectory = dirname(fileURLToPath(import.meta.url));
const demoDirectory = resolve(currentDirectory, '..');
const html = readFileSync(resolve(demoDirectory, 'index.html'), 'utf8');
const css = readFileSync(resolve(demoDirectory, 'styles.css'), 'utf8');
const appJs = readFileSync(resolve(demoDirectory, 'app.js'), 'utf8');
const data = readFileSync(resolve(demoDirectory, 'data.mjs'), 'utf8');

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

test('finance page reuses the README red navigation tokens', () => {
  assert.match(css, /body\.is-finance-page[\s\S]*--finance-red:\s*#e60000/i);
  assert.match(css, /--finance-soft-red:\s*#fde8e8/i);
  assert.match(css, /--finance-selected-red:\s*#ff312e/i);
  assert.match(css, /nav-child\[data-nav-child="balance-payments"\][\s\S]*box-shadow:\s*inset 3px 0 0 var\(--finance-selected-red\)/i);
});

test('public demo data does not include credential or personal-data patterns', () => {
  assert.doesNotMatch(html, /Guowv|Taylor Morgan|Alex Rivera|Jamie Lee|Brand Admin\s*·\s*US Store/);
  assert.doesNotMatch(data, /(api[_-]?key|client[_-]?secret|password|cvc|BEGIN (RSA|OPENSSH|EC) PRIVATE KEY)/i);
  assert.doesNotMatch(data, /[A-Z0-9._%+-]+@[A-Z0-9.-]+\.[A-Z]{2,}/i);
  assert.match(data, /masked:\s*'•••• 0000'/);
});

test('page loads one module entry and keeps the global navigation in the sidebar', () => {
  assert.match(html, /<script type="module" src="\.\/app\.js\?v=merchant-reference-2"><\/script>/);
  assert.match(html, /<aside[^>]+data-sidebar/);
  assert.doesNotMatch(html, /<header[^>]*>\s*<nav/i);
});

test('styles define the light red merchant-dashboard visual tokens', () => {
  assert.match(css, /--color-brand:\s*#fa4a4a/i);
  assert.match(css, /--color-canvas:\s*#fbfbfa/i);
  assert.match(css, /--color-brand-soft:\s*#fff1f3/i);
  assert.match(css, /--radius-card:\s*6px/i);
});

test('overview follows the reference dashboard hierarchy', () => {
  assert.match(html, /class="brand__wordmark"><strong>YEAH<\/strong><b>P<\/b><strong>ROMOS<\/strong>/);
  assert.match(html, /Performance overview/);
  assert.match(html, /class="live-status"[^>]*><i><\/i> Live/);
  assert.match(html, /Scope: All partners and campaigns/);
  assert.match(html, /class="page-header__utility"/);
  assert.match(html, /class="ranking-table-head"/);
  assert.match(appJs, /data-metric-id="\$\{metric\.id\}"/);
  assert.match(css, /\.metric-card\[data-metric-id="net-sales"\]/i);
  assert.match(css, /\.analytics-grid\s*\{[\s\S]*grid-template-columns:\s*minmax\(0, 1\.9fr\)\s+minmax\(0, \.9fr\)\s+minmax\(0, \.9fr\)/s);
  assert.match(css, /\.summary-grid\s*\{[\s\S]*display:\s*contents;/s);
  assert.match(css, /\.metric-card::before\s*\{[\s\S]*width:\s*38px;/s);
});

test('preview busts the entry cache for the reference dashboard skin', () => {
  assert.match(html, /href="\.\/styles\.css\?v=merchant-reference-2"/);
  assert.match(html, /src="\.\/app\.js\?v=merchant-reference-2"/);
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

test('styles load all local Plus Jakarta Sans weights without remote font requests', () => {
  const fontFaces = css.match(/@font-face/g) ?? [];
  assert.equal(fontFaces.length, 5);
  assert.match(css, /\.\.\/fonts\/plus-jakarta-sans-latin-400-normal\.woff2/);
  assert.match(css, /\.\.\/fonts\/plus-jakarta-sans-latin-800-normal\.woff2/);
  assert.doesNotMatch(css, /fonts\.googleapis|use\.typekit|https?:\/\//i);
});

test('partner details use accessible modal dialog semantics', () => {
  assert.match(html, /data-drawer[^>]+role="dialog"/);
  assert.match(html, /data-drawer[^>]+aria-modal="true"/);
  assert.match(html, /data-drawer[^>]+aria-labelledby="merchant-drawer-title"/);
  assert.match(html, /data-drawer-backdrop[^>]+aria-label="Dismiss partner details overlay"/);
});

test('styles retain a side drawer on mobile and respect reduced motion', () => {
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /\.sidebar\.is-open\s*\{[^}]*transform:\s*translateX\(0\)/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('desktop-only stylesheet hides both mobile navigation controls with a selector stronger than icon button', () => {
  assert.match(css, /\.sidebar__close\.icon-button,\s*\.mobile-menu\.icon-button\s*\{\s*display:\s*none;/s);
});

test('partner ranking fills are block elements so percentage widths can render', () => {
  assert.match(css, /\.ranking-row__fill\s*\{[^}]*display:\s*block;/s);
});

test('drawer focus restoration falls back to the partner trigger', () => {
  assert.match(appJs, /lastDrawerTrigger\?\.isConnected/);
  assert.match(appJs, /data-partner-view=.*activePartnerId/s);
});
