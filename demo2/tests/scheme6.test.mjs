import assert from 'node:assert/strict';
import fs from 'node:fs';
import path from 'node:path';
import test from 'node:test';

const demoDir = path.resolve(import.meta.dirname, '..');

test('方案六使用 Vue 入口和运营驾驶舱组件', () => {
  const entry = path.join(demoDir, 'src', 'main.js');
  const app = path.join(demoDir, 'src', 'App.vue');

  assert.equal(fs.existsSync(entry), true, 'Vue main entry should exist');
  assert.equal(fs.existsSync(app), true, 'Vue App component should exist');
  if (!fs.existsSync(entry) || !fs.existsSync(app)) return;

  assert.match(fs.readFileSync(entry, 'utf8'), /createApp/);
  const appSource = fs.readFileSync(app, 'utf8');
  assert.match(appSource, /TodayStatus/);
  assert.match(appSource, /TaskCard/);
  assert.match(appSource, /RiskPanel/);
  assert.match(appSource, /QuickActions/);
  assert.match(appSource, /PartnerRanking/);
});

test('方案六定义湖蓝、风险、完成和活动 Token', () => {
  const tokenPath = path.join(demoDir, 'src', 'styles', 'tokens.css');
  const schemePath = path.join(demoDir, 'src', 'styles', 'scheme-six.css');

  assert.equal(fs.existsSync(tokenPath), true, 'tokens.css should exist');
  assert.equal(fs.existsSync(schemePath), true, 'scheme-six.css should exist');
  if (!fs.existsSync(tokenPath) || !fs.existsSync(schemePath)) return;

  const css = `${fs.readFileSync(tokenPath, 'utf8')}\n${fs.readFileSync(schemePath, 'utf8')}`;
  assert.match(css, /#168c9b/i);
  assert.match(css, /risk|warning/i);
  assert.match(css, /success|complete/i);
  assert.match(css, /campaign|activity|purple/i);
  assert.match(css, /bento/i);
});
