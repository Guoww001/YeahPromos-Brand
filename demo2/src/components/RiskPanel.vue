<script setup>
import Icon from './Icon.vue';

defineProps({ risks: { type: Array, default: () => [] } });
defineEmits(['action']);
</script>

<template>
  <article class="bento-card risk-panel">
    <div class="card-heading">
      <div><span class="section-kicker">Risk radar</span><h2>Small issues, clear next steps</h2></div>
      <span class="risk-count">{{ risks.length }} open</span>
    </div>
    <div v-if="risks.length" class="risk-list">
      <div v-for="risk in risks" :key="risk.id" class="risk-row" :class="`risk-${risk.tone}`">
        <span class="risk-icon"><Icon :name="risk.icon" :size="16" /></span>
        <div class="risk-copy"><span class="risk-label">{{ risk.label }}</span><strong>{{ risk.title }}</strong><small>{{ risk.meta }}</small></div>
        <button class="icon-button quiet" type="button" :aria-label="risk.action" @click="$emit('action', risk)"><Icon name="arrow" :size="15" /></button>
      </div>
    </div>
    <div v-else class="empty-mini"><span class="empty-check"><Icon name="check" :size="16" /></span><strong>Nothing urgent right now.</strong><span>Your risk radar is clear.</span></div>
  </article>
</template>
