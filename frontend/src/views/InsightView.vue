<template>
  <div class="insight-view">
    <h2 class="page-title">AI 인사이트</h2>

    <div class="filter-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-btn"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        <span class="tab-icon">{{ tab.icon }}</span>
        {{ tab.label }}
        <span class="tab-count">{{ tabCount(tab.value) }}</span>
      </button>
    </div>

    <LoadingSpinner v-if="store.loading.insights" text="인사이트 분석 중..." />

    <div v-else-if="filteredInsights.length" class="insight-list">
      <div
        v-for="(insight, idx) in filteredInsights"
        :key="insight.id"
        class="insight-card card"
        :class="`insight-card--${insight.severity}`"
        :style="{ animationDelay: `${idx * 80}ms` }"
      >
        <div class="insight-card__header">
          <span class="severity-icon">{{ severityIcon(insight.severity) }}</span>
          <span class="severity-badge" :class="`severity--${insight.severity}`">{{ insight.severity }}</span>
          <span class="category-badge">{{ insight.category }}</span>
          <span class="file-info">
            📄 {{ insight.file }}
            <span v-if="insight.line">:{{ insight.line }}</span>
          </span>
        </div>
        <h3 class="insight-card__title">{{ insight.title }}</h3>
        <p class="insight-card__desc">{{ insight.description }}</p>
        <div class="insight-card__suggestion">
          <span class="suggestion-icon">💡</span>
          {{ insight.suggestion }}
        </div>
      </div>
    </div>

    <div v-else class="empty-state card">
      <p>해당하는 인사이트가 없습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard.js'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'

const store = useDashboardStore()
const activeTab = ref('all')

const tabs = [
  { label: 'All', value: 'all', icon: '🔍' },
  { label: 'Critical', value: 'critical', icon: '🔴' },
  { label: 'Warning', value: 'warning', icon: '🟡' },
  { label: 'Info', value: 'info', icon: '🔵' }
]

const filteredInsights = computed(() => {
  if (activeTab.value === 'all') return store.insights
  return store.insights.filter(i => i.severity === activeTab.value)
})

const tabCount = (tab) => {
  if (tab === 'all') return store.insights.length
  return store.insights.filter(i => i.severity === tab).length
}

const severityIcon = (severity) => {
  const icons = { critical: '🚨', warning: '⚠️', info: 'ℹ️' }
  return icons[severity] ?? '📌'
}

onMounted(() => {
  store.fetchInsights()
})
</script>

<style lang="scss" scoped>
.insight-view { padding: 0.5rem 0; }

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1.5rem;
  flex-wrap: wrap;
}

.tab-btn {
  padding: 0.45rem 1rem;
  border: 1px solid var(--border);
  border-radius: 8px;
  background: var(--surface);
  color: var(--text-muted);
  cursor: pointer;
  font-size: 0.85rem;
  transition: all var(--transition);
  display: flex;
  align-items: center;
  gap: 0.4rem;

  &.active {
    background: var(--primary);
    border-color: var(--primary);
    color: #fff;
  }
}

.tab-count {
  background: rgba(255,255,255,0.2);
  border-radius: 10px;
  padding: 0 0.4rem;
  font-size: 0.75rem;
}

.insight-list {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.insight-card {
  animation: fadeInUp 0.4s ease both;
  border-left: 4px solid var(--border);

  &--critical { border-left-color: var(--danger); }
  &--warning { border-left-color: var(--warning); }
  &--info { border-left-color: var(--info); }

  &__header {
    display: flex;
    align-items: center;
    gap: 0.5rem;
    margin-bottom: 0.5rem;
    flex-wrap: wrap;
  }

  &__title {
    font-size: 1rem;
    font-weight: 600;
    margin-bottom: 0.4rem;
  }

  &__desc {
    font-size: 0.9rem;
    color: var(--text-muted);
    margin-bottom: 0.75rem;
    line-height: 1.5;
  }

  &__suggestion {
    background: var(--bg);
    border-radius: 8px;
    padding: 0.6rem 0.9rem;
    font-size: 0.85rem;
    color: var(--text-muted);
    display: flex;
    gap: 0.5rem;
    align-items: flex-start;
  }
}

.severity-badge {
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 700;
  text-transform: uppercase;

  &--critical { background: rgba(239, 68, 68, 0.15); color: var(--danger); }
  &--warning { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
  &--info { background: rgba(59, 130, 246, 0.15); color: var(--info); }
}

.category-badge {
  padding: 0.15rem 0.5rem;
  border-radius: 20px;
  font-size: 0.72rem;
  font-weight: 600;
  background: rgba(99, 102, 241, 0.15);
  color: var(--primary);
}

.file-info {
  margin-left: auto;
  font-size: 0.78rem;
  color: var(--text-muted);
  font-family: monospace;
}

.suggestion-icon { flex-shrink: 0; }

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem;
}

@keyframes fadeInUp {
  from { opacity: 0; transform: translateY(16px); }
  to { opacity: 1; transform: translateY(0); }
}
</style>
