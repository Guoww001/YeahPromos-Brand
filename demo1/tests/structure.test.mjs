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

test('page provides the required sidebar and dashboard regions', () => {
  assert.match(html, /data-sidebar/);
  assert.match(html, /data-metrics-grid/);
  assert.match(html, /data-ranking-list/);
  assert.match(html, /data-commission-summary/);
  assert.match(html, /data-merchant-status/);
  assert.match(html, /data-merchants-grid/);
  assert.match(html, /data-drawer/);
  assert.match(html, /data-toast/);
});

test('page loads one module entry and keeps the global navigation in the sidebar', () => {
  assert.match(html, /<script type="module" src="\.\/app\.js"><\/script>/);
  assert.match(html, /<aside[^>]+data-sidebar/);
  assert.doesNotMatch(html, /<header[^>]*>\s*<nav/i);
});

test('styles define the documented blue-card visual tokens', () => {
  assert.match(css, /--color-brand:\s*#3297e9/i);
  assert.match(css, /--color-canvas:\s*#f4f7fb/i);
  assert.match(css, /--radius-card:\s*14px/i);
  assert.match(css, /--shadow-card:/i);
});

test('styles load all local Plus Jakarta Sans weights without remote font requests', () => {
  const fontFaces = css.match(/@font-face/g) ?? [];
  assert.equal(fontFaces.length, 5);
  assert.match(css, /\.\.\/fonts\/plus-jakarta-sans-latin-400-normal\.woff2/);
  assert.match(css, /\.\.\/fonts\/plus-jakarta-sans-latin-800-normal\.woff2/);
  assert.doesNotMatch(css, /fonts\.googleapis|use\.typekit|https?:\/\//i);
});

test('merchant details use accessible modal dialog semantics', () => {
  assert.match(html, /data-drawer[^>]+role="dialog"/);
  assert.match(html, /data-drawer[^>]+aria-modal="true"/);
  assert.match(html, /data-drawer[^>]+aria-labelledby="merchant-drawer-title"/);
});

test('styles retain a side drawer on mobile and respect reduced motion', () => {
  assert.match(css, /@media \(max-width: 767px\)/);
  assert.match(css, /\.sidebar\.is-open\s*\{[^}]*transform:\s*translateX\(0\)/s);
  assert.match(css, /@media \(prefers-reduced-motion: reduce\)/);
});

test('desktop-only stylesheet hides both mobile navigation controls with a selector stronger than icon button', () => {
  assert.match(css, /\.sidebar__close\.icon-button,\s*\.mobile-menu\.icon-button\s*\{\s*display:\s*none;/s);
});

test('advertiser ranking fills are block elements so percentage widths can render', () => {
  assert.match(css, /\.ranking-row__fill\s*\{[^}]*display:\s*block;/s);
});

test('drawer focus restoration falls back to the re-rendered merchant trigger', () => {
  assert.match(appJs, /lastDrawerTrigger\?\.isConnected/);
  assert.match(appJs, /data-merchant-view=.*activeMerchantId/s);
});
