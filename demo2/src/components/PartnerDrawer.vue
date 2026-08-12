<script setup>
import Icon from './Icon.vue';

defineProps({
  open: { type: Boolean, default: false },
  partner: { type: Object, default: null },
});

defineEmits(['close', 'navigate']);
</script>

<template>
  <div v-if="open && partner" class="drawer-layer">
    <button class="drawer-backdrop" type="button" aria-label="Close partner details" @click="$emit('close')"></button>
    <aside class="partner-drawer" role="dialog" aria-modal="true" aria-label="Partner details">
      <div class="drawer-header"><div><span class="section-kicker">Partner profile</span><h2>{{ partner.name }}</h2></div><button class="icon-button" type="button" aria-label="Close" @click="$emit('close')"><Icon name="x" :size="18" /></button></div>
      <div class="drawer-profile"><span class="drawer-avatar" :style="{ background: partner.color }">{{ partner.initials }}</span><div><strong>{{ partner.category }}</strong><span>{{ partner.status }}</span></div><span class="status-pill success"><span></span> Active</span></div>
      <div class="drawer-stat-grid"><div><span>Attributed revenue</span><strong>{{ partner.revenue }}</strong></div><div><span>Share of mix</span><strong>{{ partner.share }}%</strong></div><div><span>Clicks</span><strong>{{ partner.clicks }}</strong></div><div><span>Conversion</span><strong>{{ partner.conversion }}</strong></div></div>
      <div class="drawer-note"><Icon name="trend" :size="17" /><p>{{ partner.insight }}</p></div>
      <div class="drawer-actions"><button class="button button-primary" type="button" @click="$emit('navigate', partner.id)">Open performance <Icon name="arrow" :size="15" /></button><button class="button button-secondary" type="button" @click="$emit('close')">Close</button></div>
    </aside>
  </div>
</template>
