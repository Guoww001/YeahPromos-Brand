<script setup>
import Icon from './Icon.vue';

defineProps({ actions: { type: Array, default: () => [] } });
defineEmits(['action']);
</script>

<template>
  <article class="bento-card quick-actions">
    <div class="card-heading"><div><span class="section-kicker">Move faster</span><h2>Quick actions</h2></div><Icon name="spark" :size="18" class="heading-spark" /></div>
    <div class="quick-action-list">
      <button v-for="action in actions" :key="action.id" class="quick-action" type="button" @click="$emit('action', action)">
        <span class="quick-action-icon" :class="`quick-${action.tone ?? 'lake'}`"><Icon :name="action.icon" :size="17" /></span>
        <span><strong>{{ action.label }}</strong><small>{{ action.description }}</small></span>
        <Icon name="arrow" :size="14" />
      </button>
    </div>
  </article>
</template>
