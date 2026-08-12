import assert from 'node:assert/strict';
import test from 'node:test';
import { controlRoomData } from '../scripts/data.mjs';

const allDestinations = controlRoomData.navigation
  .flatMap((item) => [item, ...(item.children ?? [])])
  .filter((item) => item.id !== 'overview');

test('每个侧边栏业务入口都有可展示的示例数据', () => {
  for (const destination of allDestinations) {
    const view = controlRoomData.moduleViews[destination.id];

    assert.ok(view, `${destination.id} 缺少模块数据`);
    assert.ok(view.title, `${destination.id} 缺少标题`);
    assert.ok(view.stats?.length >= 3, `${destination.id} 缺少指标示例`);
    assert.ok(view.rows?.length >= 3, `${destination.id} 缺少列表或记录示例`);
  }
});

test('模块数据保留任务、状态和下一步操作的信息层次', () => {
  const feed = controlRoomData.moduleViews['product-feed'];
  const transactions = controlRoomData.moduleViews.transactions;
  const balance = controlRoomData.moduleViews.balance;

  assert.equal(feed.rows.some((row) => row.tone === 'risk'), true);
  assert.equal(transactions.rows.some((row) => row.badge === 'Needs review'), true);
  assert.equal(balance.side.title, 'Payout runway');
});
