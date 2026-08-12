<script setup>
import Icon from './Icon.vue';

defineProps({ context: { type: Object, default: () => ({}) } });
defineEmits(['back']);
</script>

<template>
  <section class="module-placeholder">
    <div class="placeholder-art"><Icon name="grid" :size="28" /></div>
    <span class="section-kicker">Workspace module</span>
    <h2>{{ context.label }}</h2>
    <p>This demo keeps the navigation path intact. The {{ context.label }} module can be connected to its production data contract later.</p>
    <button class="button button-primary" type="button" @click="$emit('back')"><Icon name="arrow" class="back-arrow" :size="15" /> Back to cockpit</button>
  </section>
</template>
