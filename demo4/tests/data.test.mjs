import assert from 'node:assert/strict';
import test from 'node:test';
import { brandPulseData } from '../scripts/data.mjs';

const destinations = brandPulseData.navigation
  .flatMap((item) => [item, ...(item.children ?? [])])
  .filter((item) => item.id !== 'overview');

test('每个侧边栏入口都有对应的业务示例页', () => {
  for (const destination of destinations) {
    const view = brandPulseData.views[destination.id];

    assert.ok(view, `${destination.id} 缺少页面定义`);
    assert.ok(view.thesis, `${destination.id} 缺少业务结论`);
    assert.ok(view.metrics?.length >= 3, `${destination.id} 缺少指标`);
    assert.ok(view.records?.length >= 3, `${destination.id} 缺少示例记录`);
  }
});

test('业务页面覆盖四种差异化骨架', () => {
  const types = new Set(Object.values(brandPulseData.views).map((view) => view.type));

  assert.deepEqual([...types].sort(), ['canvas', 'dossier', 'ledger', 'matrix']);
  assert.equal(brandPulseData.views.applications.type, 'dossier');
  assert.equal(brandPulseData.views['product-feed'].type, 'canvas');
  assert.equal(brandPulseData.views.balance.type, 'ledger');
  assert.equal(brandPulseData.views.integrations.type, 'matrix');
});

test('侧边栏覆盖产品文档中的明确二级入口', () => {
  const ids = new Set(destinations.map((item) => item.id));
  const required = [
    'influencer-discovery', 'publisher-discovery', 'partner-groups',
    'text-assets', 'banner-assets', 'subscriptions', 'security', 'support',
  ];

  for (const id of required) assert.ok(ids.has(id), `${id} 未进入导航`);
});

test('每个 Overview 指标都有独立时间序列', () => {
  for (const [periodId, period] of Object.entries(brandPulseData.overview.periods)) {
    for (const metricId of ['sales', 'clicks', 'orders', 'commission', 'conversion', 'balance']) {
      assert.ok(period.series[metricId]?.length >= 2, `${periodId}.${metricId} 缺少趋势序列`);
    }
  }
});

test('Overview 数据表达结论、原因和下一步任务', () => {
  assert.match(brandPulseData.overview.thesis, /Revenue/);
  assert.ok(brandPulseData.overview.metrics.length >= 6);
  assert.ok(brandPulseData.overview.reasons.length >= 3);
  assert.ok(brandPulseData.overview.priorities.length >= 4);
});
