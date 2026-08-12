<script setup>
import Icon from './Icon.vue';

defineProps({
  workspace: { type: Object, default: () => ({}) },
  periods: { type: Array, default: () => [] },
  selectedPeriod: { type: String, default: '7d' },
  demoState: { type: String, default: 'normal' },
});

defineEmits(['period-change', 'demo-state-change', 'open-menu', 'action']);
</script>

<template>
  <header class="workspace-header">
    <button class="icon-button mobile-menu" type="button" aria-label="Open navigation" @click="$emit('open-menu')"><Icon name="grid" :size="20" /></button>
    <div class="workspace-context">
      <span class="eyebrow"><span class="eyebrow-dot"></span>Merchant operations</span>
      <div class="workspace-heading-row">
        <h1>Good morning, Guowv</h1>
        <span class="live-chip"><span></span> Live workspace</span>
      </div>
      <p>Here is what needs your attention across <strong>{{ workspace.name }}</strong> today.</p>
    </div>
    <div class="header-actions">
      <label class="select-control period-control">
        <Icon name="calendar" :size="16" />
        <span class="visually-hidden">Reporting period</span>
        <select :value="selectedPeriod" @change="$emit('period-change', $event.target.value)">
          <option v-for="period in periods" :key="period.id" :value="period.id">{{ period.label }}</option>
        </select>
        <Icon name="chevron" :size="14" />
      </label>
      <label class="select-control demo-control">
        <span class="visually-hidden">Demo state</span>
        <select :value="demoState" @change="$emit('demo-state-change', $event.target.value)">
          <option value="normal">Normal</option>
          <option value="empty">Empty state</option>
          <option value="syncing">Syncing</option>
          <option value="error">Error state</option>
          <option value="permission">Permission state</option>
        </select>
        <Icon name="chevron" :size="14" />
      </label>
      <button class="icon-button notification-button" type="button" aria-label="Notifications" @click="$emit('action', { label: 'Notifications' })">
        <Icon name="bell" :size="18" /><span class="notification-dot"></span>
      </button>
      <button class="avatar-button" type="button" aria-label="Open account menu" @click="$emit('action', { label: 'Account menu' })">G</button>
    </div>
  </header>
</template>
