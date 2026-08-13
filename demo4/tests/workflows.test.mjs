import assert from 'node:assert/strict';
import test from 'node:test';
import { workflowCatalog, workflowForPage } from '../scripts/workflows.mjs';
import { renderApp } from '../scripts/render.mjs';
import { advanceWorkflow, closeWorkflow, createBrandPulseState, navigateTo, openWorkflow } from '../scripts/state.mjs';

test('参考图中的核心功能被映射为十类展示工作流', () => {
  const expected = [
    'partner-invite', 'bulk-invite', 'application-review', 'product-filter',
    'commission-rule', 'coupon-builder', 'template-library', 'report-builder',
    'payment-flow', 'permission-builder',
  ];

  for (const id of expected) assert.ok(workflowCatalog[id], `${id} 缺少工作流定义`);
  assert.equal(workflowForPage('influencer-discovery'), 'partner-invite');
  assert.equal(workflowForPage('product-feed'), 'product-filter');
  assert.equal(workflowForPage('team'), 'permission-builder');
});

test('工作流抽屉支持打开、推进、关闭并在切换页面时重置', () => {
  const opened = openWorkflow(createBrandPulseState(), 'commission-rule');
  const advanced = advanceWorkflow(opened);

  assert.equal(opened.workflowId, 'commission-rule');
  assert.equal(opened.workflowStep, 0);
  assert.equal(advanced.workflowStep, 1);
  assert.equal(closeWorkflow(advanced).workflowId, null);
  assert.equal(navigateTo(advanced, 'overview').workflowId, null);
});

test('代表页面显示参考能力入口并渲染对应功能表单', () => {
  const productPage = renderApp(navigateTo(createBrandPulseState(), 'product-feed'));
  const rulePanel = renderApp(openWorkflow(navigateTo(createBrandPulseState(), 'commission-rules'), 'commission-rule'));
  const permissionPanel = renderApp(openWorkflow(navigateTo(createBrandPulseState(), 'team'), 'permission-builder'));

  assert.match(productPage, /REFERENCE-BACKED WORKFLOW/);
  assert.match(productPage, /data-workflow="product-filter"/);
  assert.match(rulePanel, /role="dialog"[^>]+aria-label="Commission rule builder"/);
  assert.match(rulePanel, /Parent ASIN/);
  assert.match(permissionPanel, /Permission allowed/);
});
