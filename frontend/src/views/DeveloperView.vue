<template>
  <div class="developer-view">
    <h2 class="page-title">개발자 분석</h2>

    <LoadingSpinner v-if="store.loading.developers" text="개발자 데이터 불러오는 중..." />

    <div v-else-if="store.developers.length" class="dev-grid">
      <div
        v-for="dev in store.developers"
        :key="dev.id"
        class="dev-card card"
        @click="selectedDev = dev"
      >
        <div class="dev-card__avatar">{{ dev.name[0] }}</div>
        <h3 class="dev-card__name">{{ dev.name }}</h3>
        <span class="dev-card__role badge-role">{{ dev.role }}</span>
        <div class="dev-card__stats">
          <div class="stat-item">
            <span class="stat-num">{{ dev.totalPr }}</span>
            <span class="stat-label">총 PR</span>
          </div>
          <div class="stat-item">
            <span class="stat-num">{{ mergeRate(dev) }}%</span>
            <span class="stat-label">머지율</span>
          </div>
          <div class="stat-item">
            <span class="stat-num" :style="{ color: qualityColor(dev.avgQuality) }">{{ dev.avgQuality }}</span>
            <span class="stat-label">평균품질</span>
          </div>
        </div>
      </div>
    </div>

    <div v-else class="empty-state card">
      <p>개발자 데이터가 없습니다.</p>
    </div>

    <!-- 상세 모달 -->
    <teleport to="body">
      <transition name="fade-slide">
        <div v-if="selectedDev" class="modal-overlay" @click.self="selectedDev = null">
          <div class="modal card">
            <div class="modal__header">
              <div class="modal__avatar">{{ selectedDev.name[0] }}</div>
              <div>
                <h3>{{ selectedDev.name }}</h3>
                <span class="badge-role">{{ selectedDev.role }}</span>
              </div>
              <button class="modal__close" @click="selectedDev = null">✕</button>
            </div>
            <div class="modal__body">
              <RadarChart :radar="selectedDev.radar" :name="selectedDev.name" />
              <div class="modal__stats">
                <div class="modal-stat">
                  <span class="modal-stat__label">총 PR</span>
                  <span class="modal-stat__value">{{ selectedDev.totalPr }}</span>
                </div>
                <div class="modal-stat">
                  <span class="modal-stat__label">머지된 PR</span>
                  <span class="modal-stat__value">{{ selectedDev.mergedPr }}</span>
                </div>
                <div class="modal-stat">
                  <span class="modal-stat__label">머지율</span>
                  <span class="modal-stat__value">{{ mergeRate(selectedDev) }}%</span>
                </div>
                <div class="modal-stat">
                  <span class="modal-stat__label">평균 품질점수</span>
                  <span class="modal-stat__value" :style="{ color: qualityColor(selectedDev.avgQuality) }">{{ selectedDev.avgQuality }}점</span>
                </div>
                <div class="modal-stat">
                  <span class="modal-stat__label">평균 리뷰시간</span>
                  <span class="modal-stat__value">{{ selectedDev.avgReviewHours }}시간</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </transition>
    </teleport>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useDashboardStore } from '../stores/dashboard.js'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import RadarChart from '../components/charts/RadarChart.vue'

const store = useDashboardStore()
const selectedDev = ref(null)

const mergeRate = (dev) => dev.totalPr ? Math.round((dev.mergedPr / dev.totalPr) * 100) : 0

const qualityColor = (score) => {
  if (score >= 90) return 'var(--success)'
  if (score >= 70) return 'var(--warning)'
  return 'var(--danger)'
}

onMounted(() => {
  store.fetchDevelopers()
})
</script>

<style lang="scss" scoped>
.developer-view { padding: 0.5rem 0; }

.page-title {
  font-size: 1.5rem;
  font-weight: 700;
  margin-bottom: 1.5rem;
}

.dev-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(220px, 1fr));
  gap: 1rem;
}

.dev-card {
  text-align: center;
  cursor: pointer;
  transition: transform var(--transition), box-shadow var(--transition);

  &:hover {
    transform: translateY(-4px);
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.12);
  }

  &__avatar {
    width: 56px;
    height: 56px;
    border-radius: 50%;
    background: var(--primary);
    color: #fff;
    font-size: 1.5rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    margin: 0 auto 0.75rem;
  }

  &__name {
    font-size: 1.05rem;
    font-weight: 600;
    margin-bottom: 0.3rem;
  }

  &__stats {
    display: flex;
    justify-content: space-around;
    margin-top: 1rem;
    padding-top: 1rem;
    border-top: 1px solid var(--border);
  }
}

.stat-item {
  display: flex;
  flex-direction: column;
  align-items: center;
  gap: 0.2rem;
}

.stat-num {
  font-size: 1.1rem;
  font-weight: 700;
}

.stat-label {
  font-size: 0.7rem;
  color: var(--text-muted);
}

.badge-role {
  display: inline-block;
  padding: 0.15rem 0.6rem;
  border-radius: 20px;
  background: rgba(99, 102, 241, 0.15);
  color: var(--primary);
  font-size: 0.75rem;
  font-weight: 600;
}

.modal-overlay {
  position: fixed;
  inset: 0;
  background: rgba(0, 0, 0, 0.4);
  z-index: 200;
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 1rem;
}

.modal {
  width: 480px;
  max-width: 100%;
  max-height: 90vh;
  overflow-y: auto;

  &__header {
    display: flex;
    align-items: center;
    gap: 1rem;
    margin-bottom: 1rem;
    padding-bottom: 1rem;
    border-bottom: 1px solid var(--border);
  }

  &__avatar {
    width: 48px;
    height: 48px;
    border-radius: 50%;
    background: var(--primary);
    color: #fff;
    font-size: 1.3rem;
    font-weight: 700;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-shrink: 0;
  }

  &__close {
    margin-left: auto;
    background: none;
    border: none;
    cursor: pointer;
    color: var(--text-muted);
    font-size: 1rem;
    &:hover { color: var(--text); }
  }

  &__body {
    display: flex;
    flex-direction: column;
    gap: 1rem;
  }

  &__stats {
    display: grid;
    grid-template-columns: 1fr 1fr;
    gap: 0.75rem;
  }
}

.modal-stat {
  background: var(--bg);
  border-radius: 8px;
  padding: 0.75rem;
  display: flex;
  flex-direction: column;
  gap: 0.25rem;

  &__label { font-size: 0.75rem; color: var(--text-muted); }
  &__value { font-size: 1.1rem; font-weight: 700; }
}

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem;
}
</style>
