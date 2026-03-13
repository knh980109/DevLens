<template>
  <div class="chart-wrapper">
    <apexchart type="radar" :height="height" :options="chartOptions" :series="series" />
  </div>
</template>

<script setup>
import { computed } from 'vue'
import VueApexCharts from 'vue3-apexcharts'

const apexchart = VueApexCharts

const props = defineProps({
  radar: { type: Object, default: () => ({}) },
  name: { type: String, default: '' },
  height: { type: Number, default: 300 }
})

const series = computed(() => [{
  name: props.name,
  data: [
    props.radar.speed ?? 0,
    props.radar.quality ?? 0,
    props.radar.collaboration ?? 0,
    props.radar.consistency ?? 0,
    props.radar.coverage ?? 0
  ]
}])

const chartOptions = computed(() => ({
  chart: { toolbar: { show: false }, background: 'transparent' },
  theme: { mode: document.documentElement.getAttribute('data-theme') === 'dark' ? 'dark' : 'light' },
  xaxis: { categories: ['속도', '품질', '협업', '일관성', '커버리지'] },
  colors: ['#6366f1'],
  fill: { opacity: 0.2 },
  stroke: { width: 2 },
  markers: { size: 4 },
  yaxis: { show: false, max: 100 },
  plotOptions: { radar: { polygons: { strokeColors: 'var(--border)', connectorColors: 'var(--border)' } } }
}))
</script>

<style scoped>
.chart-wrapper { width: 100%; }
</style>
