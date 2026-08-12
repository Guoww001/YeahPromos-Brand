<script setup>
import Icon from './Icon.vue';

defineProps({
  navigation: { type: Array, default: () => [] },
  activeId: { type: String, default: 'overview' },
  expandedGroups: { type: Array, default: () => [] },
  open: { type: Boolean, default: false },
});

const emit = defineEmits(['navigate', 'toggle-group', 'close']);
</script>

<template>
  <aside class="sidebar" :class="{ 'is-open': open }" aria-label="Primary navigation">
    <div class="sidebar-topline">
      <div class="brand-lockup">
        <span class="brand-mark"><span></span><span></span><span></span><span></span></span>
        <span>
          <strong>YeahPromos</strong>
          <small>Merchant cockpit</small>
        </span>
      </div>
      <button class="icon-button sidebar-close" type="button" aria-label="Close navigation" @click="emit('close')">
        <Icon name="x" :size="18" />
      </button>
    </div>

    <div class="sidebar-context">
      <span class="context-dot"></span>
      <span>Northstar Labs</span>
      <Icon name="chevron" :size="15" />
    </div>

    <p class="nav-label">Workspace</p>
    <nav class="primary-nav">
      <template v-for="item in navigation" :key="item.id">
        <button
          v-if="!item.children"
          class="nav-item"
          :class="{ active: activeId === item.id }"
          type="button"
          @click="emit('navigate', item.id)"
        >
          <Icon :name="item.icon" :size="17" />
          <span>{{ item.label }}</span>
          <span v-if="item.badge" class="nav-badge">{{ item.badge }}</span>
        </button>
        <div v-else class="nav-group">
          <button class="nav-item nav-group-toggle" :class="{ active: item.children.some((child) => activeId === child.id) }" type="button" @click="emit('toggle-group', item.id)">
            <Icon :name="item.icon" :size="17" />
            <span>{{ item.label }}</span>
            <Icon class="nav-chevron" :class="{ rotated: expandedGroups.includes(item.id) }" name="chevron" :size="14" />
          </button>
          <div v-if="expandedGroups.includes(item.id)" class="nav-children">
            <button v-for="child in item.children" :key="child.id" class="nav-child" :class="{ active: activeId === child.id }" type="button" @click="emit('navigate', child.id)">
              <span class="child-marker"></span>
              <span>{{ child.label }}</span>
            </button>
          </div>
        </div>
      </template>
    </nav>

    <div class="sidebar-spacer"></div>
    <div class="sidebar-footer-links">
      <button class="footer-link" type="button" @click="emit('navigate', 'help')"><Icon name="help" :size="17" /> Help center</button>
      <button class="footer-link" type="button" @click="emit('navigate', 'settings')"><Icon name="settings" :size="17" /> Settings</button>
    </div>
    <div class="account-chip">
      <span class="account-avatar">G</span>
      <span class="account-copy"><strong>Guowv</strong><small>Owner access</small></span>
      <span class="account-status"></span>
    </div>
  </aside>
</template>
