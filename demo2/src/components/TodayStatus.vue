<script setup>
import Icon from './Icon.vue';

defineProps({
  status: { type: Object, default: () => ({}) },
  openTaskCount: { type: Number, default: 0 },
});

defineEmits(['open-task']);
</script>

<template>
  <article class="bento-card status-hero">
    <div class="status-hero-topline">
      <div>
        <span class="section-kicker">Today’s business status</span>
        <span class="status-pill success"><span></span>{{ status.state }}</span>
      </div>
      <span class="status-date">{{ status.periodLabel }}</span>
    </div>
    <div class="status-hero-main">
      <div class="status-score" :style="{ '--score': `${status.score}%` }" aria-label="Operational health score">
        <div class="status-score-inner"><strong>{{ status.score }}</strong><span>/100</span></div>
      </div>
      <div class="status-copy">
        <h2>{{ status.headline }}</h2>
        <p>{{ status.description }}</p>
        <div class="status-summary"><Icon name="trend" :size="16" /><span>{{ status.summary }}</span></div>
      </div>
    </div>
    <div class="status-hero-footer">
      <div class="status-footer-stat"><span>Open tasks</span><strong>{{ openTaskCount }}</strong></div>
      <div class="status-footer-stat"><span>Revenue trend</span><strong class="positive">{{ status.todayDelta }}</strong></div>
      <div class="status-footer-stat"><span>Data health</span><strong>{{ status.syncLabel }}</strong></div>
      <button class="button button-primary" type="button" @click="$emit('open-task')">Open action center <Icon name="arrow" :size="15" /></button>
    </div>
  </article>
</template>
