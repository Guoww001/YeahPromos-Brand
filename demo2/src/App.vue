<script setup>
import { ref } from 'vue';
import Icon from './components/Icon.vue';
import ModulePlaceholder from './components/ModulePlaceholder.vue';
import PartnerDrawer from './components/PartnerDrawer.vue';
import PartnerRanking from './components/PartnerRanking.vue';
import QuickActions from './components/QuickActions.vue';
import RiskPanel from './components/RiskPanel.vue';
import SidebarNav from './components/SidebarNav.vue';
import TaskCard from './components/TaskCard.vue';
import TodayStatus from './components/TodayStatus.vue';
import MetricCard from './components/MetricCard.vue';
import WorkspaceHeader from './components/WorkspaceHeader.vue';
import { createDashboardStore } from './state/useDashboardStore.js';

const {
  state,
  currentPeriod,
  currentSnapshot,
  operationalStatus,
  openTaskCount,
  actionItems,
  riskItems,
  campaignPulse,
  activePartner,
  navigationContext,
  selectPeriod,
  selectDemoState,
  navigateTo,
  toggleNavigationGroup,
  openPartner,
  closePartner,
} = createDashboardStore();

const toastMessage = ref('');
let toastTimer;

function showToast(message) {
  toastMessage.value = message;
  window.clearTimeout(toastTimer);
  toastTimer = window.setTimeout(() => { toastMessage.value = ''; }, 2800);
}

function handleNavigation(id) {
  navigateTo(id);
  if (id !== 'overview') showToast(`${navigationContext.value?.label ?? 'Workspace'} module selected`);
}

function handleAction(item = {}) {
  if (item.navigationId) {
    navigateTo(item.navigationId);
    showToast(`${item.action ?? item.label ?? 'Action'} is ready to continue`);
    return;
  }
  showToast(`${item.label ?? 'Action'} is ready to continue`);
}

function handlePartnerView(partnerId) {
  if (partnerId) {
    openPartner(partnerId);
    return;
  }
  navigateTo('my-partners');
  showToast('Partner performance module selected');
}

function openActionCenter() {
  navigateTo('applications');
  showToast('Action center opened');
}

function goBack() {
  navigateTo('overview');
}
</script>

<template>
  <div class="app-shell" :class="{ 'is-navigation-open': state.navOpen }">
    <SidebarNav
      :navigation="state.navigation"
      :active-id="state.activeNavigationId"
      :expanded-groups="state.expandedGroups"
      :open="state.navOpen"
      @navigate="handleNavigation"
      @toggle-group="toggleNavigationGroup"
      @close="state.navOpen = false"
    />

    <main id="main-content" class="main-content">
      <div class="content-frame">
        <WorkspaceHeader
          :workspace="state.workspace"
          :periods="state.periods"
          :selected-period="state.selectedPeriod"
          :demo-state="state.demoState"
          @period-change="selectPeriod"
          @demo-state-change="selectDemoState"
          @open-menu="state.navOpen = true"
          @action="handleAction"
        />

        <div v-if="state.demoState !== 'normal'" class="demo-banner" :class="`demo-${state.demoState}`">
          <Icon :name="state.demoState === 'error' ? 'alert' : state.demoState === 'empty' ? 'spark' : 'refresh'" :size="17" />
          <span v-if="state.demoState === 'empty'">No activity in this selected period yet. Your workspace is ready for its first signal.</span>
          <span v-else-if="state.demoState === 'syncing'">Sync in progress. New partner and transaction signals will appear here shortly.</span>
          <span v-else-if="state.demoState === 'permission'">You are viewing a limited demo state. Ask an owner to unlock transaction actions.</span>
          <span v-else>One data source needs attention. The rest of the cockpit remains available.</span>
          <button type="button" @click="selectDemoState('normal')">Reset state <Icon name="x" :size="14" /></button>
        </div>

        <template v-if="state.activeNavigationId === 'overview'">
          <section class="cockpit-intro" aria-labelledby="cockpit-title">
            <div>
              <span class="section-kicker">Operations cockpit</span>
              <h2 id="cockpit-title">A calm view of what matters next.</h2>
            </div>
            <div class="intro-context"><span class="context-icon"><Icon name="store" :size="17" /></span><span><strong>{{ state.workspace.store }}</strong><small>Primary sales channel</small></span></div>
          </section>

          <section class="bento-grid" aria-label="Business overview">
            <TodayStatus class="bento-status" :status="operationalStatus" :open-task-count="openTaskCount" @open-task="openActionCenter" />
            <article class="bento-card task-summary-card">
              <div class="card-heading"><div><span class="section-kicker">Needs your eye</span><h2>Action center</h2></div><span class="large-count">{{ openTaskCount }}</span></div>
              <p>{{ openTaskCount ? 'A short list of actions is keeping the week moving.' : 'The queue is clear for this period.' }}</p>
              <div class="task-summary-list"><span v-for="item in actionItems.slice(0, 3)" :key="item.id"><i :class="`dot-${item.tone}`"></i>{{ item.title }}</span><span v-if="!actionItems.length"><i class="dot-success"></i>Nothing waiting for review</span></div>
              <button class="card-link" type="button" @click="openActionCenter">Review action center <Icon name="arrow" :size="14" /></button>
            </article>
            <article class="bento-card campaign-pulse-card">
              <div class="card-heading"><div><span class="section-kicker">Campaign pulse</span><h2>Ready when you are</h2></div><span class="campaign-orb"><Icon name="spark" :size="16" /></span></div>
              <div v-if="campaignPulse.length" class="campaign-list"><button v-for="campaign in campaignPulse" :key="campaign.id" class="campaign-row" type="button" @click="handleAction(campaign)"><span class="campaign-icon" :class="`campaign-${campaign.tone}`"><Icon :name="campaign.icon" :size="16" /></span><span><strong>{{ campaign.name }}</strong><small>{{ campaign.status }} · {{ campaign.meta }}</small></span><span class="campaign-progress"><i :style="{ width: `${campaign.completion}%` }"></i></span></button></div>
              <div v-else class="empty-mini"><strong>No campaigns in flight.</strong><span>Create a campaign to start a new signal.</span></div>
              <button class="card-link" type="button" @click="handleAction({ navigationId: 'all-campaigns', label: 'All campaigns' })">Open campaign board <Icon name="arrow" :size="14" /></button>
            </article>
          </section>

          <section class="section-block task-section" aria-labelledby="tasks-title">
            <div class="section-heading"><div><span class="section-kicker">The work queue</span><h2 id="tasks-title">Next best actions</h2></div><span class="section-caption">{{ currentPeriod?.label }}</span></div>
            <div v-if="actionItems.length" class="task-grid"><TaskCard v-for="item in actionItems" :key="item.id" :item="item" @action="handleAction" /></div>
            <div v-else class="empty-state"><span class="empty-check"><Icon name="check" :size="19" /></span><div><strong>All caught up.</strong><p>There are no open actions for this period. This is a good moment to explore partner momentum.</p></div><button class="button button-secondary" type="button" @click="handleAction({ navigationId: 'my-partners', label: 'My partners' })">View partners <Icon name="arrow" :size="14" /></button></div>
          </section>

          <section class="section-block metric-section" aria-labelledby="metrics-title">
            <div class="section-heading"><div><span class="section-kicker">Signal dashboard</span><h2 id="metrics-title">The numbers behind the motion</h2></div><button class="subtle-button" type="button" @click="handleAction({ navigationId: 'performance', label: 'Performance' })">Open performance <Icon name="arrow" :size="14" /></button></div>
            <div class="metric-grid"><MetricCard v-for="(metric, index) in currentSnapshot.metrics" :key="metric.id" :metric="metric" :index="index" /></div>
          </section>

          <section class="lower-grid">
            <PartnerRanking :partners="currentSnapshot.partnerPerformance.map((partner, index) => ({ ...state.partners[index], revenue: partner.amount, share: partner.percent }))" @view="handlePartnerView" />
            <RiskPanel :risks="riskItems" @action="handleAction" />
          </section>

          <section class="lower-grid lower-grid-secondary">
            <QuickActions :actions="state.quickActions" @action="handleAction" />
            <article class="bento-card operating-note">
              <div class="note-illustration"><span></span><span></span><span></span><span></span><span></span></div>
              <div><span class="section-kicker">Operator note</span><h2>Keep the next decision small.</h2><p>Clear one queue, improve one feed, or grow one partner relationship. The cockpit is designed to keep momentum visible.</p><button class="card-link" type="button" @click="handleAction({ navigationId: 'help', label: 'Help center' })">Explore playbook <Icon name="arrow" :size="14" /></button></div>
            </article>
          </section>
        </template>

        <ModulePlaceholder v-else :context="navigationContext" @back="goBack" />
      </div>
    </main>

    <button v-if="state.navOpen" class="sidebar-backdrop" type="button" aria-label="Close navigation" @click="state.navOpen = false"></button>
    <PartnerDrawer :open="Boolean(activePartner)" :partner="activePartner" @close="closePartner" @navigate="handlePartnerView" />
    <Transition name="toast"><div v-if="toastMessage" class="toast-message"><Icon name="check" :size="16" /> {{ toastMessage }}</div></Transition>
  </div>
</template>
