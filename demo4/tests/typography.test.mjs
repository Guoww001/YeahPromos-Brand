import assert from 'node:assert/strict';
import { readFileSync } from 'node:fs';
import test from 'node:test';

const styles = ['global.css', 'shell.css', 'modules.css', 'workflows.css'];

function fontSizeFor(css, selectorFragment) {
  for (const match of css.matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
    if (!match[1].includes(selectorFragment)) continue;
    const size = match[2].match(/font-size:\s*(\d+(?:\.\d+)?)px/);
    if (size) return Number(size[1]);
  }
  return 0;
}

function relativeLuminance(hex) {
  const channels = hex.match(/[a-f\d]{2}/gi).map((channel) => Number.parseInt(channel, 16) / 255);
  const linear = channels.map((channel) => channel <= 0.03928 ? channel / 12.92 : ((channel + 0.055) / 1.055) ** 2.4);
  return 0.2126 * linear[0] + 0.7152 * linear[1] + 0.0722 * linear[2];
}

function contrastRatio(foreground, background) {
  const lighter = Math.max(relativeLuminance(foreground), relativeLuminance(background));
  const darker = Math.min(relativeLuminance(foreground), relativeLuminance(background));
  return (lighter + 0.05) / (darker + 0.05);
}

test('所有文字标题都保留舒适的字母间距', () => {
  for (const file of styles) {
    const css = readFileSync(new URL(`../styles/${file}`, import.meta.url), 'utf8');
    for (const match of css.matchAll(/([^{}]+)\{([^{}]+)\}/g)) {
      const [, selector, declarations] = match;
      if (!/h[1-3](?:\b|\s|,|\.)/.test(selector)) continue;
      const tracking = declarations.match(/letter-spacing:\s*(-?\d*\.?\d+)em/);
      if (!tracking) continue;

      assert.ok(
        Number(tracking[1]) >= -0.04,
        `${file} 中 ${selector.trim()} 的字距 ${tracking[1]}em 过于紧凑`,
      );
    }
  }
});

test('侧边栏导航使用可读字号和触控行高', () => {
  const css = readFileSync(new URL('../styles/shell.css', import.meta.url), 'utf8');
  const primary = css.match(/\.nav-item\s*\{([^}]+)\}/)?.[1] ?? '';
  const secondary = css.match(/\.nav-child\s*\{([^}]+)\}/)?.[1] ?? '';

  assert.match(primary, /min-height:\s*(?:4[2-9]|[5-9]\d)px/);
  assert.match(primary, /font-size:\s*(?:1[1-9]|[2-9]\d)px/);
  assert.match(secondary, /min-height:\s*(?:3[4-9]|[4-9]\d)px/);
  assert.match(secondary, /font-size:\s*(?:10|1[1-9]|[2-9]\d)px/);
});

test('核心数据标签和值达到可读字号', () => {
  const modules = readFileSync(new URL('../styles/modules.css', import.meta.url), 'utf8');
  const workflows = readFileSync(new URL('../styles/workflows.css', import.meta.url), 'utf8');
  const moduleMinimums = new Map([
    ['.chart-label', 9],
    ['.chart-event', 9],
    ['.metric-rail-item span', 9],
    ['.metric-rail-item strong', 15],
    ['.module-metric span', 9],
    ['.module-metric strong', 28],
    ['.dossier-head', 9],
    ['.record-identity strong', 11],
    ['.record-identity small', 9],
    ['.record-value', 11],
    ['.record-state', 9],
    ['.ledger-header', 9],
  ]);
  const workflowMinimums = new Map([
    ['.workflow-field > span', 9],
    ['.workflow-field input', 10],
    ['.mini-table > span:first-child', 8],
    ['.mini-table > span:not(:first-child)', 9],
  ]);

  for (const [selector, minimum] of moduleMinimums) {
    assert.ok(fontSizeFor(modules, selector) >= minimum, `${selector} 的字号应不小于 ${minimum}px`);
  }
  for (const [selector, minimum] of workflowMinimums) {
    assert.ok(fontSizeFor(workflows, selector) >= minimum, `${selector} 的字号应不小于 ${minimum}px`);
  }
});

test('辅助数据文字在白色背景上达到 WCAG AA 对比度', () => {
  const tokens = readFileSync(new URL('../styles/tokens.css', import.meta.url), 'utf8');
  const muted = tokens.match(/--muted:\s*(#[a-f\d]{6})/i)?.[1];

  assert.ok(muted, '缺少 --muted 颜色变量');
  assert.ok(contrastRatio(muted, '#FFFFFF') >= 4.5, `${muted} 在白底上的对比度不足 4.5:1`);
});
