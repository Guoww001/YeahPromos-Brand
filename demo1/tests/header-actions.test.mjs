import test from 'node:test';
import assert from 'node:assert/strict';
import {
  createHeaderActionState,
  markHeaderNotificationsRead,
  toggleHeaderActionPanel,
} from '../header-actions.mjs';

test('message and notification buttons toggle one popover at a time', () => {
  const source = createHeaderActionState();
  const messages = toggleHeaderActionPanel(source, 'messages');
  const notifications = toggleHeaderActionPanel(messages, 'notifications');
  const closed = toggleHeaderActionPanel(notifications, 'notifications');

  assert.equal(messages.openPanel, 'messages');
  assert.equal(notifications.openPanel, 'notifications');
  assert.equal(closed.openPanel, null);
});

test('marking notifications read preserves the open panel state', () => {
  const source = { ...createHeaderActionState(), openPanel: 'notifications' };
  const next = markHeaderNotificationsRead(source);
  assert.equal(source.notificationsRead, false);
  assert.equal(next.notificationsRead, true);
  assert.equal(next.openPanel, 'notifications');
});

test('download is handled by the browser action instead of opening a popover', () => {
  const source = createHeaderActionState();
  assert.deepEqual(toggleHeaderActionPanel(source, 'download'), source);
});
