import test from 'node:test';
import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';

const root = path.resolve(process.cwd(), 'demo1');
const html = fs.readFileSync(path.join(root, 'index.html'), 'utf8');
const appJs = fs.readFileSync(path.join(root, 'app.js'), 'utf8');
const css = fs.readFileSync(path.join(root, 'styles.css'), 'utf8');
const data = fs.readFileSync(path.join(root, 'data.mjs'), 'utf8');

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
