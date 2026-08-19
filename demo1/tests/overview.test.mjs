import test from 'node:test';
import assert from 'node:assert/strict';

import {
  buildSmoothChartPath,
  createOverviewState,
  getOverviewChart,
  overviewChartTabs,
  overviewMetricIds,
  selectOverviewMetric,
} from '../overview.mjs';

test('overview exposes the five reference metrics and four chart views', () => {
  assert.deepEqual(overviewMetricIds, ['clicks', 'conversions', 'gross-sales', 'commission', 'pending-payout']);
  assert.deepEqual(overviewChartTabs, ['clicks', 'conversions', 'gross-sales', 'commission']);
});

test('overview metric selection is immutable and changes the chart series', () => {
  const source = createOverviewState();
  const next = selectOverviewMetric(source, 'commission');
  const chart = getOverviewChart(next, '30d');

  assert.equal(source.selectedMetric, 'clicks');
  assert.equal(next.selectedMetric, 'commission');
  assert.notEqual(next, source);
  assert.equal(chart.metricId, 'commission');
  assert.equal(chart.points.length, 8);
  assert.equal(chart.points[0].label, 'Apr 13');
});

test('overview ignores unsupported chart metrics', () => {
  const source = createOverviewState();
  const result = selectOverviewMetric(source, 'orders');

  assert.equal(result, source);
});

test('overview chart path uses smooth cubic segments between data points', () => {
  const path = buildSmoothChartPath([
    { x: 0, y: 10 },
    { x: 10, y: 0 },
    { x: 20, y: 10 },
  ]);

  assert.equal(path, 'M0.0,10.0 C1.7,8.3 6.7,0.0 10.0,0.0 C13.3,0.0 18.3,8.3 20.0,10.0');
  assert.doesNotMatch(path, /\sL/);
});
