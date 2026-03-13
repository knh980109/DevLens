<template>
  <div class="overview">
    <div class="page-header">
      <div>
        <h2 class="page-title">Overview</h2>
        <p class="page-sub">2024년 9월 — 12월 코드 리뷰 현황</p>
      </div>
    </div>

    <LoadingSpinner v-if="store.loading.overview" text="데이터 불러오는 중..." />

    <template v-else-if="store.overview">
      <!-- 상단 스탯 카드 6개 -->
      <section class="stat-grid">
        <StatCard title="전체 PR" :value="store.overview.totalPr" icon="📋" color="var(--primary)" />
        <StatCard title="오픈 PR" :value="store.overview.openPr" icon="🔓" color="var(--warning)" />
        <StatCard title="머지된 PR" :value="store.overview.mergedPr" icon="✅" color="var(--success)" />
        <StatCard title="클로즈 PR" :value="store.overview.closedPr" icon="🚫" color="var(--danger)" />
        <StatCard title="평균 품질점수" :value="store.overview.avgQualityScore" unit="점" icon="⭐" color="var(--info)" />
        <StatCard title="평균 리뷰시간" :value="store.overview.avgReviewHours" unit="h" icon="⏱" color="#a855f7" />
      </section>

      <!-- 주간 PR 추이 (전체 너비) -->
      <div class="card chart-card chart-card--full">
        <div class="chart-header">
          <div>
            <h3 class="chart-title">주간 PR 추이</h3>
            <p class="chart-sub">전체 PR vs 머지된 PR</p>
          </div>
          <div class="chart-legend">
            <span class="legend-item legend-item--primary">전체 PR</span>
            <span class="legend-item legend-item--success">머지 PR</span>
          </div>
        </div>
        <apexchart type="area" :height="260" :options="lineOptions" :series="lineSeries" />
      </div>

      <div class="chart-grid">
        <!-- 품질 트렌드 -->
        <div class="card chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">코드 품질 트렌드</h3>
              <p class="chart-sub">주간 평균 품질점수</p>
            </div>
          </div>
          <apexchart type="line" :height="220" :options="qualityOptions" :series="qualitySeries" />
        </div>

        <!-- 리뷰 소요시간 게이지 -->
        <div class="card chart-card">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">평균 리뷰 소요시간</h3>
              <p class="chart-sub">목표: 24시간 이내</p>
            </div>
          </div>
          <GaugeChart :value="store.overview.avgReviewHours" label="시간" color="#f59e0b" :height="220" />
        </div>

        <!-- 개발자별 PR -->
        <div class="card chart-card chart-card--wide">
          <div class="chart-header">
            <div>
              <h3 class="chart-title">개발자별 PR 현황</h3>
              <p class="chart-sub">전체 PR vs 머지 PR</p>
            </div>
          </div>
          <apexchart type="bar" :height="240" :options="barOptions" :series="barSeries" />
        </div>
      </div>
    </template>

    <div v-else class="empty-state card">
      <p>데이터를 불러오지 못했습니다.</p>
    </div>
  </div>
</template>

<script setup>
import { computed, onMounted } from 'vue'
import VueApexCharts from 'vue3-apexcharts'
import { useDashboardStore } from '../stores/dashboard.js'
import StatCard from '../components/common/StatCard.vue'
import LoadingSpinner from '../components/common/LoadingSpinner.vue'
import GaugeChart from '../components/charts/GaugeChart.vue'

const apexchart = VueApexCharts
const store = useDashboardStore()

const isDark = () => document.documentElement.getAttribute('data-theme') === 'dark'

const weeks = computed(() => (store.overview?.weeklyPrData ?? []).map(d => d.week))

// 주간 PR 추이 (area)
const lineSeries = computed(() => [
  { name: '전체 PR', data: (store.overview?.weeklyPrData ?? []).map(d => d.count) },
  { name: '머지 PR', data: (store.overview?.weeklyPrData ?? []).map(d => d.merged) }
])

const lineOptions = computed(() => ({
  chart: { toolbar: { show: false }, background: 'transparent', zoom: { enabled: false } },
  theme: { mode: isDark() ? 'dark' : 'light' },
  colors: ['#6366f1', '#22c55e'],
  fill: { type: 'gradient', gradient: { shadeIntensity: 1, opacityFrom: 0.35, opacityTo: 0.03 } },
  stroke: { curve: 'smooth', width: 2.5 },
  xaxis: { categories: weeks.value, labels: { style: { fontSize: '11px' } } },
  yaxis: { min: 0 },
  dataLabels: { enabled: false },
  grid: { borderColor: isDark() ? '#334155' : '#e2e8f0', strokeDashArray: 4 },
  tooltip: { theme: isDark() ? 'dark' : 'light' },
  legend: { show: false },
  markers: { size: 4, hover: { size: 6 } }
}))

// 품질 트렌드
const qualitySeries = computed(() => [{
  name: '품질점수',
  data: (store.overview?.qualityTrend ?? []).map(d => d.score)
}])

const qualityOptions = computed(() => ({
  chart: { toolbar: { show: false }, background: 'transparent', zoom: { enabled: false } },
  theme: { mode: isDark() ? 'dark' : 'light' },
  colors: ['#3b82f6'],
  stroke: { curve: 'smooth', width: 2.5 },
  xaxis: {
    categories: (store.overview?.qualityTrend ?? []).map(d => d.week),
    labels: { style: { fontSize: '11px' } }
  },
  yaxis: { min: 70, max: 100 },
  dataLabels: { enabled: false },
  grid: { borderColor: isDark() ? '#334155' : '#e2e8f0', strokeDashArray: 4 },
  tooltip: { theme: isDark() ? 'dark' : 'light', y: { formatter: v => `${v}점` } },
  markers: { size: 4, hover: { size: 6 } },
  annotations: {
    yaxis: [{ y: 85, borderColor: '#f59e0b', borderWidth: 1, strokeDashArray: 4,
      label: { text: '목표 85점', style: { color: '#f59e0b', background: 'transparent', fontSize: '11px' } }
    }]
  }
}))

// 개발자 bar
const barSeries = computed(() => [
  { name: '전체 PR', data: (store.overview?.developerPrCounts ?? []).map(d => d.count) },
  { name: '머지 PR', data: (store.overview?.developerPrCounts ?? []).map(d => d.merged) }
])

const barOptions = computed(() => ({
  chart: { toolbar: { show: false }, background: 'transparent' },
  theme: { mode: isDark() ? 'dark' : 'light' },
  xaxis: { categories: (store.overview?.developerPrCounts ?? []).map(d => d.name) },
  colors: ['#6366f1', '#22c55e'],
  dataLabels: { enabled: false },
  grid: { borderColor: isDark() ? '#334155' : '#e2e8f0', strokeDashArray: 4 },
  plotOptions: { bar: { borderRadius: 5, columnWidth: '55%' } },
  tooltip: { theme: isDark() ? 'dark' : 'light' }
}))

onMounted(() => {
  store.fetchOverview()
})
</script>

<style lang="scss" scoped>
.overview { padding: 0.5rem 0; }

.page-header {
  margin-bottom: 1.5rem;
}

.page-title {
  font-size: 1.6rem;
  font-weight: 800;
  margin-bottom: 0.2rem;
  background: linear-gradient(135deg, var(--primary), var(--primary-light));
  -webkit-background-clip: text;
  -webkit-text-fill-color: transparent;
  background-clip: text;
}

.page-sub {
  font-size: 0.85rem;
  color: var(--text-muted);
}

.stat-grid {
  display: grid;
  grid-template-columns: repeat(6, 1fr);
  gap: 1rem;
  margin-bottom: 1.25rem;

  @media (max-width: 1280px) { grid-template-columns: repeat(3, 1fr); }
  @media (max-width: 768px) { grid-template-columns: repeat(2, 1fr); }
}

.chart-card {
  &--full { margin-bottom: 1.25rem; }
  &--wide { grid-column: 1 / -1; }
}

.chart-grid {
  display: grid;
  grid-template-columns: 1fr 1fr;
  gap: 1.25rem;

  @media (max-width: 768px) { grid-template-columns: 1fr; }
}

.chart-header {
  display: flex;
  align-items: flex-start;
  justify-content: space-between;
  margin-bottom: 0.75rem;
}

.chart-title {
  font-size: 0.95rem;
  font-weight: 700;
  margin-bottom: 0.2rem;
}

.chart-sub {
  font-size: 0.78rem;
  color: var(--text-muted);
}

.chart-legend {
  display: flex;
  gap: 0.75rem;
}

.legend-item {
  font-size: 0.75rem;
  display: flex;
  align-items: center;
  gap: 0.35rem;
  color: var(--text-muted);

  &::before {
    content: '';
    display: inline-block;
    width: 10px;
    height: 3px;
    border-radius: 2px;
  }

  &--primary::before { background: #6366f1; }
  &--success::before { background: #22c55e; }
}

.empty-state {
  text-align: center;
  color: var(--text-muted);
  padding: 3rem;
}
</style>
