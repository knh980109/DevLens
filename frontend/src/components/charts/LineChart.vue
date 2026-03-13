<template>
  <div class="chart-wrapper">
    <apexchart type="line" :height="height" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

const props = defineProps({
  data: { type: Array, default: () => [] },
  height: { type: Number, default: 250 }
})

const series = computed(() => [{
  name: 'PR 수',
  data: props.data.map(d => d.count)
}])

const chartOptions = computed(() => ({
  chart: {
    toolbar: { show: false },
    background: 'transparent'
  },
  theme: { mode: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light' },
  xaxis: {
    categories: props.data.map(d => d.week)
  },
  stroke: { curve: 'smooth', width: 3 },
  colors: ['#6366f1'],
  fill: {
    type: 'gradient',
    gradient: { shadeIntensity: 1, opacityFrom: 0.4, opacityTo: 0.05 }
  },
  dataLabels: { enabled: false },
  grid: { borderColor: 'var(--border)' },
  tooltip: { theme: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light' }
}))
</script>

<style scoped>
.chart-wrapper { width: 100%; }
</style>
