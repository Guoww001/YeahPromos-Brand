<script setup>
import Icon from './Icon.vue';

defineProps({ partners: { type: Array, default: () => [] } });
defineEmits(['view']);
</script>

<template>
  <article class="bento-card partner-card">
    <div class="card-heading">
      <div><span class="section-kicker">Partner momentum</span><h2>Who is moving the needle</h2></div>
      <button class="icon-button quiet" type="button" aria-label="Open partner performance" @click="$emit('view')"><Icon name="arrow" :size="17" /></button>
    </div>
    <div class="partner-list">
      <button v-for="(partner, index) in partners" :key="partner.id" class="partner-row" type="button" @click="$emit('view', partner.id)">
        <span class="partner-rank">0{{ index + 1 }}</span>
        <span class="partner-avatar" :style="{ background: partner.color }">{{ partner.initials }}</span>
        <span class="partner-name"><strong>{{ partner.name }}</strong><small>{{ partner.category }}</small></span>
        <span class="partner-performance"><strong>{{ partner.revenue }}</strong><span class="partner-bar"><i :style="{ width: `${partner.share}%` }"></i></span></span>
        <Icon name="chevron" :size="14" class="partner-chevron" />
      </button>
    </div>
    <button class="card-link" type="button" @click="$emit('view')">View all partners <Icon name="arrow" :size="14" /></button>
  </article>
</template>
