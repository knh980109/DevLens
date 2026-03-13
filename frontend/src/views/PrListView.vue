<template>
  <div class="pr-list">
    <h2 class="page-title">PR 목록</h2>

    <div v-if="store.errors.pullRequests" class="api-error-banner">
      ⚠️ {{ store.errors.pullRequests }}
    </div>

    <div class="filter-tabs">
      <button
        v-for="tab in tabs"
        :key="tab.value"
        class="tab-btn"
        :class="{ active: activeTab === tab.value }"
        @click="activeTab = tab.value"
      >
        {{ tab.label }}
        <span class="tab-count">{{ tabCount(tab.value) }}</span>
      </button>
    </div>

    <LoadingSpinner v-if="store.loading.pullRequests" text="PR 불러오는 중..." />

    <div v-else-if="filteredPrs.length" class="card table-wrapper">
      <table class="pr-table">
        <thead>
          <tr>
            <th>제목</th>
            <th>작성자</th>
            <th>리뷰어</th>
            <th>품질점수</th>
            <th>상태</th>
            <th>날짜</th>
          </tr>
        </thead>
        <tbody>
          <tr
            v-for="pr in filteredPrs"
            :key="pr.id"
            class="pr-row"
            @click="selectedPr = pr"
          >
            <td class="pr-title">{{ pr.title }}</td>
            <td>{{ pr.author }}</td>
            <td>{{ pr.reviewer }}</td>
            <td>
              <span class="quality-badge" :class="qualityClass(pr.qualityScore)">
                {{ pr.qualityScore }}
              </span>
            </td>
            <td>
              <span class="badge" :class="`badge--${pr.status}`">{{ pr.status }}</span>
            </td>
            <td class="pr-date">{{ pr.createdAt }}</td>
          </tr>
        </tbody>
      </table>
    </div>

    <div v-else class="empty-state card">
      <p>해당하는 PR이 없습니다.</p>
    </div>

    <PrDetailPanel :pr="selectedPr" @close="selectedPr = null" />
  </div>
</template>

<script setup lang="ts">
import { ref, computed, onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard'
import { qualityClass } from '../utils/quality'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import PrDetailPanel from '../components/pr/PrDetailPanel.vue'

const store = useDashboardStore()
const activeTab = ref('all')
const selectedPr = ref(null)

const tabs = [
  { label: 'All', value: 'all' },
  { label: 'Open', value: 'open' },
  { label: 'Merged', value: 'merged' },
  { label: 'Closed', value: 'closed' }
]

const filteredPrs = computed(() => {
  if (activeTab.value === 'all') return store.pullRequests
  return store.pullRequests.filter(pr => pr.status === activeTab.value)
})

const tabCount = (tab: string): number => {
  if (tab === 'all') return store.pullRequests.length
  return store.pullRequests.filter(pr => pr.status === tab).length
}


onMounted(() => {
  store.fetchPullRequests()
})
</script>

<style lang="scss" scoped>
.pr-list { padding: 0.5rem 0; }

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.filter-tabs {
  display: flex;
  gap: 0.5rem;
  margin-bottom: 1rem;
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

.table-wrapper { padding: 0; overflow-x: auto; }

.pr-table {
  width: 100%;
  border-collapse: collapse;

  th {
    padding: 0.75rem 1rem;
    text-align: left;
    font-size: 0.8rem;
    color: var(--text-muted);
    border-bottom: 1px solid var(--border);
    white-space: nowrap;
  }

  td {
    padding: 0.85rem 1rem;
    border-bottom: 1px solid var(--border);
    font-size: 0.9rem;
  }
}

.pr-row {
  cursor: pointer;
  transition: background-color var(--transition);
  &:hover { background: var(--bg); }
  &:last-child td { border-bottom: none; }
}

.pr-title {
  max-width: 280px;
  white-space: nowrap;
  overflow: hidden;
  text-overflow: ellipsis;
}

.pr-date { color: var(--text-muted); font-size: 0.8rem; }

.quality-badge {
  display: inline-block;
  padding: 0.2rem 0.6rem;
  border-radius: 6px;
  font-weight: 700;
  font-size: 0.85rem;

  &.quality--high { background: rgba(34, 197, 94, 0.15); color: var(--success); }
  &.quality--mid { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
  &.quality--low { background: rgba(239, 68, 68, 0.15); color: var(--danger); }
}

.badge {
  padding: 0.2rem 0.6rem;
  border-radius: 20px;
  font-size: 0.75rem;
  font-weight: 600;
  text-transform: uppercase;

  &--open { background: rgba(245, 158, 11, 0.15); color: var(--warning); }
  &--merged { background: rgba(34, 197, 94, 0.15); color: var(--success); }
  &--closed { background: rgba(239, 68, 68, 0.15); color: var(--danger); }
}

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem;
}
</style>
