<script setup>
import Icon from './Icon.vue';

defineProps({
  metric: { type: Object, default: () => ({}) },
  index: { type: Number, default: 0 },
});
</script>

<template>
  <article class="metric-card" :style="{ '--metric-delay': `${index * 55}ms` }">
    <div class="metric-card-topline"><span class="metric-icon" :class="`metric-${metric.tone ?? 'lake'}`"><Icon :name="metric.icon" :size="17" /></span><span class="metric-label">{{ metric.label }}</span><span class="metric-change" :class="{ negative: String(metric.change).startsWith('-') }">{{ metric.change }}</span></div>
    <strong class="metric-value">{{ metric.value }}</strong>
    <span class="metric-note">{{ metric.note }}</span>
    <div class="mini-bars" aria-hidden="true"><span v-for="(height, barIndex) in [35, 54, 42, 68, 48, 76, 62]" :key="barIndex" :style="{ height: `${height + ((index + barIndex) % 3) * 5}%` }"></span></div>
  </article>
</template>
