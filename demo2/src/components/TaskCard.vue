<script setup>
import Icon from './Icon.vue';

defineProps({ item: { type: Object, default: () => ({}) } });
defineEmits(['action']);
</script>

<template>
  <article class="task-card" :class="`tone-${item.tone ?? 'lake'}`">
    <div class="task-icon"><Icon :name="item.icon" :size="18" /></div>
    <div class="task-content">
      <div class="task-meta"><span>{{ item.category }}</span><span class="task-time"><Icon name="clock" :size="13" /> {{ item.due }}</span></div>
      <h3>{{ item.title }}</h3>
      <p>{{ item.description }}</p>
      <button class="text-button" type="button" @click="$emit('action', item)">{{ item.action }} <Icon name="arrow" :size="14" /></button>
    </div>
  </article>
</template>
