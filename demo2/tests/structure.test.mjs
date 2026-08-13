import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const demoDir = path.resolve(import.meta.dirname, '..');

test('方案六 demo 使用 Vue 入口和 Vite 构建', () => {
  const html = fs.readFileSync(path.join(demoDir, 'index.html'), 'utf8');
  const packageJson = JSON.parse(fs.readFileSync(path.join(demoDir, 'package.json'), 'utf8'));

  assert.match(html, /id="app"/);
  assert.match(html, /src="\/src\/main\.js"/);
  assert.equal(packageJson.scripts.build, 'vite build && node site-runtime/package-build.mjs');
  assert.equal(packageJson.type, 'module');
});

test('方案六保留侧边栏与工作台核心组件', () => {
  const app = fs.readFileSync(path.join(demoDir, 'src', 'App.vue'), 'utf8');
  const sidebar = fs.readFileSync(path.join(demoDir, 'src', 'components', 'SidebarNav.vue'), 'utf8');

  assert.match(app, /TodayStatus/);
  assert.match(app, /TaskCard/);
  assert.match(app, /RiskPanel/);
  assert.match(app, /QuickActions/);
  assert.match(app, /PartnerRanking/);
  assert.match(sidebar, /class="sidebar"/);
  assert.match(sidebar, /Recruitment|Workspace/);
});
